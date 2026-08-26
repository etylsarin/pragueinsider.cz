#!/usr/bin/env node
/**
 * Publication gate.
 *
 * Nothing reaches the repo without passing this. It cannot tell whether an article is true —
 * only whether it is structurally publishable and properly sourced. That is a narrow promise,
 * and it is the one made on the Editorial Standards page.
 *
 * Usage:
 *   node scripts/validate-posts.mjs                 validate content/posts and content/pages
 *   node scripts/validate-posts.mjs --check-links   also HEAD every source URL (slow, networked)
 *   node scripts/validate-posts.mjs --quiet         only print problems
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const require = createRequire(import.meta.url)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const { CATEGORY_KEYS } = require(path.join(ROOT, 'src/config/categories.js'))
const { STATIC_PAGES } = require(path.join(ROOT, 'src/config/pages.js'))
const { reservedSlugs } = require(path.join(ROOT, 'src/lib/paths.js'))
const { VARIANTS } = require(path.join(ROOT, 'src/lib/cover.js'))
const { LOCALES } = require(path.join(ROOT, 'src/config/site.js'))

const RESERVED = reservedSlugs()

/** Prague's bounding box, generously drawn. A marker outside it is a data-entry error. */
const PRAGUE_BOUNDS = { west: 14.15, east: 14.80, south: 49.90, north: 50.22 }

