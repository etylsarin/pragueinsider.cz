import prahacamp from './prahacamp.mjs'
import zastarouprahu from './zastarouprahu.mjs'
import pid from './pid.mjs'
import districts from './districts.mjs'
import praguecitytourism from './praguecitytourism.mjs'
import iprpraha from './iprpraha.mjs'
import dpp from './dpp.mjs'
import archiweb from './archiweb.mjs'
import zdopravy from './zdopravy.mjs'
import ct24praha from './ct24praha.mjs'
import praguemorning from './praguemorning.mjs'
import expats from './expats.mjs'
import irozhlas from './irozhlas.mjs'

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
  pid, // transit authority — network design, not operations
  zastarouprahu, // heritage watchdog — the one source that argues against things
  archiweb, // Czech architecture news, national
  zdopravy, // transport trade press, national
  ct24praha, // public broadcaster, Prague region
  irozhlas, // public broadcaster, national — read through its news sitemap
  praguemorning, // English-language Prague news
  expats, // English-language Czech news
  districts, // the městské části — where a scheme first becomes concrete
  praguecitytourism, // tourism board — the historic centre's public realm
]

export const getSource = (id) => SOURCES.find((source) => source.id === id)
