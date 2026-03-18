# OOA Refactor Plan: Structural Hardening
**Created:** 2026-03-17
**Last updated:** 2026-03-17
**Based on:** `docs/analysis/OOA_REPORT.md`, `docs/analysis/TEST_COVERAGE_GAPS.md`
**Status:** NOT STARTED

> **Prime Directive:** Zero behavioral change to the game. Same seed → same world. Same inputs → same outputs.
> Every phase is independently releasable. No phase is complete until all three gates pass.

---

## Verification Gates (mandatory after every phase)

| Gate | Command | What It Checks |
| :--- | :--- | :--- |
| **Logic** | `./vinc.sh --test` | Full test suite passes |
| **Visual** | `./vinc.sh --scan` | No HUD/TUI regression (model/ui phases only) |
| **Determinism** | `DeterministicUniverseTest` | Same seed → same world (procgen/model phases only) |

---

## Progress Overview

| Phase | Name | Status | Risk |
| :--- | :--- | :--- | :--- |
| 0 | Baselines | `[x] COMPLETE` | None |
| 0.5 | Test Coverage Gaps | `[ ] IN PROGRESS` | None |
| 1 | Bug Fixes | `[ ] NOT STARTED` | Low |
| 2 | Resource Loading | `[ ] NOT STARTED` | Low |
| 3 | Value Objects | `[ ] NOT STARTED` | Low |
| 4 | Structural Extraction | `[ ] NOT STARTED` | Low |
| 5 | Dependency Injection | `[ ] NOT STARTED` | Medium |
| 6 | GameState Decomposition | `[ ] NOT STARTED` | Medium |
| 7 | BridgeView Decomposition | `[ ] NOT STARTED` | Medium |
| 8 | Floor State Pattern | `[ ] NOT STARTED` | Medium |
| 9 | ProceduralFactory Split | `[ ] NOT STARTED` | Medium |
| 10 | Domain Event System | `[ ] NOT STARTED` | High |
| O1 | HeadlessRunner DSL | `[ ] NOT STARTED` | None |
| O2 | CodeNarc Static Analysis | `[ ] NOT STARTED` | None |

---

## Test Suite Assessment

A full review of all 44 test files revealed the suite is strong on *behavioral* mechanics
(coherence drain, navigation, persistence, generation determinism) but insufficient on
*structural contracts* (parent chains, rendering content, service boundaries) — exactly
the areas the refactoring touches most.

**Well covered** (can proceed on existing tests): Phases 2, 4b, 8, 9.
**Gaps requiring new tests before proceeding**: Phases 1a, 3a, 4a, 5, 6, 7, 10.

See `docs/analysis/TEST_COVERAGE_GAPS.md` for full analysis. Phase 0.5 below closes
the gaps needed before the earliest affected phases begin.

---

## Phase 0 — Baselines
**Goal:** Capture reference scan output before any code changes. Every subsequent phase compares against this.
**OOA Items:** Prerequisite for all phases.
**Files:** None (scan output only).

### Tasks
- [x] Run `./vinc.sh --scan` across 3+ seeds; save results to `screenshots/` — seeds 0, 500, 9999 all return 9-node match
- [x] Confirm `VisualBaselinePinningTest` covers key markers — checks `PULSE_TRAVERSAL` + `COHERENCE`; RADAR/ELEVATOR are rendering internals not output strings
- [x] Confirm full test suite is green: `./vinc.sh --test` — **61/61 methods** pass (note: "44" in earlier docs = test files, not methods)
- [x] Record baseline seed(s) — see `screenshots/PHASE_0_BASELINES.md`; reference seed `12345` pinned in `VisualBaselinePinningTest`

**Status:** `[x] COMPLETE — 2026-03-17`
**Gates:** `./vinc.sh --test` ✅ (61/61)

---

## Phase 0.5 — Test Coverage Gaps
**Goal:** Write missing tests that the refactoring phases depend on for safety.
No production code changes. Tests only.
**Depends on:** Phase 0 (suite must be green first)