const MIN_BODY_CHARS = 800
const PLACEHOLDERS = [/\bTODO\b/, /\bTKTK\b/i, /\bXXX\b/, /\[insert/i, /\bLorem ipsum\b/i, /\bFIXME\b/]

const problems = []
const notes = []
const fail = (file, message) => problems.push({ file, message })
const warn = (file, message) => notes.push({ file, message })

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0

const isHttpUrl = (value) => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

/** Frontmatter dates arrive from YAML as Date objects or strings depending on quoting. */
const toIsoDate = (value) => {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value.toISOString().slice(0, 10)
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? null : value.slice(0, 10)
  }
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

async function validatePosts() {
  const postsDir = path.join(ROOT, 'content/posts')
  const dirs = await readDirs(postsDir)
  const slugsSeen = new Map()
  let checked = 0

  for (const dirName of dirs.sort()) {
    const rel = `content/posts/${dirName}`

    const dirMatch = /^(\d{4}-\d{2}-\d{2})-(.+)$/.exec(dirName)
    if (!dirMatch) {
      fail(rel, 'directory must be named YYYY-MM-DD-slug')
      continue
    }
    const [, dirDate, dirSlug] = dirMatch

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(dirSlug)) {
      fail(rel, `slug "${dirSlug}" must be lowercase ASCII words separated by single hyphens`)
    }
    if (RESERVED.has(dirSlug)) {
      fail(rel, `slug "${dirSlug}" collides with a reserved route (category, page or system path)`)
    }
    if (slugsSeen.has(dirSlug)) {
      fail(rel, `slug "${dirSlug}" already used by ${slugsSeen.get(dirSlug)}`)
    } else {
      slugsSeen.set(dirSlug, rel)
    }

    const files = await fs.readdir(path.join(postsDir, dirName))
    const present = LOCALES.filter((locale) => files.includes(`index.${locale}.md`))
    const missing = LOCALES.filter((locale) => !present.includes(locale))
    if (missing.length) {
      fail(rel, `missing translation(s): ${missing.map((l) => `index.${l}.md`).join(', ')} — every post ships in both languages`)
    }

    const perLocale = {}
    for (const locale of present) {
      const file = `${rel}/index.${locale}.md`
      const raw = await fs.readFile(path.join(postsDir, dirName, `index.${locale}.md`), 'utf8')
      const { data: fm, content } = matter(raw)
      checked += 1
      perLocale[locale] = fm

      // --- required text ---
      if (!isNonEmptyString(fm.title)) fail(file, 'title is required')
      else if (fm.title.length > 140) warn(file, `title is ${fm.title.length} chars — headlines over ~110 wrap badly`)
      if (!isNonEmptyString(fm.dek)) fail(file, 'dek (standfirst) is required')

      // --- identity ---
      if (fm.slug !== dirSlug) fail(file, `frontmatter slug "${fm.slug}" must equal directory slug "${dirSlug}"`)
      if (fm.lang !== locale) fail(file, `frontmatter lang "${fm.lang}" must equal the filename locale "${locale}"`)

      // --- date ---
      const iso = toIsoDate(fm.date)
      if (!iso) {
        fail(file, 'date is required as YYYY-MM-DD')
      } else {
        if (iso !== dirDate) fail(file, `date ${iso} must equal the directory date prefix ${dirDate}`)
        // Tomorrow is allowed for timezone slack; anything beyond is a mistake.
        if (Date.parse(iso) > Date.now() + 36 * 3600 * 1000) fail(file, `date ${iso} is in the future`)
      }

      // --- taxonomy ---
      if (!CATEGORY_KEYS.includes(fm.category)) {
        fail(file, `category "${fm.category}" must be one of: ${CATEGORY_KEYS.join(', ')}`)
      }
      if (fm.tags !== undefined && (!Array.isArray(fm.tags) || fm.tags.some((tag) => !isNonEmptyString(tag)))) {
        fail(file, 'tags must be an array of non-empty strings')
      }

      // --- provenance: the one rule that must never be relaxed ---
      if (!Array.isArray(fm.sources) || fm.sources.length === 0) {
        fail(file, 'sources is required and must list at least one original')
      } else {
        fm.sources.forEach((source, i) => {
          if (!source || typeof source !== 'object') {
            fail(file, `sources[${i}] must be an object with url, title and publisher`)
            return
          }
          if (!isHttpUrl(source.url)) fail(file, `sources[${i}].url "${source.url}" is not a valid http(s) URL`)
          if (!isNonEmptyString(source.title)) fail(file, `sources[${i}].title is required`)
          if (!isNonEmptyString(source.publisher)) warn(file, `sources[${i}].publisher is empty`)
        })
      }
      if (fm.aiGenerated !== true) {
        fail(file, 'aiGenerated must be true — the disclosure is not optional')
      }

      // --- optional structured fields ---
      if (fm.location !== undefined) {
        const { lat, lng } = fm.location || {}
        if (typeof lat !== 'number' || typeof lng !== 'number') {
          fail(file, 'location must be {lat: number, lng: number}')
        } else if (
          lat < PRAGUE_BOUNDS.south || lat > PRAGUE_BOUNDS.north ||
          lng < PRAGUE_BOUNDS.west || lng > PRAGUE_BOUNDS.east
        ) {
          fail(file, `location ${lat},${lng} falls outside Prague`)
        }
      }
      if (fm.cover !== undefined) {
        if (fm.cover.variant !== undefined && !VARIANTS.includes(fm.cover.variant)) {
          fail(file, `cover.variant "${fm.cover.variant}" must be one of: ${VARIANTS.join(', ')}`)
        }
        if (fm.cover.seed !== undefined && !Number.isInteger(fm.cover.seed)) {
          fail(file, 'cover.seed must be an integer')
        }
      }

      // --- body ---
      const body = content.trim()
      if (body.length < MIN_BODY_CHARS) {
        fail(file, `body is ${body.length} chars — below the ${MIN_BODY_CHARS} minimum for a publishable article`)
      }
      for (const pattern of PLACEHOLDERS) {
        if (pattern.test(body)) fail(file, `body contains an unresolved placeholder (${pattern})`)
      }
      if (/^#\s/m.test(body)) {
        warn(file, 'body uses an H1 — the template renders the title, so start sections at H2')
      }
    }

    // --- cross-locale consistency ---
    if (present.length === LOCALES.length) {
      const [first, ...others] = LOCALES
      for (const locale of others) {
        const a = perLocale[first]
        const b = perLocale[locale]
        if (!a || !b) continue
        if (a.category !== b.category) {
          fail(rel, `category differs between locales: ${first}=${a.category} ${locale}=${b.category}`)
        }
        if (toIsoDate(a.date) !== toIsoDate(b.date)) {
          fail(rel, `date differs between locales: ${first}=${toIsoDate(a.date)} ${locale}=${toIsoDate(b.date)}`)
        }
        const urlsA = (a.sources || []).map((s) => s?.url).sort().join('|')
        const urlsB = (b.sources || []).map((s) => s?.url).sort().join('|')
        if (urlsA !== urlsB) {
          fail(rel, 'both locales must cite the same sources — they report the same facts')
        }
      }
    }
  }

  // Two pins on one day is a silent bug: the homepage takes the first and ignores the rest.
  const featuredByDate = new Map()
  for (const dirName of dirs) {
    const match = /^(\d{4}-\d{2}-\d{2})-/.exec(dirName)
    if (!match) continue
    try {
      const raw = await fs.readFile(path.join(postsDir, dirName, 'index.en.md'), 'utf8')
      const { data: fm } = matter(raw)
      if (fm.featured === true) {
        const list = featuredByDate.get(match[1]) || []
        list.push(dirName)
        featuredByDate.set(match[1], list)
      }
    } catch {
      /* missing locale already reported above */
    }
  }
  for (const [date, dirNames] of featuredByDate) {
    if (dirNames.length > 1) {
      fail(`content/posts (${date})`, `${dirNames.length} posts marked featured on one day — the homepage leads with one and silently ignores the rest: ${dirNames.join(', ')}`)
    }
  }

  return { dirs: dirs.length, files: checked, slugs: slugsSeen }
}

