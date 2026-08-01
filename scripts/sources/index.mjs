import praguemorning from './praguemorning.mjs'
import archiweb from './archiweb.mjs'
import prahacamp from './prahacamp.mjs'
import iprpraha from './iprpraha.mjs'

/**
 * The scan's source registry. Adding a source is one adapter file plus one line here.
 *
 * An adapter exports { id, name, homepage, language, pragueByDefault, fetchItems(opts) }
 * and returns [{ url, title, summary, publishedAt, tags }]. Anything it cannot determine
 * should be null rather than guessed — the writer sees these values.
 */
export const SOURCES = [prahacamp, iprpraha, archiweb, praguemorning]

export const getSource = (id) => SOURCES.find((source) => source.id === id)
