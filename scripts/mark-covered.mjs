#!/usr/bin/env node
/**
 * Reconciles data/seen.json against what has actually been published.
 *
 * Every source URL cited by a post is marked covered, so the morning scan stops offering that
 * story. Deriving this from the posts rather than from the scan matters: the scan surfaces ten
 * candidates and the desk writes three, and marking all ten would silently bury the seven that
 * were merely deferred. Those stay in the digest until they age out of the date window.
 *
 * Idempotent, argument-free and self-healing — if seen.json is ever lost, this rebuilds the
 * "already covered" half of it from the archive.
 *
 * Usage:
 *   node scripts/mark-covered.mjs            reconcile and write
 *   node scripts/mark-covered.mjs --dry-run  report what would change
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { loadSeen, saveSeen, keyFor } from './lib/seen.mjs'
import { canonicalUrl } from './lib/text.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const POSTS_DIR = path.join(ROOT, 'content/posts')
const QUEUE_DIR = path.join(ROOT, 'content/queue')

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const seen = await loadSeen()

  // The queue counts as covered. A story written but not yet released must not resurface in
  // tomorrow's digest and get written a second time.
  const read = async (dir) => {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      return entries.filter((e) => e.isDirectory()).map((e) => ({ dir, name: e.name }))
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      return []
    }
  }
  const dirs = [...(await read(POSTS_DIR)), ...(await read(QUEUE_DIR))]

  const added = []
  const linked = []

  for (const { dir, name: dirName } of dirs.sort((a, b) => a.name.localeCompare(b.name))) {
    const slug = dirName.replace(/^\d{4}-\d{2}-\d{2}-/, '')
    const files = await fs.readdir(path.join(dir, dirName))

    for (const file of files.filter((name) => /^index\.[a-z]{2}\.md$/.test(name))) {
      const raw = await fs.readFile(path.join(dir, dirName, file), 'utf8')
      const { data: fm } = matter(raw)

      for (const source of fm.sources || []) {
        const url = canonicalUrl(source?.url)
        if (!url) continue

        const key = keyFor(url)
        const existing = seen.entries[key]

        if (!existing) {
          seen.entries[key] = {
            url,
            title: source.title || fm.title,
            source: source.publisher || 'unknown',
            firstSeen: new Date().toISOString().slice(0, 10),
            usedInPost: slug,
          }
          added.push(`${slug} ← ${url}`)
        } else if (existing.usedInPost !== slug) {
          // A source can legitimately back more than one post; keep the earliest attribution
          // and note the rest so the history stays readable.
          if (!existing.usedInPost) {
            existing.usedInPost = slug
            linked.push(`${slug} ← ${url}`)
          } else if (!String(existing.usedInPost).split(',').includes(slug)) {
            existing.usedInPost = `${existing.usedInPost},${slug}`
            linked.push(`${slug} ← ${url}`)
          }
        }
      }
    }
  }

  for (const line of added) console.log(`  + ${line}`)
  for (const line of linked) console.log(`  ~ ${line}`)

  if (dryRun) {
    console.log(`\n[dry run] ${added.length} new, ${linked.length} updated — nothing written`)
    return
  }

  const total = await saveSeen(seen)
  console.log(`\n${added.length} new, ${linked.length} updated · seen index: ${total} entries`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
