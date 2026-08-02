#!/usr/bin/env node
/**
 * The morning source scan.
 *
 * Fetches every registered source, discards what is not Prague or not about the built
 * environment, drops anything already covered, and writes a ranked candidate list to
 * data/digest.json for the writing step to read.
 *
 * This step is deliberately deterministic: no model is involved in deciding what exists, only
 * in deciding what is worth writing about. Run it on its own to see what the desk would see.
 *
 * Usage:
 *   node scripts/ingest.mjs                    scan, honouring data/seen.json
 *   node scripts/ingest.mjs --all              ignore the seen index (shows everything)
 *   node scripts/ingest.mjs --source archiweb  one source only (repeatable)
 *   node scripts/ingest.mjs --limit 20         cap items fetched per source
 *   node scripts/ingest.mjs --days 21          discard items older than N days
 *   node scripts/ingest.mjs --mark             record candidates in data/seen.json now
 *   node scripts/ingest.mjs --print            also print the digest to stdout
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SOURCES, getSource } from './sources/index.mjs'
import { scoreItem } from './lib/relevance.mjs'
import { loadSeen, saveSeen, isSeen, markSeen } from './lib/seen.mjs'
import { canonicalUrl } from './lib/text.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIGEST_PATH = path.join(ROOT, 'data', 'digest.json')

const parseArgs = (argv) => {
  const args = { sources: [], limit: 40, days: 30, all: false, mark: false, print: false }
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--all') args.all = true
    else if (arg === '--mark') args.mark = true
    else if (arg === '--print') args.print = true
    else if (arg === '--source') args.sources.push(argv[(i += 1)])
    else if (arg === '--limit') args.limit = Number(argv[(i += 1)])
    else if (arg === '--days') args.days = Number(argv[(i += 1)])
    else if (arg === '--help' || arg === '-h') args.help = true
  }
  return args
}

const withinWindow = (publishedAt, days, now) => {
  if (!publishedAt) return true // undated items are kept; the writer can judge
  const stamp = Date.parse(publishedAt)
  if (Number.isNaN(stamp)) return true
  return stamp >= now.getTime() - days * 86400000 && stamp <= now.getTime() + 2 * 86400000
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    console.log(await fs.readFile(fileURLToPath(import.meta.url), 'utf8').then((s) => s.split('*/')[0]))
    return
  }

  const now = new Date()
  const selected = args.sources.length
    ? args.sources.map((id) => getSource(id)).filter(Boolean)
    : SOURCES

  if (args.sources.length && selected.length !== args.sources.length) {
    console.error(`Unknown source. Available: ${SOURCES.map((s) => s.id).join(', ')}`)
    process.exitCode = 1
    return
  }

  const seen = await loadSeen()
  const report = []
  const candidates = []

  // Sources are independent; one being down must not cost us the others.
  const results = await Promise.allSettled(
    selected.map(async (source) => ({
      source,
      items: await source.fetchItems({ limit: args.limit }),
    }))
  )

  for (let i = 0; i < results.length; i += 1) {
    const source = selected[i]
    const result = results[i]

    if (result.status === 'rejected') {
      report.push({ id: source.id, name: source.name, error: String(result.reason?.message || result.reason) })
      console.error(`  ✗ ${source.name}: ${result.reason?.message || result.reason}`)
      continue
    }

    const items = result.value.items
    let kept = 0
    let stale = 0
    let already = 0
    let offTopic = 0

    for (const item of items) {
      const url = canonicalUrl(item.url, source.homepage)
      if (!url || !item.title) continue

      if (!withinWindow(item.publishedAt, args.days, now)) {
        stale += 1
        continue
      }

      const { relevant, score, matched, suggestedCategory } = scoreItem(item, source)
      if (!relevant) {
        offTopic += 1
        continue
      }

      if (!args.all && isSeen(seen, url)) {
        already += 1
        continue
      }

      kept += 1
      candidates.push({
        url,
        title: item.title,
        summary: item.summary || '',
        publishedAt: item.publishedAt,
        tags: item.tags || [],
        source: source.id,
        sourceName: source.name,
        sourceLanguage: source.language,
        score,
        matched,
        suggestedCategory,
      })
    }

    report.push({ id: source.id, name: source.name, fetched: items.length, kept, stale, already, offTopic })
    console.error(
      `  ✓ ${source.name}: ${items.length} fetched → ${kept} new (${offTopic} off-topic, ${already} already covered, ${stale} outside window)`
    )
  }

  // Rank by relevance, then recency; undated items sort last within their score band.
  candidates.sort(
    (a, b) => b.score - a.score || (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0)
  )

  // Same story from two outlets is one story — group so the writer cross-references rather
  // than publishing twice.
  const clusters = clusterByTitle(candidates)

  const digest = {
    generatedAt: now.toISOString(),
    window: { days: args.days, ignoringSeenIndex: args.all },
    sources: report,
    counts: { candidates: candidates.length, clusters: clusters.length },
    clusters,
  }

  await fs.mkdir(path.dirname(DIGEST_PATH), { recursive: true })
  await fs.writeFile(DIGEST_PATH, `${JSON.stringify(digest, null, 2)}\n`)

  if (args.mark) {
    for (const candidate of candidates) markSeen(seen, candidate, now)
    const total = await saveSeen(seen, now)
    console.error(`  · seen index: ${total} entries`)
  }

  console.error(
    `\n${candidates.length} candidates in ${clusters.length} clusters → ${path.relative(ROOT, DIGEST_PATH)}`
  )
  if (args.print) console.log(JSON.stringify(digest, null, 2))
}

/**
 * Cheap title clustering: two items belong together when their significant words overlap
 * heavily. Deliberately conservative — a missed cluster costs a duplicate the writer will
 * notice, a false cluster silently merges two unrelated stories.
 */
function clusterByTitle(candidates) {
  const STOP = new Set([
    'a', 'i', 'v', 've', 'na', 'se', 's', 'z', 'ze', 'do', 'o', 'u', 'k', 'ke', 'po', 'pro',
    'za', 'the', 'of', 'in', 'to', 'and', 'for', 'on', 'at', 'is', 'are', 'with', 'by', 'praha',
    'prahy', 'praze', 'prague', 'bude', 'bude', 'ma', 'je', 'jak', 'co', 'new', 'nove', 'novy',
  ])

  const significant = (title) =>
    new Set(
      String(title)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(/[^a-z0-9]+/)
        .filter((word) => word.length > 3 && !STOP.has(word))
    )

  const clusters = []
  for (const candidate of candidates) {
    const words = significant(candidate.title)
    const match = clusters.find((cluster) => {
      const shared = [...words].filter((word) => cluster.words.has(word))
      return shared.length >= 3 || (shared.length >= 2 && words.size <= 4)
    })

    if (match) {
      match.items.push(candidate)
      match.score = Math.max(match.score, candidate.score)
      words.forEach((word) => match.words.add(word))
    } else {
      clusters.push({ words, score: candidate.score, items: [candidate] })
    }
  }

  return clusters
    .sort((a, b) => b.score - a.score || b.items.length - a.items.length)
    .map((cluster, index) => ({
      rank: index + 1,
      score: cluster.score,
      sourceCount: new Set(cluster.items.map((item) => item.source)).size,
      suggestedCategory: cluster.items[0].suggestedCategory,
      headline: cluster.items[0].title,
      items: cluster.items.map(({ matched, ...rest }) => ({
        ...rest,
        matchedPlaces: matched.places,
      })),
    }))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
