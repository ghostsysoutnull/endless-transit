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
**Suite baseline:** 256 discovered / 256 pass / 0 skipped / 0 failed

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
- [x] Housekeeping HK-008 (2026-09-16): the last Service Locator is gone — `Game.factory` (final) is the one `ProceduralFactory`, injected into the services; every `Container` carries the registry that made it; `SeedScanner` and tests build their own. `FactoryWiringContractTest` pins fmt identity (step 0), factory identity, fail-loud, ownership. 6 commits, merged `f681c46`. Housekeeping backlog empty.
- [x] O2 — CodeNarc as `./vinc.sh --lint` (2026-09-16): CodeNarc 4.0.0 on `lib/lint/`, Groovy-DSL ruleset with six Vinculum invariant rules, baseline-ratchet (100 → 9 entries: the nine long methods, HK-013); 83 dead imports + 4 unused locals gone, `Player` is `@CompileStatic`, `Game.start`/`ConsoleSink` declared in source; `--lint` is a merge gate. 13 commits on `refactor/o2-lint`.
- [x] Docs (2026-09-16): README site link fixed (was 404, wrong owner domain); **Player's Guide** live at `docs/terminal/guide/players_guide.md` — plain-language, every number read from source and cited inline, `[GUIDE]` nav entry, page-scoped styles; chronicle `0x9c4e17d`. Ten manual/codex claims found false → **HK-014**; five player-facing bugs surfaced → **HK-015**.
- [x] Housekeeping HK-014 (2026-09-16): manual + codex corrected against the source (11 pages) — ten wrong numbers fixed in the in-fiction voice; the world catalogue completed (10 cultures, 8 eras, 6 traits, `ATMOS_SHIFT` explained, 15 floor zones); glossaries trimmed to symbols that exist.
- [x] Variety audit (2026-09-16, user report): objects/furniture ≤ 256 strings per planet, three atmosphere lines collapse to one string over large parts of the world (missing resource files, silent fallback), room-name uniqueness is a hex serial; `docs/analysis/VARIETY_AUDIT.md`, **HK-016** logged (content phase, three ordered steps); chronicle `0x5e1c9a4`.
- [x] Housekeeping HK-017 (2026-09-16, found by the HK-016 step-1 grill): the narrative pane wrapped to 88 columns but the split box holds 86, so every pane-wide row ended in `...` (separator, building/filament lists, `[STA...`). One constant + `FrameGeometryContractTest`; 12 goldens regenerated, 44 lines, all the artifact disappearing. Merged.
- [x] **HK-016 step 1** (2026-09-16): the silent resource files filled (lighting ×4, structures ×3, walls ×5, lexicons ×4), lexicon enumerated by `names/buildings/index.txt`, `[THEME_WARN]` on any fallback, glitch key `"Abyssal"` → `"abyssal"`, `ThemeResourceCoverageTest` (RED on the old tree); probe fallbacks 0 on all six seeds; one literal + goldens 16/30 moved as planned. Plan + record: `tasks/completed/HK_016_STEP1_PLAN.md`. 10 commits on `content/hk-016-step1`, merged.
- [x] **HK-016 step 2** (2026-09-16): shuffled-deck objects (4 forms + singles, no repeat per apartment on six seeds), furniture = condition + culture item, second era per planet picked per apartment (rebel districts swap eras), `<adjective> <category>` cell names (hex gone), corridor/floor sentence variants; `ProcgenVarietyContractTest` 7 pins; 12 goldens moved, each simulated first; objects distinct 143–198 → 203–369 per seed. Plan + record: `tasks/completed/HK_016_STEP2_PLAN.md`. 8 commits on `content/hk-016-step2`, merged.
- [x] **HK-016 step 3** (2026-09-16): every list grown (relics 16, atmosphere 10, conditions 16, lexicons 12+12, doors 12/12/12), doors' lists and narratives externalised first (zero diff), size pins per family; objects distinct 261–545 per seed (audit: 143–198), furniture 177–285, door briefs 160/252. 18 commits on `content/hk-016-step3`, each re-pinned from a run. **HK-016 CLOSED.** Plan + record: `tasks/completed/HK_016_STEP3_PLAN.md`.
- [x] Housekeeping HK-018 (2026-09-16, user report): `j` hidden in corridor mode + Keystone bound by name → the breach rule lives on the model (`Building.keystoneIn`, `Floor.addBreachOption`), Keystone bound by LIP (`InventoryItem.boundLip`), no name fallback (user decision). `BreachOptionContractTest` 9 pins. 5 commits, merged `7ca28f8`.
- [x] Housekeeping HK-013 slice 1 (2026-09-16): `SyncManager.restore` under 50 lines (three helpers, by script); `RestoreContractTest` 5 pins; lint baseline 9 → 8; lesson "no formatting dodges"; WF-006 logged. Merged `e66fca4`.
- [x] Housekeeping HK-019 (2026-09-16, behavior change by user decision): the corridor's `l` hands the floor back to the elevator (`Floor.leave`), so a floor left from the corridor opens on `u`/`d`/`c` next visit; `CorridorLeaveContractTest` 6 pins; 36 goldens unchanged. 4 commits on `housekeeping/hk-019-corridor-reset`.
- [x] Workflow WF-007 (2026-09-17, user proposal): the close-out is a gate — `/close-wave` (ten rows, ends in a table; "closed" is its output only) + `./vinc.sh --docs` (suite count, latest chronicle, blueprint stamps; 15 blueprints baselined). No source change. 6 commits on `workflow/wf-007-close-wave`.
- [x] Workflow WF-008 (2026-09-17, user review): `/close-wave` tiers, recovery prompt capped (D4), OOA plan no longer auto-loaded — chronicle `0x4f767c3`.
- [x] Context diet 2 (2026-09-17): chronicle index no longer included in every session; new lessons = rule + pointer — chronicle `0x6aaede9`.
- [ ] Next: user decision — **HK-015** (player-facing bugs; items 1–2 are gameplay changes; + a dropped Keystone loses its flag), **HK-013** (8 long methods left), O1 (HeadlessRunner DSL), WF-006 (Low, at the next cadence review).

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
