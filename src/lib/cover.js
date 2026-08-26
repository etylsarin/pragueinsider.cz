/**
 * Cover art for every article.
 *
 * Prague Insider mostly writes about buildings nobody on the desk has stood in front of, so an
 * article gets a generated cover unless someone has been there and photographed it — never
 * licensed or scraped photography. The same SVG string is inlined on the page by
 * src/components/Cover.jsx and rasterised into OG cards by gatsby-node.js — one implementation,
 * two consumers, no drift. Articles that do carry a photograph use it in both places instead,
 * and ogPhotoOverlaySvg() below keeps their social card set in the same type.
 *
 * The design is a **section plate**: a saturated ground in the desk's colour, one architectural
 * motif belonging to that desk, and the desk name set large in the brand serif. Each desk keeps
 * its own motif, so the covers build a visual language across the archive instead of looking
 * randomly generated; the slug hash only varies placement and counts within that motif, so two
 * transport stories are recognisably siblings without being identical.
 *
 * (An earlier version drew faint outlines on a white ground. At full width that read as a
 * loading skeleton rather than artwork — hence the solid grounds and the high-contrast motifs.)
 */

const PALETTE = {
  primary: '#42362b',
  surface: '#fcf9f8',
  parchment: '#E9E3B4',
  slate: '#2D3436',
  brick: '#B33939',
  vltava: '#00629e',
  outline: '#d0c4bb',
}

/** Ground colour per desk. All are dark enough to carry light motifs and light type. */
const CATEGORY_ACCENT = {
  development: PALETTE.brick,
  transport: PALETTE.vltava,
  'public-space': '#3F5B34',
  planning: PALETTE.slate,
  architecture: PALETTE.primary,
}

/** Each desk draws its own motif. Frontmatter `cover.variant` can override. */
const CATEGORY_MOTIF = {
  architecture: 'arcade',
  transport: 'transit',
  'public-space': 'canopy',
  planning: 'parcels',
  development: 'massing',
}

const VARIANTS = ['arcade', 'transit', 'canopy', 'parcels', 'massing']

const FORMATS = {
  card: { w: 1200, h: 675 },
  hero: { w: 1200, h: 600 },
  og: { w: 1200, h: 630 },
}

const SERIF = "'Source Serif 4 Variable', 'Source Serif 4', Georgia, serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"

/** FNV-1a — small, stable across Node and the browser. */
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

