# Housekeeping Plan: HK-008 — `ProceduralFactory` is an injected instance, not a static singleton
**Created:** 2026-09-16 | **Grill:** AMEND (check 4 — c4 would leave the scanner's world without a formatter) → applied → CLEARED | **Branch:** `housekeeping/hk-008-factory-injection` (from `master` @ 2077ccb)
**Backlog:** `tasks/backlog/HOUSEKEEPING.md` (HK-008, the last OPEN item) | **Baseline (verified on the branch):** 207 / 207 / 0 / 0, suite 2985 ms; `--scan` seed 0 → 9 nodes; tree clean
**Status:** IN PROGRESS | **Record:** `tasks/completed/HK_008_PLAN.md` | **Commits:** filled in at close-out

> **Zero behavior change.** Same seed → same world; 36 goldens byte-identical; `--scan` seed 0 → 9 nodes.
> What changes is *who holds the factory*: a `Game` owns one, hands it to its services, and every location the
> factory creates carries a back-reference to it. Nothing reaches for a static anymore.

---

## Context

`ProceduralFactory.groovy:23` is `static ProceduralFactory instance = new ProceduralFactory()`. It is the last
Service Locator in the codebase — the same shape Phase 5 removed for `ModelOutput.fmt`. `Game.groovy:37` mutates it
after construction (`ProceduralFactory.instance.fmt = this.fmt`), so:

- two `Game`s in one JVM share one factory and the *last* constructed one wins the `fmt` (every test JVM does this);
- anything that generates a world without a `Game` (`SeedScanner`, ten procgen/model tests) gets whichever `fmt` a
  previous test left behind, or `null`. `LandmarkDiscoveryTest:43-45` renders a scanner-found street
  (`Street.groovy:45` calls `fmt.dim`, which NPEs on a null `fmt`) and asserts ANSI bold-cyan. The suite is green, so
  that `fmt` is non-null — and the only writer of the static's `fmt` is `Game.groovy:37`. The test therefore passes
  only because an earlier test in the same JVM built a `Game`: a latent order dependency, not a guarded behavior;
- a test cannot substitute a factory without mutating static state (OOA report §3.4 / §4).

Phase 9 made this a small change: the 14 per-type factories already reach `fmt`, `themeService` and each other only
through their `registry` back-reference, so the registry is the one object that has to become an instance.

## What changes (ELI5)

Today there is one world-builder for the whole program, sitting in a global slot, and the game pokes its output
formatter into it after the fact. After this change each game builds its own world-builder with the formatter
already inside, and every place the builder creates remembers which builder made it — so when a place needs its
children generated later, it asks *its own* builder instead of the global slot. Tests that build places by hand
tell the place which builder to use, exactly as they already tell it which formatter to use.

## Evidence read this session

**Production readers of the static (7 files, 9 sites):**
- `Container.groovy:3` import; `:116-118` `populateChildren()` → `ProceduralFactory.instance.populate(this)` (HK-005 default; the only population entry).
- `Building.groovy:9` import; `:129` `countSubLocations(floor)` inside `getFloorProgress` (callers: `Building.groovy:219`, `ElevatorState.groovy:71`, `VisitedProgressTest:74`); `:252` `createFloor(...)` for the on-demand abyssal floor in `getFloor(int)` when `number < 0 && isBreached`.
- `Game.groovy:36-37` builds `fmt` then sets it on the static; `:38` `new GameState(masterLocus)`; `:42-43` builds `NavigationOrchestrator(state)` and `PersistenceService(state, navOrchestrator, inputHandler)`.
- `NavigationOrchestrator.groovy:16-24` holds only `state`; `initializeWorld()` calls `WorldGenesis.createInitialWorld(state.masterLocus)`.
- `WorldGenesis.groovy:55-56` static `createInitialWorld(LocusSeed)` → `instance.createUniverse(masterLocus)`; `resolveLIP` (24-49) is factory-free.
- `PersistenceService.groovy:53` `SyncManager.restore(state.events, saveFile)`; `:58` `?: ProceduralFactory.instance.createUniverse(state.masterLocus)` fallback.
- `SyncManager.groovy:57` `static GameSession restore(EventBus events, String saveFile)`; `:70` `instance.createUniverse(locus)`.
- `SeedScanner.groovy:82` `instance.createUniverse(currentLocus)` inside `scan(...)`; `main` (24-58) and two tests build it with `new SeedScanner()`. The scanner never renders, but `LandmarkDiscoveryTest:43` renders a street it found (`Street.groovy:45-57` uses `fmt.dim`/`fmt.colorize`).

**Wiring precedent:** every per-type factory sets `x.fmt = registry.fmt` in its `create(...)` (14 sites, e.g. `UniverseFactory.groovy:25`, `BuildingFactory.groovy:58`, `StreetFactory.groovy:25`). Every child is created through the facade's `create*` delegators (`ProceduralFactory.groovy:82-136`, e.g. `StreetFactory.groovy:41` `registry.createBuilding(...)`); **no code in `src/main` or `src/test` calls a per-type factory's `create`/`populate` directly** (grep this session: zero hits).

**Static state in procgen:** only the singleton itself. `ThemeService` (`ThemeService.groovy:15-40`) is per-instance and loads 38 small classpath text files in its constructor. `NameGenerator.buildingLexicon` (`:63`) is `static final`, loaded once — unchanged.

**Constructor / static call sites (test tree):** `new GameState(` — `CoherenceDrainTest:16`, `AutoEntryTest:16` (signature unchanged by this plan); `new NavigationOrchestrator(state)` — `AutoEntryTest:18`; `WorldGenesis.createInitialWorld(seed)` — `CaptureVerificationTest:25`; `new PersistenceService(` / `SyncManager.restore(` — none in tests.

**Test readers of the static (11 files, 19 sites):** `ObjectDistributionTest:13`, `RegionalDivergenceTest:23`, `StreetTest:6,23`, `JournalEventContractTest:32` (comment only), `ProcgenVariabilityTest:5,15,59`, `CorrectnessRegressionTest:26`, `ProcgenSnapshotTest:19(doc),34,57`, `DeterministicUniverseTest:6,25,31`, `ProceduralFactoryRegistryTest:40,49,54,62,82`, `FilamentNullRollTest:29`, `ProcgenDeepSnapshotTest:10(doc),34,211`.

**Tests that build a `Container` by hand and then reach its children (lazy population → today the static, tomorrow the fail-loud guard):**
`MnemonicReversalTest:24,26` (Apartment → `rooms`), `:45-47` (Building → `getFloor`); `SpectralFrequencyContractTest:195,205`; `JournalEventContractTest:33,40` (Building), `:107,111→NullSector.groovy:116` (`getOptions` → `getChildren`); `RoomCategoryTest:34,39`; `AbyssalRitualTest:31,40` and `:54,62` (breach → `getFloor(-1)` → `createFloor`); `StreetTest:28,32` (`buildings`); `AutoEntryTest:24,28`; `NavigationSyncTest:23,34`; `StructuralConsistencyTest:21,25` and `:32,33`; `SystemNameTest:20,25`; `CyberTerminalTest:21,22`; `NavArrayTest:36` (Street rendered via `renderCompass` — may or may not populate; the guard decides).
Probably **not** reached (no child access; the guard confirms): `AbyssalRitualTest:13-25` (only `notifySampled`/`isPrimed`), `CoherenceDrainTest:24-55` (`processTurn` → `getVibe`/`isAbyssal`/`enter`/`processAction`, `Floor.enter` at `Floor.groovy:109-115` touches no children), `SurvivalPinningTest:20,38,88` (`new Apartment()` as a Room's parent; `Room.enter` at `:157` is `markVisited()` only), `StreetTest:29` / `NavigationSyncTest:30` (`new City`/`new Street` used as a parent for vibe only).

## Coverage audit (Coverage Claim Protocol)

| Behavior at risk | Guard (assertion lines read this session) | Verdict |
| :--- | :--- | :--- |
| Same seed → same world through a factory instance | `DeterministicUniverseTest:36-38,54-55`; `ProcgenSnapshotTest:42-50,70-85`; `ProcgenDeepSnapshotTest` 9 pins (e.g. `:212`); `./vinc.sh --scan` seed 0 → 9 | PASS |
| New game builds the universe and lands on a Street | `NewGameTest:21-22,30`; `StartupTest:17-24`; `LocationRenderingTest:32,37`; `CorridorPersistenceTest:45,48,55` | PASS |
| Trace restore rebuilds the universe and lands on the same LIP / name / vibe / mutation state | `TracePersistenceTest:91-94,101-102,105`; `CorridorPersistenceTest:82` | PASS |
| Memento restore re-runs `initializeWorld` and resolves the LIP | `GameMementoTest:58-60` | PASS |
| Abyssal floor is created on demand through the factory | `AbyssalRitualTest:63,68-70,73-78` | PASS |
| Floor progress = visited / `countSubLocations` | `VisitedProgressTest:77,82`; `ProcgenDeepSnapshotTest:212` | PASS |
| Scanner finds the same seeds; a scanner-found street renders | `SeedScannerTest:26-28,40`; `LandmarkDiscoveryTest:40,45` | PASS (see order-dependency note) |
| Registry dispatch by exact class; unregistered type fails loud | `ProceduralFactoryRegistryTest:40-42,49,64,81-84` | PASS |
| Every location a `Game` creates renders through that game's `fmt` | `LocationRenderingTest:58-70` proves *a* non-null `fmt` (rendering would NPE otherwise); **no assertion says it is `game.fmt`** | **UNGUARDED → step 0** |
| Restored world renders through the restoring game's `fmt` | none | **UNGUARDED → step 0** |
| (new) Every container the factory hands out — root, lazily populated descendants, on-demand abyssal floor, restored universe — carries the factory that made it | new behavior; cannot pass on `master` | pinned in c3/c4 |
| (new) A container built outside the registry fails loud on first lazy access, naming the class | new behavior | pinned in c3 |
| (new) Two `Game`s in one JVM hold independent factories with their own `fmt` | new behavior | pinned in c4 |

## Steps

### Step 0 — branch + baseline
- `git checkout -b housekeeping/hk-008-factory-injection` from `master` @ 2077ccb.
- `./vinc.sh --test --agent 2>/dev/null` → expect `207/207/0/0`; `./vinc.sh --scan` → seed 0 → 9 nodes. Record both.

### c1 — plan document (docs only)
- This plan → `tasks/completed/HK_008_PLAN.md` (status "IN PROGRESS", grill verdict filled in).

### c2 — step-0 pin: `FactoryWiringContractTest` part A (test only, passes on `master`)
New `src/test/groovy/com/endlesstransit/procgen/FactoryWiringContractTest.groovy`:
- **A1** `new Game(0x1234L)`: walk `game.universe` → filament[0] → sector → system → planet → country → city → street → building → floor → corridor → apartment → room; assert every node's `fmt.is(game.fmt)`.
- **A2** trace round trip through a temp save file (the HK-012 pattern from `TracePersistenceTest`): after `freshGame.restoreSession()`, assert `freshGame.currentLocation.fmt.is(freshGame.fmt)` and `freshGame.universe.fmt.is(freshGame.fmt)`.
Run the full suite; commit.

### c3 — locations carry their registry (4 production files)
- `ProceduralFactory.groovy`: constructor `ProceduralFactory(OutputFormatter fmt)` (property stays settable *this commit only*; the static becomes `new ProceduralFactory(null)` and `Game` still assigns `fmt` into it). Add `private <T extends Container> T wire(T c) { c.factory = this; return c }` and wrap the return of each of the 13 container delegators (`createUniverse` … `createApartment`; `createRoom` is a leaf, untouched). Javadoc: the facade stamps its identity on every container it hands out.
- `Container.groovy`: `ProceduralFactory factory` property beside `fmt` (`:18`); `populateChildren()` becomes:
  `if (factory == null) throw new IllegalStateException("${getClass().simpleName} was built outside the registry — set .factory before its children are accessed")`, then `factory.populate(this)`.
- `Building.groovy`: `:129` → `factory.countSubLocations(floor)`; `:252` → `factory.createFloor(...)`; drop the now-unused import (`:9`).
- `Game.groovy`: facade accessor `ProceduralFactory getFactory() { ProceduralFactory.instance }` (facade-first, Phase 6 pattern — repointed in c4).
- **Tests in this commit (final form, no second touch):** every hand-built container listed above gets `x.factory = game.factory` where a `Game` exists, otherwise a local `new ProceduralFactory(new StandardTerminalAdapter())` — mirroring the existing `building.fmt = new StandardTerminalAdapter()` at `NavigationSyncTest:29`. Files: `MnemonicReversalTest`, `SpectralFrequencyContractTest`, `JournalEventContractTest`, `RoomCategoryTest`, `AbyssalRitualTest`, `StreetTest`, `AutoEntryTest`, `NavigationSyncTest`, `StructuralConsistencyTest`, `SystemNameTest`, `CyberTerminalTest`, plus any of the "probably not reached" sites the guard fires on (the exception message names the class).
- `FactoryWiringContractTest` part B: **B1** every node on the A1 walk has `factory.is(game.factory)`; **B2** a breached hand-built Building's `getFloor(-1)` and its corridor/apartment carry the same factory; **B3** `new Building(locus)` with `maxFloors = 1` and no factory → `getFloor(0)` throws `IllegalStateException` whose message contains `Building`.
- Full suite + goldens + scan; commit.

### c4 — the game owns its factory (5 production files)
- `Game.groovy`: `final ProceduralFactory factory`; constructor: `this.fmt = …; this.factory = new ProceduralFactory(fmt)`; `new NavigationOrchestrator(state, factory)`; `new PersistenceService(state, navOrchestrator, inputHandler, factory)`; the c3 getter is deleted (the `final` property supplies `getFactory()`). **The static assignment at `:37` stays in c4** (grill amendment): `SeedScanner` still creates worlds through the static until c5, and `LandmarkDiscoveryTest:43` renders one of them, so the static's `fmt` must keep being set until the scanner owns a factory. Commented as HK-008 scaffolding, removed in c5.
- `NavigationOrchestrator.groovy`: `private final ProceduralFactory factory` via constructor; `WorldGenesis.createInitialWorld(factory, state.masterLocus)`.
- `WorldGenesis.groovy`: `static GenesisResult createInitialWorld(ProceduralFactory factory, LocusSeed masterLocus)`.
- `PersistenceService.groovy`: fourth constructor arg; `SyncManager.restore(factory, state.events, saveFile)`; fallback `?: factory.createUniverse(state.masterLocus)`.
- `SyncManager.groovy`: `static GameSession restore(ProceduralFactory factory, EventBus events, String saveFile)`; `:70` uses it.
- **Tests:** `AutoEntryTest:18` → `new NavigationOrchestrator(state, new ProceduralFactory(new StandardTerminalAdapter()))`; `CaptureVerificationTest:25` → `WorldGenesis.createInitialWorld(new ProceduralFactory(new StandardTerminalAdapter()), seed)`.
- `FactoryWiringContractTest` part C: **C1** after A2's restore, `freshGame.universe.factory.is(freshGame.factory)`; **C2** two `new Game(1L)` in one test: `!a.factory.is(b.factory)`, `a.universe.factory.is(a.factory)`, `b.universe.factory.is(b.factory)`, and `a.universe.fmt.is(a.fmt)` after `b` was built (the "last game wins" bug can no longer happen).
- Full suite + goldens + scan; commit.

### c5 — the static is gone (3 production files)
- `ProceduralFactory.groovy`: delete `static ProceduralFactory instance`; `fmt` becomes `final`, set only by the constructor.
- `SeedScanner.groovy`: `private final ProceduralFactory factory = new ProceduralFactory(new StandardTerminalAdapter())`; `:82` uses it. (`new SeedScanner()` keeps working for `main` and the two tests.)
- `Game.groovy`: delete the scaffold line (`ProceduralFactory.instance.fmt = this.fmt`).
- **Tests (11 files, the readers listed above):** replace `ProceduralFactory.instance` with a local `factory` — `game.factory` in `StreetTest` (it already builds a `Game`), `new ProceduralFactory(new StandardTerminalAdapter())` elsewhere; fix the two javadoc mentions. The compile proves no reader remains: `grep -rn "ProceduralFactory.instance" src/` → 0.
- Full suite + goldens + scan; commit.

### c6 — docs, lessons, close-out (docs only)
- `procgen/CLAUDE.md:8` + `procgen/GEMINI.md:6`: "Use `ProceduralFactory.instance`" → the factory is an instance owned by `Game` (`game.factory`), passed to `NavigationOrchestrator` / `PersistenceService` / `SyncManager.restore` / `WorldGenesis.createInitialWorld`; every container carries `factory`; `SeedScanner` and tests build their own.
- `model/CLAUDE.md` constraint line: `fmt` **and** `factory` are set by the registry facade at creation; `Container.populateChildren()` asks `factory`.
- `core/CLAUDE.md`: one line under Game Loop & State: `Game.factory` (final) is the world generator; never a static.
- `tasks/lessons/model.md`: extend "Directly-constructed model objects require explicit `fmt` injection" with `factory` (the guard message names the class); note the `LandmarkDiscoveryTest` order dependency as the symptom a locator hides.
- `ProceduralFactory` / `LocationFactory` / `Container` javadocs; `tasks/backlog/HOUSEKEEPING.md` HK-008 → CLOSED with commits; `tasks/todo.md`; `tasks/RECOVERY_PROMPT.md`; one line in `docs/analysis/OOA_REFACTOR_PLAN.md` under the Phase 10 HK notes.
- Then `/chronicle`, then `docs/retro/RETRO_HK_008.md`, merge to `master`, push (each on explicit go-ahead).

## Files
**Production (9):** `ProceduralFactory.groovy` (c3, c5), `Container.groovy` (c3), `Building.groovy` (c3), `Game.groovy` (c3, c4, c5), `NavigationOrchestrator.groovy` (c4), `WorldGenesis.groovy` (c4), `PersistenceService.groovy` (c4), `SyncManager.groovy` (c4), `SeedScanner.groovy` (c5). Per-commit production count: c3 = 4, c4 = 5, c5 = 3 — all within the cap.
**Test blast radius:** `FactoryWiringContractTest` (new, c2/c3/c4); c3: the 11 hand-construction files above (+ any the guard flags); c4: `AutoEntryTest`, `CaptureVerificationTest`; c5: the 11 static-reader files. `HudFrameHarness`, `HeadlessRunner`, `GoldenFrameGenerator` build a `Game` and are untouched.
**Untouched by design:** the 14 per-type factories, `LocationFactory`, `GameState` (its constructor stays `(LocusSeed)`; a service is not state — Phase 6 precedent is constructor injection into services, as with `InputHandler`), `Room`/`AbstractLeafLocation` (leaves never populate), all `ui` classes.

## Declared deviations / decisions
1. **Back-reference is stamped by the facade, not by each per-type factory.** The reference is *to the registry*, and every child passes through the facade's delegators (zero direct per-type callers). One file instead of fourteen; `fmt` stays where Phase 9 left it.
2. **`SeedScanner` gets a real `StandardTerminalAdapter`**, where today it inherits whatever `fmt` the last `Game` left in the static (or `null` under `--scan`). Scan output never renders, so `--scan` is unchanged; `LandmarkDiscoveryTest` stops depending on test order.
3. **One `ThemeService` per factory** (38 small resource reads per `new Game`; 47 `new Game(` sites in tests + ~25 local factories). Expected cost well under 0.5 s on a ~2.6 s suite; measured and recorded at c4. `ThemeService` has no static state and its reads are pure functions of the locus, so world generation is unaffected.
4. **Scaffolding in c3 and c4:** the static stays alive (built with a `null` formatter), `fmt` stays settable on the facade, and `Game.groovy:37` keeps writing its `fmt` into the static — because `SeedScanner`, `CaptureVerificationTest` and the eleven static-reader tests still generate worlds through it until c5, and one of those worlds is rendered (`LandmarkDiscoveryTest:43`). c5 removes all three at once; the compile proves nothing else needed them. Declared so the intermediate state is not mistaken for the target.

## Grill report (run this session, evidence above)

| # | Check | Verdict |
| :--- | :--- | :--- |
| 1 | Coverage claims — every guard quoted from the test files read this session; two UNGUARDED existing behaviors get the step-0 pin (c2) | PASS |
| 2 | Behavioral edges — `Container.populateChildren` (static → own factory, fail-loud on null), `Building:129/252`, `Game` ctor, `SyncManager.restore`/`restoreSession`, `SeedScanner` formatter; each with a named guard | PASS |
| 3 | Lifecycle — today one constructor site (`ProceduralFactory.groovy:23`); after: `Game` (final), `SeedScanner` (final), test locals; no `src/main` site assigns `.factory` except `wire()`; restore paths replace `player`/`universe`, never a factory | PASS |
| 4 | Per-commit coherence — original c4 dropped `Game.groovy:37` while `SeedScanner` still used the static: its worlds would carry a null `fmt` and `LandmarkDiscoveryTest:43` would NPE | **AMEND → applied** (scaffold line kept through c4, removed in c5; c5 = 3 production files) |
| 5 | Deviations + pattern integrity — three deviations from the backlog shape declared (facade-stamped back-reference, scanner-owned factory, fail-loud guard); `grep "instanceof .*Factory" src/` → 0; no sibling factory calls bypass the facade (grep of `procgen/` → 0) | PASS |
| 6 | Reversion unit — one commit each, docs never share a commit with code | PASS |

Blast-radius cross-check: every hit for `createInitialWorld`, `SyncManager.restore(`, `new NavigationOrchestrator(`, `new PersistenceService(`, `countSubLocations`, `createFloor(`, `populateChildren()` and `ProceduralFactory.instance` in both trees appears in Files / Test blast radius above (remaining hits are comments that stay true). No existing `factory`/`getFactory` symbol in `src/main` outside `procgen` or in `src/test`. **CLEARED.**
5. **Hand-built containers must now be told their factory**, as they already must be told their `fmt` (lesson in `tasks/lessons/model.md`). The guard fails loud with the class name instead of NPE-ing inside `populate`.
6. **`Container.factory` is a plain property, not `final`**: tests set it after construction, exactly like `fmt`. Nothing in `src/main` assigns it outside `wire()` (grep at c5 pins this: `grep -rn "\.factory = " src/main` → the one site in the facade).

## Gates (after every commit)
`./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS … FAILED=0`; the 36 goldens are inside that run and must not move; `./vinc.sh --scan` → seed 0 → 9 nodes; `git status --short` clean after the run. `DeterministicUniverseTest` is in the suite. At c5: `grep -rn "ProceduralFactory.instance" src/` → 0; `grep -rn "instanceof .*Factory" src/` → 0.

## Reversion unit
Each commit is independently green and reverts alone (`git revert <sha>`); c3 → c5 must revert in reverse order because c4 depends on c3's field and c5 on c4's ownership. Docs (c1, c6) never share a commit with production code. The branch merges to `master` only when every gate passes on the final commit.
