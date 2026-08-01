import React from 'react'
import { coverSvg } from '../lib/cover'

/**
 * Inlines the generated cover SVG. The markup comes from our own deterministic generator in
 * src/lib/cover.js — never from content — so dangerouslySetInnerHTML is safe here, and it
 * saves a network request plus any layout shift versus an <img>.
 */
const Cover = ({ post, locale, label, className = '', aspect = 'aspect-[16/9]' }) => {
  const svg = coverSvg({
    slug: post.slug,
    title: post.title,
    category: post.category,
    label,
    variant: post.cover?.variant,
    seed: post.cover?.seed,
  })

  return (
    <div
      className={`${aspect} w-full overflow-hidden bg-surface-variant border border-tertiary/20 ${className}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg.replace('<svg ', '<svg class="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" ') }}
    />
  )
}

export default Cover
