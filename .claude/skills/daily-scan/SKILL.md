---
name: daily-scan
description: Run the Prague Insider morning desk — scan the Czech urbanism sources, pick the strongest new stories, write them up in Czech and English, validate, and commit. Use when asked to run the daily scan, publish today's posts, or check what the sources are carrying.
---

# Prague Insider — the morning desk

You are running the editorial desk of a bilingual publication about Prague's built environment.
Your output is markdown committed to this repo; a GitHub Action builds and deploys it.

Work through the steps in order. **Do not skip step 6.** If anything blocks you, stop and report
rather than committing something half-finished — an empty day is fine, a broken or unsourced
article is not.

---

## 1. Scan the sources

```bash
node scripts/ingest.mjs --days 21
node scripts/digest-summary.mjs --write
```

The first command fetches every registered source, drops what is not Prague or not about the built
environment, drops what has already been covered, and writes `data/digest.json`. Read that file.

The second prints the per-source counts and writes them to `data/last-run.md`. You will finish that
file in step 7 and commit it **on every run, including quiet ones** — it is the only record of what
the desk saw and decided, so never skip it.

If a source reports an error, note it in your final summary but carry on — the others are
independent. If a source errors **two days running**, say so prominently: it usually means the site
changed its markup and the adapter in `scripts/sources/` needs updating.

## 2. Choose what to write

Read the clusters. **If the digest has candidates, expect to publish.** Pick 2 to 4 stories; one is
fine on a thin day. Publish nothing only when the digest is empty, or when every candidate fails the
test below — not merely because nothing feels momentous.

Choose for news value, not for score — the score ranks relevance, not importance:

- **Prefer** decisions, milestones, money, openings, competition results, plan approvals, closures
  and works that change what gets built or how people move.
- **Prefer** a cluster with `sourceCount > 1`. Two outlets on one story means you can cross-check.
- **Skip** anything you cannot source properly in step 3.

### Press offices: what they are doing vs. what they are saying about themselves

Two sources — DPP and IPR — are institutional press offices, and they are among our best sources
precisely because they announce things first. Do not discount them as a class. The line is:

| Publish | Skip |
|---|---|
| What the institution is doing **to the city** — a metro station design competition, a tram track closure, a fleet tender, a plan milestone, a construction start | What the institution is saying **about itself** — awards, ISO audits, office relocations, opening hours, staff notices, depot beekeeping |

A press release is a primary source, not a disqualification. Where the announcement is the news,
write it and attribute it plainly ("DPP says…"). Where a developer is promoting its own building,
you may still cover it if the project matters, but say in the article that the source is the
developer.

Never write two articles from one cluster. One story is one article.

## 3. Read the originals

For each chosen story, **WebFetch every URL in the cluster.** Write from the article, never from
the digest title or an RSS summary — those are one line of context, not reporting.

`zdopravy.cz` returns HTTP 403 to WebFetch — it refuses the fetcher's user-agent. The feed reads
fine, so this is not a scan failure, and it is not a reason to drop a Zdopravy story. Fetch it with
a browser user-agent instead:

```bash
curl -sSL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" "<url>"
```

When a cluster has several sources:

- Take facts attested by more than one as solid.
- Where they differ on a figure or date, either report the disagreement and attribute each figure,
  or leave it out. Never split the difference or pick the one you like.
- Where only one source carries a claim, attribute it to that outlet by name in the text.

If a fetch fails or the page turns out to be thin, drop the story. Do not pad.

## 4. Write both languages

For each story create `content/posts/YYYY-MM-DD-<slug>/` using **today's date** and an ASCII slug
derived from the English headline. Both files go in that directory:

```
content/posts/2026-08-14-vltava-philharmonic-permit/
  index.en.md
  index.cs.md
```

### Frontmatter contract

Every key below is checked by `scripts/validate-posts.mjs`.

```yaml
---
slug: vltava-philharmonic-permit      # must equal the directory slug, both files
lang: en                              # must equal the filename locale
title: "Headline in this language"    # always double-quoted — Czech headlines contain colons
dek: "One or two sentences of standfirst."
date: 2026-08-14                      # must equal the directory date prefix, both files
category: architecture                # development | transport | public-space | planning | architecture
tags: ["Vltava Philharmonic", "Bubny-Zátory"]
district: "Praha 7 – Holešovice"      # optional, omit if the story has no single location
location:                             # optional, omit unless you know the coordinates
  lat: 50.1024
  lng: 14.4383
author: "Prague Insider Desk"
aiGenerated: true                     # never false — the disclosure is not optional
featured: false                       # at most ONE post per day, for a genuine lead story.
                                      # It pins the homepage lead only among that day's posts,
                                      # so you never need to unset yesterday's.
cover:
  variant: transit                    # arcade | transit | canopy | parcels | massing — optional;
                                      # omit it and the desk's category picks the motif, which is
                                      # nearly always what you want
sources:                              # at least one; identical URLs in both languages
  - title: "Original headline"
    url: "https://..."
    publisher: "praha.camp (CAMP)"
    date: 2026-08-12
---
```

