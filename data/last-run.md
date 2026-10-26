# Scan log — 2026-10-26

Scanned `2026-10-26T05:17:37.582Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 3 new of 40 (0 off-topic, 0 covered, 37 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 0 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 2 new of 10 (0 off-topic, 3 covered, 5 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (5 off-topic, 1 covered, 1 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 6 new of 40 (33 off-topic, 1 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 5 new of 36 (31 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (2 off-topic, 0 covered, 8 outside window)

## Candidates — 22 in 22 clusters

1. `31` transport — V Praze se staví pět tramvajových tratí současně. Nové koleje míří na Strahov i Nové Dvory
2. `30` transport — Tři nová parkoviště P+R: Opatov, Modřany a Uhříněves
3. `27` transport — ŘSD se brání pokutě za soutěž na podobu dálničního mostu přes Vltavu. Vázne i výběr pro Drahaňské údolí
4. `26` transport — Nové tramvajové zastávky Hodkovičky ode dneška slouží cestujícím
5. `24` transport — Noční omezení tramvají v úseku Nádraží Holešovice – Ke Stírce 23. října
6. `18` transport — Den otevřených dveří DPP ve vozovně Pankrác již tuto sobotu
7. `16` transport — Z odříznutého dopravního uzlu propojená čtvrť. Návrh studia CHYBÍK + KRIŠTOF mění Holešovice
8. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen a listopad
9. `13` transport — Pozor na omezení v Nádražní
10. `12` transport — Konkurence pro Airport Express. Letiště a hlavní nádraží propojí BusAir, bude výrazně levnější
11. `12` architecture — Praha 1 otevře 23. listopadu příjem žádostí o dotace na kulturu, sport, spolky a kulturní dědictví
12. `12` planning — V IPR Praha vznikla Sekce koordinace. Propojuje plánování i povolování projektů
13. `12` transport — Stavební úpravy zastávky Strossmayerovo náměstí
14. `11` development — Nová tvář Výstaviště: Střešní běžecká dráha, otevřený areál a obnovený Průmyslový palác
15. `11` public-space — Staroměstské náměstí v Praze o Vánocích ozdobí 23 metrů vysoký smrk z Podještědí
16. `10` transport — Z Prahy se opět létá do Tater. První let na lince do Popradu byl plný
17. `10` transport — Tatry, Alpy i Kambodža. Z Prahy se bude v zimě létat do 145 destinací
18. `9` transport — Podcast: Pokud nepřijde mýto, lidé v centru Prahy budou platit časem, říká Filip Hájek z TSK
19. `9` transport — Parkování v zónách placeného stání v den státního svátku 28. 10. 2026
20. `7` transport — Lašák končí v čele Letiště Praha, na pozici šéfa nevydržel ani tři měsíce
21. `7` planning — Kompromis není prohra, říká ředitelka Sekce koordinace Kristýna Lhotská
22. `6` development — PONDĚLNÍ PŘEDNÁŠKY OBNOVENY


## Decisions

### Written (2)

- `27` **ŘSD sues over the ÚOHS fine for the Suchdol Vltava bridge competition; Drahaň valley bridge
  winner still unconfirmed** (Zdopravy) → `prague-ring-road-bridges-fine-and-pending-choice`.
  Contested and formal: a 220,000 Kč fine, a lawsuit, a ministry decision due by end of November, and
  the D0 519 documentation slipping to Q1 2027. Builds on the 23 Sep D0 518 piece without repeating
  it. Pinned at Drahaňské údolí (Praha 8). Single source; every figure attributed to Zdopravy.
- `12` **BusAir starts competing with Airport Express** (Zdopravy) →
  `busair-airport-line-undercuts-airport-express`. A service opens today (26 Oct), 125 Kč against DPP's
  200 Kč, on the route DPP doubled in January. The operator quote is flagged as the company on its own
  product. Pinned at the airport (Praha 6 – Ruzyně).

### Released (2)

Both of today's stories. `release.mjs` released 2 of 2. **Lead:** the ring-road bridges piece
(`featured: true`), as the contested story. The queue is **0** after the run.

### Skipped: new today

- `24` **Night tram closure Nádraží Holešovice – Ke Stírce, 23 Oct** (Praha 7): one night of track
  maintenance, already past. A notice, not a story.
- `12` **Strossmayerovo náměstí stop rebuild** (Praha 7): a wider, step-free boarding island at one
  stop. Fails the other-district test; local works with no decision behind them.
- `10` **First Prague–Poprad flight full** (Zdopravy): airline route business, not the city's built
  environment.

### Skipped: unchanged from earlier runs

- `31` five tram lines roundup, `30` three P+R car parks, `26` Hodkovičky, `18` DPP open day (past),
  `16` Nové Holešovice CHYBÍK + KRIŠTOF feature, `14` PID Point, `13` Nádražní closure, `12` Praha 1
  grants, `12` IPR Sekce koordinace, `11` Nová tvář Výstaviště, `11` Staroměstské náměstí Christmas
  tree, `10` winter flight schedule, `9` Hájek / TSK podcast, `9` Praha 10 parking on 28 Oct, `7`
  Lašák leaves Letiště Praha, `7` Lhotská interview, `6` Klub Za starou Prahu lectures. Reasons are in
  the logs for 18 and 21–25 Oct; none has changed.

### Notes for a human

- **archiweb.cz: HTTP 429 again.** Failing every run since 22 September. Still no architecture
  wire; the adapter or its request rate needs a look.
- **Queue empty again** after today's release. Both stories today are transport and single-source
  (Zdopravy); no development, planning or public-space candidate in the digest cleared the bar.
