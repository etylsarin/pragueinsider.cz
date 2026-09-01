import React from 'react'
import { Link } from 'gatsby'
import Icon from './Icon'
import { t } from '../i18n/ui'
import { mapPath } from '../lib/paths'
import { staticMap } from '../lib/staticmap'
import { CATEGORY_ACCENT } from '../lib/cover'

/**
 * Sidebar locator: a real, tiled map of the actual site, cut and drawn by src/lib/staticmap.js.
 *
 * Static on purpose. The point of this panel is "where is this", answered in one glance, and a
 * reader who wants to pan and zoom is one click from the map page that does. Static also means the
 * tiles are in the server-rendered HTML, so the locator survives with JavaScript off.
 *
 * The whole thing is one <svg> rather than positioned <img> tags because the sidebar is a
 * different width on every breakpoint: `slice` lets the browser scale and crop the mosaic to
 * whatever box it lands in, and the marker, being drawn in the same coordinate space, stays on
 * the point.
 */

const LocationBox = ({ locale, location, district, category }) => {
  const map = staticMap(location.lat, location.lng)
  const accent = CATEGORY_ACCENT[category] || '#B33939'

  return (
    <div className="bg-surface-container-low p-6 border border-tertiary/20">
      <h2 className="text-label-caps font-label-caps text-primary mb-4 flex items-center gap-2">
        <Icon name="map" size={16} />
        {t(locale, 'article.location')}
      </h2>

      <Link
        to={mapPath(locale)}
        className="group block w-full aspect-[4/3] bg-surface-container border border-tertiary/40 relative overflow-hidden"
        aria-label={t(locale, 'map.title')}
      >
        <svg
          viewBox={`0 0 ${map.width} ${map.height}`}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          role="img"
          aria-label={`${district || t(locale, 'map.title')} — ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
        >
          {/* Base tiles, then the label layer over them — Esri splits the two. */}
          {map.tiles.map((tile) => (
            <image
              key={`base-${tile.key}`}
              href={tile.base}
              x={tile.x}
              y={tile.y}
              width={map.tileSize}
              height={map.tileSize}
            />
          ))}
          {map.tiles.map((tile) => (
            <image
              key={`labels-${tile.key}`}
              href={tile.labels}
              x={tile.x}
              y={tile.y}
              width={map.tileSize}
              height={map.tileSize}
            />
          ))}

          {/* Same marker as the map page: a square in the desk's colour, ringed so it reads on
              any tile underneath it. */}
          <rect
            x={map.marker.x - 7}
            y={map.marker.y - 7}
            width="14"
            height="14"
            fill={accent}
            stroke="#fcf9f8"
            strokeWidth="3"
          />

          {/* A scale bar is what separates a map from a picture of one. */}
          <g transform={`translate(12 ${map.height - 14})`}>
            <rect x="-5" y="-17" width={map.scale.pixels + 10} height="27" fill="#fcf9f8" opacity="0.85" />
            <path
              d={`M0 0 v-7 M0 -3.5 H${map.scale.pixels} M${map.scale.pixels} 0 v-7`}
              stroke="#42362b"
              strokeWidth="1.5"
              fill="none"
            />
            <text x="0" y="8" fill="#42362b" fontSize="11" fontFamily="ui-monospace, monospace">
              {map.scale.label}
            </text>
          </g>
        </svg>
        <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.06] transition-colors" />
      </Link>

      <p className="text-caption font-caption text-on-surface-variant mt-2">
        {'Esri, HERE, Garmin · '}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2"
        >
          OpenStreetMap
        </a>
      </p>

      {district ? <p className="text-body-md font-body-md text-primary mt-4">{district}</p> : null}
      <p className="text-label-caps font-label-caps text-on-surface-variant mt-1">
        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
      </p>
      <Link
        to={mapPath(locale)}
        className="text-label-caps font-label-caps text-secondary hover:underline underline-offset-2 mt-3 inline-flex items-center gap-1"
      >
        {t(locale, 'map.title')}
        <Icon name="arrowRight" size={14} />
      </Link>
    </div>
  )
}

export default LocationBox
