# Endless Transit: Active Task List

## 🔴 ACTIVE: [OOA_STRUCTURAL_REFACTORING]
**Objective:** Incrementally harden the OO architecture without any behavioral change.
**Ref Document:** `docs/analysis/OOA_REFACTOR_PLAN.md`

- [ ] Phase 0 — Baselines (capture scan output, confirm green suite)
- [ ] Phase 0.5 — Test Coverage Gaps (8 safety-net tests)
- [ ] Phases 1–10 — See OOA_REFACTOR_PLAN.md for full breakdown

---

## 🟢 COMPLETED: [LOGIC_HARDENING_PHASE_2]

### Phase 1: Survival Mechanics (Coherence)
- [x] 1.1 Implement `CoherenceDrainTest.groovy`
- [x] 1.2 Refine `GameState.adjustCoherence()` (Multiplier + Death State)

### Phase 2: Navigation Shortcuts (Auto-Entry)
- [x] 2.1 Implement `AutoEntryTest.groovy`
- [x] 2.2 Refine `NavigationOrchestrator` (Apartment -> Room transition)

### Phase 3: Synthesis & Verification
- [x] 3.1 Implement `RegionalDivergenceTest.groovy`
- [x] 3.2 Implement `AtmosphereSynthesisTest.groovy`
- [x] 3.3 Full Suite Regression (41+ tests)
- [x] 3.4 Chronicle & Align Codex

---

## 🟢 COMPLETED: [PHASE_0_LOGIC_DECODING]
- [x] Create Vinculum Codex (14 docs)
- [x] Map Logic-Test Alignment Matrix (70% coverage)
- [x] Verify 41/41 baseline JUnit 5 tests
- [x] Chronicle 0xDECE

---

## ⏳ BACKLOG: [AESTHETIC_REFINEMENT]
- [ ] [NEURAL_MAP] Implement right-side 2D ASCII radar.
- [ ] [SYSTEM_TELEMETRY] Dynamic Spectrogram.
- [ ] [VINCULUM_AUDIT] Static analysis for @CompileStatic enforcement.

---

## 🏛️ RECENT LESSONS (Updated 2026-03-17)
- **Safe-Accessors Mandate:** All child lists must use `getXXX()` getters — never access `this.list` directly (lazy-loading law).
- **Structural Collapse Guard:** Never apply skeleton/template patterns to existing classes without reading full source first.
- **Phase Gates:** Each OOA refactor phase is incomplete until all three gates pass: `--test`, `--scan` (model/ui), and `DeterministicUniverseTest` (procgen).
