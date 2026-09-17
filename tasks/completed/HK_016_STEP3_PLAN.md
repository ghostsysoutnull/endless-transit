# Content Plan: HK-016 step 3 — grow every list (the lists are now the ceiling)
**Created:** 2026-09-16 | **Grill (on the ★ design):** AMEND (check 2: the door constructor's inscription pool is dead code — the factory's six words are the real pool; two existing items begin with a condition word, so a doubled word is possible today) → applied → **CLEARED pending the decisions below** | **Branch:** `content/hk-016-step3` (from `master` @ 3a1f95c)
**Backlog:** `tasks/backlog/HOUSEKEEPING.md` (HK-016, step 3 of 3) | **Audit:** `docs/analysis/VARIETY_AUDIT.md` §3.5, §4 step 3 + the step-2 ceiling correction | **Step 2 record:** `tasks/completed/HK_016_STEP2_PLAN.md`
**Baseline (master `3a1f95c`):** 227 / 227 / 0 / 0; `LINT=PASS FILES=209`; `--scan` seed 0 → 9; probe: objects distinct 203–369 per seed (0 repeats per apartment), furniture 83–123 distinct, 32 cell names per culture-country, 56 door briefs
**Status:** COMPLETE (2026-09-16) | **Commits:** fcdca97 (c1), ecf55f9/0c85c42 (eras), ed7654f/94a87c1 (cultures), 299e0c0 (conditions + F2 guard), a45639a/a63da0d (walls), 92711c0/7388ec8 (lighting), a1e61fb/f756261 (structures), a8e90ce/25d89ba/a19dd62/9822b2c/ce37817 (lexicons), 76b6624/3963a32 (doors move, zero diff), 26cc658 (doors grow), c11 = the docs commit carrying this line | **Suite at close:** 236 / 236 / 0 / 0; `LINT=PASS FILES=209`; `--scan` seed 0 → 9 before and after

> **Execution notes.** (1) Every commit ran through one chain: compile → simulate → moved frames must be inside the row's set → re-pin only the
> commit's allowed literals (`repin.py`, exit 2 on any other drift) → goldens if anything moved → suite + lint → commit. (2) The chain stopped once, at
> c8b: `ProcgenDeepSnapshotTest:117` pins the 0x1234 building name a second time ("precondition: building name"); the plan's coverage row had it under
> "must not change". The key was added to the map and the commit resumed — the stop was the tool doing its job, not a defect in the change.
> (3) c8c moved 12 frames, including the street lattice map (09): building names feed the map's projected coordinates (`Container.groovy`), so a
> lexicon change moves plots as well as lists — inside the allowed set, but worth knowing for step-3-style content phases. (4) c6a moved goldens
> 16/30 (the golden room is digital) while the 0x1234 room's analog pick landed on the same index by chance — a SAME literal with a moved golden is
> consistent, not suspicious. (5) c9b's zero-diff gate held: 36 goldens and all door literals byte-identical with the lists loaded from files.
> (6) The four generic door narratives ("A oxidized metal hatch.") were rewritten in c10 as declared; narratives are not pinned or in goldens.

> **Content phase, last step.** Steps 1 and 2 made every list the binding constraint: a planet's object ceiling is `items × items × 4 + singles`
> per culture/era pair, furniture is `conditions × items` per culture, cell names are `adjectives × 4` per culture-country, doors are
> `materials × states`. This step grows the lists. Every deck is built in file order and then shuffled, so **every list change re-orders every
> deck it feeds** and moves the pinned literals and goldens that show them — once per list family, simulated before regeneration, as in step 2.

---

## Scope

