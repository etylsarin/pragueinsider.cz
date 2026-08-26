import React from 'react'
import { Link } from 'gatsby'
import Icon from './Icon'
import { t } from '../i18n/ui'
import { STATIC_PAGES } from '../config/pages'
import { staticPagePath, feedPath } from '../lib/paths'

const Footer = ({ locale }) => (
  <footer className="w-full py-stack-lg px-margin-mobile md:px-gutter mt-auto bg-primary text-on-primary">
    <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-stack-md">
      <span className="text-body-md font-body-md text-on-primary/80">
        © {new Date().getFullYear()} {t(locale, 'footer.rights')}
      </span>

      <div className="flex flex-wrap justify-center items-center gap-6">
        {STATIC_PAGES.map((page) => (
          <Link
            key={page.key}
            to={staticPagePath(locale, page.key)}
            className="text-label-caps font-label-caps text-on-primary/80 hover:text-on-primary transition-opacity duration-200"
          >
            {page.label[locale]}
          </Link>
        ))}
        <a
          href={feedPath(locale)}
          className="text-label-caps font-label-caps text-on-primary/80 hover:text-on-primary transition-opacity duration-200 flex items-center gap-1"
        >
          <Icon name="rss" size={14} />
          {t(locale, 'footer.feed')}
        </a>
      </div>
    </div>

    <div className="max-w-container-max mx-auto mt-stack-md pt-stack-md border-t border-on-primary/15">
      <p className="text-caption font-caption text-on-primary/60 max-w-3xl">
        {t(locale, 'ai.disclosure')}{' '}
        <Link
          to={staticPagePath(locale, 'editorial-standards')}
          className="underline underline-offset-2 hover:text-on-primary"
        >
          {t(locale, 'ai.learnMore')}
        </Link>
        .
      </p>
    </div>
  </footer>
)

export default Footer
