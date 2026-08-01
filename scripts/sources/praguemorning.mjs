import { fetchFeed } from '../lib/rss.mjs'

/**
 * Prague Morning — English-language Prague news on WordPress, so a real RSS feed. It covers the
 * whole city beat (crime, food, weather), which the relevance filter narrows down; days with
 * nothing from this source are normal rather than a fault.
 */

const FEED = 'https://praguemorning.cz/feed/'

export default {
  id: 'praguemorning',
  name: 'Prague Morning',
  homepage: 'https://praguemorning.cz/',
  language: 'en',
  pragueByDefault: true,
  topicByDefault: false,

  fetchItems: (options) => fetchFeed(FEED, options),
}
