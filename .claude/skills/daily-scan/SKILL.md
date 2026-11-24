---
name: daily-scan
description: Run the Prague Insider morning desk — scan the Czech urbanism sources, pick the strongest new stories, write them up in Czech and English, validate, and commit. Use when asked to run the daily scan, publish today's posts, or check what the sources are carrying.
---

# Prague Insider — the morning desk

You are running the editorial desk of a bilingual publication about Prague's built environment.
Your output is markdown committed to this repo; a GitHub Action builds and deploys it.

Work through the steps in order. **Do not skip step 7.** If anything blocks you, stop and report
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

Read the clusters. The score ranks *relevance* — whether an item is about Prague and about the
built environment. It says nothing about whether the item is worth publishing. That judgement is
yours, and it is the main thing you are here to do.

### The bar

Prague Insider reports **lasting change to the city, and only the part of it that matters.** Ask
two things of each candidate. Publish only when the answer to both is yes.

**Is it permanent?** A decision taken, money committed, a contract signed, construction started or
finished, a plan clearing a stage, something opened or closed for good, a formal objection that can
stop a scheme. Each of these changes what gets built, where, or how people move, and is still true
a year later.

**Does it matter?** Would a reader in another district care, and would anyone still want to read it
in a year? A tram line extended, a park design chosen, a listed building cleared for demolition:
yes. A pavement resurfaced, a bus stop moved, one extra weekend service: no.

These are not news here, however much space they get elsewhere:

- **Accidents and incidents.** Collisions, derailments, fires, a lorry wedged under a viaduct, a
  ceiling coming down, a burst sewer, an outage. They happen *in* the built environment; they do
  not change it. `krc-videnska-bridge-damaged` (October 2026) and
  `main-station-train-collision-no-etcs` (November 2026) were both published and should not have
  been. What an incident leads to can be a story. Six days after the collision, Správa železnic
  approved CZK 1.76bn for ETCS and longer platforms at the main station, and that was worth
  writing. Write the decision when it comes, and give the incident a paragraph of context in it.
- **Temporary disruption**, however long it lasts: closures, diversions, traffic measures,
  replacement buses, works notices, trial operation. A seven-month closure exists because
  something is being built. Write about the thing being built, when its construction starts, and
  put the closure in that article.
- **Seasonal, promotional and events.** Christmas trams, safety campaigns, open days, exhibitions,
  lectures, timetable leaflets.
- **Operator business.** A coach company joining the airport route, a private carrier's fares or
  ticket sales, an airline's routes. The city's own fare and tariff decisions are policy, and do
  count.
- **People.** Appointments, resignations, a borough electing its council. Write about them only
  when the story is a decision they took.
- **Progress notes.** A first unit delivered, a halfway mark, a site visit, when nothing has been
  decided since the last story.

Among the candidates that clear the bar:

- **Prefer** a cluster with `sourceCount > 1`. Two outlets on one story means you can cross-check.
- **Prefer** the contested over the announced. Where a scheme is objected to, that is usually the
  better story, and it is the one nobody else is assembling.
- **Skip** anything you cannot source properly in step 3.

### How many

**Three a day is a ceiling, not a target.** One is a normal day, and so is none. A day with nothing
in it is better than a day carrying a story that did not clear the bar. Never write a story to give
the day something, and never lower the bar because the queue is empty.

When more than three stories clear the bar, write them all. `scripts/release.mjs` publishes at most
three a day and the rest wait in `content/queue/`, so a strong Monday is banked for a quiet Thursday
rather than discarded. Transport is the exception; see below.

**When you are unsure, leave it.** A story you do not write is not lost. `mark-covered.mjs` marks
only the sources an article cites, so everything else returns in tomorrow's digest for as long as
it is inside the 21-day window. If it still looks like a story tomorrow, or a second outlet has
picked it up, or a decision has followed, write it then.

### Transport: one a day

