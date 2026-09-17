# Content Plan: HK-016 step 2 — structural variety (the template stops capping the words)
**Created:** 2026-09-16 | **Decisions:** all ★ (user) | **Grill:** AMEND (check 2: 2f reached the factory at render time — hand-built floors/corridors would NPE, and the `Floor N.` / `[THEME:` guards were unlisted; 2d's lighting edge undeclared; check 4: c6 was 7 files) → applied → **CLEARED** | **Branch:** `content/hk-016-step2` (from `master` after the step-1 merge)
**Backlog:** `tasks/backlog/HOUSEKEEPING.md` (HK-016, step 2 of 3) | **Audit:** `docs/analysis/VARIETY_AUDIT.md` §3.1, §3.3–3.6, §4 step 2 | **Step 1 record:** `tasks/completed/HK_016_STEP1_PLAN.md`
**Baseline (master `e0604c0` + atlas fix):** 220 / 220 / 0 / 0; `LINT=PASS FILES=208`; `--scan` seed 0 → 9; probe (Appendix A): objects 143–198 distinct of 283–719 per seed, 25–40 % of apartments repeat an object, furniture reads as a second objects line
**Status:** COMPLETE (2026-09-16) | **Commits:** 3357030 (c1), f387d87 (c2 deck), de29ecf (c3 furniture), 1b07043 (c4 eras), ff71996 (c5 names), 51331f8 (c6a corridor), be5afbb (c6b floor), c7 = the docs commit carrying this line | **Suite at close:** 227 / 227 / 0 / 0; `LINT=PASS FILES=209`; `--scan` seed 0 → 9 before and after; probe: 0 apartments with a repeated object on all six seeds

> **Execution notes.** (1) Every commit's simulated frame set was the regenerated set: c2 = 16/30, c3 = 16/30, c4 = 8 frames (see the amended row: the
> golden city is a rebel district), c5 = 9, c6a = 15, c6b = none (the golden floor rolled the original sentence). (2) c5 shipped with a delegator
> whose signature changed but whose body still dropped the adjective — caught by the simulation (the name came from the lexicon draw, not the dealt
> deck), fixed before commit. (3) The dealt adjectives wrap after eight, so c5 gained a rename pass (next free adjective for that category) and the
> pin states the exact contract: unique unless a category is dealt more rooms than the culture has adjectives. (4) The c5 red demo failed to compile
> against the old generator (missing accessor) — inconclusive rather than red for the right reason; the other six pins were red for theirs.
> (5) The phase target "objects distinct ≥ 90 % of total per seed" was wrong arithmetic — see the audit's step 2 block; the deck ceiling is what
> moved, and step 3 is what lifts the sample.

> **Content phase, second step.** Step 1 filled the drawers; step 2 changes how the drawers are used, so that a planet's object
> space stops being capped at 256 strings by the template. Every sub-step moves object or name strings on both pinned worlds
> (seed `0x1234` in `ProcgenDeepSnapshotTest`, seed `12345` in the goldens). Determinism is untouched: every new draw hangs off a
> `locus.branch(...)` or a `Random` derived from one. Counts, LIPs, colours, atmosphere lines, building names and vibe cultures do
> not change and are already pinned (coverage table below).

---

## Scope (audit §4 step 2, in the order that multiplies)