| Family | Today | After (Q1a) | Feeds | Pinned literals / goldens that move |
| :--- | :-- | :-- | :--- | :--- |
| **Culture items** `themes/cultures/*.txt` (9; abyssal left at 28, Q4a) | 8 | **16** | object decks, furniture | `ProcgenDeepSnapshotTest:188,190-207`; goldens 16/30 (FURNITURE line) |
| **Era items** `themes/timelines/*.txt` (8) | 8 | **16** | object decks | `:190-207`; no golden shows an object line (the golden room holds none) |
| **Walls / lighting / structures** (9 / 8 / 7 files; abyssal left at 8) | 5 | **10** | `generateAtmosphere` picks | `:178-180`; goldens 16/30 (the three atmosphere lines) |
| **Conditions** `themes/conditions.txt` | 8 | **16** | furniture | `:188`; goldens 16/30 |
| **Lexicons** `names/buildings/*_{adj,noun}.txt` (10 cultures) | 8 + 8 | **12 + 12** | building names (nouns + adj), cell names (adj deck) | `ProcgenSnapshotTest:84-88` (three building names); `:171`; goldens 01/03 (street list), 13, 16–18/20–23/26/30 (IDENT, traces) — the golden building is the landmark *The Void-Watcher*, its own name stays |
| **Doors** — materials 8, states 7, default inscription words 6 (`Door.groovy:29-46`, `CorridorFactory:83`) | 8 / 7 / 6 | **12 / 12 / 12** | door briefs, apartment headers, `LOCUS_TRACE` | `:134-146`; goldens 15, 17, 18/20–23/26/30 (the apartment's door brief is in every room path) |

Not in scope: new phrasings or generators (step 2 is closed), the abyssal relic list and abyssal atmosphere (28 / 8 lines, already the largest — Q4a),
`landmarkTitles` (15, a fixed roster by design), the contextual inscription words (`STORAGE`, `DATA_VAULT`, `DANGER`, `it_hums` — bound to
room types, HK-015 notes one of them is dead).

## What changes (ELI5)

The previous step fixed *how* the game picks words: no repeats, a deck per apartment, names that mean something. But every box it picks from
still holds eight cards. This step doubles the boxes: sixteen relics per culture and per era, ten sentences per wall, light and room shape,
sixteen conditions for furniture, twelve adjectives and nouns per culture, twelve door materials and states. Nothing about the picking changes.
Because a bigger box shuffles differently, every world will show different words after this — that is the point, and every pinned world is
re-pinned from a run.

## Evidence read this session

- **Deck order = file order** — `ThemeService.buildObjectDeck` iterates `cAssets` then `tAssets` in file order, then `Collections.shuffle(copy, objRandom)`:
  appending items changes the shuffled order for every apartment (the shuffle consumes the same Random over a longer list). `generateFurniture`:
  shuffled copy of the culture items + `r.nextInt(conditions.size())` — both move.
- **Atmosphere** — `generateAtmosphere:86-96` draws `r.nextInt(pool.size())` per line: pool 5 → 10 changes the pick.
- **Names** — `generateBuildingName:157-175`: `adjs[r.nextInt(adjs.size())]`, `nouns[r.nextInt(nouns.size())]`, compounds `${noun}${Gate|Fall|…}`, dedications
  `The ${noun} of …`; landmark roll (`:136`) happens first and is unaffected. `ApartmentFactory` shuffles the adjective copy (`ROOM_ADJ`) — a 12-deck deals
  differently, and the wrap-rename pass (step 2) becomes rarer (12 ≥ 10 rooms).
- **Doors** — `Door.groovy:28-40`: `l.branch("MAT").pickFrom(materials)`, `l.branch("STATE").pickFrom(states)` — pure picks, index changes with size;
  `DoorAppearance.getNarrative:29-46` derives the narrative from material substrings (`Bulkhead`, `Synth-Glass`, `Concrete|Brutalist`) and a `switch` on the
  state — a **new material or state has no narrative** unless the code grows with it (this is why Q3 exists). `Door.generateInscription:42-53` (20 % roll, 10
  words) runs in the constructor; `CorridorFactory:47-54` then overwrites with `generateContextualInscription` (6 default words). Only `CorridorFactory:47`
  constructs doors; no test does.
- **Docs that enumerate a list** — atlas `:120` (the 8 materials and 7 states, by name), atlas `:154-163` (the lexicon table, every word), guide `:474-476`
  (known world at seed 4660: *Impenetrable Unit*, *ObeliskWell*). Era/culture entries (atlas `:40-66`) quote items as examples and stay true.
- **Pins that read the files rather than literals** (unchanged by growth): `ThemeResourceCoverageTest`, `AtmosphereSynthesisTest`, `ProcgenVarietyContractTest`
  (deck size is computed from the lists: `objectDeck_hasEveryFormOnceAndNothingElse`).

## Findings (grill)
- **F1 — `Door.generateInscription` never reaches the player.** `Door.groovy:23` rolls `locus.branch("INSCRIPTION_ROLL").checkProbability(0.2)` and
  `CorridorFactory.groovy:51` rolls `doorLocus.branch("INSCRIPTION_ROLL").checkProbability(0.2)` on the *same* locus — identical outcome — and then
  overwrites `door.inscription`. So the constructor's ten-word pool is dead; the six words at `CorridorFactory:83` (plus the four contextual ones) are
  the only pool. 8a moves the six factory words to `themes/doors/inscriptions.txt`; the dead pool in `Door` is left in place (surgical) and noted
  under HK-015's "lower value" list. Only `CorridorFactory:47` constructs doors; `ScanCommand:92-93` reads `material`/`physicalState` (unchanged).
- **F2 — condition words can double a relic's first word.** `flickering light tube` (neon) and `cracked concrete block` (rust) start with a condition,
  so `generateFurniture` can already produce *flickering flickering light tube*. Three proposed items were renamed (`shattered visor`, `broken gauge`,
  `burnt workbench`), and c4 adds a one-line guard to `generateFurniture`: if the item starts with the drawn condition, take the next condition in the
  list (deterministic, no extra draw). Declared: a two-line generator edit inside a content step, with a pin (no furnishing repeats its first word).

## Design

**Growth commits are content only** (files + re-pinned literals + regenerated goldens + the doc line they falsify). The order is by blast radius,
smallest first, so each golden diff stays reviewable:
1. eras (only `:190-207` moves), 2. culture items, 3. conditions, 4. walls, 5. lighting, 6. structures, 7. lexicons, 8. doors.

**Doors (Q3a): two commits.** *8a — move, zero behavior change:* `themes/doors/materials.txt` (`Material|narrative` — the three special narratives plus
`A <material>.` for the rest, verbatim), `states.txt` (`State|narrative`, the seven switch cases verbatim), `inscriptions.txt` (the six default words).
`ThemeService` loads them (`doorMaterials`, `doorStates`: `LinkedHashMap<String,String>`; `doorWords`). `Door(LocusSeed locus, List<String> materials = null,
List<String> states = null)` — null keeps the built-in lists, so a hand-built door reads as today; `DoorAppearance` gains optional `materialNarrative` /
`stateNarrative` (`@Immutable` map constructor; null → the current substring/switch logic). `CorridorFactory:47` passes the service's lists and narratives
and draws the default inscription word from `doorWords`. Pin: with the files holding today's lists, every door brief and narrative on the 0x1234 corridor is
byte-identical (`:134-146` unchanged, goldens unchanged) and every material/state has a narrative. *8b — grow* to 12/12/12 with narratives for the new ones.

**Size pins.** `ThemeResourceCoverageTest` gains one method per family asserting the floor (`≥ 16` items per non-abyssal culture and per era, `≥ 10` per
atmosphere file except abyssal, `≥ 16` conditions, `≥ 12 + 12` per lexicon, `≥ 12` materials/states/words) — each lands in its family's commit, red before.

**Per-commit simulation** (`sim.groovy`: pinned 0x1234 room/apartment/doors/building names + all 36 frames vs goldens) runs before `--goldens`; the chain
regenerates only if the moved set is a subset of the row's prediction, else STOP.

## Coverage audit (Coverage Claim Protocol)

| Behavior | Must | Guard | Verdict |
| :--- | :--- | :--- | :--- |
| Counts (rooms, objects per apartment, doors, floors, buildings), LIPs, colours, atmo-traits, vibe cultures/eras, mutation | not change | `ProcgenDeepSnapshotTest:62-66,74-95,104,109,118-119,131-132,159-163,173,182-185`; `--scan`; `DeterministicUniverseTest` | PASS |
| Every generator draws from its own file; no fallback literal; no repeat per apartment/room; name shape; description shape | not change | `ThemeResourceCoverageTest` (5), `ProcgenVarietyContractTest` (7) — all read the files, none pins a literal | PASS |
| Landmark names and roll | not change | `ProcgenDeepSnapshotTest:120`; golden 01/03 line 1 (*The Void-Watcher*) | PASS |
| Door behaviors under 8a (move) | not change | `:134-146` unchanged, goldens unchanged; new pin: every material/state has a narrative | PASS (8a is a refactor with a zero-diff gate) |
| Object/furniture/atmosphere/name/door **literals** on the pinned worlds | **change** per family | re-pinned from the run in that family's commit; goldens regenerated per commit after the simulated set is confirmed | MOVES (declared) |
| Minimum list sizes | new | UNGUARDED → size pins per family (red before) | PIN |

## Commits (≤ 5 production files each; resource files count — so lexicons and atmosphere are split)

| # | Commit | Files (prod) | Expected gate movement |
| :-- | :--- | :--- | :--- |
| c1 | plan | this file, `todo.md` | none |
| c2 | eras 8 → 16 | 8 files… **split: c2a** analog, ancient, atomic, digital (4); **c2b** entropic, future, industrial, singularity (4); size pin in c2b | `:190-207` (each); no golden |
| c3 | culture items 8 → 16 | **c3a** baroque, gilded, monolith, neon, organic (5); **c3b** rust, shogun, void, zenith (4); size pin in c3b | `:188,:190-207`; goldens 16/30 (FURNITURE) |
| c4 | conditions 8 → 16 + F2 guard | `themes/conditions.txt`, `ThemeService` (2); size pin + no-doubled-word pin | `:188`; goldens 16/30 |
| c5 | walls 5 → 10 | **c5a** baroque, gilded, monolith, neon, organic (5); **c5b** rust, shogun, void, zenith (4); pin in c5b | `:178`; goldens 16/30 (walls line) |
| c6 | lighting 5 → 10 | **c6a** analog, ancient, atomic, digital (4); **c6b** entropic, future, industrial, singularity (4); pin in c6b | `:179`; goldens 16/30 (lighting line — the golden room is digital since step 2) |
| c7 | structures 5 → 10 | **c7a** Agricultural, Ceremonial, Commercial, Industrial (4); **c7b** Military, Research, Singularity (3); pin in c7b | `:180`; goldens 16/30 (structure line — Industrial) |
| c8 | lexicons 8+8 → 12+12 | **c8a** abyssal, baroque, gilded (6 files… **3 cultures × 2 = 6 > 5 → 2 cultures per commit:** c8a–c8e, 4 files each; pin in c8e | `ProcgenSnapshotTest:84-88` + `:171` when monolith lands (c8c); goldens 01/03/13 (organic, c8d) and 16–18/20–23/26/30 (organic adjectives, c8d); guide `:474-476`, atlas table rows in each commit |
| c9 | **doors 8a** move to files, zero diff | `Door`, `DoorAppearance`, `ThemeService`, `CorridorFactory` (4) + 3 resource files (**7 → split**: c9a resources + `ThemeService` loader (4, unused); c9b `Door`, `DoorAppearance`, `CorridorFactory` (3)) + narrative pin | none — a zero-diff gate on `:134-146` and all 36 goldens |
| c10 | **doors 8b** grow 12/12/12 | 3 files + size pin | `:134-146`; goldens 15, 17, 18/20–23/26/30 (door brief in paths); atlas `:120` |
| c11 | docs + record | audit §4 step 3 block with the after-table; backlog HK-016 **CLOSED**; todo; plan to `tasks/completed/` | none |

**Gates:** per commit `--test`, `--lint`, clean tree, simulated-set check before `--goldens`; phase: `--scan` before c2a and after c10; probe after c10 with
targets stated as ceilings and rates — 0 repeats per apartment (unchanged), objects distinct per seed higher than step 2's 203–369, furniture distinct
higher than 83–123, cell-name adjectives ≥ 12 seen per culture, door briefs distinct > 56 on the 6-seed sample.
**Reversion unit:** one commit; growth commits are independent of each other; c10 depends on c9a/b. **Stop rule:** as step 2.

### Grill report (★ design)
| # | Check | Verdict |
| :-- | :--- | :--- |
| 1 | Coverage claims | PASS — every must-not-change row quotes `ProcgenDeepSnapshotTest` / `ProcgenSnapshotTest` lines read this session; the two file-reading pin suites guard shape, not literals |
| 2 | Behavioral edges | AMEND → applied: F1 (dead inscription pool; the real pool named), F2 (doubled condition word; guard + renames) |
| 3 | Lifecycle | PASS — `Door` constructed at one site; `DoorAppearance` `@Immutable` map constructor accepts the two optional fields; `ThemeService` per factory |
| 4 | Per-commit coherence | PASS — every commit ≤ 5 production files (families split 4–5 files each; c9a loader unused until c9b compiles alone) |
| 5 | Deviations + pattern integrity | PASS — declared: conditions and inscription words added to the audit's list; abyssal lists untouched (Q4a); F2 guard is a generator edit; no new hierarchy |
| 6 | Reversion unit | PASS |
Blast radius cross-check: `Door.groovy:19-53`, `DoorAppearance:29-46`, `CorridorFactory:47-54,83`, `ScanCommand:92-93`, `ProcgenDeepSnapshotTest:134-146,171,178-180,188,190-207`, `ProcgenSnapshotTest:84-88`, atlas `:120,:154-163`, guide `:474-476`; no test constructs a `Door` or pins a list size.

## Decisions needed before the grill (my pick ★)

**Q1. Sizes.**
- a) ★ The audit's: items 8 → 16, atmosphere 5 → 10, conditions 8 → 16, lexicons 8 → 12 each, doors 12/12/12.
- b) Half-step: 12 / 8 / 12 / 10 / 10. Fewer words to review; the ceiling roughly doubles instead of quadrupling.
- c) Larger: 24 / 12 / 24 / 16 / 16. More authoring, longer appendix.

