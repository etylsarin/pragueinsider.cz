/**
 * Cover art for every article.
 *
 * Prague Insider mostly writes about buildings nobody on the desk has stood in front of, so an
 * article gets a drawn cover unless someone has been there and photographed it — never licensed
 * or scraped photography.
 *
 * Nothing here runs at build time. scripts/make-covers.mjs calls it once per design change and
 * writes one plate per desk into static/covers/; every article on a desk shows that same file, so
 * a browser fetches it once and reuses it across the archive. ogPhotoOverlaySvg() is the
 * exception — a photographed article still gets a social card of its own in onPostBuild, set in
 * this same type.
 *
 * The design is a **section plate**: a saturated ground in the desk's colour, one architectural
 * motif belonging to that desk drawn in axonometric, and the desk name set large in the brand
 * serif on a plinth below.
 *
 * Axonometric because it is the drawing convention of the subject — it stays a drawing rather
 * than becoming a render, and it is exactly expressible in SVG polygons. Every solid shows three
 * faces filled with the same surface colour at different opacities, so depth is read from tone
 * alone and the palette gains nothing.
 *
 * Two things were learned the hard way and are worth not relearning:
 *
 * - **Apparent size comes from height, not footprint.** A flat plan projects to almost nothing
 *   vertically and looks like a smaller drawing beside a block city on the same plot. The fix is
 *   more ground (see PLOT), never more storeys — extruding the planning motif to match its
 *   neighbours just turned it into the development one.
 * - **Sampled randomness reads as uniform.** Each desk has one fixed seed, so there is no
 *   distribution to see, only one arrangement — and an independently sampled one comes out level
 *   more often than not. Variety that has to be there is constructed: heights are dealt across
 *   the range and shuffled, transit runs a fixed count of lines each way, trees are drawn from
 *   two size classes.
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

/** Ground colour per desk. All are dark enough to carry light solids and light type. */
const CATEGORY_ACCENT = {
  development: PALETTE.brick,
  transport: PALETTE.vltava,
  'public-space': '#3F5B34',
  planning: PALETTE.slate,
  architecture: PALETTE.primary,
}

/** Each desk draws its own motif. One motif per desk, and one plate per desk. */
const CATEGORY_MOTIF = {
  architecture: 'arcade',
  transport: 'transit',
  'public-space': 'canopy',
  planning: 'parcels',
  development: 'massing',
}

