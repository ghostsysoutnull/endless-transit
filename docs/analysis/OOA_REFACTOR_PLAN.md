# OOA Refactor Plan: Structural Hardening
**Created:** 2026-03-17
**Last updated:** 2026-09-16
**Based on:** `docs/analysis/OOA_REPORT.md`, `docs/analysis/TEST_COVERAGE_GAPS.md`
**Status:** IN PROGRESS

> **Prime Directive:** Zero behavioral change to the game. Same seed → same world. Same inputs → same outputs.
> Every phase is independently releasable. No phase is complete until all three gates pass.

---

## Verification Gates (mandatory after every phase)

| Gate | Command | What It Checks |
| :--- | :--- | :--- |
| **Logic** | `./vinc.sh --test` | Full test suite passes |
| **Visual** | golden frames in `./vinc.sh --test` (`BridgeViewGoldenFrameTest`, `ViewComponentGoldenTest`) | No HUD/TUI regression — 36 frames byte-identical (since Phase 7; `--scan` never drew the HUD, WF-003) |
| **Model** | `./vinc.sh --scan` | Seed 0 → 9-node match (world generation) |
| **Determinism** | `DeterministicUniverseTest` | Same seed → same world (procgen/model phases only) |

---

## Progress Overview

| Phase | Name | Status | Risk |
| :--- | :--- | :--- | :--- |
| 0 | Baselines | `[x] COMPLETE` | None |
| 0.5 | Test Coverage Gaps | `[x] COMPLETE` | None |
| 1 | Bug Fixes | `[x] COMPLETE` | Low |
| 2 | Resource Loading | `[x] COMPLETE` | Low |
| 3 | Value Objects | `[x] COMPLETE` | Low |
| 3c | Gematria Return Type Completion | `[x] COMPLETE` | Low |
| 4 | Structural Extraction | `[x] COMPLETE` | Low |
| 5 | Dependency Injection | `[x] COMPLETE` | Medium |
| 6 | GameState Decomposition | `[x] COMPLETE` | Medium |
| 7 | BridgeView Decomposition | `[x] COMPLETE` | Medium |
| 8 | Floor State Pattern | `[x] COMPLETE` | Medium |
| 9 | ProceduralFactory Split | `[x] COMPLETE` | Medium |
| 10 | Domain Event System | `[x] COMPLETE` | High |
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

- [x] Write `ProcgenSnapshotTest`: for seed `0x1234` (4660), assert exact planet name, culture string, and at least 3 building names match hardcoded expected values
- [x] Run after any procgen or resource loading change as an additional determinism gate

**Files:** `ProcgenSnapshotTest.groovy` (new, test only)
**Pinned values (seed 0x1234):** filament="Mu-993-Sync", planet="Hydraia", culture=analog/monolith/shogun, country="Free Dust Kingdom", city="Starford" (labels corrected in HK-006 — Planet → Country → City), street="Busy Terrace", buildings[0,1,2]="Impenetrable Unit","ObeliskWell","ObeliskWell"
**Status:** `[x] COMPLETE — 2026-03-17` (90 discovered / 85 pass / 5 skipped / 0 failed)

**Phase 0.5 Gates:** `./vinc.sh --test` — all new tests must pass alongside existing suite
**Retrospective:** `docs/retro/RETRO_PHASE_0.5.md`

---

## Phase 1 — Bug Fixes
**Goal:** Correct two silent correctness bugs before subsequent phases build on them.
**OOA Items:** 4.1, 4.3
**Max files per commit:** 2
**Depends on:** Phase 0.5a (corridor persistence test must exist first)
**Also depends on:** `docs/analysis/TEST_RUNNER_IMPROVEMENTS.md` — all 5 items complete before Phase 1 begins

### 1a — Floor Save/Restore Ordering (OOA 4.1)
`NavigationOrchestrator.enterLocation()` unconditionally resets `isCorridorActive = false`
whenever a Floor is entered. During restore, `SyncManager` correctly applies mutation state
(`isCorridorActive = true`) — but the subsequent navigation call to `enterLocation()` overwrites
it back to `false`. The save/restore of corridor state is silently broken.

> **Plan correction (2026-03-17):** Original description named `Floor.enter()` as the fix site,
> but `Floor.enter()` has no such reset. The actual reset is at `NavigationOrchestrator.groovy:30`.
> `CorridorPersistenceTest` remains correct — it catches the bug regardless of which file contains it.

- [x] In `NavigationOrchestrator.enterLocation()`: remove the `((Floor)loc).isCorridorActive = false` reset
- [x] Rationale: `isCorridorActive` defaults to `false` on the field declaration — a fresh Floor
  naturally starts in Elevator mode without an explicit reset. The reset only prevents saved
  corridor state from being honoured on re-entry, which is the bug.
- [x] Verify `CorridorPersistenceTest`, `TracePersistenceTest`, and `MnemonicReversalTest` pass

**Files:** `NavigationOrchestrator.groovy` (1 file)
**Status:** `[x] COMPLETE — 2026-03-17` | commit: e8fc3bd

### 1b — Player.visitedPaths in GameMemento (OOA 4.3)
`visitedPaths` (path-string-based visited tracking) is absent from `GameMemento`.
Analysis confirmed: nothing outside `SyncManager` reads `visitedPaths` — only `visitedLIPs`
drives rendering and game logic (`Building.groovy`, `Corridor.groovy`, `SessionRecap.groovy`).
`visitedPaths` is saved/restored via `SyncManager` (file persistence) but is not load-bearing.

