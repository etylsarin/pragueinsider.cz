import * as cheerio from 'cheerio'
import { fetchText } from '../lib/http.mjs'
import { clean, canonicalUrl } from '../lib/text.mjs'

/**
 * IPR Praha — the city's planning institute. Primary-source announcements: competition
 * results, Metropolitan Plan milestones, participation rounds.
 *
 * Article URLs are bare single-segment slugs (/dvorecky-most, /nova-florenc), identical in
 * shape to the site's own navigation, so extraction is scoped to <article class="article-card">
 * rather than matched on the URL.
 */

const LISTING = 'https://iprpraha.cz/aktuality'

export default {
  id: 'iprpraha',
  name: 'IPR Praha',
  homepage: 'https://iprpraha.cz/',
  language: 'cs',
  pragueByDefault: true,
  topicByDefault: true,

  async fetchItems({ limit = 30, pages = 1 } = {}) {
    const items = []
    const seenUrls = new Set()

    for (let page = 1; page <= pages && items.length < limit; page += 1) {
      const url = page === 1 ? LISTING : `${LISTING}?page=${page}`
      const html = await fetchText(url)
      const $ = cheerio.load(html)

      $('article.article-card').each((_, element) => {
        if (items.length >= limit) return
        const node = $(element)
        const href = node.find('a[href]').last().attr('href')
        const canonical = canonicalUrl(href, LISTING)
        if (!canonical || seenUrls.has(canonical)) return

        const title = clean(node.find('h3').first().text())
        if (!title) return
        seenUrls.add(canonical)

        const datetime = node.find('time').first().attr('datetime')
        items.push({
          url: canonical,
          title,
          summary: '',
          publishedAt: datetime && /^\d{4}-\d{2}-\d{2}/.test(datetime) ? datetime.slice(0, 10) : null,
          tags: [],
        })
      })
    }

    return items
  },
}
