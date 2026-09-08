# Scan log — 2026-09-08

Scanned `2026-09-08T05:08:18.936Z`, window 21 days.

## Sources

- ✓ **praha.camp (CAMP)** — 0 new of 40 (0 off-topic, 1 covered, 39 outside window)
- ✓ **IPR Praha** — 0 new of 24 (0 off-topic, 3 covered, 21 outside window)
- ✓ **Dopravní podnik hl. m. Prahy** — 1 new of 10 (0 off-topic, 7 covered, 2 outside window)
- ✓ **PID / ROPID** — 3 new of 10 (4 off-topic, 3 covered, 0 outside window)
- ✓ **Klub Za starou Prahu** — 0 new of 10 (0 off-topic, 0 covered, 10 outside window)
- ✓ **archiweb.cz** — 2 new of 19 (17 off-topic, 0 covered, 0 outside window)
- ✓ **Zdopravy.cz** — 3 new of 40 (36 off-topic, 1 covered, 0 outside window)
- ✓ **ČT24 — Praha** — 0 new of 10 (8 off-topic, 2 covered, 0 outside window)
- ✓ **iROZHLAS** — 0 new of 40 (40 off-topic, 0 covered, 0 outside window)
- ✓ **Prague Morning** — 0 new of 10 (10 off-topic, 0 covered, 0 outside window)
- ✓ **Expats.cz** — 0 new of 25 (24 off-topic, 1 covered, 0 outside window)
- ✓ **Městské části** — 6 new of 32 (24 off-topic, 2 covered, 0 outside window)
- ✓ **Prague City Tourism** — 0 new of 10 (5 off-topic, 0 covered, 5 outside window)

## Candidates — 15 in 15 clusters

1. `23` transport — Stavba tramvajové tratě Muzeum je dokončena, téměř o půlrok dříve
2. `22` transport — TZ: Praha 10 svolá všechny aktéry staveb v Malešicích k jednomu stolu
3. `19` transport — Očekávané komplikace na příjezdových silnicích do Prahy v prvním zářijovém týdnu
4. `17` transport — Povolení pro přestavbu D7 mezi letištěm a Pražským okruhem platí. Ministerstvo zamítlo odvolání
5. `17` development — Neziskové organizace se představí na Andělu
6. `17` transport — DPP zve na den otevřených dveří v garáži Řepy v rámci oslav 90 let prvních pražských trolejbusů
7. `16` transport — Nové parkoviště pro rezidenty v ulici Nicholase Wintona
8. `16` transport — Dopravní opatření v souvislosti s běžeckými závody 5. září
9. `16` transport — Stav přípravy železničního jízdního řádu 2026/2027 po projednání Návrhu JŘ pro tratě v rámci PID (srpen 2026)
10. `14` transport — Praha bleskově nakoupí dalších 25 kusů tramvají 52T. Tlačí nás nové kyberbezpečnostní nařízení, vysvětluje
11. `14` transport — Mobilní informační centrum PID Point: Jízdní řády na září
12. `14` development — Praha vybrala firmu pro přestavbu chrtího závodiště v Motole na stadion
13. `12` transport — Praha chce se Správou železnic směnit pozemky pro stavbu Vltavské filharmonie
14. `11` public-space — Praha 1 zahájila obnovu Krannerovy kašny. Do památky se vrátí voda
15. `11` transport — Linka Praha – New York zůstává sezónní, provoz zahájí dříve


## Decisions

### Written to the queue — 6

- **prague-orders-25-more-52t-trams** — the city cabinet released 1.232 bn CZK on 7 September for a
  fourth batch of 25 Škoda 52T trams, material assembled in eight days, explicitly to beat an EU
  cyber-security regulation that applies from 3 December 2027. Money committed, a named deadline,
  and an unusually candid procurement rationale. Fetched via curl with a browser UA (Zdopravy 403s
  WebFetch, as documented).
- **d7-airport-approach-permit-upheld** — the Ministry of Transport dismissed appeals by three
  residents of Nebušice and Číčovice against the planning decision for I/7 between the Ruzyně and
  Aviatická interchanges. A contested permit that survived; the appeals were about gas-main
  relocation and expropriation terms, not the road. Same curl workaround.
- **motol-greyhound-track-athletics-stadium** — councillors picked VYSSPA Sports Technology on
  7 September at 70.35 m CZK ex VAT, 10.4 m under the estimate, Design and Build, 18 months. A
  contract signed and the west of the city's missing athletics capacity addressed.
- **vltava-philharmonic-land-swap** — the cabinet approved a land swap with Správa železnic, with
  152 m CZK paid to the city for the difference. Distinct from the permit application we published
  on 2 September: this is the site assembly under it.
- **kranner-fountain-restoration-begins** — Prague 1 started an 18-month restoration on Smetanovo
  nábřeží; retendered after the first procedure was cancelled and awarded 45 % under estimate to
  Agentura „Jan Zrzavý“. Construction start plus a monument on the embankment, so it clears the
  cross-district test. Attributed in the text as the district's own announcement.
- **malesice-works-coordination-meeting** — Praha 10 convenes the Počernická tram contractors, PVK
  and the utility firms over three years of overlapping works and repeated burst mains. A district
  formally escalating against schemes it does not control; the contested story the citywide press
  is not assembling. No meeting date published, so none was written.

### Released — 3 (oldest first, from 7 September's queue)

- **emu400-pid-thirty-year-rail-contract** — pinned as the day's lead (`featured: true`).
- **d0-511-bechovice-noise-embankment**
- **bikesharing-pid-litacka-2026-tender**

Queue depth after release: 6.

### Skipped, with reasons

- *Stavba tramvajové tratě Muzeum je dokončena* (Praha 1, top-scoring cluster) — already published
  as `2026-09-07-muzeum-tram-track-complete`. The district reprinted the DPP release a day later.
- *Stav přípravy železničního jízdního řádu 2026/2027* (PID) — fetched and read; it is an explicit
  status update. The page states the amended proposal is not the final timetable and lists no line
  numbers or service changes. Nothing has been decided.
- *Očekávané komplikace na příjezdových silnicích* (PID) — one week of congestion after the school
  holidays. Fails the read-in-a-month test.
- *Dopravní opatření v souvislosti s běžeckými závody 5. září* (Praha 7) — a Saturday evening's road
  and tram diversions, already past.
- *DPP zve na den otevřených dveří v garáži Řepy* (DPP) — an event, and the institution talking
  about itself rather than doing something to the city.
- *Mobilní informační centrum PID Point: Jízdní řády na září* (PID) — a monthly schedule for a
  mobile info counter.
- *Neziskové organizace se představí na Andělu* (Praha 5) — a one-day NGO fair; not the built
  environment.
- *Nové parkoviště pro rezidenty v ulici Nicholase Wintona* (Praha 7) — 35 spaces on a borrowed
  plot. Local administrative detail that would not matter to a reader in another district.
- *Linka Praha – New York zůstává sezónní* (Zdopravy) — airline route scheduling, not the built
  environment.

### Notes

- No source errored. All thirteen returned. `praha.camp` and `IPR Praha` each returned zero new only
  because their items fell outside the 21-day window or were already covered — not a fetch failure.
- No mis-filed non-Prague item was found in this digest; every candidate checked out as Prague.
- Geocoding reached Nominatim. Three new places recorded: Aviatická, Smetanovo nábřeží, Počernická
  (plus Motol and Nemocnice Motol resolved while checking the stadium site). The Motol stadium is
  pinned on the Motol suburb point, which sits on the Plzeňská corridor the sources name; the
  greyhound track itself has no OSM entry that survives the name check.
