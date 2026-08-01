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
    scrollWheelZoom={false}
    className="w-full h-[60vh] min-h-[420px] border border-tertiary/40"
  >
    {/* CARTO Positron — muted greys that sit under the palette rather than fighting it. */}
    <TileLayer
      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      subdomains="abcd"
      maxZoom={19}
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
