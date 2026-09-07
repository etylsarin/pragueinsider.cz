#!/usr/bin/env node
/**
 * Draws a route diagram over a real basemap.
 *
 * There is a fourth kind of cover, after the plate, the photograph and somebody else's
 * visualisation: a schematic we draw ourselves. It exists for the stories that are about a *line* —
 * a metro route, a corridor in a plan — where there is nothing to photograph, no render has been
 * released, and the plate says nothing about where the thing would go.
 *
 * The rule that makes it honest is that the geometry is not invented. Every point is a real
 * coordinate out of `data/places.json`, the basemap underneath is the same Esri tiles the article
 * locator uses, and the article's `cover.source` cites the page the route was taken from — because
 * a line drawn on a map is a claim about where something goes, and a reader is entitled to check
 * it. What is schematic is the join between the points, and the diagram says so on its face.
 *
 * Usage:
 *   node scripts/make-diagram.mjs spec.json out.jpg
 *
 * The spec:
 * One image serves both languages, because the gate requires the two locales to name the same
 * file. So the diagram carries no sentences: station names are proper nouns and read the same in
 * Czech and English, an interchange is a coloured letter, and everything that needs a language —
 * what the route is, what it costs, what is still undecided — belongs in the per-locale caption.
 *
 *   {
 *     "accent": "#0079c1",
 *     "points":   [{ "name": "Smíchovské nádraží", "label": "Smíchov", "interchange": "B" }, …],
 *     "polyline": [[50.08, 14.61], …],   the real alignment, if there is one to trace
 *     "arrows":   [{ "from": "Letňany", "bearing": 20, "label": "Terminál Sever (VRT)" }],
 *
 * An arrow's `dash` says what it means: the route's own dash pattern for a section that continues,
 * a fine dot for a spur that is only an option. Drawing both the same makes a possible branch look
 * like a decision.
 *     "note": "Schematic — the alignment between stations is not surveyed"
 *   }
 *
 * `name` is looked up in the gazetteer, so a diagram cannot be drawn through a place the desk has
 * not resolved. `lat`/`lng` may be given directly instead.
 *
 * Without a `polyline` the route is the points joined in order, which is right for a corridor that
 * is still a proposal — there is no surveyed line to trace, and the drawing says so. Where the
 * alignment does exist, joining villages with straight segments would invent a route for a road
 * that is already staked out, so pass the real geometry and the points become labels beside it.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { loadPlaces, foldKey } from './geocode.mjs'
import { USER_AGENT } from './lib/http.mjs'

const require = createRequire(import.meta.url)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { project, TILE } = require(path.join(ROOT, 'src/lib/staticmap.js'))

const WIDTH = 2000
const HEIGHT = 1125
/** Room for the longest station label and the scale strip. Kept tight: every pixel of slack here
 *  costs a whole zoom level, and a level too far out is a map of countryside with the route as a
 *  scratch down the middle. */
const PADDING = { top: 78, right: 175, bottom: 104, left: 175 }
const MAX_NATIVE_ZOOM = 16
const BASE_LAYER =
  'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile'

const INK = '#2b241d'
const GROUND = '#fcf9f8'
/** Conventional Prague metro colours, so an interchange dot reads without a key. */
const LINE_COLOURS = { A: '#00a550', B: '#f0ab00', C: '#e4032e', D: '#0079c1' }

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]))

const ARROW_REACH = 118
const reachOf = (arrow) => arrow.reach || ARROW_REACH

/**
 * The largest zoom at which the whole drawing fits the padded frame, and the origin that centres
 * it. Arrows count: an arrow is drawn a fixed number of pixels beyond its station, so a route that
 * fits on its own can still throw its northern arrow through the title band. Laying out the points
 * and then discovering that is how the first cut of this looked wrong.
 */
function layout(points, arrows, polyline = []) {
  for (let zoom = MAX_NATIVE_ZOOM; zoom >= 8; zoom -= 1) {
    const at = points.map((p) => ({ ...p, ...project(p.lat, p.lng, zoom) }))
    const xs = at.map((p) => p.x)
    const ys = at.map((p) => p.y)
    for (const [lat, lng] of polyline) {
      const q = project(lat, lng, zoom)
      xs.push(q.x)
      ys.push(q.y)
    }

    for (const arrow of arrows) {
      const anchor = at.find((p) => (p.label || p.name) === arrow.from)
      if (!anchor) throw new Error(`arrow anchored to "${arrow.from}", which is not one of the points`)
      const rad = ((arrow.bearing - 90) * Math.PI) / 180
      xs.push(anchor.x + Math.cos(rad) * reachOf(arrow))
      ys.push(anchor.y + Math.sin(rad) * reachOf(arrow))
    }

    const w = Math.max(...xs) - Math.min(...xs)
    const h = Math.max(...ys) - Math.min(...ys)
    if (w <= WIDTH - PADDING.left - PADDING.right && h <= HEIGHT - PADDING.top - PADDING.bottom) {
      // Centre the whole extent, then bias for the uneven padding above and below.
      const originX = (Math.min(...xs) + Math.max(...xs)) / 2 - WIDTH / 2
      const originY =
        (Math.min(...ys) + Math.max(...ys)) / 2 - HEIGHT / 2 - (PADDING.top - PADDING.bottom) / 2
      return { zoom, originX, originY }
    }
  }
  throw new Error('the points do not fit the frame even at zoom 8')
}

