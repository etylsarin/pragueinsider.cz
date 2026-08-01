const path = require('path')
const { siteMetadata, LOCALES } = require('./src/config/site')

const feedForLocale = (locale) => ({
  serialize: ({ query: { site, allMarkdownRemark } }) =>
    allMarkdownRemark.nodes.map((node) => ({
      title: node.frontmatter.title,
      description: node.frontmatter.dek || node.excerpt,
      date: node.frontmatter.date,
      url: site.siteMetadata.siteUrl + node.fields.path,
      guid: site.siteMetadata.siteUrl + node.fields.path,
      categories: node.frontmatter.tags || [],
    })),
  query: `{
    allMarkdownRemark(
      filter: {
        fields: { locale: { eq: "${locale}" }, collection: { eq: "posts" } }
        frontmatter: { draft: { ne: true } }
      }
      sort: { frontmatter: { date: DESC } }
      limit: 50
    ) {
      nodes {
        excerpt
        fields { path }
        frontmatter { title dek date tags }
      }
    }
  }`,
  output: locale === 'cs' ? '/rss.xml' : `/${locale}/rss.xml`,
  title: `Prague Insider — ${locale === 'cs' ? 'Praha, architektura a veřejný prostor' : 'Prague architecture and public space'}`,
  site_url: `${siteMetadata.siteUrl}${locale === 'cs' ? '/' : `/${locale}/`}`,
  match: locale === 'cs' ? '^/(?!en/)' : `^/${locale}/`,
})

module.exports = {
  siteMetadata: {
    title: siteMetadata.title,
    siteUrl: siteMetadata.siteUrl,
    description: siteMetadata.description.cs,
  },
  trailingSlash: 'always',
  graphqlTypegen: false,
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'posts', path: path.join(__dirname, 'content/posts') },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'pages', path: path.join(__dirname, 'content/pages') },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'images', path: path.join(__dirname, 'src/images') },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        footnotes: true,
        gfm: true,
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 1200, linkImagesToOriginal: false, backgroundColor: 'transparent' },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: { output: '/sitemap' },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: { feeds: LOCALES.map(feedForLocale) },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Prague Insider',
        short_name: 'Prague Insider',
        start_url: '/',
        background_color: '#fcf9f8',
        theme_color: '#42362b',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
  ],
}
