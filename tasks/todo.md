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
**Suite baseline:** 207 discovered / 207 pass / 0 skipped / 0 failed

- [x] Phase 0 — Baselines (visual baseline pinned, seeds 0/500/9999)
- [x] Phase 0.5 — Test Coverage Gaps (safety-net tests 0.5a–0.5h, all complete)
- [x] Phase 1 — Bug Fixes (isCorridorActive reset removed, visitedPaths documented)
- [x] Phase 2 — Resource Loading (ThemeService + NameGenerator → classpath; vinc.sh/run.sh classpath fixed)
- [x] Phase 3 / 3c — Value Objects (RoomCategory enum, SpectralFrequency value object, Gematria return type)
- [x] Phase 4 — Structural Extraction (AbstractLeafLocation, SynthesisService)
- [x] Phase 5 — Dependency Injection (ModelOutput.fmt eliminated; fmt injected via ProceduralFactory)
- [x] Phase 5 Cleanup — effectiveFmt getter removed; domain docs corrected
- [x] Phase 6 — GameState Decomposition (BridgeView → RenderingCoordinator; ActionMapper → TurnProcessor; InputHandler built in Game and injected; NavigationEngine → NavigationOrchestrator)
- [x] Phase 7 — BridgeView Decomposition (8 `ViewComponent`s behind a 120-line compositor; golden-frame visual gate replaces the scan; WF-002 closed, WF-003 closed; HK-001..004 logged)
- [x] Housekeeping (post-Phase-7): HK-001..004 cleared — deterministic HUD noise, controller out of `GameState`, one dispatch path, one inventory renderer
- [x] Phase 8 — Floor State Pattern (`FloorState` + `ElevatorState`/`CorridorState` singletons; `Floor.enterCorridor()`/`returnToElevator()`; polymorphic scan target; no `instanceof` on states; post-merge: WF-004 + WF-005 closed)
- [x] Phase 9 — ProceduralFactory Split (`LocationFactory<T>` + 14 per-type factories; `ProceduralFactory` is a 198-line registry facade with every pre-split signature intact; `ProcgenDeepSnapshotTest` pins 9 previously unguarded behaviors; zero caller edits; 16 commits)
- [x] Phase 10 cadence review (2026-09-16): workflow backlog clean; grill check 5 covers Observer listeners; HK-008 logged
- [x] Housekeeping HK-005 + HK-006 (2026-09-16): `Container.populateChildren()` dispatches through the registry; 13 overrides + 12 facade delegators gone; procgen test hygiene. HK-008, HK-009 open.
- [x] Phase 10 — Domain Event System (2026-09-16): `EventBus` live, `ItemCaptured`/`SynthesisPerformed`, `Player.capture` sole publisher, `JournalManager` + `RitualTracker` typed listeners; no model class imports the journal; 10 commits. HK-010 (dead discovery journaling since March), HK-011 (static journal) logged.
- [x] Housekeeping HK-010 (2026-09-16, behavior change by user decision): discovery journaling restored — `Player.markFootprint` publishes `LocationDiscovered` once per new macro path, journal subscribes `logDiscovery`; `DiscoveryEventContractTest` 4 pins; goldens 13–18 regenerated (first ticker line). 3 commits, merged, pushed.
- [x] Housekeeping HK-009 (2026-09-16): `populateApartment` delegator deleted; two tests use the lazy path (the explicit call had double-populated every apartment — test-only). 2 commits, merged.
- [x] Housekeeping HK-011 (2026-09-16): `JournalManager` is an instance owned by `Game`; ticker lines travel in `RenderContext.recentEvents`; ticker shows the discovered location's name (visual change, goldens 13–18). 4 commits, merged.
- [x] Housekeeping HK-012 (2026-09-16, user report): the suite had overwritten/deleted the player's `session.trace` since March; `Game.saveFile` + temp files in tests + guard assertions. 2 commits, merged.
- [ ] Next: optional O2 (CodeNarc — reshape as `./vinc.sh --lint`, no Gradle on the runner path) / O1 (HeadlessRunner DSL), or housekeeping HK-008 — user decision

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