async function fetchTile(url) {
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  if (!response.ok) throw new Error(`${url} → HTTP ${response.status}`)
  return Buffer.from(await response.arrayBuffer())
}

/** Stitch the tiles covering the frame. Base layer only — the diagram draws its own labels, and
 *  Esri's would fight them. */
async function basemap(zoom, originX, originY) {
  const jobs = []
  for (let ty = Math.floor(originY / TILE); ty <= Math.floor((originY + HEIGHT - 1) / TILE); ty += 1) {
    for (let tx = Math.floor(originX / TILE); tx <= Math.floor((originX + WIDTH - 1) / TILE); tx += 1) {
      jobs.push({ tx, ty, left: Math.round(tx * TILE - originX), top: Math.round(ty * TILE - originY) })
    }
  }

  const composites = []
  const QUEUE = 6
  let next = 0
  await Promise.all(
    Array.from({ length: Math.min(QUEUE, jobs.length) }, async () => {
      while (next < jobs.length) {
        const job = jobs[next++]
        const buffer = await fetchTile(`${BASE_LAYER}/${zoom}/${job.ty}/${job.tx}`)
        composites.push({ input: await sharp(buffer).png().toBuffer(), left: job.left, top: job.top })
      }
    })
  )

  return sharp({ create: { width: WIDTH, height: HEIGHT, channels: 3, background: GROUND } })
    .composite(composites)
    .png()
    .toBuffer()
}

/**
 * Which side of the route a label sits on. The default keeps it off the line, but two stations
 * close together defeat any rule that only looks at the line — so the spec can say `side` and
 * `dy` per point, and on a diagram with six labels that is less machinery than a solver.
 */
const labelSide = (points, i) => {
  if (points[i].side) return points[i].side
  const prev = points[i - 1] || points[i]
  const next = points[i + 1] || points[i]
  return next.y - prev.y >= 0 ? 'left' : 'right'
}

