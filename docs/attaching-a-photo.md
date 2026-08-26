# Attaching a photograph to an article

Step by step, for a photograph that already exists — one you shot through the Shortcut, or any
file already sitting on the Mac.

Nothing here guesses. You name the article; the script does the mechanical work.

---

## 1. Get the photo where the script can see it

**From the phone**, if you used the Shortcut:

```bash
npm run photos
```

It moves everything out of `iCloud Drive/Shortcuts/PragueInsider/` into `photos/inbox/` and prints
each waiting photo with a shortlist of articles. Note the filename — something like
`2026-08-26-163615.jpeg`.

**From anywhere else** — Downloads, Desktop, AirDrop, a camera card — skip this step entirely. The
script takes any path, and **leaves the original where it is**. Only files it took out of
`photos/inbox/` get cleared.

No preparation needed either way. Rotating, resizing and stripping the metadata all happen in
step 4; hand a 12 MP original straight over.

## 2. Choose the article

The `--slug` is the article's directory name with the date prefix removed:

```
content/posts/2026-08-25-park-maniny-rohansky-ostrov/   →   park-maniny-rohansky-ostrov
```

```bash
ls content/posts content/queue
```

Queued articles work too, so you can shoot something before its story is released — the photograph
moves with it.

**This is the one decision that matters.** A photograph of the wrong building looks like reporting
and is false. The shortlist from `npm run photos` is advice; it never acts on itself.

## 3. Write the four strings

Two languages each, composed for their own reader rather than translated — the same rule as
article bodies.

- **`alt`** — what is in the frame, for someone who cannot see it. Concrete nouns and materials.
  *"Stacked pallets of reclaimed granite setts on a concrete floor under gallery lighting"*, not
  *"the circular economy on display"*. **Required, 15 characters minimum, enforced.**
- **`caption`** — one sentence of editorial: what this is and where. Runs under the picture.
  Optional; you get a warning and the photo runs bare.

Describe only what is actually in the frame. Naming a building the photograph does not identify is
the same failure as inventing a figure.

## 4. Run it

```bash
node scripts/attach-photo.mjs \
  --photo 2026-08-26-163615.jpeg \
  --slug park-maniny-rohansky-ostrov \
  --alt-en "Excavators on the raised embankment above the Vltava at Rohanský ostrov" \
  --alt-cs "Bagry na navýšeném náspu nad Vltavou na Rohanském ostrově" \
  --caption-en "Earthworks at Rohanský ostrov, August." \
  --caption-cs "Zemní práce na Rohanském ostrově, srpen." \
  --shot 2026-08-20
```

| Flag | |
|---|---|
| `--photo` | inbox filename, or any path on disk. Required |
| `--slug` | the article. Required |
| `--alt-en` / `--alt-cs` | required, 15+ characters |
| `--caption-en` / `--caption-cs` | optional |
| `--credit` | defaults to the site owner. Pass it if someone else took the picture — and only with their agreement |
| `--shot` | `YYYY-MM-DD`. Taken from the sidecar for inbox photos; pass it for files from elsewhere |
| `--name` | output filename, default `cover.jpg` |
| `--keep` | leave the inbox copy in place |
| `--dry-run` | report what would happen, write nothing |

It rotates by the EXIF orientation, resizes to 2000px wide, strips all metadata, writes the file
beside the markdown, and patches `cover:` in both locales — preserving any existing `variant`,
which stays as the fallback if the photograph is ever pulled.

## 5. Check it

```bash
node scripts/validate-posts.mjs && npm run build
```

Both must pass. `gatsby build` prints `ERROR UNKNOWN` from a Node deprecation warning colliding
with Gatsby's spinner — check the exit code, not the log.

`npm run develop` and open the article if you want to see it before committing. The photograph
replaces the generated plate on the article page, on cards in the feeds, and on the social card.

## 6. Commit

The photo and both markdown files together. `photos/inbox/` is gitignored, so there is nothing to
clean up there.

---

## Replacing, removing, and more than one

**Replacing** — run step 4 again with a new `--photo`. The default `--name cover.jpg` means the
old file is overwritten and no orphan is left behind.

⚠️ **Re-attaching rebuilds the whole `cover:` block from the flags you pass.** Anything you omit
the second time is dropped, silently — attach again without `--caption-en` and the caption is gone.
Pass the full set every time.

**Removing** — if it is not yet committed, `git checkout -- content/posts/<dir>/` and delete
`cover.jpg`. If it is, delete `cover.jpg` and remove the `photo`, `alt`, `caption`, `credit` and
`shot` lines from both `index.*.md`, leaving `variant`. The article falls back to the generated
plate. The gate will catch it if you remove the file and forget the frontmatter, or the reverse.

**More than one photograph** — an article has one *cover*. Passing `--name atrium.jpg` files the
image under that name but also repoints `cover:` at it, replacing the first. Extra photographs in
the body do not need this script at all: drop the file beside `index.<locale>.md` and write
`![alt](./atrium.jpg)` in the prose. `gatsby-remark-images` handles it.

## What the gate rejects

| Message | Fix |
|---|---|
| `cover.alt is required on a photographed cover` | pass `--alt-en` and `--alt-cs` |
| `cover.alt is N chars — too short` | 15 characters minimum; describe the frame |
| `cover.credit is required` | `--credit`, or let it default |
| `cover.photo "…" is not in content/posts/…` | the file was deleted but the frontmatter still names it |
| `cover.photo differs between locales` | the two `index.*.md` were edited by hand and disagree |
| `cover.photo is N KB — over 900 KB` | a warning, not an error — run it back through the script |
