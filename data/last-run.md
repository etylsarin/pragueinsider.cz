# Scan log — 2026-09-25

Scanned `2026-09-25T05:08:40.590Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 1 new of 40 (1 off-topic, 1 covered, 37 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 1 covered, 23 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 2 new of 10 (0 off-topic, 5 covered, 3 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (5 off-topic, 2 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✗ **archiweb.cz** — HTTP 429
- ✓ **Zdopravy.cz** — 5 new of 40 (35 off-topic, 0 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 1 new of 10 (7 off-topic, 2 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 1 new of 10 (9 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (25 off-topic, 0 covered, 0 outside window)
- ✓ **Městské části** — 10 new of 40 (29 off-topic, 1 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)

## Candidates — 23 in 22 clusters

1. `30` transport — Prague Metro and Tram Disruptions Planned for September 28 Weekend
2. `20` architecture _[2 sources]_ — Průmyslový palác se otevírá po rekonstrukci
3. `20` transport — Oznámení plánovaných hlučných prací v oblasti Nového spojení
4. `19` transport — DPP o prodlouženém víkendu vymění další pražce na trati C
5. `19` planning — Pražské ulice mají co vyprávět. Přibývají modré tabulky
6. `18` planning — Radní podpořili granty na příští rok
7. `17` transport — Přestavba přetížené křižovatky u Zličína se rozbíhá. Hlavní práce odstartují příští rok
8. `17` development — Rohanský ostrov má novou galerii pod širým nebem
9. `17` transport — Tři sekundy, které mohou zachránit život. ROPID cílí na mladé chodce s mobily a sluchátky v ulicích Prahy
10. `14` transport — V domově seniorů U Vršovického nádraží proběhne školení s možností cvičné střelby
11. `14` public-space — Ve škole a školce přibude zeleň
12. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na září a říjen
13. `13` transport — Pozvánka na prodloužený víkend s PID: Den hrdinů a Poznej Vltavu
14. `13` development — Petřínská lanovka dnes po dvou letech obnovila provoz
15. `13` transport — Nejlepší a nejhorší nádraží Evropy. Praha je ve čtvrté desítce, chvost obsadila německá města
16. `13` public-space — Přehled akcí v Praze 5 tento týden
17. `12` transport — Potvrzeno: Italské rychlovlaky spojí Mnichov a Řím. Z Prahy do italské metropole bude stačit jeden přestup
18. `12` transport — Letů na Madeiru z Prahy ubude. Eurowings zrušily plánované spojení
19. `10` transport — Praha 5 vezme seniory na výlet
20. `10` public-space — Kam po škole? Praha jako hřiště pro děti, které už z hřiště vyrostly
21. `9` planning — Úřad bude v pátek 25. 9. od 10.30 uzavřen kvůli požárnímu cvičení
22. `8` transport — V Praze vzniklo další velké P+R parkoviště. Na půlku dne půjde odstavit auto bezplatně


## Decisions

### Written to the queue — 4

- **Průmyslový palác se otevírá po rekonstrukci** (`prumyslovy-palac-reopens`, architecture) —
  written. Two sources (Praha 7 + ČT24), and the strongest test of all: the building is open.
  Eighteen years after the October 2008 fire, four and a half years of works, roughly three billion
  crowns, the left wing rebuilt and the rest restored. Both outlets agree on cost and duration.
  Released today and pinned as the lead.
- **Přestavba MÚK Třebonice** (`trebonice-junction-capacity-works`, transport) — written.
  Construction started, contractor named, price named: Silnice Group at 568.1m Kč before VAT, stage
  0 to finish 2028, main works spring 2027. Clears the bar on several counts at once.
- **Betonárka na Rohanském ostrově skončí v roce 2028** (`rohansky-ostrov-concrete-plant-2028`,
  development) — written. The mural is the occasion, the operator's closing date is the story, and
  the district's own admission that the city-farm scheme is a vision rather than a permitted project
  is what makes it worth writing rather than repeating. Released today.
- **Nové P+R v Modřanech** (`modrany-park-and-ride-opens`, transport) — written, and the weakest of
  the four by some distance. 52 spaces is a small number and the article says so. It is in because
  something was completed and opened, with capacity, regime and a named quote, not because the wire
  needed filling.

### Released — 3 (the release set is not the writing set)

`release.mjs` took Balabenka (queued 22 Sept) and then reached past two further transport items in
the queue for the architecture and development pieces written today, which is the desk-mix rule
working as intended. Released: `balabenka-recycling-line-objections`,
`prumyslovy-palac-reopens` (**featured**), `rohansky-ostrov-concrete-plant-2028`. Six left queued.

### Skipped, with reasons

- **Prague Metro and Tram Disruptions Sept 28 Weekend** (#1) and **DPP vymění další pražce na
  trati C** (#4) — the same long-weekend engineering works from two angles. A closure that ends on
  Monday; nothing to read in a month.
- **Oznámení hlučných prací, Nové spojení / estakáda Sluncová** (#3) — a noise notice for scheduled
  maintenance. A notice, not a decision.
- **Modré tabulky v Praze 1** (#5) — street-name information plaques, a project running since 2020
  with nothing newly decided. District newsletter material.
- **Praha 5 vyhlásí granty na příští rok** (#6) — grant programmes approved but the total depends on
  a 2027 budget that does not exist yet, so there is no figure. Local administrative detail.
- **ROPID: 3 sekundy, to je easy** (#9) — a road-safety campaign. Not the built environment, per the
  skill's own example.
- **Školení s cvičnou střelbou v domově seniorů** (#10), **Úřad uzavřen kvůli požárnímu cvičení**
  (#21) — not the built environment at all; filter passed them on district-name relevance alone.
- **Zeleň u ZŠ a MŠ Radlická** (#11) — a foundation grant for planting at one school. Would not
  matter to a reader in another district.
- **PID Point jízdní řády** (#12), **Pozvánka na prodloužený víkend s PID** (#13), **Přehled akcí
  v Praze 5** (#16), **Praha 5 vezme seniory na výlet** (#19) — notices and events programmes.
- **Petřínská lanovka obnovila provoz** (#14) — already ours. The reopening is covered inside the
  queued `petrin-funicular-stations-rebuild-schedule`, written 23 Sept. One story, one article.
- **Nejlepší a nejhorší nádraží Evropy** (#15) — a consumer-organisation ranking. Nothing changed;
  it is a description, and the first test is the one it fails.
- **Italské rychlovlaky Mnichov–Řím** (#17), **Eurowings ruší Madeiru** (#18) — international rail
  and airline commercial planning. Tagged transport by the score, not Prague's built environment.
- **Kam po škole (CAMP magazín)** (#20) — a magazine feature, named in the skill as the sort of
  thing that does not qualify.

### Source health — needs a human

**archiweb.cz has now failed two days running, and it is not a markup change.** Checked directly:
the listing at `https://www.archiweb.cz/n` returns **HTTP 429 to our own bot user-agent** and
**HTTP 200 to a browser user-agent** on the same request from the same host. The site is refusing
the identified `PragueInsiderBot/1.0` string specifically, so fixing the selector would achieve
nothing.

The obvious workaround — send a browser user-agent, as the skill already sanctions for
zdopravy.cz — is a bigger decision here than it looks, because `scripts/lib/http.mjs` identifies
the bot on purpose and links to the Editorial Standards page so a publisher who wants us gone can
say so. Archiweb may be saying so. That is an editorial call about a stated public policy, not a
scraper fix, so the desk has left the adapter alone and is escalating it rather than quietly
switching the header.

### Geocoding note

`Nádraží Modřany` resolved to Vltavanů in **Komořany** — a ferry-terminal point, not the tram/rail
interchange the story is about — and the candidate order was unstable between calls, so `--pick`
could not be relied on to correct it. The bad entry was deleted from `data/places.json` rather than
committed, and the P+R article is pinned to `Generála Šišky, Modřany` (50.0028, 14.4148), the street
where the tram and the railway run alongside each other. Textbook case of the gazetteer gotcha in
CLAUDE.md.

No wrong-city item was found in today's list; no candidate reached the desk on a district name that
turned out to belong to Brno or Písek.
