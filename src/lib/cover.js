/**
 * Deterministic typographic cover art.
 *
 * Prague Insider writes about buildings it does not own photographs of, so every post gets a
 * generated blueprint-style cover instead of a third-party photo. The same SVG string is
 * inlined on the page by src/components/Cover.jsx and rasterised into 1200x630 OG images by
 * gatsby-node.js — one implementation, two consumers, no drift.
 *
 * Everything is derived from the slug hash, so a given post always renders the same cover.
 */

const PALETTE = {
  primary: '#42362b',
  surface: '#fcf9f8',
  parchment: '#E9E3B4',
  slate: '#2D3436',
  brick: '#B33939',
  vltava: '#00629e',
  outline: '#d0c4bb',
  onPrimary: '#ffffff',
}

const VARIANTS = ['grid', 'strata', 'plan', 'transit']

/** Per-desk accent, so a transport story reads differently from a heritage one at a glance. */
const CATEGORY_ACCENT = {
  development: PALETTE.brick,
  transport: PALETTE.vltava,
  'public-space': '#4d6b3f',
  planning: PALETTE.slate,
  architecture: PALETTE.primary,
}

/** FNV-1a — small, stable across Node and the browser, good enough to pick a variant. */
const hash = (input) => {
  let h = 0x811c9dc5
  for (let i = 0; i < String(input).length; i += 1) {
    h ^= String(input).charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** Deterministic 0..1 sequence seeded off the slug. */
const rng = (seed) => {
  let state = seed >>> 0 || 1
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    state >>>= 0
    return state / 0xffffffff
  }
}

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

/** Greedy wrap by character budget — SVG has no text layout, so we place each line ourselves. */
const wrapText = (text, maxChars, maxLines) => {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length > maxChars && line) {
      lines.push(line)
      line = word
      if (lines.length === maxLines) break
    } else {
      line = candidate
    }
  }
  if (lines.length < maxLines && line) lines.push(line)
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    const last = lines[maxLines - 1]
    lines[maxLines - 1] = `${last.replace(/[\s,.;:–-]+$/, '')}…`
  }
  return lines
}

// --- background variants -----------------------------------------------------------------

const drawGrid = (w, h, accent, random) => {
  const parts = []
  const step = 40
  for (let x = 0; x <= w; x += step) {
    parts.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${PALETTE.outline}" stroke-width="1.4" opacity="0.7"/>`)
  }
  for (let y = 0; y <= h; y += step) {
    parts.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${PALETTE.outline}" stroke-width="1.4" opacity="0.7"/>`)
  }
  // Filled cells read as massing on a site plan. Enough of them, dark enough, that the cover
  // still reads as a deliberate graphic at thumbnail size.
  const blocks = 9 + Math.floor(random() * 5)
  for (let i = 0; i < blocks; i += 1) {
    const bx = Math.floor(random() * (w / step - 4)) * step
    const by = Math.floor(random() * (h / step - 3)) * step
    const bw = (1 + Math.floor(random() * 3)) * step
    const bh = (1 + Math.floor(random() * 2)) * step
    const isAccent = i === 0
    parts.push(
      `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="${isAccent ? accent : PALETTE.primary}" opacity="${isAccent ? 0.9 : 0.14 + (i % 3) * 0.07}"/>`
    )
  }
  return parts.join('')
}

const drawStrata = (w, h, accent, random) => {
  const parts = []
  let y = 0
  let index = 0
  while (y < h) {
    const band = 18 + Math.floor(random() * 46)
    const opacity = 0.05 + random() * 0.12
    parts.push(`<rect x="0" y="${y}" width="${w}" height="${band}" fill="${PALETTE.primary}" opacity="${opacity.toFixed(3)}"/>`)
    if (index % 4 === 2) {
      parts.push(`<rect x="0" y="${y}" width="${w}" height="3" fill="${accent}" opacity="0.75"/>`)
    }
    y += band
    index += 1
  }
  return parts.join('')
}

const drawPlan = (w, h, accent, random) => {
  const parts = [`<rect x="0" y="0" width="${w}" height="${h}" fill="${PALETTE.surface}"/>`]
  // Recursive-ish subdivision: rooms on a floor plan.
  const rooms = []
  const split = (x, y, rw, rh, depth) => {
    if (depth === 0 || rw < 90 || rh < 70) {
      rooms.push([x, y, rw, rh])
      return
    }
    const vertical = rw > rh
    const ratio = 0.35 + random() * 0.3
    if (vertical) {
      const cut = Math.round(rw * ratio)
      split(x, y, cut, rh, depth - 1)
      split(x + cut, y, rw - cut, rh, depth - 1)
    } else {
      const cut = Math.round(rh * ratio)
      split(x, y, rw, cut, depth - 1)
      split(x, y + cut, rw, rh - cut, depth - 1)
    }
  }
  split(0, 0, w, h, 4)
  rooms.forEach(([x, y, rw, rh], i) => {
    parts.push(
      `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="none" stroke="${PALETTE.primary}" stroke-width="2.5" opacity="0.55"/>`
    )
    // Poché every third room so the plan has figure-ground rather than reading as empty outline.
    if (i % 3 === 1) {
      parts.push(`<rect x="${x + 7}" y="${y + 7}" width="${rw - 14}" height="${rh - 14}" fill="${accent}" opacity="0.2"/>`)
    } else if (i % 5 === 0) {
      parts.push(`<rect x="${x + 7}" y="${y + 7}" width="${rw - 14}" height="${rh - 14}" fill="${PALETTE.primary}" opacity="0.1"/>`)
    }
  })
  return parts.join('')
}