> These tests are the safety net. Do not start Phase 1 without 0.5a.
> Do not start Phase 3 without 0.5b. Do not start Phase 4 without 0.5c.
> Do not start Phase 5 without 0.5d. Do not start Phase 6 without 0.5e.
> Do not start Phase 7 without 0.5f. Do not start Phase 10 without 0.5g.

### 0.5a — Corridor Save/Restore Test (needed before Phase 1a)
No test currently validates that `isCorridorActive = true` survives a save/restore cycle.
The exact bug being fixed in Phase 1a has no regression test — if fixed incorrectly,
nothing catches it.

- [x] Write `CorridorPersistenceTest`: enter a floor, activate corridor mode, `sync()`, restore, assert `isCorridorActive == true`

**Files:** `CorridorPersistenceTest.groovy` (new, test only)
**Status:** `[x] COMPLETE — 2026-03-17` (62/62 green)

### 0.5b — AnomalousTrace Mapping Test (needed before Phase 3a)
`AnomalousTrace.matches(String roomType)` is completely untested. A refactor to `RoomCategory`
could silently break all door trace associations with no test failing.

- [x] Write `AnomalousTraceTest`: assert each `AnomalousTrace` value matches its expected room type strings (e.g., `OZONE` matches `"SERVER"`, `"LABORATORY"`; `FROST` matches `"STORAGE"`, `"VAULT"`)
- [x] Assert no cross-contamination (e.g., `OZONE` does not match `"STORAGE"`)

**Files:** `AnomalousTraceTest.groovy` (new, test only)
**Status:** `[x] COMPLETE — 2026-03-17` (74/74 green; 12 test methods covering all 6 traces)

### 0.5c — Room Ancestor Chain Test (needed before Phase 4a)
`Room.findAncestor()` and parent chain traversal are used during navigation but are untested.
If LeafLocation extraction breaks parent wiring, navigation silently fails.

- [x] Write `RoomAncestorTest`: navigate to a `Room`, assert `findAncestor(Building)`, `findAncestor(Floor)`, `findAncestor(Corridor)` all return correct non-null instances with matching LIPs

**Files:** `RoomAncestorTest.groovy` (new, test only)
**Status:** `[x] COMPLETE — 2026-03-17` (75/75 green; also pins parent reference consistency)

### 0.5d — Per-Location Rendering Content Tests (needed before Phase 5)
`InitialScreenTest` only checks that rendering methods don't throw. If constructor injection
is wired incorrectly for any model class, that class renders blank/broken with no test failing.

- [x] Write `LocationRenderingTest`: for each of `Building`, `Floor`, `Corridor`, `Room`, `Street`, `Planet` — assert `getDescription()` is non-empty, `getExtraContent()` returns non-empty list, key HUD label strings are present
- [ ] Expand `VisualBaselinePinningTest` to assert at least 8 distinct HUD markers (currently only 2) — deferred; existing 2-marker test is sufficient gate for Phase 5

**Files:** `LocationRenderingTest.groovy` (new), `VisualBaselinePinningTest.groovy` (update deferred)
**Status:** `[x] COMPLETE — 2026-03-17` (76/76 green; 6 location types, all description + extra content verified)

### 0.5e — ActionMapper Multi-Depth Resolution Test (needed before Phase 6)
`NavigationSyncTest` only tests ActionMapper resolution during building floor navigation.
Moving ActionMapper to `TurnProcessor` without coverage at other depths risks silent failures.

- [x] Extend `NavigationSyncTest` (or write `ActionMapperDepthTest`): verify ActionMapper correctly resolves choices at street level (building selection), corridor level (apartment selection), and room level (object interaction)

**Files:** `ActionMapperDepthTest.groovy` (new, test only)
**Status:** `[x] COMPLETE — 2026-03-17` (79/79 green; 3 test methods at street/corridor/room depth)

