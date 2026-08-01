import { fetchFeed } from '../lib/rss.mjs'

/**
 * Zdopravy.cz — the Czech transport trade title. Metro, tram, rail and road, reported in more
 * operational detail than the general press bothers with, which is exactly the level the
 * Transport desk wants.
 *
 * Coverage is national (a typical feed carries Tábor, Vysočina and Kraków alongside Prague), so
 * nothing here is assumed to be about Prague — the relevance filter picks out what is.
 */

const FEED = 'https://zdopravy.cz/feed/'

export default {
  id: 'zdopravy',
  name: 'Zdopravy.cz',
  homepage: 'https://zdopravy.cz/',
  language: 'cs',
  pragueByDefault: false,
  topicByDefault: true,

  fetchItems: (options) => fetchFeed(FEED, options),
}