**Q2. Words.**
- a) ★ I write all of them in the existing voice (appendix below), one family per commit; you veto any commit's words when you see the diff.
- b) You read the appendix first and mark rewrites before c1.

**Q3. Doors.**
- a) ★ Move materials, states (with narratives) and the default inscription words to `themes/doors/*.txt` first (zero-diff refactor, ≤ 4 code files,
  coverage-pinned), then grow. Narratives become data; a new material never lacks one.
- b) Grow the hard-coded lists in `Door.groovy` and the narrative `switch` in `DoorAppearance`. No files, two code files, same golden moves.
- c) Leave doors out of step 3.

**Q4. Abyssal.**
- a) ★ Leave the abyssal relic list (28) and abyssal atmosphere (8 lines) as they are; grow its lexicon with the others.
- b) Grow them too.

**Q5. Lexicon nouns.**
- a) ★ Grow adjectives and nouns (buildings and cells both gain; the golden street list and the guide's known world move).
- b) Adjectives only (cells gain; building names untouched; fewer goldens).

**Q6. Commit grouping.**
- a) ★ One family per commit, split to honour the 5-file cap (about 18 small commits, each with its own simulated golden set).
- b) One commit per family ignoring the cap for 5-line text files (about 10 commits; declare the deviation).

**Q7. Regeneration cadence.**
- a) ★ Per commit, gated on the simulated set.
- b) Once at the end (not recommended).

