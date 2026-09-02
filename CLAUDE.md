# Prague Insider — working notes

Bilingual Gatsby publication about Prague's built environment. Articles are AI-written from named
Czech sources and committed as markdown. Read `README.md` for layout and commands.

## Non-negotiables

These are promises made publicly on `content/pages/editorial-standards/`. Breaking one is a
correctness bug, not a style choice.

- **Every article cites its sources.** `sources` is required in frontmatter, enforced by
  `scripts/validate-posts.mjs`. No exceptions, no "obvious" stories.
- **`aiGenerated: true` on every post.** The disclosure is not optional and is not configurable.
- **Only our own photographs — and, for the unbuilt, a labelled visualisation.** A cover is the
  generated plate from `src/lib/cover.js`, a photograph somebody on the desk took themselves, or a
  `kind: visualisation`. Never embed source *photography*, press handouts or stock, and never
  generate an AI photograph of a real place. The plate is the default and remains the fallback.
  A visualisation is the narrow exception for a story whose subject does not exist yet: it needs
  `credit` (the studio if the source names one, otherwise the body that released it) and `source`
  (the page it was published on), the gate refuses it without both, and the template stamps
  *Visualisation* on the image. It never stands in for a photograph of somewhere that exists —
  that is a place the desk can go. See `content/pages/editorial-standards/`, which says all of
  this publicly, and keep the two in step. The same applies to pictures inside the body, declared
  in `figures:` — see the Gotchas.
- **Both locales, composed separately.** Czech is not a translation of the English. Same facts,
  same figures, same sources; different prose.
- **Nothing is written that the sources do not say.** Analysis is fine and encouraged; invented
  figures, dates and quotations are not.

## Where things are decided

- **Routes** — `src/lib/paths.js`. Nothing else should build a URL by hand; the language switcher
  and hreflang both depend on cs/en staying symmetric.
- **Taxonomy** — `src/config/categories.js`. Five desks, keys never translated.
- **Design tokens** — `tailwind.config.js`, ported verbatim from `design/DESIGN.md`. Change the
  design system first. Shape language is sharp (0px radius) everywhere.
- **UI strings** — `src/i18n/ui.js`. Article bodies are the only translated prose outside it.
- **Cover photographs** — `scripts/attach-photo.mjs` and `.claude/skills/photo-desk/`. Capture is
  one tap on an iOS Shortcut that writes a jpg and a json sidecar into `iCloud Drive/PragueInsider/`
  (`docs/photo-shortcut.md`); `npm run photos` drains that into `photos/inbox/`, which is
  gitignored. Everything needing the archive open — which article, what the caption says — happens
  at the desk. Never hand-edit a `cover:` block: the script keeps the two locales' `photo` and
  `credit` identical and the gate checks it.
- **Where a story is** — `scripts/geocode.mjs` and the gazetteer it keeps in `data/places.json`.
  The map page plots `location` and nothing else, so a pin is not decoration: without one the
  article is missing from the map. The desk looks the place up rather than guessing, and the gate
  enforces the half of it that is checkable — `district` set without `location` is an error,
  because an article that can name its district has a site. A citywide story has neither.
  `data/places.json` is committed so the same place always lands on the same point.
- **What counts as a story** — `scripts/lib/relevance.mjs`. The `pragueByDefault` /
  `topicByDefault` flags on each adapter carry most of the filtering; prefer adjusting those over
  piling on keywords.

## Gotchas

- Frontmatter strings **must be double-quoted**. Czech headlines contain colons and unquoted
  `Krátká odpověď: nic` is invalid YAML that fails the build with an opaque parser error.
- `gatsby build` prints `ERROR UNKNOWN` from Node's `punycode` deprecation warning colliding with
  Gatsby's spinner. Exit code is 0 and the build is fine. Check the exit code, not the log.
- `src/config/*` and `src/lib/{paths,cover}.js` are CommonJS because `gatsby-node.js`,
  `gatsby-config.js`, the ESM scripts and React components all consume them. Keep them CommonJS.
- Leaflet touches `window` at import time, so `src/components/MapView.jsx` is dynamically imported
  after mount in `src/templates/map.jsx`. Do not hoist that import.
- OG cards are rasterised by sharp via librsvg, which cannot see our webfonts and falls back to
  generic families. That is a known, accepted trade to keep one cover implementation. Do not "fix"
  it by adding a second cover renderer.
- **Two rules the plate motifs are built on, both learned the hard way.** Apparent size in
  axonometric comes from *height*, not footprint — a flat plan looks like a smaller drawing beside
  a block city on the same plot, and the fix is more ground (`PLOT` in `cover.js`), never more
  storeys. And sampled randomness reads as uniform: each desk has one fixed seed, so there is no
  distribution to see, only one arrangement — variety that has to be there is constructed, not
  drawn. Heights are dealt across the range and shuffled; transit runs a fixed count of lines each
  way; trees come from two size classes.
- **Nominatim answers rather than admitting defeat.** Ask it for a place it does not have and it
  returns a partial match with nothing in the response to say so — "Západní Město" comes back as a
  street called Západní in Střešovice, twelve kilometres from Stodůlky. `geocode.mjs` checks every
  word of the name back and refuses to record a loose hit, but the geography it cannot check:
  "Ohrada" is a real place in Kunratice and a real tram stop in Žižkov. Read the candidate list.
  The same name can also be two places half a kilometre apart and be right both times —
  "Nákladové nádraží Žižkov" is the freight-yard site and the tram terminus that serves it, and
  the top hit is the yard. Pin the one the story is about.
