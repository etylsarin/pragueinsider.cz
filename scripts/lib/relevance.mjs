import { fold } from './text.mjs'

/**
 * Relevance filter for the morning scan.
 *
 * An item has to clear two independent bars: it must be about Prague, and it must be about the
 * built environment. Both can be satisfied by what a publication *is* rather than by keywords —
 * praha.camp publishes nothing but urbanism, archiweb nothing but architecture, and IPR is the
 * city's own planning institute. Only a general news source has to prove its case term by term,
 * which is where the strong/weak split and the veto list earn their keep.
 *
 * Terms are matched diacritic-folded, so "zizkov" finds "Žižkov" and "uzemni plan" finds
 * "územní plán". This is a first pass, not an editor: it decides what reaches the desk, not
 * what gets written.
 */

/** Weighted heavily — a hit here is what makes a national story ours. */
const PRAGUE_TERMS = [
  'praha', 'prahy', 'praze', 'prahou', 'prague', 'prazsk', 'hlavni mesto', 'metropole',
  'vltav', 'magistrat',
]

/** Districts and named places. A hit implies Prague without the word "Praha" appearing. */
const PRAGUE_PLACES = [
  'karlin', 'smichov', 'holesovic', 'vinohrad', 'zizkov', 'dejvic', 'vysocan', 'liben',
  'nusle', 'branik', 'modran', 'letnan', 'bubny', 'bubenec', 'strasnic', 'vrsovic', 'michle',
  'podoli', 'pankrac', 'chodov', 'prosek', 'kobylis', 'troja', 'stresovic', 'brevnov',
  'motol', 'zlicin', 'ruzyn', 'veleslavin', 'hostivar', 'malesic', 'vokovic', 'sedlec',
  'radlic', 'jinonic', 'stodulk', 'barrandov', 'hlubocep', 'kosire', 'nove mesto',
  'stare mesto', 'mala strana', 'hradcan', 'vysehrad', 'josefov', 'zbraslav', 'suchdol',
  'kunratic', 'libus', 'stvanic', 'rohan', 'masarykovo nadrazi', 'hlavni nadrazi',
  'smichovske nadrazi', 'nakladove nadrazi', 'florenc', 'vaclavske namesti', 'staromestsk',
  'malostransk', 'invalidovna', 'palmovka', 'cerny most', 'opatov', 'roztyly', 'budejovick',
  'dvorecky most', 'letna', 'petrin', 'kampa', 'cakovic', 'kbely', 'dablic', 'satalic',
  'reporyje', 'radotin', 'chuchle', 'lipenc', 'sterboholy', 'dubec', 'kolovraty',
  'vyton', 'zbraslav', 'hostivar', 'jarov', 'sporilov', 'krc', 'lhotka', 'kamyk',
  'cerny most', 'letnany', 'vinoklasy', 'hlubocepy', 'velka chuchle', 'trojsk',
]

/**
 * Unambiguously about the built environment. One of these is enough on its own.
 */
const URBANISM_STRONG = [
  'architekt', 'architektur', 'urbanis', 'uzemni plan', 'metropolitni plan', 'brownfield',
  'novostavb', 'developer', 'revitalizac', 'verejn prostor', 'verejneho prostoru', 'nabrezi',
  'tramvaj', 'metro ', 'metra', 'metru', 'nadrazi', 'cyklostezk', 'zastavb', 'demolic',
  'konverz', 'rezidenc', 'bytovy dum', 'bytove domy', 'pamatkov', 'architektonick',
  'stavebni povoleni', 'uzemni rizeni', 'developersk', 'vystavb', 'prestavb', 'rekonstrukc',
  'architecture', 'urban planning', 'public space', 'redevelopment', 'brownfield',
  'tram line', 'metro line', 'zoning', 'masterplan', 'heritage protection', 'streetscape',
]

/**
 * Ambiguous on their own — "project", "bridge", "station", "park" appear in stories about
 * anything. Three of these together still say something; one does not.
 */
const URBANISM_WEAK = [
  'stavb', 'projekt', 'plan', 'studie', 'navrh', 'soutez', 'atelier', 'investor', 'pozemk',
  'budov', 'ctvrt', 'radnice', 'zastupitel', 'namesti', 'park', 'zelen', 'strom', 'most',
  'tunel', 'silnic', 'okruh', 'doprav', 'mhd', 'dpp', 'ipr', 'zeleznic', 'vlak', 'autobus',
  'cyklo', 'pesi', 'bydlen', 'byty', 'kancelar', 'infrastruktur', 'terminal', 'transformac',
  'letiste', 'parkovan', 'sady', 'hriste', 'promenad', 'fasad', 'dum', 'reka',
  'construction', 'housing', 'transport', 'tram', 'railway', 'bridge', 'station', 'district',
  'planning', 'development', 'square', 'waterfront', 'renovation', 'building',
]

/**
 * Vetoes for general-news sources. These mark a story as belonging to another beat even when
 * an urbanism word happens to appear in it — a taxi scam "from Old Town to Main Station" is
 * not a transport story.
 */