---

## Appendix — proposed content (every new line; existing lines are kept, new ones appended)

### Era items (+8 each)
| era | new items |
| :-- | :-- |
| analog | `reel-to-reel deck`, `punch card stack`, `oscilloscope`, `trimline handset`, `slide projector`, `ticker tape spool`, `answering machine`, `transistor radio` |
| ancient | `bronze mirror`, `grinding stone`, `amphora seal`, `bone needle`, `wax tablet`, `obsidian blade`, `reed flute`, `clay tablet` |
| atomic | `formica counter`, `atomic clock`, `film reel canister`, `chrome toaster`, `civil defense siren`, `slide rule`, `rocket-fin lamp`, `dosimeter badge` |
| digital | `beige tower case`, `dial-up modem`, `cd-rom spindle`, `trackball`, `cathode webcam`, `mp3 player`, `ribbon cable`, `blue LED array` |
| entropic | `half-erased sign`, `dust outline`, `stopped clock`, `rusted-through frame`, `sun-bleached print`, `collapsed shelf`, `cold ash heap`, `echo of a voice` |
| future | `haptic glove`, `quantum key`, `synth-skin patch`, `aerogel slab`, `orbital beacon`, `cryo cell`, `optic implant`, `field emitter` |
| industrial | `oil can`, `riveted boiler plate`, `coal scuttle`, `governor flywheel`, `foundry ladle`, `leather drive belt`, `signal lantern`, `brass valve wheel` |
| singularity | `folded horizon`, `tesseract hinge`, `causal loop`, `event-horizon lens`, `phase anchor`, `negative-mass bead`, `observer shard`, `zero-point coil` |