| # | Item | Today (`file:line`) | After |
| :-- | :--- | :--- | :--- |
| 2a | **More phrasings, incl. single-item** | `ThemeService.generateHybridObject:99-111`: 2 forms, `T with C` / `C infused with T` | an **object deck** per (culture, timeline): every culture item × every era item × 4 two-word forms, plus every item alone → 8×8×4 + 16 = **272** entries today (≈ 1,100 after step 3) |
| 2b | **Shuffled-deck dealing** | `ApartmentFactory.populate:40-45`: 5–19 independent draws with replacement; `:52-57` dealt round-robin by `DIST_i` | the apartment's 5–19 objects are the first N of the deck **shuffled** by the `OBJECT_POOL` Random → no repeat inside an apartment, ever; dealing to rooms unchanged |
| 2c | **Furniture ≠ objects** | `RoomFactory.create:56-61`: same generator, same pool | furniture = `<condition> <culture item>` (e.g. *overturned tatami mat*, *dust-covered brass clock*), 1–3 per room **without replacement**; conditions from a new `themes/conditions.txt` (8 lines, step 3 grows it) |
| 2d | **Timeline drift** | timeline fixed per planet (`PlanetFactory:27`), copied by every apartment (`ApartmentFactory:28`) | `VibeCapsule.secondaryTimeline` drawn per planet (≠ primary); each apartment picks primary/secondary with the **same stability roll** as culture (`pickTimeline`) → a planet's "with"-half stops being one 8-word list |
| 2e | **Category-based room names** | `NameGenerator.generateRoomName:100-124`: `Adj Noun [0xHH]`, category ignored, hex carries uniqueness | `Adj <Category>` (*Corroded Fuel Depot*, *Lacquered Prayer Hall*); the **adjective is dealt from a per-apartment shuffled deck** so no two rooms in an apartment share a name; the hex is dropped |
| 2f | **Description variants** | one template each: `Corridor.groovy:43`, `Floor.groovy:87` | 4 variants each in `themes/descriptions/{corridor,floor}.txt` (`{culture}` placeholder). **The factory picks the variant at creation** (`CorridorFactory.create` / `FloorFactory.create`, `locus.branch("DESC")`) and stores it in a new `descriptionVariant` field whose default is today's sentence — the model never reaches the factory at render time, and a hand-built floor or corridor reads exactly as today. The fixed parts stay: `Floor N.` prefix (`LocationRenderingTest:81` guards it), `[THEME: X]` suffix (`:94`), the Artery and bedrock lines. `Apartment.groovy:40` and `Building.groovy:134` are **left as they are**: status lines, not prose |

Not in scope: list growth (step 3); doors (audit 2.8, "Weak", no step assigned — logged as a step-3 candidate); the rebel-district
timeline swap (decision Q4).

## What changes (ELI5)

Today every object in a planet is one word from the culture's box and one word from the era's box, glued with one of two
phrases, and each apartment just grabs 5 to 19 of those at random, so the same object turns up again and again. After this step
the game lays out every possible combination as a deck of cards, shuffles it once per apartment, and deals from the top, so an
apartment never holds the same thing twice. Furniture stops being drawn from that deck at all and becomes a piece of the
culture's furniture in some condition. Each planet gets a second era that leaks into some apartments, the way its second culture
already does. Rooms are named for what they are, with a word from their culture in front, instead of a random noun plus a serial
number. Corridors and floors get a few sentences to choose from instead of one.

## Evidence read this session

- **Object pool** — `ApartmentFactory.groovy:40-45`: `objRandom = a.locus.branch("OBJECT_POOL").nextRandom()`, `totalObjects = a.locus.nextInt(5, 19)`
  (pure draw, pinned at 15 for 0x1234 by `ProcgenDeepSnapshotTest:160-161`), N calls to `generateHybridObject(a.culture, a.timeline, objRandom)`.
  `:52-57` deals `objectPool.remove(0)` to `rooms[a.locus.branch("DIST_"+i).nextInt(rooms.size())]` — the dealing is a pure function of the
  apartment locus and the pool *order*; it does not care what the strings are.
