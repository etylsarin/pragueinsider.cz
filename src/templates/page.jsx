import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { formatDate } from '../lib/format'
import { t } from '../i18n/ui'

/** Standing editorial pages (About, Editorial Standards, Privacy, Contact). */
const PageTemplate = ({ data, pageContext }) => {
  const { locale, translationPath } = pageContext
  const page = data.page
  const fm = page.frontmatter

  return (
    <Layout locale={locale} translationPath={translationPath}>
      <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
        <header className="col-span-4 md:col-start-3 md:col-span-8 border-b-2 border-primary pb-stack-md mb-stack-lg">
          <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary">{fm.title}</h1>
          {fm.dek ? (
            <p className="text-headline-sm font-headline-sm text-on-surface-variant mt-4">{fm.dek}</p>
          ) : null}
          {fm.updated ? (
            <p className="text-label-caps font-label-caps text-on-surface-variant mt-4">
              {t(locale, 'article.updated')} · {formatDate(fm.updated, locale)}
            </p>
          ) : null}
        </header>

        <article
          className="col-span-4 md:col-start-3 md:col-span-8 prose-insider"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>
    </Layout>
  )
}

export const Head = ({ data, pageContext }) => {
  const { locale, alternates } = pageContext
  const fm = data.page.frontmatter
  return (
    <Seo
      locale={locale}
      title={fm.title}
      description={fm.dek || data.page.excerpt}
      path={data.page.fields.path}
      alternates={alternates}
    />
  )
}

export const query = graphql`
  query StandingPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 200)
      fields { path }
      frontmatter {
        title
        dek
        updated
      }
    }
  }
`

export default PageTemplate