### Culture items (+8 each; abyssal untouched)
| culture | new items |
| :-- | :-- |
| baroque | `reliquary box`, `wrought-iron sconce`, `illuminated folio`, `marble cherub`, `brass censer`, `carved choir stall`, `rose-window fragment`, `funeral mask` |
| gilded | `ledger stand`, `gilt picture frame`, `crystal decanter`, `velvet chaise`, `brass telescope`, `music box`, `ivory letter opener`, `mahogany humidor` |
| monolith | `matte alloy plate`, `blank data tablet`, `grey conduit spool`, `hexagonal tile`, `null terminal`, `basalt bench`, `silent turbine blade`, `obsidian lens` |
| neon | `glitching billboard`, `arcade cabinet`, `translucent umbrella`, `vinyl booth seat`, `chrome ashtray`, `pachinko ball`, `neon tube coil`, `shattered visor` |
| organic | `spore sac`, `vein cluster`, `chitin shell`, `nerve bundle`, `pod husk`, `resin node`, `cartilage frame`, `mycelium mat` |
| rust | `bent rebar`, `drum of solvent`, `chain hoist`, `broken gauge`, `oxidized bolt`, `tin canteen`, `burnt workbench`, `iron manhole cover` |
| shogun | `iron tea kettle`, `folding fan`, `stone lantern`, `ink stone`, `straw sandal`, `kabuto helmet`, `bamboo ladle`, `hanging scroll` |
| void | `blank white cube`, `silent bell`, `empty frame`, `hovering disc`, `matte pillar`, `unmarked door`, `white noise emitter`, `absent chair` |
| zenith | `bronze tripod`, `olive-wood chest`, `wax seal`, `scroll case`, `sundial`, `bronze greave`, `marble bust`, `oil flask` |

