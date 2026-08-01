const path = require('path')
const fs = require('fs/promises')
const { createFilePath } = require('gatsby-source-filesystem')

const { LOCALES, DEFAULT_LOCALE } = require('./src/config/site')
const { CATEGORIES } = require('./src/config/categories')
const { STATIC_PAGES } = require('./src/config/pages')
const { postPath, categoryPath, homePath, staticPagePath, mapPath } = require('./src/lib/paths')
const { coverSvg } = require('./src/lib/cover')

/**
 * Content lives at content/<collection>/<name>/index.<locale>.md.
 * For posts, <name> is `YYYY-MM-DD-slug`; the date prefix keeps the directory listing
 * chronological but is stripped from the URL.
 */
const parseFilePath = (relativePath) => {
  const match = /^\/([^/]+)\/index\.([a-z]{2})\/?$/.exec(relativePath)
  if (!match) return null
  const [, dirName, locale] = match
  if (!LOCALES.includes(locale)) return null
  const slug = dirName.replace(/^\d{4}-\d{2}-\d{2}-/, '')
  return { slug, locale }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type !== 'MarkdownRemark') return
  const { createNodeField } = actions

  const parent = getNode(node.parent)
  const collection = parent?.sourceInstanceName // "posts" | "pages"
  if (!collection) return

  const relativePath = createFilePath({ node, getNode, trailingSlash: true })
  const parsed = parseFilePath(relativePath)
  if (!parsed) {
    reportBadPath(relativePath)
    return
  }

  const { slug, locale } = parsed
  const pagePath =
    collection === 'posts' ? postPath(locale, slug) : staticPagePath(locale, slug)

  createNodeField({ node, name: 'collection', value: collection })
  createNodeField({ node, name: 'locale', value: locale })
  createNodeField({ node, name: 'slug', value: slug })
  createNodeField({ node, name: 'path', value: pagePath })
}

const badPaths = new Set()
const reportBadPath = (relativePath) => {
  if (badPaths.has(relativePath)) return
  badPaths.add(relativePath)
  console.warn(
    `[prague-insider] skipping "${relativePath}" — expected <name>/index.<${LOCALES.join('|')}>.md`
  )
}