const drawTransit = (w, h, accent, random) => {
  const parts = []
  const lineColors = [accent, PALETTE.primary, PALETTE.vltava, PALETTE.brick]
  const lines = 3 + Math.floor(random() * 2)
  for (let i = 0; i < lines; i += 1) {
    let x = -40
    let y = 60 + random() * (h - 120)
    const points = [`${x},${y}`]
    while (x < w + 40) {
      const dx = 60 + random() * 110
      const dy = (random() - 0.5) * 150
      x += dx
      y = Math.max(30, Math.min(h - 30, y + dy))
      // Transit diagrams move orthogonally or at 45° — never freehand.
      points.push(`${x - dx / 2},${y - dy}`)
      points.push(`${x},${y}`)
    }
    const color = lineColors[i % lineColors.length]
    parts.push(
      `<polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" opacity="${i === 0 ? 0.85 : 0.3}"/>`
    )
    // Interchange dots.
    for (let p = 2; p < points.length; p += 4) {
      const [cx, cy] = points[p].split(',')
      parts.push(`<circle cx="${cx}" cy="${cy}" r="7" fill="${PALETTE.surface}" stroke="${color}" stroke-width="4" opacity="${i === 0 ? 0.9 : 0.35}"/>`)
    }
  }
  return parts.join('')
}

const BACKGROUNDS = { grid: drawGrid, strata: drawStrata, plan: drawPlan, transit: drawTransit }

/**
 * @param {object} post
 * @param {string} post.slug      stable identity — drives variant choice and geometry
 * @param {string} post.title     headline, wrapped into the cover
 * @param {string} post.category  category key, drives the accent colour
 * @param {string} post.label     already-localised desk label (e.g. "Doprava")
 * @param {string} [post.variant] frontmatter override
 * @param {number} [post.seed]    frontmatter override
 * @param {object} [opts]
 * @param {'wide'|'og'} [opts.format] 'wide' = 16:9 in-page, 'og' = 1200x630 social card
 * @param {boolean} [opts.showTitle] burn the headline into the artwork
 *
 * On the site the headline is always rendered as real text next to the cover, so repeating it
 * inside the graphic just says the same thing twice. In-page covers are therefore abstract —
 * pattern, desk chip, wordmark — and only the OG card, which travels alone into a social feed
 * with no headline beside it, carries the title.
 */
const coverSvg = ({ slug, title, category, label, variant, seed }, opts = {}) => {
  const format = opts.format || 'wide'
  const showTitle = opts.showTitle ?? format === 'og'
  const w = 1200
  const h = format === 'og' ? 630 : 675
  const seedValue = typeof seed === 'number' ? seed : hash(slug)
  const random = rng(seedValue)
  const chosen = VARIANTS.includes(variant) ? variant : VARIANTS[seedValue % VARIANTS.length]
  const accent = CATEGORY_ACCENT[category] || PALETTE.primary
  const background = (BACKGROUNDS[chosen] || drawGrid)(w, h, accent, random)

  const chipWidth = Math.max(120, (label || '').length * 15 + 40)
  const wordmark = `<rect x="72" y="${h - 62}" width="64" height="4" fill="${accent}"/>
  <text x="${w - 72}" y="${h - 50}" text-anchor="end" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="17" letter-spacing="1.2" fill="${PALETTE.primary}" opacity="0.7">PRAGUE INSIDER</text>`

  let overlay
  if (showTitle) {
    const lines = wrapText(title, 30, 3)
    const titleSize = lines.length > 2 ? 62 : 72
    const lineHeight = titleSize * 1.15
    const textTop = h - 96 - lines.length * lineHeight
    const titleTspans = lines
      .map((line, i) => `<tspan x="72" y="${Math.round(textTop + i * lineHeight)}">${escapeXml(line)}</tspan>`)
      .join('')

    overlay = `<rect x="0" y="${Math.round(textTop - 132)}" width="${w}" height="${h - Math.round(textTop - 132)}" fill="${PALETTE.surface}" opacity="0.88"/>
  <rect x="72" y="${Math.round(textTop - 108)}" width="${chipWidth}" height="34" fill="${accent}"/>
  <text x="92" y="${Math.round(textTop - 85)}" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="17" letter-spacing="1.6" fill="${PALETTE.onPrimary}">${escapeXml(String(label || '').toUpperCase())}</text>
  <text font-family="'Source Serif 4 Variable', 'Source Serif 4', Georgia, serif" font-size="${titleSize}" font-weight="700" fill="${PALETTE.primary}" letter-spacing="-1">${titleTspans}</text>
  ${wordmark}`
  } else {
    overlay = `<rect x="72" y="${h - 122}" width="${chipWidth}" height="34" fill="${accent}"/>
  <text x="92" y="${h - 99}" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="17" letter-spacing="1.6" fill="${PALETTE.onPrimary}">${escapeXml(String(label || '').toUpperCase())}</text>
  ${wordmark}`
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${escapeXml(title)}">
  <rect width="${w}" height="${h}" fill="${PALETTE.surface}"/>
  ${background}
  ${overlay}
</svg>`
}

module.exports = { coverSvg, VARIANTS, CATEGORY_ACCENT, PALETTE, hash }