### Conditions (+8)
`scorched`, `overgrown`, `frost-rimed`, `rewired`, `upended`, `sealed`, `sagging`, `immaculate`

### Walls (+5 each; abyssal untouched)
| culture | new lines |
| :-- | :-- |
| baroque | `stone tracery over faded frescoes`, `dark oak panels carved with vines`, `gilt mouldings peeling from plaster`, `cold flagstone under tapestries`, `stained glass set into black iron` |
| gilded | `wallpaper of interlocking clock faces`, `mahogany cabinets glazed with crystal`, `panels of tooled leather and brass studs`, `cream plaster with gilded cornices`, `mirrored alcoves behind velvet ropes` |
| monolith | `matte basalt slabs with no visible mortar`, `dark composite panels etched with a grid`, `polished grey stone that swallows echoes`, `seamless black alloy, faintly warm`, `hexagonal ceramic tiles, unbroken` |
| neon | `wet-look acrylic streaked with pink light`, `glass block lit from within`, `panels of dead advertising screens`, `corrugated plastic over flickering tubes`, `mirrored strips under a violet wash` |
| organic | `ribbed cartilage that flexes as you pass`, `damp membrane veined with light`, `overlapping scales the colour of bone`, `a lattice of roots grown through plaster`, `soft fungal shelves in tiers` |
| rust | `oxide-streaked steel with weeping seams`, `patched sheet metal over brick`, `iron plating bubbled with corrosion`, `soot-black concrete and rusted mesh`, `warped girders behind tarpaulin` |
| shogun | `dark cedar beams over white plaster`, `sliding panels painted with pines`, `bamboo slats and rice-paper light`, `black lacquer inlaid with mother-of-pearl`, `stacked stone under a tiled eave` |
| void | `white panels with no seams or shadows`, `frosted glass lit evenly from nowhere`, `matte surfaces that refuse a reflection`, `pale plaster, absolutely silent`, `a curved wall with no corner to find` |
| zenith | `white marble veined with gold`, `fluted columns between painted panels`, `limestone blocks carved with olive wreaths`, `travertine warmed by an unseen sun`, `bronze plaques set into alabaster` |

