import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'gatsby'
import Icon from './Icon'
import { t } from '../i18n/ui'
import { getCategory } from '../config/categories'
import { formatRelative } from '../lib/format'

/**
 * Search overlay over the static index emitted by gatsby-node's onPostBuild. The archive is
 * small enough that scoring in a loop beats shipping a search library — revisit if the index
 * grows past a few hundred KB.
 */

/** Strips Czech diacritics so "zizkov" finds "Žižkov". */
const fold = (value) =>
  String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const score = (entry, terms) => {
  const title = fold(entry.title)
  const dek = fold(entry.dek || '')
  const body = fold(entry.text || '')
  const tags = fold((entry.tags || []).join(' '))
  let total = 0
  for (const term of terms) {
    if (title.includes(term)) total += 10
    else if (tags.includes(term)) total += 6
    else if (dek.includes(term)) total += 4
    else if (body.includes(term)) total += 1
    else return 0 // every term must match somewhere
  }
  return total
}

const Search = ({ locale, onClose }) => {
  const [query, setQuery] = useState('')
  const [entries, setEntries] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    let cancelled = false
    fetch('/search-index.json')
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => {
        if (!cancelled) setEntries(data)
      })
      .catch(() => {
        if (!cancelled) setEntries([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  const results = useMemo(() => {
    if (!entries || query.trim().length < 2) return []
    const terms = fold(query).split(/\s+/).filter(Boolean)
    return entries
      .filter((entry) => entry.locale === locale)
      .map((entry) => ({ entry, rank: score(entry, terms) }))
      .filter((row) => row.rank > 0)
      .sort((a, b) => b.rank - a.rank || new Date(b.entry.date) - new Date(a.entry.date))
      .slice(0, 12)
      .map((row) => row.entry)
  }, [entries, query, locale])

  return (
    <div className="fixed inset-0 z-[55] bg-inverse-surface/40 backdrop-blur-sm" onClick={onClose} role="presentation">
      <div
        className="bg-surface border-b border-tertiary/80 max-h-[80vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t(locale, 'search.title')}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-6">
          <div className="flex items-center gap-3 border-b border-tertiary/40 focus-within:border-b-2 focus-within:border-primary pb-2">
            <Icon name="search" className="text-on-surface-variant" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t(locale, 'search.placeholder')}
              className="flex-grow bg-transparent text-headline-sm font-headline-sm text-primary placeholder:text-on-surface-variant/60 outline-none border-0"
            />
            <button
              type="button"
              onClick={onClose}
              className="text-on-surface-variant hover:text-primary p-1"
              aria-label={t(locale, 'nav.close')}
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="mt-6">
            {query.trim().length < 2 ? (
              <p className="text-caption font-caption text-on-surface-variant">{t(locale, 'search.hint')}</p>
            ) : results.length === 0 ? (
              <p className="text-caption font-caption text-on-surface-variant">{t(locale, 'search.empty')}</p>
            ) : (
              <ul className="divide-y divide-tertiary/15">
                {results.map((entry) => {
                  const category = getCategory(entry.category)
                  return (
                    <li key={entry.path}>
                      <Link to={entry.path} className="group block py-4" onClick={onClose}>
                        <span className="text-label-caps font-label-caps text-on-surface-variant">
                          {category ? category.label[locale] : entry.category} ·{' '}
                          {formatRelative(entry.date, locale)}
                        </span>
                        <h3 className="text-headline-sm font-headline-sm text-primary group-hover:text-brick-accent transition-colors mt-1">
                          {entry.title}
                        </h3>
                        {entry.dek ? (
                          <p className="text-body-md font-body-md text-on-surface-variant mt-1 line-clamp-2">
                            {entry.dek}
                          </p>
                        ) : null}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
