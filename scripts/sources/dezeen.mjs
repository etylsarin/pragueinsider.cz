import { fetchFeed } from '../lib/rss.mjs'

/**
 * Dezeen — the international architecture and design magazine, read through its "Prague" tag.
 *
 * Rare, a handful of Prague items a year, and most of them are exhibitions and design-week
 * coverage that the bar rejects. It is here for the other few: the projects by international
 * practices that Czech outlets pick up late or second-hand — Heatherwick Studio redeveloping a
 * block in the historic centre, Libeskind's housing. When this source is quiet for weeks, that is
 * normal.
 *
 * The tag feed returns the fifty most recent Prague items, reaching back years, so the scan's
 * date window does the trimming. English, RSS 2.0.
 */

const FEED = 'https://www.dezeen.com/tag/prague/feed/'

export default {
  id: 'dezeen',
  name: 'Dezeen',
  homepage: 'https://www.dezeen.com/',
  language: 'en',
  pragueByDefault: true,
  topicByDefault: true,

  fetchItems: (options) => fetchFeed(FEED, options),
}