/**
 * Queued articles are validated to the same standard as published ones, minus the two rules that
 * only make sense once a release date exists. Catching a broken article here is the whole point:
 * by the time release.mjs moves it, nobody is looking.
 */
async function validateQueue(publishedSlugs) {
  const queueDir = path.join(ROOT, 'content/queue')
  const slugs = await readDirs(queueDir)

  for (const slug of slugs.sort()) {
    const rel = `content/queue/${slug}`

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      fail(rel, `slug "${slug}" must be lowercase ASCII words separated by single hyphens`)
    }
    if (RESERVED.has(slug)) {
      fail(rel, `slug "${slug}" collides with a reserved route`)
    }
    if (publishedSlugs.has(slug)) {
      fail(rel, `slug "${slug}" is already published at ${publishedSlugs.get(slug)}`)
    }

    const files = await fs.readdir(path.join(queueDir, slug))
    const missing = LOCALES.filter((locale) => !files.includes(`index.${locale}.md`))
    if (missing.length) {
      fail(rel, `missing translation(s): ${missing.map((l) => `index.${l}.md`).join(', ')}`)
    }

    for (const locale of LOCALES.filter((l) => files.includes(`index.${l}.md`))) {
      const file = `${rel}/index.${locale}.md`
      const { data: fm, content } = matter(
        await fs.readFile(path.join(queueDir, slug, `index.${locale}.md`), 'utf8')
      )

      if (!isNonEmptyString(fm.title)) fail(file, 'title is required')
      if (!isNonEmptyString(fm.dek)) fail(file, 'dek is required')
      if (fm.slug !== slug) fail(file, `frontmatter slug "${fm.slug}" must equal directory "${slug}"`)
      if (fm.lang !== locale) fail(file, `frontmatter lang "${fm.lang}" must equal "${locale}"`)
      if (!CATEGORY_KEYS.includes(fm.category)) {
        fail(file, `category "${fm.category}" must be one of: ${CATEGORY_KEYS.join(', ')}`)
      }
      if (fm.aiGenerated !== true) fail(file, 'aiGenerated must be true')
      if (!Array.isArray(fm.sources) || fm.sources.length === 0) {
        fail(file, 'sources is required and must list at least one original')
      } else {
        fm.sources.forEach((source, i) => {
          if (!isHttpUrl(source?.url)) fail(file, `sources[${i}].url is not a valid http(s) URL`)
        })
      }

      // The queue's own rule: a release date is assigned by release.mjs, not written by hand.
      if (!toIsoDate(fm.queuedAt)) {
        fail(file, 'queuedAt is required as YYYY-MM-DD — release.mjs turns it into the date')
      }
      if (fm.date !== undefined) {
        fail(file, 'queued articles must not carry a date; release.mjs assigns it on release')
      }

      const body = content.trim()
      if (body.length < MIN_BODY_CHARS) {
        fail(file, `body is ${body.length} chars — below the ${MIN_BODY_CHARS} minimum`)
      }
      for (const pattern of PLACEHOLDERS) {
        if (pattern.test(body)) fail(file, `body contains an unresolved placeholder (${pattern})`)
      }
    }
  }

  return slugs.length
}

