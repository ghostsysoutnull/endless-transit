# Retro: Phase 3 Pre-Check — Safety Net Hardening
**Date:** 2026-03-18 | **Suite at close:** 107 discovered / 102 pass / 5 skipped / 0 failed | **Duration:** 2420ms
**Chronicle:** journals/LOG_20260318_125548_0x3e7b9a1.md

---

## What Went Well

- **Audit before writing.** Running an explicit coverage gap analysis before touching any
  test file produced a clear, prioritised list. No guessing, no redundant tests written.
- **Design decision recorded before implementation.** The `isMasterNumber()` scope question
  ({11,22,33} vs broader) was resolved and written down in the tracking document before
  any test was coded. The test now serves as the permanent record of that decision.
- **Test failure revealed a real gap.** The "not all SILENCE" test failing was not a bad
  test — it was a signal. It surfaced the topology degradation scenario that prompted the
  `TOPOLOGY_WARN` guard and the full-hierarchy canary. A test that fails during authoring
  and prompts a production fix is doing its job.
- **Tracking document created before implementation.** `PHASE_3_PRECHECK_TESTS.md` defined
  the scope, design decisions, and success criteria before a line of test code was written.

---

## Challenges

- **Standalone Building requires manual property setup.** `new Building(LocusSeed)` has
  `maxFloors=0` until `createBuilding()` or manual assignment. Tests that create buildings
  outside the procgen chain must set `culture`, `timeline`, `maxFloors`, `apartmentsPerFloor`
  explicitly — otherwise `getFloor(0)` returns null silently.
- **"Not all SILENCE" assumption doesn't hold without full hierarchy.** The initial test
  assumed any corridor would have varied traces. That assumption is only valid with a
  Country ancestor providing a real `functionalTrait`. Without one, the fallback produces
  mostly SILENCE — which is technically correct but diagnostically misleading.

---

## Surprises

- **The TOPOLOGY_WARN scenario was not in the original audit scope.** It emerged only when
  the "not all SILENCE" test failed. Investigating why it failed led directly to
  `populateCorridor`'s silent Country-null path — a latent risk that would not have been
  found through static analysis alone.
- **Three of four "Standard" trait room types produce SILENCE.** Only "Transit Node"
  (containing "NODE") matches any trace keyword. This means any corridor populated without
  ancestry is effectively sensory-dead — a degradation severe enough to break gameplay
  immersion if it ever reaches production.

---

## Concerns for Upcoming Phases

- **Phase 4 and 6 touch parent wiring.** `LeafLocation` extraction (4a) and `GameState`
  decomposition (6b/6c) both affect how `findAncestor()` traverses the hierarchy. The new
  `fullHierarchyCorridor_containsNonSilenceTraces()` test is the canary — but it only
  covers one chain depth. If Phase 4 breaks parent wiring at a deeper level (e.g., inside
  `Apartment` or `Room`), a separate test would be needed.
- **Phase 3a enum completeness is still manual.** The 16 room type keyword mappings are
  pinned in `knownRoomTypes_matchExpectedTraces()`, but there's no automated check that
  the `RoomCategory` enum defines a value for every string in `NameGenerator`'s types map.
  That audit must be done manually at Phase 3a implementation time.

---

## Lessons

- **A failing test during authoring is information, not failure.** When "not all SILENCE"
  failed, the instinct was to fix the test. The better response was to ask why it failed —
  which led to a real production guard. Promote to `tasks/lessons/infrastructure.md`.
- **Silent defaults are always risk.** `?: AnomalousTrace.SILENCE` is correct as a fallback,
  but without a guard it makes hierarchy errors invisible. Any `?:` fallback on a value that
  has a distinct semantic meaning (here: "no ancestor found") deserves a log statement.
