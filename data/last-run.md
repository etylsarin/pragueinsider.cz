# Scan log — 2026-10-05

Scanned `2026-10-05T05:08:37.840Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 1 new of 40 (1 off-topic, 1 covered, 37 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 2 covered, 22 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 2 new of 10 (0 off-topic, 3 covered, 5 outside window)
- ✓ **PID / ROPID** — 4 new of 10 (4 off-topic, 2 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 2 new of 40 (35 off-topic, 3 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **iROZHLAS** — 1 new of 40 (39 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 7 new of 39 (27 off-topic, 5 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (1 off-topic, 0 covered, 9 outside window)

## Candidates — 19 in 19 clusters

1. `27` transport — Na Malé Straně pokřtili knihu o historii petřínské lanovky
2. `23` transport — Zastávka Nádraží Holešovice bude v pátek 2. října Knižní
3. `22` architecture — V cenách Opera Pragensia bodovala ředitelka CSOP i Raudnitzův dům
4. `22` transport — Trvalé změny PID v září a říjnu 2026
5. `19` transport — DPP o prodlouženém víkendu vymění další pražce na trati C
6. `17` transport — Tři sekundy, které mohou zachránit život. ROPID cílí na mladé chodce s mobily a sluchátky v ulicích Prahy
7. `16` architecture — Rozhodni o Praze! Praha v památkových sporech
8. `16` architecture — Zmizelá Praha: přednášky pro seniory na radnici
9. `15` architecture — Open House Praha na podzim odhalí zapomenuté příběhy Prahy
10. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen
11. `14` transport — Dočasné umístění citybloků v Ovenecké
12. `13` transport — Pozvánka na prodloužený víkend s PID: Den hrdinů a Poznej Vltavu
13. `13` development — Petřínská lanovka dnes po dvou letech obnovila provoz
14. `10` public-space — Kam po škole? Praha jako hřiště pro děti, které už z hřiště vyrostly
15. `9` transport — Lego to Open New Prague Store on Na Příkopě Street on October 22
16. `9` transport — Leo Express přestane od pondělí jezdit s dlouhou linkou Frankfurt – Praha – Přemyšl. Viní německé výluky
17. `9` planning — Úřad bude v pátek 25. 9. od 10.30 uzavřen kvůli požárnímu cvičení
18. `8` transport — Praha hostí šéfy letišť z Evropy a USA. Sama celoroční linku do Ameriky nemá
19. `7` transport — Opravy na Pražské ulici v Jablonci nad Nisou omezí dopravu. Jablonecká dopravní mění trasy dvou linek


## Decisions

Thin day. Nineteen candidates in nineteen clusters, not one with `sourceCount > 1`, and the two
items that read strongest on the list turned out to be stories we had already published.

### Written (1)

- **`heritage-tram-23-drops-zvonarka`** — the nostalgic line 23 was rerouted on 19 September and
  now ends at Bílá labuť instead of Zvonařka, losing the leg beyond Národní třída towards
  I. P. Pavlova. ROPID files it under *trvalé* changes, so it is a standing routing decision and
  not a diversion. Three sources: the ROPID bulletin for the change and date, DPP's own line page
  for the full stop list and the operating detail (daily, modernised T3s only, PID tariff, ~8.30
  to 18.00, 30-minute interval, 31 minutes end to end), and Expats.cz from March 2017 for the
  original Královka–Zvonařka route. **Neither ROPID nor DPP gives a reason for the change, and the
  article says so rather than supplying one** — see the note on blocked hosts below, which is why
  it could not be chased further.

### Released (2)

- `nadrazni-bridge-last-two-structures` — written 2026-10-04, released today as the lead
  (`featured: true`). The two steel structures go in on the nights of 6–7 and 8–9 October, so it
  is the stronger of the two and dated to this week.
- `heritage-tram-23-drops-zvonarka` — written today, released today.

Both are transport; `release.mjs` permits two from one desk and only blocks a third. The queue is
now **empty**, so a thin tomorrow has nothing banked to draw on.

### Skipped, with reasons

- `27` **Petřínská lanovka book launch (Praha 1)** — a book christening. An event, not the built
  environment.
- `23` **Nádraží Holešovice as a "book stop" (Praha 7)** — a themed tram stop for one day.
- `22` **Opera Pragensia awards (Praha 5)** — awards, and a district newsletter reporting that its
  own people won them. Nothing decided about anything that gets built.
- `22` **Trvalé změny PID v září a říjnu 2026** — written, see above. Its headline item (bus 137 →
  trolleybus 52) was already published on 2026-09-23.
- `19` **DPP replacing more sleepers on line C** — a maintenance weekend, and the third in a
  series. Progress note with nothing decided since last time.
- `17` **ROPID "3 sekundy… to je easy" campaign** — a road-safety campaign, not the built
  environment.
- `16` **Klub Za starou Prahu school programmes on heritage disputes** — an education programme.
- `16` **"Zmizelá Praha" lectures for seniors (Praha 7)** — a lecture series.
- `15` **Open House Praha autumn walks** — a programme of events.
- `14` **PID Point October timetables** — a notice.
- `14` **Citybloky in Ovenecká (Praha 7)** — fetched it. Temporary concrete blocks put in at TSK's
  request to stop cars mounting the new footways, pending permanent bollards. No count, no cost, no
  date for the replacement, no named official. Thin, local and temporary; dropped rather than
  padded.
- `13` **PID at Den hrdinů / Poznej Vltavu** — an event invitation.
- `13` **Petřín funicular back in service** — already published, twice: 2026-09-14 (the date being
  set) and 2026-09-22 (the reopening).
- `10` **CAMP: "Kam po škole?"** — fetched it. A magazine essay by Dominika Antonie Pfister
  surveying existing interventions for teenagers. No decision, no budget, no timetable, no named
  official. A magazine piece is not a story.
- `9` **Lego store on Na Příkopě** — a shop fit-out.
- `9` **Leo Express ends Frankfurt – Praha – Přemyšl** — a service does close, but the cause is
  German engineering work and the subject is an operator's commercial decision about an
  international line, not Prague's built environment.
- `9` **Praha 10 office shut for a fire drill** — an administrative notice.
- `8` **Prague hosts European and US airport chiefs** — a conference.
- `7` **Roadworks on Pražská in Jablonec nad Nisou** — **not Prague.** The street name *Pražská*
  got it past the filter and the iROZHLAS feed carries no Prague-district clue to veto on. This is
  the wrong-city case the skill warns about; the misleading token is the adjective *Pražská* used
  as a street name outside Prague. Possibly addressable in `scripts/lib/relevance.mjs` by vetoing
  on *Pražská/Pražské* as a street name when another town is named in the title — here "Jablonec
  nad Nisou" is in the title, so it looks fixable. Not changed today; flagged for a human.

### Sources that errored

- **archiweb.cz — HTTP 429 for the fourteenth consecutive day (22 September – 5 October).** The
  2026-10-04 log counted thirteen; today makes fourteen. This is *not* broken markup and not an
  adapter fix. The adapter's own header documents it: since 2026-09-28 archiweb returns 429 to our
  declared `PragueInsiderBot` user-agent on every path including the homepage, while the same URLs
  answer 200 to a browser UA. The site has effectively blocked us by name. Spoofing a browser UA
  to get back in is an editorial decision for a human, not something the desk should do on its own
  — **this needs a human call, and it has been pending for two weeks.** Until someone makes it
  (ask archiweb for access, change the declared agent with their agreement, or drop the source)
  the architecture wire stays dark. Today shows the cost again: the only architecture candidates
  the scan could offer were an awards gala, a lecture series for seniors and a schools education
  programme, and all three were skipped.

### Blocked hosts (new today, needs a human)

Three hosts that would have improved today's one story are refused by the environment's network
egress allowlist:

- `izdoprava.cz` and `muzeum.dpp.cz` — EGRESS_BLOCKED. Both carry the line 23 reroute in more
  detail than ROPID's one-line bulletin.
- `www.praha2.cz` — EGRESS_BLOCKED. Its page "Dočasné změny tramvajového provozu na Zvonařce"
  looks like the explanation for why line 23 lost its Zvonařka terminus, and it is the one host
  that would have let the article answer its own open question. Note that `www.praha2.cz` is a
  separate allowlist entry from the district hosts that do work (`praha1.cz`, `praha5.cz`,
  `praha7.cz`, `praha10.cz`), per the per-host rule in `CLAUDE.md`.

Nominatim was reachable; `Bílá labuť` was resolved to the tram stop (`--pick 4`, 50.0902/14.4355)
rather than the default department-store hit, and written back to the gazetteer.

