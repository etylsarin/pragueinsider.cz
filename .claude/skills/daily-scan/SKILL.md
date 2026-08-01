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
```

This fetches every registered source, drops what is not Prague or not about the built environment,
drops what has already been covered, and writes `.cache/digest.json`. Read that file.

If a source reports an error, note it in your final summary but carry on — the others are
independent. If a source errors **two days running**, say so prominently: it usually means the site
changed its markup and the adapter in `scripts/sources/` needs updating.

## 2. Choose what to write

Read the clusters. Pick **2 to 4** stories. Fewer is fine. Zero is fine on a quiet day.

Choose for news value, not for score — the score ranks relevance, not importance:

- **Prefer** decisions, milestones, money, openings, competition results, plan approvals, things
  that change what gets built or how people move.
- **Prefer** a cluster with `sourceCount > 1`. Two outlets on one story means you can cross-check.
- **Skip** institutional housekeeping (office closures, opening hours, staff notices) even when it
  scores well. The filter cannot tell these from news; you can.
- **Skip** pure press releases where the only source is the developer promoting itself, unless the
  project is significant enough that the announcement is itself the news. If you use one, say in
  the article that the source is the developer.
- **Skip** anything you cannot source properly in step 3.

Never write two articles from one cluster. One story is one article.

## 3. Read the originals

For each chosen story, **WebFetch every URL in the cluster.** Write from the article, never from
the digest title or an RSS summary — those are one line of context, not reporting.

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
featured: false                       # at most one post per day, for a genuine lead story
cover:
  variant: grid                       # grid | strata | plan | transit — optional, omit to hash the slug
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

```bash
git add content/posts data/seen.json
git commit -m "posts: <n> stories for YYYY-MM-DD"
git push
```

Then report to the user: what you published (with slugs), what you deliberately skipped and why,
any source that errored, and anything that looked like it needed a human.

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

Only three sources are Prague-and-topic specialists (`praha.camp`, `iprpraha`, `archiweb`);
`praguemorning` is general news and is filtered hard, so zero items from it is normal, not a fault.