- **Hybrid generator** — `ThemeService.groovy:99-111`: `cItem`, `tItem` from `r.nextInt`, `r.nextBoolean()` picks one of two forms; `"Strange Object"`
  when either list is empty. Callers: `ApartmentFactory:44`, `RoomFactory:60`, `AtmosphereSynthesisTest:70` (asserts a neon asset **and** an
  industrial asset are both present and the string contains `with` — **moves** under single-item forms; the test is rewritten to assert the
  string is one of the deck's forms for its parts).
- **Furniture** — `RoomFactory.groovy:57-61`: `numFurniture = locus.nextInt(1, 3)`, `furnRandom = locus.branch("FURNITURE").nextRandom()`.
  Rendered by `Room.getDescription():278-283` (`FURNITURE:` line). Pinned: `ProcgenDeepSnapshotTest:188` (`["floppy disk with hexagonal pillar"]`), golden 16 line 17 / 30 line 5.
- **Objects rendered** — `Room.getDescription():286-294` (`OBJECTS_DETECTED:` line, wrapped at 80); `Room.getOptions():161-230` (`t` menu, capture by
  index; `Gematria.calculateFrequency(name, depth, isResonant)` — frequency is a function of the name's consonants, so every phrasing change
  changes the Hz of the objects it touches; nothing pins a production object's Hz). `ScanCommand:186` computes a room's signature from `roomName`.
- **Vibe** — `VibeCapsule.groovy:7-38`: `timeline`, `primaryCulture`, `secondaryCulture`, `stabilityFactor` 0.85, `pickCulture(locus)`; `toString()` =
  `Capsule(<timeline>, <p>/<s>, <mutation>)` pinned at `ProcgenDeepSnapshotTest:77,93`; `mutate()` copies fields (`CountryFactory:37`); `CityFactory:36`
  builds a swapped copy for rebel districts (`RegionalDivergenceTest:49-50` pins the culture swap only); `Corridor.groovy:116` hard-codes
  `new VibeCapsule("atomic", "abyssal", "abyssal")` below bedrock. Readers of `.timeline`: `StreetFactory:33` (buildings), `ApartmentFactory:28`,
  `TurnProcessor:46` (entropic drain), `Street.groovy:86` (`[TECH_ERA]` header), `JournalManager:68`, `DiscoveryEventContractTest:107`.
- **Room names** — `NameGenerator.groovy:115-138`: category from the trait's four (`RoomCategory`, 28 values, `displayName`), `adj`/`noun` from the
  lexicon, `hex = r.nextInt(0xFF)`. `CorridorFactory:44` calls it for the **category only** (door trace). `RoomFactory:38-41` stores `name` and
  `category.displayName` as `roomType`. `roomName` is shown as `IDENT:` (`Room.groovy:123`), in `LOCUS_TRACE` paths and lattice traces, in the corridor
  scan (`ScanCommand:183`), and written to mutation state (`Room.groovy:95`, restore at `:107` — a saved name overrides the generated one, so old
  saves keep their old names for visited rooms; unvisited rooms regenerate). Uniqueness today comes from the hex: `ProcgenVariabilityTest:52` asserts
  `> 5` distinct names over ~5 floors (holds trivially after 2e); the guide's known-world paragraph (`players_guide.md:467`) quotes `Grey Unit [0x55]`.
- **Descriptions** — `Corridor.groovy:41-44` (`A long corridor with multiple doors` / `A pulsing, organic artery of data` + `[THEME: X]`),
  `Floor.groovy:86-91` (bedrock line / `Floor N. The air hums with the resonance of X geometry.`). Rendered in goldens 14 (floor) and 15 (corridor).
- **Determinism gate** — `DeterministicUniverseTest.groovy:39-58` compares two runs (names, vibe, LIP resolution); `ProcgenSnapshotTest` pins names
  above the building (unaffected); `--scan` counts floors (unaffected).
- **Test call sites of the factories** — `CorrectnessRegressionTest:28` calls `createRoom(...)` with the current four arguments, `ObjectDistributionTest:22`
  and `ProcgenVariabilityTest:18` call `createApartment` / `createBuilding`; every signature is kept (2e adds a *defaulted* fifth parameter), so none of them changes.

## Design

**2a/2b — the deck.** `ThemeService` gains `List<String> objectDeck(String culture, String timeline)`: for each culture item `c` and era item `t`
(file order): `"$t with $c"`, `"$c infused with $t"`, `"$c fused to $t"`, `"$t grafted onto $c"`; then every `c` alone and every `t` alone.
Built on demand and cached per (culture, timeline) — the lists are immutable after load. `generateHybridObject(culture, timeline, r)` keeps
its signature and returns `deck[r.nextInt(deck.size())]` (one `nextInt` per call instead of three draws — the old order-sensitive Random
consumption is gone, which is why `:188/:207` move). `ApartmentFactory.populate` becomes: `deck = new ArrayList(themeService.objectDeck(c, t));
Collections.shuffle(deck, objRandom); objectPool = deck.take(totalObjects)`; dealing unchanged. `totalObjects` (5–19) is always ≤ 272.
Pin (RED before 2b): over 60 apartments × 6 seeds, no apartment holds a string twice; every object is a deck entry for its apartment's (culture, timeline).

**2c — furniture.** `ThemeService.generateFurniture(String culture, int count, Random r)`: shuffle a copy of the culture items with `r`, take
`count`, prefix each with a condition drawn from `conditions` (new `themes/conditions.txt`: `overturned`, `dust-covered`, `cracked`, `humming`,
`bolted-down`, `half-dismantled`, `flickering`, `pristine`) by `r.nextInt`. `RoomFactory` calls it once with `numFurniture` and `furnRandom`.
Pin: furniture strings are `<condition> <culture item>` and never equal an object string; no repeat within a room.

**2d — timeline drift.** `VibeCapsule(String timeline, String primary, String secondary, String secondaryTimeline = timeline)`; new field
`secondaryTimeline`; `pickTimeline(locus)` mirrors `pickCulture`. `PlanetFactory.create`: `secondaryTimeline = getRandomTimeline(locus.branch("TIMELINE_S"))`
with the same ≠-retry loop as cultures (`"TIMELINE_S_ALT" + n`). `ApartmentFactory.create:28`: `a.timeline = vibe.pickTimeline(locus.branch("TIMELINE_SELECTOR"))`.
`mutate()` copies the field; the rebel copy (`CityFactory:36`) **swaps the two eras as it swaps the cultures** (Q4a; `RegionalDivergenceTest` gains one
assertion); `Corridor:116` (bedrock capsule) and the three-argument test constructors (`CoherenceDrainTest:25-56`, `SurvivalPinningTest:52,70`)
compile unchanged through the default — **no edit to `Corridor.groovy`**.
**Declared edges (grill):** (i) a room's lighting comes from its apartment's era (`RoomFactory:46` takes the apartment's `timeline`), so an apartment
on the secondary era is lit by that era — intended, one planet stops having one light; (ii) the Entropic double drain reads the *planet* capsule
(`TurnProcessor:46` → `getVibe()`), so an apartment whose header says `[TEMPORAL_MARKER: ENTROPIC]` on a non-entropic planet does **not** drain
double — the marker is the relics' era, the drain is the world's; the atlas sentence on the Entropic Era is worded accordingly in c7.
`toString()` **unchanged** (decision Q5): the pinned `Capsule(analog, monolith/shogun, Standard)` stays; the second era is visible on the
street header only if Q5(b) is chosen. Pin: over 200 seeds every start planet has `secondaryTimeline != timeline`; over 6 seeds' first floors
some apartments carry the secondary timeline and the share is within 5–25 % (stability 0.75–0.95).

**2e — room names.** `NameGenerator.generateRoomName(culture, trait, locus, String adjective = null)`: name = `"${adjective ?: adjs[r.nextInt]} ${category.displayName}"`;
no hex. `ApartmentFactory.populate` shuffles a copy of the culture's adjective list with `a.locus.branch("ROOM_ADJ").nextRandom()` and passes
`deck[i % deck.size()]` to `registry.createRoom(a, culture, timeline, locus, adjective)` (facade delegator gains the defaulted parameter; every
existing signature still compiles). `CorridorFactory:44` (category only) unchanged. Pin: `roomName == "<adj> " + roomType` with `adj` in the
culture's lexicon; no two rooms in an apartment share a name (RED today only for the hex form — the name-shape pin is the RED one).

**2f — descriptions.** `themes/descriptions/corridor.txt` (4 lines, `{culture}` placeholder; the Artery line stays hard-coded), `floor.txt`
(4 lines; the bedrock line stays). `ThemeService.descriptionVariant(String kind, LocusSeed locus)` → `lines[locus.branch("DESC").nextInt(lines.size())]`
(`[]` when the file is missing → the model keeps its default; `poolOrWarn`-style warning). `CorridorFactory.create` / `FloorFactory.create` set the new
`descriptionVariant` field; `Corridor.getDescription()` = `"${variant ?: default}. [THEME: X]"`, `Floor.getDescription()` = `"Floor N. ${variant ?: default}"`.
**Grill amendment:** the first draft had the model ask `factory.themeService` at render time; a hand-built `Floor`/`Corridor` (`AutoEntryTest`,
`CoherenceDrainTest`) has no factory, and a getter that can NPE is the HK-008 fail-loud rule pointed the wrong way. Pin: every corridor/floor
description on 6 seeds is `<prefix/suffix> + one of the file's lines` with the placeholder filled; distinct > 1 per seed.

## Blast radius (grill cross-check, `src/main` + `src/test`)
- `generateHybridObject`: `ApartmentFactory:44`, `RoomFactory:60`, `AtmosphereSynthesisTest:70` (rewritten, c2).
- `new VibeCapsule(`: `PlanetFactory:37`, `CityFactory:36`, `VibeCapsule.mutate:25`, `Corridor:116`, `CoherenceDrainTest:25,36,46,56`, `SurvivalPinningTest:52,70` — the last six compile unchanged (default parameter).
- `generateRoomName`: `RoomFactory:38`, `CorridorFactory:44` (category only), `ProcgenSnapshotTest:105` (category contract; name shape not asserted).
- `createRoom`: `ProceduralFactory:141` delegator, `CorrectnessRegressionTest:28` (four arguments, kept).
- `roomName` readers: `Room:123` (IDENT), `Room:95,107` (mutation state), `ScanCommand:183,186`, `ProcgenDeepSnapshotTest:171`, `ProcgenVariabilityTest:38,52`, goldens 16–18/20–23/26/30, `players_guide.md:467`, atlas `:124,:149`.
- Descriptions: `LocationRenderingTest:79-82,92-94` (prefix/suffix guards), goldens 14, 15.
- `visitedPaths` is keyed by macro locations only (`Player.groovy:43`, `LocationDiscovered.groovy:9`): room-name duplicates cannot conflate a footprint.

## Coverage audit (Coverage Claim Protocol)

| Behavior | Must | Guard (assertion read this session) | Verdict |
| :--- | :--- | :--- | :--- |
| Object **count** per apartment (5–19 draw) and per-room dealing | not change | `ProcgenDeepSnapshotTest:159-163` (1 room, pool 15, all 15 dealt); `ObjectDistributionTest:45` | PASS |
| Room count, colours, atmosphere, atmo-traits | not change | `ProcgenDeepSnapshotTest:159,173,178-185` | PASS |
| Building names, counts, vibe cultures, stability, mutation | not change | `ProcgenSnapshotTest:45-88`; `ProcgenDeepSnapshotTest:74-95,117-122,154`; `RegionalDivergenceTest:49-50` | PASS |
| Same seed → same world | not change | `DeterministicUniverseTest:39-58` | PASS |
| Door briefs, inscriptions, traces | not change | `ProcgenDeepSnapshotTest:131-146` (category still drives the trace: `CorridorFactory:44` unchanged) | PASS |
| Capture/synthesis/journal/ritual mechanics | not change | `JournalEventContractTest`, `SingleObjectTakeTest:27-40`, `CorrectnessRegressionTest:31-34` (hand-set object lists) | PASS |
| Object strings, furniture, room names, apartment timeline on the pinned worlds | **change** | `ProcgenDeepSnapshotTest:155,171,188,190-207` re-pinned per commit; goldens 14–18, 20–23, 26, 30 regenerated per commit, each diff reviewed | MOVES (declared) |
| `AtmosphereSynthesisTest:66-82` hybrid shape | **change** | rewritten in 2a: the string is one of the deck's forms for its parts | MOVES (declared) |
| No duplicate object in an apartment; furniture shape; timeline share; name shape + uniqueness; description membership | new | **UNGUARDED** → `ProcgenVarietyContractTest` (one method per sub-step, lands in that sub-step's commit, RED shown against the previous commit) | PIN |

## Commits (≤ 5 production files each; resource files count)

Each sub-step is one commit: production change + its pin + the re-pinned literals + the regenerated goldens (diff reviewed) + the
manual/guide sentences it falsifies (HK-014 rule — per commit this time, since every commit changes visible prose).

| # | Commit | Files (prod) | Expected gate movement |
| :-- | :--- | :--- | :--- |
| c1 | plan | this file, `todo.md` | none |
| c2 | **2a+2b** deck + shuffle | `ThemeService`, `ApartmentFactory` (2); `AtmosphereSynthesisTest` rewrite; `ProcgenDeepSnapshotTest:188,207` re-pin; pin `noRepeatInApartment_everyObjectFromDeck` | goldens 16, 30 (FURNITURE/OBJECTS lines) — furniture moves here too because it still uses `generateHybridObject` until c3 |
| c3 | **2c** furniture | `ThemeService`, `RoomFactory`, `themes/conditions.txt` (3); `:188` re-pin; pin `furnitureIsConditionedCultureItem_noRepeat` | goldens 16, 30 (FURNITURE line) |
| c4 | **2d** timeline drift | `VibeCapsule`, `PlanetFactory`, `ApartmentFactory`, `CityFactory` (4); `RegionalDivergenceTest` +2 assertions; `:155` re-pin if the 0x1234 apartment rolls secondary; pin `secondaryTimeline_drawnAndPicked` | **Amended at execution (stop rule):** the simulation moved **8** frames, not 2–3. Cause, verified: the golden street's city (Clockcity, seed 12345) **is a rebel district**, so Q4a swaps its era to the planet's secondary (`analog` → `digital`) — `[TECH_ERA]` on 01/03, the floor and bedrock telemetry (14/32/34), the apartment marker (17), and the room's lighting (16/30, now the digital file). The 0x1234 world (Starford, not rebel, `ProcgenDeepSnapshotTest:105`) is unchanged. Sample share on the secondary era: 25/168 = 14.9 %. Declared edge: in a rebel district the Entropic double drain (`TurnProcessor:46`, reads the city capsule) now follows the swapped era, as the culture bonus already does. |
| c5 | **2e** room names | `NameGenerator` (+ public `adjectivesFor(culture)` for the apartment deck), `RoomFactory`, `ApartmentFactory`, `ProceduralFactory` (delegator) (4); `:171` re-pin; pin `roomName_isAdjectiveCategory_uniqueInApartment`; guide `:467`, atlas `:124,:149`; `ScanCommand:186` signatures change value only | goldens 16–18, 20–23, 26, 30 (IDENT, LOCUS_TRACE, lattice trace) |
| c6a | **2f** corridor | `Corridor`, `CorridorFactory`, `ThemeService` (`descriptionVariant`), `themes/descriptions/corridor.txt` (4); pin `corridorDescriptions_fromFile_vary` (`LocationRenderingTest:94` keeps `[THEME:`) | golden 15 |
| c6b | **2f** floor | `Floor`, `FloorFactory`, `themes/descriptions/floor.txt` (3); pin `floorDescriptions_fromFile_vary` (`LocationRenderingTest:81` keeps `Floor`) | golden 14 |
| c7 | docs | atlas `:128-129,:162` (relics), guide `:163-171`; `HOUSEKEEPING.md`, `VARIETY_AUDIT.md` §4 step 2 after-table, `todo.md`; plan record to `tasks/completed/` | none |

**Simulation per commit (the step-1 technique):** before each of c2–c6b is committed, the changed classes are compiled into the scratchpad
ahead of `build/vinc` and `HudFrameHarness.captureAll()` + the 0x1234 walk are diffed; the commit's "expected gate movement" is checked
against that run *before* `./vinc.sh --goldens` is invoked. Anything outside the row above → STOP.

**Gates per commit:** `--test`, `--lint`, `git status` clean; golden diff reviewed. **Phase gates:** `--scan` seed 0 → 9 before c2 and after c6b;
the audit probe re-run after c6b and its table appended to the audit — target: apartments with a repeated object **0/…** on all six seeds,
objects distinct ≥ 90 % of total per seed, furniture distinct ≥ 60 %, structure/lighting fallbacks still 0.

**Reversion unit:** one commit; c2–c6b are ordered but independent in code (c3 shares `ThemeService` with c2; c5, c6a, c6b depend on nothing
above) — each reverts alone with its goldens and its re-pinned literals. **Stop rule:** any gate movement not in the table → STOP, do not regenerate, re-plan.

## Decisions needed before the grill (my pick ★)

**Q1. Furniture shape.**
- a) ★ `<condition> <culture item>` from a new 8-line `conditions.txt` (*overturned tatami mat*). Distinct in shape from objects; step 3 grows both lists.
- b) Plain culture item, no condition (*tatami mat*). Simplest; 8 strings per culture, so rooms repeat furniture often.
- c) Keep hybrids for furniture but draw from a deck disjoint from the apartment's objects. No visual distinction between the two lines.

**Q2. The four two-word forms.**
- a) ★ `T with C`, `C infused with T`, `C fused to T`, `T grafted onto C`, plus every item alone.
- b) Keep only the two existing forms plus singles (deck 144). Fewer new words; less variety per planet.
- c) You supply the list.

