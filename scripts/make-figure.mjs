#!/usr/bin/env node
/**
 * A cover for the stories that have no place in them.
 *
 * Some articles are not about anywhere. An annual pass rising to 4,750 crowns, a thirty-year
 * contract worth 165 billion, a bid that came in 71 per cent over — there is nothing at a site to
 * photograph, no design has been drawn, and a route diagram has no route. Those articles fall back
 * to the desk plate, which is honest but says only which desk they belong to: every transport story
 * in the archive shows the same picture, and the one thing that makes this story worth reading —
 * the number — is not on it.
 *
 * So a figure plate: the same saturated ground and the same brand serif as the desk plate, with
 * the figure the story turns on set where the desk name would be. It is drawn here, from the
 * article, and it is the one kind of cover that states a fact on its face.
 *
 * That is why the gate checks it. `cover.figure` has to appear in the prose of **both** locales,
 * compared on digits alone so that Czech's "4 750" and English's "4,750" both count — a number on
 * a cover is a claim, and a claim the article does not make is the worst thing this could produce.
 *
 * Usage:
 *   node scripts/make-figure.mjs --category transport --figure "4 750" --unit "Kč" out.jpg
 *   node scripts/make-figure.mjs --category transport --figure "4 750" --unit "Kč" \\
 *     --mark assets/litacka-card.svg out.jpg
 *   node scripts/make-figure.mjs --category development --figure "165" --unit "mld." out.jpg
 *
 * `--mark` sets a piece of artwork beside the figure — the Lítačka card on a story about what a
 * pass costs. It is the one part of the plate that is not ours, so an article using it credits
 * whoever owns it and links where it came from, the same as any other borrowed picture. Use it
 * only where the artwork *is* the subject: the card a fare buys, not the logo of whoever announced
 * the news.
 *
 * One image serves both languages, so nothing here carries a sentence: digits, and a unit that
 * reads the same in Czech and English (Kč, %, km, m, ×). Everything needing a language — what the
 * number counts, and what it means — belongs in the per-locale caption, where a reader meets it
 * immediately underneath.
 */

import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { CATEGORY_ACCENT, PALETTE } = require(path.join(ROOT, 'src/lib/cover.js'))

const WIDTH = 2000
const HEIGHT = 1125
const PAD = 110
const MARK_WIDTH = 740
const MARK_GUTTER = 96

const SERIF = "'Source Serif 4 Variable', 'Source Serif 4', Georgia, serif"
const MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace"

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]))

/**
 * Units that mean the same thing in Czech and English. One image serves both locales, so a unit is
 * the one place a language can sneak onto a figure plate: "mld. Kč" is fine in Czech and wrong on
 * the English article, and "bn" is the reverse. Where the natural unit is a word, restate the
 * figure in neutral terms — 1 620 000 Kč rather than 1,62 mil. Kč — or leave the unit off and let
 * the caption carry it.
 */
const NEUTRAL_UNITS = ['Kč', '%', '°C', 'km', 'm', 'm²', 'min', 'h', '×', 'ha', 'kW', 'MW']

const GLYPH = (ch) => (ch === ' ' ? 0.28 : ch === ',' || ch === '.' ? 0.3 : 0.56)

/** Width of a string in ems, at the brand serif's digit proportions. */
const emWidth = (text) => [...text].reduce((sum, ch) => sum + GLYPH(ch), 0)

/**
 * The figure is set as large as it will go without crowding the frame, which means the type size
 * falls as the digits rise — "7" and "4 750" cannot share a size. Glyph widths in the brand serif
 * run about 0.56 em for a digit, close enough to pick a size from, and the unit is measured the
 * same way so it can sit after the figure instead of under it.
 */
function layout(figure, unit, hasMark) {
  const unitEm = unit ? emWidth(unit) * 0.3 + 0.18 : 0
  const room = WIDTH - PAD * 2 - (hasMark ? MARK_WIDTH + MARK_GUTTER : 0)
  const size = Math.min(560, Math.floor(room / (emWidth(figure) + unitEm)))
  return {
    size,
    unitSize: Math.round(size * 0.3),
    unitX: PAD + Math.round(emWidth(figure) * size) + Math.round(size * 0.12),
  }
}

