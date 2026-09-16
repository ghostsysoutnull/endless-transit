# Housekeeping Plan: HK-009 — Delete the last per-type populate delegator
**Created:** 2026-09-16 | **Grill:** AMEND (corridor "peek" does not populate; one more deep-snapshot token) → applied → CLEARED | **Branch:** `housekeeping/hk-009-populate-apartment` (from `master` @ c3e1822)
**Backlog:** `tasks/backlog/HOUSEKEEPING.md` (HK-009) | **Baseline:** 207 / 207 / 0 / 0 (re-verify before touching any file)
**Project copy:** `tasks/HK_009_PLAN.md` (moved to `tasks/completed/` at close-out).

> **Prime directive:** zero production behavior change. No production caller exists; the only callers are two tests.
> 36 goldens byte-identical. `--scan` seed 0 → 9 nodes.

---

## Context

HK-005 (2026-09-16) made `Container.populateChildren()` dispatch through the registry and deleted twelve `populate*`
delegators from `ProceduralFactory`. `populateApartment` survived because two tests call it directly
(`ObjectDistributionTest.groovy:22`, `ProcgenVariabilityTest.groovy:29`). HK-009 migrates those two callers to the lazy
path and deletes the delegator, leaving `populate(Container)` as the one population entry point on the facade.

## What changes (ELI5)

Two tests still tap the factory on the shoulder and say "fill this apartment now". Every other test and all of production
just look at the apartment's rooms and let it fill itself. The two tests start doing the same, and the shoulder-tap method
is removed.

## Evidence read this session

- `ProceduralFactory.groovy:142-145`: `Apartment populateApartment(Apartment a) { apartmentFactory.populate(a); return a }`.
  It does **not** set `childrenPopulated`. Javadoc line 15 and comment lines 139-140 mention it.
- `Container.ensureChildrenPopulated()` (`Container.groovy:105-110`) sets the flag *then* calls `populateChildren()`, which is
  `ProceduralFactory.instance.populate(this)` (112-114). `LazyLocusList.ensureAccessed()` (`LazyLocusList.groovy:22-26`) fires on
  `size()`/`iterator()`/`get()` but **not** on `add`/`leftShift`.
- `ApartmentFactory.populate(a)` (`ApartmentFactory.groovy:38-58`): draws `numRooms`, builds an object pool, creates the rooms
  via `addLocation` (→ `rooms.add`, no lazy trigger), then distributes the pool with `a.rooms.size()` / `a.rooms[roomIdx]`
  (lazy triggers).
- Only references to `populateApartment` outside this plan's targets: `ProcgenDeepSnapshotTest.groovy:146,156-157` (comments
  and a message string only — the test itself uses lazy `a.getRooms()`), `docs/blueprints/logic/classes/procgen/ProceduralFactory.md:26`,
  `docs/analysis/OOA_REFACTOR_PLAN.md:674` (Phase 9 historical record — leave), backlog + recovery prompt.
- `ObjectDistributionTest`: `createApartment(null, …)` (no parent → `getVibe()` null → no vibe branch) then `populateApartment(apt)`
  then `apt.rooms.each`. Assertion L44 `assertFalse(isConcentrated)` — no count in any bucket exceeds 80 % of rooms.
- `ProcgenVariabilityTest.testApartmentVariability`: apartments come from `corridor.apartments` (lazy). **Grill correction:**
  `CorridorFactory.populate` (`CorridorFactory.groovy:38-57`) "peeks" at the first room by re-deriving its category from the seed
  (`NameGenerator.generateRoomName(…, aptLocus.branch(0))`) — it never touches `apartment.rooms`, so the apartments are **not**
  populated when the test reaches them. Then `populateApartment(apt)`, then `apt.rooms.size()`. Assertions L45-49:
  `roomCounts.size() > 1`, `objectCounts.size() > 1`, `roomNames.size() > 5`.

### Finding: the explicit call populates twice (tests only — same mechanism in both)
- The explicit `populateApartment(apt)` runs on an unpopulated apartment. Inside `ApartmentFactory.populate`, the rooms are added
  with `addLocation` (no lazy trigger), then the distribution loop's `a.rooms.size()` is the **first** lazy access →
  `ensureChildrenPopulated()` → a **nested** `populate(apt)` adds a second set of rooms and distributes a second pool; the outer
  loop then distributes its pool over `2 × numRooms` rooms. Same in both tests (the draw is pure, so both halves are equal).
- Neither test asserts on absolute counts, so this has been invisible. It is test-only: no production path calls the delegator.
  **Execution step 0 verifies this empirically** (below) before anything is deleted.

