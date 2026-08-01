/**
 * All user-facing chrome text. Article bodies are authored per-locale in markdown;
 * everything else in the UI comes from here.
 */
const STRINGS = {
  cs: {
    'nav.search': 'Hledat',
    'nav.map': 'Mapa',
    'nav.subscribe': 'Odebírat',
    'nav.menu': 'Menu',
    'nav.close': 'Zavřít',
    'nav.skip': 'Přejít k obsahu',
    'lang.switch': 'English',
    'lang.switchAria': 'Switch to English',
    'home.lead': 'Hlavní téma',
    'home.latest': 'Nejnovější',
    'home.byDesk': 'Podle rubriky',
    'home.empty': 'Zatím žádné články. Ranní sken zdrojů teprve poběží.',
    'article.related': 'Související analýzy',
    'article.location': 'Lokalita projektu',
    'article.sources': 'Zdroje',
    'article.sourcesNote':
      'Tento článek vznikl syntézou níže uvedených zdrojů. Ověřte si detaily v originálech.',
    'article.share': 'Sdílet',
    'article.readMore': 'Číst dál',
    'article.tags': 'Témata',
    'article.published': 'Publikováno',
    'article.updated': 'Aktualizováno',
    'article.notAvailable': 'Tento článek zatím není v češtině k dispozici.',
    'ai.badge': 'Napsáno s pomocí AI',
    'ai.disclosure':
      'Text připravil redakční systém Prague Insider s využitím AI na základě uvedených zdrojů a prošel automatickou kontrolou. Fakta ověřujte v primárních zdrojích.',
    'ai.learnMore': 'Jak pracujeme',
    'cta.eyebrow': 'Prague Insider Briefing',
    'cta.headline': 'Sledujte, jak se mění panorama města.',
    'cta.button': 'Odebírat',
    'category.eyebrow': 'Rubrika',
    'category.empty': 'V této rubrice zatím nic nevyšlo.',
    'map.title': 'Mapa projektů',
    'map.intro': 'Články s určenou lokalitou vynesené do mapy Prahy.',
    'map.empty': 'Zatím žádné články s určenou lokalitou.',
    'map.loading': 'Načítám mapu…',
    'search.title': 'Hledat',
    'search.placeholder': 'Hledejte projekty, čtvrti, témata…',
    'search.empty': 'Nic nenalezeno.',
    'search.hint': 'Pište pro vyhledávání',
    'footer.rights': 'Prague Insider. Architektonická přesnost v urbanistické žurnalistice.',
    'footer.feed': 'RSS',
    'notFound.title': 'Stránka nenalezena',
    'notFound.body': 'Tato adresa neexistuje. Zkuste hlavní stranu.',
    'notFound.home': 'Na hlavní stranu',
    'time.today': 'dnes',
    'time.yesterday': 'včera',
    'time.daysAgo': 'před {n} dny',
    'time.weeksAgo': 'před {n} týdny',
  },
  en: {
    'nav.search': 'Search',
    'nav.map': 'Maps',
    'nav.subscribe': 'Subscribe',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.skip': 'Skip to content',
    'lang.switch': 'Čeština',
    'lang.switchAria': 'Přepnout do češtiny',
    'home.lead': 'Lead story',
    'home.latest': 'Latest',
    'home.byDesk': 'By desk',
    'home.empty': 'No articles yet. The morning source scan has not run.',
    'article.related': 'Related Analysis',
    'article.location': 'Project Location',
    'article.sources': 'Sources',
    'article.sourcesNote':
      'This article was synthesised from the sources below. Check details against the originals.',
    'article.share': 'Share',
    'article.readMore': 'Read more',
    'article.tags': 'Topics',
    'article.published': 'Published',
    'article.updated': 'Updated',
    'article.notAvailable': 'This article is not available in English yet.',
    'ai.badge': 'AI-assisted reporting',
    'ai.disclosure':
      'Written by the Prague Insider editorial system with AI assistance, from the sources listed, and checked automatically before publication. Verify facts against the primary sources.',
    'ai.learnMore': 'How we work',
    'cta.eyebrow': 'Prague Insider Briefing',
    'cta.headline': 'Stay ahead of the skyline.',
    'cta.button': 'Subscribe',
    'category.eyebrow': 'Desk',
    'category.empty': 'Nothing published on this desk yet.',
    'map.title': 'Project map',
    'map.intro': 'Every geotagged story plotted across Prague.',
    'map.empty': 'No geotagged articles yet.',
    'map.loading': 'Loading map…',
    'search.title': 'Search',
    'search.placeholder': 'Search projects, districts, topics…',
    'search.empty': 'Nothing found.',
    'search.hint': 'Type to search',
    'footer.rights': 'Prague Insider. Architectural precision in urban journalism.',
    'footer.feed': 'RSS',
    'notFound.title': 'Page not found',
    'notFound.body': 'That address does not exist. Try the front page.',
    'notFound.home': 'Back to the front page',
    'time.today': 'today',
    'time.yesterday': 'yesterday',
    'time.daysAgo': '{n} days ago',
    'time.weeksAgo': '{n} weeks ago',
  },
}

/** t('en', 'time.daysAgo', {n: 3}) → "3 days ago". Missing keys fall back to the key itself. */
const t = (locale, key, vars) => {
  const table = STRINGS[locale] || STRINGS.cs
  let value = table[key] ?? STRINGS.cs[key] ?? key
  if (vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replace(`{${name}}`, String(replacement))
    }
  }
  return value
}

module.exports = { STRINGS, t }
