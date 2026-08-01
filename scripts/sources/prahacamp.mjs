import * as cheerio from 'cheerio'
import { fetchText } from '../lib/http.mjs'
import { clean, canonicalUrl } from '../lib/text.mjs'

/**
 * praha.camp — the magazine of CAMP, the city's Centre for Architecture and Urban Planning.
 * Long-form, always Prague, always the built environment: our highest-signal source.
 *
 * Server-rendered Solid app, no feed. Card markup:
 *   <a href="/magazin/detail/{slug}" class="card">
 *     <div class="card__tags"><div class="tag">…</div></div>
 *     <div class="card__info"><time datetime="2026-06-26">…</time></div>
 *     <div class="card__title">…</div>
 */

const LISTING = 'https://praha.camp/magazin'

export default {
  id: 'prahacamp',
  name: 'praha.camp (CAMP)',
  homepage: 'https://praha.camp/',
  language: 'cs',
  pragueByDefault: true,
  topicByDefault: true,

  async fetchItems({ limit = 40 } = {}) {
    const html = await fetchText(LISTING)
    const $ = cheerio.load(html)
    const items = []
    const seenUrls = new Set()

    $('a[href^="/magazin/detail/"]').each((_, element) => {
      if (items.length >= limit) return
      const node = $(element)
      const url = canonicalUrl(node.attr('href'), LISTING)
      if (!url || seenUrls.has(url)) return

      // The title lives in a role=heading div, not an <h*> — fall back to link text.
      const title = clean(node.find('.card__title').first().text()) || clean(node.text())
      if (!title) return
      seenUrls.add(url)

      const datetime = node.find('time').first().attr('datetime')
      const tags = node
        .find('.card__tags .tag')
        .map((__, tag) => clean($(tag).text()))
        .get()
        .filter((tag) => tag && tag.toUpperCase() !== 'EN')

      items.push({
        url,
        title,
        summary: '',
        publishedAt: datetime && /^\d{4}-\d{2}-\d{2}/.test(datetime) ? datetime.slice(0, 10) : null,
        tags,
      })
    })

    return items
  },
}