/** Greedy wrap by character budget — SVG has no text layout, so lines are placed by hand. */
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
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[\s,.;:–-]+$/, '')}…`
  }
  return lines
}

// --- motifs -------------------------------------------------------------------------------
//
// Every motif draws into the upper band only and stands on `ground` — the same y at which the
// typographic plinth begins. That shared baseline is what makes five different drawings read as
// one family, and it keeps the desk name on a clean field instead of on top of the artwork.

const L = PALETTE.surface
const P = PALETTE.parchment

/** Malá Strana arcades: a colonnade of round arches springing from the ground line. */
const drawArcade = (w, ground, random) => {
  const parts = []
  const count = 7 + Math.floor(random() * 4)
  const gap = 16
  const bw = (w + gap) / count - gap
  const radius = bw / 2
  const springing = ground - radius - (ground * 0.16 + random() * ground * 0.12)

  for (let i = 0; i < count; i += 1) {
    const x = i * (bw + gap)
    const filled = random() > 0.6
    const d = `M ${x} ${ground} L ${x} ${springing} A ${radius} ${radius} 0 0 1 ${x + bw} ${springing} L ${x + bw} ${ground} Z`
    parts.push(
      `<path d="${d}" fill="${filled ? P : L}" fill-opacity="${filled ? 0.92 : 0.1}" stroke="${L}" stroke-width="3" stroke-opacity="0.5"/>`
    )
  }
  return parts.join('')
}

/** Metro/tram diagram: orthogonal and 45° runs with interchange nodes. */
const drawTransit = (w, ground, random) => {
  const parts = []
  const colors = [P, L, L]

  for (let i = 0; i < 3; i += 1) {
    let x = -60
    let y = ground * (0.26 + i * 0.24) + (random() - 0.5) * 50
    const points = [[x, y]]
    while (x < w + 60) {
      const run = 90 + random() * 130
      x += run
      if (random() > 0.55) {
        const dir = random() > 0.5 ? 1 : -1
        const step = Math.min(run * 0.7, 96)
        y = Math.max(40, Math.min(ground - 40, y + dir * step))
      }
      points.push([x, y])
    }
    const path = points.map(([px, py]) => `${Math.round(px)},${Math.round(py)}`).join(' ')
    parts.push(
      `<polyline points="${path}" fill="none" stroke="${colors[i]}" stroke-width="${i === 0 ? 13 : 8}" stroke-linejoin="round" stroke-linecap="round" opacity="${i === 0 ? 0.95 : 0.38}"/>`
    )
    for (let p = 1; p < points.length - 1; p += 2) {
      const [cx, cy] = points[p]
      parts.push(
        `<circle cx="${Math.round(cx)}" cy="${Math.round(cy)}" r="${i === 0 ? 12 : 8}" fill="none" stroke="${colors[i]}" stroke-width="${i === 0 ? 7 : 5}" opacity="${i === 0 ? 0.95 : 0.38}"/>`
      )
    }
  }
  return parts.join('')
}

/** Park section: tree crowns rooted on the ground line. */
const drawCanopy = (w, ground, random) => {
  const parts = []
  const count = 7 + Math.floor(random() * 4)

  for (let i = 0; i < count; i += 1) {
    const x = Math.round((i + 0.5) * (w / count) + (random() - 0.5) * 36)
    const r = Math.round(ground * (0.2 + random() * 0.17))
    const trunk = Math.round(ground * (0.1 + random() * 0.08))
    const cy = ground - trunk - r
    const filled = random() > 0.5
    parts.push(`<rect x="${x - 4}" y="${cy}" width="8" height="${ground - cy}" fill="${L}" opacity="0.45"/>`)
    parts.push(
      `<circle cx="${x}" cy="${cy}" r="${r}" fill="${filled ? P : L}" fill-opacity="${filled ? 0.9 : 0.1}" stroke="${L}" stroke-width="3.5" stroke-opacity="0.55"/>`
    )
  }
  return parts.join('')
}

/** Cadastral plot subdivision with one parcel called out. */
const drawParcels = (w, ground, random) => {
  const parts = []
  const cells = []
  const split = (x, y, rw, rh, depth) => {
    if (depth === 0 || rw < 140 || rh < 90) {
      cells.push([x, y, rw, rh])
      return
    }
    const vertical = rw > rh
    const ratio = 0.36 + random() * 0.28
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
  split(-30, -30, w + 60, ground + 30, 4)

  const highlight = Math.floor(random() * cells.length)
  cells.forEach(([x, y, cw, ch], i) => {
    parts.push(
      `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="${L}" fill-opacity="${i % 4 === 0 ? 0.11 : 0.035}" stroke="${L}" stroke-width="3" stroke-opacity="0.45"/>`
    )
  })
  const [hx, hy, hw, hh] = cells[highlight]
  parts.push(`<rect x="${hx}" y="${hy}" width="${hw}" height="${hh}" fill="${P}" opacity="0.92"/>`)
  return parts.join('')
}

/** Stepped massing: a block skyline standing on the ground line. */
const drawMassing = (w, ground, random) => {
  const parts = []
  const count = 8 + Math.floor(random() * 4)
  const bw = w / count

  for (let i = 0; i < count; i += 1) {
    const x = Math.round(i * bw)
    const height = Math.round((0.3 + random() * 0.62) * ground)
    const y = ground - height
    const filled = random() > 0.62
    parts.push(
      `<rect x="${x}" y="${y}" width="${Math.round(bw - 9)}" height="${height}" fill="${filled ? P : L}" fill-opacity="${filled ? 0.92 : 0.1}" stroke="${L}" stroke-width="3" stroke-opacity="0.5"/>`
    )
  }
  return parts.join('')
}

const MOTIFS = {
  arcade: drawArcade,
  transit: drawTransit,
  canopy: drawCanopy,
  parcels: drawParcels,
  massing: drawMassing,
}

/**
 * @param {object} post
 * @param {string} post.slug      stable identity — seeds placement within the motif
 * @param {string} post.title     headline (used on OG cards and as the accessible label)
 * @param {string} post.category  desk key — picks ground colour and motif
 * @param {string} post.label     already-localised desk name, set large on the plinth
 * @param {string} [post.variant] frontmatter override of the motif
 * @param {number} [post.seed]    frontmatter override of the seed
 * @param {object} [opts]
 * @param {'card'|'hero'|'og'} [opts.format]
 */
const coverSvg = ({ slug, title, category, label, variant, seed }, opts = {}) => {
  const format = FORMATS[opts.format] ? opts.format : 'card'
  const { w, h } = FORMATS[format]
  const seedValue = typeof seed === 'number' ? seed : hash(slug)
  const random = rng(seedValue)

  const bg = CATEGORY_ACCENT[category] || PALETTE.primary
  const motif = VARIANTS.includes(variant) ? variant : CATEGORY_MOTIF[category] || 'parcels'

  // The OG card needs a deeper plinth because it also carries the headline.
  const ground = Math.round(h * (format === 'og' ? 0.44 : 0.63))
  const artwork = (MOTIFS[motif] || drawParcels)(w, ground, random)

  const deskName = String(label || '').toUpperCase()
  const pad = 56

  const plate = `<rect width="${w}" height="${h}" fill="${bg}"/>
  <g clip-path="url(#band-${seedValue})">${artwork}</g>
  <rect x="0" y="${ground}" width="${w}" height="${h - ground}" fill="${bg}"/>
  <rect x="0" y="${ground}" width="${w}" height="4" fill="${L}" opacity="0.85"/>`

  const defs = `<defs><clipPath id="band-${seedValue}"><rect x="0" y="0" width="${w}" height="${ground}"/></clipPath></defs>`
  const wordmark = `<text x="${w - pad}" y="${h - pad + 4}" text-anchor="end" font-family="${MONO}" font-size="19" letter-spacing="2" fill="${L}" opacity="0.7">PRAGUE INSIDER</text>`

  if (format === 'og') {
    const lines = wrapText(title, 34, 3)
    const size = lines.length > 2 ? 54 : 62
    const lineHeight = size * 1.16
    const top = ground + 108
    const tspans = lines
      .map((line, i) => `<tspan x="${pad}" y="${Math.round(top + i * lineHeight)}">${escapeXml(line)}</tspan>`)
      .join('')
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${escapeXml(title)}">
  ${defs}
  ${plate}
  <text x="${pad}" y="${ground + 52}" font-family="${MONO}" font-size="21" letter-spacing="2.4" fill="${P}">${escapeXml(deskName)}</text>
  <text font-family="${SERIF}" font-size="${size}" font-weight="700" fill="${L}" letter-spacing="-0.8">${tspans}</text>
  ${wordmark}
</svg>`
  }

  // Desk name scales down for long labels ("VEŘEJNÝ PROSTOR") so it never overruns the plate.
  const plinth = h - ground
  const deskSize = Math.round(Math.min(plinth * 0.42, deskName.length > 13 ? 60 : deskName.length > 9 ? 76 : 92))

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${escapeXml(title)}">
  ${defs}
  ${plate}
  <text x="${pad}" y="${ground + Math.round(plinth * 0.62)}" font-family="${SERIF}" font-size="${deskSize}" font-weight="700" fill="${L}" letter-spacing="-1">${escapeXml(deskName)}</text>
  <rect x="${pad}" y="${ground + Math.round(plinth * 0.62) + 34}" width="86" height="5" fill="${P}"/>
  ${wordmark}
