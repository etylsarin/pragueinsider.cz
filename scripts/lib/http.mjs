/**
 * Polite HTTP for the source scan.
 *
 * Every request identifies the bot and links to the page explaining what it does, so any
 * publisher who wants us gone can find us in their logs and say so. See
 * content/pages/editorial-standards.
 */

const USER_AGENT =
  'PragueInsiderBot/1.0 (+https://www.pragueinsider.cz/en/editorial-standards/; editor@pragueinsider.cz)'

const DEFAULT_TIMEOUT = 20000
const DEFAULT_RETRIES = 2

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchText(url, options = {}) {
  const { timeout = DEFAULT_TIMEOUT, retries = DEFAULT_RETRIES, accept = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' } = options

  let lastError
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        redirect: 'follow',
        headers: {
          'User-Agent': USER_AGENT,
          Accept: accept,
          'Accept-Language': 'cs,en;q=0.8',
        },
      })
      if (!response.ok) {
        // 4xx other than 429 will not improve on retry.
        if (response.status < 500 && response.status !== 429) {
          throw new Error(`HTTP ${response.status}`)
        }
        throw Object.assign(new Error(`HTTP ${response.status}`), { retryable: true })
      }
      return await response.text()
    } catch (error) {
      lastError = error
      const retryable = error.retryable || error.name === 'AbortError' || error.name === 'TypeError'
      if (attempt === retries || !retryable) break
      await sleep(600 * (attempt + 1))
    } finally {
      clearTimeout(timer)
    }
  }
  throw lastError
}

export { USER_AGENT }
