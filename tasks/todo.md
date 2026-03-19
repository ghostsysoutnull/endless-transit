# Endless Transit: Active Task List

## 🟢 COMPLETED: [TEST_RUNNER_IMPROVEMENTS]
**Ref Document:** `docs/analysis/TEST_RUNNER_IMPROVEMENTS.md`

- [x] T1 — TTY detection: suppress [VINC:RUNNING] lines when piped (20 lines → clean)
- [x] T2 — Add SKIPPED count to summary
- [x] T3 — Raise slow test threshold to 1000ms
- [x] T4 — Stack frame on failure (file:line)
- [x] T5 — `--agent` machine-readable output mode (1 line on clean run)

---

## 🔴 ACTIVE: [OOA_STRUCTURAL_REFACTORING]
**Objective:** Incrementally harden the OO architecture without any behavioral change.
**Ref Document:** `docs/analysis/OOA_REFACTOR_PLAN.md`
**Suite baseline:** 118 discovered / 113 pass / 5 skipped / 0 failed

- [x] Phase 0 — Baselines (visual baseline pinned, seeds 0/500/9999)
- [x] Phase 0.5 — Test Coverage Gaps (safety-net tests 0.5a–0.5h, all complete)
- [x] Phase 1 — Bug Fixes (isCorridorActive reset removed, visitedPaths documented)
- [x] Phase 2 — Resource Loading (ThemeService + NameGenerator → classpath; vinc.sh/run.sh classpath fixed)
- [x] Phase 3 / 3c — Value Objects (RoomCategory enum, SpectralFrequency value object, Gematria return type)
- [x] Phase 4 — Structural Extraction (AbstractLeafLocation, SynthesisService)
- [x] Phase 5 — Dependency Injection (ModelOutput.fmt eliminated; fmt injected via ProceduralFactory)
- [x] Phase 5 Cleanup — effectiveFmt getter removed; domain docs corrected
- [ ] Phase 6 — GameState Decomposition — **NEXT**
- [ ] Phase 7 — BridgeView Decomposition
- [ ] Phase 8 — Floor State Pattern
- [ ] Phase 9 — ProceduralFactory Split
- [ ] Phase 10 — Domain Event System

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

## 🏛️ LESSONS
See `tasks/lessons/` for the canonical, domain-organized lesson set:
- `tasks/lessons/model.md` — lazy loading, ancestor traversal, DI injection patterns
- `tasks/lessons/infrastructure.md` — classpath discipline, build cache, test artifact hygiene
- `tasks/lessons/core.md` — value object migration, import management
