/**
 * The five desks Prague Insider covers. `key` is what lives in post frontmatter and is
 * never translated; slug and label are per-locale.
 */
const CATEGORIES = [
  {
    key: 'development',
    slug: { cs: 'vystavba', en: 'development' },
    label: { cs: 'Výstavba', en: 'Development' },
    blurb: {
      cs: 'Nové projekty, brownfieldy a developerské záměry měnící tvar města.',
      en: 'New projects, brownfields and the development schemes reshaping the city.',
    },
  },
  {
    key: 'transport',
    slug: { cs: 'doprava', en: 'transport' },
    label: { cs: 'Doprava', en: 'Transport' },
    blurb: {
      cs: 'Metro, tramvaje, železnice a cyklistická infrastruktura.',
      en: 'Metro, trams, rail and cycling infrastructure.',
    },
  },
  {
    key: 'public-space',
    slug: { cs: 'verejny-prostor', en: 'public-space' },
    label: { cs: 'Veřejný prostor', en: 'Public Space' },
    blurb: {
      cs: 'Náměstí, parky, nábřeží a kvalita každodenního života ve městě.',
      en: 'Squares, parks, riverbanks and the quality of everyday city life.',
    },
  },
  {
    key: 'planning',
    slug: { cs: 'planovani', en: 'planning' },
    label: { cs: 'Plánování', en: 'Planning' },
    blurb: {
      cs: 'Metropolitní plán, územní rozhodnutí a městské strategie.',
      en: 'The Metropolitan Plan, zoning decisions and city strategy.',
    },
  },
  {
    key: 'architecture',
    slug: { cs: 'architektura', en: 'architecture' },
    label: { cs: 'Architektura', en: 'Architecture' },
    blurb: {
      cs: 'Stavby, ateliéry, soutěže a památková péče.',
      en: 'Buildings, studios, competitions and heritage protection.',
    },
  },
]

const CATEGORY_KEYS = CATEGORIES.map((c) => c.key)

const getCategory = (key) => CATEGORIES.find((c) => c.key === key)

module.exports = { CATEGORIES, CATEGORY_KEYS, getCategory }
