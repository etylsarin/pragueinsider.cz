# Scan log — 2026-10-04

Scanned `2026-10-04T05:08:16.933Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 1 new of 40 (1 off-topic, 1 covered, 37 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 2 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 2 new of 10 (0 off-topic, 3 covered, 5 outside window)
- ✓ **PID / ROPID** — 4 new of 10 (4 off-topic, 2 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 6 new of 40 (31 off-topic, 3 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **iROZHLAS** — 1 new of 40 (39 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 7 new of 39 (27 off-topic, 5 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (1 off-topic, 0 covered, 9 outside window)

## Candidates — 23 in 21 clusters

1. `28` transport _[2 sources]_ — Na Smíchově osadí druhou část nového železničního mostu. Přeruší kvůli tomu provoz tramvají
2. `27` transport — Na Malé Straně pokřtili knihu o historii petřínské lanovky
3. `23` transport _[2 sources]_ — Zastávka Nádraží Holešovice bude v pátek 2. října Knižní
4. `22` architecture — V cenách Opera Pragensia bodovala ředitelka CSOP i Raudnitzův dům
5. `22` transport — Trvalé změny PID v září a říjnu 2026
6. `19` transport — DPP o prodlouženém víkendu vymění další pražce na trati C
7. `17` transport — Tři sekundy, které mohou zachránit život. ROPID cílí na mladé chodce s mobily a sluchátky v ulicích Prahy
8. `16` architecture — Rozhodni o Praze! Praha v památkových sporech
9. `16` architecture — Zmizelá Praha: přednášky pro seniory na radnici
10. `15` architecture — Open House Praha na podzim odhalí zapomenuté příběhy Prahy
11. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen
12. `14` transport — Dočasné umístění citybloků v Ovenecké
13. `13` transport — Obce si objednaly rychlík Žatec – Praha na jeden den. Chtějí ukázat potenciál tratě 110
14. `13` transport — Pozvánka na prodloužený víkend s PID: Den hrdinů a Poznej Vltavu
15. `13` development — Petřínská lanovka dnes po dvou letech obnovila provoz
16. `12` transport — Petřínská lanovka za osm dní svezla téměř sto tisíc lidí. DPP vypravil stovky jízd navíc
17. `11` transport — Lašákův první velký krok v čele letiště. Na Ruzyni zdraží poplatky
18. `11` transport — Rumunské AnimaWings míří do insolvence, ruší i lety do Prahy
19. `10` public-space — Kam po škole? Praha jako hřiště pro děti, které už z hřiště vyrostly
20. `9` transport — Leo Express přestane od pondělí jezdit s dlouhou linkou Frankfurt – Praha – Přemyšl. Viní německé výluky
21. `9` planning — Úřad bude v pátek 25. 9. od 10.30 uzavřen kvůli požárnímu cvičení


## Decisions

Two candidates cleared the bar. Both are transport, and that is what the list carried — the
development, architecture and planning wire was events, awards and lectures today, with `archiweb.cz`
still blocked (see below).

### Written to the queue

- **`airport-departure-charge-six-percent`** — Letiště Praha's board voted unanimously to raise the
  departing-passenger charge six per cent, CZK 682 → 723, for the price list beginning 28 March 2027.
  A decision taken with money attached, publicly contested before the figure was even out (Kupka),
  and with a Ryanair precedent the sources name. Two sources: Zdopravy.cz 3 October and ČT24
  3 October, which broke it in Lašák's first interview in the job. Released today.
- **`nadrazni-bridge-last-two-structures`** — Správa železnic seats the remaining steel over Nádražní
  on the nights of 6–7 and 8–9 October, with spokesman David Kabele on the record. Two sources:
  Zdopravy.cz 2 October and ČT24 3 October. Held in the queue by `release.mjs` (three a day); still
  current when it goes out tomorrow, ahead of the lifts.

### Released today (three, from the queue)

- **`metro-d-libus-station-tender`** (transport, queued 3 October) — **lead**, `featured: true`.
  A CZK 3.755bn contract going to tender with price as the only criterion is the strongest thing on
  the front page.
- **`public-lighting-concept-consultations`** (planning, queued 3 October).
- **`airport-departure-charge-six-percent`** (transport, written today).

Queue depth after release: **1** (`nadrazni-bridge-last-two-structures`).

### Needs a human — two things

**1. `archiweb.cz` has now returned HTTP 429 for thirteen consecutive days (22 September – 4 October).**
This is not rotted markup; it is a rate limit, and the adapter fix in the skill's "when a source
adapter breaks" section does not apply. The architecture wire has been dark the whole time, and today
is a clear illustration of the cost: the only architecture candidates the scan could offer were an
awards gala, a lecture series for seniors and a schools education programme. Someone has to decide the
policy — ask archiweb for access, change the declared agent with their agreement, or drop the source.
The desk will not spoof a browser User-Agent to get round a block the site appears to have set
deliberately.

**2. A published article may carry a wrong inference, and the sources now disagree with each other.**
`content/posts/2026-10-01-nadrazni-railway-bridge-second-half/` says of the span going in this month
that "unlike the first, it carries two tracks" — an inference the desk drew from Prague 5's closure
notice and older Zdopravy.cz reporting, and flagged as such ("on that published sequence"). Správa
železnic's account, carried by Zdopravy.cz on 2 October, is that the first part is **one third** of
the crossing and carries one track, which makes the two structures now going in the remaining two
thirds. ČT24 describes it differently again, as a two-part job: north last year, south now. Today's
queued article reports that disagreement and attributes each account rather than resolving it, per the
skill. Whether the 1 October article should be amended is an editorial call for a human, so the
archive is left alone.

### Skipped, with reasons

- `28` **Smíchov bridge / tram closure** — not skipped; see `nadrazni-bridge-last-two-structures`
  above. The 1 October article covered the closure itself, so today's piece is confined to the lifts
  and the structure, which are new and attributed to Správa železnic.
- `27` **Book on the Petřín funicular launched on Malá Strana** — a book launch. An event.
- `23` **Nádraží Holešovice becomes "Knižní" for a day** — a one-day themed tram stop. An event, and
  gone by the time anyone reads it.
- `22` **Opera Pragensia awards** — an institution's prize gala. Awards are in the Skip column of the
  press-office test: what the city says about itself, not what it does to the city.
- `22` **Trvalé změny PID v září a říjnu 2026** — a bundled timetable notice. Its headline item,
  bus 137 becoming trolleybus 52, we published on 23 September
  (`2026-09-23-bus-137-becomes-trolleybus-52`). The one genuinely new item is tram 23's permanent
  reroute from 19 September (now Královka – Pražský hrad – Malostranská – Újezd – Národní třída –
  Václavské náměstí – Bílá labuť), but no source anywhere gives a reason for it, and a terminus
  moved on the heritage line with no explanation is a notice, not a story. Worth watching if DPP
  explains it.
- `19` **DPP replacing more sleepers on metro line C** — routine maintenance over one long weekend.
  Nothing decided since the last batch.
- `17` **ROPID "3 seconds" pedestrian safety campaign** — a safety campaign. Named in the skill as
  not the built environment.
- `16` **Klub Za starou Prahu schools programme**, `16` **Praha 7 lectures for seniors**,
  `15` **Open House autumn walks**, `14` **PID Point October timetables**, `13` **PID weekend events**
  — programmes, lectures and notices. None of them changes anything.
- `14` **Citybloky installed in Ovenecká, Praha 7** — this one was read in full before being dropped,
  because a street rebuilt without anti-parking bollards and immediately driven on is a real
  public-space point. The page is four sentences: no count, no material, no cost, no date beyond
  September, no name and no quote. It cannot be written to 400 words without inventing the specifics.
  Dropped as too thin to source, per step 3.
- `13` **One-day Žatec – Praha express ordered by municipalities** — a demonstration service on line
  110, outside Prague and outside the built environment.
- `13`/`12` **Petřín funicular reopened; 100,000 riders in eight days** — covered three times already
  (14, 22 and 26 September). The ridership figure is a progress note.
- `11` **AnimaWings insolvency**, `9` **Leo Express ends the Frankfurt – Praha – Przemyśl service** —
  carriers' commercial decisions. Neither changes what is built in Prague or how the city moves.
- `10` **"Kam po škole?" (CAMP)** — fetched and read. A magazine essay surveying school streets,
  skateparks and Spot Holešovice. Good material, but it announces nothing: no budget, no timeline, no
  decision. A magazine issue is in the skill's no column.
- `9` **Praha 10 office closed for a fire drill** — administrative notice.

### Other notes

- No wrong-city catches today. Nothing reached the list on a district name alone.
- `zdopravy.cz` again returned HTTP 403 to WebFetch and was read with a browser User-Agent per the
  skill. Expected, not a failure.
- Nominatim was reachable; no new places needed resolving. Both articles reuse points already in
  `data/places.json` and already published (Smíchov 50.0663/14.4088 from the 1 October article,
  Ruzyně 50.1078/14.2673 from `2026-09-06-airport-terminal-1-border-control-expansion`).
