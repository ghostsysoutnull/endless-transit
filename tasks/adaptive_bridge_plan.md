# Implementation Plan: Adaptive Bridge & Tactical Navigation

## Phase 1: The Split-Pane Layout Engine
- [ ] **Pane Composition**:
    - [ ] Create `Game.renderAdaptiveBridge()` to replace the sequential printing of description and map.
    - [ ] Logic to pad the shorter side (left or right) so the vertical separator `║` is continuous.
    - [ ] Set vertical separator at column 90 (total width 130).
- [ ] **UI Synchronization**:
    - [ ] Ensure `instantRender` correctly flushes both panes.

## Phase 2: Scale-Aware Navigation (Right Pane)
- [ ] **Macro Mode (Depth 0-7)**:
    - [ ] Implement `generateMacroMap()` for Cities, Planets, Systems, and Sectors.
    - [ ] **Universe Root**: Custom "Unimatrix" radiating filament map.
    - [ ] **Filaments**: Custom "Conduit Trace" linear map.
- [ ] **Micro Mode (Depth 8+)**:
    - [ ] Implement `generateSystemTelemetry()` for Buildings, Floors, and Rooms.
    - [ ] Include ASCII **Sync-Spectrogram** visualizing local resonance.

## Phase 3: Tactical Targeting & Vectors
- [ ] **Commands**:
    - [ ] Implement `target [ID]` or `t [ID]` to pin a node from the map.
    - [ ] Implement `untarget` to clear.
- [ ] **HUD Updates**:
    - [ ] Add `[TARGET: NAME] [VECTOR: DIR]` to the 130-char Command Bridge header.
    - [ ] Coarse vector logic: compare player `[x,y]` to target `[x,y]` in the `MapBuffer`.

## Phase 4: Verification & Vibe
- [ ] **Vibe Check**: Verify the UI shift when entering/exiting a building.
- [ ] **Alignment Audit**: Ensure no "jitter" occurs when ANSI codes are applied to the map.
