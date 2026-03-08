# Refactor Plan: Decomposing the Game God Object

This plan addresses the "God Object" anti-pattern in `Game.groovy` by delegating its 5+ responsibilities to specialized components. This will improve testability, maintainability, and architectural clarity.

## Phase 1: Input & Action Mapping
- [ ] **Create `com.endlesstransit.core.InputHandler`**:
    - [ ] Move `Scanner` management.
    - [ ] Encapsulate "Zero-Agnostic Numeric Matching" (e.g., "1" -> "01").
    - [ ] Move `getRawUserInput()` and `processInput()`.
- [ ] **Create `com.endlesstransit.core.ActionMapper`**:
    - [ ] Manage `currentActionMap` and `previousActionMap`.
    - [ ] Handle the mapping of input keys to execution `Closures`.

## Phase 2: Navigation & Behavioral Rules
- [ ] **Create `com.endlesstransit.core.NavigationEngine`**:
    - [ ] Move "Boundary-based auto-reversal" (f/b, u/d logic).
    - [ ] Move "Leave/Exit" repetition logic.
    - [ ] Manage `lastChoice` state and its implications for the next turn.

## Phase 3: World Genesis & Initialization
- [ ] **Create `com.endlesstransit.procgen.WorldGenesis`**:
    - [ ] Move `initializeWorld()` logic.
    - [ ] Define the "Deep Start" sequence (Universe -> Street) here instead of in the engine.
    - [ ] Provide a clean `Universe` + `Location` starting pair to the `Game`.

## Phase 4: Command Pattern (The Glitch Menu)
- [ ] **Decouple `glitchMenu()`**:
    - [ ] Implement a `Command` pattern for world mutations (Breach, Prime, Keystone).
    - [ ] Remove direct world manipulation from the `Game` class.

## Phase 5: Orchestration & Thin Controller
- [ ] **Refactor `Game.groovy`**:
    - [ ] Coordinate the `InputHandler`, `ActionMapper`, and `NavigationEngine`.
    - [ ] Standardize the main loop to be purely high-level: `Input -> Map -> Navigate -> Render`.
    - [ ] Abstrate `SyncManager` and `JournalManager` calls.

---
**Progress Tracking**:
- **Phase 1**: [ ]
- **Phase 2**: [ ]
- **Phase 3**: [ ]
- **Phase 4**: [ ]
- **Phase 5**: [ ]

**Architectural Goal**: Reduce `Game.groovy` from ~350 lines to <100 lines of orchestration code.