</svg>`
}

/**
 * Overlay for a photographic OG card.
 *
 * A photo cover still has to carry the headline into a social feed, and it has to stay legible
 * over whatever the photograph happens to be doing in the lower third of the frame. So the same
 * typography as the generated plate is set on a scrim in the desk's colour rather than on the
 * bare image — one set of rules for both kinds of cover. gatsby-node.js composites this over the
 * photograph resized to the OG format.
 */
const ogPhotoOverlaySvg = ({ title, category, label }) => {
  const { w, h } = FORMATS.og
  const bg = CATEGORY_ACCENT[category] || PALETTE.primary
  const pad = 56
  const scrimTop = Math.round(h * 0.30)

  const lines = wrapText(title, 34, 3)
  const size = lines.length > 2 ? 54 : 62
  const lineHeight = size * 1.16
  const top = scrimTop + 120
  const tspans = lines
    .map((line, i) => `<tspan x="${pad}" y="${Math.round(top + i * lineHeight)}">${escapeXml(line)}</tspan>`)
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${bg}" stop-opacity="0"/>
      <stop offset="0.45" stop-color="${bg}" stop-opacity="0.82"/>
      <stop offset="1" stop-color="${bg}" stop-opacity="0.97"/>
    </linearGradient>
  </defs>
  <rect x="0" y="${scrimTop}" width="${w}" height="${h - scrimTop}" fill="url(#scrim)"/>
  <rect x="0" y="${scrimTop}" width="${w}" height="4" fill="${L}" opacity="0.6"/>
  <text x="${pad}" y="${scrimTop + 60}" font-family="${MONO}" font-size="21" letter-spacing="2.4" fill="${P}">${escapeXml(String(label || '').toUpperCase())}</text>
  <text font-family="${SERIF}" font-size="${size}" font-weight="700" fill="${L}" letter-spacing="-0.8">${tspans}</text>
  <text x="${w - pad}" y="${h - pad + 4}" text-anchor="end" font-family="${MONO}" font-size="19" letter-spacing="2" fill="${L}" opacity="0.7">PRAGUE INSIDER</text>
</svg>`
}

module.exports = {
  coverSvg,
  ogPhotoOverlaySvg,
  VARIANTS,
  CATEGORY_ACCENT,
  CATEGORY_MOTIF,
  PALETTE,
  FORMATS,
  hash,
}
