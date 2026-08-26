#!/usr/bin/env node
/**
 * Releases queued articles into the published archive.
 *
 * The desk writes every story that clears the editorial bar into content/queue/, without a
 * publication date. This script moves the oldest of them into content/posts/ and stamps today's
 * date, up to a daily maximum.
 *
 * Separating the two means a good Monday is not wasted. Writing was previously capped at four a
 * day, so a fifth and sixth story were simply dropped — and dropped permanently, because
 * mark-covered.mjs records their sources as covered either way. Now the surplus waits, and a thin
 * Thursday draws on it.
 *
 * Oldest first, so nothing is starved. `date` is the release date rather than the writing date:
 * the article surfaces as that morning's news, and the original reporting date stays visible in
 * the `sources` block, which is where it belongs.
 *
 * Usage:
 *   node scripts/release.mjs                  release up to the daily maximum
 *   node scripts/release.mjs --max 2          release fewer
 *   node scripts/release.mjs --dry-run        report what would move
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const QUEUE_DIR = path.join(ROOT, 'content/queue')
const POSTS_DIR = path.join(ROOT, 'content/posts')

const DEFAULT_MAX = 3
/** A queued story older than this is probably overtaken by events; hold it back and say so. */
const STALE_AFTER_DAYS = 14

const today = () => new Date().toISOString().slice(0, 10)

/** YAML turns an unquoted `2026-08-20` into a Date, so normalise before printing or comparing. */
const isoDay = (value) => {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value.toISOString().slice(0, 10)
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10)
  return null
}

const readDirs = async (dir) => {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
}

/** Swap `queuedAt` for a `date` of the release day, leaving every other line untouched. */
const stamp = (raw, releaseDate) => {
  const { data, content } = matter(raw)
  if (!data.queuedAt) throw new Error('queued article has no queuedAt')

  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '')
  const frontmatter = raw.slice(0, raw.length - body.length)
  const rewritten = frontmatter.replace(
    /^queuedAt:.*$/m,
    `date: ${releaseDate}`
  )
  if (rewritten === frontmatter) throw new Error('could not rewrite queuedAt')
  return { text: rewritten + body, slug: data.slug, queuedAt: data.queuedAt }
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const maxIndex = args.indexOf('--max')
  const max = maxIndex >= 0 ? Number(args[maxIndex + 1]) : DEFAULT_MAX

  const slugs = await readDirs(QUEUE_DIR)
  if (slugs.length === 0) {
    console.log('Queue is empty.')
    return
  }

  // Read every queued article's date so the oldest can go first.
  const entries = []
  for (const slug of slugs) {
    const enPath = path.join(QUEUE_DIR, slug, 'index.en.md')
    try {
      const { data } = matter(await fs.readFile(enPath, 'utf8'))
      entries.push({ slug, queuedAt: isoDay(data.queuedAt) || '9999-12-31', title: data.title })
    } catch {
      console.error(`  ! ${slug}: unreadable index.en.md, skipping`)
    }
  }
  entries.sort((a, b) => String(a.queuedAt).localeCompare(String(b.queuedAt)))

  const release = today()

  // A second run on the same day must not double up. The daily limit is per calendar day, not
  // per invocation, so count what is already published under today's date and release only the
  // remainder. Without this, two runs in one morning put six articles on one date.
  const publishedToday = (await readDirs(POSTS_DIR)).filter((name) => name.startsWith(`${release}-`)).length
  const budget = Math.max(0, max - publishedToday)
  if (publishedToday > 0) {
    console.log(`${publishedToday} article(s) already published today; releasing at most ${budget} more.`)
  }
  if (budget === 0) {
    console.log(`Daily limit of ${max} already met. ${entries.length} article(s) stay queued.`)
    return
  }

  const cutoff = Date.now() - STALE_AFTER_DAYS * 86400000
  let released = 0

  for (const entry of entries) {
    if (released >= budget) break

    if (Date.parse(entry.queuedAt) < cutoff) {
      console.log(`  ~ ${entry.slug}: queued ${entry.queuedAt}, older than ${STALE_AFTER_DAYS} days — held back, check it is still current`)
      continue
    }

    const from = path.join(QUEUE_DIR, entry.slug)
    const to = path.join(POSTS_DIR, `${release}-${entry.slug}`)

    try {
      await fs.access(to)
      console.error(`  ! ${entry.slug}: ${path.basename(to)} already exists, skipping`)
      continue
    } catch {
      /* the happy path — nothing there yet */
    }

    // Everything in the directory moves, not just the markdown. A queued article can carry a
    // cover photograph beside its index files, and this used to copy the two .md files and then
    // rm -rf the rest — deleting the picture on release day, silently, with the article still
    // pointing at it. The gate would then fail on a file nobody remembered attaching.
    const all = await fs.readdir(from, { withFileTypes: true })
    const files = all.filter((e) => e.isFile()).map((e) => e.name)
    const stamped = files
      .filter((file) => /^index\.[a-z]{2}\.md$/.test(file))
      .map((file) => ({ file, raw: null }))
    const assets = files.filter((file) => !/^index\.[a-z]{2}\.md$/.test(file))

    for (const item of stamped) {
      item.raw = stamp(await fs.readFile(path.join(from, item.file), 'utf8'), release)
    }

    console.log(
      `  → ${entry.slug} (queued ${entry.queuedAt})` +
        (assets.length ? ` + ${assets.length} asset(s): ${assets.join(', ')}` : '')
    )
    released += 1
    if (dryRun) continue

    await fs.mkdir(to, { recursive: true })
    for (const item of stamped) await fs.writeFile(path.join(to, item.file), item.raw.text)
    // copyFile, not readFile/writeFile — these are binaries.
    for (const asset of assets) await fs.copyFile(path.join(from, asset), path.join(to, asset))
    await fs.rm(from, { recursive: true, force: true })
  }

  const remaining = (await readDirs(QUEUE_DIR)).length - (dryRun ? released : 0)
  console.log(
    `\n${dryRun ? '[dry run] would release' : 'Released'} ${released} of ${entries.length}; ${Math.max(0, remaining)} left in the queue.`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
