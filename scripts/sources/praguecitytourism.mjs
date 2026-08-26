import { fetchFeed } from '../lib/rss.mjs'

/**
 * Prague City Tourism — the city's tourism organisation. Mostly events and visitor marketing,
 * but it also publishes on monuments in its care, public-realm interventions in the historic
 * centre, and visitor-pressure data that bears directly on how the centre is used.
 *
 * Marketing output by nature, so topic is never assumed — only the built-environment items
 * clear the filter, and an event listing should not.
 */

const FEED = 'https://praguecitytourism.cz/feed'

export default {
  id: 'praguecitytourism',
  name: 'Prague City Tourism',
  homepage: 'https://praguecitytourism.cz/',
  language: 'cs',
  pragueByDefault: true,
  topicByDefault: false,

  fetchItems: (options) => fetchFeed(FEED, options),
}
