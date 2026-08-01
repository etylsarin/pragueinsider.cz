/**
 * Editorial standing pages. Bodies live in content/pages/<key>/index.<locale>.md;
 * the routing slugs and footer labels live here.
 */
const STATIC_PAGES = [
  {
    key: 'about',
    slug: { cs: 'o-nas', en: 'about' },
    label: { cs: 'O nás', en: 'About' },
  },
  {
    key: 'editorial-standards',
    slug: { cs: 'editorialni-standardy', en: 'editorial-standards' },
    label: { cs: 'Editoriální standardy', en: 'Editorial Standards' },
  },
  {
    key: 'privacy',
    slug: { cs: 'ochrana-soukromi', en: 'privacy' },
    label: { cs: 'Ochrana soukromí', en: 'Privacy Policy' },
  },
  {
    key: 'contact',
    slug: { cs: 'kontakt', en: 'contact' },
    label: { cs: 'Kontakt', en: 'Contact' },
  },
]

/** The map lives at these slugs but is a React page, not markdown. */
const MAP_SLUG = { cs: 'mapa', en: 'map' }

module.exports = { STATIC_PAGES, MAP_SLUG }
