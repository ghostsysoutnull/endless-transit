# HK-023 slice 1 — A save made below the Bedrock restores

**Created:** 2026-09-20 | **Grill:** AMEND (4 items) → applied → CLEARED | **Branch (proposed):** `housekeeping/hk-023-abyssal-restore` (from `master` @ dc66503)
**Status:** AUTHORIZED 2026-09-20 (Directive: "b + push" — execute c0–c3, merge `--no-ff`, `/close-wave`, push). Execution notes at the end.

## Context
A player who breaches a building, goes down to Layer −1 (or deeper) and saves cannot load that save.
Abyssal floors do not exist in a fresh world: `Building.getFloor` (`Building.groovy:253-256`) makes them on demand
and appends them after the normal floors, so the saved LIP ends in an index ≥ `maxFloors`. On load,
`Universe.resolveLIP` (`:61-66`) says "index out of bounds" and returns null; `SyncManager.restore:85-86` stores the
null unchecked; `PersistenceService.restoreSession:59` then dereferences it — an exception *outside* `restore`'s
try/catch. Layer footprints and Layer mutations are dropped the same way (`SyncManager:121-124, 130-133`).
It is the only HK-023 item that loses player progress. Today it is proven only by a scratchpad probe; no suite test exists.

**Outcome:** the save loads where the player stood, Layer footprints and mutations come back, and a save whose
location cannot be resolved is refused whole (like a corrupt save) instead of throwing.

## Scope
This wave = the restore bug only. **HK-023 stays OPEN**; its other 13 bullets are untouched and become later slices
(tally rules + tally not saved · map glyphs/colours-as-words · model calls `Terminal.clock` · dead `run.sh`/README/citations).

## What I read (this session)
- `Building.getFloor:248-259` — creates one Layer when asked, appends it. Every production caller asks in order
  (−1 first: `BreachBedrockCommand:20`, `ElevatorState:33,36`, the building menu loop `Building:267-268` from −1 to −5),
  so in every real save **Layer −k sits at child index `maxFloors + k − 1`**. Nothing enforces that order: a direct
  `getFloor(-3)` on a fresh breached building would give Layer −3 the index of Layer −1 (LIP invariant 1 at risk).
- Two LIP walkers own the same bounds rule: `Universe.resolveLIP:61-68` and the static `WorldGenesis.resolveLIP:38-43`
  (used only by the memento path, `PersistenceService:47`).
- `SyncManager.applyMutations:117-126` applies in save order (footprint order). After the fix a Layer LIP only resolves
  once its building's `isBreached` mutation has been applied — a new ordering dependency.
- `Floor.getMutationState:27-31` is never empty (`"state"`), so every visited Layer is in `mutations`.

## Coverage claims (assertions read today)
| Behavior | Guard | Evidence |
| :-- | :-- | :-- |
| Breach flag + infusion count survive a restore (player above ground) | `TracePersistenceTest` | `:100` `assertTrue(restoredBldg.isBreached…)`, `:101` `assertEquals(10, restoredBldg.infusionCount…)` |
| Corrupt / half-read save refused, game unchanged | `RestoreContractTest` | `:131-135`, `:152-155` |
| Footprints re-marked visited | `RestoreContractTest` | `:75` `assertTrue(restoredBuilding.isVisited()…)` |
| Layer −k ↔ child index `maxFloors + k − 1` | **UNGUARDED** | → pin P1 (step 0) |
| Out-of-range index on an *unbreached* building resolves to null, creates nothing | **UNGUARDED** | → pin P2 (step 0) |
| Save on a Layer restores | **UNGUARDED** (the bug) | → R1–R3 |
| Unresolvable `currentLIP` is refused without an exception | **UNGUARDED** (throws today) | → R5 |