### Lighting (+5 each; abyssal untouched)
| era | new lines |
| :-- | :-- |
| analog | `the flicker of a slide projector left cycling`, `a desk lamp with a bent green shade`, `the amber glow of a radio dial`, `a bare bulb behind a cracked lampshade`, `the phosphor trace of an oscilloscope` |
| ancient | `guttering tallow candles in iron sconces`, `embers breathing in a clay hearth`, `dust-thick sunlight through a narrow slit`, `a single oil lamp on a stone ledge`, `moonlight through a broken lattice` |
| atomic | `the strobe of a rotating beacon`, `formica gleaming under fluorescent panels`, `a lava lamp's slow orange churn`, `the pale wash of a television test pattern`, `a neon diner sign buzzing red` |
| digital | `the cyan glow of a loading bar`, `a monitor cycling through screensaver stars`, `a wall of LEDs blinking out of sync`, `a scanner's green line sweeping the floor`, `the pale flicker of a failing backlight` |
| entropic | `light that arrives a moment after its source`, `a glow with no lamp left to cast it`, `sunlight faded to the colour of dust`, `the memory of fluorescence, humming`, `shadows brighter than the room` |
| future | `a lattice of laser threads across the ceiling`, `bioluminescent panels breathing slowly`, `the white glare of a field emitter`, `a hologram flickering between two rooms`, `light bent around a gravity plate` |
| industrial | `a foundry glow through smoked glass`, `carbide lamps hissing on hooks`, `a wall of gauges lit from behind`, `sparks arcing from an open junction`, `oil lamps swinging on a chain` |
| singularity | `light folded twice before it reaches you`, `the blue shimmer of a probability field`, `a glow that is brighter when you look away`, `stars visible through a wall that is not there`, `the slow pulse of a zero-point coil` |

