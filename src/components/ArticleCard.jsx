import React from 'react'
import { Link } from 'gatsby'
import Cover from './Cover'
import { getCategory } from '../config/categories'
import { formatRelative } from '../lib/format'
import { postPath } from '../lib/paths'

/**
 * Feed card. `variant` controls density:
 *   lead    — front-page hero, full-width cover and display type
 *   default — the standard 16:9 vertical card from DESIGN.md
 *   compact — sidebar / related links, small cover
 *   text    — no cover, for dense list rails
 */
const ArticleCard = ({ post, locale, variant = 'default' }) => {
  const category = getCategory(post.category)
  const label = category ? category.label[locale] : post.category
  const to = postPath(locale, post.slug)

  const meta = (
    <span className="text-label-caps font-label-caps text-on-surface-variant">
      {label} · {formatRelative(post.date, locale)}
    </span>
  )

  if (variant === 'lead') {
    return (
      <Link to={to} className="group block">
        <Cover post={post} label={label} locale={locale} format="hero" className="mb-stack-md" />
        <div className="flex items-center gap-2 mb-4">
          <span className="border border-tertiary/80 px-2 py-1 text-label-caps font-label-caps text-on-surface-variant">
            {label}
          </span>
          <span className="text-label-caps font-label-caps text-on-surface-variant">·</span>
          <span className="text-label-caps font-label-caps text-on-surface-variant">
            {formatRelative(post.date, locale)}
          </span>
        </div>
        <h2 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary group-hover:text-brick-accent transition-colors max-w-4xl">
          {post.title}
        </h2>
        {post.dek ? (
          <p className="text-headline-sm font-headline-sm text-on-surface-variant mt-6 max-w-3xl">{post.dek}</p>
        ) : null}
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link to={to} className="group block">
        <Cover post={post} label={label} locale={locale} format="card" className="mb-3" />
        <h4 className="text-body-md font-body-md font-bold text-primary group-hover:text-brick-accent transition-colors leading-tight">
          {post.title}
        </h4>
        <span className="text-caption font-caption text-on-surface-variant mt-1 block">
          {label} · {formatRelative(post.date, locale)}
        </span>
      </Link>
    )
  }

  if (variant === 'text') {
    return (
      <Link to={to} className="group block py-4 border-b border-tertiary/15">
        {meta}
        <h3 className="text-headline-sm font-headline-sm text-primary group-hover:text-brick-accent transition-colors mt-1">
          {post.title}
        </h3>
        {post.dek ? (
          <p className="text-body-md font-body-md text-on-surface-variant mt-2 line-clamp-2">{post.dek}</p>
        ) : null}
      </Link>
    )
  }

  return (
    <Link to={to} className="group block">
      <Cover post={post} label={label} locale={locale} format="card" className="mb-stack-sm" />
      <div className="mt-3">{meta}</div>
      <h3 className="text-headline-sm font-headline-sm text-primary group-hover:text-brick-accent transition-colors mt-2 leading-tight">
        {post.title}
      </h3>
      {post.dek ? (
        <p className="text-body-md font-body-md text-on-surface-variant mt-2 line-clamp-3">{post.dek}</p>
      ) : null}
    </Link>
  )
}

export default ArticleCard
