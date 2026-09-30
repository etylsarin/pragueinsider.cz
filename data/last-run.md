# Scan log — 2026-09-30

Scanned `2026-09-30T05:18:10.581Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 1 new of 40 (1 off-topic, 1 covered, 37 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 1 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 2 new of 10 (0 off-topic, 3 covered, 5 outside window)
- ✓ **PID / ROPID** — 4 new of 10 (4 off-topic, 2 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 3 new of 40 (37 off-topic, 0 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 1 new of 10 (8 off-topic, 1 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 2 new of 10 (8 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 1 new of 25 (24 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 9 new of 38 (27 off-topic, 2 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)

## Candidates — 23 in 23 clusters

1. `23` transport — Zastávka Nádraží Holešovice bude v pátek 2. října Knižní
2. `22` architecture — V cenách Opera Pragensia bodovala ředitelka CSOP i Raudnitzův dům
3. `22` transport — Trvalé změny PID v září a říjnu 2026
4. `19` transport — DPP o prodlouženém víkendu vymění další pražce na trati C
5. `18` planning — Radní podpořili granty na příští rok
6. `17` transport — Tři sekundy, které mohou zachránit život. ROPID cílí na mladé chodce s mobily a sluchátky v ulicích Prahy
7. `16` public-space — Pravdy a nepravdy o revitalizaci Kampy. Aktuální informace najdete na jednom místě
8. `15` architecture — Prague’s Kramář Villa to Open for Free Visits on October 3
9. `15` architecture — Open House Praha na podzim odhalí zapomenuté příběhy Prahy
10. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na září a říjen
11. `14` transport — Dočasné umístění citybloků v Ovenecké
12. `14` transport — V domově seniorů U Vršovického nádraží proběhne školení s možností cvičné střelby
13. `13` transport — Obrazem: Stavba roky blokovaného nadjezdu koridoru ve Velké Chuchli se posunula do další fáze
14. `13` transport — Pozvánka na prodloužený víkend s PID: Den hrdinů a Poznej Vltavu
15. `13` development — Petřínská lanovka dnes po dvou letech obnovila provoz
16. `11` development — Bolt and Lucid Plan 25,000 Autonomous Vehicles Across Europe
17. `10` transport — Pražský okruh neplánovaně uzavřou, bude se usazovat mostní nosník
18. `10` transport — Praha 5 vezme seniory na výlet
19. `10` public-space — Kam po škole? Praha jako hřiště pro děti, které už z hřiště vyrostly
20. `9` planning — Úřad bude v pátek 25. 9. od 10.30 uzavřen kvůli požárnímu cvičení
21. `8` development — Prague's build-to-rent boom: Thousands of new apartments could be coming
22. `7` transport — Miliardový zisk na kolejích. AŽD Praha odhalila výsledky za poslední rok
23. `7` transport — Požár bytu v centru Prahy omezil provoz tramvají


## Decisions

**Two written, two released, queue empty.** Both came from the same source and neither was on the
candidate list when the morning started — they were recovered from the filter's reject pile, which
is where today's real work was.

Yesterday's log asked for a look at whether `relevance.mjs` was dropping too much, after three
consecutive days with nothing written. It was. See **The filter was hiding stories** below.

Fetched and read in full before deciding: both Zdopravy articles, the Praha 1 Kampa page and its
linked project subpage, the Praha 7 Ovenecká and Nové Holešovice pages, the Praha 8 paid-parking
notice, the CAMP Nuselský pivovar feature and the PID permanent-changes page. Everything else was
judged from the digest entry, most of it carried over unchanged from yesterday.

### Published

- **`velka-chuchle-overpass-foundations`** (transport, **lead**) — Správa železnic says the road
  overpass over the Praha – Beroun line has finished its foundations and moved to the deck.
  Váhostav and Colas at 474.6 million crowns, commissioning still end of 2027, level crossing P261
  abolished on opening and replaced by a step-free pedestrian underpass with exits on
  Starochuchelská, Dostihová and Radotínská connecting to the new Praha-Velká Chuchle station.
  Carries the dispute that cost the years: the district assembly could not agree between an
  overpass and an underpass, the then mayor Lenka Felix pushed the underpass and was removed from
  office in spring 2021. Zdopravy gives no reason for the removal and the article says so rather
  than supplying one. Pinned as the lead: money committed, a schedule that holds, a crossing being
  abolished and a decade of local politics behind it.
- **`hodkovicky-tram-stop-opens`** (transport) — the Hodkovičky request stop opens Wednesday
  7 October, halving a kilometre gap between Černý kůň and Belárie on the Modřany line. About
  27 million crowns excluding VAT, 67-metre platforms, originally due to open in the spring. The
  story is the 164-signature residents' petition that produced it, quoted verbatim: the complaint
  is the unlit walk home from the tram, not journey time. The bus half on Modřanská passed from DPP
  to TSK by councillors' decision and brings a signalised crossing and a narrower carriageway.

Both are transport, which is the desk that is already over-represented. Neither was written to fill
a quota and the planning and public-space candidates were all read before the day was called — the
strongest of them, Kampa, is immediately below and did not clear the bar.

### The filter was hiding stories

The reject piles of every source were read item by item. The Prague test is working almost
everywhere — nearly every dropped item is Brno, Ostrava, Hradec Králové, Náchod, Karlovy Vary,
Liberec, Dubai or Boeing, correctly gone. But two Prague items were being thrown away, and both
were publishable:

1. **`chuchle` was never a stem.** `PRAGUE_PLACES` is matched as a substring against folded text,
   so `'chuchle'` does not match "ve Velké **Chuchli**" — and for a national outlet such as
   Zdopravy the Prague evidence has to be in the headline, which declined the name. A
   474-million-crown railway overpass in Prague therefore sat in the feed invisible. Fixed to
   `'chuchl'` and `'velka chuchl'`, committed separately as `relevance: match declined Prague place
   names, add Hodkovičky`. Verified: Zdopravy goes from 2 candidates to 3, the extra one being the
   overpass, with no other source's counts moving.
2. **Hodkovičky was not in the place list at all.** Added as `'hodkovick'` and `'hodkovicek'` —
   deliberately not `'hodkovic'`, which would also match Hodkovice nad Mohelkou in the Liberec
   region.

The same audit found several more entries in `PRAGUE_PLACES` that are nominatives rather than stems
and so miss the case a headline actually uses — `letna` against "na Letné", `kampa` against "na
Kampě", `lhotka` against "na Lhotce", `reporyje` against "v Řeporyjích", `kolovraty` against "v
Kolovratech", `kbely` against "v Kbelích", `sterboholy` against "ve Štěrboholích", and the
multiword `nove mesto` / `stare mesto` / `mala strana` / `vaclavske namesti` against their locative
forms. Those were left alone today: some cannot be shortened without over-matching (`letn` would
catch `letni` and `letnany`), the adjectival entries `malostransk` and `staromestsk` already cover
two of them, and a broad rewrite of the list on a publishing morning is how tomorrow's digest
fills with false positives. **This is the most useful thing a human could pick up from today.**

### Not published

- **Pravdy a nepravdy o revitalizaci Kampy (Praha 1, 29 Sept)** — skipped, and it was the closest
  call of the day. The archive already carries the decision at
  `2026-09-18-kampa-park-uohs-clears-contract`, and nothing has been decided since: the ÚOHS
  finality of 10 September is ours already, and the schedule — the one thing a Kampa regular wants
  — is still unpublished. What is new is a rebuttal page, and it does put useful commitments on
  record (no "cyklodálnice", no permanent stage, no pobytové schody to Čertovka, no blanket shrub
  clearance, no full closure, trvalkové záhony only at named spots). But the contested angle is the
  story here, and it cannot be sourced: the page answers claims it never attributes to anybody, and
  a search turned up no named objector, petition or association. Writing it from the district's
  answers alone would publish Praha 1's communications as though it were a dispute. **Worth
  returning to** when the schedule appears or when somebody puts their name to the objections.
- **Nové Holešovice, výstava na radnici (Praha 7, 24 Sept)** — skipped, an exhibition of the
  competition entries, 5 October to 2 November at the Praha 7 town hall. Checked whether the
  underlying competition result was the story and it is not new: the workshop was won by
  Chybík + Krištof and the archive carries it at
  `2026-09-20-nadrazi-holesovice-competition-chybik-kristof`. The page names no winner and is an
  invitation.
- **Dočasné umístění citybloků v Ovenecké (Praha 7, 29 Sept)** — skipped, district detail.
  Concrete blocks placed at TSK's request to stop cars driving onto the rebuilt pavements, a
  necessary temporary measure "než je nahradí sloupky", with tree planting due in autumn 2026. A
  real intervention, but one street, no timeline for the permanent bollards and no decision.
- **Rozšíření zón placeného stání od 15. října 2026 (Praha 8, 24 Sept)** — skipped, district
  detail. Paid parking extended in area P8.3 on Černého, Bešťákova, Roudnická and Wichterlova.
  Dated and real, but four streets; it would not matter to a reader in another district.
- **Nový život mezi komíny: Nuselský pivovar (CAMP, 24 Sept)** — skipped, a retrospective feature.
  Penta Real Estate, CMC Architects and CHYBIK + KRISTOF, 504 flats, built 2021–2025, playground
  opened end of 2025, and a fair passage on gentrification risk at 8 million crowns for a 1+kk.
  Nothing has just changed; the completion it describes is a year old.
- **Zastávka Nádraží Holešovice bude Knižní (Praha 7 / PID)** — skipped, a one-day themed tram stop
  with the Municipal Library. An event, and top of the list only because the score ranks relevance.
- **Kramář Villa free visits 3 October** and **Open House Praha's autumn programme** — skipped,
  events and a programme of events.
- **Opera Pragensia awards**, **Trvalé změny PID v září a říjnu**, **DPP sleeper replacement on
  metro C**, **the Pražský okruh girder-lift closure**, **the build-to-rent market piece**, **Kam
  po škole?**, **Praha 5's 2027 grant programmes**, **the ROPID "3 sekundy" campaign**, **PID
  Point**, **the PID weekend events**, **Praha 5's senior outing**, **the Praha 10 active-shooter
  training and fire drill**, **Bolt and Lucid**, **AŽD Praha's results** and **the flat fire that
  disrupted trams** — skipped for the reasons given in the 29 September log, which all still hold.
  The list is largely yesterday's list.

### Needs a human

**archiweb.cz has now returned HTTP 429 for nine consecutive days (22–30 September).** Unchanged
and unchanging: as the 26 September log established, this is not rate-limiting and not a markup
change — the site answers 200 to a plain request and to no user-agent at all, and refuses the
string `PragueInsiderBot` by name. The desk will not spoof a browser user-agent against a site that
has asked it not to read, so the architecture wire stays dark until somebody decides the policy:
ask archiweb for access, change the declared agent with their agreement, or drop the source. It is
the only architecture-only source in the list, and nine days is long enough that this should stop
being a line in a log.

**The headline-only rule for national outlets is costing real stories, and changing it is a policy
call.** The Hodkovičky piece is the clean example. Its headline — "Zbrusu nová tramvajová zastávka
už má datum otevření" — contains no Prague word at all; the place appears only in the summary and
in Zdopravy's own tags (`Hodkovičky`, `dpp`). Adding `'hodkovick'` to the list does not recover it,
and the story is only in today's archive because the reject pile was read by hand. The rule exists
for a documented reason (a bus tender in Vysočina and a Bavarian rail contract got through on
"Praha" appearing in a dateline or in "Dopravní podnik hl. m. Prahy"), and that reason is about
*summary* prose. **Tags are not prose** — they are the outlet's own classification, and Zdopravy
tags by place. Letting tags count as headline-strength Prague evidence, while leaving the summary
out of it, looks like the right fix, but it changes the filter's whole false-positive posture and
wants testing against a corpus rather than one morning's feed. Not done today.
