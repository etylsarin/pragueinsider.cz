# Scan log — 2026-11-25

Scanned `2026-11-25T06:05:36.910Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 2 new of 40 (0 off-topic, 0 covered, 38 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 0 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 3 new of 10 (0 off-topic, 0 covered, 7 outside window)
- ✓ **PID / ROPID** — 1 new of 10 (5 off-topic, 0 covered, 4 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✗ **Stavba** — fetch failed
- ✗ **ArchDaily** — fetch failed
- ✗ **Dezeen** — fetch failed
- ✓ **Zdopravy.cz** — 3 new of 40 (35 off-topic, 2 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 8 new of 34 (26 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (6 off-topic, 0 covered, 4 outside window)

## Candidates — 20 in 20 clusters

1. `25` transport — Významná dopravní opatření v Praze 4 související se stavbou metra D a dalšími návaznými projekty
2. `24` development — Prague’s Abandoned Vyšehrad Station Begins Its Transformation Into Apartments
3. `24` architecture — Přehled akcí na tento týden
4. `23` planning — V parku Sacre Coeur stojí nová kaplička
5. `22` public-space — Na kluzišti se proháněl i Asterix s Obelixem
6. `20` public-space — Revitalizace Kampy má začít v březnu 2027. Park zůstane průchozí
7. `19` architecture — POZVÁNKA: III. veřejné (opakované) představení vítězného návrhu na obnovu náměstí Svatopluka Čecha
8. `17` architecture — Knižní hostina v industriální hale. Centrum architektury a městského plánování otevírá nové prostory v Karlíně
9. `17` transport — Vánoční flotila DPP i letos rozzáří Prahu. Do pražských ulic vyjede v sobotu 28. listopadu
10. `16` public-space — Advent 2026 na Sedmičce
11. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na listopad a prosinec
12. `14` transport — Dopravní opatření v pražské MHD v souvislosti s veřejnými akcemi 15. a 17. listopadu
13. `14` planning — Čím lépe pochopíme, co se děje za Prahou, tím lépe dokážeme plánovat uvnitř metropole, říká ředitel Sekce metropolitního plánování Michal Leňo
14. `13` transport — Blíží se další den D pro železniční most na Výtoni. Ministr dává od rozhodnutí ruce pryč, avšak naznačuje
15. `13` transport — 480 parkovacích míst, která mají odlehčit provozu v Praze. Kraj začne soutěžit P+R u nádraží v Hostivici
16. `12` planning — Praha 5 má nové vedení
17. `12` transport — Chybějící elektrobusy, zelené zóny i cyklopruhy. Praha patří v emisních opatřeních v dopravě na Balkán
18. `10` planning — PONDĚLKY • Jane Jacobs a Nový urbanismus
19. `10` planning — Praha 1 zvolila vedení radnice, starostkou zůstává Terezie Radoměřská
20. `6` development — Město jako houba: Kam zmizí déšť, když zaprší?


## Decisions

Nothing written; queue empty, so nothing released. A day with none.

Source errors:
- archiweb.cz — HTTP 429 again (also 23 Nov and earlier): rate-limited, not a markup change, but it has been out for several runs.
- Stavba, ArchDaily, Dezeen — "fetch failed" on their first scheduled run (adapters merged today, PR #40). Almost certainly the environment's egress allowlist lacks their hosts; needs a human to add them. cc.cz (searched for corroboration) is also not allowed.

Skipped:
- Vyšehrad station redevelopment (Prague Morning, 23 Nov) — not yet a construction start: only preparatory work since late October, main works planned for March 2027. Single source paraphrasing the developer (Karlin Port Real Estate), no quotes, and its 138-unit figure disagrees with earlier Czech reporting (171, later 142 per CzechCrunch, which could not be fetched). Write it when main construction starts or a second outlet confirms the scheme as it now stands.
- Kampa revitalisation from March 2027 (Praha 1, 24 Nov) — works schedule for the contract covered 18 Sep (`kampa-park-uohs-clears-contract`); no new decision. Write it when construction starts.
- Výtoň railway bridge "den D" (Zdopravy) — decision still pending; minister only hints. Write it when SŽ decides.
- Hostivice P+R, 480 spaces (Zdopravy) — the Central Bohemian Region is about to tender, not yet tendered; the site is outside Prague.
- Prague's transport-emissions ranking (Zdopravy) — a comparative study; nothing decided.
- Metro D traffic measures in Praha 4 (DPP, 10 Nov) — covered 11 Nov (`sulicka-closes-seven-months-metro-d`).
- Svatopluka Čecha square, third presentation (Praha 10) — invitation to a repeat meeting on an already-covered design.
- CAMP opens new Karlín premises (IPR) — institution talking about itself.
- Sacre Coeur chapel (Praha 5) — participatory-budget shrine, local only.
- DPP Christmas fleet, PID Point timetable, 15/17 Nov MHD measures — seasonal, notice, past event diversions.
- Praha 5 new leadership, Praha 1 mayor re-elected — borough politics, no decision on the built environment.
- Praha 5 events list, Praha 5 rink, Praha 7 advent, Za starou Prahu Jane Jacobs lecture — events.
- Michal Leňo interview, "Město jako houba" (CAMP) — features; nothing changed.
