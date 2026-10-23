# Scan log — 2026-10-23

Scanned `2026-10-23T05:15:48.442Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 3 new of 40 (0 off-topic, 0 covered, 37 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 1 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 2 new of 10 (0 off-topic, 4 covered, 4 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (3 off-topic, 1 covered, 3 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 1 new of 40 (37 off-topic, 2 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 5 new of 36 (31 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (2 off-topic, 0 covered, 8 outside window)

## Candidates — 18 in 18 clusters

1. `31` transport — V Praze se staví pět tramvajových tratí současně. Nové koleje míří na Strahov i Nové Dvory
2. `30` transport — Tři nová parkoviště P+R: Opatov, Modřany a Uhříněves
3. `27` transport — Prague Expands Tram Network With Five Projects Underway
4. `26` transport — Nové tramvajové zastávky Hodkovičky ode dneška slouží cestujícím
5. `24` transport — Noční omezení tramvají v úseku Nádraží Holešovice – Ke Stírce 23. října
6. `18` transport — Den otevřených dveří DPP ve vozovně Pankrác již tuto sobotu
7. `17` public-space — Stání za 1,6 milionu. Parkovací dům v Brně na Vinohradech má pojmout i přízemní obchody
8. `16` transport — Z odříznutého dopravního uzlu propojená čtvrť. Návrh studia CHYBÍK + KRIŠTOF mění Holešovice
9. `15` architecture — Kámen zmizelých ve Veletržní 6
10. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen
11. `13` transport — Pozor na omezení v Nádražní
12. `13` transport — VideoRekonstrukce pražského smíchovského nádraží je v polovině, vyjde na miliardy
13. `12` architecture — Praha 1 otevře 23. listopadu příjem žádostí o dotace na kulturu, sport, spolky a kulturní dědictví
14. `12` planning — V IPR Praha vznikla Sekce koordinace. Propojuje plánování i povolování projektů
15. `12` transport — Stavební úpravy zastávky Strossmayerovo náměstí
16. `11` development — Nová tvář Výstaviště: Střešní běžecká dráha, otevřený areál a obnovený Průmyslový palác
17. `7` planning — Kompromis není prohra, říká ředitelka Sekce koordinace Kristýna Lhotská
18. `6` development — PONDĚLNÍ PŘEDNÁŠKY OBNOVENY


## Decisions

### Written (0)

Nothing cleared the bar. Of 18 candidates, 17 were carried over unchanged from 22 Oct, and the one
new item was in Brno.

### Released (0)

The queue was empty and nothing was written, so `release.mjs` had nothing to release. Queue depth
after the run: **0**. The front page keeps 21 October's three.

### Skipped: new today

- `17` **Parkovací dům v Brně na Vinohradech** (Zdopravy) — a six-storey car park, 616 million Kč
  before VAT. It is in Brno-Vinohrady, not Prague. The filter matched it on the district name
  "Vinohrady". The headline says "v Brně", but the city veto missed it for two reasons. The
  locative "Brně" does not contain the stem `brno`. And the tag "Magistrát města Brna" counted
  "magistrát" as evidence of Prague. Both are fixed in `scripts/lib/relevance.mjs`, in a separate
  commit: `v brne` is now on the other-cities list, and `magistrat` / `metropole` no longer count
  as Prague when another city is named. I ran today's digest through the old and new code. This
  is the only item whose result changes.

### Skipped: unchanged from 22 Oct

- `31` / `27` five tram lines roundup, `30` three P+R car parks, `26` Hodkovičky, `24` Holešovice –
  Ke Stírce night closure, `18` DPP open day, `16` Nové Holešovice CHYBÍK + KRIŠTOF feature, `15`
  Stolperstein Veletržní 6, `14` PID Point, `13` Nádražní closure, `13` Smíchov station video, `12`
  Praha 1 grants, `12` IPR Sekce koordinace, `12` Strossmayerovo náměstí, `11` Nová tvář
  Výstaviště, `7` Lhotská interview, `6` Klub Za starou Prahu lectures: the reasons are in the logs
  for 22, 21 and 18 Oct. Nothing in any of them has changed since.

### Notes for a human

- **archiweb.cz: HTTP 429 again.** It has failed every run since 22 September, so for over a month
  there has been no architecture wire. The adapter needs a look, or the rate limit needs lifting.
- **The queue has been empty for three days running.** Nothing has been published since 21 Oct.
  The sources are reporting (every adapter except archiweb returned items), but they are carrying
  nothing new.
- **iROZHLAS** returned 0 new of 40 today (all 40 off-topic). That is normal for a national outlet.
- The **Hodkovičky cost figure** in `hodkovicky-tram-stop-opens` is still uncorrected (see 14 Oct).
