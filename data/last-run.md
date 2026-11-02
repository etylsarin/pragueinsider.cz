# Scan log — 2026-11-02

Scanned `2026-11-02T05:17:10.413Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 2 new of 40 (0 off-topic, 1 covered, 37 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 1 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 1 new of 10 (0 off-topic, 2 covered, 7 outside window)
- ✓ **PID / ROPID** — 5 new of 10 (5 off-topic, 0 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 3 new of 40 (37 off-topic, 0 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 6 new of 33 (27 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (1 off-topic, 0 covered, 9 outside window)

## Candidates — 19 in 19 clusters

1. `31` transport — V Praze se staví pět tramvajových tratí současně. Nové koleje míří na Strahov i Nové Dvory
2. `30` transport — Tři nová parkoviště P+R: Opatov, Modřany a Uhříněves
3. `18` public-space — Aréna sportu zavřela, chystá kluziště
4. `18` transport — Den otevřených dveří DPP ve vozovně Pankrác již tuto sobotu
5. `17` public-space — Dobrodružné hřiště v rámci Spotu má otevřeno až do 13. prosince
6. `16` transport — Z odříznutého dopravního uzlu propojená čtvrť. Návrh studia CHYBÍK + KRIŠTOF mění Holešovice
7. `14` transport — Oprava tramvajové trati zkomplikuje na dva týdny dopravu v okolí Florence
8. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na listopad
9. `13` public-space — Opravy cest ve Stromovce v Bukovce poblíž planetária a vozovny
10. `13` transport — PID Point rozšiřuje své služby. Zamíří do škol i dalších obcí, nově přijímá pouze bezhotovostní platby
11. `13` transport — I na našich informačních centrech a PID Pointu můžete podpořit válečné veterány
12. `12` transport — Z Prahy do Košic pod osm hodin. Jízdní doba Pendolina se zkrátí o 40 minut
13. `12` architecture — Praha 1 otevře 23. listopadu příjem žádostí o dotace na kulturu, sport, spolky a kulturní dědictví
14. `11` public-space — Staroměstské náměstí v Praze o Vánocích ozdobí 23 metrů vysoký smrk z Podještědí
15. `9` transport — Sebevražd u tratí ubývá. SŽ si pochvaluje letošní kampaň, nová aplikace pomůže zvládat paniku
16. `9` planning — Pozvánka na ustavující zasedání Zastupitelstva MČ Praha 7
17. `9` planning — „Mladí lidé potřebují místo, kde se mohou trochu ztratit,“ říká Andrea Midlochová z Kanceláře participace
18. `9` transport — Praha se mění v mezinárodní metropoli. Roste díky lidem ze zahraničí a bude na nich stále více závislá
19. `9` transport — Parkování v zónách placeného stání v den státního svátku 28. 10. 2026


## Decisions

**Wrote (0):** Nothing cleared the bar. Three candidates are new today. None of them clears it:

- *Aréna sportu zavřela, chystá kluziště* (Praha 5): the Smíchov sports ground closing for its usual winter ice rink. This is a seasonal programme. Nothing has been decided or built, and it would not be worth reading in a month.
- *Oprava tramvajové trati … v okolí Florence* (Zdopravy): a works diversion from 2 to 13 November. The skill gives exactly this as an example of what fails the one-month test.
- *Sebevražd u tratí ubývá* (Zdopravy): a national Správa železnic safety campaign. It is not about Prague's built environment. It reached the list only because the relevance filter matched the place "Kampa" inside the word "kampaň". This is a false place match that `scripts/lib/relevance.mjs` could fix with a word-boundary or stem check.

The two PID Point items have new headlines but are the same service notices as yesterday.

**Released (0):** The queue was empty, so nothing was released and nothing is `featured`. Queue depth is still 0. This is the fifth day running with nothing published.

**Skipped, carried over unchanged** (all had no new source and no follow-up):
- five tram lines under construction at once: a PID roundup of works already covered
- three P+R sites: Opatov and Modřany already covered; Uhříněves still has no occupancy permit
- DPP open day at Pankrác: an event, and already past
- SPOT adventure playground: opening hours
- CHYBÍK + KRIŠTOF Holešovice: the competition result was covered on 20/09
- poppy appeal at PID centres: a charity collection
- Stromovka path repairs in Bukovka: a works notice with no budget, contractor or end date
- Pendolino Praha–Košice: no Prague infrastructure
- Praha 1 grants: local administration
- Old Town Square Christmas tree: seasonal
- Praha 7 constituent council on 9 November: a procedural invitation; it could become a story after the meeting
- Andrea Midlochová interview: a profile
- IPR international residents study: demographics, no decision
- 28 October paid parking: a one-day notice, already past

**Source errors:** archiweb.cz returned **HTTP 429 again**. It has failed every run since 22 September. The adapter is unchanged: whether to send a browser user-agent is still waiting on a human decision. Every other source answered.
