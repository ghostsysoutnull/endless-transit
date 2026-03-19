# Pre-Phase 5 Checklist
**Created:** 2026-03-18
**Objective:** Clear all prerequisites before Phase 5 (Dependency Injection: ModelOutput.fmt) begins.
**Blocks:** `docs/analysis/OOA_REFACTOR_PLAN.md` — Phase 5

---

## Tasks

### T1 — Phase 4 backlog cadence review
**Priority:** Mandatory (CODEX: review at phases 1, 4, 7, 10)
**Status:** `[x] DONE`

Record the Phase 4 review in `docs/analysis/WORKFLOW_BACKLOG.md`.
Backlog is currently clean — no workflow session needed. The review note is the deliverable.

**Done when:** A Phase 4 review note appears in `WORKFLOW_BACKLOG.md`, mirroring the Phase 1 note.

---

### T2 — Visual scan baseline
**Priority:** Mandatory (CODEX: `./vinc.sh --scan` before AND after any phase touching model/ui)
**Status:** `[x] DONE`

Scan confirmed working post-classpath fix. Reference output:
- Seed 0 → `SUCCESS! Match found at seed: 0 — Node count: 9`

**Note:** `./vinc.sh --scan` is a world-seed finder, not a TUI renderer. The visual rendering
baseline lives in `BridgeViewStructureTest` and `LocationRenderingTest` (both already green at
118/113/5/0). Those are the post-phase diff targets for Phase 5.

---

### T3 — Phase 5a: ModelOutput.fmt call-site inventory
**Priority:** Mandatory (Phase 5a in OOA plan — analysis only, no code)
**Status:** `[x] DONE`

Grep `src/main/groovy` for every `ModelOutput.fmt` usage. For each call site, record:
- File path
- Method or context (constructor, `getDescription()`, `getExtraContent()`, etc.)

Output: a flat list in this doc (see section below) or a linked sub-document.

**Done when:** Every `ModelOutput.fmt` call site is listed with file + method context.

---

### T4 — Phase 5a: @PackageScope field audit
**Priority:** Mandatory (explicitly flagged in Phase 5a plan note)
**Status:** `[x] DONE`

Audit `@PackageScope` fields in `Building`, `Floor`, `Corridor` — and any other model class
that uses `ModelOutput.fmt`. For each field: document which classes access it, and whether
any *new* injected class (e.g. a component extracted in Phase 7) would need access across
package boundaries.

If any scope violation is found, log it here and resolve it before Phase 5 begins — do not
discover it mid-phase when a `@CompileStatic` compile fails.

**Done when:** All `@PackageScope` usages documented; any boundary issues flagged with a
resolution plan.

---

### T5 — Phase 5a: Injection chain diagram
**Priority:** Recommended
**Status:** `[x] DONE`

Trace and document the injection chain from `Main.groovy` down through `Game`, `ProceduralFactory`,
`populateChildren()` calls, and into every `Container` subclass and `AbstractLeafLocation`.

This determines commit ordering for Phase 5b/5c and makes the 5-file-per-commit slicing obvious
before the phase starts rather than during it.

**Done when:** The chain is written out here (even as a plain indented list).

---

## Findings

### T3 — ModelOutput.fmt call sites

**Model package — 13 files (these are the Phase 5 injection targets):**

| File | Methods using ModelOutput.fmt |
| :--- | :--- |
| `model/Room.groovy` | `processAction()`, `getExtraContent()`, `getOptions()`, `getDescription()` |
| `model/Apartment.groovy` | `getDescription()`, `getExtraContent()` |
| `model/Corridor.groovy` | `getExtraContent()` |
| `model/Floor.groovy` | `getDescription()`, `getElevatorDiagnostics()` (private) |
| `model/Building.groovy` | `breach()`, `getLatticeMeta()`, `enter()`, `getExtraContent()` |
| `model/Street.groovy` | `getExtraContent()` |
| `model/City.groovy` | `getLatticeMeta()`, `getExtraContent()` |
| `model/Country.groovy` | `getLatticeMeta()`, `getExtraContent()` |
| `model/Planet.groovy` | `getLatticeMeta()`, `getDescription()`, `getExtraContent()` |
| `model/SolarSystem.groovy` | `getExtraContent()` |
| `model/GalacticSector.groovy` | `getExtraContent()` |
| `model/NullSector.groovy` | `getExtraContent()` |
| `model/CosmicFilament.groovy` | `getExtraContent()` |
| `model/Universe.groovy` | `getExtraContent()` |

**Core package — 2 files (NOT model; Phase 5 plan does not cover these):**

| File | Context |
| :--- | :--- |
| `core/ScanCommand.groovy` | Door table and inventory scan table formatting (~14 usages) |
| `core/Game.groovy` | Unknown context — needs inspection before 5f |