/**
 * Explicit types so the site still builds when no post yet uses an optional field
 * (a fresh clone has no geotagged posts, so `location` would otherwise be un-inferrable).
 */
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Fields {
      collection: String
      locale: String
      slug: String
      path: String
    }

    type Frontmatter {
      title: String!
      dek: String
      date: Date @dateformat
      updated: Date @dateformat
      category: String
      tags: [String!]
      district: String
      location: GeoPoint
      sources: [SourceRef!]
      cover: CoverConfig
      author: String
      aiGenerated: Boolean
      featured: Boolean
      draft: Boolean
      lang: String
      slug: String
    }

    type GeoPoint {
      lat: Float
      lng: Float
    }

    type SourceRef {
      title: String
      url: String
      publisher: String
      date: Date @dateformat
    }

    type CoverConfig {
      variant: String
      seed: Int
    }
  `)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fields: { collection: { eq: "posts" } }, frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          fields { locale slug path }
          frontmatter { title category date }
        }
      }
      pages: allMarkdownRemark(filter: { fields: { collection: { eq: "pages" } } }) {
        nodes {
          id
          fields { locale slug path }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Failed to load content for page creation', result.errors)
    return
  }

  const posts = result.data.posts.nodes
  const pages = result.data.pages.nodes

  const postsByLocale = Object.fromEntries(LOCALES.map((l) => [l, []]))
  posts.forEach((post) => postsByLocale[post.fields.locale]?.push(post))

  // A post can legitimately exist in one locale only (a translation that has not landed yet).
  // Track what exists so the language switcher never points at a 404.
  const published = new Set(posts.map((post) => `${post.fields.locale}:${post.fields.slug}`))
  const counterpartPath = (locale, slug) => {
    const other = locale === 'cs' ? 'en' : 'cs'
    return published.has(`${other}:${slug}`) ? postPath(other, slug) : homePath(other)
  }

  // --- articles ---------------------------------------------------------------------------
  const articleTemplate = path.resolve('./src/templates/article.jsx')
  posts.forEach((post) => {
    const { locale, slug } = post.fields

    // Related = same desk, newest first, then any recent post if the desk is thin.
    const sameLocale = postsByLocale[locale] || []
    const sameCategory = sameLocale.filter(
      (other) => other.id !== post.id && other.frontmatter.category === post.frontmatter.category
    )
    const fallback = sameLocale.filter(
      (other) => other.id !== post.id && !sameCategory.some((c) => c.id === other.id)
    )
    const relatedIds = [...sameCategory, ...fallback].slice(0, 3).map((other) => other.id)

    createPage({
      path: post.fields.path,
      component: articleTemplate,
      context: {
        id: post.id,
        slug,
        locale,
        relatedIds,
        translationPath: counterpartPath(locale, slug),
        // hreflang only advertises locales that actually exist for this story.
        alternates: LOCALES.filter((l) => published.has(`${l}:${slug}`)).map((l) => ({
          locale: l,
          path: postPath(l, slug),
        })),
      },
    })
  })

  // --- home -------------------------------------------------------------------------------
  const homeTemplate = path.resolve('./src/templates/home.jsx')
  LOCALES.forEach((locale) => {
    createPage({
      path: homePath(locale),
      component: homeTemplate,
      context: {
        locale,
        translationPath: homePath(locale === 'cs' ? 'en' : 'cs'),
        alternates: LOCALES.map((l) => ({ locale: l, path: homePath(l) })),
      },
    })
  })

  // --- category feeds ---------------------------------------------------------------------
  const categoryTemplate = path.resolve('./src/templates/category.jsx')
  LOCALES.forEach((locale) => {
    CATEGORIES.forEach((category) => {
      createPage({
        path: categoryPath(locale, category.key),
        component: categoryTemplate,
        context: {
          locale,
          categoryKey: category.key,
          translationPath: categoryPath(locale === 'cs' ? 'en' : 'cs', category.key),
          alternates: LOCALES.map((l) => ({ locale: l, path: categoryPath(l, category.key) })),
        },
      })
    })
  })

  // --- standing pages ---------------------------------------------------------------------
  const pageTemplate = path.resolve('./src/templates/page.jsx')
  pages.forEach((page) => {
    const { locale, slug } = page.fields
    const pageConfig = STATIC_PAGES.find((p) => p.key === slug)
    if (!pageConfig) {
      reporter.warn(`[prague-insider] content/pages/${slug} has no entry in src/config/pages.js`)
      return
    }
    createPage({
      path: page.fields.path,
      component: pageTemplate,
      context: {
        id: page.id,
        locale,
        pageKey: slug,
        translationPath: staticPagePath(locale === 'cs' ? 'en' : 'cs', slug),
        alternates: LOCALES.map((l) => ({ locale: l, path: staticPagePath(l, slug) })),
      },
    })
  })

  // --- map --------------------------------------------------------------------------------
  const mapTemplate = path.resolve('./src/templates/map.jsx')
  LOCALES.forEach((locale) => {
    createPage({
      path: mapPath(locale),
      component: mapTemplate,
      context: {
        locale,
        translationPath: mapPath(locale === 'cs' ? 'en' : 'cs'),
        alternates: LOCALES.map((l) => ({ locale: l, path: mapPath(l) })),
      },
    })
  })
}

/** The 404 page is locale-less; give it the default locale's chrome. */
exports.onCreatePage = ({ page, actions }) => {
  if (!page.context?.locale) {
    actions.deletePage(page)
    actions.createPage({
      ...page,
      context: {
        ...page.context,
        locale: DEFAULT_LOCALE,
        translationPath: homePath('en'),
        alternates: [],
      },
    })
  }
}

/**
 * Post-build artefacts: the client-side search index and the social cards.
 *
 * OG cards are rasterised from the same coverSvg() the page inlines. sharp renders SVG through
 * librsvg, which resolves fonts through fontconfig and cannot see our webfonts — so the OG
 * variant falls back to generic serif/monospace families. That costs a little typographic
 * fidelity on a 1200x630 social thumbnail and keeps one cover implementation instead of two.
 */
exports.onPostBuild = async ({ graphql, reporter }) => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "posts" } }, frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          excerpt(pruneLength: 900)
          fields { locale slug path }
          frontmatter {
            title
            dek
            date
            category
            tags
            cover { variant seed }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.warn('[prague-insider] post-build artefacts skipped — content query failed')
    return
  }

  const nodes = result.data.allMarkdownRemark.nodes
  const publicDir = path.join(__dirname, 'public')

  // --- search index -----------------------------------------------------------------------
  const index = nodes.map((node) => ({
    path: node.fields.path,
    locale: node.fields.locale,
    title: node.frontmatter.title,
    dek: node.frontmatter.dek || '',
    date: node.frontmatter.date,
    category: node.frontmatter.category,
    tags: node.frontmatter.tags || [],
    text: node.excerpt,
  }))
  await fs.writeFile(path.join(publicDir, 'search-index.json'), JSON.stringify(index))
  reporter.info(`[prague-insider] search index: ${index.length} entries`)

  // --- OG cards ---------------------------------------------------------------------------
  let sharp
  try {
    sharp = require('sharp')
  } catch (error) {
    reporter.warn('[prague-insider] sharp unavailable — skipping OG image generation')
    return
  }

  const ogDir = path.join(publicDir, 'og')
  await fs.mkdir(ogDir, { recursive: true })

  const renderCard = async (svg, file) => {
    try {
      const buffer = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
      await fs.writeFile(path.join(ogDir, file), buffer)
      return true
    } catch (error) {
      reporter.warn(`[prague-insider] could not render ${file}: ${error.message}`)
      return false
    }
  }

  let rendered = 0
  for (const node of nodes) {
    const { locale, slug } = node.fields
    const category = CATEGORIES.find((c) => c.key === node.frontmatter.category)
    const svg = coverSvg(
      {
        slug,
        title: node.frontmatter.title,
        category: node.frontmatter.category,
        label: category ? category.label[locale] : node.frontmatter.category,
        variant: node.frontmatter.cover?.variant,
        seed: node.frontmatter.cover?.seed,
      },
      { format: 'og' }
    )
    if (await renderCard(svg, `${slug}-${locale}.png`)) rendered += 1
  }

  await renderCard(
    coverSvg(
      { slug: 'prague-insider', title: 'Prague Insider', category: 'architecture', label: 'Praha' },
      { format: 'og' }
    ),
    'default.png'
  )

  reporter.info(`[prague-insider] OG cards: ${rendered}/${nodes.length}`)
}
