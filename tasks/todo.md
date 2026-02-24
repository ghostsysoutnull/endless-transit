# Phase 1: Domain Separation

## Objective
Reorganize the codebase into functional domains (`core`, `ui`, `procgen`, `model`) to reduce cognitive noise for AI agents and improve project modularity.

## Plan

### Infrastructure & Entry Point
- [x] Move `Main.groovy` to `src/main/groovy/com/endlesstransit/Main.groovy`.
- [x] Add `package com.endlesstransit` to `Main.groovy`.
- [x] Update `run.sh` to launch `com.endlesstransit.Main`.
- [x] Verify game still starts.

### Atomic Domain Moves
- [x] **UI Domain**: Move `Terminal.groovy`, `ThemeManager.groovy` to `com.endlesstransit.ui`.
    - [x] Update package headers.
    - [x] Update imports in other files.
    - [x] Verify with tests.
- [x] **ProcGen Domain**: Move `Gematria.groovy`, `NameGenerator.groovy` to `com.endlesstransit.procgen`.
    - [x] Update package headers.
    - [x] Update imports in other files.
    - [x] Verify with tests.
- [x] **Core Domain**: Move `Game.groovy`, `Player.groovy`, `InventoryItem.groovy`, `Logger.groovy`, `JournalManager.groovy` to `com.endlesstransit.core`.
    - [x] Update package headers.
    - [x] Update imports in other files.
    - [x] Verify with tests.
- [x] **Model Domain**: Move all location and container classes to `com.endlesstransit.model`.
    - [x] Update package headers.
    - [x] Update imports in other files.
    - [x] Verify with tests.

### Final Verification
- [x] Run `./run.sh --test` and ensure 100% pass rate.
- [x] Perform a manual "vibe check" by running the game.

## Review
- [x] Phase 1 completed: Files moved to domains, imports updated, tests passing.

# Phase 2: Context Localization

## Objective
Distribute technical knowledge and "vibes" into domain-specific `GEMINI.md` files to optimize agent context windows.

## Plan
- [x] Create `src/main/groovy/com/endlesstransit/ui/GEMINI.md`.
- [x] Create `src/main/groovy/com/endlesstransit/model/GEMINI.md`.
- [x] Create `src/main/groovy/com/endlesstransit/procgen/GEMINI.md`.
- [x] Create `src/main/groovy/com/endlesstransit/core/GEMINI.md`.
- [x] Update root `GEMINI.md` with `@import` syntax.
- [x] Consolidate lessons into local context files where applicable.

## Review
- [x] Phase 2 completed: Knowledge is now localized and indexed.

# Phase 3: Standardize Testing

## Objective
Migrate tests into a standard source tree (`src/test/groovy`) and align them with the new domain packages for better isolation and discovery.

## Plan
- [x] Create `src/test/groovy/com/endlesstransit/` structure.
- [x] Move tests and categorize them by domain (e.g., `model/`, `ui/`, `core/`).
- [x] Update test package headers and imports.
- [x] Update `run.sh` to execute tests from the new classpath.
- [x] Verify 100% test pass rate.

# Planetary Resonance & Regional Divergence

## Objective
Implement hierarchical vibe inheritance so that planets have consistent timelines/cultures with regional mutations in countries and cities.

## Plan
- [x] **Data Foundation**: Create `VibeCapsule.groovy` in `com.endlesstransit.model`.
- [x] **Inheritance Logic**: Update `Location` and `Container` to propagate the capsule.
- [x] **Genesis**: Update `Planet` to instantiate the initial `VibeCapsule`.
- [x] **Mutation**: Update `Country` and `City` to apply lattice mutations and stability shifts.
- [x] **Realization**: Refactor `Apartment` and `Room` to generate descriptions based on the capsule.
- [x] **Verification**: Perform a "Vibe Check" to ensure planetary consistency and regional divergence are visible.

# Phase 5: Documentation Categorization

## Objective
Reorganize the `docs/` folder into functional categories and provide a central index to improve knowledge discovery for agents and architects.

## Plan
- [x] Create `docs/arch/`, `docs/vision/`, `docs/workflow/`, and `docs/archive/` directories.
- [x] Categorize existing documents into these folders.
- [x] Create `docs/README.md` as a central documentation map.
- [x] Update any internal links between documents (if necessary).
- [x] Verify that all context imports in `GEMINI.md` still point to correct (or root) documentation if they reference `docs/`.
