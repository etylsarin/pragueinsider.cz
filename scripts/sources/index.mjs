import prahacamp from './prahacamp.mjs'
import iprpraha from './iprpraha.mjs'
import dpp from './dpp.mjs'
import archiweb from './archiweb.mjs'
import zdopravy from './zdopravy.mjs'
import ct24praha from './ct24praha.mjs'
import praguemorning from './praguemorning.mjs'
import expats from './expats.mjs'

/**
 * The scan's source registry. Adding a source is one adapter file plus one line here.
 *
 * An adapter exports { id, name, homepage, language, pragueByDefault, topicByDefault,
 * fetchItems(opts) } and returns [{ url, title, summary, publishedAt, tags }]. Anything it
 * cannot determine should be null rather than guessed — the desk sees these values.
 *
 * The two *ByDefault flags do most of the filtering work, so set them honestly:
 *   pragueByDefault — the outlet covers only Prague
 *   topicByDefault  — the outlet covers only the built environment
 * An outlet that is neither has to prove every item against the keyword lists in
 * scripts/lib/relevance.mjs, which is what keeps general news from leaking in.
 *
 * Ordered roughly by signal density, so the digest's own ordering is a sensible tiebreak.
 */
export const SOURCES = [
  prahacamp, // CAMP magazine — Prague urbanism, long form
  iprpraha, // city planning institute — primary source
  dpp, // city transit operator — primary source
  archiweb, // Czech architecture news, national
  zdopravy, // transport trade press, national
  ct24praha, // public broadcaster, Prague region
  praguemorning, // English-language Prague news
  expats, // English-language Czech news
]

export const getSource = (id) => SOURCES.find((source) => source.id === id)
