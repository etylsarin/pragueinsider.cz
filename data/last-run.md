# Scan log — 2026-10-17

Scanned `2026-10-17T05:12:19.926Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 2 new of 40 (0 off-topic, 1 covered, 37 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 2 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 3 new of 10 (0 off-topic, 4 covered, 3 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (3 off-topic, 0 covered, 4 outside window)
- ✓ **Klub Za starou Prahu** — 2 new of 10 (0 off-topic, 0 covered, 8 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 6 new of 40 (33 off-topic, 1 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 1 new of 40 (39 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 1 new of 25 (24 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 5 new of 36 (31 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (3 off-topic, 0 covered, 7 outside window)

## Candidates — 24 in 24 clusters

1. `31` transport — V Praze se staví pět tramvajových tratí současně. Nové koleje míří na Strahov i Nové Dvory
2. `27` transport — Prague Expands Tram Network With Five Projects Underway
3. `26` transport — Nové tramvajové zastávky Hodkovičky ode dneška slouží cestujícím
4. `25` transport — Smíchovské nádraží otevře dvě nová nástupiště. Výtahy i eskalátory cestujícím pomohou, říká správce
5. `24` transport — Obrazem: Přestavba Smíchovského nádraží je v polovině. Příští týden se stavba přesune k výpravní budově
6. `19` transport — Oprava semaforů ovlivní dopravu
7. `18` transport — Den otevřených dveří DPP ve vozovně Pankrác již tuto sobotu
8. `16` transport — Železniční soutěž století je v cílové stanici, páteřní spojení středních Čech a Prahy zajistí na dalších 30 let České dráhy
9. `16` transport — Soužití cyklistů a chodců na Dvoreckém mostě skřípe. Praha je nově zkouší usměrnit piktogramy
10. `16` architecture — Rozhodni o Praze! Praha v památkových sporech
11. `15` transport — Co ještě vydrží pražské mosty a silnice. Ptejte se Filipa Hájka, šéfa TSK
12. `14` transport — DPP si do svého majetku převzal dalších patnáct trolejbusů Bozankaya SNG 12T
13. `14` public-space — Cestu u vstupu do Lobkovické zahrady čekají dvě uzavírky
14. `14` development — Projekt MAP V slavnostně zahájili v Rezidenci primátora Prahy
15. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen
16. `13` transport — Pozor na omezení v Nádražní
17. `12` transport — Více vlaků mezi Prahou a Vratislaví. Ministerstvo přiobjedná IC Glacensis, „vychází vstříc poptávce“
18. `12` transport — Další etapa rekonstrukce vodovodů v Tusarově ulici
19. `12` transport — Zamítnuto. RegioJet je o krok blíže rychlíkům z Prahy do Trutnova, ČD neuspěly se stížností na cenu
20. `11` development — Nová tvář Výstaviště: Střešní běžecká dráha, otevřený areál a obnovený Průmyslový palác
21. `10` development — Trolejbusy v Praze plně přebírají další dvě linky na nových tratích. Zatím hlavně na víkendy
22. `7` planning — Kompromis není prohra, říká ředitelka Sekce koordinace Kristýna Lhotská
23. `6` transport — Prague coalition talks advance on housing, schools, and transport
24. `6` development — PONDĚLNÍ PŘEDNÁŠKY OBNOVENY


## Decisions

### Written (4)

- **`cd-signs-thirty-year-suburban-rail-contract`** — transport, citywide (no pin). Not a digest
  cluster of its own: candidate 8 (PID's release on the signing) led to three Zdopravy.cz pieces in
  its feed that the filter had passed over as off-topic (signing report 16 Oct; ÚOHS rejecting
  Stadler's first complaint and opening a second case, both 15 Oct). The 165bn Kč, 30-year EMU 400
  operating contract was signed on 16 October — a follow-up to our 8 September piece on the vote.
  Contested: ČD signed before it can contract the trains, ÚOHS's preliminary measure still bars the
  Škoda contract, and Stadler's new "material change" complaint opened first-instance proceedings.
  **Disagreement reported, not resolved:** the PID release says "more than sixty" units, ČD's Ješeta
  (in the same release) "up to 60" for the base scope, Zdopravy "at least 60" — all three attributed.
  Also left out: Zdopravy's headline says "over a thousand pages" of contract, its body "more than
  110" — page count not used. Released today as the lead (`featured: true`).
- **`smichov-station-halfway-platforms-open`** — transport, candidates 4 and 5 (one story). Platforms
  3 and 4 and the south underpass open 20 October; works move to the station-building side; the
  Smíchov–Radlice footbridge: SŽ press release says possibly end-2027, its representative on site
  "mid-2028" — both reported. 40 terminal-platform columns standing; 4.14bn Kč price. Written from
  Zdopravy.cz only: **iROZHLAS (candidate 4) served a bot-challenge page** ("Ještě zbývá jeden krok")
  to both WebFetch (403) and curl, so it was not read and is not cited. Pinned on the existing
  "Smíchovské nádraží" gazetteer entry. Released today.
- **`dvorecky-bridge-cycle-pictograms`** — public-space, candidate 9. Non-binding pictograms at the
  bridge's stops, the first adjustment to the shared C 9 footway regime the cycling commission chose
  over the designed separate lanes; contested since opening. Single source (Zdopravy.cz). Pinned on a new
  gazetteer entry "Dvorecký most" (OSM hit, name checked); district given as "Praha 4 – Podolí / Praha 5 – Smíchov" because the
  bridge joins the two. Released today.
- **`trolleybuses-take-weekends-on-51-53`** — transport, candidates 12 and 21 (one story, DPP release +
  Zdopravy). DPP accepted 15 more Bozankaya SNG 12T (28 of 30 now owned, up from 13 on 23 Sept);
  from 17 Oct lines 51 and 53 are trolleybus-only at weekends; buses 131/176 to end in "roughly two to
  three weeks". Citywide-ish across two routes, so no pin. **Queued, not released** — release.mjs held
  it back as the third transport piece of the day.

### Released (3)

- `cd-signs-thirty-year-suburban-rail-contract` (lead), `dvorecky-bridge-cycle-pictograms`,
  `smichov-station-halfway-platforms-open`, all stamped 2026-10-17. Queue depth after the run: **1**
  (`trolleybuses-take-weekends-on-51-53`).

### Skipped: already in the archive

- `31` / `27` **Five tram lines under construction** (PID, Prague Morning) — a roundup. Malovanka–Strahov
  (7 Oct) and Libuš–Nové Dvory (9 Oct) are already published, Hodkovičky too; the only new detail is
  that the Václavské náměstí tracks are joined up to Jindřišská/Vodičkova, a progress note with no
  date for service. Prague Morning not read separately — it is the English rewrite of the same item.
- `26` Hodkovičky tram stops, `20` Nová tvář Výstaviště — as on previous days.

### Skipped: below the bar

- `19` **Praha 5 traffic-light repair**, `16` **Nádražní closure 19–31 Oct** (Praha 5), `13` **Lobkovická
  zahrada path closures** (Praha 1, playground rebuild), `18` **Tusarova water main** (Praha 7):
  short works closures; not worth reading in a month, nor to a reader in another district.
- `18` **DPP open day at Pankrác** — an event; the institution about itself.
- `14` **MAP V launch** (Praha 1) — an education-planning programme ceremony, not the built environment.
- `14` **PID Point timetables** — a notice.
- `16` **Rozhodni o Praze!** and `6` **Monday lectures** (Klub Za starou Prahu) — event/programme notices,
  as before.
- `15` **Ask Filip Hájek (TSK)** — a reader-questions call, nothing decided.
- `17` **More Prague–Wrocław trains**, `19` **RegioJet / Trutnov** — national and international rail
  ordering; no Prague built-environment change.
- `22` **Kristýna Lhotská interview** (CAMP) — IPR describing its own reorganisation, as before.
- `23` **Prague coalition talks** (Expats.cz) — the page served a different article to the fetcher
  ("Záchranka" app); coalition talks with no agreement signed are not yet a change either.

### Notes for a human

- **archiweb.cz: HTTP 429 for the twenty-sixth consecutive day** (since 22 September). Still no
  architecture/planning wire.
- **iROZHLAS article pages now return a bot-challenge page** to both WebFetch and curl. The feed still
  reads, so ingest is fine, but stories from it can no longer be read at source from this container.
- The Zdopravy pieces on the ÚOHS cases were classed off-topic by the filter (no Prague term in title
  or summary), though they bear directly on PID's suburban fleet. Worth considering whether `EMU 400`
  belongs in the relevance terms.
- The **Hodkovičky cost figure** in `hodkovicky-tram-stop-opens` is still uncorrected (see the
  14 October log).
