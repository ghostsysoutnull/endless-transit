# Retro: Phase 1 — Bug Fixes
**Date:** 2026-03-17 | **Suite at close:** 89 discovered / 84 pass / 5 skipped / 0 failed
**Branch:** refactor/phase-1-bug-fixes → merged master
**Chronicle:** journals/LOG_20260317_221458_0x1d159b8c.md

---

## What Went Well

- **Safety net worked.** `CorridorPersistenceTest` (written in Phase 0.5a specifically for this bug) gave immediate confidence that 1a was correct. The test existed before the fix, exactly as planned.
- **Small, focused commits.** 1a and 1b were each a single file. No noise, easy to review, straightforward to revert if needed.
- **Pre-read discipline.** Both sub-tasks had plan-level errors. Reading the actual source files before writing any code caught both discrepancies cleanly without any false starts.
- **Zero test regressions.** `STATUS=PASS` throughout — on the feature branch after each commit and on master post-merge.

---

## Challenges

- **Plan accuracy.** The OOA plan named `Floor.enter()` as the fix site for 1a and incorrectly stated `visitedLIPs` was in `GameMemento` for 1b. Neither was true. Both had to be corrected before implementation.
- **Short phase, but the pattern still applied.** Even two tiny tasks required source verification before touching code. This pattern doesn't compress — it just takes a bit of time regardless of phase size.

---

## Surprises

- **1b was a comment-only change.** After confirming `visitedPaths` is genuinely unused by any live logic or UI, the "fix" was just documentation. No code path changed. This is the correct outcome — the field is not broken, just undocumented.
- **No edge cases on the isCorridorActive removal.** The reset was purely defensive/redundant — removing it had no observable side effect on any test. The field's default value (`false`) already provided the Elevator-on-entry behavior.

---

## Concerns for Upcoming Phases

- **Phase 1 triggers the first workflow backlog review.** Per the 3-phase cadence, Phase 1 is the first checkpoint. Check `docs/analysis/WORKFLOW_BACKLOG.md` before starting Phase 2.
- **Plan corrections will keep happening.** The OOA plan was written from static analysis in a prior session. Every phase should begin by reading the actual files for each fix site before committing to the described approach.

---

## Lessons

- **The plan is a starting point, not ground truth.** OOA analysis documents describe intent, not necessarily the exact current state of the code. Always read before correcting.
- **Small phases have the same verification overhead.** Two tasks = two source reads, two compile runs, two test runs. The overhead doesn't scale down — build it into expectations for all phases.
