#!/usr/bin/env node
/**
 * Attaches a photograph from the inbox to an article.
 *
 * The capture half of this workflow is deliberately stupid. Standing in a building you cannot
 * remember that the piece is `2026-08-26-lost-paths-study`, and you are not going to compose a
 * Czech caption on a phone keyboard — so the Shortcut drops the picture and one line of note into
 * photos/inbox/ and decides nothing. Every decision that needs the archive in front of you
 * happens here instead, the same way ingest.mjs gathers and the desk chooses.
 *
 * This script has no judgement of its own. `--list` ranks candidate articles by how far the
 * camera was from each one and by what the note says, and prints the shortlist; the desk reads
 * that, picks the story, writes the alt text and caption in both languages, and calls back with
 * an explicit --slug. The script then does only mechanical things: rotate, resize, strip the
 * metadata, file the picture beside the markdown and patch both frontmatters.
 *
 * Photographs reach the inbox through iCloud Drive rather than an API call from the phone: the
 * Shortcut writes a jpg and a json sidecar into ~/…/CloudDocs/PragueInsider/, and every run of
 * this script drains that folder into photos/inbox/ first. The phone therefore needs no GitHub
 * token, no base64 encoding and no HTTP at all — which removes the fiddliest half of the Shortcut
 * and the only credential that would have lived on the device.
 *
 * Usage:
 *   node scripts/attach-photo.mjs --list                     rank the inbox against the archive
 *   node scripts/attach-photo.mjs --list --json              the same, for a machine
 *   node scripts/attach-photo.mjs --no-import                skip the iCloud drain
 *   node scripts/attach-photo.mjs \
 *     --photo 2026-08-26-143012.jpg \                        inbox basename, or any path
 *     --slug lost-paths-study \
 *     --alt-en "..." --alt-cs "..." \
 *     --caption-en "..." --caption-cs "..." \
 *     [--credit "Filip Mareš"] [--name cover.jpg] [--keep] [--dry-run]
 */

import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import matter from 'gray-matter'
import sharp from 'sharp'

const run = promisify(execFile)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const INBOX = path.join(ROOT, 'photos/inbox')
const POSTS_DIR = path.join(ROOT, 'content/posts')
const QUEUE_DIR = path.join(ROOT, 'content/queue')

/**
 * Where the Shortcut drops things.
 *
 * A Save File path is relative to the Shortcuts app's own iCloud folder, not to the iCloud Drive
 * root — so `PragueInsider/` lands under *Shortcuts*, which in Finder is the app's container
 * rather than a top-level folder. Rather than assert one answer, look in each place it can
 * plausibly be. PI_PHOTO_DROP overrides the search entirely.
 */
const CLOUD_DROPS = process.env.PI_PHOTO_DROP
  ? [process.env.PI_PHOTO_DROP]
  : [
      path.join(os.homedir(), 'Library/Mobile Documents/iCloud~is~workflow~my~workflows/Documents/PragueInsider'),
      path.join(os.homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/Shortcuts/PragueInsider'),
      path.join(os.homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/PragueInsider'),
    ]

/** Set when the drop folder is absent, so an empty inbox can explain itself. */
let missingDrop = false

const DEFAULT_CREDIT = 'Filip Mareš'
const MAX_WIDTH = 2000
const JPEG_QUALITY = 82
/** Beyond this the camera was somewhere else entirely and the coordinates prove nothing. */
const NEAR_METRES = 600
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|heic|heif)$/i
/** Shortcuts saves a Text action as .txt however the path is written, so accept both. */
const SIDECAR_EXT = /\.(json|txt)$/i

// --- small helpers ------------------------------------------------------------------------

const arg = (name, fallback = null) => {
  const i = process.argv.indexOf(`--${name}`)
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')
    ? process.argv[i + 1]
    : fallback
}
const flag = (name) => process.argv.includes(`--${name}`)

const readDirs = async (dir) => {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    return entries.filter((e) => e.isDirectory()).map((e) => e.name)
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
}

const isoDay = (value) => {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value.toISOString().slice(0, 10)
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10)
  return null
}

/**
 * Words too common to be evidence. Without this, a note reading "palata pavilion from
 * starokosirska" scores a point for "from" against every article whose headline happens to
 * contain it — and a single stopword hit is worth as much here as the actual place name.
 */
