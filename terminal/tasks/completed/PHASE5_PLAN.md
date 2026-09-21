# Phase 5 Plan — Dependency Injection: ModelOutput.fmt
**Created:** 2026-03-18
**OOA Item:** 1.2
**Depends on:** Phase 4 ✅, Phase 0.5d (`LocationRenderingTest`) ✅
**Pre-flight checklist:** `tasks/active/PRE_PHASE5_CHECKLIST.md` — all gates cleared ✅
**Suite baseline:** 118 discovered / 113 pass / 5 skipped / 0 failed

---

## Goal

Eliminate the `ModelOutput.fmt` Service Locator anti-pattern. Every model class currently
reaches for a global static field at render time. After this phase, `OutputFormatter` is
an instance field injected via constructor — no class touches `ModelOutput.fmt` directly.

**Prime directive:** Zero behavioral change. Same seed → same world. Same inputs → same outputs.

---

## Context

### What ModelOutput.fmt is

```
model/OutputFormatter.groovy     ← interface (lives in model package)
model/ModelOutput.groovy         ← static field holder: `static OutputFormatter fmt`
ui/StandardTerminalAdapter.groovy  ← primary implementation
ui/GlitchedTerminalAdapter.groovy  ← anomaly/abyssal implementation
```

### Current wiring (two assignment sites — both must be removed)

```
Main.groovy:13   ModelOutput.fmt = new StandardTerminalAdapter()
Game.groovy:30   ModelOutput.fmt = new StandardTerminalAdapter()   ← duplicate
```

### Call-site summary (17 files)

| Package | Files | Count |
| :--- | :--- | :--- |
| `model` | Room, Apartment, Corridor, Floor, Building, Street, City, Country, Planet, SolarSystem, GalacticSector, NullSector, CosmicFilament, Universe | 14 |
| `core` | ScanCommand, Game | 2 |
| root | Main | 1 (assignment only) |

### Injection chain (lazy — ProceduralFactory is the critical path)

```
Main
  └─ new StandardTerminalAdapter() → fmt
  └─ new Game(fmt)
       └─ ProceduralFactory(fmt)
            └─ create*(fmt) → new Universe(fmt) → populateChildren()
                 └─ create*(fmt) → new CosmicFilament(fmt) → ...
                      └─ ... → new Room(fmt)
```

Every location is created lazily by `ProceduralFactory`. Once `Container` and
`AbstractLeafLocation` hold `fmt` as an instance field, `ProceduralFactory` is the
single place that threads it through the hierarchy.

---

## Mandatory rules for this phase

- `./vinc.sh --compile` after **every single file change** (CODEX mandate for Phase 5+)
- `./vinc.sh --test --agent` after every commit
- `./vinc.sh --scan` before first file change (done ✅) and after final commit
- Max 5 production files per commit
- Every new or modified class keeps `@CompileStatic`
- If anything fails to compile: **stop, revert, re-plan** — do not push through

---

## Commits

### Commit A — Base classes: add `fmt` field (no callers updated yet)
**Status:** `[ ] TODO`
**Files:** `Container.groovy`, `AbstractLeafLocation.groovy` (2 files)

- [ ] Add `OutputFormatter fmt` instance field to `Container`
- [ ] Add `OutputFormatter fmt` instance field to `AbstractLeafLocation`
- [ ] Do **not** update constructors yet — this commit only adds the field
- [ ] All existing `ModelOutput.fmt` call sites in subclasses are untouched
- [ ] Suite must still pass (field is unused, static calls still work)

**Inner-loop gate:** `./vinc.sh --compile` after each file. Full suite after both.

---

### Commit B — ProceduralFactory: thread `fmt` through all `create*()` methods
**Status:** `[ ] TODO`
**Files:** `ProceduralFactory.groovy` (1 file — large but mechanical)

- [ ] `ProceduralFactory` receives `OutputFormatter fmt` (constructor or static param)
- [ ] Every `create*()` method receives `fmt` and passes it to `new XYZ(...)` constructor
- [ ] All `new XYZ(...)` calls in ProceduralFactory updated — constructors on the model
  side are **not** updated yet (they will ignore the extra arg until Commits C–E)

> **Note:** Groovy's dynamic dispatch allows passing extra constructor args temporarily
> while the model classes are partially migrated. Verify with `--compile` first.
> If @CompileStatic causes issues, use the inner-loop test mode per-file.

**Inner-loop gate:** `./vinc.sh --compile` after the edit. Full suite after.

---

### Commit C — Macro containers group 1 (update constructors to accept + store `fmt`)
**Status:** `[ ] TODO`
**Files:** `Universe.groovy`, `CosmicFilament.groovy`, `GalacticSector.groovy`, `NullSector.groovy`, `SolarSystem.groovy` (5 files)

