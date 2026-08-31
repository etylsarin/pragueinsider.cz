# Scan log — 2026-08-31

Scanned `2026-08-31T05:11:16.528Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 2 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 0 new of 10 (0 off-topic, 3 covered, 7 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (4 off-topic, 2 covered, 1 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✓ **archiweb.cz** — 0 new of 19 (17 off-topic, 2 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 3 new of 40 (35 off-topic, 2 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 4 new of 32 (24 off-topic, 4 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)

## Candidates — 10 in 10 clusters

1. `20` transport — Práce na sourozenci Výtoňského mostu na Bohdalci jsou u konce. Vrací se na něj provoz
2. `19` transport — Očekávané komplikace na příjezdových silnicích do Prahy v prvním zářijovém týdnu
3. `19` architecture — Připomínka: II. Veřejné setkání k obnově náměstí Svatopluka Čecha
4. `18` transport — Jak se spotuje na Spotu? Přijďte nám 2. září říct, co vylepšit
5. `16` transport — Dokončení opravy důležitého mostu: Na Žižkov se dá z Libně dostat bez omezení
6. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na srpen a září
7. `13` transport — Praha upraví a rozšíří podporu bikesharingu v rámci aplikace PID Lítačka
8. `13` architecture — Dny evropského dědictví: Místa, která mají co vyprávět
9. `12` development — Hledáme učitele/učitelku do mateřské školy
10. `10` transport — Praha usiluje o přímé spojení s Indií. Prioritou jsou Dillí a Bombaj


## Decisions

Thin day: 10 candidates, all single-source clusters, nothing cross-checkable. Two cleared the bar,
both completed bridge works finishing with the school holidays.

### Written to the queue

- **`bohdalec-truss-bridge-reopens`** — TSK finished the 1913 riveted truss overpass carrying
  Moskevská over the Vršovice marshalling yard; full traffic returns Monday 31 August. Construction
  finished, and a second major overhaul of a technical monument (2005: 130 t of steel, 20,000
  replica rivets). Source: Zdopravy.cz, 30 Aug.
- **`pod-krejcarkem-bridge-reopens`** — TSK completed the road bridge linking Ohrada with Palmovka
  after work from April; deck, waterproofing, bearings and expansion joints replaced, diverted bus
  lines revert. Construction finished on a link that was fully closed through August.
  Source: Zdopravy.cz, 31 Aug.

### Skipped, with reasons

- `13` **Praha upraví a rozšíří podporu bikesharingu v rámci aplikace PID Lítačka** (pid.cz) —
  **already published.** This is the Magistrát press release behind
  `2026-08-29-bikesharing-litacka-new-tender`, which we wrote from the Zdopravy version on 27 Aug.
  Same council decision of 28 August, same CZK 50m tender, same coefficients. Reached the digest
  only because the primary-source URL had not been marked covered.
- `19` **Očekávané komplikace na příjezdových silnicích do Prahy v prvním zářijovém týdnu** (PID) —
  one week's works diversions; fails the "worth reading in a month" test.
- `19` **Připomínka: II. veřejné setkání k obnově náměstí Svatopluka Čecha** (Praha 10) — a reminder
  for a meeting held on 27 August, deliberately identical in content to the 15 July session. Nothing
  decided since last time, and the notice does not name the winning team. Worth watching: when the
  competition-winning design moves to the next stage of project preparation, that is the story.
- `18` **Jak se spotuje na Spotu? Přijďte nám 2. září říct, co vylepšit** (Praha 7) — feedback event,
  district-local, nothing decided.
- `14` **Mobilní informační centrum PID Point: Jízdní řády na srpen a září** (PID) — operating hours
  of a mobile counter.
- `13` **Dny evropského dědictví** (Praha 1) — programme of events, explicitly below the bar.
- `12` **Hledáme učitele/učitelku do mateřské školy** (Praha 5) — job advertisement; council
  newsletter noise that the filter scored as `development`.
- `10` **Praha usiluje o přímé spojení s Indií. Prioritou jsou Dillí a Bombaj** (Zdopravy) — air
  route lobbying, not the built environment, and an aspiration rather than a decision.

### Released today

`plzenska-reopens-tsk-drops-kerbs`, `strossmayerovo-transit-block` (both queued 29 Aug),
`praha-liberec-rail-viability-confirmed` (queued 30 Aug, pinned as the lead). Queue left at 2.

### Notes

- No source errored; every adapter returned. Several were quiet for the ordinary reason — CAMP, IPR,
  DPP and Klub Za starou Prahu had nothing inside the 21-day window that was not already covered.
- No mis-filed non-Prague item found in this batch.
- `promote-desk.yml` is healthy: runs 1–5 (26–30 Aug) all succeeded and `master` really is at
  `4e04d62`, the 30 August desk commit. Note for future runs: inside the container `git fetch origin
  master` served a **stale** `origin/master` (four commits behind), which looks exactly like the
  promote workflow having stopped fast-forwarding. Check the branch tip through the GitHub API
  before believing the local ref.