async function validatePages() {
  const pagesDir = path.join(ROOT, 'content/pages')
  const dirs = await readDirs(pagesDir)
  const known = new Set(STATIC_PAGES.map((page) => page.key))

  for (const key of known) {
    if (!dirs.includes(key)) fail(`content/pages/${key}`, 'declared in src/config/pages.js but missing')
  }

  for (const dirName of dirs) {
    const rel = `content/pages/${dirName}`
    if (!known.has(dirName)) {
      warn(rel, 'no entry in src/config/pages.js — it will not be routed')
      continue
    }
    const files = await fs.readdir(path.join(pagesDir, dirName))
    for (const locale of LOCALES) {
      if (!files.includes(`index.${locale}.md`)) {
        fail(rel, `missing index.${locale}.md`)
        continue
      }
      const raw = await fs.readFile(path.join(pagesDir, dirName, `index.${locale}.md`), 'utf8')
      const { data: fm } = matter(raw)
      if (!isNonEmptyString(fm.title)) fail(`${rel}/index.${locale}.md`, 'title is required')
    }
  }

  return dirs.length
}

/** Optional network pass — off by default so the gate stays fast and offline-safe. */
async function checkLinks() {
  const postsDir = path.join(ROOT, 'content/posts')
  const dirs = await readDirs(postsDir)
  const urls = new Set()

  for (const dirName of dirs) {
    for (const locale of LOCALES) {
      const file = path.join(postsDir, dirName, `index.${locale}.md`)
      try {
        const { data: fm } = matter(await fs.readFile(file, 'utf8'))
        for (const source of fm.sources || []) {
          if (isHttpUrl(source?.url)) urls.add(source.url)
        }
      } catch {
        /* missing locale already reported */
      }
    }
  }

  const results = await Promise.allSettled(
    [...urls].map(async (url) => {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 15000)
      try {
        const response = await fetch(url, {
          method: 'HEAD',
          redirect: 'follow',
          signal: controller.signal,
          headers: { 'User-Agent': 'PragueInsiderBot/1.0 (+https://www.pragueinsider.cz/)' },
        })
        // Some CMSes reject HEAD outright; that is not a dead link.
        if (!response.ok && response.status !== 405 && response.status !== 403) {
          warn('sources', `${url} → HTTP ${response.status}`)
        }
      } finally {
        clearTimeout(timer)
      }
    })
  )

  results.forEach((result, i) => {
    if (result.status === 'rejected') warn('sources', `${[...urls][i]} → ${result.reason?.message || 'unreachable'}`)
  })

  return urls.size
}

async function main() {
  const args = process.argv.slice(2)
  const quiet = args.includes('--quiet')

  const posts = await validatePosts()
  const queueCount = await validateQueue(posts.slugs)
  const pageCount = await validatePages()
  let linkCount = 0
  if (args.includes('--check-links')) linkCount = await checkLinks()

  if (!quiet) {
    console.log(
      `Checked ${posts.dirs} post(s) / ${posts.files} file(s), ${queueCount} queued, ${pageCount} standing page(s)` +
        (linkCount ? `, ${linkCount} source link(s)` : '')
    )
  }

  if (notes.length) {
    console.log(`\n${notes.length} warning(s):`)
    for (const note of notes) console.log(`  ~ ${note.file}: ${note.message}`)
  }

  if (problems.length) {
    console.error(`\n${problems.length} error(s):`)
    for (const problem of problems) console.error(`  ✗ ${problem.file}: ${problem.message}`)
    console.error('\nNothing is publishable until these are fixed.')
    process.exitCode = 1
    return
  }

  if (!quiet) console.log('\nAll checks passed.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
