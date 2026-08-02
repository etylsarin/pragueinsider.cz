import { XMLParser } from 'fast-xml-parser'
import { fetchText } from './http.mjs'
import { clean, stripHtml, canonicalUrl, isoDate } from './text.mjs'

/**
 * Shared RSS/Atom reader. Several of our sources are WordPress or WordPress-shaped, and the
 * only thing that differs between them is the URL — so the parsing lives here once.
 */

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
})

const asArray = (value) => (Array.isArray(value) ? value : value ? [value] : [])

/** Feed fields arrive as a bare string, a CDATA object, or an attributed node. */
const textOf = (node) => {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (typeof node === 'object') return String(node['#text'] ?? node['@_href'] ?? '')
  return ''
}

export async function fetchFeed(url, { limit = 40 } = {}) {
  const xml = await fetchText(url, { accept: 'application/rss+xml, application/atom+xml, application/xml' })
  const parsed = parser.parse(xml)

  // RSS 2.0 and Atom put their entries in different places.
  const entries = parsed?.rss?.channel?.item
    ? asArray(parsed.rss.channel.item)
    : asArray(parsed?.feed?.entry)

  return entries.slice(0, limit).map((entry) => {
    const link = entry.link ? textOf(entry.link) : textOf(entry.id)
    const published = entry.pubDate || entry.published || entry.updated || entry['dc:date']
    const date = published ? new Date(published) : null

    return {
      url: canonicalUrl(link, url),
      title: clean(textOf(entry.title)),
      summary: stripHtml(
        textOf(entry.description) || textOf(entry['content:encoded']) || textOf(entry.summary)
      ).slice(0, 600),
      publishedAt: date && !Number.isNaN(date.getTime()) ? isoDate(date) : null,
      tags: asArray(entry.category)
        .map((category) => clean(textOf(category) || category?.['@_term']))
        .filter(Boolean),
    }
  })
}
