import React from 'react'
import { siteMetadata, LOCALES } from '../config/site'

const HTML_LANG = { cs: 'cs-CZ', en: 'en-GB' }

/**
 * Rendered through Gatsby's Head API by every template. Emitting hreflang from the same
 * `alternates` map the language switcher uses keeps the two from drifting apart.
 *
 * @param {object[]} alternates [{locale, path}] — must include the current page
 */
const Seo = ({
  locale = 'cs',
  title,
  description,
  path = '/',
  alternates = [],
  ogImage,
  type = 'website',
  publishedTime,
  tags = [],
  noindex = false,
  children,
}) => {
  const fullTitle = title ? `${title} — ${siteMetadata.title}` : siteMetadata.title
  const metaDescription = description || siteMetadata.description[locale]
  const canonical = `${siteMetadata.siteUrl}${path}`
  const image = `${siteMetadata.siteUrl}${ogImage || '/covers/default-og.png'}`

  const pairs = alternates.filter((alt) => LOCALES.includes(alt.locale))

  return (
    <>
      <html lang={HTML_LANG[locale]} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      {noindex ? <meta name="robots" content="noindex,follow" /> : null}

      {pairs.map((alt) => (
        <link
          key={alt.locale}
          rel="alternate"
          hrefLang={HTML_LANG[alt.locale]}
          href={`${siteMetadata.siteUrl}${alt.path}`}
        />
      ))}
      {pairs.length > 1 ? (
        <link rel="alternate" hrefLang="x-default" href={`${siteMetadata.siteUrl}${pairs.find((a) => a.locale === 'en')?.path || '/'}`} />
      ) : null}

      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale === 'cs' ? 'cs_CZ' : 'en_GB'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${siteMetadata.title} RSS`}
        href={`${siteMetadata.siteUrl}${locale === 'cs' ? '' : `/${locale}`}/rss.xml`}
      />
      <meta name="theme-color" content="#42362b" />
      {children}
    </>
  )
}

export default Seo
