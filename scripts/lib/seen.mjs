import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { hashId } from './text.mjs'

/**
 * The scan's memory across runs. Committed to the repo, because a daily job that forgets what
 * it already covered will re-publish the same story every morning.
 *
 * Entries are pruned past RETENTION_DAYS: long enough that no live story cycles back, short
 * enough that the file stays reviewable in a diff.
 */

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const SEEN_PATH = path.join(ROOT, 'data', 'seen.json')
const RETENTION_DAYS = 180

export const seenPath = SEEN_PATH

export async function loadSeen() {
  try {
    const raw = await fs.readFile(SEEN_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    return { version: 1, entries: {}, ...parsed }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    return { version: 1, entries: {} }
  }
}

export async function saveSeen(seen, now = new Date()) {
  const cutoff = now.getTime() - RETENTION_DAYS * 86400000
  const entries = Object.fromEntries(
    Object.entries(seen.entries).filter(([, entry]) => {
      const stamp = Date.parse(entry.firstSeen)
      return Number.isNaN(stamp) || stamp >= cutoff
    })
  )

  await fs.mkdir(path.dirname(SEEN_PATH), { recursive: true })
  await fs.writeFile(
    SEEN_PATH,
    // Sorted keys keep the daily commit diff to just the new lines.
    `${JSON.stringify({ version: 1, updated: now.toISOString().slice(0, 10), entries: sortKeys(entries) }, null, 2)}\n`
  )
  return Object.keys(entries).length
}

const sortKeys = (object) =>
  Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b)))

export const keyFor = (url) => hashId(url)

export const isSeen = (seen, url) => Boolean(seen.entries[keyFor(url)])

/** Records that an item was surfaced. `usedInPost` is stamped later, by the writer. */
export function markSeen(seen, item, now = new Date()) {
  const key = keyFor(item.url)
  if (!seen.entries[key]) {
    seen.entries[key] = {
      url: item.url,
      title: item.title,
      source: item.source,
      firstSeen: now.toISOString().slice(0, 10),
    }
  }
  return seen.entries[key]
}
