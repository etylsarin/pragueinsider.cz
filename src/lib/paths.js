/**
 * Every URL on the site is built here. Nothing else should concatenate a path by hand —
 * hreflang pairing and the language switcher both depend on cs/en routes staying symmetric.
 */
const { DEFAULT_LOCALE, localePrefix } = require('../config/site')
const { getCategory } = require('../config/categories')
const { STATIC_PAGES, MAP_SLUG } = require('../config/pages')

const homePath = (locale) => `${localePrefix(locale)}/`

/** Articles share one ASCII slug across locales, so cs↔en pairing is a prefix swap. */
const postPath = (locale, slug) => `${localePrefix(locale)}/${slug}/`

const categoryPath = (locale, key) => {
  const category = getCategory(key)
  if (!category) return homePath(locale)
  return `${localePrefix(locale)}/${category.slug[locale]}/`
}

const staticPagePath = (locale, key) => {
  const page = STATIC_PAGES.find((p) => p.key === key)
  if (!page) return homePath(locale)
  return `${localePrefix(locale)}/${page.slug[locale]}/`
}

const mapPath = (locale) => `${localePrefix(locale)}/${MAP_SLUG[locale]}/`

const feedPath = (locale) => `${localePrefix(locale)}/rss.xml`

/**
 * Reserved top-level segments a post slug must never collide with, in either locale.
 * Consumed by scripts/validate-posts.mjs.
 */
const reservedSlugs = () => {
  const reserved = new Set(['en', 'rss.xml', 'sitemap', 'og', 'static', '404'])
  const { CATEGORIES } = require('../config/categories')
  for (const category of CATEGORIES) {
    Object.values(category.slug).forEach((s) => reserved.add(s))
  }
  for (const page of STATIC_PAGES) {
    Object.values(page.slug).forEach((s) => reserved.add(s))
  }
  Object.values(MAP_SLUG).forEach((s) => reserved.add(s))
  return reserved
}

module.exports = {
  DEFAULT_LOCALE,
  homePath,
  postPath,
  categoryPath,
  staticPagePath,
  mapPath,
  feedPath,
  reservedSlugs,
}
