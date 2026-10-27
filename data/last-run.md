# Scan log — 2026-10-27

Scanned `2026-10-27T05:10:32.680Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 3 new of 40 (0 off-topic, 0 covered, 37 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 0 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 3 new of 10 (0 off-topic, 3 covered, 4 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (6 off-topic, 1 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 4 new of 40 (33 off-topic, 3 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 5 new of 34 (29 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (2 off-topic, 0 covered, 8 outside window)

## Candidates — 22 in 22 clusters

1. `31` transport — V Praze se staví pět tramvajových tratí současně. Nové koleje míří na Strahov i Nové Dvory
2. `30` transport — Tři nová parkoviště P+R: Opatov, Modřany a Uhříněves
3. `26` transport — Nové tramvajové zastávky Hodkovičky ode dneška slouží cestujícím
4. `24` transport — Noční omezení tramvají v úseku Nádraží Holešovice – Ke Stírce 23. října
5. `22` transport — Prague Tram Disruptions Will Affect Six Lines During Autumn School Break
6. `18` transport — Den otevřených dveří DPP ve vozovně Pankrác již tuto sobotu
7. `17` transport — Úpravy kolejiště, přeložky i první nádražní dřevostavba. Jak se rodí nová trať Praha – Kladno
8. `17` public-space — Dobrodružné hřiště v rámci Spotu má otevřeno až do 13. prosince
9. `16` transport — Z odříznutého dopravního uzlu propojená čtvrť. Návrh studia CHYBÍK + KRIŠTOF mění Holešovice
10. `15` transport — DPP plánuje nákup až 140 nových bateriových trolejbusů
11. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen a listopad
12. `13` transport — Trolejbusový boom v Praze pokračuje. DPP vypsal tendr až na 140 vozů, počítá i se 40 dalšími z Turecka
13. `13` transport — Pozor na omezení v Nádražní
14. `12` architecture — Praha 1 otevře 23. listopadu příjem žádostí o dotace na kulturu, sport, spolky a kulturní dědictví
15. `12` planning — V IPR Praha vznikla Sekce koordinace. Propojuje plánování i povolování projektů
16. `11` development — Nová tvář Výstaviště: Střešní běžecká dráha, otevřený areál a obnovený Průmyslový palác
17. `11` public-space — Staroměstské náměstí v Praze o Vánocích ozdobí 23 metrů vysoký smrk z Podještědí
18. `10` transport — Z Prahy se opět létá do Tater. První let na lince do Popradu byl plný
19. `10` transport — Tatry, Alpy i Kambodža. Z Prahy se bude v zimě létat do 145 destinací
20. `9` transport — Parkování v zónách placeného stání v den státního svátku 28. 10. 2026
21. `7` planning — Kompromis není prohra, říká ředitelka Sekce koordinace Kristýna Lhotská
22. `6` development — PONDĚLNÍ PŘEDNÁŠKY OBNOVENY


## Decisions

### Written (1)

- `15`/`13` **DPP tenders up to 140 battery trolleybuses** (DPP press release + Zdopravy, two clusters
  for one story, written once) → `dpp-tenders-140-battery-trolleybuses`. Money committed: a five-year
  framework worth an estimated CZK 2.64 bn excl. VAT, EU co-financed. Contested angle: it re-runs the
  180-vehicle tender ÚOHS cancelled after Bozankaya's complaint, and the supplier-experience criterion
  has been replaced by type approval. The two sources agree on every figure; the route list beyond DPP's
  own examples (150, 158, 184) is attributed to Zdopravy. Citywide fleet tender, so no pin.

### Released (1)

`release.mjs` released 1 of 1. **Lead:** the trolleybus tender (`featured: true`), the only release.
The queue is **0** after the run.

### Skipped: new today

- `22` **Tram disruptions during the autumn school break** (Prague Morning): a five-day suspension
  I. P. Pavlova – Otakarova from 28 Oct. A works notice for one week, not a story in a month.
- `17` **How the Praha – Kladno line is being built** (Zdopravy): a six-month progress note on the
  CZK 8.3 bn Ruzyně – Kladno upgrade. Nothing decided; the one slip it reports (the timber station
  building, now February) is in Kladno, outside Prague.
- `17` **Spot Holešovice adventure playground open until 13 Dec** (Praha 7): opening hours for a
  temporary playground. An event notice; fails the other-district test.

### Skipped: unchanged from earlier runs

- `31` five tram lines roundup, `30` three P+R car parks, `26` Hodkovičky, `24` Holešovice night
  closure (past), `18` DPP open day (past), `16` Nové Holešovice CHYBÍK + KRIŠTOF feature, `14` PID
  Point, `13` Nádražní closure, `12` Praha 1 grants, `12` IPR Sekce koordinace, `11` Nová tvář
  Výstaviště, `11` Staroměstské náměstí Christmas tree, `10` Poprad flight, `10` winter flight
  schedule, `9` Praha 10 parking on 28 Oct, `7` Lhotská interview, `6` Klub Za starou Prahu lectures.
  Reasons are in the logs for 18 and 21–26 Oct; none has changed. (The ring-road bridges and BusAir
  stories dropped out of the digest after yesterday's run, as they should have.)

### Notes for a human

- **archiweb.cz: HTTP 429 again.** Failing every run since 22 September. Still no architecture wire;
  the adapter or its request rate needs a look.
- **Queue empty again** after today's release. Today's only story is transport. No development,
  planning or public-space candidate in the digest cleared the bar.

