# OOA Refactor Plan: Structural Hardening
**Created:** 2026-03-17
**Based on:** `docs/analysis/OOA_REPORT.md`
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
| 0 | Baselines | `[ ] NOT STARTED` | None |
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

---

## Phase 0 — Baselines
**Goal:** Capture reference scan output before any code changes. Every subsequent phase compares against this.
**OOA Items:** Prerequisite for all phases.
**Files:** None (scan output only).

### Tasks
- [ ] Run `./vinc.sh --scan` across 3+ seeds; save results to `screenshots/`
- [ ] Confirm `VisualBaselinePinningTest` covers key markers: `RADAR`, `ELEVATOR`, `NEURAL_LINK`
- [ ] Confirm full test suite is green: `./vinc.sh --test`
- [ ] Record baseline seed(s) used as reference for future scan comparisons

**Status:** `[ ] NOT STARTED`
**Gates:** `./vinc.sh --test` (green baseline)

---

## Phase 1 — Bug Fixes
**Goal:** Correct two silent correctness bugs before subsequent phases build on them.
**OOA Items:** 4.1, 4.3
**Max files per commit:** 2
**Depends on:** Phase 0

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
**Depends on:** Phase 0

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
**Depends on:** Phase 3

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
**Depends on:** Phase 4 (LeafLocation base in place)

> **Critical:** Run `./vinc.sh --compile` after every single file change in this phase.

### 5a — Identify all call sites (analysis, no code)
- [ ] Grep all `ModelOutput.fmt` usages across `model/` package
- [ ] List every class that requires injection
- [ ] Document the injection chain from `Main.groovy` down

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
**Depends on:** Phase 5

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
**Depends on:** Phase 6 (BridgeView owned by RenderingCoordinator)

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

**Files:** `FloorState.groovy` (new), `ElevatorState.groovy` (new), `CorridorState.groovy` (new), `Floor.groovy`
**Status:** `[ ] NOT STARTED`

**Phase 8 Gates:** `./vinc.sh --test` — focus `AutoEntryTest`, `NavigationSyncTest`, `TracePersistenceTest` + `./vinc.sh --scan`

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
**Depends on:** Phase 4b (SynthesisService in place)

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
    └── Phase 1 (Bug Fixes)
    └── Phase 2 (Resource Loading)
    └── Phase 3 (Value Objects)
            └── Phase 4 (Structural Extraction)
                    └── Phase 5 (DI: ModelOutput)
                            └── Phase 6 (GameState Decomp.)
                                    └── Phase 7 (BridgeView Decomp.)
                    └── Phase 8 (Floor State Pattern)  ← also needs Phase 1a
    └── Phase 9 (ProceduralFactory Split)              ← needs Phase 3
    └── Phase 10 (Domain Events)                       ← needs Phase 4b
    └── O1 (HeadlessRunner DSL)                        ← independent
```

---

## Refactor Guard (always active)

- Maximum **5 files** per atomic commit
- `./vinc.sh --compile` after **every file change** in Phase 5+
- `./vinc.sh --scan` **before and after** any phase touching `model` or `ui`
- If anything goes sideways: **STOP, revert, re-plan** — do not push through
- After any user correction: update `tasks/lessons/<domain>.md`

---

*Last updated: 2026-03-17*
*No source code changes are authorized by this document.*
*To begin a phase, issue an explicit Directive per the Vinculum Protocol in `.claude/CODEX.md`.*
