import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'gatsby'
import 'leaflet/dist/leaflet.css'
import { getCategory, CATEGORIES } from '../config/categories'
import { CATEGORY_ACCENT } from '../lib/cover'
import { postPath } from '../lib/paths'
import { formatDate } from '../lib/format'

/**
 * Client-only — imported lazily by src/templates/map.jsx after mount, because Leaflet
 * touches `window` at module scope and would break the SSR pass.
 *
 * Markers are square divIcons rather than Leaflet's default teardrop PNGs: the sharp shape
 * language from DESIGN.md, and no bundler-relative image URLs to go wrong.
 */

const PRAGUE_CENTER = [50.0755, 14.4378]

const squareMarker = (category) =>
  L.divIcon({
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
    html: `<span style="display:block;width:16px;height:16px;background:${
      CATEGORY_ACCENT[category] || '#42362b'
    };box-shadow:0 0 0 3px rgba(252,249,248,0.9);"></span>`,
  })

const MapView = ({ locale, posts }) => (
  <MapContainer
    center={PRAGUE_CENTER}
    zoom={12}
    maxZoom={18}
    scrollWheelZoom={false}
    className="w-full h-[60vh] min-h-[420px] border border-tertiary/40"
  >
    {/*
      Esri World Light Gray Canvas — muted greys that sit under the palette rather than fighting
      it, and no API key.

      This was CARTO Positron until CARTO ended their keyless tier. They did not start returning
      an error: the tiles still arrive as valid PNGs with HTTP 200 and "API KEY REQUIRED" painted
      diagonally across the image. Nothing in the console, nothing in the markup — the only way to
      see it is to look at the map. If these tiles ever go the same way, look at a tile before
      looking at the code.

      Esri splits labels out of the basemap, so this is two layers where CARTO was one. The tile
      path is {z}/{y}/{x} — y before x, unlike every other provider here.

      maxNativeZoom stops at 16 because that is where this basemap's data stops: ask for 17 and it
      returns HTTP 200 with a grey "Map data not yet available" placeholder, the same shape of trap
      as the CARTO watermark. maxZoom stays higher so the last real tiles are upscaled and a reader
      can still zoom to a marker — blurry beats a wall of grey.
    */}
    <TileLayer
      url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a> — Esri, HERE, Garmin, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      maxNativeZoom={16}
      maxZoom={18}
    />
    <TileLayer
      url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
      maxNativeZoom={16}
      maxZoom={18}
      zIndex={2}
    />
    {posts.map((post) => {
      const category = getCategory(post.category)
      return (
        <Marker
          key={`${post.slug}-${post.locale}`}
          position={[post.location.lat, post.location.lng]}
          icon={squareMarker(post.category)}
        >
          <Popup>
            <span className="text-label-caps font-label-caps text-on-surface-variant block">
              {category ? category.label[locale] : post.category} · {formatDate(post.date, locale)}
            </span>
            <Link
              to={postPath(locale, post.slug)}
              className="text-body-md font-body-md font-bold text-primary hover:text-brick-accent block mt-1"
            >
              {post.title}
            </Link>
            {post.district ? (
              <span className="text-caption font-caption text-on-surface-variant block mt-1">{post.district}</span>
            ) : null}
          </Popup>
        </Marker>
      )
    })}
  </MapContainer>
)

export const MapLegend = ({ locale }) => (
  <ul className="flex flex-wrap gap-4 mt-stack-md">
    {CATEGORIES.map((category) => (
      <li key={category.key} className="flex items-center gap-2">
        <span
          className="w-3 h-3 inline-block"
          style={{ background: CATEGORY_ACCENT[category.key] }}
          aria-hidden="true"
        />
        <span className="text-label-caps font-label-caps text-on-surface-variant">
          {category.label[locale]}
        </span>
      </li>
    ))}
  </ul>
)

export default MapView
