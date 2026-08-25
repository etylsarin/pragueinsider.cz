# Scan log — 2026-08-25

Scanned `2026-08-25T21:16:59.126Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 1 new of 40 (0 off-topic, 0 covered, 39 outside window)
- ✓ **IPR Praha** — 2 new of 24 (0 off-topic, 0 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 3 new of 10 (0 off-topic, 0 covered, 7 outside window)
- ✓ **archiweb.cz** — 3 new of 20 (17 off-topic, 0 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 2 new of 40 (38 off-topic, 0 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 1 new of 25 (24 off-topic, 0 covered, 0 outside window)

## Candidates — 13 in 13 clusters

1. `18` transport — DPP do konce prázdnin opraví tramvajovou trať v Chodovské ulici
2. `17` development — Modernizace stanic metra Flora a Hradčanská ve druhé polovině letošního roku
3. `15` transport — DPP uzavřel smlouvu se zhotovitelem nové tramvajové tratě Malovanka – Strahov
4. `15` public-space — Řeka v hlavní roli. Na Rohanském ostrově vznikne městský Park Maniny
5. `13` transport — Jako by projela tramvaj. Ražba průzkumné štoly pod Vinohrady pokračuje s pomocí trhaviny
6. `10` transport — Prague metro closures: Flora reopening delayed as Hradčanská shuts for 2027
7. `10` development — Praha vypsala tendr na přestavbu Brandejsova statku na gymnázium za miliardu
8. `10` development — Písek vybral investora pro stavbu nové čtvrti v části bývalých Žižkových kasáren
9. `9` development — Užitečné propojení i biotop. Praha má studii, která vyhodnocuje potenciál zaniklých cest
10. `7` development — Slýcháme chválu i kritiku. BKOM hodnotí první týdny kampaně s Isteníkem za 1,2 milionu
11. `7` planning — Česká města sdílejí zkušenosti. A hovoří o reformě svého plánování
12. `6` development — Praha otevřela centrum duševního zdraví pro seniory a postaví nový pavilon
13. `6` development — Stanice pražského metra Flora bude uzavřena až do konce února


## Decisions

Four published, the day's cap. The digest split one story across three clusters (#2, #6, #13 are all
the Flora/Hradčanská closure); merged into a single article with all three as sources.

**Published**

- `flora-hradcanska-metro-closures` (transport, featured) — clusters #2 + #6 + #13. DPP found
  degraded reinforced-concrete and steel beams in Flora's platform ceiling slab; closure extends
  three months to end-February 2027 while Hradčanská shuts from January regardless. Three sources
  cross-checked (DPP, ČT24/ČTK, Expats.cz); the eleven-month Hradčanská duration is carried only by
  Expats.cz and is attributed to them in the text.
- `malovanka-strahov-tram-contract` (transport) — cluster #3. Contract signed 24 Aug with Společnost
  TT Malovanka at CZK 824.27m excl. VAT, almost CZK 196m under the estimate; 1.3 km of double track
  plus a full rebuild of Vaníčkova and part of Bělohorská.
- `park-maniny-rohansky-ostrov` (public-space) — cluster #4. Construction starts this year,
  completion 2035; the design lowers 1960s metro spoil to restore a lateral Vltava arm.
- `brandejsuv-statek-gymnasium-tender` (development) — cluster #7. CZK 1.066bn design-and-build
  tender for a 408-place gymnázium in a listed Suchdol farmstead.

**Skipped**

- #1 Chodovská tram track repair — scored highest but is a scheduled summer track renewal with a
  service diversion, not a decision; routine works notice.
- #5 Vinohrady exploratory adit blasting — genuine news and the strongest of the runners-up, but the
  day's four-post cap was already taken by stories with more at stake. Zdopravy.cz returned HTTP 403
  to WebFetch, so it could not have been sourced properly today either. Left unmarked; it stays in
  the digest.
- #8 Písek, #10 BKOM/Isteník campaign — not Prague. Písek is South Bohemia, BKOM is Brno.
- #9 IPR study of lapsed paths, #11 City Deal planning-reform exchange — IPR institutional output
  rather than a decision affecting the city; #11 is close to self-description.
- #12 mental-health centre for seniors — a service opening with a future pavilion attached; too thin
  on built-environment substance to carry an article.

**Notes**

- `SKILL.md`'s frontmatter contract lists `cover.variant: grid | strata | plan | transit`, but
  `validate-posts.mjs` accepts `arcade | transit | canopy | parcels | massing`. The skill doc is
  stale; caught at validation, not before writing.
- Zdopravy.cz articles 403 to WebFetch. Not a scan failure — ingest read the feed fine — but it
  blocks step 3 for any Zdopravy story.