const FORMATS = {
  card: { w: 1200, h: 675 },
  hero: { w: 1200, h: 600 },
  og: { w: 1200, h: 630 },
  // Social-card dimensions with the plinth layout rather than a headline one. A desk plate is
  // shared by every article on that desk, so it has no headline to set — the platforms render
  // og:title as text beside the image anyway.
  ogPlate: { w: 1200, h: 630 },
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

/** Deterministic 0..1 sequence seeded off the desk key. */
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

// --- axonometric primitives ------------------------------------------------------------------

const L = PALETTE.surface
const P = PALETTE.parchment

/** True isometric: 30° from horizontal on both axes, z up. */
const CX = 0.8660254
const SY = 0.5

/**
 * Projected points are collected as they are made so the finished drawing can be centred on its
 * own bounds. Module-level because every motif calls proj() many layers deep and threading a
 * collector through each of them buys nothing; coverSvg() clears it before each plate, and this
 * is synchronous single-threaded generation run by one script.
 */
let seen = []

const proj = (x, y, z) => {
  const point = [(x - y) * CX, (x + y) * SY - z]
  seen.push(point)
  return point
}

const pts = (list) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ')

/**
 * One solid, as its three visible faces. Lightest on top, then left, then right — the whole
 * shading model. `fill` is the surface colour unless the solid is the one being called out.
 */
const box = (x, y, z, w, d, h, { top = 0.92, left = 0.58, right = 0.3, fill = L } = {}) => {
  const b1 = proj(x, y, z)
  const b2 = proj(x + w, y, z)
  const b3 = proj(x + w, y + d, z)
  const b4 = proj(x, y + d, z)
  const t1 = proj(x, y, z + h)
  const t2 = proj(x + w, y, z + h)
  const t3 = proj(x + w, y + d, z + h)
  const t4 = proj(x, y + d, z + h)
  return (
    `<polygon points="${pts([b4, b3, t3, t4])}" fill="${fill}" fill-opacity="${left}"/>` +
    `<polygon points="${pts([b3, b2, t2, t3])}" fill="${fill}" fill-opacity="${right}"/>` +
    `<polygon points="${pts([t1, t2, t3, t4])}" fill="${fill}" fill-opacity="${top}"/>`
  )
}

/** Painter's algorithm: back to front along the viewing axis. */
const backToFront = (a, b) => a[0] + a[1] - (b[0] + b[1])

// --- the motifs ------------------------------------------------------------------------------

/** One cell of the plot, in world units. */
const CELL = 46

/** Base plot, in cells. */
const CELLS = 3

/** Pixels per world unit — the drawing's scale, and the only size control. */
const UNIT = 2.5

/** Footprint multiplier per motif: a flat plan needs more ground than a block city. */
const PLOT = { massing: 1, arcade: 1, canopy: 1.2, transit: 1.6, parcels: 2 }

/** Tallest block in the massing motif. Above ~85 it crops hard against the plinth. */
const TALLEST = 85

/** Stepped massing: a block skyline, one solid per cell. */
const drawMassing = (random, cols, rows) => {
  const out = []
  const n = cols * rows

  // Dealt, not drawn: one height at each step from lowest to tallest, jittered, then only the
  // positions shuffled. Sampling each block independently leaves a nine-block plate a coin toss,
  // and with one seed per desk the toss is made once and kept forever.
  const heights = Array.from({ length: n }, (_, i) => {
    const t = n > 1 ? i / (n - 1) : 0.5
    return (14 + Math.pow(t, 1.7) * TALLEST) * (0.88 + random() * 0.24)
  })
  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const swap = heights[i]
    heights[i] = heights[j]
    heights[j] = swap
  }

  const hero = Math.floor(random() * n)
  let k = 0
  for (let gx = 0; gx < cols; gx += 1) {
    for (let gy = 0; gy < rows; gy += 1, k += 1) {
      out.push(
        box(gx * CELL, gy * CELL, 0, CELL - 6, CELL - 6, heights[k],
          k === hero ? { fill: P, top: 0.95, left: 0.75, right: 0.5 } : {})
      )
    }
  }
  return out.join('')
}

/** Cadastral subdivision, flat, with one parcel called out. */
const drawParcels = (random, cols, rows) => {
  const out = []
  const spans = (n) => {
    const list = []
    let at = 0
    while (at < n * CELL) {
      const size = CELL * (0.7 + random() * 1.0)
      list.push([at, Math.min(size, n * CELL - at)])
      at += size
    }
    return list
  }
  // Flat, deliberately: planning is a plan, seen from above, not a set of buildings.
  for (const [px, w] of spans(cols)) {
    for (const [py, d] of spans(rows)) {
      const hero = random() > 0.9
      out.push(
        box(px, py, 0, w - 4, d - 4, hero ? 46 : 5,
          hero ? { fill: P, top: 0.95, left: 0.75, right: 0.5 } : { top: 0.5, left: 0.28, right: 0.16 })
      )
    }
  }
  return out.join('')
}

/** Park: trees scattered on a ground plane, a few of them specimens. */
const drawCanopy = (random, cols, rows) => {
  const w = cols * CELL
  const d = rows * CELL
  const out = [box(-CELL, -CELL, 0, w + 2 * CELL, d + 2 * CELL, 3, { top: 0.16, left: 0.1, right: 0.07 })]

  // Scattered, not planted. A jittered grid still reads as a grid — the eye finds the rows — so
  // positions are drawn at random and rejected on collision. The rejection is what makes the size
  // variation legible: without it a specimen lands on a small tree and, with no outlines, the two
  // read as one malformed shape.
  const target = Math.round(cols * rows * 1.5)
  const trees = []
  for (let attempt = 0; trees.length < target && attempt < target * 60; attempt += 1) {
    const tx = random() * w
    const ty = random() * d
    const specimen = random() > 0.8
    const r = specimen ? 15 + random() * 7 : 7 + random() * 4
    if (trees.some(([ox, oy, , or]) => Math.hypot(tx - ox, ty - oy) < (r + or) * 0.95)) continue
    trees.push([tx, ty, (specimen ? 46 : 22) + random() * 26, r, specimen])
  }

  trees.sort(backToFront)
  for (const [tx, ty, h, r, specimen] of trees) {
    const trunk = Math.max(4, r * 0.42)
    out.push(box(tx - trunk / 2, ty - trunk / 2, 3, trunk, trunk, h * 0.45, { top: 0.5, left: 0.4, right: 0.25 }))
    out.push(
      box(tx - r, ty - r, 3 + h * 0.45, r * 2, r * 2, r * 1.7,
        specimen ? { fill: P, top: 0.95, left: 0.7, right: 0.45 } : { top: 0.85, left: 0.5, right: 0.28 })
    )
  }
  return out.join('')
}

