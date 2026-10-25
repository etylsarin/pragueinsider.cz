# Scan log — 2026-10-25

Scanned `2026-10-25T05:07:18.157Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 3 new of 40 (0 off-topic, 0 covered, 37 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 1 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 2 new of 10 (0 off-topic, 4 covered, 4 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (5 off-topic, 1 covered, 1 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 3 new of 40 (36 off-topic, 1 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 2 new of 10 (8 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 3 new of 28 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (3 off-topic, 0 covered, 7 outside window)

## Candidates — 19 in 19 clusters

1. `31` transport — V Praze se staví pět tramvajových tratí současně. Nové koleje míří na Strahov i Nové Dvory
2. `30` transport — Tři nová parkoviště P+R: Opatov, Modřany a Uhříněves
3. `27` transport — Prague Expands Tram Network With Five Projects Underway
4. `26` transport — Nové tramvajové zastávky Hodkovičky ode dneška slouží cestujícím
5. `18` transport — Den otevřených dveří DPP ve vozovně Pankrác již tuto sobotu
6. `16` transport — Z odříznutého dopravního uzlu propojená čtvrť. Návrh studia CHYBÍK + KRIŠTOF mění Holešovice
7. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen a listopad
8. `13` transport — Pozor na omezení v Nádražní
9. `13` transport — VideoRekonstrukce pražského smíchovského nádraží je v polovině, vyjde na miliardy
10. `12` architecture — Praha 1 otevře 23. listopadu příjem žádostí o dotace na kulturu, sport, spolky a kulturní dědictví
11. `12` planning — V IPR Praha vznikla Sekce koordinace. Propojuje plánování i povolování projektů
12. `11` development — Nová tvář Výstaviště: Střešní běžecká dráha, otevřený areál a obnovený Průmyslový palác
13. `11` public-space — Staroměstské náměstí v Praze o Vánocích ozdobí 23 metrů vysoký smrk z Podještědí
14. `10` transport — Tatry, Alpy i Kambodža. Z Prahy se bude v zimě létat do 145 destinací
15. `9` transport — Podcast: Pokud nepřijde mýto, lidé v centru Prahy budou platit časem, říká Filip Hájek z TSK
16. `9` transport — Parkování v zónách placeného stání v den státního svátku 28. 10. 2026
17. `7` transport — Lašák končí v čele Letiště Praha, na pozici šéfa nevydržel ani tři měsíce
18. `7` planning — Kompromis není prohra, říká ředitelka Sekce koordinace Kristýna Lhotská
19. `6` development — PONDĚLNÍ PŘEDNÁŠKY OBNOVENY


## Decisions

## Decisions

### Written (0)

Nothing new cleared the bar. Only one candidate in the digest was not there yesterday.

### Released (0)

The queue was empty before the run and `release.mjs` reported "Queue is empty." Nothing was
published today and no lead was set. The queue is **0** after the run.

### Skipped: new today

- `10` **Tatry, Alpy i Kambodža: winter flight schedule from Prague** (Zdopravy): airline route
  business at Letiště Praha. It is not the city's built environment and nothing in Prague is
  changed or decided by it.

### Skipped: unchanged from 22–24 Oct

- `31` / `27` five-tram-lines roundup, `30` three P+R car parks, `26` Hodkovičky, `18` DPP open day
  (now past), `16` Nové Holešovice CHYBÍK + KRIŠTOF feature, `14` PID Point, `13` Nádražní closure,
  `13` Smíchov station video, `12` Praha 1 grants, `12` IPR Sekce koordinace, `11` Nová tvář
  Výstaviště, `11` Staroměstské náměstí Christmas tree, `9` Hájek / TSK podcast, `9` Praha 10
  parking on 28 Oct, `7` Lašák leaves Letiště Praha, `7` Lhotská interview, `6` Klub Za starou
  Prahu lectures. The reasons are in the logs for 18 and 21–24 Oct, and none of these items has
  changed since.

### Notes for a human

- **archiweb.cz: HTTP 429 again.** It has failed every run since 22 September, so there is still no
  architecture wire. The adapter or the request rate needs a look. Waiting it out is not working.
- **Queue empty, and nothing published today.** This is the second day running that the digest
  carries almost nothing new. The per-source counts look like a quiet weekend, not a broken scan:
  every source except archiweb answered.
- Still open from earlier logs: the "northern/southern branch" labelling in
  `vrt-vrsovice-bechovice-design-tender` (see 24 Oct), and the Hodkovičky cost figure in
  `hodkovicky-tram-stop-opens` (see 14 Oct).
