import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import ArticleCard from '../components/ArticleCard'
import Icon from '../components/Icon'
import { t } from '../i18n/ui'
import { CATEGORIES } from '../config/categories'
import { categoryPath } from '../lib/paths'
import { siteMetadata } from '../config/site'

const toCardPost = (node) => ({
  slug: node.fields.slug,
  title: node.frontmatter.title,
  dek: node.frontmatter.dek,
  date: node.frontmatter.date,
  category: node.frontmatter.category,
  cover: node.frontmatter.cover,
})

const HomeTemplate = ({ data, pageContext }) => {
  const { locale, translationPath } = pageContext
  const nodes = data.posts.nodes

  // `featured: true` pins the lead, but only among stories sharing the newest publication
  // date. The flag is written into frontmatter and never cleared, so honouring it globally
  // meant one pinned post owned the front page forever and yesterday's news outranked today's.
  const newestDate = nodes[0]?.frontmatter.date
  const leadIndex = Math.max(
    0,
    nodes.findIndex((node) => node.frontmatter.featured && node.frontmatter.date === newestDate)
  )
  const lead = nodes[leadIndex]
  const rest = nodes.filter((_, i) => i !== leadIndex)
  const secondary = rest.slice(0, 6)
  const remainder = rest.slice(6, 14)

  return (
    <Layout locale={locale} translationPath={translationPath}>
      {!lead ? (
        <p className="text-headline-sm font-headline-sm text-on-surface-variant py-section-gap">
          {t(locale, 'home.empty')}
        </p>
      ) : (
        <>
          <section className="mb-section-gap">
            <div className="flex items-baseline justify-between border-b-2 border-primary pb-2 mb-stack-md">
              <h1 className="text-label-caps font-label-caps text-primary">{t(locale, 'home.lead')}</h1>
              <span className="text-label-caps font-label-caps text-on-surface-variant">
                {siteMetadata.tagline[locale]}
              </span>
            </div>
            <ArticleCard post={toCardPost(lead)} locale={locale} variant="lead" />
          </section>

          {secondary.length ? (
            <section className="mb-section-gap">
              <h2 className="text-label-caps font-label-caps text-primary border-b border-tertiary/40 pb-2 mb-stack-md">
                {t(locale, 'home.latest')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-stack-lg">
                {secondary.map((node) => (
                  <ArticleCard key={node.id} post={toCardPost(node)} locale={locale} />
                ))}
              </div>
            </section>
          ) : null}

          {/* Until the archive is deep enough to fill a column, the desk index runs full width
              rather than sitting beside an empty two-thirds. */}
          <section
            className={`mb-section-gap gap-x-6 gap-y-stack-lg ${
              remainder.length ? 'grid grid-cols-1 lg:grid-cols-3' : ''
            }`}
          >
            {remainder.length ? (
              <div className="lg:col-span-2">
                <h2 className="text-label-caps font-label-caps text-primary border-b border-tertiary/40 pb-2 mb-2">
                  {t(locale, 'home.latest')}
                </h2>
                <div>
                  {remainder.map((node) => (
                    <ArticleCard key={node.id} post={toCardPost(node)} locale={locale} variant="text" />
                  ))}
                </div>
              </div>
            ) : null}

            <aside>
              <h2 className="text-label-caps font-label-caps text-primary border-b border-tertiary/40 pb-2 mb-2">
                {t(locale, 'home.byDesk')}
              </h2>
              <ul className={remainder.length ? '' : 'sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6'}>
                {CATEGORIES.map((category) => {
                  const count = data.counts.group.find((g) => g.fieldValue === category.key)?.totalCount || 0
                  return (
                    <li key={category.key}>
                      <Link
                        to={categoryPath(locale, category.key)}
                        className="group flex items-baseline justify-between gap-4 py-3 border-b border-tertiary/15"
                      >
                        <span>
                          <span className="text-headline-sm font-headline-sm text-primary group-hover:text-brick-accent transition-colors">
                            {category.label[locale]}
                          </span>
                          <span className="block text-caption font-caption text-on-surface-variant mt-1">
                            {category.blurb[locale]}
                          </span>
                        </span>
                        <span className="text-label-caps font-label-caps text-on-surface-variant shrink-0">
                          {String(count).padStart(2, '0')}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <a
                href={`${locale === 'cs' ? '' : '/en'}/rss.xml`}
                className="mt-stack-md inline-flex items-center gap-2 border border-tertiary/60 px-4 py-2 text-label-caps font-label-caps text-primary hover:bg-primary hover:text-on-primary transition-colors"
              >
                <Icon name="rss" size={14} />
                {t(locale, 'nav.subscribe')}
              </a>
            </aside>
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
      description={siteMetadata.description[locale]}
      path={alternates.find((a) => a.locale === locale)?.path || '/'}
      alternates={alternates}
    />
  )
}

export const query = graphql`
  query Home($locale: String!) {
    posts: allMarkdownRemark(
      filter: {
        fields: { collection: { eq: "posts" }, locale: { eq: $locale } }
        frontmatter: { draft: { ne: true } }
      }
      sort: { frontmatter: { date: DESC } }
      limit: 15
    ) {
      nodes {
        id
        fields { slug }
        frontmatter {
          title
          dek
          date
          category
          featured
          cover { variant seed }
        }
      }
    }
    counts: allMarkdownRemark(
      filter: {
        fields: { collection: { eq: "posts" }, locale: { eq: $locale } }
        frontmatter: { draft: { ne: true } }
      }
    ) {
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`

export default HomeTemplate