Rules the validator enforces, so get them right first time:

- Both locales must exist, with the **same** `category`, `date` and `sources`.
- Body must be at least 800 characters and contain no `TODO`, `TKTK`, `XXX` or `[insert`.
- Start sections at `##` — the template renders the title, so the body has no `#`.
- `location` must fall inside Prague. Omit it rather than guessing coordinates.
- Slugs must be unique across the whole archive and must not collide with a category or page
  slug (`doprava`, `about`, `mapa`, …).

### How to write

Both versions are **composed separately for their own readers**. The Czech is not a translation of
the English and must not read like one — different idiom, different framing, same facts, same
figures, same sources. Write the Czech as a Czech editor would.

- 400–800 words. Lead with what happened and why it matters, not with background.
- Use the specifics: figures, dates, firm names, districts, distances, budgets. They are what
  distinguishes this from a summary.
- Never introduce a fact, figure, date or quotation that is not in the sources. If you want to
  supply context the sources do not give, either leave it out or mark it plainly as context.
- Quotes must be verbatim from the source, attributed to the speaker by name and role. Use
  markdown `>` blockquotes with the attribution on its own line after a blank `>`.
- Analysis is welcome; invention is not. "This is the largest such scheme in the city" needs a
  source. "Read together, these two chapters look like one problem" is your reading, and is fine.
- No hype, no adjective stacking, no "iconic", no "game-changing". The design is authoritative and
  the prose should match it.

Look at an existing post in `content/posts/` for tone before writing your first one.

## 5. Reconcile the seen index

```bash
node scripts/mark-covered.mjs
```

This marks every source URL you cited as covered, so tomorrow's scan skips it. Stories you looked
at but did not write stay in the digest until they age out — that is intended, do not mark them.

## 6. Validate and build — both must pass

```bash
node scripts/validate-posts.mjs && npm run build
```

If validation fails, fix the frontmatter and run again. If the build fails, fix it. **Do not commit
until both are green.** These two commands are the entire safety net between you and a live site.

## 7. Commit

Committing is the last thing the desk does, and it is what triggers publication —
`.github/workflows/deploy.yml` fires on push to master, re-runs the validation gate, builds, and
deploys to Pages. Nothing else needs to happen for the story to go live.

First finish the run log. Replace the `_(the desk fills this in)_` placeholder in
`data/last-run.md` with what you decided — one line per candidate you published and one per
candidate you skipped, each with a short reason. Be specific: "skipped, corporate self-promotion"
is useful; "not newsworthy" is not.

```bash
git add content/posts data/seen.json data/last-run.md
git commit -m "posts: <n> stories for YYYY-MM-DD"   # or "scan: no stories for YYYY-MM-DD"
git push
```

**Commit even when you published nothing.** A quiet day still commits the log. A run that leaves no
commit at all is indistinguishable from a run that never happened, and that has cost real debugging
time before.

Then report to the user: what you published (with slugs), what you deliberately skipped and why,
any source that errored, the exact `git push` output, and anything that looked like it needed a
human.

---

## Guard rails

- **Maximum 4 posts per day.** If the sources deliver more, take the best four.
- **Never overwrite an existing post directory.** If the slug exists, the story is already covered
   — pick another or add a distinguishing word to the slug.
- **Never commit with validation or build failing.**
- **Never edit `content/pages/`** as part of a daily run. Those are standing editorial pages.
- **Never relax the sources requirement.** An article that cannot cite its origins does not get
  published, however good the story is.
- **Never publish a photograph.** Covers are generated from `src/lib/cover.js`; that is deliberate
  and is explained on the Editorial Standards page.
- If you are unsure whether something is publishable, do not publish it and say why in your report.

## When a source adapter breaks

Sites change their markup and the scrapers will rot. If `scripts/ingest.mjs` reports an error or a
source that used to return items returns zero:

1. Fetch the listing URL from the adapter in `scripts/sources/` and look at the current markup.
2. Fix the selector. Each adapter documents the structure it expects in its header comment.
3. Re-run the scan and confirm items come back.
4. Commit the adapter fix separately from the day's posts.

Zero items from a source is often correct rather than broken. `praguemorning`, `expats` and
`ct24praha` are general news outlets filtered hard against the Prague + built-environment test, and
`zdopravy` and `archiweb` are national, so quiet days from any of them are normal. Treat a source as
broken when it returns zero *and* its listing URL clearly still has relevant stories on it.

`prahacamp`, `iprpraha` and `dpp` are the three that should rarely be empty for long.
