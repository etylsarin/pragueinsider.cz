import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import Icon from './Icon'
import Search from './Search'
import { t } from '../i18n/ui'
import { CATEGORIES } from '../config/categories'
import { categoryPath, homePath, mapPath } from '../lib/paths'

/**
 * Fixed masthead. Per DESIGN.md it starts translucent over the page and settles onto a solid
 * surface once the reader scrolls past the fold.
 */
const Nav = ({ locale, translationPath }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A route change unmounts the page but not the layout — close any open overlay by hand.
  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [translationPath])

  const otherLocale = locale === 'cs' ? 'en' : 'cs'

  const desks = CATEGORIES.map((category) => (
    <Link
      key={category.key}
      to={categoryPath(locale, category.key)}
      className="text-on-surface-variant hover:text-primary transition-colors text-label-caps font-label-caps"
      activeClassName="text-primary"
      partiallyActive
    >
      {category.label[locale]}
    </Link>
  ))

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[60] focus:top-2 focus:left-2 focus:bg-primary focus:text-on-primary focus:px-4 focus:py-2 focus:text-label-caps focus:font-label-caps"
      >
        {t(locale, 'nav.skip')}
      </a>

      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-gutter h-16 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-sm border-tertiary/80'
            : 'bg-surface/80 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="flex items-center gap-8 min-w-0">
          <Link
            to={homePath(locale)}
            className="text-headline-sm md:text-headline-md font-headline-md text-primary tracking-tight whitespace-nowrap"
          >
            Prague Insider
          </Link>
          <div className="hidden lg:flex gap-6 items-center">
            {desks}
            <Link
              to={mapPath(locale)}
              className="text-on-surface-variant hover:text-primary transition-colors text-label-caps font-label-caps"
              activeClassName="text-primary"
            >
              {t(locale, 'nav.map')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to={translationPath}
            className="text-label-caps font-label-caps text-on-surface-variant hover:text-primary transition-colors border border-tertiary/40 px-2 py-1"
            aria-label={t(locale, 'lang.switchAria')}
            hrefLang={otherLocale}
          >
            {otherLocale.toUpperCase()}
          </Link>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="text-on-surface-variant hover:text-primary p-1"
            aria-label={t(locale, 'nav.search')}
          >
            <Icon name="search" />
          </button>
          <Link
            to={`${locale === 'cs' ? '' : '/en'}/rss.xml`}
            className="hidden md:block bg-primary text-on-primary px-4 py-2 text-label-caps font-label-caps hover:bg-surface-tint transition-colors"
          >
            {t(locale, 'nav.subscribe')}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden text-on-surface-variant hover:text-primary p-1"
            aria-label={menuOpen ? t(locale, 'nav.close') : t(locale, 'nav.menu')}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="fixed top-16 left-0 right-0 z-40 bg-surface border-b border-tertiary/80 lg:hidden">
          <div className="flex flex-col px-margin-mobile py-4 gap-4">
            {desks}
            <Link
              to={mapPath(locale)}
              className="text-on-surface-variant hover:text-primary transition-colors text-label-caps font-label-caps"
            >
              {t(locale, 'nav.map')}
            </Link>
          </div>
        </div>
      ) : null}

      {searchOpen ? <Search locale={locale} onClose={() => setSearchOpen(false)} /> : null}
    </>
  )
}

export default Nav
