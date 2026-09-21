# Implementation Plan: Building Strata Diagnostics

## Phase 1: Functional Zonation (Model)
- [ ] **Zone Logic**:
    - [ ] Implement `getFloorZone(int floorNum)` in `Building.groovy`.
    - [ ] Define zone templates (Lobby, Research, Executive, Abyssal).
    - [ ] Ensure zonation is deterministic based on `building.seed`.
- [ ] **Integrity Math**:
    - [ ] Implement `getFloorIntegrity(int floorNum)` based on distance to Floor 0 and breach status.

## Phase 2: Vertical Strata UI (Model/UI)
- [ ] **The Telemetry Table**:
    - [ ] Overhaul `Building.enter()` to display the 130-char diagnostic table.
    - [ ] Columns: `[ID]`, `[RADAR]`, `[STRATA_DESIGNATION]`, `[FUNCTIONAL_ZONE]`, `[INTEGRITY/PRESSURE]`, `[SCAN_RESIDUE]`.
- [ ] **Vertical Radar**:
    - [ ] Implement an ASCII vertical bar showing player position relative to building height.
- [ ] **Abyssal Support**:
    - [ ] Add rows for negative floors once the building is breached.

## Phase 3: Navigation Integration (Core)
- [ ] **Interactive Options**:
    - [ ] Ensure `Building.getOptions()` labels remain concise but functional.
- [ ] **Visual Polish**:
    - [ ] Use `Terminal.getVisualWidth()` for perfect alignment.

## Phase 4: Verification
- [ ] **Vibe Check**: Verify the visual transition from Surface to Peak.
- [ ] **Persistence**: Ensure zonation labels are stable after save/load.
