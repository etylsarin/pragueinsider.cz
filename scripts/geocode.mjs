#!/usr/bin/env node
/**
 * Where is this story?
 *
 * The desk used to be told to omit `location` unless it already knew the coordinates, which in
 * practice meant almost every article went unpinned and the map stayed nearly empty. Guessing
 * coordinates is not the alternative — looking them up is. This resolves a Prague place name to
 * a point, from a committed gazetteer first and OpenStreetMap's Nominatim second.
 *
 * The gazetteer (`data/places.json`) is the durable half. Every lookup that resolves is written
 * back to it, so the second article about Palmovka needs no network at all and every editor gets
 * the same answer for the same place — which matters, because two pins a hundred metres apart
 * for one junction read as two different stories on the map.
 *
 * Usage:
 *   node scripts/geocode.mjs "Vítězné náměstí"           resolve one place, print YAML
 *   node scripts/geocode.mjs "Palmovka" "Ohrada"         resolve several
 *   node scripts/geocode.mjs --pick 2 "Vítězné náměstí"  take the 2nd candidate, not the 1st
 *   node scripts/geocode.mjs --list                      print the gazetteer
 *   node scripts/geocode.mjs --no-save "Botič"           look up without recording
 *   node scripts/geocode.mjs --set 50.0651,14.4646 "Bohdalecký most"
 *                                                        record a point Nominatim cannot name
 *
 * Nominatim is a free service run on donated hardware. It is queried at most once a second,
 * with the bot's own user agent, and only for names the gazetteer does not already hold.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { USER_AGENT } from './lib/http.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PLACES_PATH = path.join(ROOT, 'data', 'places.json')

/** The same box the validator rejects pins outside of. Nominatim is asked not to leave it. */
const PRAGUE_BOUNDS = { west: 14.15, east: 14.8, south: 49.9, north: 50.22 }

const NOMINATIM = 'https://nominatim.openstreetmap.org/search'
const RATE_LIMIT_MS = 1100

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Gazetteer keys are folded — lowercased and stripped of diacritics — so "Palmovka",
 * "palmovka" and a copy-paste that lost its háčky all find the same entry.
 */
export const foldKey = (name) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

export async function loadPlaces() {
  try {
    const raw = await fs.readFile(PLACES_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    return { version: 1, places: {}, ...parsed }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    return { version: 1, places: {} }
  }
}

async function savePlaces(gazetteer) {
  const sorted = Object.fromEntries(
    Object.entries(gazetteer.places).sort(([a], [b]) => a.localeCompare(b))
  )
  await fs.mkdir(path.dirname(PLACES_PATH), { recursive: true })
  await fs.writeFile(PLACES_PATH, `${JSON.stringify({ version: 1, places: sorted }, null, 2)}\n`)
}

const inPrague = (lat, lng) =>
  lat >= PRAGUE_BOUNDS.south &&
  lat <= PRAGUE_BOUNDS.north &&
  lng >= PRAGUE_BOUNDS.west &&
  lng <= PRAGUE_BOUNDS.east

/** Five decimals is ~1 m. More than that is precision the source does not have. */
const round = (value) => Math.round(value * 1e5) / 1e5

/**
 * Nominatim answers rather than admitting defeat: ask it for "Západní Město" and it returns a
 * street called Západní in Střešovice, twelve kilometres from the Stodůlky district you meant.
 * Nothing in the response says it settled for a partial match, so this checks — every word of
 * the name asked for has to appear in the name that came back, or the hit is flagged and not
 * recorded without an explicit --pick.
 *
 * Anything after a comma is locality context for the search ("Roztocká, Sedlec"), not part of
 * the name, so it is not required back.
 */
function looseMatch(query, name) {
  const asked = foldKey(query.split(',')[0])
    .split(' ')
    .filter((word) => word.length > 1)
  const got = foldKey(name || '')
  return asked.some((word) => !got.includes(word))
}

/**
 * Nominatim's `suburb` is the cadastral area, which is usually but not always the name a reader
 * would use — Vítězné náměstí comes back as Střešovice, not Dejvice. So this is offered as a
 * suggestion to be overridden, never written into frontmatter unseen.
 */
function suggestDistrict(address = {}) {
  const borough = address.city_district || address.district || address.borough
  const quarter = address.suburb || address.quarter || address.neighbourhood
  const numbered = /Praha[\s-]?\d+/.exec(borough || '')?.[0]?.replace(/\s+/, ' ')
  if (numbered && quarter && !/^Praha\b/.test(quarter)) return `${numbered} – ${quarter}`
  if (numbered) return numbered
  if (quarter) return quarter
  return null
}

let lastQueryAt = 0

async function queryNominatim(name) {
  const wait = RATE_LIMIT_MS - (Date.now() - lastQueryAt)
  if (wait > 0) await sleep(wait)
  lastQueryAt = Date.now()

  const url = new URL(NOMINATIM)
  url.searchParams.set('q', /praha|prague/i.test(name) ? name : `${name}, Praha`)
  url.searchParams.set('format', 'jsonv2')
  url.searchParams.set('addressdetails', '1')
  url.searchParams.set('countrycodes', 'cz')
  url.searchParams.set('limit', '6')
  url.searchParams.set('bounded', '1')
  url.searchParams.set(
    'viewbox',
    `${PRAGUE_BOUNDS.west},${PRAGUE_BOUNDS.north},${PRAGUE_BOUNDS.east},${PRAGUE_BOUNDS.south}`
  )

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 20000)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
    })
    if (!response.ok) throw new Error(`Nominatim HTTP ${response.status}`)
    const results = await response.json()
    return results
      .map((result) => ({
        lat: round(Number(result.lat)),
        lng: round(Number(result.lon)),
        label: result.display_name,
        kind: `${result.category}/${result.type}`,
        district: suggestDistrict(result.address),
        loose: looseMatch(name, result.name),
      }))
      .filter((candidate) => inPrague(candidate.lat, candidate.lng))
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Resolve one name. Returns `{ hit, candidates }` — `hit` is the gazetteer entry if there was
 * one, otherwise the chosen candidate; `candidates` is everything Nominatim offered, so the
 * caller can see that it picked the square rather than the tram stop of the same name.
 */
