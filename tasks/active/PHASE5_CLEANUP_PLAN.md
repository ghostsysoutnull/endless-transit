# Phase 5 Cleanup Plan — Post-migration Residue
**Created:** 2026-03-18
**Depends on:** Phase 5 ✅
**Suite baseline:** 118 discovered / 113 pass / 5 skipped / 0 failed

---

## Goal

Two residual artifacts from the Phase 5 migration need removal:

1. **Stale domain docs** — `model/CLAUDE.md` and `model/GEMINI.md` still instruct agents to
   use `ModelOutput.fmt`, a class that no longer exists. Any future agent session reading these
   invariants would try to use a deleted API.

2. **Vestigial `getEffectiveFmt()` getter** — Named during the migration period to convey
   "formatter with static fallback." The fallback is gone. The getter now just returns `fmt`.
   The name is misleading and adds a layer of indirection with no value. 113 call sites across
   14 model classes call `effectiveFmt` where they could call `fmt` directly.

**Prime directive:** Zero behavioral change. Same seed → same world. Same inputs → same outputs.

---

## Mandatory rules

- `./vinc.sh --compile` after **every single file change** (CODEX mandate Phase 5+)
- `./vinc.sh --test --agent` after every commit
- Max 5 production files per commit
- Every modified class keeps `@CompileStatic`
- If anything fails to compile: **stop, revert, re-plan**

---

## Commits

### Commit 1 — Fix stale domain invariants
**Status:** `[ ] TODO`
**Files:** `model/CLAUDE.md`, `model/GEMINI.md` (2 doc files — no groovy, no compile needed)

- [ ] `CLAUDE.md` line 10: replace `The model MUST NOT import from com.endlesstransit.ui. Use ModelOutput.fmt.`
  with: `The model MUST NOT import from com.endlesstransit.ui. Use the injected OutputFormatter fmt field (set by ProceduralFactory).`
- [ ] `CLAUDE.md` line 21: replace `All Renderable objects MUST use ModelOutput.fmt.`
  with: `All Renderable objects MUST use the injected fmt field via effectiveFmt (Container/AbstractLeafLocation base classes).` → after Commit 6, update to `via fmt directly`.
- [ ] Same two changes in `GEMINI.md`

> **Note:** Commit 1 doc will say `via effectiveFmt` because the getter still exists at this
> point. After Commit 6, a final one-line update changes it to `via fmt directly`. Alternatively,
> write the final state now and accept it's ahead of the code by 5 commits — both are safe.

**No compile gate needed (doc-only). No test gate needed.**

---

### Commit 2 — Rename: Room, Building (heaviest files)
**Status:** `[ ] TODO`
**Files:** `Room.groovy` (35 sites), `Building.groovy` (27 sites) — 2 production files

For each file:
- [ ] Replace all `effectiveFmt` with `fmt` (`replace_all: true`)
- [ ] `./vinc.sh --compile` after each file
- [ ] `getEffectiveFmt()` getter in base classes is **not removed yet** — the two-step ensures
  no intermediate compile failure

**Inner-loop gate:** `./vinc.sh --compile` per file. Full suite after both.

---

### Commit 3 — Rename: Floor, Street, Corridor
**Status:** `[ ] TODO`
**Files:** `Floor.groovy` (14 sites), `Street.groovy` (10 sites), `Corridor.groovy` (6 sites) — 3 files

- [ ] Replace all `effectiveFmt` with `fmt` in each file
- [ ] `./vinc.sh --compile` after each

**Inner-loop gate:** `./vinc.sh --compile` per file. Full suite after all 3.

---

### Commit 4 — Rename: NullSector, Planet, Apartment, Country, City
**Status:** `[ ] TODO`
**Files:** `NullSector.groovy` (5), `Planet.groovy` (4), `Apartment.groovy` (4), `Country.groovy` (2), `City.groovy` (2) — 5 files

- [ ] Replace all `effectiveFmt` with `fmt` in each file
- [ ] `./vinc.sh --compile` after each

**Inner-loop gate:** `./vinc.sh --compile` per file. Full suite after all 5.

---

