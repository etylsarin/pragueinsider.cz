import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FORMATS } from '../lib/cover'
import { CATEGORY_KEYS } from '../config/categories'

/**
 * The cover slot: a photograph if the article has one, its desk's plate otherwise.
 *
 * The plate is a static file from static/covers/, written by scripts/make-covers.mjs and shared by
 * every article on that desk. It used to be generated per article — the slug seeded the placement
 * inside the motif — and inlined separately into every page. That produced variation nobody had
 * asked for, and made a cache impossible: twelve articles meant twelve drawings, none reusable.
 * One file per desk per locale per format is fetched once and reused across the archive.
 *
 * Photographed covers are always 16:9, whatever `format` asks for. A plate is drawn to order at
 * each format, but a photograph can only be cropped — and cropping the same frame twice, once to
 * 16:9 for a card and once to 2:1 for a hero, throws away different parts of the picture in
 * different places on the site. One crop, decided in the GraphQL fragment below, is honest.
 */
const Cover = ({ post, label, locale = 'cs', format = 'card', className = '' }) => {
  const image = getImage(post.cover?.photo)

  if (image) {
    return (
      <div className={`w-full overflow-hidden ${className}`}>
        <GatsbyImage
          image={image}
          alt={post.cover.alt || ''}
          className="w-full h-full"
          style={{ aspectRatio: '16 / 9' }}
        />
      </div>
    )
  }

  const { w, h } = FORMATS[format] || FORMATS.card
  const desk = CATEGORY_KEYS.includes(post.category) ? post.category : CATEGORY_KEYS[0]
  const shape = format === 'hero' ? 'hero' : 'card'

  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      {/* Decorative: the headline it belongs to is always adjacent, and the desk name is drawn
          into the plate itself. Describing it again would only be noise in a screen reader. */}
      <img
        src={`/covers/${desk}-${locale}-${shape}.svg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={w}
        height={h}
        className="block w-full h-full object-cover"
      />
    </div>
  )
}

/**
 * Every template that renders a Cover spreads this, so the crop and the caption fields are
 * decided in one place. `alt` and `caption` are per-locale — they live in each index.<locale>.md
 * like the prose does — while `photo` and `credit` are the same picture in both.
 */
export const coverFields = graphql`
  fragment CoverFields on CoverConfig {
    alt
    caption
    credit
    shot
    photo {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          aspectRatio: 1.7777778
          placeholder: BLURRED
          formats: [AUTO, WEBP]
          transformOptions: { cropFocus: ATTENTION }
        )
      }
    }
  }
`

export default Cover
