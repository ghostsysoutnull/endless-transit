# Test Coverage Gap Analysis
**Created:** 2026-03-17
**Scope:** 44 test files reviewed against the OOA Refactor Plan phases
**Purpose:** Identifies missing tests required before specific refactoring phases begin

---

## Overall Assessment

The suite is strong on **behavioral mechanics** (coherence drain, navigation, persistence,
generation determinism) and weak on **structural contracts** (parent chains, rendering content,
service boundaries). For a structural refactoring with zero behavioral change, that's the wrong
balance — the tests will pass even when the structure is broken.

| Category | Coverage | Notes |
| :--- | :--- | :--- |
| Coherence / survival mechanics | Strong | `CoherenceDrainTest`, `SurvivalPinningTest` |
| Navigation state | Strong | `VisitedProgressTest`, `NavigationSyncTest` |
| Persistence / save-restore | Strong | `TracePersistenceTest`, `GameMementoTest` |
| Procedural determinism | Strong | `DeterministicUniverseTest` |
| Procedural variance | Strong | `ProcgenVariabilityTest`, `RegionalDivergenceTest` |
| Building / ritual mechanics | Strong | `AbyssalRitualTest`, `LandmarkDiscoveryTest` |
| Rendering content | **Weak** | `InitialScreenTest` only checks no-throw |
| Visual structure / TUI layout | **Weak** | Only 2 marker strings in baseline |
| Parent chain / ancestor resolution | **Missing** | No test for `findAncestor()` |
| Door trace / room type mapping | **Missing** | `AnomalousTrace.matches()` untested |
| Corridor mode persistence | **Missing** | No save-mid-corridor test |
| ActionMapper at multiple depths | **Partial** | Only building floors tested |
| Event bus mechanics | **Missing** | No tests (class doesn't exist yet) |

---

## Gap Details

### Gap 1 — Corridor Save/Restore (blocks Phase 1a)

**What's missing:** No test saves the game while `isCorridorActive == true` and verifies
the mode is restored correctly. The Phase 1a bug fix addresses exactly this scenario, but
without a test, an incorrect fix would be invisible.

**Test to write:** `CorridorPersistenceTest`
- Enter a floor, activate corridor mode (`isCorridorActive = true`)
- Call `SyncManager.sync()`
- Create a fresh `Game` instance and call `SyncManager.restore()`
- Assert `currentLocation` is a `Floor` with `isCorridorActive == true`

**Existing tests that partially cover this area:** `TracePersistenceTest`, `VisitedProgressTest`

---

### Gap 2 — AnomalousTrace Room Type Mapping (blocks Phase 3a)

**What's missing:** `AnomalousTrace.matches(String roomType)` is completely untested. The
Phase 3a `RoomCategory` enum refactor changes how this matching works. Without a test, all
door trace associations could silently break.

**Test to write:** `AnomalousTraceTest`
- Assert `AnomalousTrace.OZONE.matches("SERVER")` → true
- Assert `AnomalousTrace.OZONE.matches("LABORATORY")` → true
- Assert `AnomalousTrace.OZONE.matches("STORAGE")` → false (no cross-contamination)
- Assert `AnomalousTrace.FROST.matches("VAULT")` → true
- Assert `AnomalousTrace.FROST.matches("CRYO")` → true
- Assert `AnomalousTrace.CLICKING.matches("MAINTENANCE")` → true
- Assert `AnomalousTrace.HUMMING.matches("ENGINE")` → true
- Assert `AnomalousTrace.SILENCE.matches("QUARTERS")` → true
- Assert `AnomalousTrace.METALLIC_TEARING.matches("BREACH")` → true
- Cover all 6 trace values with at least one positive and one negative assertion each

**Existing tests that partially cover this area:** None.

---

### Gap 3 — Room Ancestor Chain (blocks Phase 4a)

**What's missing:** `Room.findAncestor()` is called during navigation (e.g., to find parent
`Building` for ritual state, `Floor` for diagnostics). The `LeafLocation` extraction in
Phase 4a moves this logic to a shared base. If parent wiring breaks, navigation silently fails.

**Test to write:** `RoomAncestorTest`
- Navigate to a `Room` via the full `Universe → ... → Corridor → Apartment → Room` chain
- Assert `room.findAncestor(Building.class)` returns a non-null `Building` with the correct LIP prefix
- Assert `room.findAncestor(Floor.class)` returns the correct `Floor`
- Assert `room.findAncestor(Corridor.class)` returns the correct `Corridor`
- Assert `room.findAncestor(Universe.class)` returns the universe root
- Assert `room.findAncestor(Street.class)` returns non-null (verifies full chain integrity)

