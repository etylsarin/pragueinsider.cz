import { fetchFeed } from '../lib/rss.mjs'

/**
 * ArchDaily — the international architecture site, read through its "Prague" tag.
 *
 * Low volume, about two items a month, mostly project pages for finished buildings published with
 * the architect's drawings and credits, such as the rooftop extension at Harfa. That makes it a
 * source for the event the Czech news feeds report worst, which is construction finishing.
 * Interiors and private houses arrive alongside them, and most do not clear the bar.
 *
 * The tag follows the architect as well as the site, so a Prague studio's project in Berlin
 * can turn up here. The relevance filter cannot tell; the desk's dateline check in step 3 can.
 *
 * English, RSS 2.0, no paging needed at this volume.
 */

const FEED = 'https://www.archdaily.com/tag/prague.xml'

export default {
  id: 'archdaily',
  name: 'ArchDaily',
  homepage: 'https://www.archdaily.com/',
  language: 'en',
  pragueByDefault: true,
  topicByDefault: true,

  fetchItems: (options) => fetchFeed(FEED, options),
}
