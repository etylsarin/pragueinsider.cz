import { fetchFeed } from '../lib/rss.mjs'

/**
 * Stavba — the Czech architecture magazine, read through its own "Praha" tag.
 *
 * Added when archiweb, the other architecture title, had been refusing our bot for two months
 * and the architecture desk was running on CAMP and the heritage club alone. Stavba is national,
 * and its main feed puts Prague in the headline only some of the time: "Nová Českomoravská:
 * proměna stanice i jejího okolí" and "Konec asfaltové ulice: nový park patří dětem" are both
 * Prague and both name no Prague place a filter can see. The publisher tags them "Praha" itself,
 * and WordPress serves every tag as a feed, so the tag feed is Prague by the publisher's own
 * account — which is what makes `pragueByDefault` honest here.
 *
 * Expect roughly ten items a month. Many are interiors, books and exhibitions, which the bar
 * rejects; the ones it is here for are completions, reconstructions and competition results.
 *
 * WordPress RSS 2.0, ten items a page. Ten is about a month in a quiet spell but only a fortnight
 * after a burst — four Prague pieces went out on 20 November 2026 alone — so two pages are read,
 * to be sure of covering the scan's 21-day window.
 */

const FEED = 'https://www.stavbaweb.cz/tag/praha/feed/'
const PAGES = [FEED, `${FEED}?paged=2`]

export default {
  id: 'stavbaweb',
  name: 'Stavba',
  homepage: 'https://www.stavbaweb.cz/',
  language: 'cs',
  pragueByDefault: true,
  topicByDefault: true,

  async fetchItems(options) {
    const pages = await Promise.all(PAGES.map((url) => fetchFeed(url, options)))
    const seen = new Set()
    return pages.flat().filter((item) => item.url && !seen.has(item.url) && seen.add(item.url))
  },
}
