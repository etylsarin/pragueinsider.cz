import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { coverSvg, FORMATS } from '../lib/cover'

/**
 * The cover slot: a photograph if the article has one, the generated plate otherwise.
 *
 * Most articles are about buildings nobody on the desk has stood in front of, and those keep the
 * abstract plate from src/lib/cover.js. When someone has actually been there, `cover.photo` in
 * frontmatter points at a file sitting beside index.<locale>.md and that wins.
 *
 * Photographed covers are always 16:9, whatever `format` asks for. The plate is drawn to order at
 * each format, but a photograph can only be cropped — and cropping the same frame twice, once to
 * 16:9 for a card and once to 2:1 for a hero, throws away different parts of the picture in
 * different places on the site. One crop, decided in the GraphQL fragment below, is honest.
 *
 * The SVG branch uses dangerouslySetInnerHTML because the markup comes from our own deterministic
 * generator — never from content — and inlining saves a request and any layout shift an <img>
 * would bring.
 */
const Cover = ({ post, label, format = 'card', className = '' }) => {
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

/**
 * Every template that renders a Cover spreads this, so the crop and the caption fields are
 * decided in one place. `alt` and `caption` are per-locale — they live in each index.<locale>.md
 * like the prose does — while `photo` and `credit` are the same picture in both.
 */
export const coverFields = graphql`
  fragment CoverFields on CoverConfig {
    variant
    seed
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
