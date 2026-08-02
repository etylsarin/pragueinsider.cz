import * as cheerio from 'cheerio'
import { fetchText } from '../lib/http.mjs'
import { clean, canonicalUrl } from '../lib/text.mjs'

/**
 * ČT24 — the Prague region section of Czech Television's news site. This is where the reporting
 * behind the regional TV bulletin (long broadcast as *Z metropole*, now *Události v regionech –
 * Praha*) is written up; the edu.ceskatelevize.cz page under that old title is a historical
 * archive, not current news.
 *
 * The section mixes genuine city reporting with national politics, health and crime that happen
 * to touch Prague, so neither Prague nor topic is assumed — every item earns its place through
 * the relevance filter.
 *
 * Markup: article links are <a href="/clanek/{section}/{slug}-{id}">. Only the lead item carries
 * a `title` attribute; the rest wrap a heading element and a thumbnail whose `alt` repeats the
 * headline. Reading the anchor's full text instead glues the heading to the standfirst, so the
 * headline is taken from the heading (or the alt) and never from the anchor as a whole.
 */

const LISTING = 'https://ct24.ceskatelevize.cz/rubrika/regiony/hlavni-mesto-praha-15'

export default {
  id: 'ct24praha',
  name: 'ČT24 — Praha',
  homepage: 'https://ct24.ceskatelevize.cz/',
  language: 'cs',
  pragueByDefault: false,
  topicByDefault: false,

  async fetchItems({ limit = 40 } = {}) {
    const html = await fetchText(LISTING)
    const $ = cheerio.load(html)
    const items = []
    const seenUrls = new Set()

    $('a[href^="/clanek/"]').each((_, element) => {
      if (items.length >= limit) return
      const node = $(element)

      const url = canonicalUrl(node.attr('href'), LISTING)
      if (!url || seenUrls.has(url)) return

      const title = clean(
        node.attr('title') ||
          node.find('h1, h2, h3, h4').first().text() ||
          node.find('img[alt]').first().attr('alt') ||
          ''
      )
      if (!title || title.length < 12) return
      seenUrls.add(url)

      // The listing carries no dates. Left null rather than guessed — the desk sees this value
      // and undated items are kept in the digest for it to judge.
      items.push({ url, title, summary: '', publishedAt: null, tags: [] })
    })

    return items
  },
}
