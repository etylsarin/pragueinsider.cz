# Scan log — 2026-09-10

Scanned `2026-09-10T05:07:57.968Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 2 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 1 new of 10 (0 off-topic, 6 covered, 3 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (5 off-topic, 2 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✓ **archiweb.cz** — 2 new of 19 (16 off-topic, 1 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 4 new of 40 (31 off-topic, 5 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (8 off-topic, 2 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 2 new of 10 (8 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 1 new of 25 (23 off-topic, 1 covered, 0 outside window)
- ✓ **Městské části** — 6 new of 32 (24 off-topic, 2 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (5 off-topic, 0 covered, 5 outside window)

## Candidates — 19 in 19 clusters

1. `19` transport — Očekávané komplikace na příjezdových silnicích do Prahy v prvním zářijovém týdnu
2. `17` development — Neziskové organizace se představí na Andělu
3. `17` transport — DPP zve na den otevřených dveří v garáži Řepy v rámci oslav 90 let prvních pražských trolejbusů
4. `16` transport — Posun u vnitřního pražského okruhu: Projektanti potvrdili datum výstavby a ukázali nové vizualizace
5. `16` transport — Nové parkoviště pro rezidenty v ulici Nicholase Wintona
6. `16` transport — Stav přípravy železničního jízdního řádu 2026/2027 po projednání Návrhu JŘ pro tratě v rámci PID (srpen 2026)
7. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na září
8. `13` architecture — Dny evropského dědictví: Místa, která mají co vyprávět
9. `12` planning — ZŠ Brána jazyků otevírá Předškoličku pro budoucí prvňáčky
10. `12` development — Přístavba základní školy na Zlíchově je hotová
11. `12` transport — Natáčení v Letenských sadech
12. `12` architecture — Sky City Villas: Když architektura dýchá technologií. Nová kapitola funkcionalismu v pražských Záběhlicích
13. `11` transport — Velký výpadek CityElefantů v Praze a okolí. Na části spojů jezdí místo dvou jednotek jen jedna
14. `10` transport — Prague moves ahead with plans for fifth metro line
15. `9` transport — Dalších 160 km jen s vlaky vybavenými ETCS. Z Prahy do Českých Budějovic zmizí až 450 rychlostníků
16. `9` transport — „Kniha přání a stížností.“ Liberecký kraj sepsal, co očekává od státu na železnici, vede vlak do Prahy
17. `9` transport — Prague to Add 51 New Trams Next Year as Network Expands
18. `7` development — V Motole se otevřelo Národní onkologické centrum za téměř pět miliard korun
19. `6` transport — September 28 Holiday in Czechia: What Will Be Open and Closed


## Decisions

### Written to the queue (4)

- **Městský okruh, eastern section** — `mestsky-okruh-east-permit-documentation`. Permit
  documentation finished this month, DESÚ application due in December, and August's updated EIA
  drops the central congestion charge and the outer-ring conditions while adding a new one tying
  three sections to the Hloubětín tunnel. A decision taken, with a schedule out to 2042.
- **National Oncology Centre, Motol** — `motol-national-oncology-centre-opens`. A CZK 4.96bn
  building opened on 9 September, capacity up 40 percent, mostly recovery-plan money, against a
  bribery investigation and a fire in the cladding a week earlier. Something opened.
- **CityElefant shortage** — `cityelefant-shortage-prague-commuter-trains`. 24 of 71 units out of
  service, ~10 short of the 57 needed, S1/S9/S7 running single units, a fine coming from Středočeský
  kraj. Written with the 10 September ETCS piece as a second source, because the 13 December switch
  to exclusive ETCS operation is one of the named causes and Správa železnic confirmed it as final.
  The two clusters are one story; written once, not twice.
- **Zlíchov school pavilion** — `zlichov-special-school-pavilion`. Completed city investment lifting
  a scarce specialised school from 50 to 120 first-stage places, with the next stage starting. Thin
  on figures — no cost, no dates for later stages — and the article says so rather than padding.

### Released to `content/posts/` (3)

Oldest first from the queue, all queued 2026-09-08:

- `motol-greyhound-track-athletics-stadium`
- `prague-orders-25-more-52t-trams`
- `vltava-philharmonic-land-swap` — pinned as the day's lead (`featured: true`).

Queue depth after the run: **7**.

### Skipped, with reasons

- *Prague moves ahead with plans for fifth metro line* (Expats.cz) — already ours, published
  2026-09-04 as `metro-ring-line-e-feasibility-study`.
- *Prague to Add 51 New Trams Next Year* (Prague Morning) — same story as the queued
  `prague-orders-25-more-52t-trams`, released today. One story, one article.
- *Dalších 160 km jen s vlaky vybavenými ETCS* (Zdopravy) — not dropped, folded in as the second
  source of the CityElefant article. On its own the Prague content is the Zahradní Město endpoint
  and the Uhříněves–Malešice link; as cause-of-the-shortage it is load-bearing.
- *Stav přípravy železničního jízdního řádu 2026/2027* (PID) — a real milestone (route ordering
  closed, timetable effective 13 December 2026) but the page carries no service detail at all and
  refers out to Správa železnic PDFs. Too thin to write from without padding.
- *„Kniha přání a stížností." Liberecký kraj* (Zdopravy) — Liberec region's demands on the state,
  not a Prague story.
- *Nové parkoviště pro rezidenty v ulici Nicholase Wintona* (Praha 7) — 35-odd spaces on a plot lent
  by the city, residents' permits only. Local administrative detail; fails the other-district test.
- *Sky City Villas, Záběhlice* (archiweb press) — sponsored content originating with Hager Electro
  and MONOBRAND, promoting KNX switch fittings. No permit, no construction milestone, no figures.
- *Přístavba ZŠ na Zlíchově* — written; see above.
- *V Motole… onkologické centrum* — written; see above.
- Events, notices and programmes, all failing the "has something changed" test: DPP open day at the
  Řepy garage (institution talking about itself), PID Point September timetable, expected congestion
  on approach roads in the first week of September, Dny evropského dědictví, NGO day at Anděl,
  Předškolička at ZŠ Brána jazyků, filming in Letenské sady, and the 28 September holiday shop
  opening hours.

### Notes for a human

- **No source errored.** All thirteen adapters returned. praha.camp (39 of 40 outside the window),
  IPR (22 of 24) and Klub Za starou Prahu (10 of 10) were quiet because their items pre-date the
  21-day window, not because they broke.
- **`www.praha.eu` is blocked by the network egress proxy.** Tried it to find a cost figure for the
  Zlíchov pavilion, since the Praha 5 piece credits its photo to MHMP and reads like a city release.
  Worth adding to the allowlist: the city press office is the primary source behind a good share of
  what the district feeds carry.
- No misfiled-city candidates this run — nothing reached the digest on a district name that turned
  out to be Brno or Písek.
- Nominatim was reachable; Balabenka, Fakultní nemocnice Motol and Zlíchov were resolved and written
  back to `data/places.json` (56 places). Balabenka's suggested district came back as Prosek; filed
  as Praha 9 – Libeň, which is what the sources call it.
