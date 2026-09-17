# Housekeeping Backlog
**Purpose:** Small, bounded code-quality items that were out of scope for the phase that found them.
Each is a candidate for a standalone housekeeping commit between phases (see "clear the improvement
backlog between phases" in `tasks/lessons/infrastructure.md`). Not workflow items — those go to
`docs/analysis/WORKFLOW_BACKLOG.md`.

**Process:** Open item → pick up between phases → plan, `/grill`, execute → mark CLOSED with commit.

---

## 🔴 OPEN

### HK-016 — Procedural variety: objects, furniture and atmosphere repeat; three room lines collapse to one string
**Found:** 2026-09-16, user report while playing ("lack of variation in the objects on the rooms"), confirmed and widened by
`docs/analysis/VARIETY_AUDIT.md` (six seeds, 1,354 rooms; 200-seed distribution probe). **Content phase, not a refactor** — every
step changes generated worlds (procgen snapshots + goldens move), so it runs on its own branch with its own pins; user decision on
scope before starting.
- **Objects/furniture** (`ThemeService.generateHybridObject`, `ApartmentFactory.groovy:44,55`, `RoomFactory.groovy:57-60`): one
  generator for both, 8 × 8 items × 2 phrasings, timeline fixed per planet and two cultures per planet → ≤ 256 strings per planet;
  measured 143–198 distinct of 283–719 in six floors, 25–40 % of apartments repeat an object, some rooms list one twice.
- **Atmosphere** (`ThemeService.groovy:85-93`, silent fallback): no structures file for Industrial/Commercial → `a spatial cell` in
  every room of ⅓ of countries (1,105/1,354 sampled); no lighting for digital/future/atomic/entropic → `a dim, flickering glow`
  on 52 % of planets; no walls for gilded/rust/shogun/void/zenith → monolith walls.
- **Room names** (`NameGenerator.groovy:100-120`): lexicon for 6 of 10 cultures (shogun/gilded/zenith get monolith names); 64 real
  names per culture, uniqueness comes from the hex serial and does not count. **Doors**: 56 briefs, 2–3 identical per corridor.
  Corridor/floor/apartment/building descriptions are single templates.
- **Plan (audit §4), in this order:** (1) fill the missing resource files + log when a fallback fires; (2) shuffled-deck dealing,
  furniture ≠ objects, timeline drift like culture drift, more phrasings, category-based room names, description variants;
  (3) grow lists (8 → ~16 items, 5 → ~10 atmosphere, lexicons ~12×12, doors ~12/12). Step-0 pins listed in the audit.
  Gates: `DeterministicUniverseTest`, `--scan` seed 0 → 9, reviewed golden/snapshot regeneration, guide/manual edited in the same commit.
- **Step 1 CLOSED (2026-09-16, branch `content/hk-016-step1`, `a467a5e`…`4464ddf`, plan `tasks/completed/HK_016_STEP1_PLAN.md`):** 4 lighting, 3 structures
  (incl. the glitch key `Singularity`), 5 walls, 4 lexicons (8+8) filled; `names/buildings/index.txt` enumerates the lexicon (the list was
  hard-coded); `[THEME_WARN]` on any fallback; glitch key `"Abyssal"` → `"abyssal"` (it matched no file — 1 glitched room in 80 said
  `a spatial cell` regardless); `ThemeResourceCoverageTest` (RED on the old tree). Probe: lighting/structure fallbacks 0 on all six seeds;
  walls distinct 12/17/19/13/18/11 (was 10/17/10/11/14/11), structure distinct 8/13/12/9/14/8 (was 6/9/1/1/1/1). One literal + goldens 16/30
  moved, as planned. Found and fixed first: **HK-017** (pane wrap width). **Steps 2 and 3 OPEN.**

### HK-015 — Player-facing bugs surfaced by the Player's Guide (five items, one commit each)
**Found:** 2026-09-16, chronicle `0x9c4e17d`, while reading the source to write `docs/terminal/guide/players_guide.md`. The guide
documents all five publicly ("Known quirks" and "Spoilers and exploits"), each labelled "may be fixed later"; after any fix, edit the
guide in the same commit so it stays true. Items 1 and 2 change gameplay — **user decision required** before touching them.
1. **Passive room roll repeats.** `Room.processAction` (`model/Room.groovy:70`) seeds from `locus.branch("ACTION").branch(player.stepCount)`,
   and `stepCount` only advances on navigation (`core/NavigationCommand.groovy:35`). A 30% hit therefore repeats, with the same value,
   on every prompt spent standing still — unlimited identical "Hidden Frequency" items for 1 coherence each, and each one marks the
   floor sampled for the ritual. Fix needs a per-prompt component in the seed (or a once-per-visit flag); pin with a test that stands
   still N prompts and asserts at most one capture.
2. **`m 1 1` is free coherence.** `QuantumBufferController.groovy:44` grants `adjustCoherence(15)` after `Player.mergeItems`, whose
   guards (`core/Player.groovy:70-71`, same index / out of range) return silently. Make `mergeItems` report success (boolean or the
   hybrid) and grant only on success; pin: `m 1 1` leaves coherence unchanged.
3. **`run.sh --seed` is inert.** `run.sh:25` advertises it; `Main.groovy:10` is `new Game()` and never reads `args`. Parse `--seed <long>`
   in `Main` and pass it to `Game(long)`. Pin: headless launch with a seed produces the pinned seed-4660 street.
4. **`q` is unbound.** `RenderingCoordinator.groovy:40` prints `q: Terminate`; `TurnProcessor.groovy:30-43` has no `q`. Either alias `q` →
   `quit` in `InputHandler.normalize` or drop it from the help line.
5. **Null Reach echo scan needs capital `S`.** `NullSector.groovy:90` offers `s. Scan for spectral echoes`, but lowercase `s` is taken by
   the global scan first (`TurnProcessor.groovy:80`). Rename the option key (e.g. `e.`) — do not change the global table.
Also noted, lower value: `Door.visited` is never set (`Door.groovy:57` prefix is dead); `CaptureCommand.groovy:32` says `/screenshots/`
(real dir is relative); `NullSector.groovy:91` uses an unseeded `new Random()` (the only non-deterministic roll in the engine).

### HK-013 — Nine production methods exceed 50 lines (held in the lint baseline)
**Found:** O2 (`./vinc.sh --lint`), 2026-09-16. `MethodSize` (max 50) flags: `ScanCommand.renderCorridorScan` (75) /
`renderApartmentScan` (52), `SyncManager.restore` (64), `Room.getOptions` (103), `Building.getExtraContent` (84),
`SessionRecap.show` (56), `LatticeMapComponent.render` (52), `LatticeTraceComponent.renderTrace` (63), `HUDHeaderComponent.render` (90).
They are the only entries in `config/lint/baseline.xml`; each entry carries the method's current length, so the first edit to any
of them resurfaces the violation — pay it down then, or in a bounded housekeeping commit (extract by script, reverse-substitution
check, goldens as the gate for the four `ui` methods). Regenerate the baseline with `./vinc.sh --lint --baseline` and commit the
shrunken file with the change.

## 🟢 CLOSED

### HK-017 — Narrative pane wrapped to 88 columns; the split box holds 86 (every pane-wide row ended in `...`)
**Found:** 2026-09-16, HK-016 step-1 plan grill (simulation of the new Industrial structure line wrapped the room sentence and the
first line ended `The walls are g...`). `FrameGeometry.LEFT_PANE_WIDTH` was `SPLIT_POINT - 2` (88) while `Terminal.splitBoxedLine`
keeps `splitPoint - 4` (86) on the left — measured: 86 fits, 87–88 truncated. Pre-existing on every frame: the dashed separator,
the two-column building/filament lists and the room's `RESONANCE: [STA...` were all laid out at 88 and cut.
**Resolution (`54f3f19`, branch `housekeeping/hk-017-pane-wrap`):** `LEFT_PANE_WIDTH = SPLIT_POINT - 4`; pin `FrameGeometryContractTest`
(pane-wide line survives the box; a wrap landing on the limit is never truncated; both red on the old constant); 12 goldens regenerated,
44 changed lines, every one the artifact disappearing. **Noted, not fixed:** `RIGHT_PANE_WIDTH` (38) is also one wider than the box keeps
(37) and `boxedLine`/`splitBoxedLine` truncate one column short of the physical capacity everywhere — the telemetry pane never wraps and
sizes at `width - 4`, so it is unreachable today; if a right-pane row ever reaches 38 columns, align `ansiSafeTruncate`'s inner widths
with the physical columns (left `splitPoint - 3`, right `width - splitPoint - 2`) rather than shrinking the pane again.

### HK-014 — Manual and codex stated numbers the code contradicts, and omitted half the world's catalogue
**Found:** 2026-09-16, chronicle `0x9c4e17d`. Ten claims in `docs/terminal/manual/` and `docs/terminal/codex/` disagreed with the source
(16-slot cap, +30% stabilized merge, 0.5x/2.0x era table, consonant values 10–50, item "shatter", ritual = 70% floors + 7 resonant
fragments, `target [ID]`, 5% per move below bedrock, "drains per step", `⬚` for sector). User review added the gaps: the codex named
6 of 10 cultures, 5 of 8 eras (two of them nonexistent), none of the 6 country traits, no `ATMOS_SHIFT`/`Sector Mutation`, and the
atlas invented floor zones.
**Resolution:** 11 pages corrected in the in-fiction voice, facts only: drain per pulse (1/2/4), +15 flat, ordinal Gematria with a
recomputed worked example (Rust Piston = 1512/1663 Hz, not stabilized), the real ritual recipe (every floor + 7 syntheses inside,
keystone on the 8th, 0 Hz, consumed by `j`), unbounded buffer with the two drop semantics, hybrid naming, Null Reach echo (capital `S`),
landmarks 1-in-25 / 1-in-12 with no special loot, endless layers with pressure saturating at −10. Atlas gains sections for the ten
cultures (six Great, four Minor with borrowed Monolith geometry), eight eras, six traits (with `ATMOS_SHIFT` = `Sector Mutation` =
trait), and the fifteen height-based floor zones. Codex gains four Minor Culture entries and a `[DIAGNOSTIC_READOUTS]` glossary;
map/waveform glossaries trimmed to the symbols that exist (`¤`, `[■]`, `-------`, `○`-as-visited removed). Guide gains an
`ATMOS_SHIFT` + floor-zone paragraph. Not touched: `installation_guide.md`, `system_initialization.md`, `system_specifications.md`,
`lip_addressing.md` (no contradictions found).
**Closed:** 2026-09-16 | docs only | link crawl green after Pages build

### HK-008 — `ProceduralFactory.instance` was a static singleton
**Found:** Phase 9 retro "Concerns", 2026-09-11 (OOA report §3.4 / §4 — singleton access noted in the original analysis).
Phase 9 did not touch injection; fourteen per-type factories now hang off `ProceduralFactory.groovy:21`
(`static ProceduralFactory instance = new ProceduralFactory()`), and `Game.groovy:33` injects `fmt` into the singleton
after construction. Tests cannot swap the factory without mutating static state.
**Resolution (three production commits, facade-first):** **c3** — `ProceduralFactory(OutputFormatter)` stamps itself on every container its delegators hand out (`Container.factory`); `Container.populateChildren()` and `Building` ask it; a hand-built container with no factory fails loud naming its class; 12 tests wire their hand-built objects as they already wire `fmt`. **c4** — `Game.factory` (final) is built with the game's `fmt` and injected into `NavigationOrchestrator` and `PersistenceService`; `WorldGenesis.createInitialWorld` and `SyncManager.restore` take it as a parameter. **c5** — the static is deleted, `fmt` is final, `SeedScanner` owns a factory with a real adapter (`LandmarkDiscoveryTest` no longer depends on test order). `FactoryWiringContractTest` (A: step-0 fmt identity, passes on `master`; B: factory identity + fail-loud; C: ownership, two games never share one). `GameState` and the 14 per-type factories untouched. Plan: `tasks/completed/HK_008_PLAN.md`.
**Closed:** 2026-09-16 | commits 2d6978e (plan), ad80a18 (pin), d3cd6f2 (c3), d3d7d66 (c4), 2d3cac3 (c5) | suite 213/213/0/0, 36 goldens unchanged, scan seed 0 → 9

### HK-012 — The test suite overwrote and deleted the player's save file
**Found:** 2026-09-16, from a user report ("restored my last session and got another world"). `transit.log` showed three
test-run sync/restore pairs at seeds 55555/77777 between the user's sessions. `TracePersistenceTest` (since `02b0748`, March 5)
and `CorridorPersistenceTest` (Phase 0.5a) wrote the real `session.trace`; `HeadlessRunner` (since `25ad897`, March 12) deleted
it before every headless run. Gitignored, so `git status` never showed it.
**Resolution:** `Game.saveFile` (default `SyncManager.SAVE_FILE`) is the one path for prompt, sync and restore; `SyncManager.restore`
and `PersistenceService.restoreSession` take it as a parameter. Both persistence tests round-trip through a temp file and assert the
real file's existence, size and mtime are unchanged; the runner points its game at a nonexistent temp path. Verified: the real save
was byte-for-byte and mtime-identical across a full suite run. Lesson in `tasks/lessons/infrastructure.md`. Plan: `tasks/completed/HK_012_PLAN.md`.
**Closed:** 2026-09-16 | commits a854684 (plan), dc1d0a3 (fix)

### HK-011 — `JournalManager` was all-static
**Found:** Phase 10 plan, 2026-09-16. Session state, file I/O, `getRecentEvents` (read by the HUD ticker) and `reset()` were static.
**Resolution (three commits):** **a** — `RenderContext.recentEvents` (defaulted fifth field); `HUDHeaderComponent` reads it, the
compositor supplies it (`HUDHeaderComponent.TICKER_DEPTH = 3`). **b** — `JournalManager` is an instance (`@CompileStatic`; `journalFile`/
`lastEntryFile` properties; instance `reset()` kept as the test mirror of `startSession`); `Game.journal` (final) attaches it before
`RitualTracker`, starts the session, hands it to `RenderingCoordinator` → `BridgeView(journal)`; `QuitCommand` saves through
`game.journal`; `BridgeView()` without a journal gets an inert one. No static journal call remains. **c** (visual, user decision) —
the ticker feed carries the location's *name* (`LOC: The Void-Watcher`); the journal file keeps the full path + vibe suffix;
goldens 13–18 regenerated (line 7 only). Declared: `.journal_session_tmp` stays one shared path. Plan + grill: `tasks/completed/HK_011_PLAN.md`.
**Closed:** 2026-09-16 | commits 84e5997 (plan), 5c0c0f2 (a), ea5cdcf (b), 90cbede (c)

### HK-009 — `populateApartment` was the last per-type populate delegator on the facade
**Found:** HK-005 close-out, 2026-09-16. Two tests called it directly (`ObjectDistributionTest:22`, `ProcgenVariabilityTest:29`).
**Resolution:** delegator deleted; both tests read `apt.rooms` and let `Container.populateChildren()` → `populate(Container)`
fill the apartment. **Finding (verified by script before the change):** the explicit call populated every apartment *twice* —
inside `ApartmentFactory.populate` the first lazy read of `a.rooms` fired a nested populate, so room counts were all even
(544 rooms across 50 apartments vs 272 lazy-only). Test-only; neither test asserted absolute counts. Variance assertions hold
on the single-population shape. `grep populateApartment src/` → 0. Plan + grill record: `tasks/completed/HK_009_PLAN.md`.
**Closed:** 2026-09-16 | commits 05ec641 (plan), 6a7c813

### HK-010 — Discovery journaling has been dead in production since 2026-03-05
**Found:** Phase 10 pre-plan read, 2026-09-16. `JournalManager.logDiscovery` lost its only caller in `7930dc3` when path
tracking moved into `Player.markFootprint`; `[DISCOVERY]`/`[LOC]` lines, `Network Expansion` and `LOC:` ticker lines had
no producer for six months. **User decision 2026-09-16: restore it** (behavior change, own branch).
**Resolution:** `Player.markFootprint` publishes `LocationDiscovered` once per path new to `visitedPaths` (macro only);
`JournalManager.attach` subscribes it to `logDiscovery`. Named `LocationDiscovered`, not `LocationEntered`: it fires once
per new path, and the ancestor loop discovers a City/Planet the player never entered. `DiscoveryEventContractTest` (4 pins,
RED on the old code). `HudFrameHarness` resets the journal *after* `new Game` (mirrors `startSession`); goldens 13–18
regenerated — first ticker line only. Declared: the 37-char ticker pane truncates every `LOC:` line to
`LOC: Universe > ... > [VOID] > Lam...` (March contract; a name-based ticker line is a separate HUD decision).
Plan + grill record: `tasks/completed/HK_010_PLAN.md`.
**Closed:** 2026-09-16 | commits 6590c97 (plan), 06ed2d4

### HK-005 — `Container.populateChildren()` overrides still named their `populateX` method
**Resolution:** `Container.populateChildren()` defaults to `ProceduralFactory.instance.populate(this)`; the 13 one-line
overrides and 12 `ProceduralFactory` imports are gone (`Building` keeps its import for `createFloor`/`countSubLocations`).
Three batches (5/5/4 model files), then the 12 orphaned facade delegators deleted (198 → 154 lines); `populateApartment`
retained for two test callers → HK-009. Declared edge: an unregistered `Container` subclass now fails loud on first lazy
access — pinned by `ProceduralFactoryRegistryTest.lazyAccess_unregisteredType_failsLoudOnFirstAccess`. 36 goldens unchanged;
scan seed 0 → 9 nodes. Plan + grill record: `tasks/completed/HK_005_006_PLAN.md`.
**Closed:** 2026-09-16 | commits 0332f9a, 9b5e7e3, 66a154f, 01d7f48

### HK-006 — Test hygiene in the procgen tree
**Resolution:** `ProcgenSnapshotTest` locals renamed for the level they hold (Planet → Country → City → Street) and the two
messages swapped; literals unchanged. `InitialScreenTest` unused import removed.
**Closed:** 2026-09-16 | commit 82c7253

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