The scan leans transport and always will. Of the registered sources, Zdopravy, DPP and PID file
nothing else, and they file more than all the others together. The relevance score also tags
anything transport-adjacent the same way. With only the bar to hold it back, transport ran at
fifteen of the nineteen articles published in November 2026, and at well over half the archive.

So **write at most one transport story a day**, and none if one is already waiting in the queue.
When two clear the bar, write the stronger and leave the other in the digest. It will be there
tomorrow, to be weighed against tomorrow's candidates. Do not bank transport in the queue the way
you would the other desks. The transport wire never runs dry, so a transport backlog would only
mean one goes out every day whatever happened. `release.mjs` enforces the publishing side: never
two articles from one desk on one day.

The rest of the effort goes into the other desks:

- **Hold the transport wire to the bar strictly.** Most of what those three sources file is a
  closure, a diversion, an incident, a campaign, a notice or operator business, and none of it
  qualifies.
- **Read the whole list before writing any of it.** The score ranks relevance, not worth, so the
  transport items at the top of the digest are not there because they are better. Read the
  development, planning, public-space and architecture candidates first, wherever they sit.
- **The bar does not drop for the other desks either.** A thin planning story does not fix a
  transport-heavy day. An empty day does.

### Press offices: what they are doing vs. what they are saying about themselves

Two sources — DPP and IPR — are institutional press offices, and they are among our best sources
precisely because they announce things first. Do not discount them as a class. The line is:

| Publish | Skip |
|---|---|
| What the institution is doing **to the city** — a metro station design competition, a tram line extension, a fleet tender, a plan milestone, a construction start | What the institution is saying **about itself** — awards, ISO audits, office relocations, opening hours, staff notices, depot beekeeping |

A press release is a primary source, not a disqualification. Where the announcement is the news,
write it and attribute it plainly ("DPP says…"). Where a developer is promoting its own building,
you may still cover it if the project matters, but say in the article that the source is the
developer.

### District councils

The městské části are in the scan for the occasional story the citywide press misses — a scheme
becoming concrete, a formal objection lodged, a plan put out for consultation, a dispute over a
landmark building. Praha 8 asking what happens to the concrete plant on Rohanský ostrov, or filing
against the Dolní Chabry bypass, is exactly why they are there.

But they are council newsletters. Most of what they publish is nursery enrolment, exhibition
openings, waste collection and storm warnings, and the filter only strips the obvious cases.

**The test: would this matter to a reader in a different district?** A resurfaced pavement, a senior
programme or a district magazine would not. Do not publish local administrative detail merely
because it passed the filter.

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

**Confirm the city.** Prague district names are not unique: Brno has a Vinohrady, Písek has a
Žižkova kasárna, BKOM is Brněnské komunikace. The filter vetoes an item when another city is
named in its title, summary or tags — but a feed often names none, and the word *brněnský* may
appear only in the article body. A story that reached you on a district name alone is worth one
look at the dateline before you write it.

If you find one, say so in the run log with the name that misled the filter. Some are fixable in
`scripts/lib/relevance.mjs`; the ones where the feed carries no clue at all are not, and this step
is the only place they can be caught.

## 4. Write both languages

For each story create `content/queue/<slug>/`, with an ASCII slug derived from the English
headline. Both files go in that directory:

```
content/queue/vltava-philharmonic-permit/
  index.en.md
  index.cs.md
```

**You write to the queue, never straight to `content/posts/`.** `scripts/release.mjs` moves articles
into the archive and stamps the publication date. That is what lets you write everything worth
writing on a good day without losing the surplus: six stories on Monday means three published and
three waiting, and a thin Thursday draws on them rather than going empty.

### Frontmatter contract

Every key below is checked by `scripts/validate-posts.mjs`.