const STOPWORDS = new Set([
  // English
  'the', 'and', 'for', 'from', 'with', 'that', 'this', 'they', 'them', 'there', 'here', 'into',
  'over', 'under', 'about', 'after', 'before', 'been', 'have', 'has', 'was', 'were', 'will',
  'would', 'are', 'but', 'not', 'you', 'your', 'our', 'its', 'his', 'her', 'their', 'some',
  'more', 'most', 'than', 'then', 'when', 'where', 'which', 'who', 'what', 'why', 'how', 'out',
  'off', 'one', 'two', 'new', 'now', 'also', 'just', 'only', 'very', 'still',
  // Czech
  'pro', 'ale', 'nebo', 'tak', 'jak', 'kde', 'kdy', 'kdo', 'coz', 'tim', 'tam', 'tady', 'jeho',
  'jeji', 'jejich', 'byl', 'byla', 'bylo', 'jsou', 'jsem', 'jste', 'tento', 'tato', 'toto',
  'tyto', 'ten', 'pri', 'pod', 'nad', 'mezi', 'jako', 'ktery', 'ktera', 'ktere', 'uz', 'jeste',
  // ours — every article on this site is about Prague and the built environment
  'praha', 'prague', 'prahy', 'praze',
])

/** Diacritics off, punctuation off — "Kosire" has to match "Košíře" in a note typed on a phone. */
const tokens = (text) =>
  String(text || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token))

const haversine = (a, b) => {
  const R = 6371000
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return Math.round(2 * R * Math.asin(Math.sqrt(h)))
}

/** YAML, double-quoted — an unquoted Czech caption with a colon in it fails the build. */
const yamlString = (value) => `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`

// --- the archive --------------------------------------------------------------------------

/** Every article the photo could belong to, published or still queued. */
async function loadArticles() {
  const articles = []

  for (const [dir, collection] of [[POSTS_DIR, 'posts'], [QUEUE_DIR, 'queue']]) {
    for (const dirName of await readDirs(dir)) {
      const enPath = path.join(dir, dirName, 'index.en.md')
      try {
        const { data } = matter(await fs.readFile(enPath, 'utf8'))
        articles.push({
          collection,
          dirName,
          dir: path.join(dir, dirName),
          slug: data.slug || dirName.replace(/^\d{4}-\d{2}-\d{2}-/, ''),
          title: data.title || '',
          date: isoDay(data.date) || isoDay(data.queuedAt),
          district: data.district || '',
          tags: data.tags || [],
          location: data.location || null,
          hasPhoto: Boolean(data.cover?.photo),
        })
      } catch {
        /* a half-written directory is not a candidate */
      }
    }
  }
  return articles
}

/**
 * Rank by two independent signals rather than one.
 *
 * Coordinates are decisive when both sides have them — you were 40 m from the thing you
 * photographed — but only a third of the archive carries a location, so the note has to be
 * able to carry a match on its own. They are scored separately and added, so either can win.
 */
function rank(articles, { lat, lng, note }) {
  const noteTokens = new Set(tokens(note))

  return articles
    .map((article) => {
      const reasons = []
      let score = 0

      if (lat != null && lng != null && article.location?.lat && article.location?.lng) {
        const metres = haversine({ lat, lng }, article.location)
        if (metres <= NEAR_METRES) {
          score += 60 * (1 - metres / NEAR_METRES) + 10
          reasons.push(`${metres} m away`)
        }
      }

      if (noteTokens.size) {
        const haystack = new Set(tokens([article.title, article.district, article.slug, ...article.tags].join(' ')))
        const hits = [...noteTokens].filter((token) => haystack.has(token))
        if (hits.length) {
          score += 18 * hits.length
          reasons.push(`note matches ${hits.join(', ')}`)
        }
      }

      // A picture taken today is far more likely to belong to this week's story than to July's.
      if (article.date) {
        const ageDays = (Date.now() - Date.parse(article.date)) / 86400000
        if (ageDays >= 0 && ageDays <= 30) score += 6 * (1 - ageDays / 30)
      }

      if (article.hasPhoto) {
        score -= 15
        reasons.push('already has a cover photo')
      }

      return { ...article, score: Math.round(score), reasons }
    })
    .filter((article) => article.score > 0)
    .sort((a, b) => b.score - a.score)
}

