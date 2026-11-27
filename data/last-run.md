# Scan log — 2026-11-27

Scanned `2026-11-27T06:05:27.539Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 3 new of 40 (0 off-topic, 0 covered, 37 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 0 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 4 new of 10 (0 off-topic, 0 covered, 6 outside window)
- ✓ **PID / ROPID** — 2 new of 10 (5 off-topic, 0 covered, 3 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✗ **Stavba** — fetch failed
- ✗ **ArchDaily** — fetch failed
- ✗ **Dezeen** — fetch failed
- ✓ **Zdopravy.cz** — 1 new of 40 (39 off-topic, 0 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 1 new of 25 (24 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 6 new of 32 (26 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (4 off-topic, 0 covered, 6 outside window)

## Candidates — 20 in 19 clusters

1. `25` transport — Významná dopravní opatření v Praze 4 související se stavbou metra D a dalšími návaznými projekty
2. `24` development — Prague’s Abandoned Vyšehrad Station Begins Its Transformation Into Apartments
3. `24` architecture — Přehled akcí na tento týden
4. `22` public-space — Na kluzišti se proháněl i Asterix s Obelixem
5. `20` public-space — Revitalizace Kampy má začít v březnu 2027. Park zůstane průchozí
6. `19` transport — PID posílí pražskou MHD během adventních víkendů, častěji pojedou také autobusy na letiště
7. `17` architecture _[2 sources]_ — Knižní hostina v industriální hale. Centrum architektury a městského plánování otevírá nové prostory v Karlíně
8. `17` transport — Vánoční flotila DPP i letos rozzáří Prahu. Do pražských ulic vyjede v sobotu 28. listopadu
9. `14` transport — Změny ve vedení dozorčí rady DPP
10. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na listopad a prosinec
11. `14` transport — Dopravní opatření v pražské MHD v souvislosti s veřejnými akcemi 15. a 17. listopadu
12. `14` planning — Čím lépe pochopíme, co se děje za Prahou, tím lépe dokážeme plánovat uvnitř metropole, říká ředitel Sekce metropolitního plánování Michal Leňo
13. `12` planning — Praha 5 má nové vedení
14. `11` transport — Chceme jasná pravidla pro objížděče kolon. Praha 6 se brání soudnímu zrušení jednosměrky
15. `10` development — Praha 7 zlepšuje dostupnost lékařské péče
16. `10` planning — PONDĚLKY • Jane Jacobs a Nový urbanismus
17. `10` planning — Praha 1 zvolila vedení radnice, starostkou zůstává Terezie Radoměřská
18. `9` development — Město jako houba: Kam zmizí déšť, když zaprší?
19. `6` public-space — Prague warns dog owners of hidden danger lurking in Stromovka park


## Decisions

Wrote 1, released 1 (`na-krutci-one-way-supreme-court`, transport, featured as the day's lead). Queue now empty.

Wrote:
- Prague 6 files cassation complaint over Na Krutci one-way (Zdopravy, 25 Nov, with the 12 Nov ruling as second source) — a formal legal step in a contested Prague 6 vs. Central Bohemia dispute; the Supreme Administrative Court is asked to set the standard any district must meet to restrict through-traffic. The one-way itself was temporary and has ended; the article is about the rule, not the closure. Single outlet (Zdopravy, partly from a Prague 6 press release), attributed throughout. Pinned to Na Krutci in Vokovice (Nominatim --pick 3; top hit was the Jenerálka end of the street; sources say Vokovice).

Source errors:
- archiweb.cz — HTTP 429 again, several runs running (incl. 25 and 26 Nov). Rate-limited, not markup.
- Stavba, ArchDaily, Dezeen — "fetch failed" on every run since they were added (PR #40). Almost certainly missing from the environment egress allowlist; needs a human.

Skipped:
- Vyšehrad station redevelopment (Prague Morning) — unchanged since 25 Nov: preparatory work only, main works March 2027, single source paraphrasing the developer with a unit count that disagrees with earlier reporting.
- Kampa revitalisation from March 2027 (Praha 1) — schedule for a contract already covered 18 Sep; write at construction start.
- Praha 7 building permit for doctors' surgeries in Janovského — local service fit-out; would not matter to a reader in another district.
- Change of DPP supervisory board chair — people, no decision.
- PID advent weekend reinforcements, DPP Christmas fleet, PID Point timetable, 15/17 Nov MHD measures — seasonal, notices, past diversions.
- Metro D traffic measures in Praha 4 (DPP, 10 Nov) — covered 11 Nov.
- CAMP opens new Karlín premises (IPR + CAMP) — institution talking about itself.
- Praha 5 and Praha 1 new leadership — borough politics, no built-environment decision.
- Praha 5 events list, Praha 5 rink, Za starou Prahu Jane Jacobs lecture — events.
- Michal Leňo interview, "Město jako houba" (CAMP) — features; nothing decided.
- Stromovka beaver warning (Expats) — wildlife advisory.
