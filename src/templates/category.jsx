import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import ArticleCard from '../components/ArticleCard'
import { t } from '../i18n/ui'
import { getCategory } from '../config/categories'
import { categoryPath } from '../lib/paths'

const CategoryTemplate = ({ data, pageContext }) => {
  const { locale, categoryKey, translationPath } = pageContext
  const category = getCategory(categoryKey)
  const nodes = data.posts.nodes

  return (
    <Layout locale={locale} translationPath={translationPath}>
      <header className="border-b-2 border-primary pb-stack-md mb-stack-lg">
        <span className="text-label-caps font-label-caps text-on-surface-variant">
          {t(locale, 'category.eyebrow')}
        </span>
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mt-2">
          {category.label[locale]}
        </h1>
        <p className="text-headline-sm font-headline-sm text-on-surface-variant mt-4 max-w-3xl">
          {category.blurb[locale]}
        </p>
      </header>

      {nodes.length === 0 ? (
        <p className="text-headline-sm font-headline-sm text-on-surface-variant py-stack-lg">
          {t(locale, 'category.empty')}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-stack-lg">
          {nodes.map((node) => (
            <ArticleCard
              key={node.id}
              locale={locale}
              post={{
                slug: node.fields.slug,
                title: node.frontmatter.title,
                dek: node.frontmatter.dek,
                date: node.frontmatter.date,
                category: node.frontmatter.category,
                cover: node.frontmatter.cover,
              }}
            />
          ))}
        </div>
      )}
    </Layout>
  )
}

export const Head = ({ pageContext }) => {
  const { locale, categoryKey, alternates } = pageContext
  const category = getCategory(categoryKey)
  return (
    <Seo
      locale={locale}
      title={category.label[locale]}
      description={category.blurb[locale]}
      path={categoryPath(locale, categoryKey)}
      alternates={alternates}
    />
  )
}

export const query = graphql`
  query Category($locale: String!, $categoryKey: String!) {
    posts: allMarkdownRemark(
      filter: {
        fields: { collection: { eq: "posts" }, locale: { eq: $locale }, desks: { in: [$categoryKey] } }
        frontmatter: { draft: { ne: true } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        fields { slug }
        frontmatter {
          title
          dek
          date
          category
          cover { ...CoverFields }
        }
      }
    }
  }
`

export default CategoryTemplate
