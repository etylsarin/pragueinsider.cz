import { fetchFeed } from '../lib/rss.mjs'

/**
 * Pražská integrovaná doprava (ROPID) — the authority that designs the network, as distinct
 * from DPP which operates it. Line reroutings, tenders for new rolling stock, timetable
 * restructuring.
 *
 * The integrated system reaches well into Central Bohemia, so plenty of its output is about
 * places that are not Prague; the relevance filter sorts that out.
 */

const FEED = 'https://pid.cz/feed/'

export default {
  id: 'pid',
  name: 'PID / ROPID',
  homepage: 'https://pid.cz/',
  language: 'cs',
  pragueByDefault: false,
  topicByDefault: true,

  fetchItems: (options) => fetchFeed(FEED, options),
}