- **The article locator is a real map, drawn without Leaflet.** `src/lib/staticmap.js` does the
  Web Mercator arithmetic and `LocationBox.jsx` renders the tiles as `<image>` in one `<svg>` with
  `preserveAspectRatio="slice"`, so it server-renders, needs no hydration and scales to whatever
  width the sidebar has. Same Esri basemap and same `{z}/{y}/{x}` trap as `MapView.jsx`. The
  mosaic's `VIEW` is cut to about the size it displays at on purpose: widen it and the tiles are
  downscaled until Esri's baked-in street labels stop being readable, which loses the only thing
  the panel is for. Look at the panel, not the markup.
- **Public funding is not a public-domain licence.** The argument that a visualisation was paid
  for from public money and is therefore free to republish is wrong under Czech law — the studio
  holds the rights even when the city commissioned it, and `úřední dílo` covers statutes and
  decisions, not renders. What actually makes these publishable is that they are *issued as press
  material for reporting, with credit*, which is a licence with a condition. That condition is why
  `credit` and `source` are gate-enforced rather than encouraged.
- **A render often carries its author's mark burned into a corner, and a centre crop eats it.**
  METROPROJEKT's watermark sits in the bottom-left of the Olbrachtova visualisation; cropping it
  to 16:9 from the middle removed the one thing the licence turns on. `attach-photo.mjs` takes
  `--gravity north|centre|south` for exactly this. Look at the bottom corners before cropping.
- **Desk plates are static files, not generated at build.** `scripts/make-covers.mjs` writes
  `static/covers/<desk>-<locale>-{card,hero,og}` and they are committed; `npm run covers`
  regenerates them, and only a change to `src/lib/cover.js` needs it. Every article on a desk
  shows the same plate, so `cover.variant` and `cover.seed` are gone and the gate rejects them.
  Only a photographed article gets a social card of its own, built in `onPostBuild`.
- Inline body images render with no new code — drop the file beside `index.<locale>.md` and write
  `![alt](./file.jpg)`; `content/posts` is a sourced filesystem and `gatsby-remark-images` is
  configured. But they are **not** exempt from the cover rules, and that was the door the cover
  contract did not watch: an uncredited third-party render could reach the page with every rule
  about `cover:` still green. So every body picture is declared in `figures:`
  (`file`, `credit`, and `kind`/`source` for a visualisation), the gate cross-checks the
  declarations against the `![](./…)` in the prose both ways, and it also requires the credit to
  appear **in the prose itself** — a credit a reader never sees is a record of one, not a credit.
- A photographed cover is always 16:9, whatever `format` the caller asks for. The plate is drawn
  to order at each format; a photograph can only be cropped, and cropping the same frame twice —
  16:9 for a card, 2:1 for a hero — throws away different parts of it in different places.
- `release.mjs` moves **every** file in a queued article's directory, not just the two markdown
  files. It used to copy the `.md`s and `rm -rf` the rest, which deleted a queued article's cover
  photograph on release day, silently, leaving the frontmatter pointing at nothing.
- `data/seen.json` is committed on purpose — it is the scan's memory across runs. Only
  `scripts/mark-covered.mjs` should write it during a daily run; marking everything the scan
  surfaced would bury stories that were merely deferred.
- **The daily cloud routine has three prerequisites, and each fails silently in its own way.**
  Diagnose with `RemoteTrigger action=get_run_log session_id=…` — never by inference.
  `claude.ai/code/session_*` is 403 to WebFetch, which is what makes these look unknowable.

  1. **The Claude GitHub App must be installed on this repo.** Without it the run clones, writes,
     validates and builds, then the push is rejected: *"Claude doesn't have GitHub access to
     etylsarin/pragueinsider.cz"* with a 403. Install at
     `https://github.com/apps/claude/installations/select_target`. The commit is stranded in an
     ephemeral container and lost — but nothing is lost permanently, because `data/seen.json` is
     only updated on a successful push, so the next run surfaces the same stories again.
  2. **The environment needs a network egress allowlist** covering `registry.npmjs.org`,
     `nominatim.openstreetmap.org` and every source host. It is a per-host allowlist, so
     `www.dpp.cz` and `dpp.cz` are different entries. Without npm the run cannot `npm ci`, so every
     script dies on import; without the source hosts the scan returns nothing. Both look exactly
     like a quiet news day. Without Nominatim the run still publishes — `geocode.mjs` falls back to
     the committed gazetteer — but every place not already in `data/places.json` goes unpinned.
  3. **`session_context.outcomes` declares the git write target**, alongside `sources` which grants
     the clone. Routines created through the claude.ai UI get it; ones created through the HTTP API
     do not.

  An earlier version of this note blamed (3) alone. That was wrong, and a run then repeated the
  wrong diagnosis back because it had read this file. Check the actual error text first.

## Before committing content

```bash
node scripts/validate-posts.mjs && npm run build
```

Both must pass. The same gate runs in CI and blocks the deploy.