```yaml
---
slug: vltava-philharmonic-permit      # must equal the directory slug, both files
lang: en                              # must equal the filename locale
title: "Headline in this language"    # always double-quoted — Czech headlines contain colons
dek: "One or two sentences of standfirst."
queuedAt: 2026-08-14                  # the day you wrote it; release.mjs turns this into `date`
category: architecture                # development | transport | public-space | planning | architecture
tags: ["Vltava Philharmonic", "Bubny-Zátory"]
district: "Praha 7 – Holešovice"      # the site, if the story has one — see "Pin it" below
location:                             # required whenever district is set; look it up, never guess
  lat: 50.1024
  lng: 14.4383
author: "Prague Insider Desk"
aiGenerated: true                     # never false — the disclosure is not optional
featured: false                       # at most ONE post per day, for a genuine lead story.
                                      # It pins the homepage lead only among that day's posts,
                                      # so you never need to unset yesterday's.
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
- `location` must fall inside Prague, and is **required whenever `district` is set** — an
  article that can name its district has a site, and the gate rejects one that does not pin it.
- `district` and `location` must be identical in both locales. The address does not translate.
- Slugs must be unique across the whole archive and must not collide with a category or page
  slug (`doprava`, `about`, `mapa`, …).

### Pin it

The map page plots `location` and nothing else, so an article without one is invisible there.
Almost every article used to be, because the desk was told to omit coordinates it did not already
know — which is every article, since you do not know coordinates.

You are not being asked to guess them. Look them up:

```bash
node scripts/geocode.mjs "Vítězné náměstí"
node scripts/geocode.mjs "Palmovka" "Ohrada"      # several at once
```

It answers from `data/places.json` when the place is already known and from OpenStreetMap when it
is not, printing the `location:` block to paste and a suggested `district:`. Everything it resolves
is written back to the gazetteer, so the file is committed with the day's work.

Three things to check rather than trust:

- **The name that came back.** The tool refuses to record a hit that does not carry the name you
  asked for — that is Nominatim answering "Západní Město" with a street called Západní twelve
  kilometres away. When you see that warning, read the candidates and re-run with `--pick N`, or
  use `--set lat,lng` if you have the point from the source itself.
- **That it is the right thing of that name.** "Ohrada" resolves to Kunratice before it resolves
  to the Žižkov tram stop, and both are real. The candidate list is printed for this.
- **The suggested district.** It is OSM's cadastral area, which is not always the name a reader
  would use — Vítězné náměstí comes back as Střešovice, not Dejvice — and the numbered borough is
  the *obvod*, not always the městská část. Prefer what the sources call it.

**One story, one point.** Pin the site the story turns on: the bridge, the station, the plot.
A citywide story has no site — the Metropolitan Plan, a fleet tender, a comparison against other
European cities — and gets neither `district` nor `location`. Do not put a marker on the map where
the story is not, and do not drop `district` to get past the gate.

If the lookup cannot reach the network, say so in the run log. Known places still resolve from the
gazetteer; genuinely new ones go unpinned that day rather than guessed.

### The headline

Headlines are where a translated-sounding Czech article gives itself away fastest, and where it
does the most damage — the headline is what appears on the card, in the feed and on the social
image, often without the body underneath it to redeem it.

**Write the Czech headline in Czech, from the facts.** Not from the English one. If you find
yourself asking how to say the English headline in Czech, you are already producing the wrong
thing. Write what a Czech editor would put on this story, then check it against the English for
the same facts — not the same words.

Four failures that have all reached the site:

- **A numeral with its noun eaten.** English drops the head noun freely — "Two bids", "the first
  eleven". Czech does not. *"Rychlotrať z Běchovic chtějí projektovat dva."* — two what? It needs
  `dva zájemci`. When a headline turns on a number, say what is being counted.
- **The wrong aspect.** Czech news headlines take the perfective for a discrete event; the English
  present tense calqued across becomes an imperfective that reads like something ongoing.
  *"Praha 10 svolává stavby k jednomu stolu"* — the meeting is one announced event, so `svolá` or
  `posadí`, not `svolává`.
- **A metaphor carried over whole.** The same headline convened *stavby* — building sites — because
  the English said "calls the diggers to one table". You convene people: `zhotovitele`. An English
  figure of speech translated literally is almost never a Czech figure of speech.
- **Made-up colloquial numbers.** Line 137 is `sto třicet sedmička`. *"Sto třicítka sedmička"* is
  not a word — it welds `stotřicítka` (130) to a stray seven. If you are not certain of the
  colloquial form, use the plain one: `linka 137`.

Read the finished Czech headline aloud. If it sounds like something rendered out of another
language, it is, and the fix is to write it again rather than to repair it.

### How to write

Both versions are **composed separately for their own readers**. The Czech is not a translation of
the English and must not read like one — different idiom, different framing, same facts, same
figures, same sources. Write the Czech as a Czech editor would; the headline especially, see above.

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

## 6. Release from the queue

```bash
node scripts/release.mjs
```

Moves the **oldest** queued articles into `content/posts/`, stamping each with today's date: at
most three a day, and never two from one desk. Oldest first, so nothing written on a busy Monday is
starved by a busier Tuesday. An article held back because its desk already has one today is still
the oldest of its desk tomorrow.

An article queued more than fourteen days ago is held back and reported rather than released — by
then it may have been overtaken. If you see that in the output, check whether the story still
stands; if it does not, delete it from the queue and say so in the log.

Run this every day, including days you wrote nothing, so a quiet morning still publishes what a
busy one banked. When the queue is empty it releases nothing. That is a correct outcome, not a gap
to fill.

## 7. Validate and build — both must pass

```bash
node scripts/validate-posts.mjs && npm run build
```

If validation fails, fix the frontmatter and run again. If the build fails, fix it. **Do not commit
until both are green.** These two commands are the entire safety net between you and a live site.

## 8. Commit

Committing is the last thing the desk does, and it is what triggers publication.

**Push to the branch you were assigned, not to master.** A cloud routine run is pinned by its
harness to its own `claude/*` branch and refused any other target — trying master fails the push and
strands the work in a container that is about to be destroyed. `.github/workflows/promote-desk.yml`
watches `claude/**`, re-runs the gate on a clean install, and fast-forwards master, which
`deploy.yml` then publishes. Pushing your branch is all that is required; do not open a pull request.

Run by hand on master, `git push` is simply push.

First finish the run log. Replace the `_(the desk fills this in)_` placeholder in
`data/last-run.md` with what you decided — one line per candidate you published and one per
candidate you skipped, each with a short reason. Be specific: "skipped, corporate self-promotion"
is useful; "not newsworthy" is not.

```bash
git add content/posts content/queue data/seen.json data/last-run.md data/places.json
git commit -m "posts: <n> stories for YYYY-MM-DD"   # or "scan: no stories for YYYY-MM-DD"
git push
```

**Commit even when you published nothing.** A quiet day still commits the log. A run that leaves no
commit at all is indistinguishable from a run that never happened, and that has cost real debugging
time before.

Then report to the user: what you wrote and what was released (they differ), how deep the queue
is now, what you deliberately skipped and why,
any source that errored, the exact `git push` output, and anything that looked like it needed a
human.

---

## Guard rails

- **Lasting change only.** No accidents, incidents or temporary disruption, however prominent.
- **At most three released a day, never two from one desk, and none is fine.** Write everything
  that clears the bar into the queue and let `release.mjs` meter it out. The one exception is
  transport: write at most one transport story a day.
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
`zdopravy` and `archiweb` are national, so quiet days from any of them are normal. `archdaily` and
`dezeen` are read through their Prague tags and carry a few items a month at most, so a week with
nothing from either is normal too; `stavbaweb` usually has something every week. Treat a source as
broken when it returns zero *and* its listing URL clearly still has relevant stories on it.

`prahacamp`, `iprpraha` and `dpp` are the three that should rarely be empty for long.
