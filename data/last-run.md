# Scan log — 2026-09-13

Scanned `2026-09-13T05:06:37.789Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 1 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 1 new of 10 (0 off-topic, 8 covered, 1 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (5 off-topic, 2 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✓ **archiweb.cz** — 0 new of 20 (18 off-topic, 2 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 0 new of 40 (36 off-topic, 4 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (8 off-topic, 2 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (7 off-topic, 2 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 7 new of 39 (29 off-topic, 3 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (5 off-topic, 0 covered, 5 outside window)

## Candidates — 12 in 12 clusters

1. `19` architecture — Hřiště v Tovární má novou toaletu
2. `19` transport — Očekávané komplikace na příjezdových silnicích do Prahy v prvním zářijovém týdnu
3. `17` transport — Ocenění policisty za záchranu života
4. `17` development — Neziskové organizace se představí na Andělu
5. `17` transport — DPP zve na den otevřených dveří v garáži Řepy v rámci oslav 90 let prvních pražských trolejbusů
6. `16` transport — Stav přípravy železničního jízdního řádu 2026/2027 po projednání Návrhu JŘ pro tratě v rámci PID (srpen 2026)
7. `14` transport — Linka 145 začne od 29. září zastavovat na Kuchyňce
8. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na září
9. `13` architecture — Dny evropského dědictví: Místa, která mají co vyprávět
10. `12` planning — ZŠ Brána jazyků otevírá Předškoličku pro budoucí prvňáčky
11. `12` transport — Natáčení v Letenských sadech
12. `6` transport — September 28 Holiday in Czechia: What Will Be Open and Closed


## Decisions

A thin scan: 12 candidates, 11 of them district-newsletter or operational notices. One story cleared
the bar.

### Written to the queue (1)

- **`line-145-kuchynka-stop`** — from 29 September the Blanka tunnel bus 145 calls at Kuchyňka on
  V Holešovičkách, serving the Pelc–Tyrolka university complex (MFF UK, ČVUT, FHS UK, ~1,400
  dormitory beds). Praha 8 lobbied ROPID repeatedly; Charles University's leadership sent a formal
  request. Clears the bar because it is a decided, dated network change, and because PID's own
  13 August release timetabled 145 to run V Holešovičkách *"již bez zastávek"* — this is the first
  break in that express stretch. Single-outlet story: the Praha 8 release is the only reachable
  source (see errors below), attributed by name throughout; the PID release is cited for the route
  and headways.

### Released today (3, from the queue — these are not what was written)

- `zlichov-special-school-pavilion` (queued 2026-09-10)
- `flora-metro-step-free-breakthrough` (queued 2026-09-11) — **featured**, the day's lead: a metro
  construction milestone with a citywide accessibility count behind it.
- `ipr-lost-paths-study-cesty` (queued 2026-09-11)

Queue depth after release: **8**.

### Skipped, with reasons

- **Stav přípravy železničního jízdního řádu 2026/2027 (PID)** — genuinely tempting: the ordering
  window has closed and the timetable is locked for 13 December 2026, with a funding caveat. But the
  release is 282 words and names no line, frequency or journey time. Nothing to write 400–800 words
  on without padding, and the detail lives in Správa železnic PDFs. Worth revisiting if PID publishes
  the line-level changes.
- **Hřiště v Tovární má novou toaletu (Praha 7)** — a larch-clad barrier-free toilet designed and
  built by FA ČVUT students (Ateliér Mádr). A real built object, but no cost, no funding, no quotes,
  and the piece is essentially an invitation to a 22 September gathering. Too thin.
- **Očekávané komplikace na příjezdových silnicích (PID)** — a one-week traffic warning, and the week
  in question has already passed.
- **Ocenění policisty za záchranu života (Praha 8)** — not the built environment.
- **Neziskové organizace se představí na Andělu (Praha 5)** — an event.
- **DPP den otevřených dveří v garáži Řepy (DPP)** — the institution talking about itself; the open
  day was 5 September and has passed.
- **Mobilní informační centrum PID Point (PID)** — operational notice, no decision.
- **Dny evropského dědictví (Praha 1)** — a programme of events.
- **ZŠ Brána jazyků otevírá Předškoličku (Praha 1)** — school enrolment; would not matter to a reader
  in another district.
- **Natáčení v Letenských sadech (Praha 7)** — a film shoot and a short-term parking suspension.
- **September 28 Holiday in Czechia (Prague Morning)** — shop opening hours.

### Errors and notes

- No source adapter errored. Every one of the thirteen returned. The low new-item counts are the
  21-day window and the covered index doing their job, not a broken scan — `praha.camp` (39) and
  `IPR Praha` (23) dropped almost everything as outside the window, and `iROZHLAS` filtered 40 of 40
  as off-topic, which is normal for a general news feed.
- **Egress blocked on two cross-check sources.** `prazsky.denik.cz` and `mhd86.cz` both carried the
  line 145 / Kuchyňka story and both returned `EGRESS_BLOCKED` from the network proxy. Neither host
  is in the environment's allowlist. That is why today's one article rests on a single primary
  source. Adding both hosts would let the desk cross-check district-council stories that the citywide
  press picks up. **Needs a human.**
- No misfiled non-Prague story caught this time; nothing in the digest reached us on a district name
  alone.
- `geocode.mjs` reached Nominatim and resolved Kuchyňka to the stop on V Holešovičkách. It suggested
  `Praha 8 – Kobylisy` (OSM's cadastral read of that point); the article uses `Praha 8 – Libeň`
  because the source frames the connection as *"mezi Libní a Dejvicemi"* and the Pelc–Tyrolka campus
  the story turns on is on that side.
