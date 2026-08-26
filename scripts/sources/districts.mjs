import { fetchFeed } from '../lib/rss.mjs'

/**
 * The city districts (městské části), read as one source.
 *
 * Districts are where a scheme first becomes concrete — the concrete plant on Rohanský ostrov,
 * a district's formal objection to the Dolní Chabry bypass, a participation meeting on rebuilding
 * náměstí Svatopluka Čecha. The citywide press picks these up late or not at all.
 *
 * They are also council newsletters. The overwhelming majority of what they publish is nursery
 * enrolment, senior programmes, exhibition openings, waste collection and storm warnings — perhaps
 * one item in six is a story. So `topicByDefault` is false, the parish-notice vetoes in
 * scripts/lib/relevance.mjs do the coarse work, and the skill sets the editorial bar: a district
 * story is publishable only if it would matter to a reader in a different district.
 *
 * Kept as one adapter rather than ten so the digest report stays readable; each item carries its
 * district as a tag. A district that fails is skipped without taking the others down.
 */

const DISTRICTS = [
  { district: 'Praha 1', feed: 'https://www.praha1.cz/feed/' },
  { district: 'Praha 5', feed: 'https://www.praha5.cz/feed/' },
  { district: 'Praha 7', feed: 'https://www.praha7.cz/feed/' },
  { district: 'Praha 8', feed: 'https://www.praha8.cz/rss/490' },
  { district: 'Praha 10', feed: 'https://praha10.cz/feed/' },
]

// Praha 2, 3, 6 and 9 publish no feed; each would need its own scraper against a different CMS.
// Praha 4 has a feed URL but answers it with a CAPTCHA challenge, so it cannot be read at all.

export default {
  id: 'districts',
  name: 'Městské části',
  homepage: 'https://www.praha.eu/',
  language: 'cs',
  pragueByDefault: true,
  topicByDefault: false,

  async fetchItems({ limit = 60 } = {}) {
    const perDistrict = Math.max(5, Math.ceil(limit / DISTRICTS.length))

    const results = await Promise.allSettled(
      DISTRICTS.map(async ({ district, feed }) => {
        const items = await fetchFeed(feed, { limit: perDistrict })
        return items.map((item) => ({
          ...item,
          // The district is rarely in the headline of its own newsletter, so tag it — the
          // relevance filter reads tags, and the desk needs to know where a story is.
          tags: [...(item.tags || []), district],
        }))
      })
    )

    return results.flatMap((result) => (result.status === 'fulfilled' ? result.value : []))
  },
}