- [x] Confirmed: no UI element or game logic reads `visitedPaths` — `visitedLIPs` is the active collection
- [x] Add a comment in `Player.groovy` documenting the intentional omission from `GameMemento`

> **Plan correction (2026-03-17):** Original description stated `visitedLIPs` is present in
> `GameMemento` — it is not. Neither field is in `GameMemento`. `GameMemento` holds only
> `masterLocus`, `currentLIP`, `playerCoherence`, `inventory`, and `inputHistory`.
> `PersistenceService` is not involved — `SyncManager` handles both fields via session trace.

**Files:** `Player.groovy` (1 file, comment only)
**Status:** `[x] COMPLETE — 2026-03-17` | commit: 0798dd2

**Phase 1 Gates:** `./vinc.sh --test` ✅ `STATUS=PASS DISCOVERED=89 SUCCEEDED=84 FAILED=0 SKIPPED=5`
**Retrospective:** `docs/retro/RETRO_PHASE_1.md`

---

## Phase 2 — Resource Loading
**Goal:** Make asset loading work from a packaged JAR, not just from source directory layout.
**OOA Items:** 1.4, 1.3
**Max files per commit:** 5 (1 groovy + N resource files)
**Depends on:** Phase 0

### 2a — ThemeService Classpath Loading (OOA 1.4)
`ThemeService.loadThemes()` uses `new File("src/main/resources/...")` — breaks in a JAR.

