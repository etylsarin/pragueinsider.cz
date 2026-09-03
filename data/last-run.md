# Scan log — 2026-09-03

Scanned `2026-09-03T05:08:36.904Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 2 covered, 21 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 0 new of 10 (0 off-topic, 5 covered, 5 outside window)
- ✓ **PID / ROPID** — 4 new of 10 (4 off-topic, 2 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✓ **archiweb.cz** — 4 new of 20 (15 off-topic, 1 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 3 new of 40 (36 off-topic, 1 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 5 new of 32 (23 off-topic, 4 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (4 off-topic, 0 covered, 6 outside window)

## Candidates — 17 in 17 clusters

1. `19` transport — Očekávané komplikace na příjezdových silnicích do Prahy v prvním zářijovém týdnu
2. `18` planning — Na Barrandově se buduje pumptrack
3. `18` transport — Jak se spotuje na Spotu? Přijďte nám 2. září říct, co vylepšit
4. `16` transport — Metropolitní plán je účinný. Otevírá brownfieldy, chrání výhledy a přináší předvídatelnou flexibilitu
5. `16` transport — Stav přípravy železničního jízdního řádu 2026/2027 po projednání Návrhu JŘ pro tratě v rámci PID (srpen 2026)
6. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na září
7. `14` planning — Začal platit nový pražský územní plán, má usnadnit výstavbu
8. `13` transport — Dopravní opatření v souvislosti s běžeckými závody 5. září
9. `13` architecture — Hledáte zajímavou práci ve facility managementu?
10. `13` transport — Praha upraví a rozšíří podporu bikesharingu v rámci aplikace PID Lítačka
11. `12` transport — Z Prahy do Mnichova s novými vagóny. Dva dopravci vybírají výrobce pro provoz od roku 2031
12. `12` development — Hledáme učitele/učitelku do mateřské školy
13. `11` transport — AirBaltic škrtá lety, zruší spojení Prahy s Vilniusem. Řeší vážné problémy
14. `11` transport — Další rumunská destinace dostupná přímým letem z Prahy. Wizz Air přidá čtvrtou linku
15. `9` development — Okružní linka metra by podle odhadu vyšla na 220 mld. Kč, Praha zadá studii
16. `9` architecture — V Praze bude v roce 2032 celosvětový kongres architektů
17. `7` architecture — Pražský hrad vypíše soutěž na proměnu Stájového dvora, zvažovala se už za Havla


## Decisions

### Written to the queue — 4

- **metropolitan-plan-in-force-objections** (planning) — candidates 4 + 7, one story across IPR and
  ČTK. The plan took effect on 1 September. We ran a curtain-raiser on 1 August from the CAMP
  piece, but that article carried none of the reaction; today's ČTK report has Roman Koucký saying
  his own draft lost its flexibility to the ministries, Arnika and deputy mayor Jana Komrská saying
  it ignored the public, and ARTN saying the height regulation is not permissive enough. Written on
  the objections rather than on the plan's contents, so it does not repeat the August article.
  Two sources cross-checked; they count the public consultation rounds differently (IPR three,
  ČTK two plus the 2018 draft publication) and the article reports both.
- **metro-ring-line-e-feasibility-study** (transport) — candidate 15. CZK 220bn estimate, 22 km,
  +29% of the network, councillors to commission the IPR feasibility study next week, and the
  Metropolitan Plan now reserving the corridor. Contested detail: Beránek says a tram suffices on
  the western half where Scheinherr's version wanted metro. ČTK gives metro D's completion as the
  start of 2026, which contradicts the second-half-of-2032 date the city gave on 31 August; both
  are reported and attributed, neither reconciled.
- **prague-castle-stajovy-dvur-competition** (architecture) — candidate 17. Competition announced
  for this winter or early next year to turn the Renaissance stables courtyard into a visitor
  centre. Pinned at Prašný most (50.0915, 14.3986), Praha 1 – Hradčany — Stájový dvůr and Jízdárna
  Pražského hradu both returned no match inside Prague from Nominatim, Prašný most did, and it is
  the street the courtyard stands on.
- **uia-world-congress-prague-2032** (architecture) — candidate 16. Money committed: EUR 870,000 to
  the UIA in instalments to 2032, approved by councillors, Prague beat Dubai, title of World
  Capital of Architecture attached. Citywide, so no pin.

### Skipped

- **Praha upraví a rozšíří podporu bikesharingu** (candidate 10) — already published on 29 August as
  `bikesharing-litacka-new-tender` from the Zdopravy report of the same council decision. The
  pid.cz release is the primary source of a story we have run; nothing new in it beyond the
  coefficient bands, which the earlier article already carried.
- **Na Barrandově se buduje pumptrack** (candidate 2) — a construction start, but a single
  neighbourhood sports track. Fails the district test: it would not matter to a reader outside
  Praha 5.
- **Jak se spotuje na Spotu** (3) and **Dopravní opatření … běžecké závody** (8) — a participation
  afternoon and a one-evening road closure. Neither is worth reading in a month.
- **Očekávané komplikace na příjezdových silnicích** (1), **PID Point: jízdní řády na září** (6) —
  routine operational notices.
- **Stav přípravy železničního jízdního řádu 2026/2027** (5) — a draft timetable still being
  amended; nothing decided since the last version.
- **Hledáte zajímavou práci ve facility managementu** (9), **Hledáme učitele/učitelku** (12) —
  district job advertisements.
- **AirBaltic ruší Vilnius** (13), **Wizz Air přidá čtvrtou rumunskou linku** (14) — airline route
  changes, not the built environment.
- **Z Prahy do Mnichova s novými vagóny** (11) — rolling stock for an international service, chosen
  by two carriers rather than by Prague, and the feed summary is one line.

### Released — 3

Oldest first, from the queue, stamped 2026-09-03:

- `zapadni-mesto-school-approved` (queued 09-01) — **featured**, the day's lead: CZK 1.03bn school
  for 1,152 pupils at Stodůlky, the largest commitment of the three.
- `praha-6-kocince-libocka-schools-open` (queued 09-02)
- `praha-7-asphalt-art-school-streets` (queued 09-02)

Queue after release: 4 articles, all written today.

### Notes

- No source errored. praha.camp, DPP, Klub Za starou Prahu, ČT24, iROZHLAS, Prague Morning,
  Expats.cz and Prague City Tourism returned nothing new; for all of them the fetch itself worked
  and the items were either off-topic, already covered, or outside the 21-day window.
- No mis-filtered non-Prague story found in the datelines this run.
- Geocoding reached Nominatim; `data/places.json` grew by two entries (U Prašného mostu,
  Prašný most).
