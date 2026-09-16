# Housekeeping Backlog
**Purpose:** Small, bounded code-quality items that were out of scope for the phase that found them.
Each is a candidate for a standalone housekeeping commit between phases (see "clear the improvement
backlog between phases" in `tasks/lessons/infrastructure.md`). Not workflow items — those go to
`docs/analysis/WORKFLOW_BACKLOG.md`.

**Process:** Open item → pick up between phases → plan, `/grill`, execute → mark CLOSED with commit.

---

## 🔴 OPEN

### HK-005 — `Container.populateChildren()` overrides still name their `populateX` method
**Found:** Phase 9o, 2026-09-11. The registry facade dispatches `populate(Container)` on the exact class, but the
13 model overrides (`Universe.groovy:80` … `Apartment.groovy:112`) still call `ProceduralFactory.instance.populateX(this)`
and each imports `ProceduralFactory`. A `Container.populateChildren()` default of `ProceduralFactory.instance.populate(this)`
removes 13 one-line overrides and 13 imports, and makes adding a location type a registry entry instead of an override.
**Shape:** 14 model files → three batches of ≤ 5 under the Refactor Guard; `ProceduralFactoryRegistryTest` +
`RoomAncestorTest:37` (every container non-empty) are the guards. Once migrated, the 13 `populateX` delegators on the
facade become dead and can go with their callers.

### HK-006 — Test hygiene in the procgen tree
**Found:** Phase 9 coverage audit, 2026-09-11. `ProcgenSnapshotTest.groovy:62-73` binds the Country to a local named
`city` and the City to `country` (messages say "City name" for `"Free Dust Kingdom"`, which is the Country). Literals are
correct; rename the locals and messages. `InitialScreenTest.groovy:5` imports `ProceduralFactory` and never uses it.

### HK-008 — `ProceduralFactory.instance` is still a static singleton
**Found:** Phase 9 retro "Concerns", 2026-09-11 (OOA report §3.4 / §4 — singleton access noted in the original analysis).
Phase 9 did not touch injection; fourteen per-type factories now hang off `ProceduralFactory.groovy:21`
(`static ProceduralFactory instance = new ProceduralFactory()`), and `Game.groovy:33` injects `fmt` into the singleton
after construction. Tests cannot swap the factory without mutating static state.
**Shape:** the Phase 9 back-reference design makes this a single-site change — construct the facade in `Game`, inject
`fmt` through the constructor, and pass the instance down. Blast radius is every `ProceduralFactory.instance` reader
(the 13 `populateChildren` overrides until HK-005 lands, plus core/procgen/test callers) — grep before planning; do
HK-005 first so the model side collapses to one `Container.populateChildren()` site. Not urgent; no behavior change.

---

## 🟢 CLOSED

### HK-007 — `populateFilament` rolled the NullSector chance once per filament, not per child
**Found:** Phase 9-0 capture, 2026-09-11 (seed 0x1234: 7/7 null). **History:** before the 2026-03-10 seed migration
(`e34acb4`) the loop advanced a stateful `Random` per iteration (`r.nextInt(10) < 3`); the migration replaced it with a
pure draw on the parent seed, silently making the roll per filament. A regression, not a design.
**Resolution:** `childLocus.branch("NULL_ROLL").checkProbability(0.3)`; `FilamentNullRollTest` guards the ~30 % rate and
within-filament mixing (0 of 283 mixed before, fails on the old code). Intentional world change: 14 goldens regenerated
and reviewed (seed 12345's sector is now a void — sector type/name, one null-lexicon building name, map glyphs, glitch
noise); `ProcgenDeepSnapshotTest` filament pin updated; everything below the sector at seed 0x1234 unchanged.
**Closed:** 2026-09-11 | commit f6f8fc8

### HK-001 — BridgeView draws randomness outside the seed chain
**Resolution:** `FrameEntropy.forFrame(ctx)` (location LIP × 31 + player step count) seeds the spectrogram,
abyssal static, void voices, map glitch plots and the description/trace glitches; `Terminal.glitchText`
gained a seeded overload. Goldens are compared raw (mask removed) and gained 7 frames incl. five at
bedrock. `./vinc.sh --goldens` twice → identical.
**Closed:** 2026-09-11 | commits f3a3d9e (HK-001a), 4cd13c0 (HK-001b)

### HK-002 — `GameState.inventoryController` is a service in a data container
**Resolution:** `QuantumBufferController` is built once in `Game` (`game.inventoryController`); `GameState`
holds data only. **Closed:** 2026-09-11 | commit fb8f092

### HK-003 — `Game.processInput()` duplicates `NavigationCommand.execute()`
**Resolution:** `TurnProcessor.dispatch(game, choice)` is the single "global command, else navigation" path;
`handleInput` and `Game.processInput` both call it. **Closed:** 2026-09-11 | commit dc5b1aa

### HK-004 — inventory overlay had no production caller
**Resolution:** one renderer. `InventoryOverlayComponent` gained item numbers and synthesis labels (the
format `Player.listInventory()` printed); `QuantumBufferController` shows it above the drop/merge
commands; `Player.listInventory()` deleted; `QuantumBufferScreenTest` pins the screen.
**Closed:** 2026-09-11 | commit d2bb2f6

<details><summary>Original entries</summary>

### HK-001 — BridgeView draws randomness outside the seed chain
**Found:** Phase 7 pre-grill, 2026-09-11
**Sites** (line numbers as of commit `1d3d570`; they move as components are extracted — search by method):
- `BridgeView.groovy:183` — abyssal void voices, `new Random()`
- `BridgeView.groovy:250` — `applyAbyssalStatic`, `new Random()`
- `BridgeView.groovy:354` — `generateSystemTelemetry` spectrogram, `new Random(System.currentTimeMillis() / 1000)`
- `BridgeView.groovy:556` — `renderLatticeMap` glitch at coherence < 30, `new Random()`
**Effect:** Same seed + same inputs ≠ same frame. `BridgeViewGoldenFrameTest` must mask the
spectrogram and cannot pin abyssal or low-coherence frames at all.
**Fix candidate:** seed from the game clock tick or `masterLocus.nextRandom()` (procgen law:
"Deterministic Component Engines"), then unmask the spectrogram and add abyssal goldens.
**Constraint:** Do NOT fix inside Phase 7 — zero behavior change. Pick up after Phase 7 merges.

### HK-002 — `GameState.inventoryController` is a service in a data container
**Found:** Phase 6 retro (`docs/retro/RETRO_PHASE_6.md`, "Concerns"). Candidate move:
`QuantumBufferController` → `TurnProcessor` or `Game`. No caller confusion today.

### HK-003 — `Game.processInput()` duplicates `NavigationCommand.execute()`
**Found:** Phase 6 retro. Both resolve a choice, bump `stepCount`, record it, call the closure.
Test-only path. Candidate: delegate one to the other.

### HK-004 — `BridgeView.renderInventoryOverlay` (now `InventoryOverlayComponent`) has no production caller
**Found:** Phase 7f pre-grill, 2026-09-11. The `i` command opens `QuantumBufferController.open()`, which
prints its own `[QUANTUM_TRACE_BUFFER_INTERACE]` screen; the `[QUANTUM_TRACE_BUFFER_SYNC...]` overlay is
reached only by the golden harness (frames 07, 19). Product decision: wire the overlay into the buffer
command (it is the richer render — signal bars and phase) or retire it and its two goldens. Not a
Phase 7 change (zero behavior change).

</details>

