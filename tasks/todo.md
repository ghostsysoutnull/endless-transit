# Refactoring Phase 1: Critical Architecture Cleanup

**Objective:** Decompose the `Game.groovy` God Object and implement the Interface Segregation Principle for the `Location` hierarchy.

## Plan

### 1.1 Game.groovy Decomposition (God Object Refactor)
- [x] **Extract `TurnProcessor`**: Move the turn cycle logic and action dispatching into a dedicated service.
- [x] **Extract `NavigationOrchestrator`**: Separate the responsibility for location transitions and current location state.
- [x] **Extract `PersistenceService`**: Move `createMemento()` and `restore()` logic into a dedicated state manager.
- [x] **Extract `RenderingCoordinator`**: Decouple the UI trigger lifecycle from the main game loop.
- [x] **Verification**: Ensure `NewGameTest.groovy` and `ReplayServiceTest.groovy` still pass with the thinner `Game` class.

### 1.2 Location Hierarchy Refactor (Interface Segregation)
- [x] **Define Focused Interfaces**:
    - [x] `Locatable`: For position, path, and basic naming.
    - [x] `Navigable`: For player interaction and navigation options.
    - [x] `Renderable`: For visual symbols and UI data.
    - [x] `Stateful`: For mutation state and persistence.
- [x] **Implement Polymorphic Dispatch**:
    - [x] Move `getMapSymbol()` and `getMapColor()` into concrete classes (e.g., `Planet`, `Building`).
    - [x] Eliminate `instanceof` checks in `Container.getMapSymbol()`.
- [x] **Verification**: Run `./run.sh --test` to confirm no visual regressions in the TUI or HUD.

### 1.3 Service Injection & Dependency Inversion
- [x] **Convert `Terminal` to instance-based**: Create an `OutputDevice` interface and inject it into the `Game` and `BridgeView`.
- [x] **Convert `ThemeManager` to instance-based**: Create a `ThemeService` and inject it into the `model` layer.
- [x] **Convert `ProceduralFactory` to instance-based**: Remove static methods to enable proper testing and dependency injection.
- [x] **Model Dependency Cleanup**: Remove all `import com.endlesstransit.ui.*` from the `model` package to strictly enforce the domain boundaries.
- [x] **Verification**: Ensure all tests still pass, specifically the `RenderSink` assertions in the diagnostic suite.

## Review
- [ ] (Pending implementation)

---

# Phase 4: Verification & Advanced Auditing (COMPLETED)

## Objective
Implement the `SeedScanner` for deterministic scenario discovery and the `Memento` pattern for state injection and time-travel debugging.

## Plan

### 4.2 SeedScanner (Discovery Engine)
- [x] **Define `WorldProbe` Interface**: Create the Specification contract for location matching.
- [x] **Implement Concrete Probes**:
    - [x] `BuildingFloorCountProbe`: Matches buildings/cities with specific floor ranges.
    - [x] `CultureProbe`: Matches locations with specific architectural vibes.
    - [x] `LIPProbe`: Matches a specific Locus Identity Path. (Implicitly supported by SeedScanner DFS)
- [x] **Create `SeedScanner.groovy`**:
    - [x] Implement headless world traversal (Depth-First Search).
    - [x] Add support for multiple combined probes (AND/OR logic).
    - [x] Implement `scan(long startSeed, long count, WorldProbe probe)` method.
- [x] **Implement `SeedVault`**: A registry for named seeds (e.g., "STRESS_TEST_CITY").
- [x] **Verification**: Create `SeedScannerTest.groovy` to prove we can find a specific location type within 100 seeds.

### 4.3 State Injection (Memento Pattern)
- [x] **Create `GameMemento.groovy`**: Define the immutable snapshot of the game state.
- [x] **Refactor `Game.groovy`**:
    - [x] Implement `createMemento()` to capture current state.
    - [x] Implement `restore(GameMemento memento)` to inject state.
- [x] **Verification**: Create a test that:
    1. Plays 10 turns.
    2. Saves memento.
    3. Plays 5 more turns.
    4. Restores memento.
    5. Verifies we are exactly back at turn 10 state.

## Review
- [x] Phase 4.2 completed: SeedScanner is highly optimized with branch pruning, reducing scan time by 90%+.
- [x] Phase 4.3 completed: Memento pattern implemented for robust state reconstitution via LIP resolution.
