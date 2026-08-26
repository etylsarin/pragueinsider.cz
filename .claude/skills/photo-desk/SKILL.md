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
generated plate. Never source an image from a press release, a source article, a stock library or
an image generator — that is the promise on `content/pages/editorial-standards/`, and it is the
whole reason photography was allowed in at all.

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
and patches `cover:` in both locales. It preserves any existing `variant` — the plate stays
declared as the fallback.

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