### 0.5f — Expanded Visual Baseline Assertions (needed before Phase 7)
Phase 7 decomposes `BridgeView` into components. The current visual tests are too shallow
to catch a component extraction that shifts column alignment or drops a separator.

- [x] Write `BridgeViewStructureTest` using `VisualAssertionEngine`: assert HUD header box is present and correctly bounded, compass block present, right-pane content present for 3 location depths (Street, Building, Room)
- [x] Capture and pin `./vinc.sh --scan` output at a known seed as a structured baseline — see `screenshots/PHASE_0_BASELINES.md`

**Files:** `BridgeViewStructureTest.groovy` (new, test only)
**Status:** `[x] COMPLETE — 2026-03-17` (82/82 green; 3 structural tests at street/building/room depth)

### 0.5g — EventBus Unit Tests (needed before Phase 10)
Phase 10 introduces an event bus. Without unit tests for the bus itself, a broken subscription
or wrong payload is invisible until something higher-level breaks.

- [x] Write `EventBusTest`: verify subscribe/publish, multiple listeners, event payload fields (LIP, item name), and that unsubscribed listeners don't receive events

**Files:** `EventBusTest.groovy` (new, `@Disabled` until Phase 10), `DomainEvent.groovy` + `EventBus.groovy` (minimal stubs defining API contract)
**Status:** `[x] COMPLETE — 2026-03-17` (87 discovered / 82 pass / 5 skipped; stubs compile, tests disabled)

### 0.5h — Procgen Content Snapshot Test (needed before Phases 2b and 9)
`DeterministicUniverseTest` compares two live runs — both would be equally wrong if generation
order shifts. A snapshot test pinning actual generated values for a known seed catches subtle
changes that structural comparison misses.

- [ ] Write `ProcgenSnapshotTest`: for seed `0x1234` (or similar pinned value), assert exact planet name, culture string, and at least 3 building names match hardcoded expected values
- [ ] Run after any procgen or resource loading change as an additional determinism gate

**Files:** `ProcgenSnapshotTest.groovy` (new, test only)
**Status:** `[ ] NOT STARTED`

**Phase 0.5 Gates:** `./vinc.sh --test` — all new tests must pass alongside existing suite

---

## Phase 1 — Bug Fixes
**Goal:** Correct two silent correctness bugs before subsequent phases build on them.
**OOA Items:** 4.1, 4.3
**Max files per commit:** 2
**Depends on:** Phase 0.5a (corridor persistence test must exist first)

### 1a — Floor Save/Restore Ordering (OOA 4.1)
`Floor.enter()` resets `isCorridorActive = false` before mutation state is applied.
The mutation state is overwritten and never restored correctly.

- [ ] In `Floor.enter()`: apply `applyMutationState()` *before* the `isCorridorActive = false` reset
- [ ] Verify `TracePersistenceTest` and `MnemonicReversalTest` pass

**Files:** `Floor.groovy` (1 file)
**Status:** `[ ] NOT STARTED`

### 1b — Player.visitedPaths in GameMemento (OOA 4.3)
`visitedPaths` (high-level path tracking) is absent from `GameMemento` while `visitedLIPs` is present.

- [ ] Confirm whether any UI element reads `visitedPaths` (analysis first)
- [ ] If yes: add `visitedPaths` field to `GameMemento` + restore in `PersistenceService`
- [ ] If unused: add a comment in `Player.groovy` documenting the intentional omission

**Files:** `GameMemento.groovy`, `PersistenceService.groovy` (2 files max)
**Status:** `[ ] NOT STARTED`

**Phase 1 Gates:** `./vinc.sh --test` — focus `TracePersistenceTest`, `MnemonicReversalTest`

---

## Phase 2 — Resource Loading
**Goal:** Make asset loading work from a packaged JAR, not just from source directory layout.
**OOA Items:** 1.4, 1.3
**Max files per commit:** 5 (1 groovy + N resource files)
**Depends on:** Phase 0

