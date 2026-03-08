# Implementation Plan: Neural Trace Persistence (Save/Load)

## Phase 1: Seed-Based Determinism (Model)
- [x] **Universal Seeding**:
    - [x] Update `Location` interface with `long getSeed()`.
    - [x] Update `Container` and all subclasses to accept `long seed` in constructor.
    - [x] Refactor `populateChildren()` across all containers to use deterministic child seeds (`seed + index`).
- [x] **Refactor Generators**:
    - [x] Update `NameGenerator` and `ThemeManager` to accept optional seeds for consistent naming/vibe.
- [x] **Universe Master Seed**:
    - [x] Update `Universe` constructor to take a seed (defaulting to `System.currentTimeMillis()`).

## Phase 2: Locus Index Path (LIP) Engine (Model)
- [x] **Path Generation**:
    - [x] Implement `String getLIP()` in `Container.groovy`. (Format: `0.4.1.2...`).
    - [x] Implement `getLIP()` in `Room.groovy`.
- [x] **Tree Walking**:
    - [x] Implement `Location resolveLIP(String lip)` in `Universe.groovy`.
- [x] **Footprint Refactor**:
    - [x] Update `Player.visitedPaths` to store LIPs instead of descriptive strings for exact per-room tracking.

## Phase 3: World Mutations & Serialization (Core)
- [x] **Mutation Map**:
    - [x] Create `WorldState` class to hold non-procedural overrides (e.g., `isBreached`, `infusionCount`).
    - [x] Key mutations by LIP.
- [x] **SyncManager Service**:
    - [x] Create `src/main/groovy/com/endlesstransit/core/SyncManager.groovy`.
    - [x] Implement `save(Game game, String slot)` using `JsonBuilder`.
    - [x] Implement `load(String slot)` using `JsonSlurper`.

## Phase 4: Integration & UI (Core & UI)
- [x] **Game Loop Integration**:
    - [x] Add `sync` (save) and `restore` (load) commands to `Game.groovy`.
    - [x] Implement `auto-sync` on exit.
- [x] **Visual Feedback**:
    - [x] Implement `Terminal.showSyncEffect()` for immersion.

## Phase 5: Verification
- [x] **Stability Test**: Verify seed 12345 always generates "The Neon Spire" (or equivalent).
- [x] **Persistence Test**: Verify `visited` status for 100+ rooms is correctly restored after a reload.