### Structures (+5 each; abyssal untouched)
| trait | new lines |
| :-- | :-- |
| Agricultural | `a humid grow-hall under banks of pink lamps`, `stacked hydroponic trays dripping into gutters`, `a seed vault of numbered steel drawers`, `a composting pit ringed with vents`, `a greenhouse with every pane fogged` |
| Ceremonial | `a circular nave beneath a dark dome`, `a hall of benches facing an empty dais`, `a crypt of stacked memory-urns`, `a bell chamber with the bell removed`, `a reliquary room lined with sealed niches` |
| Commercial | `a counting room of locked drawers and ledgers`, `a showroom of empty plinths`, `a warehouse aisle of numbered crates`, `a ticket hall with every window shuttered`, `an exchange floor of dead terminals` |
| Industrial | `a pump room throbbing behind a steel grille`, `a foundry floor scarred by cooled spills`, `a control gallery over a silent line`, `a coal bunker with a sloping floor`, `a compressor hall lined with gauges` |
| Military | `a briefing room with the map torn down`, `a magazine of empty racks and chains`, `a watch post with a slit for a window`, `a gas-lock chamber with two sealed doors`, `a drill floor marked in faded lines` |
| Research | `a clean room behind a double airlock`, `an archive of slide drawers and lamps`, `an observation cell walled in one-way glass`, `a specimen vault of frosted jars`, `a calibration bay of silent instruments` |
| Singularity | `a corridor that ends where it began`, `a room whose ceiling is another floor`, `a stairwell that descends into its own top`, `an alcove folded inside a larger alcove`, `a chamber lit by its own reflection` |

### Lexicons (+4 adjectives, +4 nouns each)
| culture | adjectives | nouns |
| :-- | :-- | :-- |
| abyssal | Corrupted, Dangling, Leaking, Unbound | Stack, Socket, Fault, Kernel |
| baroque | Gilt, Vaulted, Solemn, Baroque | Chapel, Vestry, Cloister, Spire |
| gilded | Burnished, Lacquered, Polished, Velvet-Lined | Study, Lounge, Vault, Pavilion |
| monolith | Featureless, Basalt, Sealed, Unbroken | Vault, Cube, Plinth, Shaft |
| neon | Buzzing, Chrome, Holographic, Wet | Arcade, Booth, Terminal, Strip |
| organic | Damp, Ribbed, Veined, Sporing | Sac, Cyst, Bloom, Hollow |
| rust | Flaking, Riveted, Sooty, Buckled | Yard, Silo, Pit, Girder |
| shogun | Quiet, Tiled, Ink-Black, Ceremonial | Hall, Gatehouse, Courtyard, Tower |
| void | Blank, Pale, Weightless, Unmarked | Cell, Plane, Hush, Field |
| zenith | Gilded, Radiant, Fluted, Olympic | Portico, Atrium, Shrine, Terrace |

### Doors
- Materials (+4, with narratives): `Riveted Iron Hatch|A hatch of riveted iron, its seams weeping orange.` · `Frosted Crystal Pane|A pane of frosted crystal, faintly luminous.` ·
  `Lacquered Timber Gate|A timber gate under many coats of black lacquer.` · `Bone-Lattice Aperture|An aperture of interlocking bone-white struts.`
- States (+5, with narratives): `Scorched|The surface is blackened in a fan shape, as if something burned its way out.` · `Weeping|Moisture beads along the seams and runs in slow lines.` ·
  `Humming|A steady hum is felt through the frame rather than heard.` · `Frozen|A rime of frost has sealed the edges shut.` · `Warped|The panel has bowed outward and no longer meets its frame.`
- Default inscription words (+6): `HOLLOW`, `DO_NOT_ANSWER`, `SIGNAL_LOST`, `KEEP_WALKING`, `SEALED_BY_ORDER`, `THE_ROOT_REMEMBERS`
