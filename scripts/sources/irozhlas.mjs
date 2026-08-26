import { XMLParser } from 'fast-xml-parser'
import { fetchText } from '../lib/http.mjs'
import { clean, canonicalUrl } from '../lib/text.mjs'

/**
 * iROZHLAS — Czech Radio's news service. A national general outlet, so most of what it publishes
 * is nothing to do with Prague or with buildings; the relevance filter earns its keep here.
 *
 * **Read through the Google News sitemap, not the tag page or the RSS feed**, and both of those
 * choices are deliberate:
 *
 * - `/zpravy-tag/praha` is the obvious source and would be the best one — it is the section a
 *   human would read. It answers our bot with 403 (Cloudflare bot management, not robots.txt,
 *   which allows the path). Getting past it would mean pretending to be a browser, and an outlet
 *   refusing an identified crawler is a refusal whatever the mechanism.
 * - The general RSS at /rss/irozhlas carries twenty items of everything — a sample taken while
 *   writing this had national politics, Nepal, football and a celebrity obituary, and nothing
 *   about the built environment at all. Volume would push a Prague planning story out within
 *   hours.
 *
 * The news sitemap is advertised in their robots.txt, answers the bot without complaint, and
 * carries the editorial keywords alongside each headline — which is more to filter on than any
 * RSS feed here gives us.
 *
 * It only reaches back about three days, as Google News sitemaps do. That suits a daily scan and
 * means `--days 21` will never actually reach 21 days for this source; a run that has been
 * skipped for a week cannot backfill it.
 */

const SITEMAP = 'https://www.irozhlas.cz/sites/default/files/irozhlas_feeds/sitemaps/news.xml'

const parser = new XMLParser({ ignoreAttributes: false })

export default {
  id: 'irozhlas',
  name: 'iROZHLAS',
  homepage: 'https://www.irozhlas.cz/',
  language: 'cs',
  pragueByDefault: false,
  topicByDefault: false,

  async fetchItems({ limit = 40 } = {}) {
    const xml = await fetchText(SITEMAP, { accept: 'application/xml,text/xml;q=0.9,*/*;q=0.8' })
    const parsed = parser.parse(xml)
    const entries = parsed?.urlset?.url
    if (!entries) return []

    const list = Array.isArray(entries) ? entries : [entries]

    return list
      .map((entry) => {
        const news = entry['news:news']
        if (!news) return null
        const url = canonicalUrl(String(entry.loc || ''), SITEMAP)
        const title = clean(String(news['news:title'] || ''))
        if (!url || !title) return null

        // Their own editorial keywords. Passing them through as tags gives the relevance filter
        // and the desk something to judge on beyond the headline — no other source here offers it.
        const tags = String(news['news:keywords'] || '')
          .split(',')
          .map((tag) => clean(tag))
          .filter(Boolean)

        const published = String(news['news:publication_date'] || '')
        return {
          url,
          title,
          // The sitemap carries no standfirst, and inventing one from the headline would be
          // worse than admitting there is none.
          summary: null,
          publishedAt: /^\d{4}-\d{2}-\d{2}/.test(published) ? published.slice(0, 10) : null,
          tags,
        }
      })
      .filter(Boolean)
      .slice(0, limit)
  },
}