function overlay(spec, points, arrows, scale, route) {
  const accent = spec.accent || '#0079c1'
  const line = route.length ? route : points
  const path = line.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')

  const stations = points
    .map((p, i) => {
      const side = labelSide(points, i)
      const dx = side === 'left' ? -22 : 22
      const dy = p.dy || 0
      const anchor = side === 'left' ? 'end' : 'start'
      const colour = LINE_COLOURS[p.interchange] || accent
      const name = escapeXml(p.label || p.name)
      // The interchange is a coloured letter chip rather than a word, so the drawing needs no
      // language: "B" in metro yellow says the same thing to both readerships.
      const chipGap = 15
      const chipX = side === 'left' ? p.x + dx - name.length * 15 - chipGap - 34 : p.x + dx
      const nameX = side === 'left' ? p.x + dx : p.x + dx + (p.interchange ? 34 + chipGap : 0)
      return `
    <g>
      <rect x="${(p.x - 11).toFixed(1)}" y="${(p.y - 11).toFixed(1)}" width="22" height="22" fill="${p.filled ? accent : GROUND}" stroke="${accent}" stroke-width="5"/>
      ${p.interchange ? `<rect x="${(p.x - 5).toFixed(1)}" y="${(p.y - 5).toFixed(1)}" width="10" height="10" fill="${colour}"/>` : ''}
      ${
        p.interchange
          ? `<g>
        <rect x="${chipX.toFixed(1)}" y="${(p.y - 17 + dy).toFixed(1)}" width="34" height="34" fill="${colour}" stroke="${GROUND}" stroke-width="4"/>
        <text x="${(chipX + 17).toFixed(1)}" y="${(p.y + 9 + dy).toFixed(1)}" text-anchor="middle"
              font-family="ui-monospace, Menlo, monospace" font-size="25" font-weight="bold" fill="#ffffff">${escapeXml(p.interchange)}</text>
      </g>`
          : ''
      }
      <text x="${nameX.toFixed(1)}" y="${(p.y + 9 + dy).toFixed(1)}" text-anchor="${anchor}"
            font-family="Georgia, 'Times New Roman', serif" font-size="31" fill="${INK}"
            stroke="${GROUND}" stroke-width="6" paint-order="stroke">${name}</text>
    </g>`
    })
    .join('')

  const arrowMarks = arrows
    .map((a) => {
      const rad = ((a.bearing - 90) * Math.PI) / 180
      const x2 = a.x + Math.cos(rad) * reachOf(a)
      const y2 = a.y + Math.sin(rad) * reachOf(a)
      const anchor = Math.cos(rad) >= 0 ? 'start' : 'end'
      const tx = x2 + (anchor === 'start' ? 16 : -16)
      return `
    <g>
      <path d="M${a.x.toFixed(1)} ${a.y.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"
            stroke="${accent}" stroke-width="9" stroke-dasharray="${a.dash || '4 18'}" stroke-linecap="round" fill="none" opacity="0.85"/>
      <circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="9" fill="${accent}"/>
      <text x="${tx.toFixed(1)}" y="${(y2 + 9).toFixed(1)}" text-anchor="${anchor}"
            font-family="ui-monospace, Menlo, monospace" font-size="23" fill="${INK}"
            stroke="${GROUND}" stroke-width="5" paint-order="stroke">${escapeXml(a.label)}</text>
    </g>`
    })
    .join('')

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <path d="${path}" stroke="${GROUND}" stroke-width="21" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="${path}" stroke="${accent}" stroke-width="11" stroke-dasharray="34 17" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  ${arrowMarks}
  ${stations}

  <rect x="0" y="${HEIGHT - 62}" width="${WIDTH}" height="62" fill="${GROUND}" opacity="0.93"/>
  <path d="M56 ${HEIGHT - 30} v-11 M56 ${HEIGHT - 35} H${56 + scale.pixels} M${56 + scale.pixels} ${HEIGHT - 30} v-11"
        stroke="${INK}" stroke-width="3" fill="none"/>
  <text x="${56 + scale.pixels + 14}" y="${HEIGHT - 27}" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="${INK}">${scale.label}</text>
  <text x="${WIDTH - 56}" y="${HEIGHT - 27}" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="20" fill="#6b6259">Esri, HERE, Garmin, OpenStreetMap</text>
</svg>`)
}

async function main() {
  const [specPath, outPath] = process.argv.slice(2)
  if (!specPath || !outPath) {
    console.error('Usage: node scripts/make-diagram.mjs <spec.json> <out.jpg>')
    process.exitCode = 1
    return
  }

  const spec = JSON.parse(await fs.readFile(specPath, 'utf8'))
  const gazetteer = await loadPlaces()

  const resolve = (entry) => {
    if (typeof entry.lat === 'number' && typeof entry.lng === 'number') return entry
    const hit = gazetteer.places[foldKey(entry.name)]
    if (!hit) throw new Error(`"${entry.name}" is not in data/places.json — geocode it first`)
    return { ...entry, lat: hit.lat, lng: hit.lng }
  }

  const resolved = spec.points.map(resolve)
  const specArrows = spec.arrows || []
  const polyline = spec.polyline || []
  const { zoom, originX, originY } = layout(resolved, specArrows, polyline)

  const points = resolved.map((p) => {
    const at = project(p.lat, p.lng, zoom)
    return { ...p, x: at.x - originX, y: at.y - originY }
  })
  const route = polyline.map(([lat, lng]) => {
    const at = project(lat, lng, zoom)
    return { x: at.x - originX, y: at.y - originY }
  })
  const arrows = specArrows.map((a) => {
    const anchor = points.find((p) => (p.label || p.name) === a.from)
    return { ...a, x: anchor.x, y: anchor.y }
  })

  const metresPerPixel =
    (156543.03392 * Math.cos((resolved[0].lat * Math.PI) / 180)) / 2 ** zoom
  const metres = [5000, 2000, 1000, 500, 200].find((m) => m / metresPerPixel <= 320) || 200
  const scale = {
    pixels: Math.round(metres / metresPerPixel),
    label: metres >= 1000 ? `${metres / 1000} km` : `${metres} m`,
  }

  const base = await basemap(zoom, originX, originY)
  await sharp(base)
    .composite([{ input: overlay(spec, points, arrows, scale, route) }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(outPath)

  console.log(
    `${outPath} — zoom ${zoom}, ${points.length} labels, ${route.length ? `${route.length}-point alignment` : 'points joined'}, scale ${scale.label}`
  )
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