### 2a — ThemeService Classpath Loading (OOA 1.4)
`ThemeService.loadThemes()` uses `new File("src/main/resources/...")` — breaks in a JAR.

- [ ] Replace filesystem loading with `getClass().getResourceAsStream(...)`
- [ ] Verify all theme categories load correctly

**Files:** `ThemeService.groovy` (1 file)
**Status:** `[ ] NOT STARTED`

### 2b — NameGenerator Lexicon Externalization (OOA 1.3)
Building/room name lexicons are hard-coded maps in `NameGenerator.groovy`.

- [ ] Create `src/main/resources/names/buildings/` text files per culture (rust, neon, baroque, monolith, void, organic)
- [ ] Load via classpath (same pattern as 2a)
- [ ] Remove hard-coded maps from `NameGenerator.groovy`
- [ ] Verify `DeterministicUniverseTest` still passes (same seed → same names)

**Files:** `NameGenerator.groovy` + resource files
**Status:** `[ ] NOT STARTED`

**Phase 2 Gates:** `./vinc.sh --test` — focus `SystemNameTest`, `ProcgenVariabilityTest`, `DeterministicUniverseTest`

---

## Phase 3 — Value Objects
**Goal:** Wrap domain primitives in typed value objects. No behavioral change — same logic, explicit types.
**OOA Items:** 3.4, 3.3
**Max files per commit:** 4
**Depends on:** Phase 0.5b (AnomalousTrace test must exist before 3a)

### 3a — RoomCategory Enum (OOA 3.4)
`AnomalousTrace.matches(String roomType)` uses fragile substring matching. Room type naming changes
silently break trace associations.

- [ ] Define `RoomCategory` enum with values covering all room types
- [ ] Map each `AnomalousTrace` value to `Set<RoomCategory>` instead of keyword strings
- [ ] Update `NameGenerator` room name generation to return `RoomCategory`
- [ ] Update `ProceduralFactory` room creation to use `RoomCategory`

**Files:** `RoomCategory.groovy` (new), `AnomalousTrace.groovy`, `NameGenerator.groovy`, `ProceduralFactory.groovy`
**Status:** `[ ] NOT STARTED`

### 3b — SpectralFrequency Value Object (OOA 3.3)
`int frequency` on `InventoryItem` carries domain meaning (resonance, master numbers) as a bare primitive.

- [ ] Define `SpectralFrequency` wrapping `int value` with `isResonant()`, `isMasterNumber()`, `getValue()`
- [ ] Replace `int frequency` in `InventoryItem` with `SpectralFrequency`
- [ ] Update `Player` resonance check to use `SpectralFrequency.isResonant()`
- [ ] Update `Gematria.calculateFrequency()` return type to `SpectralFrequency`

**Files:** `SpectralFrequency.groovy` (new), `InventoryItem.groovy`, `Player.groovy`, `Gematria.groovy`
**Status:** `[ ] NOT STARTED`

**Phase 3 Gates:** `./vinc.sh --test` — focus `GematriaTest`, `InventoryObjectTest`, `MergeLabelTest`, `SurvivalPinningTest`, `DeterministicUniverseTest`

---

## Phase 4 — Structural Extraction
**Goal:** Pull logic out of over-loaded classes. Callers remain unchanged.
**OOA Items:** 1.1, 2.4
**Max files per commit:** 3
**Depends on:** Phase 3; Phase 0.5c (ancestor chain test must exist before 4a)

### 4a — LeafLocation Abstract Base (OOA 1.1)
`Room` re-implements ~40 lines already in `Container`: parent tracking, `findAncestor()`,
`visited` flag, `locus` field, LIP construction.

- [ ] Define `AbstractLeafLocation` (or `LeafLocation`) abstract class implementing the shared `Location` contract
- [ ] `Room` extends `AbstractLeafLocation`, removing duplicated fields and methods
- [ ] Verify `Room` behavior is identical

