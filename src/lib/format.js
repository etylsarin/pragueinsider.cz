const { t } = require('../i18n/ui')

const DATE_LOCALE = { cs: 'cs-CZ', en: 'en-GB' }

/** "24. října 2024" / "24 October 2024" */
const formatDate = (isoDate, locale) => {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(DATE_LOCALE[locale] || 'cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

/** "24. 10. 2024" / "24 Oct 2024" — for dense metadata rows. */
const formatDateShort = (isoDate, locale) => {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(DATE_LOCALE[locale] || 'cs-CZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

/**
 * Sidebar-style relative age ("2 days ago"), falling back to an absolute date past a month
 * so old related links never read as vague.
 *
 * `now` is injectable because Gatsby renders this at build time and again on hydration —
 * callers that care about stability pass a fixed reference.
 */
const formatRelative = (isoDate, locale, now = new Date()) => {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ''
  const days = Math.floor((now - date) / 86400000)
  if (days <= 0) return t(locale, 'time.today')
  if (days === 1) return t(locale, 'time.yesterday')
  if (days < 7) return t(locale, 'time.daysAgo', { n: days })
  if (days < 30) return t(locale, 'time.weeksAgo', { n: Math.floor(days / 7) })
  return formatDateShort(isoDate, locale)
}

/** Rough reading time from the rendered markdown word count. */
const readingMinutes = (words) => Math.max(1, Math.round((words || 0) / 200))

module.exports = { formatDate, formatDateShort, formatRelative, readingMinutes }
