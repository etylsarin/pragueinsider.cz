import * as cheerio from 'cheerio'
import { fetchText } from '../lib/http.mjs'
import { clean, canonicalUrl, dayMonthToIso } from '../lib/text.mjs'

/**
 * archiweb.cz — the Czech architecture news service. It publishes no RSS (both /rss and
 * /en/rss 404), so the listing at /n is parsed directly.
 *
 * Markup, stable as of the last check:
 *   <a href="/n/{section}/{slug}">
 *     <div class="new"><div class="inner">
 *       <span class="discuss">…</span><span class="date">28.07.</span><span class="title">…</span>
 *
 * Coverage is national, so nothing here is assumed to be about Prague — the relevance filter
 * does the work, and most items are correctly discarded.
 */

const LISTING = 'https://www.archiweb.cz/n'

export default {
  id: 'archiweb',
  name: 'archiweb.cz',
  homepage: 'https://www.archiweb.cz/',
  language: 'cs',
  pragueByDefault: false,
  topicByDefault: true,

  async fetchItems({ limit = 60 } = {}) {
    const html = await fetchText(LISTING)
    const $ = cheerio.load(html)
    const items = []
    const seenUrls = new Set()

    $('a[href^="/n/"]').each((_, element) => {
      if (items.length >= limit) return
      const node = $(element)
      const title = clean(node.find('.title').first().text())
      // Section links ("/n/domaci") carry no .title — that is how we skip them.
      if (!title) return

      const url = canonicalUrl(node.attr('href'), LISTING)
      if (!url || seenUrls.has(url)) return
      seenUrls.add(url)

      items.push({
        url,
        title,
        summary: '',
        // The listing prints "28.07." with no year; dayMonthToIso resolves the nearest past one.
        publishedAt: dayMonthToIso(node.find('.date').first().text()),
        tags: [clean(node.attr('href').split('/')[2] || '')].filter(Boolean),
      })
    })

    return items
  },
}