**Existing tests that partially cover this area:** `FloorCrashTest` (navigation only, no ancestor assertions), `DeepLatticeCrawlTest` (traversal only).

---

### Gap 4 — Per-Location Rendering Content (blocks Phase 5)

**What's missing:** `InitialScreenTest` only asserts that rendering methods don't throw.
`VisualBaselinePinningTest` checks 2 marker strings. If the `OutputFormatter` constructor
injection in Phase 5 is wired incorrectly for any location type, that type renders
blank/broken with no test catching it.

**Tests to write:**

`LocationRenderingTest` — for each of `Building`, `Floor`, `Corridor`, `Room`, `Street`, `Planet`:
- Assert `getDescription()` returns a non-empty string
- Assert `getExtraContent(player, 130)` returns a non-empty list
- Assert at least one key domain label is present (e.g., `Building` description contains culture name, `Room` description contains room type)

`VisualBaselinePinningTest` expansion:
- Currently asserts: `PULSE_TRAVERSAL`, `COHERENCE`
- Should also assert: `LOCUS_TRACE`, `NEURAL_LINK`, `BRIDGE`, `STRATA`, `DIAGNOSTIC`, `LATTICE`
(8 markers minimum for meaningful baseline coverage)

**Existing tests that partially cover this area:** `InitialScreenTest` (no-throw only), `CyberTerminalTest` (depth/coordinates only).

---

### Gap 5 — ActionMapper Multi-Depth Resolution (blocks Phase 6)

**What's missing:** `NavigationSyncTest` validates ActionMapper choice resolution for
building floor navigation only. Phase 6b moves `ActionMapper` to `TurnProcessor`. If a
call site at any other depth level is missed, it silently breaks with no test failing.

**Test to write:** `ActionMapperDepthTest`
- At **street level**: verify ActionMapper resolves building selection (`"01"` → correct `Building`)
- At **corridor level**: verify ActionMapper resolves apartment selection (`"01"` → correct `Apartment`)
- At **room level**: verify ActionMapper resolves object interaction (`"t"` → correct action)
- Verify zero-agnostic matching (`"3"` matches `"03"`) at each level

**Existing tests that partially cover this area:** `NavigationSyncTest` (building floors only), `StreetTest` (choice matching only, not ActionMapper integration).

---

### Gap 6 — BridgeView Structural Layout (blocks Phase 7)

**What's missing:** Phase 7 extracts rendering concerns from `BridgeView` into `ViewComponent`
objects. The existing visual tests cannot catch a component extraction that shifts column
alignment, drops a separator, or renders a panel in the wrong order.

**Tests to write:**

`BridgeViewStructureTest` using `VisualAssertionEngine`:
- Assert HUD header box is present and correctly bounded (top border, bottom border)
- Assert dual-pane layout: left pane has content in columns 1–90, right pane in columns 91–130
- Assert compass block is present and contains cardinal direction markers
- Assert right-pane content is non-empty for at least 3 location depths (Street, Floor, Room)
- Assert HUD footer / global controls line is present

Structured scan baseline:
- Run `./vinc.sh --scan` at a pinned seed; save the structured output as a reference file
- Assert key structural line counts and column positions match the reference

**Existing tests that partially cover this area:** `HeadlessSimulationTest` (box structure only), `VisualBaselinePinningTest` (2 strings only), `DisplayAdapterTest` (adapter widths only).

---

### Gap 7 — EventBus Unit Tests (blocks Phase 10)

**What's missing:** Phase 10 introduces `EventBus` and `DomainEvent`. Without unit tests for
the bus itself, a broken subscription, wrong payload, or missed unsubscription is invisible
until something higher-level breaks.

**Test to write:** `EventBusTest`
- Subscribe a listener, publish an event, assert listener received it exactly once
- Subscribe two listeners, publish one event, assert both received it
- Unsubscribe a listener, publish again, assert it no longer receives events
- Publish a `LocationEntered` event, assert payload contains correct LIP string
- Publish an `ItemCaptured` event, assert payload contains correct item name and frequency
- Publish with no subscribers — assert no exception thrown

**Existing tests that partially cover this area:** None (class doesn't exist yet).

---

## Tests That Can Be Deferred

The following gaps were identified but are low enough risk to address within their phase
rather than in Phase 0.5:

- `Player.visitedPaths` persistence (Phase 1b) — analysis step determines if it's needed
- Resonance detection unit test for `SpectralFrequency` (Phase 3b) — `GematriaTest` and `SurvivalPinningTest` provide sufficient coverage
- `ProceduralFactory` per-type factory tests (Phase 9) — `DeterministicUniverseTest` covers the behavioral contract

---

*Last updated: 2026-03-17*
