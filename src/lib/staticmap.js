/**
 * A real map with no JavaScript.
 *
 * The article sidebar used to draw a schematic — a grid, a stylised Vltava and a marker placed by
 * linear interpolation across Prague's bounding box. It was honest about being a diagram, but it
 * told a reader nothing they could not read off the coordinates underneath it, and a locator that
 * cannot show you the street you are looking at is not doing the job.
 *
 * Leaflet is not the answer here: it touches `window` at import time, so it can only load after
 * hydration, and running a full interactive map engine on every article page to render one
 * stationary pin is a lot of machinery for a picture. Web Mercator tile arithmetic is about
 * fifteen lines, and doing it here means the tiles are in the server-rendered HTML — the locator
 * is there with JavaScript off, and there is nothing to hydrate.
 *
 * Same basemap as the map page, for the same reasons (see src/components/MapView.jsx): Esri World
 * Light Gray, keyless, muted enough to sit under the palette, split into a base and a label layer
 * with a {z}/{y}/{x} path — y before x.
 */

const TILE = 256

/**
 * The viewport the mosaic is cut to. The SVG scales it to whatever box it lands in, so this is
 * not the size on screen — it is how much ground is in frame, and how hard the tiles are worked.
 *
 * 320 is chosen against the sidebar, which is about 240 CSS px on a desktop grid and the full
 * column width on mobile: tiles land between roughly three-quarter and one-and-a-quarter scale
 * either way, so Esri's baked-in street labels stay readable. Cut a wider view and they are
 * shrunk into illegibility — which is the whole point of a locator, lost to fit more in.
 */
const VIEW = { width: 320, height: 240 }

const ESRI = 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas'
const BASE_LAYER = `${ESRI}/World_Light_Gray_Base/MapServer/tile`
const LABEL_LAYER = `${ESRI}/World_Light_Gray_Reference/MapServer/tile`

/** 16 is where this basemap's data stops; past it Esri serves a grey "not available" placeholder. */
const MAX_NATIVE_ZOOM = 16
const DEFAULT_ZOOM = 15

/** Web Mercator, in pixels at the given zoom. */
function project(lat, lng, zoom) {
  const scale = TILE * 2 ** zoom
  const sin = Math.sin((lat * Math.PI) / 180)
  return {
    x: ((lng + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale,
  }
}

/** Ground resolution at this latitude and zoom, for the scale bar. */
const metresPerPixel = (lat, zoom) =>
  (156543.03392 * Math.cos((lat * Math.PI) / 180)) / 2 ** zoom

/** A scale bar is only worth drawing at a round number, so pick the roundest one that fits. */
const BAR_STEPS = [50, 100, 200, 500, 1000, 2000]

function scaleBar(lat, zoom, maxPixels) {
  const perPixel = metresPerPixel(lat, zoom)
  const metres = [...BAR_STEPS].reverse().find((step) => step / perPixel <= maxPixels) || BAR_STEPS[0]
  return {
    metres,
    pixels: Math.round(metres / perPixel),
    label: metres >= 1000 ? `${metres / 1000} km` : `${metres} m`,
  }
}

/**
 * Everything the component needs to draw: the tiles that cover the viewport, where each one sits,
 * and where the marker goes. Coordinates are in the SVG's own units, which is why the caller can
 * scale the result to any box without recomputing anything.
 */
function staticMap(lat, lng, options = {}) {
  const zoom = Math.min(options.zoom || DEFAULT_ZOOM, MAX_NATIVE_ZOOM)
  const { width, height } = VIEW
  const point = project(lat, lng, zoom)

  // Top-left of the viewport in global pixel space, with the point centred in it.
  const originX = point.x - width / 2
  const originY = point.y - height / 2
  const span = 2 ** zoom

  const tiles = []
  for (let ty = Math.floor(originY / TILE); ty <= Math.floor((originY + height - 1) / TILE); ty += 1) {
    for (let tx = Math.floor(originX / TILE); tx <= Math.floor((originX + width - 1) / TILE); tx += 1) {
      // Prague is nowhere near the antimeridian or the poles, so anything out of range is a bug
      // rather than a wrap to handle — skip it and leave the gap visible.
      if (ty < 0 || ty >= span || tx < 0 || tx >= span) continue
      tiles.push({
        key: `${zoom}/${ty}/${tx}`,
        base: `${BASE_LAYER}/${zoom}/${ty}/${tx}`,
        labels: `${LABEL_LAYER}/${zoom}/${ty}/${tx}`,
        x: tx * TILE - originX,
        y: ty * TILE - originY,
      })
    }
  }

  return {
    zoom,
    width,
    height,
    tiles,
    tileSize: TILE,
    marker: { x: width / 2, y: height / 2 },
    scale: scaleBar(lat, zoom, width / 4),
  }
}

module.exports = { staticMap, project, metresPerPixel, VIEW, TILE }
