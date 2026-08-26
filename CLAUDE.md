# Prague Insider — working notes

Bilingual Gatsby publication about Prague's built environment. Articles are AI-written from named
Czech sources and committed as markdown. Read `README.md` for layout and commands.

## Non-negotiables

These are promises made publicly on `content/pages/editorial-standards/`. Breaking one is a
correctness bug, not a style choice.

- **Every article cites its sources.** `sources` is required in frontmatter, enforced by
  `scripts/validate-posts.mjs`. No exceptions, no "obvious" stories.
- **`aiGenerated: true` on every post.** The disclosure is not optional and is not configurable.
- **Only our own photographs.** A cover is either the generated plate from `src/lib/cover.js` or a
  photograph somebody on the desk took themselves — credited, dated and described in both
  languages. There is no third kind. Never embed source photography, press handouts or stock, and
  never generate an AI photograph of a real place. The plate is the default and remains the
  fallback for every article without a first-party frame.
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
- Inline body images already work with no new code: drop the file beside `index.<locale>.md` and
  write `![alt](./file.jpg)`. `content/posts` is a sourced filesystem and `gatsby-remark-images`
  is configured. Only the **cover** needs `cover.photo` in frontmatter.
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
  2. **The environment needs a network egress allowlist** covering `registry.npmjs.org` and every
     source host. It is a per-host allowlist, so `www.dpp.cz` and `dpp.cz` are different entries.
     Without npm the run cannot `npm ci`, so every script dies on import; without the source hosts
     the scan returns nothing. Both look exactly like a quiet news day.
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