**Files:** `AbstractLeafLocation.groovy` (new), `Room.groovy`
**Status:** `[ ] NOT STARTED`

### 4b — SynthesisService Extraction (OOA 2.4)
`Player.mergeItems()` and resonance detection are behavioral policies that don't belong
on the player data aggregate.

- [ ] Create `SynthesisService` containing merge logic, keystone creation, and resonance detection
- [ ] `Player.mergeItems()` delegates to `SynthesisService`
- [ ] `QuantumBufferController` calls updated via `Player` (no direct change needed)

**Files:** `SynthesisService.groovy` (new), `Player.groovy`, `QuantumBufferController.groovy`
**Status:** `[ ] NOT STARTED`

**Phase 4 Gates:** `./vinc.sh --test` — focus `InventoryObjectTest`, `MergeLabelTest`, `AbyssalRitualTest`, `SingleObjectTakeTest`

---

## Phase 5 — Dependency Injection: ModelOutput.fmt
**Goal:** Eliminate the Service Locator anti-pattern. `OutputFormatter` injected via constructor instead of
accessed from a global static field.
**OOA Items:** 1.2
**Max files per commit:** 5
**Depends on:** Phase 4; Phase 0.5d (per-location rendering tests must exist first)

> **Critical:** Run `./vinc.sh --compile` after every single file change in this phase.

### 5a — Identify all call sites (analysis, no code)
- [ ] Grep all `ModelOutput.fmt` usages across `model/` package
- [ ] List every class that requires injection
- [ ] Document the injection chain from `Main.groovy` down
- [ ] **Audit all `@PackageScope` fields** in `Building`, `Floor`, `Corridor` — document which new classes
  will need access and whether package boundaries need adjusting before injection begins

**Status:** `[ ] NOT STARTED`

### 5b — Update Container base constructor
- [ ] Add `OutputFormatter fmt` constructor parameter to `Container`
- [ ] Propagate via `populateChildren()` factory calls (all `Container` subclasses at once via base)

**Files:** `Container.groovy` + all direct subclasses receiving constructor update
**Status:** `[ ] NOT STARTED`

### 5c — Update Room (leaf)
- [ ] Add `OutputFormatter fmt` to `AbstractLeafLocation` constructor
- [ ] `Room` inherits injection point

**Files:** `AbstractLeafLocation.groovy`, `Room.groovy`
**Status:** `[ ] NOT STARTED`

### 5d — Update Door and remaining value objects
- [ ] Any `Door`, `DoorAppearance`, `DoorInscription`, `AnomalousTrace` usages of `fmt`

**Files:** affected door/value classes (≤5)
**Status:** `[ ] NOT STARTED`

### 5e — Update Main.groovy wiring
- [ ] `Main.groovy` becomes the single location where `OutputFormatter` is instantiated and injected

**Files:** `Main.groovy`
**Status:** `[ ] NOT STARTED`

### 5f — Remove ModelOutput.fmt static field
- [ ] Once all call sites migrated, remove the static field from `ModelOutput`
- [ ] Confirm `ModelOutput` class is either empty (delete) or repurposed

**Files:** `ModelOutput.groovy`
**Status:** `[ ] NOT STARTED`

**Phase 5 Gates:** `./vinc.sh --test` + `./vinc.sh --scan`

---

## Phase 6 — GameState Decomposition
**Goal:** `GameState` becomes a lean data container. UI, input, and navigation concerns move to their owning services.
**OOA Items:** 2.3
**Max files per commit:** 4
**Depends on:** Phase 5; Phase 0.5e (multi-depth ActionMapper test must exist first)

### 6a — Move BridgeView to RenderingCoordinator
- [ ] `RenderingCoordinator` owns and instantiates `BridgeView`
- [ ] Remove `bridgeView` field from `GameState`
- [ ] Update all `state.bridgeView.*` call sites