**Q3. Room-name serial.**
- a) ★ Drop the hex entirely; uniqueness inside an apartment comes from the per-apartment adjective deck.
- b) Keep a short serial after the name (`Corroded Fuel Depot [0x55]`) as an ID the manual says "does not count".

**Q4. Rebel districts (one city in ten swaps the two cultures).**
- a) ★ Swap the two timelines too — symmetric, one line in `CityFactory`; `RegionalDivergenceTest` gains one assertion.
- b) Cultures only, as today.

**Q5. Where the second era shows.**
- a) ★ Only in the apartments that roll it (`[TEMPORAL_MARKER: X]` header, their objects). `VibeCapsule.toString()` and the street's `[TECH_ERA]` unchanged.
- b) Also on the street header as `[TECH_ERA: ANALOG/DIGITAL]` and in `toString()` — visible, but moves two snapshot pins and goldens 01–03, 11–15.

**Q6. Descriptions.**
- a) ★ Corridor and Floor only (4 variants each, resource files). Apartment and Building lines are status lines and stay.
- b) All four, including 2–3 lead-ins for Apartment and Building.

**Q7. Golden regeneration cadence.**
- a) ★ Per commit, each diff reviewed against the simulated prediction (as step 1 did).
- b) Once at the end of the branch (fewer regenerations, but c2–c5 would be red on goldens until then — breaks per-commit coherence; not recommended).