export async function geocode(name, options = {}) {
  const { pick = 1, save = true, gazetteer } = options
  const places = gazetteer || (await loadPlaces())
  const key = foldKey(name)

  const known = places.places[key]
  if (known && pick === 1) return { name, key, hit: known, candidates: [], cached: true }

  const candidates = await queryNominatim(name)
  const chosen = candidates[pick - 1]
  if (!chosen) return { name, key, hit: null, candidates, cached: false }

  const entry = {
    name,
    lat: chosen.lat,
    lng: chosen.lng,
    district: chosen.district,
    osm: chosen.label,
  }
  // A loose top hit is shown but never written to the gazetteer: picking it has to be a decision
  // somebody made, because everything downstream trusts the file without re-checking it.
  const record = save && !(chosen.loose && pick === 1)
  if (record) {
    places.places[key] = entry
    if (!gazetteer) await savePlaces(places)
  }
  return { name, key, hit: entry, candidates, cached: false, loose: chosen.loose, recorded: record }
}

const yaml = (entry) =>
  ['location:', `  lat: ${entry.lat.toFixed(4)}`, `  lng: ${entry.lng.toFixed(4)}`].join('\n')

async function main() {
  const args = process.argv.slice(2)
  const save = !args.includes('--no-save')

  const names = []
  let pick = 1
  let set = null
  let district = null
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--pick') {
      pick = Number(args[i + 1])
      i += 1
    } else if (args[i] === '--set') {
      set = args[i + 1]
      i += 1
    } else if (args[i] === '--district') {
      district = args[i + 1]
      i += 1
    } else if (!args[i].startsWith('--')) {
      names.push(args[i])
    }
  }
  if (!Number.isInteger(pick) || pick < 1) {
    console.error('--pick takes a candidate number, counting from 1')
    process.exitCode = 1
    return
  }

  // Some places OSM holds only as a tagged way with no searchable name — the 1913 truss span on
  // Moskevská is `bridge:structure=truss`, not a place called anything. Those get written by hand
  // once, from a source that was actually checked, rather than looked up wrong every time.
  if (set) {
    const [lat, lng] = set.split(',').map((part) => Number(part.trim()))
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || !inPrague(lat, lng)) {
      console.error(`--set ${set} is not a coordinate pair inside Prague`)
      process.exitCode = 1
      return
    }
    if (names.length !== 1) {
      console.error('--set records exactly one place; give it one name')
      process.exitCode = 1
      return
    }
    const places = await loadPlaces()
    const entry = { name: names[0], lat: round(lat), lng: round(lng), district, osm: null }
    places.places[foldKey(names[0])] = entry
    await savePlaces(places)
    console.log(`${names[0]}\n${yaml(entry)}`)
    return
  }

  if (args.includes('--list')) {
    const places = await loadPlaces()
    for (const [key, entry] of Object.entries(places.places)) {
      console.log(`${key.padEnd(38)} ${entry.lat.toFixed(4)}, ${entry.lng.toFixed(4)}  ${entry.district || ''}`)
    }
    console.log(`\n${Object.keys(places.places).length} place(s) in data/places.json`)
    return
  }

  if (!names.length) {
    console.error('Usage: node scripts/geocode.mjs "Place name" ["Another place"]')
    process.exitCode = 1
    return
  }

  const gazetteer = await loadPlaces()
  let resolved = 0

  for (const name of names) {
    const result = await geocode(name, { pick, save, gazetteer })
    if (!result.hit) {
      console.log(`\n✗ ${name} — no match inside Prague`)
      continue
    }
    resolved += result.recorded === false ? 0 : 1
    console.log(`\n${name}${result.cached ? '  (gazetteer)' : ''}`)
    if (result.loose) {
      console.log(
        `⚠ "${result.hit.osm}" does not carry the name you asked for — not recorded.\n` +
          '  Check the candidates below and re-run with --pick N, or --set lat,lng.'
      )
    }
    console.log(yaml(result.hit))
    if (result.hit.district) console.log(`district: "${result.hit.district}"   # check this reads right`)
    if (result.hit.osm) console.log(`# ${result.hit.osm}`)
    result.candidates.slice(1).forEach((candidate, i) => {
      console.log(`#   --pick ${i + 2}: ${candidate.label} [${candidate.kind}]`)
    })
  }

  if (save && resolved) {
    await savePlaces(gazetteer)
    console.log(`\nGazetteer: ${Object.keys(gazetteer.places).length} place(s) in data/places.json`)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error.message || error)
    process.exitCode = 1
  })
}