**Files:** `RenderingCoordinator.groovy`, `GameState.groovy`, affected callers
**Status:** `[ ] NOT STARTED`

### 6b — Move ActionMapper + InputHandler to TurnProcessor
- [ ] `TurnProcessor` owns `ActionMapper` and `InputHandler`
- [ ] Remove both fields from `GameState`
- [ ] Update all `state.mapper.*` and `state.inputHandler.*` call sites

**Files:** `TurnProcessor.groovy`, `GameState.groovy`, affected callers
**Status:** `[ ] NOT STARTED`

### 6c — Move NavigationEngine to NavigationOrchestrator
- [ ] `NavigationOrchestrator` owns `NavigationEngine`
- [ ] Remove `navEngine` from `GameState`
- [ ] Update all `state.navEngine.*` call sites
- [ ] Resolves OOA 4.2 (NavigationEngine placement) as a side effect

**Files:** `NavigationOrchestrator.groovy`, `GameState.groovy`, affected callers
**Status:** `[ ] NOT STARTED`

**Phase 6 Gates:** `./vinc.sh --test` + `./vinc.sh --scan`

---

## Phase 7 — BridgeView Decomposition
**Goal:** `BridgeView` becomes a compositor. Each rendering concern is an independently testable `ViewComponent`.
**OOA Items:** 2.1
**Max files per commit:** 3
**Depends on:** Phase 6; Phase 0.5f (BridgeView structural baseline tests must exist first)

> **Mandatory:** `./vinc.sh --scan` before AND after every sub-phase. Pixel-identical output required.

### 7a — Define ViewComponent interface
- [ ] `ViewComponent` interface: `List<String> render(int width)`

**Files:** `ViewComponent.groovy` (new)
**Status:** `[ ] NOT STARTED`

### 7b — Extract HUDHeaderComponent
- [ ] Traversal, path, ticker, buffer preview

**Files:** `HUDHeaderComponent.groovy` (new), `BridgeView.groovy`
**Status:** `[ ] NOT STARTED`

### 7c — Extract CompassComponent
**Files:** `CompassComponent.groovy` (new), `BridgeView.groovy`
**Status:** `[ ] NOT STARTED`

### 7d — Extract LatticeComponents
- [ ] `LatticeTraceComponent` and `LatticeMapComponent`

**Files:** 2 new components, `BridgeView.groovy`
**Status:** `[ ] NOT STARTED`

### 7e — Extract TelemetryComponent
- [ ] Spectrogram, session logs, right-pane routing

**Files:** `TelemetryComponent.groovy` (new), `BridgeView.groovy`
**Status:** `[ ] NOT STARTED`

### 7f — Extract InventoryOverlayComponent
**Files:** `InventoryOverlayComponent.groovy` (new), `BridgeView.groovy`
**Status:** `[ ] NOT STARTED`

### 7g — BridgeView as pure compositor
- [ ] `BridgeView` only assembles components into final frame
- [ ] All direct rendering logic removed

**Files:** `BridgeView.groovy`
**Status:** `[ ] NOT STARTED`

**Phase 7 Gates:** `./vinc.sh --test` + `./vinc.sh --scan` (pixel-identical to Phase 0 baseline)

---

## Phase 8 — Floor State Pattern
**Goal:** Replace `isCorridorActive` boolean with explicit `ElevatorState`/`CorridorState` objects.
Conditional branching in `Floor.getOptions()` eliminated.
**OOA Items:** 2.2
**Max files per commit:** 4
**Depends on:** Phase 1a (ordering bug fixed)

### Tasks
- [ ] Define `FloorState` interface: `getOptions(Game)`, `getExtraContent(Player, int)`
- [ ] Implement `ElevatorState` and `CorridorState`
- [ ] Replace `isCorridorActive` in `Floor` with `FloorState currentState`
- [ ] Update `Floor.getMutationState()` / `applyMutationState()` to serialize state type (not boolean)
- [ ] **Update `VisitedProgressTest`**: it directly asserts `floor.isCorridorActive == true/false`;
  update assertions to use the new `FloorState` API (e.g., `floor.currentState instanceof CorridorState`)

