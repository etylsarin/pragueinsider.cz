# Scan log — 2026-10-09

Scanned `2026-10-09T05:07:55.577Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 1 new of 40 (1 off-topic, 1 covered, 37 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 3 covered, 21 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 4 new of 10 (0 off-topic, 3 covered, 3 outside window)
- ✓ **PID / ROPID** — 2 new of 10 (4 off-topic, 1 covered, 3 outside window)
- ✓ **Klub Za starou Prahu** — 2 new of 10 (0 off-topic, 0 covered, 8 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 5 new of 40 (32 off-topic, 3 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **Expats.cz** — 2 new of 25 (23 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 8 new of 40 (31 off-topic, 1 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (3 off-topic, 0 covered, 7 outside window)

## Candidates — 24 in 24 clusters

1. `26` transport — Nové tramvajové zastávky Hodkovičky ode dneška slouží cestujícím
2. `19` transport — V neděli začne poslední etapa modernizace tramvajové tratě v ulici Jana Želivského
3. `19` public-space — Praha 7 modernizuje školní budovy a začne stavět novou školu pro 570 žáků
4. `19` transport — DPP o prodlouženém víkendu vymění další pražce na trati C
5. `17` transport — Obrazem: Praha má novou zastávku na problematické tramvajové „rychlodráze“. Vyšla na 30 milionů
6. `16` architecture — Sedmička jde na Designblok se slevou
7. `16` architecture — Rozhodni o Praze! Praha v památkových sporech
8. `15` transport — Žižkov tram closure starts Sunday, with replacement buses until December
9. `14` development — Dětské skupiny se rozšířily o dvanáct míst
10. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen
11. `13` public-space — Kolíčkový den pomůže dětem a mladým lidem s handicapem
12. `13` transport — Pozvánka na prodloužený víkend s PID: Den hrdinů a Poznej Vltavu
13. `13` development — Petřínská lanovka dnes po dvou letech obnovila provoz
14. `12` planning — Radnice umístila nové pingpongové stoly k dětským hřištím
15. `11` transport — SŽ povolává do Krče další tanky. Uvázlou vrtnou soupravu se nedaří vyprostit
16. `11` development — Nová tvář Výstaviště: Střešní běžecká dráha, otevřený areál a obnovený Průmyslový palác
17. `11` transport — Tatry za hodinu a pod tisícovku. Wizz Air začne létat z Prahy do Popradu
18. `10` public-space — Poznejte živočichy v parku Stromovka
19. `10` transport — Pražské letiště chystá generační obměnu platforem pro odbavovací systémy. Přibudou i samoobslužné přepážky
20. `10` transport — V Portheimce si můžete zahrát šachy pod širým nebem
21. `9` transport — TZ: Praha 10 zmodernizovala a otevřela dopravní hřiště V Olšinách
22. `8` transport — Hasiči uvolnili kamion zaseklý pod viaduktem v Krči, vyprošťování pokračuje
23. `6` development — PONDĚLNÍ PŘEDNÁŠKY OBNOVENY
24. `6` transport — Czech Railways promises changes after overcrowding hits Prague commuter trains


## Decisions

### Written to the queue — 3

- **`jana-zelivskeho-final-stage-closure`** (transport) — DPP suspends trams between Nákladové
  nádraží Žižkov and Ohrada from the night of 10 October to 18 December for the final, northern
  700 m of the Jana Želivského line, and the second phase of the Olšanská crossing rebuild connects
  the new Jarov line to the network. Two sources (DPP release, Expats.cz/ČTK); they agree on dates,
  lines and replacement buses, with Expats adding bus routes 133/908/909 and the 9 November change
  at Biskupcova. No disagreement found.
- **`cd-commuter-shortage-maintenance-measures`** (transport) — ČD's answer to a second round of
  short peak trains: 23 CityElefants out of a needed 57 on Monday, five RegioPanters out as well,
  the Central Bohemian Region threatening maximum contractual penalties, and a list of maintenance
  and passenger-information changes. Follow-up to `cityelefant-shortage-prague-commuter-trains`
  (12 September) with new facts, not a repeat: the commitments and the penalty figures (46 m CZK
  last year, 31 m imposed in H1 2026) are new. Single source (Expats.cz/ČTK).
- **`airport-check-in-platforms-sita-contract`** (transport) — a 195-million-crown, six-year
  contract to SITA for the platform behind every check-in and transfer desk and departure gate, live
  April 2027: 450 computer terminals, 35 self-service kiosks, twelve bag-drop units replaced at
  T2 and eight added at T1. Single source (Zdopravy.cz), with a named airport spokeswoman.

### Released to the archive — 3

Oldest first, as `release.mjs` orders it. Two were banked on 8 October:

- `libus-nove-dvory-tram-construction-start` (queued 2026-10-08) — **featured**, the day's lead: a
  new tram line under construction, 1.8 km for 1.26 bn CZK.
- `opatov-park-and-ride-opens` (queued 2026-10-08)
- `airport-check-in-platforms-sita-contract` (queued today)

All three are transport, because the whole queue is transport. The desk-mix guard in `release.mjs`
had nothing else to reach for, and nothing non-transport cleared the bar today either (see below).

### Skipped, with reasons

- **Nové tramvajové zastávky Hodkovičky ode dneška slouží cestujícím** (DPP) and **Obrazem: Praha má
  novou zastávku na problematické tramvajové „rychlodráze“. Vyšla na 30 milionů** (Zdopravy) — the
  same story, and already published as `hodkovicky-tram-stop-opens` (30 September), which carried
  the opening date and the cost. The stop opening on the announced day is a progress note; the
  30 m CZK figure is the 27 m excl. VAT we already printed, with VAT on it.
- **Petřínská lanovka dnes po dvou letech obnovila provoz** (DPP) — covered three times already:
  `petrin-funicular-reopens-22-september`, `petrin-funicular-returns-fourth-generation`,
  `petrin-funicular-stations-rebuild-schedule`.
- **Praha 7 modernizuje školní budovy a začne stavět novou školu pro 570 žáků** (Praha 7) — fetched.
  A district works roundup (roofs, wiring, a school atrium) with the Jana Vodňanského school
  attached. Nothing decided since `jankovcova-school-loan-approved` (15 September), which carried
  the 903 m CZK cost and the financing: demolition is under way and the contractor tender is still
  running, and the source gives no cost, completion date or tender result. The award is the story,
  and it has not happened.
- **Nová tvář Výstaviště: Střešní běžecká dráha, otevřený areál a obnovený Průmyslový palác**
  (praha.camp) — fetched. A retrospective magazine feature on work already finished; the
  Průmyslový palác reopening is `prumyslovy-palac-reopens` (25 September). Nothing has changed since.
- **Rozhodni o Praze! Praha v památkových sporech** (Klub Za starou Prahu) — fetched. Despite the
  title, an announcement of NPÚ school education programmes and a teachers' seminar on 5 November.
  Names no dispute and no building. Event notice.
- **DPP o prodlouženém víkendu vymění další pražce na trati C** — a weekend works window on metro C.
  Would not be worth reading in a month.
- **SŽ povolává do Krče další tanky** and **Hasiči uvolnili kamion zaseklý pod viaduktem v Krči**
  (Zdopravy) — incidents under the Krč viaduct, not the built environment changing.
- **Tatry za hodinu a pod tisícovku. Wizz Air začne létat z Prahy do Popradu** (Zdopravy) — airline
  route business, tagged transport by the relevance score. Not the built environment.
- **Mobilní informační centrum PID Point: Jízdní řády na říjen** and **Pozvánka na prodloužený víkend
  s PID** — a notice and an events programme.
- **Sedmička jde na Designblok se slevou**, **Dětské skupiny se rozšířily o dvanáct míst**,
  **Kolíčkový den**, **Radnice umístila nové pingpongové stoly k dětským hřištím**, **Poznejte
  živočichy v parku Stromovka**, **V Portheimce si můžete zahrát šachy pod širým nebem**,
  **TZ: Praha 10 zmodernizovala a otevřela dopravní hřiště V Olšinách** — district newsletter items:
  events, nursery places, ping-pong tables, a traffic playground. None would matter to a reader in
  another district.
- **PONDĚLNÍ PŘEDNÁŠKY OBNOVENY** (Klub Za starou Prahu) — a lecture series resuming.

### Notes for a human

- **`archiweb.cz` returned HTTP 429 for the second day running** (also 429 on 8 October). This is
  rate limiting, not rotten markup, so the adapter in `scripts/sources/` is probably fine — but two
  consecutive days means the listing is going unread, and archiweb is where the ČTK planning and
  development wire reaches us. Worth checking whether the scan is being throttled by request rate or
  by IP, and whether a delay or a conditional request would clear it. Everything else fetched.
- No wrong-city false positive found in the digest this morning.
- Geocoding reached Nominatim; `Basilejské náměstí` and two others were added to `data/places.json`.
