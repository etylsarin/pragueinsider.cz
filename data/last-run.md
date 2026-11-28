# Scan log — 2026-11-28

Scanned `2026-11-28T06:05:26.956Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 3 new of 40 (0 off-topic, 0 covered, 37 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 0 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 4 new of 10 (0 off-topic, 0 covered, 6 outside window)
- ✓ **PID / ROPID** — 2 new of 10 (6 off-topic, 0 covered, 2 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✗ **Stavba** — fetch failed
- ✗ **ArchDaily** — fetch failed
- ✗ **Dezeen** — fetch failed
- ✓ **Zdopravy.cz** — 1 new of 40 (38 off-topic, 1 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 1 new of 40 (39 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 6 new of 32 (26 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (5 off-topic, 0 covered, 5 outside window)

## Candidates — 19 in 18 clusters

1. `25` transport — Významná dopravní opatření v Praze 4 související se stavbou metra D a dalšími návaznými projekty
2. `24` architecture — Přehled akcí na tento týden
3. `22` public-space — Na kluzišti se proháněl i Asterix s Obelixem
4. `20` public-space — Revitalizace Kampy má začít v březnu 2027. Park zůstane průchozí
5. `19` transport — PID posílí pražskou MHD během adventních víkendů, častěji pojedou také autobusy na letiště
6. `18` transport — Mikuláš s čertem a andělem vyrazí vlakem na cestu po Praze a okolí. Připraven je doprovodný program
7. `17` architecture _[2 sources]_ — Knižní hostina v industriální hale. Centrum architektury a městského plánování otevírá nové prostory v Karlíně
8. `17` transport — Vánoční flotila DPP i letos rozzáří Prahu. Do pražských ulic vyjede v sobotu 28. listopadu
9. `14` transport — Změny ve vedení dozorčí rady DPP
10. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na listopad a prosinec
11. `14` transport — Dopravní opatření v pražské MHD v souvislosti s veřejnými akcemi 15. a 17. listopadu
12. `14` planning — Čím lépe pochopíme, co se děje za Prahou, tím lépe dokážeme plánovat uvnitř metropole, říká ředitel Sekce metropolitního plánování Michal Leňo
13. `12` planning — Praha 5 má nové vedení
14. `10` transport — Ani letenky za pár stovek zřejmě nestačily. Ryanair vyřadil z nabídky linku z Prahy do Poznaně
15. `10` public-space — Ošetření stromů na Ortenově náměstí
16. `10` development — Praha 7 zlepšuje dostupnost lékařské péče
17. `10` planning — PONDĚLKY • Jane Jacobs a Nový urbanismus
18. `9` development — Město jako houba: Kam zmizí déšť, když zaprší?


## Decisions

Wrote 0, released 0. Queue empty before and after.

Only three candidates are new since 27 Nov; all fail the bar. The rest were weighed yesterday and nothing has changed since.

Source errors:
- archiweb.cz — HTTP 429 again (27, 26, 25 Nov and earlier). Rate-limited, not markup.
- Stavba, ArchDaily, Dezeen — "fetch failed" on every run since they were added (PR #40). Almost certainly missing from the environment egress allowlist; needs a human.

Skipped (new today):
- Mikuláš train around Prague (iROZHLAS) — seasonal event.
- Ryanair drops Prague–Poznań (Zdopravy) — airline route, operator business.
- Tree treatment on Ortenovo náměstí (Praha 7) — routine maintenance notice.

Skipped (unchanged since 27 Nov):
- Kampa revitalisation from March 2027 (Praha 1) — schedule for a contract covered 18 Sep; write at construction start.
- Metro D traffic measures in Praha 4 (DPP) — temporary measures, covered 11 Nov.
- PID advent weekends, DPP Christmas fleet, PID Point timetable, 15/17 Nov MHD measures — seasonal, notices, past diversions.
- DPP supervisory board changes, Praha 5 new leadership — people, no decision.
- CAMP opens Karlín premises (IPR + CAMP) — institution talking about itself.
- Praha 7 doctors' surgeries — local service, no cross-district interest.
- Praha 5 events list and rink, Za starou Prahu Jane Jacobs lecture — events.
- Michal Leňo interview, "Město jako houba" (CAMP) — features; nothing decided.