**Wiring point:**
- `Main.groovy:13` — `ModelOutput.fmt = new StandardTerminalAdapter()` (the only assignment)
- `ModelOutput.groovy` — bare static field holder: `static OutputFormatter fmt`

**Key observation:** `ScanCommand` and `Game` (core) use the static field too. Phase 5 plan only
covers model injection. These two core call sites must be migrated in 5e or 5f before the static
field can be removed in 5f — or they become blockers.

---

### T4 — @PackageScope fields

All `@PackageScope` fields in the model package are **child-collection holders**:

| Class | Field | Type |
| :--- | :--- | :--- |
| `Building` | `floors` | `LazyLocusList<Floor>` |
| `Floor` | `corridor` | `Corridor` |
| `Corridor` | `doors`, `apartments` | `LazyLocusList<Door/Apartment>` |
| `Apartment` | `rooms` | `LazyLocusList<Room>` |
| `Street` | `buildings` | `LazyLocusList<Building>` |
| `City` | `streets` | `List<Street>` |
| `Country` | `cities` | `List<City>` |
| `Planet` | `countries` | `List<Country>` |
| `SolarSystem` | `planets` | `List<Planet>` |

**Phase 5 risk: NONE.** These fields are all accessed from within the `model` package (by
`Container` subclasses and `ProceduralFactory` via getters, not direct field access across
packages). Phase 5 adds an `OutputFormatter` parameter but does not move logic across package
boundaries or create new accessor classes in a different package. No boundary conflicts are
anticipated.

**Phase 7 note:** When `BridgeView` components are extracted to a likely `ui` package, they
will access model data through the `Location` public API — not through `@PackageScope` fields.
No scope violations expected then either.

---

### T5 — Injection chain

**Current wiring (static global):**
```
Main.groovy
  ModelOutput.fmt = new StandardTerminalAdapter()   ← single assignment
  new Game()
    ↓ (lazy, via ProceduralFactory)
  Universe → CosmicFilament → GalacticSector/NullSector → SolarSystem
    → Planet → Country → City → Street → Building → Floor
      → Corridor → Apartment → Room
```
Every node is created lazily by `ProceduralFactory` when its parent's `populateChildren()` is
first called. No node holds a reference to `OutputFormatter` — they all reach for the static
`ModelOutput.fmt` at render time.

**Phase 5 target wiring (constructor injection):**
```
Main.groovy
  OutputFormatter fmt = new StandardTerminalAdapter()
  new Game(fmt)                                      ← fmt flows in here
    → ProceduralFactory receives fmt
      → passed into every create*() call
        → stored on each Container / AbstractLeafLocation
          → used as `this.fmt` instead of ModelOutput.fmt
```

**Commit ordering implications:**

1. `Container` base class gets `OutputFormatter fmt` field — all subclasses inherit it
2. `ProceduralFactory` receives `fmt` and threads it through all `create*()` methods
   (this is the largest single change — ~14 factory methods need updating)
3. Each Container subclass group (update constructors to accept + pass `fmt`)
4. `AbstractLeafLocation` gets `fmt`; `Room` inherits
5. `Game.groovy` and `ScanCommand.groovy` — migrate the two core call sites
6. `Main.groovy` — becomes the single `new StandardTerminalAdapter()` instantiation point
7. Remove `ModelOutput.fmt` static field

**ProceduralFactory is the critical path.** It is the single factory for all 14 location
types. A single commit updating it has a high line count but low conceptual risk — it is
purely mechanical (add `fmt` param, pass it to `new XYZ(fmt, ...)`). This should be its
own atomic commit with a full suite run immediately after.

**5-file-per-commit plan sketch:**
- Commit A: `Container.groovy` + `AbstractLeafLocation.groovy` (base classes, field only)
- Commit B: `ProceduralFactory.groovy` (threads fmt through all create* methods)
- Commit C: macro containers group 1: `Universe`, `CosmicFilament`, `GalacticSector`, `NullSector`, `SolarSystem`
- Commit D: macro containers group 2: `Planet`, `Country`, `City`, `Street`, `Building`
- Commit E: micro containers: `Floor`, `Corridor`, `Apartment`, `Room`
- Commit F: core call sites (`Game`, `ScanCommand`) + `Main.groovy` wiring
- Commit G: remove `ModelOutput.groovy` static field (or repurpose class)

---

## Gate

All five tasks must be complete before the first production file in Phase 5 is touched.
Move this file to `tasks/completed/` when all tasks are checked off.

---

## Gate

All five tasks must be complete before the first production file in Phase 5 is touched.
Move this file to `tasks/completed/` when all tasks are checked off.