const OFF_BEAT = [
  'taxi', 'turist', 'tourist', 'podvod', 'scam', 'policie', 'police', 'kriminal', 'crime',
  'zatcen', 'arrest', 'soud ', 'court', 'restaurac', 'restaurant', 'pivo', 'beer', 'pocasi',
  'weather', 'fotbal', 'football', 'hokej', 'hockey', 'koncert', 'concert', 'film', 'movie',
  'celebrit', 'fond', 'fund', 'akcie', 'stock', 'kryptomen', 'crypto', 'banka', 'banking',
  'investors', 'inflac', 'inflation', 'volby', 'election', 'covid', 'chripk', 'nemocnic',
  'hospital', 'skandal', 'scandal', 'krad', 'theft', 'drog', 'drug',
  // Airline commerce is not the built environment. Airport *infrastructure* still qualifies
  // through the strong terms, so runway and terminal works survive these vetoes.
  'airlines', 'aerolin', 'boeing', 'airbus', 'dreamliner', 'nizkonakladov', 'low-cost carrier',
  'letecka spolecnost', 'charterov',
]

/** Rough desk assignment, so the writer starts from a sensible category. */
const CATEGORY_HINTS = [
  ['transport', ['metro', 'tramvaj', 'tram', 'zeleznic', 'nadrazi', 'vlak', 'autobus', 'mhd', 'dpp', 'cyklo', 'cyklostezk', 'doprav', 'most', 'tunel', 'okruh', 'silnic', 'parkovan', 'terminal', 'railway', 'bridge', 'station', 'transport', 'letiste']],
  ['planning', ['uzemni plan', 'metropolitni plan', 'planovan', 'zastupitel', 'radnice', 'strategi', 'koncepc', 'ipr', 'projednan', 'zoning', 'planning', 'referendum', 'participac', 'masterplan']],
  ['public-space', ['verejn prostor', 'namesti', 'park', 'nabrezi', 'zelen', 'strom', 'hriste', 'pesi', 'public space', 'square', 'waterfront', 'sady', 'promenad']],
  ['development', ['developer', 'developersk', 'rezidenc', 'brownfield', 'vystavb', 'novostavb', 'investor', 'pozemk', 'kancelar', 'bydlen', 'byty', 'transformac', 'development', 'housing', 'redevelopment', 'bytovy dum']],
  ['architecture', ['architekt', 'architektur', 'atelier', 'soutez', 'pamatk', 'rekonstrukc', 'fasad', 'navrh', 'studie', 'architecture', 'heritage', 'competition', 'brutalis', 'funkcionalis']],
]

const countHits = (haystack, terms) => terms.filter((term) => haystack.includes(term))

/**
 * @param {{title?: string, summary?: string, tags?: string[]}} item
 * @param {{pragueByDefault?: boolean, topicByDefault?: boolean}} sourceMeta
 *   pragueByDefault — the outlet only covers Prague
 *   topicByDefault  — the outlet only covers the built environment
 */
export function scoreItem(item, sourceMeta = {}) {
  const headline = fold(item.title || '')
  const haystack = fold(
    [item.title, item.summary, (item.tags || []).join(' ')].filter(Boolean).join(' ')
  )

  const pragueMatches = countHits(haystack, PRAGUE_TERMS)
  const placeMatches = countHits(haystack, PRAGUE_PLACES)
  const strongMatches = countHits(haystack, URBANISM_STRONG)
  const weakMatches = countHits(haystack, URBANISM_WEAK)
  const offBeatMatches = countHits(haystack, OFF_BEAT)

  /**
   * For a national outlet, Prague has to be in the *headline*.
   *
   * "Praha" turns up incidentally all over a 600-character summary — in a dateline, a company
   * name ("Dopravní podnik hl. m. Prahy"), or a passing comparison — and treating any of those
   * as evidence let a bus tender in Vysočina and a Bavarian rail contract through. A story
   * genuinely about Prague says so in its headline.
   */
  const headlinePrague =
    countHits(headline, PRAGUE_TERMS).length > 0 || countHits(headline, PRAGUE_PLACES).length > 0
  const isPrague = Boolean(sourceMeta.pragueByDefault) || headlinePrague

  // A specialist outlet has already done this filtering for us; a general one has to prove it.
  const isUrban = sourceMeta.topicByDefault
    ? offBeatMatches.length === 0 || strongMatches.length > 0
    : offBeatMatches.length === 0 && (strongMatches.length >= 1 || weakMatches.length >= 3)

  // Diminishing returns: ten mentions of "stavba" is not ten times the signal.
  const score =
    (sourceMeta.pragueByDefault ? 3 : 0) +
    (sourceMeta.topicByDefault ? 3 : 0) +
    Math.min(pragueMatches.length, 3) * 3 +
    Math.min(placeMatches.length, 3) * 4 +
    Math.min(strongMatches.length, 4) * 3 +
    Math.min(weakMatches.length, 4) * 1 -
    offBeatMatches.length * 4

  return {
    relevant: isPrague && isUrban,
    score: Math.max(0, score),
    matched: {
      prague: pragueMatches,
      places: placeMatches,
      strong: strongMatches,
      weak: weakMatches,
      offBeat: offBeatMatches,
    },
    suggestedCategory: suggestCategory(haystack),
  }
}

export function suggestCategory(foldedText) {
  let best = null
  let bestHits = 0
  for (const [key, terms] of CATEGORY_HINTS) {
    const hits = countHits(foldedText, terms).length
    if (hits > bestHits) {
      bestHits = hits
      best = key
    }
  }
  return best || 'development'
}

export const TERMS = { PRAGUE_TERMS, PRAGUE_PLACES, URBANISM_STRONG, URBANISM_WEAK, OFF_BEAT }
