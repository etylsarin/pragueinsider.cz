import React from 'react'

/**
 * The mockup uses Material Symbols, but the site needs six glyphs and a webfont round-trip
 * would cost more than the icons. These are hand-traced equivalents on the same 24px grid.
 */
const PATHS = {
  search: 'M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z',
  close: 'M18 6L6 18M6 6l12 12',
  menu: 'M3 6h18M3 12h18M3 18h18',
  share: 'M4 12v8h16v-8M12 3v13M8 7l4-4 4 4',
  map: 'M9 4L3 7v13l6-3 6 3 6-3V4l-6 3-6-3zm0 0v13m6-10v13',
  link: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  rss: 'M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16',
}

const Icon = ({ name, size = 20, className = '', title }) => {
  const d = PATHS[name]
  if (!d) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={d} />
      {name === 'rss' ? <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" /> : null}
    </svg>
  )
}

export default Icon
