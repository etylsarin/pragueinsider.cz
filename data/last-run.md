# Scan log — 2026-10-03

Scanned `2026-10-03T05:07:16.122Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 1 new of 40 (1 off-topic, 1 covered, 37 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 1 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 3 new of 10 (0 off-topic, 2 covered, 5 outside window)
- ✓ **PID / ROPID** — 4 new of 10 (4 off-topic, 2 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 6 new of 40 (32 off-topic, 2 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 8 new of 39 (27 off-topic, 4 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (1 off-topic, 0 covered, 9 outside window)

## Candidates — 25 in 24 clusters

1. `28` transport — Na Smíchově osadí druhou část nového železničního mostu. Přeruší kvůli tomu provoz tramvají
2. `27` transport — Na Malé Straně pokřtili knihu o historii petřínské lanovky
3. `23` transport — Zastávka Nádraží Holešovice bude v pátek 2. října Knižní
4. `22` transport _[2 sources]_ — DPP vyhlašuje veřejnou zakázku na zhotovitele stanice metra D Libuš
5. `22` architecture — V cenách Opera Pragensia bodovala ředitelka CSOP i Raudnitzův dům
6. `22` transport — Trvalé změny PID v září a říjnu 2026
7. `19` development — Do bývalé mateřinky se vrátí školství
8. `19` transport — DPP o prodlouženém víkendu vymění další pražce na trati C
9. `17` transport — Tři sekundy, které mohou zachránit život. ROPID cílí na mladé chodce s mobily a sluchátky v ulicích Prahy
10. `16` architecture — Rozhodni o Praze! Praha v památkových sporech
11. `16` architecture — Zmizelá Praha: přednášky pro seniory na radnici
12. `15` architecture — Open House Praha na podzim odhalí zapomenuté příběhy Prahy
13. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen
14. `14` transport — Dočasné umístění citybloků v Ovenecké
15. `13` transport — Obce si objednaly rychlík Žatec – Praha na jeden den. Chtějí ukázat potenciál tratě 110
16. `13` transport — Pozvánka na prodloužený víkend s PID: Den hrdinů a Poznej Vltavu
17. `13` development — Petřínská lanovka dnes po dvou letech obnovila provoz
18. `12` transport — Petřínská lanovka za osm dní svezla téměř sto tisíc lidí. DPP vypravil stovky jízd navíc
19. `11` transport — Rumunské AnimaWings míří do insolvence, ruší i lety do Prahy
20. `10` public-space — Kam po škole? Praha jako hřiště pro děti, které už z hřiště vyrostly
21. `9` planning — Proběhly odborné konzultace potřebné pro koncepci veřejného osvětlení v Praze
22. `9` planning — Úřad bude v pátek 25. 9. od 10.30 uzavřen kvůli požárnímu cvičení
23. `8` transport — Prověšené trakční vedení zastavilo provoz na koridoru mezi Prahou a Ústím
24. `7` transport — Požár bytu v centru Prahy omezil provoz tramvají


## Decisions

### Written to the queue — 3

- **metro-d-libus-station-tender** (transport) — DPP issued the contract for the builder of Libuš
  station on metro D: 3.755bn CZK ex VAT, 54 months from site handover, price the only award
  criterion at 100% weight. Two sources, figures agreeing. Distinct stage from
  `metro-d-libus-station-permit` (26 Sept), which ended on the line that Libuš had a permit and no
  builder. Zdopravy adds the scope carve-out — the winner does not drive the running tunnels, which
  come from the Ryšánka–Nové Dvory contract started in June — and that a Písnice tender follows.
- **public-lighting-concept-consultations** (planning) — IPR closed the first stage of updating the
  Public Lighting Concept: two expert workshops, commissioned by the city assembly, main partner
  Technologie hl. m. Prahy. A plan clearing a stage, citywide, so no `district`/`location`. Verbatim
  quotes from Boháč and Jílek; Jílek's contains a typo in the original (*trojúhelníky*) and is quoted
  as published.
- **renoirova-nursery-becomes-primary-school** (development) — Praha 5 has a study for converting the
  1980s nursery in Renoirova on Barrandov into a lower-stage primary school: six homeroom classrooms,
  multifunctional hall, and accommodation units for teachers, by KVS projekt. Weakest of the three —
  study stage only, no cost, no permit, no council decision — and the article says so twice. Written
  because the driver (new housing filling V Remízku and Chaplinovo náměstí) and the teacher flats are
  a citywide pattern, not Praha 5 administrative detail.

### Released — 3, of which only one was written today

`release.mjs` took the two banked on 2 October plus the Barrandov piece, and held the Metro D tender
back on desk mix — transport already had the 15T article on this front page.

- **vlasta-estate-cooperation-agreement** (planning) — **lead**, `featured: true`. Strongest of the
  three released: a signed agreement, 1.117bn CZK already taken for the site, and six owners'
  associations brought into preparing the competition. Contested rather than announced.
- **tram-15t-air-conditioning-first-car-lodz** (transport)
- **renoirova-nursery-becomes-primary-school** (development)

Queue after release: 2 — `metro-d-libus-station-tender`, `public-lighting-concept-consultations`.
Neither is near the fourteen-day hold.

### Skipped, with reasons

- **Na Smíchově osadí druhou část nového železničního mostu** (score 28, Zdopravy) — already
  published as `nadrazni-railway-bridge-second-half` on 1 October from Praha 5's closure notice. Same
  event, different outlet, so the clustering did not catch it. Not marked covered; it will age out.
- **Petřínská lanovka za osm dní svezla téměř sto tisíc lidí** (12) and **Petřínská lanovka dnes po
  dvou letech obnovila provoz** (13) — the reopening is `petrin-funicular-returns-fourth-generation`
  (22 Sept). The eight-day ridership figure is a progress statistic on a story already told.
- **Trvalé změny PID v září a říjnu 2026** (22) — the headline item, trolleybus 52 replacing bus 137,
  is `bus-137-becomes-trolleybus-52` (23 Sept). What remains is the tram 23 reroute from 19 September,
  which is a timetable notice, not infrastructure.
- **Do bývalé mateřinky…** — written, see above.
- **DPP o prodlouženém víkendu vymění další pražce na trati C** (19) — one weekend of sleeper
  replacement between Budějovická and Kačerov. Works diversion; nothing decided.
- **Tři sekundy, které mohou zachránit život** (17) — ROPID road-safety campaign for 11–19 year olds.
  Not the built environment; the skill names this class explicitly.
- **V cenách Opera Pragensia bodovala ředitelka CSOP i Raudnitzův dům** (22) — awards ceremony. An
  institution on its own prizes.
- **Na Malé Straně pokřtili knihu o historii petřínské lanovky** (27) — book launch.
- **Zastávka Nádraží Holešovice bude v pátek 2. října Knižní** (23) — themed tram stop for one day.
- **Rozhodni o Praze! Praha v památkových sporech** (16), **Zmizelá Praha: přednášky pro seniory**
  (16), **Open House Praha na podzim** (15), **Pozvánka na prodloužený víkend s PID** (13),
  **PID Point: Jízdní řády na říjen** (14) — programmes of events and timetable notices.
- **Dočasné umístění citybloků v Ovenecké** (14) — concrete blocks on one street until bollards
  arrive, plus autumn tree planting. Local administrative detail; fails the other-district test.
- **Kam po škole? Praha jako hřiště pro děti** (10, CAMP) — a good survey of school streets, asphalt
  art and Spot Holešovice, but a magazine essay about interventions already made. Nothing changed.
- **Obce si objednaly rychlík Žatec – Praha na jeden den** (13) — one-day demonstration train, and
  the story sits on line 110 outside Prague.
- **Rumunské AnimaWings míří do insolvence** (11) — airline business.
- **Prověšené trakční vedení zastavilo provoz na koridoru** (8), **Požár bytu v centru Prahy omezil
  provoz tramvají** (7) — incidents, hours long.
- **Úřad bude v pátek 25. 9. uzavřen kvůli požárnímu cvičení** (9) — fire drill.

### Sources

- **archiweb.cz — HTTP 429.** Rate-limited, not a markup break. First failure in this run series; if
  it errors again tomorrow the adapter needs a look, but 429 suggests backing off rather than
  rescraping.
- `zdopravy.cz` returned 403 to WebFetch as always; fetched with a browser user-agent per the skill.
- Nominatim was reachable: `Renoirova` resolved fresh and is written back to `data/places.json`
  (98 places). Libuš station reuses the point already recorded for the 26 September article so the
  same place lands on the same pin.
- No cross-city false positive found this run. Every item written carries a Prague dateline.

