# Scan log — 2026-08-26

Scanned `2026-08-26T11:17:59.718Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 2 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 0 new of 10 (0 off-topic, 2 covered, 8 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (4 off-topic, 0 covered, 3 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✓ **archiweb.cz** — 1 new of 20 (18 off-topic, 1 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 3 new of 40 (37 off-topic, 0 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (24 off-topic, 1 covered, 0 outside window)
- ✓ **Městské části** — 6 new of 32 (26 off-topic, 0 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (1 off-topic, 0 covered, 9 outside window)

## Candidates — 13 in 12 clusters

1. `27` transport — Trvalé změny PID od 15. 8. 2026: tunelbus 145, prodloužení linky 218 a rozdělení linky 110
2. `27` transport — Změny ve vedení tramvají od 29. srpna, do centra rychleji linkou 5
3. `19` transport — Omezení na příjezdu do Prahy skončí, vymohly si radnice. Silnice se však opět rozkope později
4. `19` architecture — Připomínka: II. Veřejné setkání k obnově náměstí Svatopluka Čecha
5. `18` transport — Pět autobusových linek obslouží novou zastávku Sourozenců Čapkových
6. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na srpen a září
7. `13` transport — Jako by projela tramvaj. Ražba průzkumné štoly pod Vinohrady pokračuje s pomocí trhaviny
8. `13` architecture — Dny evropského dědictví: Místa, která mají co vyprávět
9. `13` planning — Školská zařízení s FVE panely
10. `10` transport — Palác Žofín: jak se vyvíjí spor o předání novému nájemci
11. `10` development — Písek vybral investora pro stavbu nové čtvrti v části bývalých Žižkových kasáren
12. `7` development — Slýcháme chválu i kritiku. BKOM hodnotí první týdny kampaně s Isteníkem za 1,2 milionu


## Decisions

Three stories written to the queue, none released today — see "Release held" below.

### Written

- **`zofin-palace-handover-dispute`** (public-space, `featured: true`) — Praha 1 published on
  19 August the first consolidated timeline of the Žofín dispute: tender conditions approved
  30 April 2024, Zátiší Catering Group picked in September 2024 at CZK 20.4m/year against Agentura
  NKL's ~10m, handover due 15 January 2025 and refused. The appellate court confirmed the Zátiší
  contract valid on 21 April 2026; the separate eviction case was annulled for procedural defects in
  June 2026 and remanded to a different judge. A decision taken, a contested landmark, and a case
  nobody else is assembling in one piece. Cited from praha1.cz, quote verbatim.
- **`blanka-tunnel-bus-145`** (transport) — first PID bus line through the Blanka tunnel complex,
  running since 15 August, 6-minute morning peak, Kobylisy–Dejvická under 20 minutes; plus the
  line 218 extension, the permanent split of line 110 into 110/206, and from 29 August the
  unification of Saturday and Sunday timetables on the metro and most city buses. Permanent network
  change, not a diversion. Cross-checked against Praha 10, which confirms the 29 August date, the
  Sunday strengthening and the new Sourozenců Čapkových stop (lines 124, 139, 150, 155, 213). No
  disagreement between the sources.
- **`roztocka-lane-closure-shortened`** (transport) — Praha 6, Suchdol and Roztoky forced PVS to
  drop its request to occupy the Roztocká/Kamýcká carriageway until the end of September; full
  traffic returns 6 September, but the pumping station rebuild is unfinished and the street will be
  dug up again. A formal objection that succeeded — the reversal is the story, not the closure.

### Skipped

- **Změny ve vedení tramvají od 29. srpna (praha7.cz)** — skipped, service-diversion notice. The
  source gives no end date for the Žižkov closure it is triggered by, and the substance overlaps the
  PID piece. Nothing decided here that the reader could hold onto in a month.
- **Připomínka: II. veřejné setkání k obnově nám. Svatopluka Čecha (praha10.cz)** — skipped, event
  reminder. The competition was already decided; this is a calendar item for a meeting on 27 August,
  and would be stale before it left the queue.
- **Pět autobusových linek obslouží novou zastávku Sourozenců Čapkových (praha10.cz)** — not skipped
  as such: folded into `blanka-tunnel-bus-145` as a cross-check source. One story, one article.
- **Mobilní informační centrum PID Point (pid.cz)** — skipped, opening-hours notice for a mobile
  info van. The press-office test: what the institution says about itself, not what it does to the
  city.
- **Dny evropského dědictví (praha1.cz)** — skipped, events programme.
- **Školská zařízení s FVE panely (praha5.cz)** — skipped, local administrative detail. Praha 5 has
  picked a firm to prepare project documentation for PV on six buildings; the installation contract
  is not let. Fails the district test — it would not matter to a reader in another district.
- **Ražba průzkumné štoly pod Vinohrady (zdopravy.cz)** — skipped, not Prague. This is Brno's
  Vinohrady housing estate and the Velký městský okruh tunnel; ŘSD Závod Brno. A geographic false
  positive on the estate name.
- **Písek vybral investora … Žižkova kasárna (archiweb.cz)** — skipped, not Prague. Písek, and the
  barracks share a name with the Prague district.
- **BKOM hodnotí kampaň s Isteníkem (zdopravy.cz)** — skipped, not Prague. BKOM is Brněnské
  komunikace.

### Release held

`release.mjs` was **not** run. An earlier run today already published three stories for 2026-08-26
(commit `833ae5d`, an ancestor of HEAD): `citydeal-twelve-cities`, `lost-paths-study`,
`palata-dementia-pavilion`. The script has no memory of that — it would have moved three more onto
the same date, putting six posts on a day whose stated limit is three. All three of today's stories
stay queued and go out on the next run, which is the queue behaving as designed. `--dry-run` output:

```
  → blanka-tunnel-bus-145 (queued 2026-08-26)
  → roztocka-lane-closure-shortened (queued 2026-08-26)
  → zofin-palace-handover-dispute (queued 2026-08-26)
[dry run] would release 3 of 3; 0 left in the queue.
```

### Source health

No source errored. The four sources returning zero — CAMP, IPR, DPP and Klub Za starou Prahu — were
checked directly against their adapters rather than inferred from the counts: all four return recent
items (CAMP and IPR to 21 August, DPP to 24 August), and their newest stories were already covered by
the runs of 25 and 26 August. The high "outside window" counts are genuine, not adapter rot.

`zdopravy.cz` again returns 403 to WebFetch and was read with a browser user-agent via curl, as the
skill prescribes. Not a fault.

Worth a human's eye: three of the twelve clusters (Brno's Vinohrady adit, BKOM, Písek) were non-Prague
stories that passed the relevance filter on Prague-sounding place names. If that recurs,
`scripts/lib/relevance.mjs` may want a negative check on Brno/Písek datelines.