// --- the inbox ----------------------------------------------------------------------------

/**
 * Move whatever the phone has dropped in iCloud Drive into photos/inbox.
 *
 * macOS evicts files it thinks you are not using and leaves a `.name.ext.icloud` placeholder in
 * their place. Reading one gets you a few hundred bytes of XML rather than a photograph, so they
 * are reported and skipped — a partially synced folder should say so, not produce a corrupt JPEG
 * and a confusing sharp error three steps later.
 */
/**
 * Move files out of a folder this process is not allowed to read, by asking Finder to do it.
 *
 * macOS guards ~/Library/Mobile Documents per-application, and the honest fixes are both bad:
 * granting Full Disk Access to a terminal is a large permission to hand over for one folder, and
 * dragging files by hand defeats the point of the workflow. But Finder already has access, and
 * driving it over Apple Events needs only Automation permission for Finder — a single prompt,
 * scoped to one app, revocable, and nothing like Full Disk Access.
 *
 * A symlink into the folder does not work: macOS resolves it and checks the real path.
 */
async function moveViaFinder(from, to) {
  const escape = (value) => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  const script = `
    tell application "Finder"
      set src to folder ((POSIX file "${escape(from)}") as text)
      set dst to folder ((POSIX file "${escape(to)}") as text)
      set theFiles to every file of src
      if (count of theFiles) > 0 then move theFiles to dst with replacing
      return (count of theFiles) as text
    end tell`

  try {
    const { stdout } = await run('osascript', ['-e', script])
    return { ok: true, count: Number(stdout.trim()) || 0 }
  } catch (error) {
    const message = String(error.stderr || error.message)
    // -1743 is "not authorised to send Apple events", i.e. Automation was declined.
    if (message.includes('-1743') || /not authoriz|not allowed/i.test(message)) {
      return { ok: false, reason: 'automation-denied' }
    }
    // -1728 is "can't get folder", i.e. it is simply not there.
    if (message.includes('-1728')) return { ok: false, reason: 'missing' }
    return { ok: false, reason: message.split('\n')[0] }
  }
}

async function importFromCloud() {
  await fs.mkdir(INBOX, { recursive: true })
  let moved = 0
  let found = false
  const pending = []
  const denied = []

  for (const drop of CLOUD_DROPS) {
    let names
    try {
      names = await fs.readdir(drop)
    } catch (error) {
      if (error.code === 'ENOENT') continue
      if (error.code === 'EPERM' || error.code === 'EACCES') {
        // Refused directly — hand it to Finder, which is allowed in there.
        const viaFinder = await moveViaFinder(drop, INBOX)
        if (viaFinder.ok) {
          if (viaFinder.count) {
            found = true
            moved += viaFinder.count
            console.log(`Imported ${viaFinder.count} file(s) via Finder from ${drop.replace(os.homedir(), '~')}`)
          }
          continue
        }
        if (viaFinder.reason === 'missing') continue
        // Note it and keep looking — one candidate being unreadable says nothing about the next,
        // and it must not drown out an attach that named its own file.
        denied.push({ drop, reason: viaFinder.reason })
        continue
      }
      throw error
    }

    found = true
    for (const name of names.filter((n) => IMAGE_EXT.test(n) || SIDECAR_EXT.test(n))) {
      try {
        await fs.copyFile(path.join(drop, name), path.join(INBOX, name))
        await fs.rm(path.join(drop, name), { force: true })
        if (IMAGE_EXT.test(name)) moved += 1
      } catch (error) {
        console.error(`  ! ${name}: ${error.message}`)
      }
    }
    for (const name of names.filter((n) => n.endsWith('.icloud'))) {
      pending.push(name.replace(/^\./, '').replace(/\.icloud$/, ''))
    }
    if (moved) console.log(`Imported ${moved} photo(s) from ${drop.replace(os.homedir(), '~')}`)
  }

  missingDrop = !found && !denied.length
  if (pending.length) {
    console.log(`${pending.length} file(s) still downloading from iCloud: ${pending.join(', ')}`)
  }
  // Only worth raising if it actually cost us something: nothing was readable anywhere.
  if (denied.length && !found) {
    console.error('Could not reach the drop folder, directly or through Finder:')
    for (const { drop, reason } of denied) console.error(`  ${drop.replace(os.homedir(), '~')} — ${reason}`)
    console.error('')
    if (denied.some((d) => d.reason === 'automation-denied')) {
      console.error('Finder automation was declined. System Settings → Privacy & Security →')
      console.error('Automation, find the app you ran this in, and switch Finder back on.')
    } else {
      console.error('Grant Full Disk Access to the app you ran this in, or drag the two files')
      console.error('into photos/inbox/ from Finder — nothing downstream differs.')
    }
    process.exitCode = 1
  }
  return { moved, pending, denied }
}

