---
name: photo-desk
description: Attach photographs waiting in photos/inbox to the articles they belong to — rank the candidates, write bilingual alt text and captions, validate and commit. Use when asked to file inbox photos, attach a photo to an article, or after a site visit.
---

# Prague Insider — the photo desk

Photographs arrive from the phone with no article attached to them, because the person taking them
was standing in a building and could not have picked one. Your job is the half that needs the
archive open: decide which story each picture belongs to, describe it in both languages, and file
it.

**A photograph on this site is first-party or it is nothing.** We shoot our own or we run the
generated plate. Never source a *photograph* from a press release, a source article, a stock
library or an image generator — that is the promise on `content/pages/editorial-standards/`, and
it is the whole reason photography was allowed in at all.

**The one exception is a visualisation of something that has not been built**, where there is
nothing at the site to photograph and the design is the story. It is a different kind of cover,
not a relaxation of the rule:

```bash
node scripts/attach-photo.mjs --photo <file> --slug <slug> \
  --kind visualisation \
  --credit "METROPROJEKT" \
  --source "https://www.dpp.cz/metro-d/fotogalerie/…" \
  --aspect 16:9 --gravity south \
  --alt-en … --alt-cs … --caption-en … --caption-cs …
```

- `--credit` is the studio when the source names one, otherwise the city, district or project that
  released it. **Never guess a studio** — a wrong credit fails the licence and misattributes
  somebody's work in the same stroke. If you cannot establish either, do not attach it.
- `--source` is the page it was published on, not a CDN path, so a reader can check it.
- **Look at the bottom corners before you crop.** Renders often carry the author's mark burned in,
  and a centre crop to 16:9 removes it. `--gravity south` keeps it.
- Only for the unbuilt. A render never substitutes for a photograph of a place that exists, and a
  press photograph of a real place is never publishable whatever it is labelled.

**A picture can also go inside the body**, which is the better place when it illustrates one
section rather than the whole article — a roundup of ten projects should not be fronted by one of
them. Drop the file beside `index.<locale>.md`, write `![alt](./file.jpg)` at the paragraph it
belongs to, and declare it:

```yaml
figures:
  - file: terminal-smichov.jpg
    credit: "A69 - architekti"
    kind: visualisation
    source: "https://praha.camp/praha-zitra/projekt/terminal-smichov"
```

The gate checks the declaration against the prose in both directions, and requires the credit to
appear in the prose too — so write a credit line under the image, in both languages, saying who
made it and that it is a design rather than a photograph.

---

## 1. Read the inbox

```bash
npm run photos
```

That first drains `iCloud Drive/PragueInsider/` into `photos/inbox/` — photographs reach this
machine through iCloud, not through git, so there is nothing to pull. Each waiting photo then
prints with its note, its coordinates, and up to five ranked candidate articles. The ranking is arithmetic — distance from each article's `location` and word overlap
with the note — so treat it as a shortlist, not a verdict.

## 2. Choose the article

A score above ~80 with both a distance and a note match is usually right. Below that, or where two
candidates are close, **open the article and read it** before deciding. Getting this wrong puts a
photograph of one building on the story about another, which is the single worst failure available
here: it looks like reporting and it is false.

If nothing fits, leave the photo in the inbox and say so. An unattached photograph costs nothing.

Prefer an article that does not already have a cover photo — the ranking already penalises those,
but if the new frame is genuinely better, replacing one is fine.

## 3. Write the alt text and the caption

Four strings, and they are not four translations of one string.

- **`alt`** — what is in the frame, for somebody who cannot see it. Concrete nouns and materials,
  not interpretation. *"Stacked pallets of reclaimed granite setts on a concrete floor under
  gallery lighting"*, not *"the circular economy on display"*. Both locales, 15 characters minimum,
  enforced by the gate.
- **`caption`** — one sentence of editorial: what this is and where. It runs under the picture.

Write the Czech for a Czech reader and the English for an English one, the way article bodies are
written. **Describe only what is actually in the frame.** You did not take the photograph and
cannot see beyond it — if the note does not say what a building is, do not name it.

## 4. File it

```bash
node scripts/attach-photo.mjs \
  --photo <inbox-file> \
  --slug <article-slug> \
  --alt-en "…" --alt-cs "…" \
  --caption-en "…" --caption-cs "…"
```

The script rotates, resizes to 2000px, strips the metadata, writes the file beside the markdown
and patches `cover:` in both locales. Removing a photograph later needs no counterpart edit — the
article falls back to its desk plate, which comes from `category`.

`--credit` defaults to the site owner. Pass it explicitly if somebody else took the picture, and
only if they have agreed to it being published.

## 5. Gate and commit

```bash
node scripts/validate-posts.mjs && npm run build
```

Both must pass. `gatsby build` prints `ERROR UNKNOWN` from a Node deprecation warning colliding
with Gatsby's spinner — check the exit code, not the log.

Commit the article change and the removed inbox files together, and say in the message which
story each photograph went to.

## What not to do

- Do not invent a caption for a photograph whose subject you are unsure of.
- Do not attach a photo to an article just because the inbox would then be empty.
- Do not edit `cover:` frontmatter by hand — the script keeps the two locales consistent and the
  gate checks that they are.
- Do not try to commit anything in `photos/inbox/`; it is gitignored on purpose. A photograph
  reaches git only by being filed into an article's own directory.
- If `npm run photos` shows fewer photos than expected, iCloud has not finished syncing. It says
  so explicitly — wait rather than concluding the inbox is empty.
