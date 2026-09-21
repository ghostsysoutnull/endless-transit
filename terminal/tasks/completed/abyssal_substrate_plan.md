# Implementation Plan: Abyssal Substrate

## Phase 1: Ritual Infrastructure (Core & Model)
- [ ] **Track Ritual Progress**:
    - [ ] Update `Building.groovy` with `Set<Integer> sampledFloors` and `int infusionCount`.
    - [ ] Add `isBreached` boolean to `Building.groovy`.
- [ ] **Logging Hooks**:
    - [ ] Update `JournalManager.logCapture` to notify the current `Building` (if any).
    - [ ] Update `JournalManager.logSynthesis` to increment `infusionCount` in the current building.
- [ ] **Keystone Synthesis**:
    - [ ] Add logic to `Player.mergeItems` to check for "Building Keystone" requirements.
- [ ] **The Breach Directive**:
    - [ ] Update `Floor.getOptions` to show `j. Breach the Bedrock` at the peak of a primed building.
    - [ ] Implement the `breach()` method in `Building.groovy`.

## Phase 2: Negative Hierarchy (Model)
- [ ] **Negative Floor Support**:
    - [ ] Update `Building.getFloor(int number)` to support negative numbers.
    - [ ] Implement `d. Descend into the Substrate` at Floor 0.
- [ ] **Terminology Overrides**:
    - [ ] Implement `getName()` and `getTypeName()` overrides in `Floor`, `Corridor`, `Apartment`, and `Room`.
    - [ ] Ensure these overrides check if `this.number < 0`.
- [ ] **Asset Expansion**:
    - [ ] Create `src/main/resources/themes/atmosphere/walls/abyssal.txt`.
    - [ ] Create `src/main/resources/themes/atmosphere/lighting/abyssal.txt`.
    - [ ] Create `src/main/resources/themes/atmosphere/structures/abyssal.txt`.

## Phase 3: Visuals & Mechanics (UI & Core)
- [ ] **Dark Brutalist Theme**:
    - [ ] Update `ThemeManager.generateAtmosphere` to handle the "Abyssal" culture.
    - [ ] Add a `isAbyssal()` check to `Location`.
- [ ] **HUD Inversion**:
    - [ ] Update `renderBridgeHUD` to shift to "Integrity" and "Abyssal Pressure" visuals when in negative floors.
    - [ ] Force `accent` color to `GREY` in the Substrate.
- [ ] **Abyssal Ticker**:
    - [ ] Implement the "Voices" logic in the HUD event loop.
- [ ] **Lattice Trace (Map)**:
    - [ ] Update `renderLatticeTrace` to show the "Dark Root" hierarchy (Internal Logic > Core Kernel).

## Phase 4: Verification
- [ ] **Reproduction Script**: Create `test_the_descent.groovy` to simulate the full ritual.
- [ ] **JUnit**: Add `AbyssalRitualTest.groovy` to verify state persistence.
- [ ] **Vibe Check**: Manual walkthrough of the transition from Surface to Substrate.

---
*Target Start: Phase 1.*
