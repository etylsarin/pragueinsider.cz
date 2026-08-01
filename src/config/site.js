/**
 * Shared site configuration. CommonJS so gatsby-node.js, gatsby-config.js and React
 * components can all consume the same source of truth.
 */

const DEFAULT_LOCALE = 'cs'
const LOCALES = ['cs', 'en']

/** Czech is unprefixed (the .cz domain default); English lives under /en/. */
const localePrefix = (locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`)

const siteMetadata = {
  title: 'Prague Insider',
  siteUrl: 'https://www.pragueinsider.cz',
  description: {
    cs: 'Architektura, rozvoj, veřejný prostor a doprava v Praze. Denní analýza proměn metropole.',
    en: 'Architecture, development, public space and transport in Prague. Daily analysis of a city in transition.',
  },
  tagline: {
    cs: 'Architektonická přesnost v urbanistické žurnalistice.',
    en: 'Architectural precision in urban journalism.',
  },
  desk: 'Prague Insider Desk',
}

module.exports = { DEFAULT_LOCALE, LOCALES, localePrefix, siteMetadata }
