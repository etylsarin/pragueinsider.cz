import React from 'react'
import { Link } from 'gatsby'
import Icon from './Icon'
import { t } from '../i18n/ui'
import { mapPath } from '../lib/paths'

/**
 * Sidebar locator. Deliberately a schematic, not a fake map: it shows the real coordinates
 * and the position within Prague's bounding box, then hands off to the tiled map page.
 * Drawing an invented street grid around a real address would be worse than drawing none.
 */

// Prague's rough extent — enough to place a marker meaningfully within the frame.
const BOUNDS = { west: 14.22, east: 14.71, south: 49.94, north: 50.18 }

const LocationBox = ({ locale, location, district }) => {
  const x = ((location.lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * 100
  const y = ((BOUNDS.north - location.lat) / (BOUNDS.north - BOUNDS.south)) * 100
  const clamp = (value) => Math.max(4, Math.min(96, value))
  const left = clamp(x)
  const top = clamp(y)

  return (
    <div className="bg-surface-container-low p-6 border border-tertiary/20">
      <h2 className="text-label-caps font-label-caps text-primary mb-4 flex items-center gap-2">
        <Icon name="map" size={16} />
        {t(locale, 'article.location')}
      </h2>

      <Link
        to={mapPath(locale)}
        className="group block w-full aspect-[4/3] bg-surface mb-4 border border-tertiary/40 relative overflow-hidden"
        aria-label={t(locale, 'map.title')}
      >
        <svg viewBox="0 0 100 75" className="w-full h-full" aria-hidden="true">
          <defs>
            <pattern id="locator-grid" width="6.25" height="6.25" patternUnits="userSpaceOnUse">
              <path d="M6.25 0H0v6.25" fill="none" stroke="#d0c4bb" strokeWidth="0.35" />
            </pattern>
          </defs>
          <rect width="100" height="75" fill="url(#locator-grid)" />
          {/* The Vltava, schematically — the one landmark that makes a Prague frame legible. */}
          <path
            d="M40 0 C 44 14, 34 24, 38 34 C 42 44, 52 50, 50 62 C 49 68, 52 72, 54 75"
            fill="none"
            stroke="#00629e"
            strokeWidth="2.2"
            opacity="0.28"
          />
          <line x1={left} y1="0" x2={left} y2="75" stroke="#B33939" strokeWidth="0.4" opacity="0.5" />
          <line x1="0" y1={(top / 100) * 75} x2="100" y2={(top / 100) * 75} stroke="#B33939" strokeWidth="0.4" opacity="0.5" />
          <rect x={left - 2.4} y={(top / 100) * 75 - 2.4} width="4.8" height="4.8" fill="#B33939" />
        </svg>
        <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.04] transition-colors" />
      </Link>

      {district ? <p className="text-body-md font-body-md text-primary">{district}</p> : null}
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
