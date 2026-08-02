import * as cheerio from 'cheerio'
import { fetchText } from '../lib/http.mjs'
import { clean, canonicalUrl, dayMonthToIso } from '../lib/text.mjs'

/**
 * Dopravní podnik hl. m. Prahy — the city transit operator's own press office. A primary
 * source: metro D construction milestones, tram track closures, depot works and fleet
 * procurement, published before the trade press picks them up.
 *
 * Being a press office, it also publishes corporate self-congratulation (awards, ISO audits,
 * beekeeping at the Vokovice depot). The relevance filter cannot tell those from news, so the
 * desk is instructed to skip them — see .claude/skills/daily-scan/SKILL.md.
 *
 * Markup, stable as of the last check:
 *   <div class="Box-newslist">
 *     <div class="Box-date">30. 07. 2026</div>
 *     <h3><a class="Box-headingLink" href="/spolecnost/pro-media/tiskove-zpravy/detail/…">…</a></h3>
 *     <p>lead paragraph</p>
 */

const LISTING = 'https://www.dpp.cz/spolecnost/pro-media/tiskove-zpravy'

export default {
  id: 'dpp',
  name: 'Dopravní podnik hl. m. Prahy',
  homepage: 'https://www.dpp.cz/',
  language: 'cs',
  pragueByDefault: true,
  topicByDefault: true,

  async fetchItems({ limit = 30 } = {}) {
    const html = await fetchText(LISTING)
    const $ = cheerio.load(html)
    const items = []
    const seenUrls = new Set()

    $('.Box-newslist').each((_, element) => {
      if (items.length >= limit) return
      const node = $(element)
      const link = node.find('a.Box-headingLink').first()

      const url = canonicalUrl(link.attr('href'), LISTING)
      const title = clean(link.text())
      if (!url || !title || seenUrls.has(url)) return
      seenUrls.add(url)

      items.push({
        url,
        title,
        summary: clean(node.find('p').first().text()).slice(0, 600),
        // Printed as "30. 07. 2026" — dayMonthToIso handles the explicit year.
        publishedAt: dayMonthToIso(node.find('.Box-date').first().text()),
        tags: [],
      })
    })

    return items
  },
}
