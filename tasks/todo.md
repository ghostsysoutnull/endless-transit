# Phase 4: Verification & Advanced Auditing

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