async function readInbox() {
  let names = []
  try {
    names = await fs.readdir(INBOX)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }

  const items = []
  for (const name of names.filter((n) => IMAGE_EXT.test(n)).sort()) {
    // Pair on the base name, whatever extension the sidecar ended up with.
    const base = name.replace(IMAGE_EXT, '')
    const sidecarName = names.find((n) => SIDECAR_EXT.test(n) && n.replace(SIDECAR_EXT, '') === base)
    const sidecarPath = sidecarName ? path.join(INBOX, sidecarName) : null
    let sidecar = {}
    try {
      sidecar = JSON.parse(await fs.readFile(sidecarPath, 'utf8'))
    } catch {
      /* a photo with no sidecar is still a photo — it just arrives with nothing said about it */
    }
    const stat = await fs.stat(path.join(INBOX, name))
    items.push({
      file: name,
      fromInbox: true,
      absolutePath: path.join(INBOX, name),
      sidecarPath,
      note: sidecar.note || '',
      lat: typeof sidecar.lat === 'number' ? sidecar.lat : null,
      lng: typeof sidecar.lng === 'number' ? sidecar.lng : null,
      shot: isoDay(sidecar.shot) || null,
      kb: Math.round(stat.size / 1024),
    })
  }
  return items
}

async function listInbox(articles) {
  const items = await readInbox()

  if (flag('json')) {
    console.log(
      JSON.stringify(
        items.map((item) => ({ ...item, candidates: rank(articles, item).slice(0, 5) })),
        null,
        2
      )
    )
    return
  }

  if (!items.length) {
    console.log('Inbox is empty.')
    if (missingDrop) {
      console.log(`\n${CLOUD_DROP.replace(os.homedir(), '~')} does not exist yet.`)
      console.log('If the Shortcut has run, check in Finder where its Save File actions put things —')
      console.log('with "Ask Where To Save" on, iOS puts them wherever you last saved instead.')
      console.log('Set PI_PHOTO_DROP to point at the right folder.')
    }
    return
  }

  console.log(`${items.length} photo(s) waiting.\n`)
  for (const item of items) {
    const where = item.lat != null ? `${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}` : 'no coordinates'
    console.log(`${item.file}  (${item.kb} KB · ${item.shot || 'no date'} · ${where})`)
    console.log(`  note: ${item.note || '—'}`)

    const candidates = rank(articles, item).slice(0, 5)
    if (!candidates.length) {
      console.log('  no candidate matched — pass --slug explicitly\n')
      continue
    }
    for (const candidate of candidates) {
      console.log(
        `   ${String(candidate.score).padStart(3)}  ${candidate.slug}  [${candidate.collection}]  ${candidate.reasons.join('; ') || 'recent'}`
      )
      console.log(`        ${candidate.title}`)
    }
    console.log('')
  }
  console.log('Attach with:\n  node scripts/attach-photo.mjs --photo <file> --slug <slug> --alt-en "…" --alt-cs "…" --caption-en "…" --caption-cs "…"')
}

// --- attaching ----------------------------------------------------------------------------

/**
 * Rewrite the `cover:` block, leaving every other line of the frontmatter untouched.
 *
 * gray-matter can stringify the whole document back, but that reflows the YAML and drops the
 * double quotes the build depends on. Surgery on the text is uglier and safer — the same reason
 * release.mjs rewrites `queuedAt` with a regex rather than re-serialising.
 */