### Commit 5 — Rename: Universe, SolarSystem, GalacticSector, CosmicFilament
**Status:** `[ ] TODO`
**Files:** `Universe.groovy` (1), `SolarSystem.groovy` (1), `GalacticSector.groovy` (1), `CosmicFilament.groovy` (1) — 4 files

- [ ] Replace all `effectiveFmt` with `fmt` in each file
- [ ] `./vinc.sh --compile` after each
- [ ] Confirm zero `effectiveFmt` remain in call-site files: `grep -r "effectiveFmt" src/main/groovy/ --include="*.groovy"`

**Inner-loop gate:** `./vinc.sh --compile` per file. Full suite after all 4.

---

### Commit 6 — Remove getter from base classes + finalize docs
**Status:** `[ ] TODO`
**Files:** `Container.groovy`, `AbstractLeafLocation.groovy` (2 files); also update the doc line in `CLAUDE.md`/`GEMINI.md` if written as "via effectiveFmt" in Commit 1

- [ ] Delete `protected OutputFormatter getEffectiveFmt() { fmt }` from `Container`
- [ ] Delete `protected OutputFormatter getEffectiveFmt() { fmt }` from `AbstractLeafLocation`
- [ ] `./vinc.sh --compile` after each deletion
- [ ] Confirm zero `effectiveFmt` / `getEffectiveFmt` in entire source: `grep -r "effectiveFmt" src/`
- [ ] If Commit 1 docs said "via effectiveFmt", update to "via fmt directly"

**Final gate:** Full suite must pass. Count must be 118/113/5/0.

---

## Verification Gates

| Gate | Command | When |
| :--- | :--- | :--- |
| Compile | `./vinc.sh --compile` | After every single file edit |
| Logic (full) | `./vinc.sh --test --agent 2>/dev/null` | After every commit |
| Zero residue | `grep -r "effectiveFmt" src/` | Before Commit 6 (call sites) and after (getters) |

---

## Call-site inventory

| File | Sites | Commit |
| :--- | :--- | :--- |
| `Room.groovy` | 35 | 2 |
| `Building.groovy` | 27 | 2 |
| `Floor.groovy` | 14 | 3 |
| `Street.groovy` | 10 | 3 |
| `Corridor.groovy` | 6 | 3 |
| `NullSector.groovy` | 5 | 4 |
| `Planet.groovy` | 4 | 4 |
| `Apartment.groovy` | 4 | 4 |
| `Country.groovy` | 2 | 4 |
| `City.groovy` | 2 | 4 |
| `Universe.groovy` | 1 | 5 |
| `SolarSystem.groovy` | 1 | 5 |
| `GalacticSector.groovy` | 1 | 5 |
| `CosmicFilament.groovy` | 1 | 5 |
| **Total** | **113** | |
| `Container.groovy` (getter) | — | 6 |
| `AbstractLeafLocation.groovy` (getter) | — | 6 |

---

## Risks and mitigations

| Risk | Mitigation |
| :--- | :--- |
| `replace_all` misses a site (indentation mismatch) | Verify with `grep` after each file; compile catches any missed call |
| Getter removed before all call sites updated | Order is enforced: Commits 2–5 (call sites) always before Commit 6 (getter) |
| `fmt` field shadowed or ambiguous in some subclass | Compile will catch; `@CompileStatic` makes field/method resolution explicit |
| Test constructs model object directly and calls `effectiveFmt` indirectly | Zero test usages confirmed: `grep -r "effectiveFmt" src/test/` returned empty |

---

## Progress summary

| Commit | Description | Status |
| :--- | :--- | :--- |
| 1 | Fix stale domain docs | `[ ]` |
| 2 | Rename call sites: Room, Building | `[ ]` |
| 3 | Rename call sites: Floor, Street, Corridor | `[ ]` |
| 4 | Rename call sites: NullSector, Planet, Apartment, Country, City | `[ ]` |
| 5 | Rename call sites: Universe, SolarSystem, GalacticSector, CosmicFilament | `[ ]` |
| 6 | Remove getter from Container + AbstractLeafLocation | `[ ]` |