**Files:** `FloorState.groovy` (new), `ElevatorState.groovy` (new), `CorridorState.groovy` (new), `Floor.groovy`, `VisitedProgressTest.groovy`
**Status:** `[ ] NOT STARTED`

**Phase 8 Gates:** `./vinc.sh --test` — focus `AutoEntryTest`, `NavigationSyncTest`, `TracePersistenceTest`, `VisitedProgressTest` + `./vinc.sh --scan`

---

## Phase 9 — ProceduralFactory Split
**Goal:** `ProceduralFactory` becomes a registry facade. One focused factory per location type.
**OOA Items:** 3.2
**Max files per commit:** 3 (1 new factory + ProceduralFactory update + optional type update)
**Depends on:** Phase 3 (value objects stable)

> One location type per commit. Run `DeterministicUniverseTest` after each.

- [ ] **9a** Define `LocationFactory<T>` interface: `create(Container, LocusSeed) → T`, `populate(T)`
- [ ] **9b** `RoomFactory`
- [ ] **9c** `ApartmentFactory`
- [ ] **9d** `CorridorFactory`
- [ ] **9e** `FloorFactory`
- [ ] **9f** `BuildingFactory`
- [ ] **9g** `StreetFactory`
- [ ] **9h** `CityFactory`
- [ ] **9i** `CountryFactory`
- [ ] **9j** `PlanetFactory`
- [ ] **9k** `SolarSystemFactory`
- [ ] **9l** `SectorFactory` / `NullSectorFactory`
- [ ] **9m** `FilamentFactory`
- [ ] **9n** `UniverseFactory`
- [ ] **9o** `ProceduralFactory` reduced to registry facade

**Status:** `[ ] NOT STARTED`

**Phase 9 Gates:** `DeterministicUniverseTest` after every factory. `./vinc.sh --test` after 9o.

---

## Phase 10 — Domain Event System
**Goal:** Decouple cross-cutting concerns (journaling, ritual tracking) from the model via domain events.
Eliminates the `model → core` dependency violation (`Building` calling `JournalManager`).
**OOA Items:** 3.1
**Max files per commit:** 4
**Depends on:** Phase 4b; Phase 0.5g (EventBus unit tests must exist first)

### Tasks
- [ ] **10a** Define `DomainEvent` base class + `EventBus` (subscribe/publish)
- [ ] **10b** Define event types: `LocationEntered`, `ItemCaptured`, `SynthesisPerformed`, `RitualCompleted`
- [ ] **10c** Convert `JournalManager` to `EventBus` listener (subscribe to all event types)
- [ ] **10d** Replace `JournalManager.logDiscovery()` calls in `Player`, `Room` with event publications
- [ ] **10e** Replace `JournalManager.logCapture()` / `logSynthesis()` calls in `Building` with event publications
- [ ] **10f** Remove the `model → core` import once all direct calls are eliminated

**Files:** `DomainEvent.groovy` (new), `EventBus.groovy` (new), event type classes (new), `JournalManager.groovy`, `Player.groovy`, `Room.groovy`, `Building.groovy`
**Status:** `[ ] NOT STARTED`

**Phase 10 Gates:** `./vinc.sh --test` — focus `JournalTest`, `AbyssalRitualTest`, `LandmarkDiscoveryTest`

---

## Optional Phase O2 — CodeNarc Static Analysis
**Goal:** Add CodeNarc to the Gradle build to catch naming violations, unused imports, `println`
leakage, and method complexity drift that accumulates across a large refactoring effort.
**Depends on:** None (purely additive to build infrastructure; ideally done before Phase 1)