function plate({ category, figure, unit, hasMark }) {
  const ground = CATEGORY_ACCENT[category] || PALETTE.primary
  const light = PALETTE.surface
  const { size, unitSize, unitX } = layout(figure, unit, hasMark)
  // Digits have no descenders, so the optical centre of a figure sits well above its baseline:
  // setting the baseline on the geometric middle leaves the plate visibly bottom-heavy. 0.68
  // balances the space above the cap height against the space below the rule.
  const baseline = Math.round(HEIGHT * 0.68)

  // A rule under the figure, the way the desk plate sets its name on a plinth: it gives the number
  // something to stand on instead of floating in a colour field. Clear of the baseline, not
  // through it — digits have no descenders, so that gap is all that separates a plinth from a
  // strikethrough, which is what the first cut of this drew.
  const ruleY = baseline + Math.round(size * 0.14)

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${ground}"/>
  <text x="${PAD}" y="${baseline}" font-family="${SERIF}" font-size="${size}" font-weight="700"
        letter-spacing="-6" fill="${light}">${escapeXml(figure)}</text>
  ${
    unit
      ? `<text x="${unitX}" y="${baseline}" font-family="${SERIF}" font-size="${unitSize}"
        font-weight="700" fill="${light}" opacity="0.75">${escapeXml(unit)}</text>`
      : ''
  }
  <rect x="${PAD}" y="${ruleY}" width="${hasMark ? WIDTH - PAD * 2 - MARK_WIDTH - MARK_GUTTER : WIDTH - PAD * 2}" height="3" fill="${light}" opacity="0.45"/>
  <text x="${WIDTH - PAD}" y="${HEIGHT - PAD + 10}" text-anchor="end" font-family="${MONO}"
        font-size="30" letter-spacing="3" fill="${light}" opacity="0.7">PRAGUE INSIDER</text>
</svg>`)
}

async function main() {
  const args = process.argv.slice(2)

  // Explicit, because the output path is positional and guessing which bare word it is goes wrong
  // the moment a flag value looks like one. Known flags consume their value; whatever is left over
  // is the path.
  const FLAGS = ['category', 'figure', 'unit', 'mark']
  const opts = {}
  const positional = []
  for (let i = 0; i < args.length; i += 1) {
    const flag = args[i].startsWith('--') ? args[i].slice(2) : null
    if (flag && FLAGS.includes(flag)) {
      opts[flag] = args[i + 1]
      i += 1
    } else if (flag) {
      console.error(`unknown option --${flag}`)
      process.exitCode = 1
      return
    } else {
      positional.push(args[i])
    }
  }
  const { category, figure, unit, mark } = opts
  const out = positional[0]

  if (!category || !figure || !out) {
    console.error('Usage: node scripts/make-figure.mjs --category <desk> --figure "4 750" [--unit "Kč"] <out.jpg>')
    process.exitCode = 1
    return
  }
  if (unit && !NEUTRAL_UNITS.includes(unit)) {
    console.error(
      `--unit "${unit}" is not language-neutral, and one image serves both locales.\n` +
        `Use one of: ${NEUTRAL_UNITS.join(' ')} — or restate the figure so it needs no word.`
    )
    process.exitCode = 1
    return
  }
  if (!CATEGORY_ACCENT[category]) {
    console.error(`--category "${category}" is not a desk: ${Object.keys(CATEGORY_ACCENT).join(', ')}`)
    process.exitCode = 1
    return
  }

  const base = sharp(plate({ category, figure, unit, hasMark: Boolean(mark) }))
  if (mark) {
    // Rendered at high density first: an SVG scaled up after rasterising at its own 240 px is a
    // blur, and the card is the half of this plate a reader recognises.
    const art = await sharp(mark, { density: 600 }).resize({ width: MARK_WIDTH }).png().toBuffer()
    const { height } = await sharp(art).metadata()
    base.composite([{ input: art, left: WIDTH - PAD - MARK_WIDTH, top: Math.round((HEIGHT - height) / 2) }])
  }
  await base.jpeg({ quality: 90, mozjpeg: true }).toFile(out)
  console.log(`${out} — ${category}, "${figure}${unit ? ` ${unit}` : ''}"${mark ? ` + ${path.basename(mark)}` : ''}`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
