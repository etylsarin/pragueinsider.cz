# Prague Insider

A bilingual (Czech/English) publication about architecture, development, public space, transport and
planning in Prague. Articles are written each morning by an AI editorial desk from named Czech
sources, stored as markdown in this repo, and deployed to
[www.pragueinsider.cz](https://www.pragueinsider.cz) by GitHub Actions.

How that process works, and what it does and does not promise, is documented publicly at
[/editorialni-standardy/](https://www.pragueinsider.cz/editorialni-standardy/) — that page is the
contract, not marketing.

## Quick start

```bash
npm install
npm run develop        # http://localhost:8000
npm run build          # static site into public/
```

## The daily cycle

```bash
npm run ingest         # scan sources → data/digest.json
# ...the desk reads the digest, fetches originals, writes markdown...
node scripts/mark-covered.mjs   # record what was cited, so tomorrow's scan skips it
node scripts/release.mjs        # move up to 3 queued articles into content/posts
npm run validate       # publication gate
npm run build          # must pass before committing
```

**Writing and publishing are separate.** The desk writes every story that clears the editorial bar
into `content/queue/`; `release.mjs` moves the oldest three a day into `content/posts/` and stamps
the date. A six-story Monday is banked rather than discarded — which matters because
`mark-covered.mjs` records a story's sources as covered whether or not it was written, so anything
skipped is skipped for good.

The desk step is driven by [`.claude/skills/daily-scan/SKILL.md`](.claude/skills/daily-scan/SKILL.md),
so a scheduled cloud agent and a local `/daily-scan` run identical instructions.

### Scanning by hand

```bash
node scripts/ingest.mjs --days 21              # default window
node scripts/ingest.mjs --all                  # ignore the seen index, show everything
node scripts/ingest.mjs --source archiweb      # one adapter, for debugging
node scripts/ingest.mjs --print                # dump the digest to stdout
```

## Layout

```
content/queue/<slug>/index.{cs,en}.md            written, awaiting release
content/posts/YYYY-MM-DD-slug/index.{cs,en}.md   published — both locales required
content/posts/YYYY-MM-DD-slug/cover.jpg          a cover photograph, if the story has one
content/pages/<key>/index.{cs,en}.md             standing editorial pages
photos/inbox/                                    staging, local only — gitignored
data/seen.json                                   what has already been covered (committed)
scripts/sources/*.mjs                            one adapter per source
scripts/lib/relevance.mjs                        the Prague + built-environment filter
scripts/validate-posts.mjs                       publication gate
scripts/attach-photo.mjs                         files an inbox photo onto an article
scripts/make-shortcut.mjs                        emits docs/photo-upload.shortcut
src/lib/cover.js                                 generated cover art (page + OG, one implementation)
src/config/{site,categories,pages}.js            single source of truth for routes and taxonomy
src/lib/paths.js                                 every URL on the site is built here
tailwind.config.js                               design tokens, ported from design/DESIGN.md
```

Czech is the default locale and is unprefixed; English lives under `/en/`. Both locales share one
ASCII slug per article, so `cs`↔`en` pairing is a prefix swap and hreflang cannot drift.

## Sources

Twelve adapters, each written against the site's real markup:

| Source | Method | Prague-only | Built-environment-only |
|---|---|:---:|:---:|
| praha.camp (CAMP) | listing scrape (`/magazin`) | ✓ | ✓ |
| IPR Praha | listing scrape (`/aktuality`) | ✓ | ✓ |
| Dopravní podnik (DPP) | listing scrape (press releases) | ✓ | ✓ |
| archiweb.cz | listing scrape (`/n`) — **no RSS**, `/rss` and `/en/rss` both 404 | | ✓ |
| Zdopravy.cz | RSS | | ✓ |
| ČT24 — Praha | listing scrape (region section) | | |
| Prague Morning | RSS | ✓ | |
| Expats.cz | RSS | | |
| Klub Za starou Prahu | listing scrape (`/menu-leve/aktuality/`) | ✓ | ✓ |
| PID / ROPID | RSS | | ✓ |
| Městské části (Praha 1, 5, 7, 8, 10) | RSS, one adapter | ✓ | |
| Prague City Tourism | RSS | ✓ | |

The two flag columns are `pragueByDefault` / `topicByDefault`, and they carry most of the
filtering: a specialist outlet is trusted on its beat, a general one has to prove every story
against the keyword lists.

For a national outlet, the Prague evidence must be in the **headline** — "Praha" turns up
incidentally in datelines, company names (`Dopravní podnik hl. m. Prahy`) and passing comparisons,
and treating those as evidence let a Vysočina bus tender and a Bavarian rail contract through.

**Every source host must be on the routine environment's network egress allowlist** — it is
per-host, so `www.dpp.cz` and `dpp.cz` are separate entries. A blocked host makes the scan return
nothing, which is indistinguishable from a quiet news day.

Klub Za starou Prahu is a campaigning heritage society, not a news outlet, and is included
deliberately: it is the only source that ever argues a project is a bad idea. Its positions are
attributed to it by name.

Deferred: **Správa železnic** would be a valuable primary source for the airport line and Masarykovo
nádraží, but its press page is a Liferay portal that server-renders only navigation — the releases
arrive via JS, so there is nothing to scrape without a headless browser.

The ČT24 Prague section is where the reporting behind the regional TV bulletin — long broadcast as
*Z metropole*, now *Události v regionech – Praha* — is written up. The `edu.ceskatelevize.cz` page
under the old title is a historical archive (Havel, the Prague uprising), not current news.

## Adding a source

Create `scripts/sources/<id>.mjs` exporting:

```js
export default {
  id, name, homepage, language,
  pragueByDefault,   // the outlet only covers Prague
  topicByDefault,    // the outlet only covers the built environment
  async fetchItems({ limit }) {
    return [{ url, title, summary, publishedAt, tags }]
  },
}
```

Register it in `scripts/sources/index.mjs`. Return `null` for anything you cannot determine rather
than guessing — those values are shown to the desk.

The two `*ByDefault` flags carry most of the filtering: a specialist outlet is trusted on topic, a
general news source has to prove each story against the keyword lists in `scripts/lib/relevance.mjs`.

## Deployment

Push to `master` → `.github/workflows/deploy.yml` validates content, builds, and deploys to GitHub
Pages. `static/CNAME` carries the custom domain.

**Repository setting required:** Settings → Pages → Source must be **GitHub Actions**, not
"Deploy from a branch".

## Design

`design/DESIGN.md` holds the "Urban Authority" design system and `design/code.html` a reference
article page. `tailwind.config.js` is ported from it verbatim — change the design system first,
not the Tailwind config. Shape language is sharp: no rounded corners anywhere.

`src/lib/cover.js` produces one SVG consumed twice — inlined on the page (abstract: pattern, desk
chip, wordmark) and rasterised to a 1200×630 OG card (which adds the headline, because it travels
alone into social feeds).

## Photographs

A cover is the generated plate or a photograph the desk took itself. Nothing else: no press
handouts, no photography from the outlets we read, no stock, no generated imagery of real places.
That is the promise on the Editorial Standards page and the gate enforces the mechanical half of
it — a photographed cover without alt text in both languages and a named credit does not publish.

Capture is deliberately stupid, because the decisions cannot be made where the photograph is
taken. An iOS Shortcut (`docs/photo-shortcut.md`) opens the camera, takes the location from
CoreLocation, converts and resizes on-device, and writes the picture plus a one-line note into
`iCloud Drive/PragueInsider/`. It picks no article, writes no caption and holds no credentials —
the Mac is where photographs get attached, and iCloud Drive is already there.

```bash
npm run photos     # drain iCloud Drive into photos/inbox, then rank each against the archive
```

Each photo prints with its note, its coordinates and up to five candidate articles, scored on
distance from each article's `location` and on word overlap with the note. The desk — `/photo-desk`
— reads that, picks the story, writes the alt text and caption in Czech and English, and files it:

```bash
node scripts/attach-photo.mjs --photo <file> --slug <slug> \
  --alt-en "…" --alt-cs "…" --caption-en "…" --caption-cs "…"
```

That rotates, resizes to 2000px, strips the metadata, writes the file beside the markdown and
patches `cover:` in both locales, keeping any `variant` as the fallback. Inline body images need
none of this — drop the file beside `index.<locale>.md` and write `![alt](./file.jpg)`.

Step by step, including replacing and removing one: [`docs/attaching-a-photo.md`](docs/attaching-a-photo.md).
