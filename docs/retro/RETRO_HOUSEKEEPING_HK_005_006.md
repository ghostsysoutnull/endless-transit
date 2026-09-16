# Retro: Housekeeping — HK-005 + HK-006 (with the Phase 10 cadence review)
**Date:** 2026-09-16 | **Suite at close:** 199 discovered / 194 pass / 5 skipped / 0 failed | **Duration:** ~3.1s
**Chronicle:** journals/LOG_20260916_085710_0xd5d26bc.md
**Branch:** `housekeeping/hk-005-006-registry-dispatch` — 6 commits, merged to `master` @ `d5d26bc`, pushed

---

## What Went Well
- **The cadence review was cheap and produced one real fix.** Reading the WF-002 tally showed check 5's pattern list stopped at Visitor while Phase 10 introduces an Observer hierarchy. A one-line extension closes the exact WF-004 gap before the phase that would hit it.
- **Coverage table first, code second.** Every row in the plan quotes an assertion read this session. The grill still found one weak citation (`SystemNameTest`) and the replacement — golden 08's ancestor chain — is stronger than what the plan had.
- **Scripted removal with a pre-write assert.** Fourteen files, one script, zero drift; when the assert fired on `Building` it fired *before* the write, so the recovery was a rerun, not a revert.
- **Batches of 5/5/4 held the Refactor Guard without ceremony.** Each override removal falls through to the new default, so every intermediate commit compiled and passed the full suite including goldens.

## Challenges
- **An over-broad sanity assert.** `"populateChildren" not in file` is the wrong shape when a comment can legitimately contain the word. The lesson in `infrastructure.md` already said "never assert on text you inserted"; this is the sibling case — assert on the construct, not the token. Extended the lesson.
- **The user's fallback rule left one delegator standing.** `populateApartment` has two test callers; the rule said fall back to "leave and log". Correct per instruction, slightly untidy in the facade — HK-009 is a 3-file follow-up.

## Surprises
- **Golden 08 pins NullSector population.** Seed 12345's start Street sits under `Null Reach 331`; every one of the 36 frames depends on `NullSector.populateChildren()` producing `Lambda Kapteyn`. Nobody had written that down.
- **A six-month-old label swap in a pin test.** `ProcgenSnapshotTest` had the Country in a local called `city` with a "City name" message, and the OOA plan's pinned-values line repeated the swap. Literals were always right.

## Concerns for Upcoming Phases
- **Phase 10 touches `Building`, `Room`, `Player`, `JournalManager`.** HK-005 already landed its `Building` change, so no rebase conflict remains from housekeeping.
- **`EventBusTest` is `@Disabled` with stubs (0.5g).** The Coverage Claim Protocol applies: re-read its assertions before claiming it guards anything; a disabled test guards nothing until enabled.
- **Grill check 5 now asks about listener `instanceof`.** Phase 10's `JournalManager` conversion is the first plan that will exercise the new wording.
- **HK-008 (static singleton) and HK-009 (`populateApartment`) are open.** Neither blocks Phase 10.

## Lessons
- **Assert on the construct you removed, not the bare token.** Promoted to `tasks/lessons/infrastructure.md` (corollary on the scripted-move bullet).
- **A cadence review's best output is a one-line rule change made *before* the phase that needs it.** Recorded here.