For each file:
- [ ] Add `OutputFormatter fmt` to constructor(s)
- [ ] Assign `this.fmt = fmt` (inherited from `Container`)
- [ ] Replace all `ModelOutput.fmt` usages in this file with `fmt`

**Inner-loop gate:** `./vinc.sh --test CosmicFilamentTest --agent` (or equivalent) per file.
Full suite after all 5.

---

### Commit D — Macro containers group 2
**Status:** `[ ] TODO`
**Files:** `Planet.groovy`, `Country.groovy`, `City.groovy`, `Street.groovy`, `Building.groovy` (5 files)

For each file:
- [ ] Add `OutputFormatter fmt` to constructor(s)
- [ ] Assign `this.fmt = fmt`
- [ ] Replace all `ModelOutput.fmt` usages with `fmt`

**Inner-loop gate:** Full suite after all 5.

---

### Commit E — Micro containers + leaf (the player-facing layer)
**Status:** `[ ] TODO`
**Files:** `Floor.groovy`, `Corridor.groovy`, `Apartment.groovy`, `Room.groovy` (4 files)

For each file:
- [ ] Add `OutputFormatter fmt` to constructor(s)
- [ ] Assign `this.fmt = fmt` (Container subclasses) or `this.fmt = fmt` (Room via AbstractLeafLocation)
- [ ] Replace all `ModelOutput.fmt` usages with `fmt`

**Targeted checks:** `LocationRenderingTest`, `RoomAncestorTest`, `TracePersistenceTest`
**Inner-loop gate:** Full suite after all 4.

---

### Commit F — Core call sites + Main wiring
**Status:** `[x] DONE`
**Files:** `Game.groovy`, `ScanCommand.groovy`, `Main.groovy` (3 files)

- [ ] `Game.groovy`: remove `ModelOutput.fmt = ...` assignment (line 30); receive `fmt` via
  constructor and pass to `ProceduralFactory`
- [ ] `ScanCommand.groovy`: receive `OutputFormatter` (likely via `Game` or constructor);
  replace `ModelOutput.fmt` usages with local reference
- [ ] `Main.groovy`: instantiate `new StandardTerminalAdapter()` once, pass to `new Game(fmt)`;
  remove the `ModelOutput.fmt =` assignment (line 13)

**Targeted checks:** `SurvivalPinningTest`, `SpectralFrequencyContractTest`
**Inner-loop gate:** Full suite after all 3.

---

### Commit G — Remove static field
**Status:** `[x] DONE`
**Files:** `ModelOutput.groovy` (1 file)

- [ ] Confirm zero remaining `ModelOutput.fmt` usages: `grep -r "ModelOutput\.fmt" src/`
- [ ] Remove `static OutputFormatter fmt` from `ModelOutput.groovy`
- [ ] Either delete `ModelOutput.groovy` entirely (if now empty/unused) or repurpose
- [ ] Full suite must pass
- [ ] `./vinc.sh --scan` — visual baseline comparison

**This commit is the final gate. Do not proceed to Phase 6 until it is green.**

---

## Verification Gates

| Gate | Command | When |
| :--- | :--- | :--- |
| Compile | `./vinc.sh --compile` | After every single file edit |
| Logic (inner loop) | `./vinc.sh --test ClassName --agent 2>/dev/null` | During multi-file commits |
| Logic (full) | `./vinc.sh --test --agent 2>/dev/null` | After every commit |
| Visual | `./vinc.sh --scan` | Before Commit A (done ✅) and after Commit G |

---

## Risks and mitigations

| Risk | Mitigation |
| :--- | :--- |
| `@CompileStatic` rejects partial migration state | Use `--compile` after each file; revert immediately on failure |
| ProceduralFactory update breaks lazy population | Full suite after Commit B; `DeterministicUniverseTest` must pass |
| `GlitchedTerminalAdapter` path missed | Grep for both adapter classes after Commit G |
| `Game.groovy` duplicate assignment leaves stale static | Verify with grep before Commit G |
| Test `HeadlessRunner` or `Terminal.initialize` sets `ModelOutput.fmt` independently | Grep test sources for `ModelOutput.fmt` before Commit G |

---

## Progress summary

| Commit | Description | Status |
| :--- | :--- | :--- |
| A | Base classes get `fmt` field | `[x]` |
| B | ProceduralFactory threads `fmt` | `[x]` |
| C | Macro containers group 1 (Universe→SolarSystem) | `[x]` |
| D | Macro containers group 2 (Planet→Building) | `[x]` |
| E | Micro containers + Room | `[x]` |
| F | Core call sites + Main wiring | `[x]` |
| G | Remove static field | `[x]` |
