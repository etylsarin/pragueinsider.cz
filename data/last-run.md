# Scan log — 2026-08-29

Scanned `2026-08-29T05:07:19.312Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 2 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 0 new of 10 (0 off-topic, 3 covered, 7 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (4 off-topic, 2 covered, 1 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✓ **archiweb.cz** — 0 new of 19 (17 off-topic, 2 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 1 new of 40 (34 off-topic, 5 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **iROZHLAS** — 1 new of 40 (39 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 7 new of 32 (24 off-topic, 1 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)

## Candidates — 12 in 12 clusters

1. `19` transport — Očekávané komplikace na příjezdových silnicích do Prahy v prvním zářijovém týdnu
2. `19` transport — Most v ulici K Prádelně nahradí nová konstrukce
3. `19` architecture — Připomínka: II. Veřejné setkání k obnově náměstí Svatopluka Čecha
4. `18` transport — Jak se spotuje na Spotu? Přijďte nám 2. září říct, co vylepšit
5. `16` transport — Rekonstrukce Plzeňské končí: obnova provozu začne v pátek večer
6. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na srpen a září
7. `13` transport — Praha upraví a rozšíří podporu bikesharingu v rámci aplikace PID Lítačka
8. `13` architecture — Dny evropského dědictví: Místa, která mají co vyprávět
9. `12` transport — Opatření proti tranzitní dopravě v okolí Strossu
10. `12` development — Hledáme učitele/učitelku do mateřské školy
11. `11` transport — 400 milionů korun, dva roky práce a o tři kilometry kratší trasa z Prahy na Lipno. Nový úsek D3 je otevřen
12. `9` transport — Rychlejší železnice Praha – Liberec má smysl, potvrdil přepočet. SŽ chystá soutěž na projektanty


## Decisions

Thin day, and an unusually shallow one: all 12 candidates were single-source clusters, so nothing
could be cross-checked against a second outlet. Three cleared the bar, all from district
newsletters — the case the městské části are in the scan for.

### Written to the queue (3)

- **`k-pradelne-bridge-replacement`** — Praha 10. Demolition of the road bridge over the Botič in
  K Prádelně from 1 September and a new single-span monolithic frame on micropiles in its place,
  wider and with greater flood capacity, plus reshaping of the Botič channel beneath. Construction
  starting, investor TSK, contractor BM Constructions named, full closure to 15 December. No cost
  figure published — flagged in the article as a question for TSK.
- **`plzenska-reopens-tsk-drops-kerbs`** — Praha 5. Reconstruction of Plzeňská (Mozartova – Pod
  Kotlářkou) finishing, street fully open by 04:30 on 29 August. Written for the contested angle
  rather than the reopening: TSK abandoned plastic kerbs filled with concrete at five junction
  corners after Prague 5's councillors objected in the closing week. Noted in the piece that this is
  the district's own account of a dispute the district won, and TSK's reasoning is absent from it.
- **`strossmayerovo-transit-block`** — Praha 7. TSK closed the rat-run under sv. Antonín past
  ZŠ Stross on 28 August with changed mandatory signage, blocking bollards and new markings; IZS and
  refuse collection keep access. A physical change to the street network that the citywide press does
  not carry. No traffic counts published and no review date given — both flagged.

### Released to `content/posts/` (3, all queued 2026-08-28)

- `d0-511-opening-slips-to-2028` — **pinned as the day's lead** (`featured: true`). The ring road's
  missing link slipping to H2 2028 with a cost increase on a CZK 9.8bn contract is the largest
  Prague infrastructure story on the stack.
- `bozankaya-trolleybuses-still-unaccepted`
- `bikesharing-litacka-new-tender`

Written and released differ, as intended: today's three go to the back of the queue, which stays
five deep.

### Skipped, with reasons

- **Praha upraví a rozšíří podporu bikesharingu v rámci aplikace PID Lítačka** (PID, `13`) —
  **already covered.** This is the primary-source press release for the story written yesterday from
  the Zdopravy report and queued as `bikesharing-litacka-new-tender`, which released today. One story
  is one article; not written twice.
- **Očekávané komplikace na příjezdových silnicích** (PID, `19`) — congestion forecast for one week
  of September. Nothing decided; worthless in a month.
- **Připomínka: II. Veřejné setkání k obnově náměstí Svatopluka Čecha** (Praha 10, `19`) — fetched
  in full and dropped as thin. It is a reminder for a meeting held on 27 August, already past, and a
  repeat of the 15 July session "ve stejném formátu a se stejným obsahem". The page names neither the
  winning team nor anything about the design, so there is no story to write without inventing one.
  The underlying competition result is worth chasing when the district publishes the design.
- **Jak se spotuje na Spotu?** (Praha 7, `18`) — consultation event at a playground; local, ephemeral.
- **Mobilní informační centrum PID Point** (PID, `14`) — timetable service notice.
- **Dny evropského dědictví** (Praha 1, `13`) — programme of events, explicitly below the bar.
- **Hledáme učitele/učitelku do mateřské školy** (Praha 5, `12`) — job advertisement. Scored `12`
  under `development`; the noun "mateřská škola" is doing that, not any building work.
- **Nový úsek D3 je otevřen** (iROZHLAS, `11`) — **not Prague.** A D3 section in South Bohemia on the
  route to Lipno. It reached the digest on "z Prahy" in the headline; nothing is built in Prague.
- **Rychlejší železnice Praha – Liberec** (Zdopravy, `9`) — the closest call of the day, and skipped.
  Real substance (Valbek SK recalculation for CZK 58,000 confirming the economics of variant 200PF
  after ŽESNAD.cz questioned the Polish freight assumptions; designer tender and EIA for Mladá
  Boleslav – Turnov promised this year), but every kilometre of the section concerned —
  Mladá Boleslav – Turnov – Liberec — lies outside Prague. The Prague end of the corridor is not part
  of this decision. Treated consistently with the D3 item above. If the desk wants intercity rail
  in scope, that is an editorial decision to take deliberately, not by drift.

### Sources

No source errored. `praha.camp`, `IPR` and `DPP` returned zero new items, but only because almost
everything they carry fell outside the 21-day window (39, 22 and 7 items respectively) — that is a
quiet window, not a broken adapter, and all three fetched normally.

### Needs a human

- **Two praha10.cz pages returned truncated content to WebFetch** and had to be read with `curl`
  and a browser user-agent instead. If this recurs, it is worth a note in the skill alongside the
  existing `zdopravy.cz` 403 workaround.
- Every cluster today was single-source, so nothing published today is cross-checked. Each article
  attributes its claims to the district that made them.