/** Network: routes crossing a ground plane, with an interchange at each crossing. */
const drawTransit = (random, cols, rows) => {
  const w = cols * CELL
  const d = rows * CELL
  const out = [box(-CELL, -CELL, 0, w + 2 * CELL, d + 2 * CELL, 3, { top: 0.14, left: 0.09, right: 0.06 })]

  // Both directions by construction. Choosing each line's orientation with a coin flip let a seed
  // hand every line the same one — which this desk's seed did, leaving parallel stripes and
  // nothing to interchange.
  const nAcross = 2 + Math.round(random())
  const nDown = 2 + Math.round(random())
  const acrossAt = Array.from({ length: nAcross }, (_, i) => ((i + 0.5) / nAcross) * d + (random() - 0.5) * CELL * 0.6)
  const downAt = Array.from({ length: nDown }, (_, i) => ((i + 0.5) / nDown) * w + (random() - 0.5) * CELL * 0.6)

  const Z = 9
  const route = (from, to, lead) => {
    const path = []
    for (let t = 0; t <= 1; t += 0.05) {
      path.push(proj(from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t, Z))
    }
    return `<polyline points="${pts(path)}" fill="none" stroke="${lead ? P : L}" stroke-width="${lead ? 10 : 6}" stroke-linecap="round" opacity="${lead ? 0.95 : 0.4}"/>`
  }

  const lead = Math.floor(random() * (nAcross + nDown))
  acrossAt.forEach((y, i) => out.push(route([-CELL, y], [w + CELL, y], i === lead)))
  downAt.forEach((x, i) => out.push(route([x, -CELL], [x, d + CELL], nAcross + i === lead)))

  const marks = []
  for (const y of acrossAt) for (const x of downAt) marks.push([x, y, 34, true])
  for (const y of acrossAt) {
    for (let n = 0; n < cols; n += 1) {
      const x = ((n + 0.5) / cols) * w + (random() - 0.5) * CELL * 0.5
      if (downAt.some((dx) => Math.abs(dx - x) < CELL * 0.6)) continue
      marks.push([x, y, 20, false])
    }
  }
  for (const x of downAt) {
    for (let n = 0; n < rows; n += 1) {
      const y = ((n + 0.5) / rows) * d + (random() - 0.5) * CELL * 0.5
      if (acrossAt.some((ay) => Math.abs(ay - y) < CELL * 0.6)) continue
      marks.push([x, y, 20, false])
    }
  }
  marks.sort(backToFront)
  for (const [x, y, h, hub] of marks) {
    const r = hub ? 8 : 6
    out.push(
      box(x - r, y - r, 3, r * 2, r * 2, h,
        hub ? { fill: P, top: 0.95, left: 0.7, right: 0.45 } : { top: 0.72, left: 0.46, right: 0.26 })
    )
  }
  return out.join('')
}

/** Malá Strana arcade: piers with vaults swept back in depth. White only — no parchment here. */
const drawArcade = (random, cols, rows) => {
  const out = []
  const depth = Math.max(2, rows) * CELL * 0.7
  const bay = CELL * 0.9
  const pier = bay * 0.34
  const height = CELL * 2.1

  for (let i = 0; i < cols + 2; i += 1) {
    const x = i * bay
    out.push(box(x, 0, 0, pier, depth, height, { top: 0.55, left: 0.66, right: 0.36 }))

    const a = proj(x + pier, 0, height)
    const b = proj(x + bay, 0, height)
    const a2 = proj(x + pier, depth, height)
    const b2 = proj(x + bay, depth, height)
    const rise = (bay - pier) * 0.5
    // The one place a desk reads on tone alone: lit and unlit bays, no accent colour.
    const lit = random() > 0.62
    out.push(
      `<path d="M ${pts([a])} Q ${((a[0] + b[0]) / 2).toFixed(1)},${(Math.min(a[1], b[1]) - rise).toFixed(1)} ${pts([b])} L ${pts([b2])} Q ${((a2[0] + b2[0]) / 2).toFixed(1)},${(Math.min(a2[1], b2[1]) - rise).toFixed(1)} ${pts([a2])} Z" fill="${L}" fill-opacity="${lit ? 0.94 : 0.34}"/>`
    )
  }
  return out.join('')
}