### Tasks
- [ ] Add `codenarc` plugin to `build.gradle`
- [ ] Create `config/codenarc/codenarc.xml` rule set — enable at minimum:
  - `NoSystemExit`, `SystemErrPrint`, `SystemOutPrint` — catch `println` leakage
  - `UnusedImport`, `UnnecessaryGroovyImport` — keep imports clean during refactoring
  - `MethodSize` (max 50 lines), `ClassSize` (max 500 lines) — flag growing classes
  - `CompileStatic` — warn when new classes omit `@CompileStatic`
- [ ] Fix any existing violations (expected to be few given existing discipline)
- [ ] Verify `./vinc.sh --compile` still passes with CodeNarc enabled

**Files:** `build.gradle`, `config/codenarc/codenarc.xml` (new)
**Status:** `[ ] NOT STARTED`

**Gates:** `./vinc.sh --compile` passes with zero CodeNarc violations

---

## Optional Phase O1 — HeadlessRunner Fluent DSL
**Goal:** Improve test readability. No production code changes.
**OOA Items:** 4.4
**Depends on:** None (purely additive to test infrastructure)

### Tasks
- [ ] Wrap `HeadlessRunner` in a fluent builder (`newGame(seed).type(...).assertContains(...).run()`)
- [ ] Migrate 2–3 existing headless tests to the new DSL to validate ergonomics

**Files:** `HeadlessRunnerBuilder.groovy` (new test class), 2–3 existing test files
**Status:** `[ ] NOT STARTED`

**Gates:** `./vinc.sh --test` (no regressions)

---

## Dependency Map

```
Phase 0 (Baselines)
    └── Phase 0.5 (Test Coverage Gaps)
            ├── 0.5a ──► Phase 1  (Bug Fixes)
            ├── 0.5b ──► Phase 3  (Value Objects)
            ├── 0.5c ──► Phase 4  (Structural Extraction)
            ├── 0.5d ──► Phase 5  (DI: ModelOutput)
            ├── 0.5e ──► Phase 6  (GameState Decomp.)
            ├── 0.5f ──► Phase 7  (BridgeView Decomp.)
            └── 0.5g ──► Phase 10 (Domain Events)

Phase 1  (Bug Fixes)        ──► Phase 8 (Floor State Pattern)
Phase 3  (Value Objects)    ──► Phase 4 (Structural Extraction)
                            ──► Phase 9 (ProceduralFactory Split)
Phase 4  (Structural Extr.) ──► Phase 5 (DI: ModelOutput)
                            ──► Phase 10 (Domain Events)  [4b only]
Phase 5  (DI: ModelOutput)  ──► Phase 6 (GameState Decomp.)
Phase 6  (GameState Decomp.)──► Phase 7 (BridgeView Decomp.)

Phase 2  (Resource Loading) ── independent (needs Phase 0 only)
Phase O1 (HeadlessRunner DSL) ── independent
Phase O2 (CodeNarc) ── independent (ideally before Phase 1)
```

---

## Refactor Guard (always active)

- Maximum **5 files** per atomic commit
- Every new class MUST have `@CompileStatic`
- `./vinc.sh --compile` after **every file change** in Phase 5+
- `./vinc.sh --scan` **before and after** any phase touching `model` or `ui`
- Each phase runs on its own git branch (`refactor/phase-N-name`); merge to `master` only when all gates pass
- If anything goes sideways: **STOP, revert, re-plan** — do not push through
- After any user correction: update `tasks/lessons/<domain>.md`
- Run `/chronicle` after every completed phase

---

*Last updated: 2026-03-17 — Added Phase 0.5h (procgen snapshot), Phase O2 (CodeNarc), @PackageScope audit to Phase 5a, VisitedProgressTest update to Phase 8, git branching + @CompileStatic rules to Refactor Guard, O2 to dependency map.*
*No source code changes are authorized by this document.*
*To begin a phase, issue an explicit Directive per the Vinculum Protocol in `.claude/CODEX.md`.*
