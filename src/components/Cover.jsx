import React from 'react'
import { coverSvg, FORMATS } from '../lib/cover'

/**
 * Inlines the generated cover SVG.
 *
 * The container's aspect ratio is derived from the SVG's own viewBox, so the artwork is never
 * cropped and the desk name can sit reliably in the lower-left. The markup comes from our own
 * deterministic generator in src/lib/cover.js — never from content — so dangerouslySetInnerHTML
 * is safe here, and inlining saves a request and any layout shift an <img> would bring.
 */
const Cover = ({ post, label, format = 'card', className = '' }) => {
  const { w, h } = FORMATS[format] || FORMATS.card

  const svg = coverSvg(
    {
      slug: post.slug,
      title: post.title,
      category: post.category,
      label,
      variant: post.cover?.variant,
      seed: post.cover?.seed,
    },
    { format }
  ).replace('<svg ', '<svg class="block w-full h-full" preserveAspectRatio="xMidYMid meet" ')

  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Cover
