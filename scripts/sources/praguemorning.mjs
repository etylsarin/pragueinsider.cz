import { XMLParser } from 'fast-xml-parser'
import { fetchText } from '../lib/http.mjs'
import { clean, stripHtml, canonicalUrl, isoDate } from '../lib/text.mjs'

/**
 * Prague Morning — English-language Prague news on WordPress, so a real RSS feed. It covers
 * the whole city beat (crime, food, weather), which the relevance filter narrows down.
 */

const FEED = 'https://praguemorning.cz/feed/'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
})

const asArray = (value) => (Array.isArray(value) ? value : value ? [value] : [])

export default {
  id: 'praguemorning',
  name: 'Prague Morning',
  homepage: 'https://praguemorning.cz/',
  language: 'en',
  pragueByDefault: true,
  topicByDefault: false,

  async fetchItems({ limit = 40 } = {}) {
    const xml = await fetchText(FEED, { accept: 'application/rss+xml, application/xml' })
    const parsed = parser.parse(xml)
    const items = asArray(parsed?.rss?.channel?.item)

    return items.slice(0, limit).map((item) => {
      const link = typeof item.link === 'string' ? item.link : item.link?.['#text']
      const published = item.pubDate ? new Date(item.pubDate) : null
      return {
        url: canonicalUrl(link, FEED),
        title: clean(typeof item.title === 'string' ? item.title : item.title?.['#text']),
        summary: stripHtml(item.description || item['content:encoded'] || '').slice(0, 600),
        publishedAt: published && !Number.isNaN(published.getTime()) ? isoDate(published) : null,
        tags: asArray(item.category)
          .map((c) => clean(typeof c === 'string' ? c : c?.['#text']))
          .filter(Boolean),
      }
    })
  },
}
