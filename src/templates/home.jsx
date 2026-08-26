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
  // Counted from `desks` rather than grouped by `category`, so a cross-filed article is counted
  // in every desk it actually appears in. Grouping by category undercounts it, and the number
  // then contradicts the page it links to.
  const deskCounts = {}
  for (const node of data.counts.nodes) {
    for (const desk of node.fields.desks || []) deskCounts[desk] = (deskCounts[desk] || 0) + 1
  }

  const newestDate = nodes[0]?.frontmatter.date
  const leadIndex = Math.max(
    0,
    nodes.findIndex((node) => node.frontmatter.featured && node.frontmatter.date === newestDate)
  )
  const lead = nodes[leadIndex]
  const rest = nodes.filter((_, i) => i !== leadIndex)
  // Two rails, and the headings distinguish them: `secondary` really is the newest after the
  // lead, `remainder` is what follows. Both used to be headed "Latest", which was false of the
  // second one — it is the older half of the same descending list.
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
            <div className="border-b-2 border-primary pb-2 mb-stack-md">
              <h1 className="text-label-caps font-label-caps text-primary">{t(locale, 'home.lead')}</h1>
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
                  {t(locale, 'home.more')}
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
                  const count = deskCounts[category.key] || 0
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
          cover { ...CoverFields }
        }
      }
    }
    counts: allMarkdownRemark(
      filter: {
        fields: { collection: { eq: "posts" }, locale: { eq: $locale } }
        frontmatter: { draft: { ne: true } }
      }
    ) {
      nodes {
        fields { desks }
      }
    }
  }
`

export default HomeTemplate
