import * as cheerio from 'cheerio'
import { fetchText } from '../lib/http.mjs'
import { clean, canonicalUrl, dayMonthToIso } from '../lib/text.mjs'

/**
 * Klub Za starou Prahu — the heritage society, founded 1900, that argues publicly against
 * demolitions and insensitive schemes.
 *
 * Editorially this is the counterweight the desk otherwise lacks. Every other source is an
 * institution, a press office or a trade title; none of them ever says a project is a bad idea.
 * The Klub maintains open case files (*kauzy*) on the Vyšehrad railway bridge, Obchodní dům Máj,
 * the Masaryk Centre scheme — and on the Prager Cubes reconstruction, which this site has so far
 * covered only from CAMP and IPR's account of it.
 *
 * Treat it as what it is: an advocacy organisation with a consistent position, and a primary
 * source for its own objections rather than a neutral referee. Attribute its claims to it by name.
 *
 * Markup:
 *   <div class="aktualita_vypis">
 *     <h2><a href="/…/aktualita-314/">TITLE</a><span class="fr">Sekce: <a>Kauzy</a></span></h2>
 *     <p><strong>21.06.2026</strong>: standfirst…</p>
 */

const LISTING = 'https://www.zastarouprahu.cz/menu-leve/aktuality/kategorie-17/'

export default {
  id: 'zastarouprahu',
  name: 'Klub Za starou Prahu',
  homepage: 'https://www.zastarouprahu.cz/',
  language: 'cs',
  pragueByDefault: true,
  topicByDefault: true,

  async fetchItems({ limit = 30 } = {}) {
    const html = await fetchText(LISTING)
    const $ = cheerio.load(html)
    const items = []
    const seenUrls = new Set()

    $('.aktualita_vypis').each((_, element) => {
      if (items.length >= limit) return
      const node = $(element)
      const link = node.find('h2 a').first()

      const url = canonicalUrl(link.attr('href'), LISTING)
      const title = clean(link.text())
      if (!url || !title || seenUrls.has(url)) return
      seenUrls.add(url)

      // The paragraph opens "<strong>DD.MM.YYYY</strong>: summary".
      const paragraph = node.find('p').first()
      const stamp = clean(paragraph.find('strong').first().text())
      const summary = clean(paragraph.text()).replace(/^\s*[\d.]+\s*:\s*/, '')

      // "Sekce: Kauzy" marks an active case rather than a notice — worth surfacing as a tag.
      const section = clean(node.find('h2 span a').first().text())

      items.push({
        url,
        title,
        summary: summary.slice(0, 600),
        publishedAt: dayMonthToIso(stamp),
        tags: section ? [section] : [],
      })
    })

    return items
  },
}
