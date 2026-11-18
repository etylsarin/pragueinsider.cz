# Scan log — 2026-11-18

Scanned `2026-11-18T05:17:48.101Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 2 new of 40 (0 off-topic, 0 covered, 38 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 0 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 2 new of 10 (1 off-topic, 1 covered, 6 outside window)
- ✓ **PID / ROPID** — 2 new of 10 (4 off-topic, 0 covered, 4 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 2 new of 40 (38 off-topic, 0 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 1 new of 40 (39 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 2 new of 25 (23 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 6 new of 33 (27 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (4 off-topic, 0 covered, 6 outside window)

## Candidates — 18 in 17 clusters

1. `25` transport — Významná dopravní opatření v Praze 4 související se stavbou metra D a dalšími návaznými projekty
2. `23` transport _[2 sources]_ — Dopravní opatření v souvislosti s oslavami 17. listopadu
3. `23` transport — Opravy havárie kanalizační stoky v ulici Vrbenského
4. `20` transport — Na pražském hlavním nádraží se srazily osobní vlaky ČD. 46 zraněných, dráhy slibují odškodnění
5. `18` transport — Oči od displeje, pozornost do ulice. Kampaň oslovila školáky i rodiče přechodech v centru
6. `17` planning — Ustavující zastupitelstvo Prahy 1 se sejde 19. listopadu v Národním muzeu
7. `16` public-space — Kam vyrazit příští týden?
8. `14` transport — Změna v omezení na severu Prahy u D8. Uzavřou nájezd z Ďáblické, „objížděči“ vytvářeli větší kolony
9. `14` transport — Kvůli pádu člověka do kolejiště nejezdilo metro na části linky A v úseku Dejvická–Petřiny
10. `14` planning — Čím lépe pochopíme, co se děje za Prahou, tím lépe dokážeme plánovat uvnitř metropole, říká ředitel Sekce metropolitního plánování Michal Leňo
11. `13` public-space — Sedmička v barvách trikolory: připomínáme si 17. listopad
12. `13` transport — PID Point rozšiřuje své služby. Zamíří do škol i dalších obcí, nově přijímá pouze bezhotovostní platby
13. `10` transport — VIDEO: Officers rescue man from Prague metro tracks after platform fall
14. `10` development — Prague 6 unveils plans to transform historic Břevnov cultural center
15. `9` transport — Parkování v zónách placeného stání o státním svátku 17. listopadu
16. `9` development — Když se na hřbitově běhá: jak se mění poslední adresa Pražanů
17. `6` development — Hřbitovy jsou pro Pražany místem pro pietu i sport. Jejich vztah k pohřbívání se mění


## Decisions

**Written (2).**
- #4 Zdopravy — head-on collision of a CityElefant (Os 9409) and a RegioFox (Os 9507) on the bridge over Seifertova at U Bulhara, 17 Nov: 46 injured, four seriously; Drážní inspekce's preliminary cause a signal passed at danger; Praha hl. n. has no ETCS → `main-station-train-collision-no-etcs`. An incident rather than a decision, written because of its scale and the infrastructure gap it exposes (precedent: `airport-terminal-1-ceiling-falls-twice`). Single outlet, attributed throughout; no finding of fault stated. A web search turned up no second report yet. Pinned to U Bulhara (pick 2, the junction).
- #14 Expats.cz — Prague 6 approves the Kaštan competition result, Atelier bod architekti winning from 44 entries (nine finalists in February) → `brevnov-kastan-competition-bod-architekti`. A decision with a named architect. Single outlet: the Prague 6 release it links (praha6.cz) and echo24.cz are not on this environment's network allowlist, and archiweb.cz (which also carries it) is 429. Quotes exist only as Expats.cz's English renderings, so the Czech gives them as indirect speech. Pinned with `--set` to the OSM point of "Kaštan - scéna Unijazzu", Bělohorská.

**Released (2):** `main-station-train-collision-no-etcs` (lead, `featured: true`) and `brevnov-kastan-competition-bod-architekti`. Queue is empty (0).

**Skipped:**
- #1 DPP metro D traffic measures in Praha 4: already covered in `sulicka-closes-seven-months-metro-d`.
- #2 Praha 7 / DPP, transport measures for 15 and 17 November: one-off event diversions, fail the month test.
- #3 Praha 7, PVK repairing a collapsed trunk sewer in Vrbenského: works notice for a repair, nothing decided.
- #5 PID "3 sekundy… to je easy!" crossing campaign: a safety campaign, not the built environment.
- #6 Praha 1 constituent council meeting on 19 Nov: a meeting notice; the result (who becomes mayor) may be a story, the notice is not.
- #7 Praha 5 "Kam vyrazit příští týden?": events listing.
- #8 Zdopravy, TSK closes the Ďáblická on-ramp until 4 December during Cínovecká resurfacing: a two-and-a-half-week traffic measure, fails the month test.
- #9 iROZHLAS / #13 Expats.cz, a person falling onto metro tracks (line A; Náměstí Republiky): one-off incidents.
- #10 praha.camp interview with Michal Leňo: an interview, nothing decided.
- #11 Praha 7 tricolour ribbons for 17 November: decoration.
- #12 PID Point mobile info centre goes card-only and visits schools: service notice, mostly Central Bohemia.
- #15 Praha 10, paid-parking price cap on 17 November: one-day notice.
- #16 praha.camp / #17 IPR, cemeteries and how burial is changing: a feature on data and trends (urn-place shortage, 15 years' grave capacity); IPR adopts no plan or policy.

**Gazetteer:** a bare `geocode "Kaštan"` lookup recorded an unrelated "Kaštan" on Zakšínská in Střížkov (Praha 9); that entry was removed by hand before commit and replaced with `kastan brevnov`.

**Source errors:** archiweb.cz returned **HTTP 429 again**, as on every run since 22 September (blocks the PragueInsiderBot UA). **Still needs a human decision.** Every other source answered. Separately, www.praha6.cz and echo24.cz could not be reached from this environment (not on the egress allowlist).
