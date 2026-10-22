# Scan log — 2026-10-22

Scanned `2026-10-22T05:19:40.424Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 3 new of 40 (0 off-topic, 0 covered, 37 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 1 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 2 new of 10 (0 off-topic, 5 covered, 3 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (3 off-topic, 1 covered, 3 outside window)
- ✓ **Klub Za starou Prahu** — 2 new of 10 (0 off-topic, 0 covered, 8 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 1 new of 40 (37 off-topic, 2 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 1 new of 40 (39 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 7 new of 35 (28 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (2 off-topic, 0 covered, 8 outside window)

## Candidates — 22 in 22 clusters

1. `31` transport — V Praze se staví pět tramvajových tratí současně. Nové koleje míří na Strahov i Nové Dvory
2. `30` transport — Tři nová parkoviště P+R: Opatov, Modřany a Uhříněves
3. `27` transport — Prague Expands Tram Network With Five Projects Underway
4. `26` transport — Nové tramvajové zastávky Hodkovičky ode dneška slouží cestujícím
5. `24` transport — Noční omezení tramvají v úseku Nádraží Holešovice – Ke Stírce 23. října
6. `23` transport — Na Smíchově už vlaky zastavují u nových nástupišť. Cestujícím se otevřel i podchod
7. `19` transport — Oprava semaforů ovlivní dopravu
8. `18` transport — Den otevřených dveří DPP ve vozovně Pankrác již tuto sobotu
9. `16` transport — Z odříznutého dopravního uzlu propojená čtvrť. Návrh studia CHYBÍK + KRIŠTOF mění Holešovice
10. `16` architecture — Rozhodni o Praze! Praha v památkových sporech
11. `15` architecture — Kámen zmizelých ve Veletržní 6
12. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen
13. `13` transport — Pozor na omezení v Nádražní
14. `13` transport — VideoRekonstrukce pražského smíchovského nádraží je v polovině, vyjde na miliardy
15. `12` architecture — Architektonická studie za 230 tisíc. Chodov nechává vypracovat podobu zahrady u budoucího lycea
16. `12` architecture — Praha 1 otevře 23. listopadu příjem žádostí o dotace na kulturu, sport, spolky a kulturní dědictví
17. `12` planning — V IPR Praha vznikla Sekce koordinace. Propojuje plánování i povolování projektů
18. `12` transport — Stavební úpravy zastávky Strossmayerovo náměstí
19. `12` transport — Výkopy pro optický kabel v ulici Milady Horákové a okolí
20. `11` development — Nová tvář Výstaviště: Střešní běžecká dráha, otevřený areál a obnovený Průmyslový palác
21. `7` planning — Kompromis není prohra, říká ředitelka Sekce koordinace Kristýna Lhotská
22. `6` development — PONDĚLNÍ PŘEDNÁŠKY OBNOVENY


## Decisions

### Written (0)

Nothing new cleared the bar. There were four new candidates today and none of them reported a change
the archive did not already have.

### Released (0)

The queue was empty and nothing was written, so `release.mjs` had nothing to release. Queue depth
after the run: **0**. The front page keeps 21 October's three.

### Skipped: new today

- `30` **Three new P+R car parks: Opatov, Modřany, Uhříněves** (PID) — a roundup. Opatov (498 spaces,
  opened 8 Oct) is already covered in `opatov-park-and-ride-opens` (9 Oct). Modřany (52 surface
  spaces) opened in mid-September. Uhříněves is a 61-space extension still waiting for its occupancy
  permit. Nothing new happened at the Opatov site, and the other two are too small for a piece of
  their own.
- `16` **Nové Holešovice, CHYBÍK + KRIŠTOF design** (CAMP) — a feature on the competition result we
  covered in `nadrazi-holesovice-competition-chybik-kristof` (20 Sept). The piece itself calls the
  result a milestone, not a permit, and nothing has been decided since.
- `12` **Chodov commissions a 230,000 Kč garden study for a future lycée** (iROZHLAS) — a district
  commissioning a small design study for one school garden. It fails the other-district test.
  WebFetch got a 403 from iROZHLAS. A curl with a browser user-agent did return the page, but the
  desk did not extract the article text, so the skip rests on the scope of the story.
- `12` **Praha 1 opens grant applications on 23 Nov** (Praha 1) — a district grant scheme for
  culture, sport and associations. This is administration, not the built environment.

### Skipped: unchanged from 21 Oct

- `31` / `27` five tram lines roundup, `26` Hodkovičky, `24` Holešovice – Ke Stírce night closure,
  `23` / `13` Smíchov platforms, `19` Praha 5 signals, `18` DPP open day, `16` / `6` Klub Za starou
  Prahu programmes, `15` Stolperstein Veletržní 6, `14` PID Point, `13` Nádražní closure, `12` IPR
  Sekce koordinace, `12` Strossmayerovo náměstí, `12` Milady Horákové fibre trenches, `11` Nová tvář
  Výstaviště, `7` Lhotská interview: reasons as logged on 21 and 18 Oct.

### Notes for a human

- **archiweb.cz: HTTP 429 again.** It has failed every run since 22 September, now a full month, so
  there is still no architecture wire. Someone needs to look at the adapter or ask for the rate
  limit to be lifted.
- **The queue is empty for the second day running.** Tomorrow publishes only what tomorrow writes,
  and today wrote nothing.
- **iROZHLAS article pages return 403 to WebFetch.** A browser user-agent via curl does get the
  page, the same workaround as Zdopravy. Worth adding to the skill's note on Zdopravy.
- The **Hodkovičky cost figure** in `hodkovicky-tram-stop-opens` is still uncorrected (see 14 Oct).
