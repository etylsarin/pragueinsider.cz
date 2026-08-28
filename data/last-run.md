# Scan log — 2026-08-28

Scanned `2026-08-28T05:10:33.242Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 2 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 1 new of 10 (0 off-topic, 2 covered, 7 outside window)
- ✓ **PID / ROPID** — 1 new of 10 (4 off-topic, 2 covered, 3 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✓ **archiweb.cz** — 2 new of 19 (17 off-topic, 0 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 5 new of 40 (33 off-topic, 2 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **iROZHLAS** — 1 new of 40 (39 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 3 new of 32 (26 off-topic, 3 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)

## Candidates — 13 in 13 clusters

1. `19` architecture — Připomínka: II. Veřejné setkání k obnově náměstí Svatopluka Čecha
2. `15` transport — DPP začne stavět napojení budoucí tratě Olšanská – Habrová do stávající kolejové sítě a opraví trať ve smyčce Spojovací
3. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na srpen a září
4. `13` development — Až čtyři jízdy zdarma denně. Bikesharing s Lítačkou se v Praze opět rozšíří
5. `13` transport — Jako by projela tramvaj. Ražba průzkumné štoly pod Vinohrady pokračuje s pomocí trhaviny
6. `13` architecture — Dny evropského dědictví: Místa, která mají co vyprávět
7. `12` development — Hledáme učitele/učitelku do mateřské školy
8. `10` transport — Na budovaném úseku Pražského okruhu už se rýsují tubusy tunelů. Rostou mosty i protihlukové stěny
9. `9` transport — Rychlejší železnice Praha – Liberec má smysl, potvrdil přepočet. SŽ chystá soutěž na projektanty
10. `7` transport — Trolejbusy Bozankaya už měsíce čekají v garážích. Kvůli překladu dokumentů je Praha stále nepřevzala
11. `7` development — Praha 14 zahájila stavbu školy na Jahodnici za 950 milionů korun
12. `7` architecture — Praha 6 chce zrušit soutěž na kulturní centrum a vypíše nový tendr
13. `6` transport — Vlak strhl trolej u Peček, koridor Praha–Kolín stojí. Spoje jezdí odklonem přes Nymburk


## Decisions

### Written to the queue — 5

- **`jahodnice-school-construction-start`** (development) — Praha 14 broke ground on a CZK 950m
  primary school for 540 pupils on U Hostavického potoka; Metrostav, design-and-build, CZK 350m from
  the city, opening September 2028. Construction start plus committed money, and the third fix the
  district has attempted for the same shortage since 2024. Source: archiweb/ČTK, fetched in full.
- **`vitezne-namesti-cultural-centre-tender-cancelled`** (development, also architecture) — Praha 6
  is cancelling the procurement for the cultural centre in the fourth quadrant of Vítězné náměstí
  after the only bid, from Fourth Quadrant, came in at CZK 1.221bn excl. VAT against an CZK 800m
  estimate. Re-tender in February 2027. Contested, single-bidder procurement on the district's only
  suitable plot, owned by the bidder. Source: archiweb/ČTK, fetched in full.
- **`bikesharing-litacka-new-tender`** (transport) — councillors approved a new CZK 50m, two-year
  bikeshare contract; free 15-minute rides rise from two to up to four a day, up to three suppliers,
  a coefficient system aimed at the outer districts, TSK open-house contract required. A decision
  taken and money committed, not an announcement of intent. Source: Zdopravy.cz via curl.
- **`d0-511-opening-slips-to-2028`** (transport) — the 12.5km D0 section Běchovice–D1 slips from end
  2027 to the second half of 2028 on unexpected geology, adding hundreds of millions to a CZK 9.8bn
  contract. The date change is the story; the progress detail is context. Source: Zdopravy.cz.
- **`bozankaya-trolleybuses-still-unaccepted`** (transport) — 30 Bozankaya SNG 12T trolleybuses have
  sat in Řepy since May, unaccepted; the dispute is now over the Czech translation of the
  documentation, not hardware, and the Drážní úřad width-measurement report is still unissued. DPP
  has sent ROPID three timetable versions. Contested, and consequential for a CZK 1.099bn framework.
  Source: Zdopravy.cz.

### Enriched rather than duplicated — 1

- **`olsanska-habrova-tram-closure`** — cluster 2 (the DPP release of 27 August) is the same story as
  the article queued yesterday from PID and Praha 7. Rather than write a second article from one
  cluster, the DPP release was added as a primary source and the article gained the engineering
  behind the closure: the Olšanská × Jana Želivského junction rebuild and its phasing, the
  concurrent Spojovací loop repair (28 Aug – 12 Sep, four heated switches, two remotely controlled),
  and Šurovský's sequencing rationale through to the Seifertova–Táboritská–Jičínská reconstruction
  from end-June 2027.

### Released today — 3

Yesterday's three queued articles, oldest first: `invalidovna-reconstruction-start`,
`olsanska-habrova-tram-closure` (pinned as the day's lead — a six-week closure starting tomorrow and
the construction start of a new tram line), `t3-back-to-back-sets-return`. Nothing written today was
released; all five are banked. Queue depth after release: 5.

### Skipped, with reasons

- **`5` Ražba průzkumné štoly pod Vinohrady (Zdopravy.cz)** — **not Prague.** The adit is under the
  *Brno* Vinohrady housing estate, dug by ŘSD Závod Brno for the Velký městský okruh, with the
  Židenice and Vinohrady districts of Brno named in the body. It reached the digest on the place
  token `vinohrad` alone; the feed title, summary and tags name no city, so `relevance.mjs` had
  nothing to veto on. This is the false positive the skill's step 3 exists to catch, and it is not
  fixable in the filter without the article body.
- **`9` Rychlejší železnice Praha – Liberec (Zdopravy.cz)** — real decision (recalculation confirms
  viability, SŽ to tender designers this year), but the works are the Mladá Boleslav – Turnov –
  Liberec section. Nothing in the article touches Prague's built environment; the city appears only
  in the route name.
- **`1` Připomínka: II. veřejné setkání k obnově nám. Svatopluka Čecha (Praha 10)** — a participation
  meeting would normally clear the district bar, but the page is thin: it names neither the winning
  design nor its authors, gives no figures, and is a reminder of a repeat of the 15 July meeting,
  held on 27 August. Nothing to write from without padding. Worth revisiting if Praha 10 publishes
  the winning design itself.
- **`13` Vlak strhl trolej u Peček (iROZHLAS)** — incident in okres Kolín, one day's diversions, not
  Prague and not worth reading in a month.
- **`3` PID Point jízdní řády (PID)** — service notice for a mobile info centre; nothing decided.
- **`6` Dny evropského dědictví (Praha 1)** — programme of events, explicitly below the bar.
- **`7` Hledáme učitele do mateřské školy (Praha 5)** — job advertisement; local administrative
  detail that would not matter to a reader in another district.

### Sources

No source errored. `praha.camp`, `IPR Praha`, `Klub Za starou Prahu` and `Prague City Tourism`
returned nothing new, but all of it was "outside window" rather than off-topic or empty — their
feeds are carrying older material, not failing. `zdopravy.cz` again refused WebFetch (403) and was
read with a browser user-agent per the skill; `archiweb.cz` returned 503 to curl under repeated
requests and was read via WebFetch instead. Neither is a scan failure.
