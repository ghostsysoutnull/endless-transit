# Vinculum Refactor Plan: Object-Oriented Hardening

This plan addresses the flaws identified in the `OO_DESIGN_ANALYSIS.md` to improve maintainability, testability, and extensibility.

## Phase 1: Break the God Object
*Goal: Extract UI rendering from `Game.groovy` into a dedicated View class.*

- [ ] **Extract `BridgeView`**:
    - [ ] Create `com.endlesstransit.ui.BridgeView`.
    - [ ] Move `renderBridgeHUD`, `renderAdaptiveBridge`, `renderCompass`, and all `generateXXXMap` methods to `BridgeView`.
    - [ ] Pass the necessary state (`Player`, `Location`) to `BridgeView` methods.
- [ ] **Simplify `Game.groovy`**:
    - [ ] Update the main loop to call `bridgeView.render(currentLocation, player)`.
    - [ ] Remove all raw `println` and formatting logic from `Game.groovy`.

## Phase 2: Polymorphic HUD & Navigation
*Goal: Remove `instanceof` logic from the UI and core loop.*

- [ ] **Location Interface Update**:
    - [ ] Add `String getIndexLabel()` to `Location` (replaces hardcoded "ALIGN", "STRATA", "Z-AXIS").
    - [ ] Add `String getStatusSummary()` to `Location` (replaces specific HUD status logic).
- [ ] **Implement Polymorphism**:
    - [ ] Implement these methods in `Universe`, `Planet`, `Floor`, `Room`, etc.
- [ ] **Refactor HUD**:
    - [ ] Update `BridgeView` to use the new interface methods instead of type checking.

## Phase 3: Decouple Procgen (The Factory Pattern)
*Goal: Remove `NameGenerator` and `ThemeManager` calls from model constructors.*

- [ ] **Create `ProceduralFactory`**:
    - [ ] Implement a factory that takes a seed and returns a fully initialized `Location` object.
- [ ] **Refactor Constructors**:
    - [ ] Change model classes to be "dumb" data containers.
    - [ ] Move generation logic (names, vibes, child population strategies) into the Factory.
- [ ] **Unit Testing**:
    - [ ] Verify that we can now create a "Mock" location without triggering procedural generation.

## Phase 4: Persistence Hardening
*Goal: Make the `Game` loop stateless and move restore logic to `SyncManager`.*

- [ ] **Abstract Reconstitution**:
    - [ ] Move the `mutations` application and player state mapping from `Game.restoreSession` into `SyncManager`.
- [ ] **Stateless Sync**:
    - [ ] `SyncManager` should return a fully hydrated `GameSession` object instead of a raw `Map`.

---
**Progress Tracking**:
- **Phase 1**: [COMPLETE] (BridgeView extracted, Game.groovy simplified, menu rendering centralized)
- **Phase 2**: [COMPLETE] (Location interface updated, polymorphic methods implemented across all 12+ location types, instanceof checks removed from UI)
- **Phase 3**: [COMPLETE] (ProceduralFactory implemented, all model classes decoupled from NameGenerator/ThemeManager, population strategies centralized)
- **Phase 4**: [COMPLETE] (Stateless Sync implemented, GameSession object introduced, restore logic moved to SyncManager)

---
## Refactor Summary
The Endless Transit codebase has been hardened into a true Object-Oriented system:
1. **Single Responsibility**: `Game.groovy` now only manages the high-level loop and player state transitions. UI rendering is delegated to `BridgeView`, and procgen to `ProceduralFactory`.
2. **Polymorphism**: The brittle `instanceof` chains in the UI have been replaced by polymorphic methods in the `Location` interface (`getTypeLabel`, `getIndexLabel`, `getStatusSummary`, etc.).
3. **Dependency Inversion**: Model classes are now "dumb" data containers. They no longer know HOW they are named or populated; the `ProceduralFactory` injects this logic via a stable seed.
4. **Clean Persistence**: The save/load cycle is now encapsulated in `SyncManager`, which reconstitutes a full `GameSession` from the substrate, keeping the `Game` loop clean and predictable.