function patchCover(raw, fields) {
  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '')
  const frontmatter = raw.slice(0, raw.length - body.length)
  const { data } = matter(raw)

  const lines = ['cover:']
  // The plate stays declared: it is what the article falls back to if the photo is ever pulled.
  if (data.cover?.variant) lines.push(`  variant: ${data.cover.variant}`)
  if (Number.isInteger(data.cover?.seed)) lines.push(`  seed: ${data.cover.seed}`)
  lines.push(`  photo: ${fields.photo}`)
  lines.push(`  alt: ${yamlString(fields.alt)}`)
  if (fields.caption) lines.push(`  caption: ${yamlString(fields.caption)}`)
  lines.push(`  credit: ${yamlString(fields.credit)}`)
  if (fields.shot) lines.push(`  shot: ${fields.shot}`)
  const block = `${lines.join('\n')}\n`

  // An existing block runs from `cover:` to the next line that starts in column zero.
  const existing = /^cover:\n(?:[ \t]+.*\n)*/m
  if (existing.test(frontmatter)) return frontmatter.replace(existing, block) + body

  // Otherwise sit above `sources:`, which is always last and always present.
  if (/^sources:/m.test(frontmatter)) {
    return frontmatter.replace(/^sources:/m, `${block}sources:`) + body
  }
  return frontmatter.replace(/---\n$/, `${block}---\n`) + body
}

async function attach(articles) {
  const photoArg = arg('photo')
  const slug = arg('slug')
  if (!photoArg || !slug) {
    console.error('Both --photo and --slug are required. Run --list to see the inbox and its candidates.')
    process.exitCode = 1
    return
  }

  const article = articles.find((a) => a.slug === slug)
  if (!article) {
    console.error(`No article with slug "${slug}" in content/posts or content/queue.`)
    process.exitCode = 1
    return
  }

  const inboxItems = await readInbox()
  const item =
    inboxItems.find((i) => i.file === photoArg) ||
    (await fs
      .stat(path.resolve(photoArg))
      .then(() => ({ fromInbox: false, absolutePath: path.resolve(photoArg), sidecarPath: null, shot: null }))
      .catch(() => null))

  if (!item) {
    console.error(`"${photoArg}" is neither in photos/inbox nor a readable path.`)
    process.exitCode = 1
    return
  }

  const alt = { en: arg('alt-en'), cs: arg('alt-cs') }
  const caption = { en: arg('caption-en', ''), cs: arg('caption-cs', '') }
  const credit = arg('credit', DEFAULT_CREDIT)
  const name = arg('name', 'cover.jpg')
  const shot = arg('shot', item.shot)
  const dryRun = flag('dry-run')

  for (const locale of ['en', 'cs']) {
    if (!alt[locale] || alt[locale].trim().length < 15) {
      console.error(`--alt-${locale} is required and must actually describe the frame (15+ chars).`)
      process.exitCode = 1
      return
    }
  }

  const target = path.join(article.dir, name)
  const before = await sharp(item.absolutePath).metadata()

  console.log(`${path.basename(item.absolutePath)} → ${path.relative(ROOT, target)}`)
  console.log(`  ${before.width}×${before.height} ${before.format}${before.exif ? ' (EXIF present — will be stripped)' : ''}`)
  if (dryRun) {
    console.log('[dry run] nothing written')
    return
  }

  // rotate() applies the EXIF orientation before the metadata goes, or portrait shots come out
  // on their side. sharp drops all other metadata unless asked to keep it — which is what we
  // want: the GPS tag that made the match is not something to publish to the world.
  await sharp(item.absolutePath)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(target)

  const after = await fs.stat(target)
  console.log(`  written, ${Math.round(after.size / 1024)} KB`)

  for (const locale of ['en', 'cs']) {
    const file = path.join(article.dir, `index.${locale}.md`)
    const raw = await fs.readFile(file, 'utf8')
    await fs.writeFile(
      file,
      patchCover(raw, { photo: name, alt: alt[locale], caption: caption[locale], credit, shot })
    )
    console.log(`  ${path.relative(ROOT, file)} updated`)
  }

  // Only ever clear the inbox. A photo named by absolute path belongs to whoever passed it.
  if (item.fromInbox && !flag('keep')) {
    await fs.rm(item.absolutePath, { force: true })
    if (item.sidecarPath) await fs.rm(item.sidecarPath, { force: true })
    console.log('  cleared from the inbox')
  }

  console.log('\nNow run: node scripts/validate-posts.mjs && npm run build')
}

async function main() {
  if (!flag('no-import')) await importFromCloud()
  const articles = await loadArticles()
  if (flag('list')) return listInbox(articles)
  return attach(articles)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
