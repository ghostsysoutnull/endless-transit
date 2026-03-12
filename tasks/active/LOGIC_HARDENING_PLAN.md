# ACTIVE TASK: Logic Hardening & Survival Mechanics (Phase 2)

## Objective
Address the logic gaps identified in `docs/logic/TEST_ALIGNMENT.md` by implementing missing tests and refining the underlying mechanics for survival and navigation.

## Context & Blueprints
- **Test Alignment Matrix:** `docs/logic/TEST_ALIGNMENT.md`
- **Core Physics Spec:** `docs/logic/CORE_PHYSICS.md`
- **Orchestration Flow:** `docs/logic/ORCHESTRATION_FLOW.md`

---

## Phase 1: Survival Mechanics (Coherence)
- [ ] **1.1 Implement `CoherenceDrainTest.groovy`**
    - Verify 1.0x drain in standard locations.
    - Verify 2.0x drain in Abyssal/Entropic locations.
    - Verify death state when coherence reaches 0.
- [ ] **1.2 Refine `GameState.adjustCoherence()`**
    - Ensure the multiplier is correctly applied based on the current location's resonance.
    - Add logic to trigger "Neural Collapse" (Game Over) on zero coherence.

## Phase 2: Navigation Shortcuts (Auto-Entry)
- [ ] **2.1 Implement `AutoEntryTest.groovy`**
    - Verify that navigating to an `Apartment` automatically triggers entry into its first `Room`.
    - Verify that "Go Back" from the room returns the player to the `Corridor` (bypassing the apartment-selection menu).
- [ ] **2.2 Refine `NavigationOrchestrator`**
    - Implement the `autoEntry` logic for leaf-node containers like Apartments.

## Phase 3: Regional & Atmospheric Synthesis
- [ ] **3.1 Implement `RegionalDivergenceTest.groovy`**
    - Stress-test 1000 cities to verify ~10% frequency of `isRebelDistrict`.
    - Verify culture flipping in rebel districts.
- [ ] **3.2 Implement `AtmosphereSynthesisTest.groovy`**
    - Verify `ThemeService` correctly maps Vibe to wall/lighting assets.
    - Verify hybrid object generation (e.g., "Neon-Baroque" artifacts).

## Phase 4: Verification & Chronicle
- [ ] **4.1 Full Suite Regression**
    - Ensure 41/41 baseline + new tests all pass.
- [ ] **4.2 Update `TEST_ALIGNMENT.md`**
    - Mark all gaps as **VERIFIED**.
- [ ] **4.3 Chronicle Session 0xDECF**
    - Document the stabilization of survival and navigation logic.

---

## Session History & Notes
- **2026-03-12:** Plan created following the completion of the Vinculum Codex.