const MOTIFS = {
  arcade: drawArcade,
  transit: drawTransit,
  canopy: drawCanopy,
  parcels: drawParcels,
  massing: drawMassing,
}

/**
 * @param {object} plate
 * @param {string} plate.category  desk key — picks ground colour and motif
 * @param {string} plate.label     already-localised desk name, set large on the plinth
 * @param {string} [plate.title]   accessible label; defaults to the desk name
 * @param {object} [opts]
 * @param {'card'|'hero'|'ogPlate'} [opts.format]
 */
const coverSvg = ({ category, label, title }, opts = {}) => {
  const format = FORMATS[opts.format] ? opts.format : 'card'
  const { w, h } = FORMATS[format]

  const bg = CATEGORY_ACCENT[category] || PALETTE.primary
  const motif = CATEGORY_MOTIF[category] || 'parcels'
  const random = rng(hash(category))
  const ground = Math.round(h * 0.63)

  // A square plot, not a field sized to the sheet. Projected, a square reads as a diamond sitting
  // in the band with its corners running out of it — which is what an axonometric of a city block
  // looks like, and is more legible than a texture reaching every corner.
  const plot = Math.round(CELLS * (PLOT[motif] || 1))

  seen = []
  const artwork = (MOTIFS[motif] || drawParcels)(random, plot, plot)
  const xs = seen.map((point) => point[0])
  const ys = seen.map((point) => point[1])
  const cx = w / 2 - ((Math.min(...xs) + Math.max(...xs)) / 2) * UNIT
  const cy = ground / 2 - ((Math.min(...ys) + Math.max(...ys)) / 2) * UNIT

  const deskName = String(label || '').toUpperCase()
  const plinth = h - ground
  const deskSize = Math.round(Math.min(plinth * 0.42, deskName.length > 13 ? 60 : deskName.length > 9 ? 76 : 92))
  const pad = 56
  const clip = `band-${category}-${format}`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${escapeXml(title || label || '')}">
  <defs><clipPath id="${clip}"><rect x="0" y="0" width="${w}" height="${ground}"/></clipPath></defs>
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <g clip-path="url(#${clip})"><g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) scale(${UNIT})">${artwork}</g></g>
  <rect x="0" y="${ground}" width="${w}" height="${h - ground}" fill="${bg}"/>
  <rect x="0" y="${ground}" width="${w}" height="4" fill="${L}" opacity="0.85"/>
  <text x="${pad}" y="${ground + Math.round(plinth * 0.62)}" font-family="${SERIF}" font-size="${deskSize}" font-weight="700" fill="${L}" letter-spacing="-1">${escapeXml(deskName)}</text>
  <rect x="${pad}" y="${ground + Math.round(plinth * 0.62) + 34}" width="86" height="5" fill="${P}"/>
  <text x="${w - pad}" y="${h - pad + 4}" text-anchor="end" font-family="${MONO}" font-size="19" letter-spacing="2" fill="${L}" opacity="0.7">PRAGUE INSIDER</text>
</svg>`
}

/**
 * Overlay for a photographic OG card.
 *
 * A photograph still has to carry the headline into a social feed, and stay legible over whatever
 * the picture happens to be doing in its lower third. So the same typography as the plate is set
 * on a scrim in the desk's colour rather than on the bare image — one set of rules for both kinds
 * of cover. gatsby-node.js composites this over the photograph resized to the OG format.
 */
const ogPhotoOverlaySvg = ({ title, category, label }) => {
  const { w, h } = FORMATS.og
  const bg = CATEGORY_ACCENT[category] || PALETTE.primary
  const pad = 56
  const scrimTop = Math.round(h * 0.3)

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
  CATEGORY_ACCENT,
  CATEGORY_MOTIF,
  PALETTE,
  FORMATS,
  hash,
}
