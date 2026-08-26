import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import ArticleCard from '../components/ArticleCard'
import { t } from '../i18n/ui'
import { mapPath } from '../lib/paths'

const MapTemplate = ({ data, pageContext }) => {
  const { locale, translationPath } = pageContext
  const [mapModule, setMapModule] = useState(null)

  // Leaflet reads `window` at import time, so it can only be pulled in after hydration.
  useEffect(() => {
    let cancelled = false
    import('../components/MapView').then((module) => {
      if (!cancelled) setMapModule(module)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const posts = data.posts.nodes.map((node) => ({
    slug: node.fields.slug,
    locale: node.fields.locale,
    title: node.frontmatter.title,
    dek: node.frontmatter.dek,
    date: node.frontmatter.date,
    category: node.frontmatter.category,
    district: node.frontmatter.district,
    location: node.frontmatter.location,
  }))

  const MapView = mapModule?.default
  const MapLegend = mapModule?.MapLegend

  return (
    <Layout locale={locale} translationPath={translationPath}>
      <header className="border-b-2 border-primary pb-stack-md mb-stack-lg">
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary">
          {t(locale, 'map.title')}
        </h1>
        <p className="text-headline-sm font-headline-sm text-on-surface-variant mt-4 max-w-3xl">
          {t(locale, 'map.intro')}
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-headline-sm font-headline-sm text-on-surface-variant py-stack-lg">
          {t(locale, 'map.empty')}
        </p>
      ) : (
        <>
          {MapView ? (
            <>
              <MapView locale={locale} posts={posts} />
              <MapLegend locale={locale} />
            </>
          ) : (
            <div className="w-full h-[60vh] min-h-[420px] border border-tertiary/40 bg-surface-container flex items-center justify-center">
              <span className="text-label-caps font-label-caps text-on-surface-variant">
                {t(locale, 'map.loading')}
              </span>
            </div>
          )}

          {/* Renders server-side too, so the geotagged archive stays crawlable without JS. */}
          <section className="mt-section-gap">
            <h2 className="text-label-caps font-label-caps text-primary border-b border-tertiary/40 pb-2 mb-stack-md">
              {t(locale, 'home.latest')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-stack-lg">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          </section>
        </>
      )}
    </Layout>
  )
}

export const Head = ({ pageContext }) => {
  const { locale, alternates } = pageContext
  return (
    <Seo
      locale={locale}
      title={t(locale, 'map.title')}
      description={t(locale, 'map.intro')}
      path={mapPath(locale)}
      alternates={alternates}
    />
  )
}

export const query = graphql`
  query MapPage($locale: String!) {
    posts: allMarkdownRemark(
      filter: {
        fields: { collection: { eq: "posts" }, locale: { eq: $locale } }
        frontmatter: { draft: { ne: true }, location: { lat: { ne: null } } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        fields { slug locale }
        frontmatter {
          title
          dek
          date
          category
          district
          location { lat lng }
        }
      }
    }
  }
`

export default MapTemplate
