# Scan log — 2026-09-26

Scanned `2026-09-26T05:06:46.726Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 1 new of 40 (1 off-topic, 1 covered, 37 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 1 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 2 new of 10 (0 off-topic, 4 covered, 4 outside window)
- ✓ **PID / ROPID** — 4 new of 10 (4 off-topic, 2 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 2 new of 40 (36 off-topic, 2 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (7 off-topic, 3 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 2 new of 10 (8 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 8 new of 40 (29 off-topic, 3 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)

## Candidates — 19 in 19 clusters

1. `30` transport — Prague Metro and Tram Disruptions Planned for September 28 Weekend
2. `22` architecture — V cenách Opera Pragensia bodovala ředitelka CSOP i Raudnitzův dům
3. `22` transport — Trvalé změny PID v září a říjnu 2026
4. `20` transport — Oznámení plánovaných hlučných prací v oblasti Nového spojení
5. `19` transport — DPP o prodlouženém víkendu vymění další pražce na trati C
6. `19` planning — Pražské ulice mají co vyprávět. Přibývají modré tabulky
7. `18` planning — Radní podpořili granty na příští rok
8. `17` transport — Tři sekundy, které mohou zachránit život. ROPID cílí na mladé chodce s mobily a sluchátky v ulicích Prahy
9. `14` transport — V domově seniorů U Vršovického nádraží proběhne školení s možností cvičné střelby
10. `14` public-space — Ve škole a školce přibude zeleň
11. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na září a říjen
12. `13` transport — Pozvánka na prodloužený víkend s PID: Den hrdinů a Poznej Vltavu
13. `13` development — Petřínská lanovka dnes po dvou letech obnovila provoz
14. `12` transport — Potvrzeno: Italské rychlovlaky spojí Mnichov a Řím. Z Prahy do italské metropole bude stačit jeden přestup
15. `12` transport — Letů na Madeiru z Prahy ubude. Eurowings zrušily plánované spojení
16. `10` transport — Praha 5 vezme seniory na výlet
17. `10` public-space — Kam po škole? Praha jako hřiště pro děti, které už z hřiště vyrostly
18. `9` planning — Czech Statehood Day 2026: What Is Open and What to Do in Prague
19. `9` planning — Úřad bude v pátek 25. 9. od 10.30 uzavřen kvůli požárnímu cvičení


## Decisions

**Nothing was written today.** No candidate cleared the bar: nineteen items, and every one of
them was either a notice, an event, a progress note, or a story already in the archive. Three
articles were released from the queue, which is what the queue is for.

### Released (from the queue, not written today)

- **`metro-d-libus-station-permit`** (queued 2026-09-22) — **the day's lead.** Libuš station has a
  building permit; whether line D reaches it in 2032 turns on being under construction by
  mid-2028.
- **`petrin-funicular-stations-rebuild-schedule`** (queued 2026-09-23) — the order and dates for
  making the funicular's three stations step-free, at an estimated 80 million crowns.
- **`pid-litacka-second-generation-funding`** (queued 2026-09-23) — 25 million crowns approved for
  a rebuilt PID Lítačka, plus six million from ROPID and IDSK.

All three are transport, and so are the three still queued. `release.mjs` had nothing from another
desk to promote, so its balancer could not act. **The queue is 100% transport and three deep** —
the next non-transport story that clears the bar should be written even on a day the desk is
otherwise busy.

### Skipped, with reasons

- **1 · Metro and tram disruptions, 28 September weekend** (Prague Morning) — a three-day works
  diversion. The bar explicitly excludes these: nothing is decided and it is worthless in a month.
  Duplicates candidate 5.
- **2 · Opera Pragensia awards** (Praha 5) — an awards ceremony. Nothing was built, decided or
  committed; the source is a district boasting that its own nominee won.
- **3 · Permanent PID changes, September–October 2026** (PID) — **the one that nearly ran, and the
  one worth a human's attention.** The list is mostly the 137→52 conversion, already published on
  2026-09-23. The live item is tram 23, permanently rerouted from 19 September to terminate at
  Bílá labuť via Vodičkova and Václavské náměstí. A search indicates the reroute was made by ROPID
  at Praha 2's request, after the district objected that having two lines terminate at the
  Zvonařka loop would raise noise and had not been discussed with it in advance — which would be
  exactly the contested-over-announced story the bar prefers. **It was dropped because the
  objection cannot be sourced from any page this run could read.** `www.praha2.cz` and
  `izdoprava.cz` are both refused by the network egress proxy (`connect_rejected`, HTTP 403 to
  CONNECT), Zdopravy carries nothing on it (its Zvonařka hits are Brno's), and the pid.cz page
  itself is a 211-word bulleted notice that gives the new route and the date and no reason at all.
  Writing from the search snippet alone would have broken step 3. See "Needs a human" below.
- **4 · Noisy works at the Sluncová viaduct, Nové spojení** (Praha 8) — a scheduled-maintenance
  notice for rail infrastructure. Not a decision.
- **5 · DPP replacing sleepers on line C over the long weekend** (DPP) — routine maintenance
  closure, over in three days.
- **6 · Blue street-name plaques** (Praha 1) — a project running since 2020 adding a new batch at
  six locations, working towards nearly fifty. Fetched and read: no decision date, no budget, no
  approval — a progress note on a continuing programme, and confined to one district.
- **7 · Praha 5 grant programmes for 2027** (Praha 5) — the council approved the programmes but
  not the money, which "will depend on the 2027 budget". Local administrative detail with no
  figure attached.
- **8 · ROPID's "3 sekundy… to je easy" campaign** (PID) — a road-safety campaign, named in the
  skill as a non-story.
- **9 · Active-shooter training at a Vršovice care home** (Praha 10) — not the built environment.
- **10 · Greenery at ZŠ and MŠ Radlická** (Praha 5) — a foundation grant for planting in one
  school garden.
- **11 · PID Point timetable tour** (PID) — a service notice.
- **12 · PID at Den hrdinů and Poznej Vltavu** (PID) — an events programme.
- **13 · Petřín funicular resumed operation** (DPP) — already published on 2026-09-22 as
  `petrin-funicular-returns-fourth-generation`, and the follow-up on its stations went out today.
- **14 · Italian high-speed trains, Munich–Rome from December 2028** (Zdopravy) — a rail service
  that does not call at Prague; reaching Rome with one change is not Prague's built environment.
- **15 · Eurowings drops Madeira flights** (Zdopravy) — airline commercial scheduling.
- **16 · Praha 5 seniors' outing to Louny** (Praha 5) — a district social programme.
- **17 · "Kam po škole?"** (CAMP) — fetched and read. A well-made survey essay on public space for
  teenagers, but it reports no decision: everything concrete in it (Spot Holešovice, the Prague 7
  school streets, the planned Jižní Město complex) already exists or is unchanged.
- **18 · Czech Statehood Day opening hours** (Prague Morning) — a holiday guide.
- **19 · Praha 10 office closed for a fire drill** (Praha 10) — an office notice.

No misfiled out-of-town story was found this run; the Zvonařka hits on Zdopravy were Brno's and
were not in the digest.

### Sources

- **archiweb.cz — HTTP 429, and this is now the fifth consecutive day** (22, 23, 24, 25 and 26
  September). Re-checked live from this container: `https://www.archiweb.cz/n` returns **429 to
  `PragueInsiderBot/1.0` and 200 to a browser user-agent** on back-to-back requests from the same
  host. The diagnosis in the last three logs holds — the site is refusing our identified bot
  string, not our selector — so there is nothing in `scripts/sources/archiweb.mjs` to fix. The
  desk has now lost a week of one of its two architecture sources, which is part of why the queue
  is all transport.
- Every other source answered. `iprpraha` returned 0 new and `praha.camp` 1, both from a
  21-day window that is mostly already covered rather than from a failure.

### Needs a human

1. **archiweb.cz.** The only remaining fix is to change the user-agent in `scripts/lib/http.mjs`,
   and that is a deliberate editorial choice — the current string identifies the desk and links to
   the Editorial Standards page. Disguising it as a browser is a decision the desk should not take
   on its own. The alternative is to email the address in the string and ask for the bot to be
   allowed.
2. **Egress allowlist.** `www.praha2.cz` and `izdoprava.cz` are blocked by the proxy. Praha 2 is
   not a registered source (it publishes no feed — see the comment in `scripts/sources/
   districts.mjs`), so nothing is being silently dropped from the scan, but it does mean a district
   that objects to something cannot be read even when another source points at it, which is what
   killed candidate 3 today.
