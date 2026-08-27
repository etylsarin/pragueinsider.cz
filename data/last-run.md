# Scan log — 2026-08-27

Scanned `2026-08-27T05:11:27.026Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 2 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 0 new of 10 (0 off-topic, 2 covered, 8 outside window)
- ✓ **PID / ROPID** — 1 new of 10 (4 off-topic, 2 covered, 3 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✓ **archiweb.cz** — 0 new of 20 (19 off-topic, 1 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 2 new of 40 (37 off-topic, 1 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (24 off-topic, 1 covered, 0 outside window)
- ✓ **Městské části** — 5 new of 32 (25 off-topic, 2 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (1 off-topic, 0 covered, 9 outside window)

## Candidates — 9 in 9 clusters

1. `27` transport — Změny ve vedení tramvají od 29. srpna, do centra rychleji linkou 5
2. `19` architecture — Připomínka: II. Veřejné setkání k obnově náměstí Svatopluka Čecha
3. `18` transport — T3 zády k sobě. V Praze se vrací do provozu neobvyklé soupravy
4. `17` architecture — Historic Invalidovna Building in Prague Begins Major Reconstruction
5. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na srpen a září
6. `13` transport — Jako by projela tramvaj. Ražba průzkumné štoly pod Vinohrady pokračuje s pomocí trhaviny
7. `13` architecture — Dny evropského dědictví: Místa, která mají co vyprávět
8. `13` planning — Školská zařízení s FVE panely
9. `12` development — Hledáme učitele/učitelku do mateřské školy


## Decisions

### Written to the queue — 3

- **`invalidovna-reconstruction-start`** (architecture) — the CZK 2.15bn restoration of Invalidovna
  formally started with a key handover; site goes to Sdružení Invalidovna (Metrostav CZ, AVERS,
  Chládek & Tintěra) on 31 August, four years to a 2030 opening, two new wings by Petr Hájek, the
  Prague Philharmonic Choir moving in. Largest investment NPÚ has ever made. Two sources: ČT24/ČTK
  (Czech, full detail and quotes) and Prague Morning (English, adds the 50-space garage and the
  ~80 % public-access figure — attributed in the text, since ČTK does not carry them).
- **`olsanska-habrova-tram-closure`** (transport) — trams stop between Olšanské náměstí and
  Nákladové nádraží Žižkov 29 Aug – 10 Oct for preparatory work on the Olšanská–Habrová line. Line
  34 cancelled, 26 cut back, 9/95 diverted, 5 rerouted in two stages around the return of trams to
  Hlávkův most on 31 August. Written up against DPP's May contract award (CZK 599.2m ex-VAT, 12
  months, six stops with now-final names) so the closure reads as the start of the line rather than
  as a service notice. Three sources: PID, Praha 7, DPP.
- **`t3-back-to-back-sets-return`** (transport) — back-to-back T3R.PLF pairs (arrangement PX) return
  to passenger service on line 19 for the first time since 1983, as a tested fallback for the
  bidirectional KT8D5 shortage caused by overlapping closures. Confirmed to Zdopravy.cz by PID
  spokesman Filip Drápal; DPP had not answered at publication, which the article says. Sources:
  Zdopravy.cz plus the PID Spojovací closure notice for the closure pile-up.

### Released today — 3 (all queued 26 Aug, unrelated to what was written today)

- `blanka-tunnel-bus-145`
- `roztocka-lane-closure-shortened`
- `zofin-palace-handover-dispute` — carried `featured: true`, the day's lead.

Queue depth after release: 3 (today's three).

### Skipped — 6

- **Připomínka: II. veřejné setkání k obnově náměstí Svatopluka Čecha** (Praha 10, score 19) —
  skipped, event reminder with no reportable content. The page is explicit that the 27 August
  meeting repeats the 15 July one "ve stejném formátu a se stejným obsahem"; it names neither the
  winning team, nor the design, nor a cost or timeline. Nothing to source an article from. Worth
  re-checking when the district publishes the winning design itself.
- **Ražba průzkumné štoly pod Vinohrady** (Zdopravy.cz, score 13) — **wrong city.** This is the
  Vinohrady housing estate in *Brno*: the exploratory adit is ŘSD's, for the Velký městský okruh
  tunnel, quoted by the director of ŘSD's Brno division. The item reached the digest on the district
  name "Vinohrady" alone; neither title nor summary names Brno, so `relevance.mjs` had nothing to
  veto on. Caught at step 3 by reading the body, which is the only place it could have been caught.
- **Mobilní informační centrum PID Point: jízdní řády na srpen a září** (PID, score 14) — skipped,
  a service timetable for a mobile info kiosk. Nothing decided; useless in a month.
- **Dny evropského dědictví: Místa, která mají co vyprávět** (Praha 1, score 13) — skipped,
  programme of events.
- **Školská zařízení s FVE panely** (Praha 5, score 13) — skipped. A firm was picked to draw up
  project documentation for rooftop PV on six district buildings, so something was decided, but this
  is procurement of design documents for one district's own estate — it fails the "would this matter
  to a reader in a different district" test.
- **Hledáme učitele/učitelku do mateřské školy** (Praha 5, score 12) — skipped, job advertisement.

### Notes for a human

- No source errored; all thirteen returned. praha.camp, IPR and DPP each returned zero *new* items
  purely because their recent output was already covered or outside the 21-day window — not a fault.
- The container's egress allowlist blocks every host that is not a registered source, so the Czech
  cross-checks on Invalidovna via e15.cz, prazsky.denik.cz, regionpraha.cz and prahanadlani.cz were
  refused. ČT24 is on the allowlist and carried the full ČTK report, so the story is properly
  cross-checked anyway — but adding a general Czech daily to the sources list would give the desk a
  fallback the next time the one allowed outlet does not carry a story.
- `zdopravy.cz` again returned 403 to WebFetch and read fine via curl with a browser user-agent, as
  the skill documents.
