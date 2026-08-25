import { createHash } from 'node:crypto'

/** Collapse whitespace and decode the handful of entities that survive cheerio's .text(). */
export const clean = (value) =>
  String(value ?? '')
    .replace(/ /g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim()

/** Crude but dependency-free HTML → text, for RSS descriptions that carry markup. */
export const stripHtml = (html) =>
  clean(
    String(html ?? '')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )

/** Diacritic-free lowercase, for matching Czech text with ASCII keywords. */
export const fold = (value) =>
  String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

/** ASCII slug — Czech diacritics folded, so URLs stay portable. */
export const slugify = (value) =>
  fold(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '')

/**
 * Strip tracking parameters and trailing slashes so the same article discovered through two
 * routes dedupes to one entry.
 */
export const canonicalUrl = (url, base) => {
  try {
    const parsed = new URL(url, base)
    parsed.hash = ''
    for (const key of [...parsed.searchParams.keys()]) {
      if (/^(utm_|fbclid|gclid|mc_|ref$|source$)/i.test(key)) parsed.searchParams.delete(key)
    }
    parsed.pathname = parsed.pathname.replace(/\/+$/, '') || '/'
    parsed.protocol = 'https:'
    // The host is deliberately left as the site serves it, `www.` and all. Stripping it made
    // tidier dedupe keys but handed the desk URLs on a host the site never advertises — and a
    // sandbox with a per-host network allowlist blocks `dpp.cz` while permitting `www.dpp.cz`.
    // Dedupe is unaffected: each adapter resolves against one base, so its URLs are consistent.
    return parsed.toString()
  } catch {
    return null
  }
}

export const hashId = (value) => createHash('sha1').update(String(value)).digest('hex').slice(0, 16)

/** ISO date (YYYY-MM-DD) in UTC. */
export const isoDate = (date) => new Date(date).toISOString().slice(0, 10)

/**
 * archiweb prints "28.07." with no year. Assume the most recent occurrence: a month ahead of
 * today means it belongs to last year, not the future.
 */
export const dayMonthToIso = (text, now = new Date()) => {
  const match = /(\d{1,2})\s*\.\s*(\d{1,2})\s*\.?\s*(\d{4})?/.exec(String(text || ''))
  if (!match) return null
  const [, day, month, year] = match
  let resolvedYear = year ? Number(year) : now.getUTCFullYear()
  if (!year) {
    const candidate = Date.UTC(resolvedYear, Number(month) - 1, Number(day))
    if (candidate > now.getTime() + 86400000) resolvedYear -= 1
  }
  const date = new Date(Date.UTC(resolvedYear, Number(month) - 1, Number(day)))
  if (Number.isNaN(date.getTime())) return null
  return isoDate(date)
}
