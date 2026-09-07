# Scan log — 2026-09-07

Scanned `2026-09-07T05:08:33.279Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 3 covered, 21 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 1 new of 10 (0 off-topic, 7 covered, 2 outside window)
- ✓ **PID / ROPID** — 4 new of 10 (4 off-topic, 2 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✓ **archiweb.cz** — 0 new of 19 (17 off-topic, 2 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 3 new of 40 (35 off-topic, 2 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (8 off-topic, 2 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (24 off-topic, 1 covered, 0 outside window)
- ✓ **Městské části** — 2 new of 32 (27 off-topic, 3 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (5 off-topic, 0 covered, 5 outside window)

## Candidates — 10 in 10 clusters

1. `19` transport — Očekávané komplikace na příjezdových silnicích do Prahy v prvním zářijovém týdnu
2. `17` transport — DPP zve na den otevřených dveří v garáži Řepy v rámci oslav 90 let prvních pražských trolejbusů
3. `16` transport — Dopravní opatření v souvislosti s běžeckými závody 5. září
4. `16` transport — Stav přípravy železničního jízdního řádu 2026/2027 po projednání Návrhu JŘ pro tratě v rámci PID (srpen 2026)
5. `15` transport — Finále největší drážní zakázky. Politiky čeká schvalování třicetileté smlouvy na vlaky v PID za 165 miliard
6. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na září
7. `13` transport — ŘSD řeší problém s obřím valem na Pražském okruhu. Zemina je nestabilní, za vlhka příliš měkne
8. `13` architecture — Hledáte zajímavou práci ve facility managementu?
9. `13` transport — Praha upraví a rozšíří podporu bikesharingu v rámci aplikace PID Lítačka
10. `11` transport — Linka Praha – New York zůstává sezónní, provoz zahájí dříve


## Decisions

### Written to the queue — 3

- **`emu400-pid-thirty-year-rail-contract`** (cluster 5) — Central Bohemian councillors and Prague's
  cabinet voting on the 30-year EMU 400 contract with ČD, 165.173bn CZK. A decision of that duration
  on the busiest suburban lines, with a live ÚOHS case over the Škoda rolling-stock award still
  blocking signature. Citywide/regional, so no `district` or `location`.
- **`d0-511-bechovice-noise-embankment`** (cluster 7) — the Běchovice noise bund on D0 511 cannot be
  built from the spoil it was designed to absorb; ŘSD is redesigning the reinforced sections and
  negotiating with contractors. A concrete construction problem on a section already slipped from
  December 2027 to H2 2028. Pinned at Běchovice, which is what the bund shields.
- **`bikesharing-pid-litacka-2026-tender`** (cluster 9) — the city cabinet approved the intent and
  the launch of the Bikesharing v PID Lítačka 2026 procurement, 50m CZK excl. VAT, and introduced a
  0.5/1/2 coefficient that pays double for rides in the outer city. A tender decided, not announced.
  Citywide, no pin.

### Skipped

- **1 — Očekávané komplikace na příjezdových silnicích (PID)** — a one-week roadworks and congestion
  notice for the first week of September. Nothing decided; worthless in a month.
- **2 — DPP den otevřených dveří v garáži Řepy (DPP)** — an open day. The institution talking about
  itself, and an event already past.
- **3 — Dopravní opatření k běžeckým závodům 5. září (Praha 7)** — a single evening's diversions for
  a running race, already over on the day of the scan.
- **4 — Stav přípravy železničního JŘ 2026/2027 (PID)** — fetched; the page is a process note saying
  the draft was revised after comments and pointing at Správa železnic PDFs per line. No concrete
  service change stated in the text, and no decision taken since the last such note. Thin, so
  dropped rather than padded.
- **6 — PID Point: jízdní řády na září (PID)** — the September touring schedule of a mobile
  information van. A programme of events.
- **8 — Hledáte zajímavou práci ve facility managementu? (Praha 7)** — a job advertisement for a
  council department head. Local administrative notice; the relevance scorer read "staveb" as
  architecture.
- **10 — Linka Praha – New York zůstává sezónní (Zdopravy)** — an airline's seasonal schedule
  decision. Not the built environment, and nothing about the airport itself changes.

### Notes

- Every cluster had `sourceCount: 1`, so nothing could be cross-checked against a second outlet.
  Each written story attributes its single source by name in the text.
- The two Zdopravy stories were fetched with a browser user-agent via `curl`, as the skill
  prescribes; WebFetch is refused with 403 by that site.
- No source errored. All thirteen returned. The high `outside window` counts for praha.camp (39),
  IPR (21) and Klub Za starou Prahu (10) are the 21-day cut-off, not a fault.
- No misfiled non-Prague story found this run — the two candidates carrying district names
  (Běchovice/Dubeč, Dejvice) are genuinely Prague.
- `geocode.mjs` reached Nominatim; "Mimoúrovňová křižovatka Dubeč" returned no match inside Prague,
  so the D0 story is pinned on Běchovice, the settlement the bund protects. `data/places.json` grew
  from 34 to 36 entries.

### Released — 3, from earlier days

- `muzeum-tram-track-complete` (queued 2026-09-05) — **lead**, trams back at the National Museum
  nearly six months early.
- `prague-munich-coaches-tender` (queued 2026-09-05)
- `bozankaya-trolleybuses-accepted` (queued 2026-09-06)

Queue after the run: 3 (today's three). Nothing was held back as over fourteen days old.
