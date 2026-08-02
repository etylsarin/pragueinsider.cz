import { fetchFeed } from '../lib/rss.mjs'

/**
 * Expats.cz — English-language news for Prague and the country. Second English source alongside
 * Prague Morning, useful because the two rarely cover the same story the same week.
 *
 * General-interest and nationwide, so it has to earn every item through the relevance filter.
 */

const FEED = 'https://www.expats.cz/feed'

export default {
  id: 'expats',
  name: 'Expats.cz',
  homepage: 'https://www.expats.cz/',
  language: 'en',
  pragueByDefault: false,
  topicByDefault: false,

  fetchItems: (options) => fetchFeed(FEED, options),
}
