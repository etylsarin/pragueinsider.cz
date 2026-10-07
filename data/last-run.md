# Scan log — 2026-10-07

Scanned `2026-10-07T05:08:49.434Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (1 off-topic, 1 covered, 38 outside window)
- ✓ **IPR Praha** — 1 new of 24 (0 off-topic, 2 covered, 21 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 3 new of 10 (0 off-topic, 3 covered, 4 outside window)
- ✓ **PID / ROPID** — 2 new of 10 (3 off-topic, 1 covered, 4 outside window)
- ✓ **Klub Za starou Prahu** — 1 new of 10 (0 off-topic, 0 covered, 9 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 6 new of 40 (34 off-topic, 0 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (9 off-topic, 1 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 2 new of 25 (23 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 7 new of 40 (30 off-topic, 3 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (2 off-topic, 0 covered, 8 outside window)

## Candidates — 23 in 23 clusters

1. `20` transport — Praha vybrala stavitele největšího dopravního terminálu v metropoli. Cena v soutěži klesla o miliardu
2. `19` transport — I tramvajová trať může zkulturnit město. Praha dostala návod, jak by ty nové měly vypadat
3. `19` public-space — Praha 7 modernizuje školní budovy a začne stavět novou školu pro 570 žáků
4. `19` architecture — Dny otevřených dveří Průmyslového paláce
5. `19` transport — DPP o prodlouženém víkendu vymění další pražce na trati C
6. `18` transport — V Praze vzniká další nová tramvajová trať Malovanka – Strahov
7. `16` architecture — Sedmička jde na Designblok se slevou
8. `16` architecture — Rozhodni o Praze! Praha v památkových sporech
9. `16` architecture — Zmizelá Praha: přednášky pro seniory na radnici
10. `15` transport — Pražská vlaková krize. České dráhy začnou hlásit dopředu, kde pojede mimořádně sólo jednotka
11. `14` development — Dětské skupiny se rozšířily o dvanáct míst
12. `14` transport — Kvalitnější dlažba i sukulenty mezi kolejemi. Praha představila Standard tramvajových tratí
13. `14` transport — Elefanty jako nedostatkové zboží. V Praze a okolí jich chybí desítky, podle Boreckého je to neakceptovatelné
14. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na říjen
15. `13` public-space — Kolíčkový den pomůže dětem a mladým lidem s handicapem
16. `13` transport — Tramvajový boom v Praze vrcholí: Začala stavba nové trati z Malovanky na Strahov
17. `13` transport — Pozvánka na prodloužený víkend s PID: Den hrdinů a Poznej Vltavu
18. `13` development — Petřínská lanovka dnes po dvou letech obnovila provoz
19. `10` transport — V Portheimce si můžete zahrát šachy pod širým nebem
20. `9` public-space — Famous Dancing House Photo Spot in Prague Is Set for a Major Makeover
21. `9` transport — Prague starts construction of new tram line connecting Strahov to city network
22. `8` transport — Praha hostí šéfy letišť z Evropy a USA. Sama celoroční linku do Ameriky nemá
23. `6` transport — Prague ranks among Europe’s top 10 most dog-friendly cities in new list


## Decisions

The best day in a fortnight, and the first in a while where the strongest candidates were not
transport-by-default. Twenty-three candidates in twenty-three clusters, but the clustering
under-counted: three of those clusters are one story (Malovanka – Strahov, from DPP, Zdopravy and
Expats) and two more are another (the tram-track standard, from IPR and Zdopravy). Read properly the
day offered two multi-source stories, not none.

No run was logged on 2026-10-06 — the previous log is dated 10-05 and `data/seen.json` had not moved
since. Nothing was lost, because `seen.json` is only written on a successful push, so today's scan
surfaced the 10-06 stories too. Worth a human glance at the routine's run log for that date.

### Written (4)

- **`smichov-terminal-builder-selected`** (transport) — Prague's councillors approved the evaluation
  committee's pick of builder for the Nádraží Smíchov terminal on 5 October, at their last meeting
  before the election. A seven-firm consortium led by SMP Construction (Vinci) at CZK 6.197bn
  excl. VAT against an estimated value of CZK 7,124,313,780 — Beránek's "almost a billion" saving
  measured against the 2023 assumption. Single source (Zdopravy.cz, which obtained the price and the
  Beránek quote exclusively); attributed to the outlet by name throughout. The sequencing is the
  story: construction cannot start until Správa železnic finishes the platform piers and sells them
  to the city. Also carries the re-tendered construction supervision contract, lost to objections in
  the first round.
- **`malovanka-strahov-ground-broken`** (transport) — foundation stone laid 5 October at the future
  Strahov loop. Three sources, cross-checked. **Two disagreements reported rather than resolved:**
  DPP names the Společnost TT Malovanka consortium as three firms (Elektrizace železnic Praha,
  FIRESTA–Fišer, PEDASTA) and the consortium's own quote in DPP's release confirms three, while
  Zdopravy lists only the first two; and DPP says the third stop pair and the loop are now *Strahov*
  (working name Stadion Strahov), which Zdopravy still uses and Expats does not. Deliberately not a
  rehash of `2026-08-25-malovanka-strahov-tram-contract`: the CZK 824m contract is one line of
  context and the article is about the start, the roughly one-year slip caused by the ÚOHS review on
  T4 Building's complaint, and what gets rebuilt on Bělohorská and Vaníčkova.
- **`tram-track-design-standard`** (public-space) — IPR and DPP published the Standard tramvajových
  tratí on 5 October as a new chapter of the Katalog doporučených prvků veřejných prostranství. Two
  sources. Filed to public-space rather than transport on the document's own terms: it is a chapter
  of a public-space catalogue, and Boháč's argument for it is an area figure (nearly 1.25 million m²)
  rather than a network one. The article says plainly that neither source claims the standard binds
  anybody. **Left in the queue** — see Released below.
- **`jiraskovo-namesti-redesign`** (public-space) — Praha 2 to rebuild Jiráskovo náměstí over two
  years for about CZK 35m, from a 2022 archiF study: part of the ruined lawn paved for the Dancing
  House photographers, Vlastislav Hofman's Cubist fountain restored to working order from his own
  rediscovered drawings, the Jirásek monument moved. Single source (Prague Morning, 6 October), and
  the article says so — `www.praha2.cz` is still EGRESS_BLOCKED (see below), so the primary could not
  be read. The last section lists what the reporting does not give: no procurement stage, no
  contractor, no start date, no named official, no breakdown of the 35 million.

### Released (3)

`release.mjs` took three of the four and left one. Desk mix came out two transport, one public-space,
which is inside what the script permits.

- `smichov-terminal-builder-selected` — **the lead (`featured: true`)**. The largest interchange in
  the city, a builder chosen, a billion off the estimate, decided at the last council meeting of the
  term. Nothing else today is close.
- `malovanka-strahov-ground-broken`
- `jiraskovo-namesti-redesign`
- **Held:** `tram-track-design-standard`, queued today, releases tomorrow. The queue is **one deep**,
  which is one more than yesterday had.

### Skipped, with reasons

- `19` **Praha 7 modernizuje školní budovy / ZŠ Jana Vodňanského** — the closest call of the day, and
  skipped as a progress note. We published the Jankovcova school on 2026-09-15
  (`jankovcova-school-loan-approved`) with the financing, the 18 classrooms, Přádelní street and the
  rooftop pitch. What has changed since is that demolition is under way on the plot and the building
  procurement is live — no contractor, no date, and the district's own wording is that it *wants* to
  start building soon. The rest of the release is school roofs, wiring and a playground, which fails
  the test of mattering to a reader in another district. **One discrepancy for a human:** this release
  says roughly **570** pupils, where the ČTK-sourced September piece said roughly **550**. Both are
  "approximately"; neither is obviously wrong; flagged rather than silently reconciled.
- `19` **Dny otevřených dveří Průmyslového palace (Praha 7)** — an open-doors event.
- `19` **DPP replacing more sleepers on line C** — a maintenance weekend, skipped on 10-05 for the
  same reason and nothing has been decided since.
- `16` **Sedmička jde na Designblok se slevou** — a discount on a trade fair ticket.
- `16` **Klub Za starou Prahu, "Rozhodni o Praze!"** — a schools education programme, skipped 10-05.
- `16` **"Zmizelá Praha" lectures for seniors (Praha 7)** — a lecture series, skipped 10-05.
- `15` + `13` **Pražská vlaková krize / Elefanty jako nedostatkové zboží** — editorially one subject,
  and the hardest of today's skips to be sure about. ČD is short of 471 CityElefant and RegioPanter
  units for the second time in a fortnight; Středočeský councillor Petr Borecký calls it "naprosté
  selhání" and "neakceptovatelné", and the counts themselves are disputed (ROPID: 15 of 71 missing;
  Borecký, citing a ČD email: 23 units 471 plus 5 RegioPanter). Skipped because it is fleet
  availability and depot maintenance, not the built environment, and because nothing has been decided
  — the follow-up item is ČD agreeing to publish by 18:00 which trains will run as solo units, which
  is an information practice. If a human disagrees and wants PID rolling-stock reliability treated as
  in-scope, say so and the bar moves for it; the desk did not move it unilaterally.
- `14` **Dětské skupiny se rozšířily o dvanáct míst (Praha 5)** — twelve nursery places, local
  administrative detail.
- `14` **PID Point October timetables** — a notice.
- `13` **Kolíčkový den (Praha 1)** — a charity day.
- `13` **PID at Den hrdinů / Poznej Vltavu** — an event invitation, skipped 10-05.
- `13` **Petřínská lanovka back in service** — already published twice, 2026-09-14 and 2026-09-22.
- `10` **Open-air chess in Portheimka (Praha 5)** — a programme of activities.
- `8` **Praha hostí šéfy letišť z Evropy a USA** — a conference, skipped 10-05.
- `6` **Prague in a top-10 dog-friendly cities list** — a listicle.

No wrong-city candidate today. The `Pražská` street-name case flagged on 10-05 (roadworks in Jablonec
nad Nisou) did not recur, and the suggested `relevance.mjs` veto for it is still unimplemented and
still waiting on a human.

### Sources that errored

- **archiweb.cz — HTTP 429 again.** The outage now spans 22 September to 7 October, sixteen days,
  though no run was logged on 10-06, so today is the fifteenth on which it has actually been
  observed. The 10-05 log counted fourteen. Not broken
  markup and not an adapter fix: since 2026-09-28 archiweb returns 429 to our declared
  `PragueInsiderBot` user-agent on every path including the homepage, while the same URLs answer 200
  to a browser UA. The site has blocked us by name. Spoofing a browser UA to get back in is an
  editorial decision for a human, not the desk's to take, and **it has now been pending for over two
  weeks.** Today's cost is the same as on 10-05: nothing was published on the architecture desk,
  because the only architecture-tagged candidates the scan could offer were an open-doors event, a
  Designblok ticket discount, a schools education programme and a lecture series for seniors. Four
  items, not one of them a story. Options for whoever picks this up: ask archiweb for
  access, change the declared agent with their agreement, or drop the source.

### Blocked hosts (still blocked, needs a human)

- `www.praha2.cz` — EGRESS_BLOCKED, flagged on 10-05 and unchanged. It cost a second article today:
  the Jiráskovo náměstí redesign had to be written from Prague Morning's English summary rather than
  Praha 2's own release, which is why that piece carries one source and an explicit list of what is
  not known. Note the per-host rule in `CLAUDE.md` — `www.praha2.cz` is a separate allowlist entry
  from the district hosts that do work (`praha1.cz`, `praha5.cz`, `praha7.cz`, `praha10.cz`).
  `izdoprava.cz` and `muzeum.dpp.cz`, also flagged on 10-05, were not needed today.

Nominatim was reachable. `Jiráskovo náměstí` and `Stadion Strahov` were both resolved and written
back to the gazetteer, which now holds 101 places. Two of its suggested districts were overridden, as
the skill says to: it returned Vyšehrad for Jiráskovo náměstí (used `Praha 2 – Nové Město`, the
square's postal form and what the Dancing House's address uses) and Střešovice for Stadion Strahov
(used `Praha 6 – Břevnov`, which is the stadium's address and what our own August article on this
line used).