- [x] Replace filesystem loading with `getClass().getResourceAsStream(...)`
- [x] Add `index.txt` per resource directory to enable classpath-safe enumeration (jar: URIs can't list directory contents)
- [x] Convert `NameGenerator.loadLexiconFile()` to classpath simultaneously — consistency mandate
- [x] Add `src/main/resources` to vinc.sh classpath for dev/test
- [x] Verify all theme categories load correctly

**Files:** `ThemeService.groovy`, `NameGenerator.groovy`, `vinc.sh` + 5 index files
**Status:** `[x] COMPLETE — 2026-03-18` | commit: dbe6e20

### 2b — NameGenerator Lexicon Externalization (OOA 1.3)
Building/room name lexicons are hard-coded maps in `NameGenerator.groovy`.

- [x] Create `src/main/resources/names/buildings/` text files per culture (rust, neon, baroque, monolith, void, organic)
- [x] Load via filesystem (same pattern as ThemeService; both convert to classpath in 2a)
- [x] Remove hard-coded maps from `NameGenerator.groovy`
- [x] Verify `DeterministicUniverseTest` still passes (same seed → same names)

**Files:** `NameGenerator.groovy` + 12 resource files
**Status:** `[x] COMPLETE — 2026-03-18` | commit: db138ab

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

**Phase 3 Gates:** `./vinc.sh --test` ✅ `STATUS=PASS DISCOVERED=108 SUCCEEDED=103 FAILED=0 SKIPPED=5`
**Retrospective:** `docs/retro/RETRO_PHASE_3.md`

---

## Phase 3c — Gematria Return Type Completion
**Goal:** Complete the SpectralFrequency story by changing `Gematria.calculateFrequency()` return
type from `int` to `SpectralFrequency`. Currently the primary *producer* of frequencies bypasses
the type it creates. Deferred from Phase 3 to keep blast radius bounded; executed immediately after
as a standalone bounded commit.
**Depends on:** Phase 3b-ii (SpectralFrequency and InventoryItem migration complete)
**Max files per commit:** 3

### Tasks
- [ ] Change `Gematria.calculateFrequency()` return type to `SpectralFrequency`
- [ ] `Room.groovy` call sites: unwrap with `.value` when passing to `InventoryItem` constructor
- [ ] `ScanCommand.groovy` call site: unwrap with `.value` where int is required for display
- [ ] Verify `SpectralFrequencyContractTest` (B3/B4 Gematria tests), `GematriaTest`, `DeterministicUniverseTest` all pass

**Files:** `Gematria.groovy`, `Room.groovy`, `ScanCommand.groovy`
**Status:** `[x] COMPLETE — 2026-03-18`

**Phase 3c Gates:** `./vinc.sh --test` ✅ `STATUS=PASS DISCOVERED=108 SUCCEEDED=103 FAILED=0 SKIPPED=5`

---

## Phase 4 — Structural Extraction
**Goal:** Pull logic out of over-loaded classes. Callers remain unchanged.
**OOA Items:** 1.1, 2.4
**Max files per commit:** 3
**Depends on:** Phase 3; Phase 0.5c (ancestor chain test must exist before 4a)

### 4a — LeafLocation Abstract Base (OOA 1.1)
`Room` re-implements ~40 lines already in `Container`: parent tracking, `findAncestor()`,
`visited` flag, `locus` field, LIP construction.

- [x] Define `AbstractLeafLocation` (or `LeafLocation`) abstract class implementing the shared `Location` contract
- [x] `Room` extends `AbstractLeafLocation`, removing duplicated fields and methods
- [x] Verify `Room` behavior is identical

**Files:** `AbstractLeafLocation.groovy` (new), `Room.groovy`
**Status:** `[x] COMPLETE — 2026-03-18`

### 4b — SynthesisService Extraction (OOA 2.4)
`Player.mergeItems()` and resonance detection are behavioral policies that don't belong
on the player data aggregate.

- [x] Create `SynthesisService` containing merge logic, keystone creation, and resonance detection
- [x] `Player.mergeItems()` delegates to `SynthesisService`
- [x] `QuantumBufferController` calls updated via `Player` (no direct change needed)

**Files:** `SynthesisService.groovy` (new), `Player.groovy`
**Status:** `[x] COMPLETE — 2026-03-18`

**Phase 4 Gates:** `./vinc.sh --test` ✅ `STATUS=PASS DISCOVERED=118 SUCCEEDED=113 FAILED=0 SKIPPED=5`
**Retrospective:** `docs/retro/RETRO_PHASE_4.md`

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
- [x] `RenderingCoordinator` owns and instantiates `BridgeView`
- [x] Remove `bridgeView` field from `GameState`
- [x] Update all `state.bridgeView.*` call sites

> **Execution note (2026-09-11):** Six production files exceeded the 4-file cap, so 6a ran as
> two commits. 6a-i routed `QuitCommand`, `QuitNowCommand`, `CaptureCommand` through the existing
> `Game.getBridgeView()` facade. 6a-ii moved ownership into `RenderingCoordinator` and pointed
> the facade at `renderer.bridgeView`. Test blast radius was zero — every test reaches the view
> via the facade or constructs its own `BridgeView`.

**Files:** `RenderingCoordinator.groovy`, `GameState.groovy`, `Game.groovy`, `QuitCommand.groovy`, `QuitNowCommand.groovy`, `CaptureCommand.groovy`
**Test blast radius:** none
**Status:** `[x] COMPLETE — 2026-09-11` | commits: 7ad4aaa (6a-i), 7ece60a (6a-ii) | scan: identical to baseline

### 6b — Move ActionMapper + InputHandler to TurnProcessor
- [x] `TurnProcessor` owns `ActionMapper` and `InputHandler`
- [x] Remove both fields from `GameState`
- [x] Update all `state.mapper.*` and `state.inputHandler.*` call sites

> **Execution note (2026-09-11):** Ran as four commits. **6b-0** added `MementoInputHistoryTest`
> after `/grill` found no test asserted history survives `Game.restore()` (Coverage Claim Protocol).
> **6b-i** routed `NavigationCommand`, `QuitCommand`, `QuitNowCommand`, `CaptureCommand` and two
> tests through the `Game` facade. **6b-ii** injected `InputHandler` into `RenderingCoordinator`
> and `PersistenceService`; `restore()` now restores history in place instead of replacing the
> instance. **6b-iii** moved `ActionMapper` into `TurnProcessor` and trimmed `GameState`
> (constructor no longer takes an `InputSource`).
>
> **Declared deviation:** `InputHandler` is constructed in `Game` and injected into three
> services, not owned solely by `TurnProcessor` — two of those services are built before it.
> `TurnProcessor` holds the reference the facade exposes.

**Files:** `TurnProcessor.groovy`, `Game.groovy`, `GameState.groovy`, `RenderingCoordinator.groovy`, `PersistenceService.groovy`, `NavigationCommand.groovy`, `QuitCommand.groovy`, `QuitNowCommand.groovy`, `CaptureCommand.groovy`
**Test blast radius:** `MementoInputHistoryTest` (new), `NavigationSyncTest`, `ActionMapperDepthTest`, `AutoEntryTest`, `CoherenceDrainTest`
**Status:** `[x] COMPLETE — 2026-09-11` | commits: 01da048 (6b-0), 73a5714 (6b-i), 2fa64d6 (6b-ii), d338d62 (6b-iii) | suite 119/114/5/0 | scan: identical to baseline

### 6c — Move NavigationEngine to NavigationOrchestrator
- [x] `NavigationOrchestrator` owns `NavigationEngine`
- [x] Remove `navEngine` from `GameState`
- [x] Update all `state.navEngine.*` call sites
- [x] Resolves OOA 4.2 (NavigationEngine placement) as a side effect

> **Execution note (2026-09-11):** Three commits. **6c-0** added `NavigationEngineWiringTest` after
> `/grill` found the engine's behaviors UNGUARDED — `MnemonicReversalTest` tests model option keys,
> not the engine. **6c-i** routed `NavigationCommand` through the facade. **6c-ii** gave
> `NavigationOrchestrator` the engine as a final field (constructor unchanged, so `AutoEntryTest`
> untouched); `TurnProcessor` and `Game` read it through the orchestrator. Zero test edits.

**Files:** `NavigationOrchestrator.groovy`, `TurnProcessor.groovy`, `Game.groovy`, `GameState.groovy`, `NavigationCommand.groovy`
**Test blast radius:** `NavigationEngineWiringTest` (new) only
**Status:** `[x] COMPLETE — 2026-09-11` | commits: b07f8c5 (6c-0), 40d95f2 (6c-i), ef29b84 (6c-ii) | suite 121/116/5/0 | scan: identical to baseline

**Phase 6 Gates:** `./vinc.sh --test` ✅ `STATUS=PASS DISCOVERED=121 SUCCEEDED=116 FAILED=0 SKIPPED=5` + `./vinc.sh --scan` ✅ identical to pre-phase baseline (seed 0 → 9-node match)
**Retrospective:** `docs/retro/RETRO_PHASE_6.md`

---

## Phase 7 — BridgeView Decomposition
**Goal:** `BridgeView` becomes a compositor. Each rendering concern is an independently testable `ViewComponent`.
**OOA Items:** 2.1
**Max files per commit:** 3
**Depends on:** Phase 6; Phase 0.5f (BridgeView structural baseline tests must exist first)

> **Gate correction (2026-09-11, Phase 7 pre-grill — WF-003):** `./vinc.sh --scan` runs `SeedScanner`
> only; it never constructs `BridgeView`, so it cannot detect a HUD regression. The visual gate for this
> phase is `BridgeViewGoldenFrameTest` (Phase 7-0): 23 golden frames at seed 12345 covering every
> `BridgeView` public method, compared line-by-line with the time-seeded spectrogram bars masked
> (`generateSystemTelemetry`, `BridgeView.groovy:354`, is the only non-determinism on the golden path).
> **Mandatory:** golden-frame test green after every commit. `--scan` is retained as the model gate.
>
> **Test blast radius (whole phase):** `NavArrayTest` (calls private `getCompassLabel`, moves in 7c),
> `InitialScreenTest` + `NewGameTest` (call `renderBridgeHUD`/`renderAdaptiveBridge` directly — keep
> thin delegators on `BridgeView` until 7g), `CaptureVerificationTest` + `BridgeViewStructureTest` +
> `HeadlessRunner` (`render`/`capture` — unchanged), `SessionRecap` in `src/main` (`printLatticeTrace`, 7d).
>
> **Plan gap resolved (2026-09-11):** `renderMenu` + `renderGlobalControls` → `DirectiveMenuComponent`
> (7e-ii); the left pane of `renderAdaptiveBridge` → `NarrativePaneComponent` (7f-ii). The split
> composition itself (zipping left/right lines through `splitBoxedLine`) stays in `BridgeView`.

### 7-0 — Golden-frame pinning test (Coverage Claim Protocol step 0)
Audit of every assertion touching `BridgeView` output: `BridgeViewStructureTest` (boxed + 7 marker
strings), `VisualBaselinePinningTest` (2 markers), `NavArrayTest` (4 compass labels), `isBoxedCorrectly`
(≥ 5 lines start/end with `║`). Everything else — header rows, sparkline/path truncation, radar, ticker,
buffer preview, compass geometry, menu filtering, global controls, inventory overlay, lattice trace,
lattice/universe/filament maps, coherence bar colours — is **UNGUARDED**.

- [x] `HudFrameHarness` (test utility): `captureAll(seed)` renders each `BridgeView` method into the
  virtual buffer per frame; `mask()` collapses cyan `█` runs
- [x] `BridgeViewGoldenFrameTest` (`@TestFactory`, one test per frame) compares against committed
  `src/test/groovy/com/endlesstransit/ui/golden/*.txt`; test never writes to `src/`
- [x] Golden files generated once by a scratchpad script calling the same `captureAll`, then committed
- [x] **7-0b** `GoldenFrameGenerator` + `./vinc.sh --goldens` (sole writer of `golden/*.txt`, stores bars pre-masked);
  frames 18 → 23: Floor/Corridor/Apartment full renders + two ticker-mapping frames — commit adcd8fd

**Files:** `HudFrameHarness.groovy` (new, test), `BridgeViewGoldenFrameTest.groovy` (new, test), `golden/*.txt`
**Status:** `[x] COMPLETE — 2026-09-11` | commit: c43797f | suite 139/134/5/0 (now 23 golden frames, 463 lines; negative check: one corrupted glyph fails exactly that frame)


### 7a — Define ViewComponent interface
- [x] **7a-i** `ViewComponent` interface: `List<String> render(RenderContext context, int width)` +
  `RenderContext` (final `location`, `player`, `options`, `masterLocus`)
- [x] **7a-ii** `Terminal` gains `static String` line builders (`boxTop`, `boxedLine`, `splitBoxedLine`,
  `boxSeparator`, `boxBottom`) returning exactly the fragments `draw*` print today, CHA sequences
  included; each `draw*` becomes `println(builder(...))`. Signatures unchanged; only caller is `BridgeView`.

> **Declared deviations (2026-09-11):** (a) the plan's `render(int width)` gives a component no way to
> reach the location/player/options/locus — a `RenderContext` parameter is the smallest addition.
> (b) 7a-ii is not in the original plan; without string builders the `List<String>` contract cannot be
> honoured, since the only box builders print. Byte-equivalence: `MemorySink.print` appends fragments
> and `println` flushes the line; `ConsoleSink` writes fragments straight to `System.out`; no fragment
> contains `\n` — so `print a; print b; println c` ≡ `println(a+b+c)` in every sink. The one edge is
> flush granularity on a real console (per fragment → per line), invisible in captured output.

**Files:** `ViewComponent.groovy` (new), `RenderContext.groovy` (new) — 7a-i; `Terminal.groovy` — 7a-ii
**Status:** `[x] COMPLETE — 2026-09-11` | commits: 461efc9 (7a-i), 1d3d570 (7a-ii) | suite 139/134/5/0 | 170-frame harness: 0 masked diffs | scan: seed 0 → 9 nodes

### 7b — Extract HUDHeaderComponent
- [x] Traversal, path, ticker, buffer preview (+ `getLatticeSparkline`, `renderCoherenceBar` moved with it)
- [x] `renderBridgeHUD` retained as a delegator until 7g (callers: `render()`, `NewGameTest`, `InitialScreenTest`)

**Files:** `HUDHeaderComponent.groovy` (new), `BridgeView.groovy`
**Test blast radius:** none
**Status:** `[x] COMPLETE — 2026-09-11` | commit: 4f34342 | suite 144/139/5/0 | goldens green | 170-frame harness: 0 masked diffs | BridgeView 579 → 457 lines

### 7c — Extract CompassComponent
- [x] **7c-0** two synthetic-option compass goldens (D active + reciprocal X, colon-form label, 12-char truncation, B on the left) — commit 2432ac7
- [x] `renderCompass` + `getCompassLabel` moved verbatim; two dead locals (`last`, `history` → referenced `lastHudFrame`) dropped; `renderCompass` delegator kept until 7g

**Files:** `CompassComponent.groovy` (new), `BridgeView.groovy`
**Test blast radius:** `NavArrayTest` (4 lines → `new CompassComponent().getCompassLabel`)
**Status:** `[x] COMPLETE — 2026-09-11` | commit: 9c01da7 | suite 146/141/5/0 | goldens green (25) | 170-frame harness: 0 masked diffs | BridgeView 457 → 398 lines

### 7d — Extract LatticeComponents
- [x] **7d-0** three goldens: 13-level trace at Room, map SCAN_ERROR at Room (leaf), Building map with visited Floor — commit 5da008a
- [x] **7d-i** `LatticeTraceComponent` (`render` = `ll` screen; `renderTrace(ctx, title, glitch)` for SessionRecap) — commit e6f8cab
- [x] **7d-ii** `LatticeMapComponent` — commit 2393299
- [x] Delegators kept: `renderLatticeTrace`, `printLatticeTrace` (SessionRecap ×3), `renderLatticeMap`

> **Declared (2026-09-11):** five list elements across the two components keep a leading `\n` exactly as
> the original `println` strings had it; the sinks split on newline so output is identical. Normalise at 7g
> (split into separate elements) under the golden test. `renderTrace(ctx, title, glitch)` sits beside the
> `ViewComponent` contract because title and glitch are not frame inputs.

**Files:** `LatticeTraceComponent.groovy` (new), `LatticeMapComponent.groovy` (new), `BridgeView.groovy`
**Test blast radius:** none
**Status:** `[x] COMPLETE — 2026-09-11` | suite 149/144/5/0 | goldens green (28) | 170-frame harness: 0 masked diffs | BridgeView 398 → 308 lines

### 7e — Extract TelemetryComponent
- [x] Spectrogram, decode logs ("session logs"), right-pane routing, universe/filament/local maps, abyssal static — six generators moved verbatim
- [x] `ViewComponent` javadoc: `width` = width allotted by the compositor (pane width for a pane)

**Files:** `TelemetryComponent.groovy` (new), `BridgeView.groovy`, `ViewComponent.groovy` (javadoc)
**Test blast radius:** none
**Status:** `[x] COMPLETE — 2026-09-11` | commit: 3633b44 | suite 149/144/5/0 | goldens green (28) | 170-frame harness: 0 masked diffs | BridgeView 308 → 186 lines

### 7e-ii — Extract DirectiveMenuComponent
- [x] **7e-ii-0** synthetic-option menu golden: the eight skip-list forms only produced above Street, a no-dot key, a plain directive, a three-entry nav line
- [x] `renderMenu` (label skip-list, `udfblts` collapsing, `EXECUTE_DIRECTIVE:` block) + `renderGlobalControls` moved verbatim
- [x] The compass stays in `CompassComponent` (7c); the `renderMenu` delegator calls it first

**Files:** `DirectiveMenuComponent.groovy` (new), `BridgeView.groovy`
**Test blast radius:** none
**Status:** `[x] COMPLETE — 2026-09-11` | commit: 9fbdea5 | suite 150/145/5/0 | goldens green (29) | 170-frame harness: 0 masked diffs | BridgeView 186 → 151 lines

### 7f — Extract InventoryOverlayComponent
- [x] `renderInventoryOverlay` moved verbatim; per-item `print ×3 + println` → one element (same bytes); `flush()` stays in the delegator
- [x] **Declared:** no production caller (the `i` command renders `QuantumBufferController`'s own screen) — HK-004

**Files:** `InventoryOverlayComponent.groovy` (new), `BridgeView.groovy`
**Test blast radius:** none
**Status:** `[x] COMPLETE — 2026-09-11` | commit: 655931b | suite 150/145/5/0

### 7f-ii — Extract NarrativePaneComponent
- [x] Left pane of `renderAdaptiveBridge`: description wrap (with `glitchText` below 40 coherence) + `getExtraContent` — moved verbatim
- [x] `renderAdaptiveBridge` remains in `BridgeView` as the split compositor (geometry, two pane renders, zip, bottom border)

**Files:** `NarrativePaneComponent.groovy` (new), `BridgeView.groovy`
**Test blast radius:** none
**Status:** `[x] COMPLETE — 2026-09-11` | commit: 7dcf94e | suite 150/145/5/0 | goldens green (29) | 170-frame harness: 0 masked diffs | BridgeView 151 → 121 lines

### 7g — BridgeView as pure compositor
- [x] **7g-i** `FrameGeometry` (130 / 90 / pane widths) replaces eight literal sites; `BridgeView.emit()`; compositor-only body — commit 9c05dc9
- [x] **7g-ii** lattice components: the four leading-`\n` elements split byte-for-byte (golden 27 pins the `RED`-before-newline order) — commit 6f206d5
- [x] **7g-iii** `ViewComponentGoldenTest`: 17 single-component frames rendered standalone match their goldens and contain no embedded newline — commit b9d3f6d
- [x] `BridgeView` only assembles components into the final frame (adaptive split zip is the one layout step)

> **Declared (2026-09-11):** the eight one-line `render*`/`print*` delegators stay as `BridgeView`'s public API
> (`RenderingCoordinator`, `SessionRecap`, three tests, the harness). They hold no rendering logic; removing them
> would touch six files for no behavioral gain.

**Files:** `FrameGeometry.groovy` (new), `BridgeView.groovy`, `HUDHeaderComponent.groovy`, `LatticeTraceComponent.groovy`, `LatticeMapComponent.groovy`; test tree: `HudFrameHarness`, `ViewComponentGoldenTest` (new), `BridgeViewGoldenFrameTest`, `GoldenFrameGenerator`
**Test blast radius:** harness signature (`captureAll()` → `Frames`) — 2 one-line edits
**Status:** `[x] COMPLETE — 2026-09-11` | suite 167/162/5/0 | goldens: 29 via BridgeView + 17 standalone | BridgeView 579 → 120 lines

**Phase 7 Gates:** `./vinc.sh --test` ✅ `STATUS=PASS DISCOVERED=167 SUCCEEDED=162 FAILED=0 SKIPPED=5` (29 goldens via `BridgeView` + 17 standalone, all pixel-identical to the pre-phase capture) + `./vinc.sh --scan` ✅ seed 0 → 9 nodes
**Retrospective:** `docs/retro/RETRO_PHASE_7.md`

---

## Phase 8 — Floor State Pattern
**Goal:** Replace `isCorridorActive` boolean with explicit `ElevatorState`/`CorridorState` objects.
Conditional branching in `Floor.getOptions()` eliminated.
**OOA Items:** 2.2 (roadmap) / §4.11 (report)
**Max files per commit:** 4
**Depends on:** Phase 1a (ordering bug fixed)

> **Execution note (2026-09-11):** Coverage audit found five UNGUARDED behaviors (corridor-mode menu order and
> content delegation, back-to-elevator restore, the bedrock floor, mutation-state round trip, scan routing by mode).
> **8-0** `FloorStateContractTest` pins all five, driving every transition through the option closures so it never
> references the flag or its successor. **8a** moved the three private bodies by script (reverse-substitution check)
> into stateless singletons; `Floor.enterCorridor()` / `returnToElevator()` are the only transitions. A temporary
> `getIsCorridorActive()` delegator kept `ScanCommand` and three test reads compiling within the 4-file cap; **8b**
> removed it. **8b-ii** (user review: "are you using instanceof?") replaced `ScanCommand`'s check on the concrete state
> class with the polymorphic `FloorState.getScanTarget(Floor)`, replaced the deserialization ternary with an id → state
> registry, and switched test assertions to `assertSame(<State>.INSTANCE, floor.currentState)`.
>
> **Declared deviations:** `FloorState` methods take the `Floor` as first argument (states are stateless singletons,
> not per-floor objects). Mutation state serializes `"state": "ELEVATOR" | "CORRIDOR"` with **no legacy reader** for
> the old boolean key (user decision — pre-Phase-8 traces restore in elevator mode). `ScanCommand.groovy` and two
> more tests (`CorridorPersistenceTest`, `ActionMapperDepthTest`) were in the blast radius but not in the original
> Files line.
>
> **Groovy STC finding:** an `instanceof` on a *field* inside its declaring `@CompileStatic` class narrows the field's
> inferred type for methods compiled after it (surfaced as a `ClassCastException` in `getOptions`). Compare identity
> or ask the state polymorphically; never `instanceof` a field in its own class. Lesson in `tasks/lessons/model.md`.

### Tasks
- [x] **8-0** `FloorStateContractTest` (5 pins) — commit 18d9213
- [x] Define `FloorState` interface: `getId()`, `getOptions(Floor, Game)`, `getExtraContent(Floor, Player, int)`, `getScanTarget(Floor)`
- [x] Implement `ElevatorState` and `CorridorState` (stateless singletons, bodies moved verbatim) — commit b345b4b
- [x] Replace `isCorridorActive` in `Floor` with `FloorState currentState` + `enterCorridor()` / `returnToElevator()`
- [x] `Floor.getMutationState()` / `applyMutationState()` serialize the state id via an id → state registry
- [x] **8b** `ScanCommand` + test reads off the flag; delegator removed — commit 6d537c2
- [x] **8b-ii** polymorphic scan target; no `instanceof` on a state class anywhere in `src/` — commits 219bb73, 867e87d
- [x] `VisitedProgressTest`, `CorridorPersistenceTest`, `ActionMapperDepthTest` migrated to the `FloorState` API

**Files:** `FloorState.groovy` (new), `ElevatorState.groovy` (new), `CorridorState.groovy` (new), `Floor.groovy`, `ScanCommand.groovy`
**Test blast radius:** `FloorStateContractTest` (new), `VisitedProgressTest`, `CorridorPersistenceTest`, `ActionMapperDepthTest`, `LocationRenderingTest` (comment)
**Status:** `[x] COMPLETE — 2026-09-11` | commits: 18d9213 (8-0), b345b4b (8a), 6d537c2 (8b), 219bb73 (8b-ii-a), 867e87d (8b-ii-b)

**Phase 8 Gates:** `./vinc.sh --test` ✅ `STATUS=PASS DISCOVERED=184 SUCCEEDED=179 FAILED=0 SKIPPED=5` (36 goldens byte-identical after every commit) + `./vinc.sh --scan` ✅ seed 0 → 9 nodes + `DeterministicUniverseTest` ✅
**Retrospective:** `docs/retro/RETRO_PHASE_8.md`

---

## Phase 9 — ProceduralFactory Split
**Goal:** `ProceduralFactory` becomes a registry facade. One focused factory per location type.
**OOA Items:** 3.2
**Max files per commit:** 3 (1 new factory + ProceduralFactory update + optional type update)
**Depends on:** Phase 3 (value objects stable)

> One location type per commit. Run `DeterministicUniverseTest` after each.

> **Execution note (2026-09-11):** Coverage audit found nine factory behaviors with no assertion anywhere
> in `src/test` (building scale ranges, planet colour map, country trait + vibe mutation, apartment vibe
> match + object-pool drain, door inscriptions, room attributes/atmosphere/furniture/objects, the NullSector
> roll, `countSubLocations`). **9-0** `ProcgenDeepSnapshotTest` pins all of them for seed 0x1234, one method
> per factory-to-be, literals captured from `master` before any production change. Every body was then
> lifted by script (`scratchpad/move_factory.py`: exact text, four listed substitutions, reverse
> substitution asserted equal to the original before writing) — zero drift across 14 factories. Full suite
> (goldens included) green after every commit; no golden moved.
>
> **Why verbatim moves are entropy-safe:** `LocusSeed` is `@Immutable` and every draw is a pure function of
> `value` + a fixed branch key; only the `java.util.Random` from `nextRandom()` is stateful, and both uses
> (room furniture, apartment object pool) moved inside their own method. The procgen lesson on "call order"
> was corrected accordingly.
>
> **Declared deviations:** (1) no generic `create(Container, LocusSeed)` on the interface — five of fourteen
> `create*` signatures carry culture/timeline/count arguments; each factory has a typed `create(...)` and
> the facade delegates. (2) `RoomFactory` does not implement `LocationFactory` (Room is a leaf; a no-op
> `populate` would lie). (3) Factories hold a back-reference to the facade (`registry`) and read `fmt`,
> `themeService` and sibling factories at call time, because `Game` injects `fmt` after the singleton is
> built and every `populate` creates children of another type. (4) `ThemeService` stays one instance on the
> facade — the domain doc's `ThemeService.instance` never existed and was corrected. (5) The facade's
> `populateApartment` still returns the apartment; the factory `populate` is void.
>
> **No caller changed:** every pre-split `create*`/`populate*`/`countSubLocations` signature survives as a
> one-line delegator, so the 13 model classes, 4 core/procgen callers and 8 direct test callers were untouched.
> `populate(Container)` and `factoryFor(Class)` are new; migrating `Container.populateChildren` to the
> dispatcher is HK-005.

- [x] **9-0** `ProcgenDeepSnapshotTest` (9 pins) — commit dc3e9f5
- [x] **9a** `LocationFactory<T extends Container>`: `getType()`, `populate(T)` — commit 0f443af
- [x] **9b** `RoomFactory` (create only) — e734a08
- [x] **9c** `ApartmentFactory` — 615ea38
- [x] **9d** `CorridorFactory` (+ private `generateContextualInscription`) — 6918399
- [x] **9e** `FloorFactory` (+ `countSubLocations`) — a9690e2
- [x] **9f** `BuildingFactory` — 62a211b
- [x] **9g** `StreetFactory` — 0746fef
- [x] **9h** `CityFactory` — f9b03c5
- [x] **9i** `CountryFactory` — 806f581
- [x] **9j** `PlanetFactory` — 03acb68
- [x] **9k** `SolarSystemFactory` — d1688cc
- [x] **9l** `SectorFactory` / `NullSectorFactory` — 3faae83
- [x] **9m** `FilamentFactory` — 1908d47
- [x] **9n** `UniverseFactory` — 593a310
- [x] **9o** `ProceduralFactory` reduced to registry facade (`factoryFor`, `populate(Container)`; 435 → 198 lines) + `ProceduralFactoryRegistryTest` — 4d58ef5

**Files:** `ProceduralFactory.groovy` + 15 new files in `procgen/` (`LocationFactory`, 14 factories)
**Test blast radius:** `ProcgenDeepSnapshotTest` (new), `ProceduralFactoryRegistryTest` (new); zero edits to existing tests
**Status:** `[x] COMPLETE — 2026-09-11` | 16 commits on `refactor/phase-9-factory-split`

**Phase 9 Gates:** `./vinc.sh --test` ✅ `STATUS=PASS DISCOVERED=197 SUCCEEDED=192 FAILED=0 SKIPPED=5` (36 goldens byte-identical after every commit) + `./vinc.sh --scan` ✅ seed 0 → 9 nodes + `DeterministicUniverseTest` ✅ + `grep -rn "instanceof .*Factory" src/` → 0
**Retrospective:** `docs/retro/RETRO_PHASE_9.md`

---

## Phase 10 — Domain Event System
**Goal:** Decouple cross-cutting concerns (journaling, ritual tracking) from the model via domain events.
Eliminates the `model → core` dependency violation (`Building` calling `JournalManager`).
**OOA Items:** 3.1
**Max files per commit:** 4
**Depends on:** Phase 4b; Phase 0.5g (EventBus unit tests must exist first)

> **Execution note (2026-09-16):** The pre-plan read found three premises wrong. (1) `Building` never called the
> journal — it only imported it; the real call sites were `Room` ×3, `NullSector` ×1 (`logCapture`) and `Player` ×1
> (`logSynthesis`). (2) `logDiscovery` has had **no production caller since `7930dc3` (2026-03-05)**, when path tracking
> moved into `Player.markFootprint` and the call was dropped; restoring it is a behavior change (journal file, live HUD
> ticker, `Network Expansion` count) and is logged as **HK-010**, not done here. (3) The journal owned a game rule: its
> `logCapture`/`logSynthesis` advanced the Abyssal ritual (`Building.notifySampled`, `infusionCount++`).
>
> Coverage audit found seven UNGUARDED behaviors (journal + ritual effects of every capture/synthesis path; `EventBusTest`
> was `@Disabled`). **10-0** `JournalEventContractTest` pins the four paths on the public surface, all driven through
> `game.player`. `/grill` returned AMEND on checks 2 and 3 (two undeclared edges, below), then CLEARED.
>
> **Declared deviations:** two event types, not four (`LocationEntered` → HK-010; `RitualCompleted` has no producer or
> consumer). `JournalManager` stays static internally and becomes a listener through `attach(EventBus)` (de-static-ing →
> **HK-011**); this keeps `HudFrameHarness` and ticker goldens 20/21 untouched. New domain method `Player.capture(item,
> where)` replaces the four `inventory.add + logCapture` pairs; `Player` is the sole publisher. The bus lives in
> `GameState` (final, never replaced) and reaches `Player` by constructor, because `Player` is replaced on restore
> (`PersistenceService.restore`, `SyncManager.restore`). A `new Player()` outside `GameState` gets an inert bus: it no longer
> journals or advances the ritual (E1 — six test sites, none asserting either). `Game.setPlayer` is a test-only injection
> point (E2). Journal attaches before the tracker (E3, today's write-then-ritual order). `NullSector` now passes itself as
> the capture location; no `Building` sits above it, so the tracker no-ops as before (E4). The ritual tracker is a
> listener because the plan names ritual tracking a cross-cutting concern; its bodies moved verbatim.

### Tasks
- [x] **10-0** `JournalEventContractTest` (4 pins, passes on master) — commit 329d880
- [x] **10a** `EventBus` implemented (exact-class dispatch, subscription order); `EventBusTest` enabled (skips 5 → 0) — 497c053
- [x] **10b** `ItemCaptured`, `SynthesisPerformed` (`DomainEvent` base unchanged, `lip`/`itemName` derived) — 7185807
- [x] **10c-i** `GameState.events`; `Player(EventBus = new EventBus())`; restore paths pass the state bus — ee6a7df
- [x] **10c-ii** `Player.capture()` + `mergeItems` publishes; `JournalManager.attach`; `RitualTracker`; wired in `Game` — e4fb3fb
- [x] **10d** `Room` ×3 / `NullSector` ×1 → `player.capture(item, this)`; ritual blocks and `Location` params removed from the journal — 25c5ada
- [x] **10e-i..iv** dead `JournalManager` import dropped from 13 model classes (4 commits, cap honoured) — e1c9720, eb46c28, e3d0333, 7d7c788
- [x] `grep -rn "JournalManager" src/main/groovy/com/endlesstransit/model` → 0; `grep -rn "instanceof <event>" src/` → 0

**Files:** `EventBus.groovy`, `ItemCaptured.groovy` (new), `SynthesisPerformed.groovy` (new), `RitualTracker.groovy` (new), `GameState.groovy`, `Player.groovy`, `PersistenceService.groovy`, `SyncManager.groovy`, `Game.groovy`, `JournalManager.groovy`, `Room.groovy`, `NullSector.groovy`, 13 import-only model files
**Test blast radius:** `JournalEventContractTest` (new), `EventBusTest` (un-disabled); zero edits to existing tests
**Status:** `[x] COMPLETE — 2026-09-16` | 10 commits on `refactor/phase-10-domain-events`

**Phase 10 Gates:** `./vinc.sh --test` ✅ `STATUS=PASS DISCOVERED=203 SUCCEEDED=203 FAILED=0 SKIPPED=0` (36 goldens byte-identical after every commit) + `./vinc.sh --scan` ✅ seed 0 → 9 nodes before and after + `DeterministicUniverseTest` ✅
**Retrospective:** `docs/retro/RETRO_PHASE_10.md`

> **HK-010 closed (2026-09-16, behavior change by user decision):** the third event, `LocationDiscovered`, is published by
> `Player.markFootprint` once per new macro path and journaled by `logDiscovery`. Goldens 13–18 regenerated (first ticker
> line). Record: `tasks/completed/HK_010_PLAN.md`. Suite 207/207/0/0.

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
- Goldens unchanged (`./vinc.sh --test`) and `./vinc.sh --scan` seed 0 → 9 **before and after** any phase touching `model` or `ui`; regenerate goldens only for an intended visual change
- Each phase runs on its own git branch (`refactor/phase-N-name`); merge to `master` only when all gates pass
- If anything goes sideways: **STOP, revert, re-plan** — do not push through
- After any user correction: update `tasks/lessons/<domain>.md`
- Run `/chronicle` after every completed phase
- Write phase retrospective in `docs/retro/RETRO_PHASE_N.md` after every phase (chronicle first, then retro)
- Log any workflow friction from the retro to `docs/analysis/WORKFLOW_BACKLOG.md`
- Every 3 phases (Phase 1, 4, 7, 10): review backlog before starting next phase
- **Blast radius planning must include test tree**: grep `src/test/` for field/method accesses alongside `src/main/`. List affected test files explicitly in the phase plan under a "Test blast radius" line alongside "Files:".
- **Test execution discipline**: run the full suite (`./vinc.sh --test --agent 2>/dev/null`) whenever the codebase is in a coherent state — for single-file changes that means after every edit; for multi-file migrations use `./vinc.sh --test ClassName --agent 2>/dev/null` as the inner loop while callers are partially updated, then full suite once all files are coherent. Full suite before every commit is the mandatory floor, not the intended ceiling.

---

*Last updated: 2026-09-16 — Phase 10 complete (Domain Event System; 10 commits). All planned phases done; O1/O2 optional. Next cadence review falls at whatever phase follows.*
*No source code changes are authorized by this document.*
*To begin a phase, issue an explicit Directive per the Vinculum Protocol in `.claude/CODEX.md`.*
