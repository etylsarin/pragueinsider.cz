import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Cover from '../components/Cover'
import Icon from '../components/Icon'
import ArticleCard from '../components/ArticleCard'
import LocationBox from '../components/LocationBox'
import { t } from '../i18n/ui'
import { getCategory } from '../config/categories'
import { formatDate, readingMinutes } from '../lib/format'
import { categoryPath } from '../lib/paths'
import { siteMetadata } from '../config/site'

const ArticleTemplate = ({ data, pageContext }) => {
  const { locale, translationPath } = pageContext
  const post = data.post
  const related = data.related.nodes
  const fm = post.frontmatter
  const category = getCategory(fm.category)
  const label = category ? category.label[locale] : fm.category
  const coverPost = { slug: post.fields.slug, title: fm.title, category: fm.category, cover: fm.cover }
  const hasPhoto = Boolean(fm.cover?.photo?.childImageSharp)

  return (
    <Layout locale={locale} translationPath={translationPath}>
      <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
        {/* --- header --- */}
        <header className="col-span-4 md:col-span-12 mb-stack-lg">
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <Link
              to={categoryPath(locale, fm.category)}
              className="border border-tertiary/80 px-2 py-1 text-label-caps font-label-caps text-on-surface-variant hover:bg-slate-infrastructure hover:text-on-primary hover:border-slate-infrastructure transition-colors"
            >
              {label}
            </Link>
            {/* Cross-filed desks. A reader who arrived from one of these feeds should be able to
                see why the article was there, rather than wondering how it wandered in. */}
            {(fm.alsoIn || []).map((key) => {
              const other = getCategory(key)
              return (
                <Link
                  key={key}
                  to={categoryPath(locale, key)}
                  className="border border-dashed border-tertiary/60 px-2 py-1 text-label-caps font-label-caps text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                >
                  {other ? other.label[locale] : key}
                </Link>
              )
            })}
            <span className="text-label-caps font-label-caps text-on-surface-variant">•</span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">
              {formatDate(fm.date, locale)}
            </span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">•</span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">
              {readingMinutes(post.wordCount?.words)} min
            </span>
          </div>

          <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mb-6 max-w-4xl">
            {fm.title}
          </h1>

          {fm.dek ? (
            <p className="text-headline-sm font-headline-sm text-on-surface-variant mb-6 max-w-3xl">{fm.dek}</p>
          ) : null}

          {hasPhoto ? (
            /* A photograph gets a real caption under the frame, where a caption belongs and
               where it can run to a sentence. The plate gets the small provenance label it
               has always had, floated over artwork it cannot obscure anything of. */
            <figure className="w-full">
              <div className="border border-tertiary/80">
                <Cover post={coverPost} label={label} format="hero" />
              </div>
              <figcaption className="mt-3 text-caption font-caption text-on-surface-variant">
                {fm.cover.caption ? <span className="text-primary">{fm.cover.caption} </span> : null}
                {[
                  fm.district,
                  `${t(locale, 'article.photoCredit')}: ${fm.cover.credit}`,
                  formatDate(fm.cover.shot, locale),
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </figcaption>
            </figure>
          ) : (
            <figure className="w-full border border-tertiary/80">
              <Cover post={coverPost} label={label} format="hero" />
            </figure>
          )}
        </header>

        {/* --- body --- */}
        <article className="col-span-4 md:col-start-3 md:col-span-7">
          <div className="prose-insider" dangerouslySetInnerHTML={{ __html: post.html }} />

          {/* Sources — mandatory on every post, see content/pages/editorial-standards */}
          {fm.sources?.length ? (
            <section className="mt-12 pt-6 border-t-2 border-primary">
              <h2 className="text-label-caps font-label-caps text-primary mb-4">{t(locale, 'article.sources')}</h2>
              <ol className="space-y-3">
                {fm.sources.map((source, i) => (
                  <li key={source.url || i} className="flex gap-3">
                    <span className="text-label-caps font-label-caps text-on-surface-variant pt-1 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-body-md font-body-md text-secondary hover:underline underline-offset-2 break-words inline-flex items-start gap-1"
                      >
                        {source.title || source.url}
                        <Icon name="link" size={14} className="mt-1 shrink-0 opacity-60" />
                      </a>
                      <div className="text-caption font-caption text-on-surface-variant">
                        {[source.publisher, formatDate(source.date, locale)].filter(Boolean).join(' · ')}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <div className="mt-12 pt-6 border-t border-tertiary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              {(fm.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="bg-surface-container-high px-3 py-1 text-label-caps font-label-caps text-on-surface-variant"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <ShareRow locale={locale} title={fm.title} path={post.fields.path} />
          </div>
        </article>

        {/* --- sidebar --- */}
        <aside className="col-span-4 md:col-start-10 md:col-span-3 mt-12 md:mt-0 space-y-stack-lg">
          {related.length ? (
            <div className="border-t-2 border-primary pt-4">
              <h2 className="text-label-caps font-label-caps text-primary mb-6">{t(locale, 'article.related')}</h2>
              <div className="space-y-6">
                {related.map((node) => (
                  <ArticleCard
                    key={node.id}
                    locale={locale}
                    variant="compact"
                    post={{
                      slug: node.fields.slug,
                      title: node.frontmatter.title,
                      date: node.frontmatter.date,
                      category: node.frontmatter.category,
                      cover: node.frontmatter.cover,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {fm.location?.lat && fm.location?.lng ? (
            <LocationBox locale={locale} location={fm.location} district={fm.district} title={fm.title} />
          ) : null}
        </aside>
      </div>
    </Layout>
  )
}

/** Native share where available, clipboard fallback everywhere else. */
const ShareRow = ({ locale, title, path }) => {
  const [copied, setCopied] = React.useState(false)

  const onShare = async () => {
    const url = `${siteMetadata.siteUrl}${path}`
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch (error) {
        if (error?.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      /* clipboard blocked — nothing useful to do */
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-label-caps font-label-caps text-on-surface-variant">
        {copied ? '✓' : t(locale, 'article.share')}
      </span>
      <button
        type="button"
        onClick={onShare}
        className="text-on-surface-variant hover:text-primary transition-colors p-1"
        aria-label={t(locale, 'article.share')}
      >
        <Icon name="share" />
      </button>
    </div>
  )
}

export const Head = ({ data, pageContext }) => {
  const fm = data.post.frontmatter
  const { locale, alternates } = pageContext
  return (
    <Seo
      locale={locale}
      title={fm.title}
      description={fm.dek || data.post.excerpt}
      path={data.post.fields.path}
      alternates={alternates}
      ogImage={`/og/${data.post.fields.slug}-${locale}.png`}
      type="article"
      publishedTime={fm.date}
      tags={fm.tags || []}
    />
  )
}

export const query = graphql`
  query Article($id: String!, $relatedIds: [String!]!) {
    post: markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 200)
      wordCount { words }
      fields { slug path locale }
      frontmatter {
        title
        dek
        date
        category
        alsoIn
        tags
        district
        author
        location { lat lng }
        cover { ...CoverFields }
        sources { title url publisher date }
      }
    }
    related: allMarkdownRemark(filter: { id: { in: $relatedIds } }) {
      nodes {
        id
        fields { slug }
        frontmatter {
          title
          date
          category
          cover { ...CoverFields }
        }
      }
    }
  }
`

export default ArticleTemplate
