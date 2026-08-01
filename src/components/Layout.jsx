import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import '../styles/global.css'

/**
 * Page shell. `translationPath` is the same page in the other locale — every template
 * computes it from src/lib/paths so the switcher and the hreflang tags always agree.
 */
const Layout = ({ locale = 'cs', translationPath = '/', children, wide = false }) => (
  <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md antialiased">
    <Nav locale={locale} translationPath={translationPath} />
    <main
      id="main"
      className={`flex-grow pt-24 pb-section-gap px-margin-mobile md:px-gutter w-full ${
        wide ? '' : 'max-w-container-max mx-auto'
      }`}
    >
      {children}
    </main>
    <Footer locale={locale} />
  </div>
)

export default Layout
