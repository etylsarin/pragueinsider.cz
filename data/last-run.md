# Scan log — 2026-08-26

Scanned `2026-08-26T05:15:22.752Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 2 new of 24 (0 off-topic, 0 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 0 new of 10 (0 off-topic, 2 covered, 8 outside window)
- ✓ **archiweb.cz** — 2 new of 20 (17 off-topic, 1 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 2 new of 40 (38 off-topic, 0 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✗ **Expats.cz** — HTTP 503

## Candidates — 6 in 6 clusters

1. `13` transport — Jako by projela tramvaj. Ražba průzkumné štoly pod Vinohrady pokračuje s pomocí trhaviny
2. `10` development — Písek vybral investora pro stavbu nové čtvrti v části bývalých Žižkových kasáren
3. `9` development — Užitečné propojení i biotop. Praha má studii, která vyhodnocuje potenciál zaniklých cest
4. `7` development — Slýcháme chválu i kritiku. BKOM hodnotí první týdny kampaně s Isteníkem za 1,2 milionu
5. `7` planning — Česká města sdílejí zkušenosti. A hovoří o reformě svého plánování
6. `6` development — Praha otevřela centrum duševního zdraví pro seniory a postaví nový pavilon


## Decisions

Published 3 of 6 candidates. Three of the six were not about Prague at all — the relevance filter
matched on substrings, not places.

- **1. Ražba průzkumné štoly pod Vinohrady** — skipped, not Prague. Scored top (13) on the place
  token `vinohrad`, but the article is about the exploratory adit under the *Brno* Vinohrady
  housing estate, part of the Velký městský okruh Brna. Only detectable by reading the body.
- **2. Písek vybral investora pro stavbu nové čtvrti** — skipped, not Prague. Matched `zizkov`
  inside "Žižkových kasáren"; the barracks are in Písek.
- **3. Studie Cesty — zaniklé cesty** — **published** as `lost-paths-study` (public-space). IPR
  study, 3,000+ km of vanished historical paths, >50 % still municipally owned, priority sections
  identified, presented to mayors in June. Two named quotes from Marek Zděradička.
- **4. BKOM / kampaň s Isteníkem** — skipped, not Prague. Matched `kampa` inside "kampaně"; the
  story is Brněnské komunikace and a Brno campaign budget.
- **5. CityDeal** — **published** as `citydeal-twelve-cities` (planning). Platform grew 5 → 12
  cities; IPR is a press office here, but this is what the institution is doing, with three named
  directors on the record about the competence split, so it clears the press-office test.
- **6. Centrum duševního zdraví pro seniory / Palata II** — **published** as
  `palata-dementia-pavilion` (development). ČTK via archiweb: 73-bed pavilion topped out in
  Košíře, April 2027, plus the city's senior-capacity programme figures.

Source note: **Expats.cz returned HTTP 503** — first failure, no action taken. If it errors again
tomorrow, check the adapter. Zdopravy needed the browser user-agent curl workaround as documented;
that worked and is not a fault.

No cluster had `sourceCount > 1`, so nothing could be cross-checked against a second outlet. All
three published stories rest on a single source each, attributed by name in the text.
