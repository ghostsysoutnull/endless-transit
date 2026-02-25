# Implementation Plan: The Neural Web Map

## Phase 1: Grid Infrastructure (UI)
- [x] **Box Drawing Utilities**:
    - [x] Update `Terminal.groovy` with `drawGridBox(int width, int height)`.
    - [x] Implement `plotSymbol(int x, int y, String symbol, String color)`.
- [x] **The Map Buffer**:
    - [x] Create a `MapBuffer` class to manage the characters before flushing to the terminal (to handle overlaps and layers).

## Phase 2: Projection Logic (Model)
- [x] **Locus Hash Translation**:
    - [x] Add `Point getLocusProjection(int boundsX, int boundsY)` to `Location.groovy`.
    - [x] Implement stable coordinate generation based on the location's hash.
- [x] **Container Mapping**:
    - [x] Implement `Map<Point, Location> getLocalLatticeMap()` in `Container.groovy`.
    - [x] Ensure the player's current child node is always identified as the "Center."

## Phase 3: Game Integration (Core)
- [x] **The `map` Command**:
    - [x] Add `map` and `m` to the command parser in `Game.groovy`.
    - [x] Implement `renderLatticeMap()` in the main HUD loop (or as a full-screen overlay).
- [x] **Coherence Cost**:
    - [x] Deduct coherence on use.
    - [x] Add "Scanning..." delay and visual effect.

## Phase 4: Distortion & Effects
- [x] **Glitch Overlay**:
    - [x] Implement `applyMapDistortion(double intensity)` based on player coherence.
- [x] **Trait Revelation**:
    - [x] Show location names/types on the map after a "Deep Scan."

## Phase 5: Verification
- [ ] **Manual Vibe Check**: Verify map stability when moving between locations.
- [ ] **Unit Tests**: Test coordinate stability for identical hashes.
