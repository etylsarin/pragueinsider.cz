#!/usr/bin/env node
/**
 * Renders the desk plates once, into static/covers/.
 *
 * Every article without a photograph shows its desk's plate, and every article on a desk shows
 * the same one. Previously each article got its own — the slug seeded the placement inside the
 * motif, so twelve articles meant twelve different drawings, inlined separately into every page
 * and rasterised into twenty-five PNGs on every build. That bought variation nobody asked for at
 * the cost of a cache that could never hit.
 *
 * Now there are fifteen files, generated when the design changes and committed. The browser
 * fetches one per desk and reuses it across the whole archive.
 *
 * src/lib/cover.js is still the single implementation; this is the only thing that calls it for
 * plates. Photographed articles skip all of it.
 *
 * Usage:
 *   node scripts/make-covers.mjs [--out static/covers]
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const { coverSvg, hash } = require(path.join(ROOT, 'src/lib/cover.js'))
const { CATEGORIES } = require(path.join(ROOT, 'src/config/categories.js'))
const { LOCALES } = require(path.join(ROOT, 'src/config/site.js'))

const outIndex = process.argv.indexOf('--out')
const OUT = path.resolve(outIndex >= 0 ? process.argv[outIndex + 1] : path.join(ROOT, 'static/covers'))

/** Seeded by the desk key, so the same design produces the same plate on every machine. */
const plate = (category, label, format) =>
  coverSvg({ slug: category, title: label, category, label, seed: hash(category) }, { format })

async function main() {
  await fs.mkdir(OUT, { recursive: true })

  let sharp
  try {
    sharp = require('sharp')
  } catch {
    console.error('sharp is required to rasterise the social cards.')
    process.exitCode = 1
    return
  }

  let files = 0
  for (const category of CATEGORIES) {
    // The page plates are per-format but not per-locale: they carry no words but the desk name,
    // and that is set from the label, so each locale needs its own.
    for (const locale of LOCALES) {
      for (const format of ['card', 'hero']) {
        const svg = plate(category.key, category.label[locale], format)
        await fs.writeFile(path.join(OUT, `${category.key}-${locale}-${format}.svg`), svg)
        files += 1
      }
      const png = await sharp(Buffer.from(plate(category.key, category.label[locale], 'ogPlate')))
        .png({ compressionLevel: 9 })
        .toBuffer()
      await fs.writeFile(path.join(OUT, `${category.key}-${locale}-og.png`), png)
      files += 1
    }
  }

  // The fallback for anything with no desk at all — the home page's social card, mostly.
  const fallback = coverSvg(
    { slug: 'prague-insider', title: 'Prague Insider', category: 'architecture', label: 'Prague Insider' },
    { format: 'ogPlate' }
  )
  await fs.writeFile(
    path.join(OUT, 'default-og.png'),
    await sharp(Buffer.from(fallback)).png({ compressionLevel: 9 }).toBuffer()
  )
  files += 1

  console.log(`Wrote ${files} file(s) to ${path.relative(ROOT, OUT)}.`)
  console.log('Commit them. Re-run only when the design in src/lib/cover.js changes.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
