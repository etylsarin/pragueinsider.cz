import { fetchFeed } from '../lib/rss.mjs'

/**
 * Praha 7 — the district holding Bubny-Zátory, Rohanský ostrov, Holešovice and the market hall,
 * which makes it the single most transformative patch of the city right now.
 *
 * It is a district council feed, so it carries water outages and family sports days alongside
 * planning news. Neither Prague-relevance nor topic is assumed on the strength of it being a
 * council: every item earns its place.
 */

const FEED = 'https://www.praha7.cz/feed/'

export default {
  id: 'praha7',
  name: 'Praha 7',
  homepage: 'https://www.praha7.cz/',
  language: 'cs',
  pragueByDefault: true,
  topicByDefault: false,

  fetchItems: (options) => fetchFeed(FEED, options),
}
