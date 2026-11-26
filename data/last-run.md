# Scan log — 2026-11-26

Scanned `2026-11-26T06:05:10.409Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 3 new of 40 (0 off-topic, 0 covered, 37 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 0 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 4 new of 10 (0 off-topic, 0 covered, 6 outside window)
- ✓ **PID / ROPID** — 1 new of 10 (5 off-topic, 0 covered, 4 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✗ **Stavba** — fetch failed
- ✗ **ArchDaily** — fetch failed
- ✗ **Dezeen** — fetch failed
- ✓ **Zdopravy.cz** — 3 new of 40 (37 off-topic, 0 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 2 new of 25 (23 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 8 new of 32 (24 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (6 off-topic, 0 covered, 4 outside window)

## Candidates — 24 in 23 clusters

1. `25` transport — Významná dopravní opatření v Praze 4 související se stavbou metra D a dalšími návaznými projekty
2. `24` development — Prague’s Abandoned Vyšehrad Station Begins Its Transformation Into Apartments
3. `24` architecture — Přehled akcí na tento týden
4. `23` planning — V parku Sacre Coeur stojí nová kaplička
5. `22` public-space — Na kluzišti se proháněl i Asterix s Obelixem
6. `20` public-space — Revitalizace Kampy má začít v březnu 2027. Park zůstane průchozí
7. `19` architecture — POZVÁNKA: III. veřejné (opakované) představení vítězného návrhu na obnovu náměstí Svatopluka Čecha
8. `17` architecture _[2 sources]_ — Knižní hostina v industriální hale. Centrum architektury a městského plánování otevírá nové prostory v Karlíně
9. `17` transport — Vánoční flotila DPP i letos rozzáří Prahu. Do pražských ulic vyjede v sobotu 28. listopadu
10. `14` transport — Změny ve vedení dozorčí rady DPP
11. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na listopad a prosinec
12. `14` transport — Dopravní opatření v pražské MHD v souvislosti s veřejnými akcemi 15. a 17. listopadu
13. `14` planning — Čím lépe pochopíme, co se děje za Prahou, tím lépe dokážeme plánovat uvnitř metropole, říká ředitel Sekce metropolitního plánování Michal Leňo
14. `13` transport — Blíží se další den D pro železniční most na Výtoni. Ministr dává od rozhodnutí ruce pryč, avšak naznačuje
15. `12` planning — Praha 5 má nové vedení
16. `12` transport — Chybějící elektrobusy, zelené zóny i cyklopruhy. Praha patří v emisních opatřeních v dopravě na Balkán
17. `11` transport — Chceme jasná pravidla pro objížděče kolon. Praha 6 se brání soudnímu zrušení jednosměrky
18. `10` public-space — Prague’s Kampa park renovation starts in March, with lawns temporarily closed
19. `10` development — Praha 7 zlepšuje dostupnost lékařské péče
20. `10` planning — PONDĚLKY • Jane Jacobs a Nový urbanismus
21. `10` planning — Praha 1 zvolila vedení radnice, starostkou zůstává Terezie Radoměřská
22. `9` development — Město jako houba: Kam zmizí déšť, když zaprší?
23. `6` public-space — Prague warns dog owners of hidden danger lurking in Stromovka park


## Decisions

Nothing written; queue empty, so nothing released. A day with none.

Source errors:
- archiweb.cz — HTTP 429 again (25 Nov, 23 Nov and earlier). Rate-limited rather than a markup change, but it has now been out for several consecutive runs and needs a human look.
- Stavba, ArchDaily, Dezeen — "fetch failed" for the second day running (adapters merged 25 Nov, PR #40). Almost certainly their hosts are missing from the environment's egress allowlist; needs a human to add them. The architecture desk is effectively running without these three.

Skipped:
- Praha 6 files a cassation complaint over the Na Krutci one-way (Zdopravy, 25 Nov) — new today and contested, but the measure itself was a trial peak-hour traffic restriction that the Municipal Court annulled on the Central Bohemian Region's application; the appeal asks the Supreme Administrative Court for guidance rather than deciding anything. Single source. Write it when the NSS rules, which is what will set the rules for regulating transit traffic.
- CAMP opens in Karlín, Pobřežní 20a (IPR + CAMP, 24 Nov, 2 sources) — temporary relocation during the Pragerovy kostky reconstruction plus two exhibitions: the institution about itself, and an exhibition opening. The reconstruction of the Prager buildings would be the story, when there is a decision or milestone in it.
- Změny ve vedení dozorčí rady DPP (DPP, 25 Nov) — people: a supervisory-board chair resigning, no decision attached.
- Praha 7 medical offices in Janovského (Praha 7) — a building permit for consulting rooms; local administrative detail that would not matter to a reader in another district.
- Vyšehrad station redevelopment (Prague Morning, 23 Nov) — unchanged since yesterday: preparatory works only, main construction March 2027, single source paraphrasing the developer with a unit count (138) that disagrees with earlier Czech reporting. Write it when main construction starts.
- Kampa revitalisation from March 2027 (Praha 1, 24 Nov; Expats.cz, now a second outlet) — still the works schedule for the contract covered 18 Sep (`kampa-park-uohs-clears-contract`); no new decision. Write it when construction starts.
- Výtoň railway bridge "den D" (Zdopravy) — decision still pending. Write it when SŽ decides.
- Praha "na Balkáně" in transport emissions measures (Zdopravy) — an NGO comparison ranking, not a decision.
- Sacre Coeur park chapel (Praha 5) — a participatory-budget shrine blessed; minor and local.
- Praha 5 and Praha 1 elect their councils — people, no decision.
- Christmas trams, PID Point timetables, 15/17 Nov event diversions, Praha 4 Metro D traffic measures, Advent na Sedmičce, the ice rink, the weekly events list, CAMP lectures, the Michal Leňo interview, the rain-as-sponge explainer, the Stromovka dog warning — seasonal, events, temporary disruption, interviews or explainers, none a decision.