## Coverage claims (Coverage Claim Protocol — assertions quoted)

| Behavior | Guard | Assertion (read this session) |
| :--- | :--- | :--- |
| Lazy access populates an apartment exactly once with the seed's room count and pool | `ProcgenDeepSnapshotTest.apartment_vibeMatchAndObjectPool_pinnedForSeed0x1234` | L155-156 `List<Room> rooms = a.getRooms(); assertEquals(1, rooms.size(), …)`; L157-160 pool `15`, `assertEquals(pool, distributed)` |
| `populate(Container)` dispatches to the owning factory once | `ProceduralFactoryRegistryTest` | (HK-005 plan rows 1-2: `factoryFor` per type; `populate(street)` → 14 children) |
| Object-count variance across apartments | `ObjectDistributionTest` | L44 `assertFalse(isConcentrated, …)` |
| Room-count / object-count / name variance | `ProcgenVariabilityTest` | L45 `roomCounts.size() > 1`, L46 `objectCounts.size() > 1`, L49 `roomNames.size() > 5` |
| Whole-world determinism, 36 HUD frames | `DeterministicUniverseTest`, golden tests | existing gates |

No UNGUARDED row: the production behavior (lazy single population) is pinned by the deep snapshot; the two migrated tests keep
their own assertions and become *more* faithful (they now observe the production shape, not a doubled one).

## Design

1. **`ObjectDistributionTest.groovy:22`** — delete `factory.populateApartment(apt)`. `apt.rooms.each` (L24) triggers lazy population.
2. **`ProcgenVariabilityTest.groovy:29`** — delete `ProceduralFactory.instance.populateApartment(apt)`. `apt.rooms.size()` (L30) is lazy
   (and already populated by the corridor).
3. **`ProceduralFactory.groovy`** — delete `populateApartment` (142-145) and the two-line comment (139-140); javadoc line 15 becomes
   "The per-type `populate*` delegators were removed in HK-005 and HK-009." No other production file changes.
4. **`docs/blueprints/logic/classes/procgen/ProceduralFactory.md:26`** — line removed (docs commit).
5. `ProcgenDeepSnapshotTest.groovy:146,156,157` — comment/message/comment say "populateApartment"; rename to
   "ApartmentFactory.populate" (test text only, same commit as 1-3). Keeps the name out of the tree so the gate grep is exact.

## Execution
- **Step 0 (empirical, on master):** `./vinc.sh --test ProcgenVariabilityTest -q` and record the printed `Room counts found: […]`.
  Expect every value even (doubled). Same for `ObjectDistributionTest` (`Total Rooms: N`). If the values are **not** doubled the
  finding above is wrong → note it in the plan record; the deletion is still correct (no production caller), proceed.
- **Commit 1:** files 1-3 (+5). `./vinc.sh --test --agent 2>/dev/null` → 207/207/0/0. Re-run the two tests with `-q` and record the
  new room counts (expect odd and even values in 1..9). If a variance assertion fails, **STOP** — that is a test that only passed
  because of double population; report, do not loosen the threshold.
- **Commit 2 (docs):** blueprint line, backlog HK-009 → CLOSED with sha, plan → `tasks/completed/`, todo/recovery pointers.
- Merge `--no-ff`, push. Chronicle log + index row (minor session: no separate retro; the double-population finding goes in the log).

## Behavioral edges (declared)
- **Production:** none. `grep -rn populateApartment src/main` → only the deleted method and its own comments.
- **Tests:** the two tests go from doubled apartments to single. Their assertions are variance thresholds; expected to hold
  (50 apartments × 1-9 rooms; 5 floors × N apartments). Any failure is information, handled by the STOP rule above.

## Files / blast radius
- Production: `procgen/ProceduralFactory.groovy` (1 file, −7 lines).
- Tests: `logic/ObjectDistributionTest.groovy`, `procgen/ProcgenVariabilityTest.groovy` (one line each), `procgen/ProcgenDeepSnapshotTest.groovy` (two text tokens).
- Docs: `docs/blueprints/logic/classes/procgen/ProceduralFactory.md`, backlog, todo, recovery prompt.

## Reversion unit
Commit 1 reverts alone (restores the delegator and the two calls). Commit 2 is docs only.

## Gates
`./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS DISCOVERED=207 SUCCEEDED=207 FAILED=0 SKIPPED=0`; goldens untouched
(`git diff master --stat -- src/test/groovy/com/endlesstransit/ui/golden/` empty); `./vinc.sh --scan` seed 0 → 9;
`grep -rn populateApartment src/` → 0; `git status --short` clean after every run.

## Next step
`/grill`, then request the Directive.
