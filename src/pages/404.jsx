import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { t } from '../i18n/ui'
import { homePath } from '../lib/paths'

const NotFoundPage = ({ pageContext }) => {
  const locale = pageContext?.locale || 'cs'
  return (
    <Layout locale={locale} translationPath={homePath(locale === 'cs' ? 'en' : 'cs')}>
      <div className="py-section-gap max-w-3xl">
        <span className="text-label-caps font-label-caps text-brick-accent">404</span>
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mt-2">
          {t(locale, 'notFound.title')}
        </h1>
        <p className="text-headline-sm font-headline-sm text-on-surface-variant mt-4">
          {t(locale, 'notFound.body')}
        </p>
        <Link
          to={homePath(locale)}
          className="mt-stack-md inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 text-label-caps font-label-caps hover:bg-surface-tint transition-colors"
        >
          {t(locale, 'notFound.home')}
          <Icon name="arrowRight" size={14} />
        </Link>
      </div>
    </Layout>
  )
}

export const Head = ({ pageContext }) => (
  <Seo locale={pageContext?.locale || 'cs'} title={t(pageContext?.locale || 'cs', 'notFound.title')} noindex />
)

export default NotFoundPage