## Commits (≤ 5 production files each; full suite + `--lint` after every one)
| # | What | Prod files | Gate |
| :-- | :-- | :-- | :-- |
| c0 | This plan → `tasks/HK_023_RESTORE_PLAN.md` | 0 | — |
| c1 | **Step-0 pins, green on master** — new `core/AbyssalRestoreContractTest` (scratch save file + "player's save untouched" guard copied from `RestoreContractTest:23-36`): **P1** breached building, Layers reached the way the menu does (−1, then −2): LIP of −1 ends `.<maxFloors>`, −2 ends `.<maxFloors+1>`; precondition `children.size() == maxFloors` before the first Layer. **P2** unbreached building: `universe.resolveLIP(bldgLip + "." + maxFloors)` and `WorldGenesis.resolveLIP(…)` are null and `children.size()` is still `maxFloors` | 0 | 292/292 |
| c2 | **The model fix.** `Container.childAt(int)` (bounds rule, one owner; null when out of range). `Building.childAt` override: when breached and `index >= maxFloors`, first `getFloor(maxFloors − 1 − index)`, then `super`. `Building.getFloor(n<0)` creates every missing Layer from −1 down to `n`, in order (seed per Layer stays `locus.branch(n)` — order-independent). `Universe.resolveLIP` and `WorldGenesis.resolveLIP` ask `container.childAt(i)` instead of indexing `children`. Pins, **shown RED on c1 first**: **R1** Layer −1 put in corridor mode, saved → fresh `Game(1L)` restore → same LIP, `number == −1`, `isAbyssal()`, `getMutationState().state == "CORRIDOR"` (a Layer's own mutation is applied). **R2** save in a Room under Layer −2 → same LIP; Layer −2 and Layer −1 `isVisited()`. **R3** fresh breached building, `getFloor(-3)` first → its LIP ends `.<maxFloors+2>` and `getFloor(-1)` ends `.<maxFloors>` | 4 | 295/295 · 36 goldens unchanged · scan 0 → 9 · `DeterministicUniverseTest` |
| c3 | **The restore guard.** `SyncManager.restore`: `current == null` → `RESTORE_FAILED` log naming the LIP and the seed, `return null`. Pin, **RED on c2 first**: **R5** a valid save with `currentLIP: "0.99.99"` → `assertDoesNotThrow`, seed/player/location unchanged | 1 | 296/296 · LINT PASS |
| c4 | Merge `--no-ff` → `/close-wave` (tier from the diff; `Building` blueprint re-verified and stamped; HK-023 bullet 1 struck with the merge hash, the item stays OPEN; grep `docs/terminal/` for any save/Bedrock claim) | 0 | `--docs` PASS |

Every commit reverts alone (c3's guard and R5 do not depend on c2). R1–R3 and R5 need no new API (they call `restoreSession`, `getLIP`, `getFloor`), so their red is an assertion failure /
exception on the old tree, not a compile error. P2 calls both resolvers, which exist today.

## Shape table
No new class and no static. One new instance method, listed for checks 1–3:

| what | kind | owner | the one fact it owns | statics + why |
| :-- | :-- | :-- | :-- | :-- |
| `Container.childAt(int)` | method on entity | `Container` | "which child answers index *i*" (was written twice, in both resolvers) | none |
| `Building.childAt(int)` override | method on entity | `Building` | "an index past the last floor is a Layer, if breached" | none |

Principle 3: the resolvers ask the container — no `instanceof Building` anywhere. Principle 1: the bounds rule leaves both
resolvers. **Smell not fixed and said out loud:** two LIP walkers remain (`Universe.resolveLIP`, static
`WorldGenesis.resolveLIP`) — logged as a new HK-023 bullet at close-out, not merged here.

## Declared edges
- **E1** Old saves: a save made below the Bedrock before this wave becomes loadable (index formula = the order every
  production path already used). No migration, no version bump.
- **E2** The memento path (`Game.restore(memento)`) carries no mutations at all, so a memento taken on a Layer still lands
  at the start locus (`PersistenceService:47-50`, silent). Pre-existing, test-only callers; logged, not fixed.
- **E3** A hand-edited save with a huge Layer index makes that many (lazy, childless) floors. No depth cap is invented here.
- **E4** `gatherMutations` still scans footprints only — unchanged.
- **E6** Ordering: a Layer LIP resolves only after its building's `isBreached` mutation is applied. It holds without code: mutations are written in footprint order (`Player.groovy:19`, `LinkedHashSet`), a building is always entered before its Layers, and the parser keeps key order (probed today: `LazyMap`, keys in file order). Only a hand-reordered file breaks it, and then only that Layer's mode is lost. No sort is added.
- **E5** `MethodSize`: `getFloor` and `restore` stay far under 50; no baselined method is touched (`Building.getExtraContent` is not edited).

## Verification
Before c1 and after c2/c3: `./vinc.sh --test --agent 2>/dev/null`, `./vinc.sh --scan` (seed 0 → 9 nodes),
`./vinc.sh --lint --agent 2>/dev/null`, `git status --short` clean after each run. RED demos: run the R-pins against the
previous commit and record the failing line in the plan's execution notes. End-to-end: a headless probe on a scratch save
file (never `session.trace`) — breach, descend to −2, sync, restore into `Game(1L)`, print the LIP and the floor menu.

## Grill record (2026-09-20)
| # | Check | Verdict |
| :-- | :-- | :-- |
| 1 | Coverage claims | PASS after A1 — `TracePersistenceTest` cite was off by one line (`:100-101`, re-read) |
| 2 | Behavioral edges | PASS after A2 — draft pin R4 would have been **green** before its own fix (a Layer-first file still lands on the Layer; only the Layer's mode is lost) and the sort guarded no reachable state → sort and R4 dropped, E6 declared, R1 now asserts a Layer mutation |
| 3 | Lifecycle | PASS — no ownership move |
| 4 | Per-commit coherence | PASS — P1's precondition read from `BuildingFactory.groovy:63-64` (exactly `maxFloors` floors); `childAt` collides with nothing (grep: 0 hits); counts 292 / 295 / 296 |
| 5 | Deviations + shape | PASS after A3 — the backlog says "step 0 is a reproduction test"; a red test cannot be committed alone, so the reproduction (R1) ships with the fix and is shown RED on c1 first (HK-019 precedent). No new static; `WorldGenesis` is already on the `NoNewStaticLogic` allow-list |
| 6 | Reversion unit | PASS after A4 — "every commit reverts alone" stated |

Blast radius: `resolveLIP` in tests = `DeterministicUniverseTest:52-53` only (in-range LIPs, unaffected); every test `getFloor(-n)` call asks for −1.
