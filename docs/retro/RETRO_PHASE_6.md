# Retro: Phase 6 — GameState Decomposition
**Date:** 2026-09-11 | **Suite at close:** 121 discovered / 116 pass / 5 skipped / 0 failed | **Duration:** ~2.7s
**Chronicle:** journals/LOG_20260911_120000_0x6c9e3a1.md
**Branch:** `refactor/phase-6-gamestate-decomposition` (13 commits, not yet merged)

---

## What Went Well

- **The facade-first ownership move worked identically three times.** Route callers through the existing `Game` accessor, move the instance, delete the field. Because every command and test already used (or was first switched to) the facade, the structural commits touched only the owning service, `Game`, and `GameState`. 6a and 6c had zero test edits; 6b had four, all for tests that construct services directly.
- **Every intermediate commit compiled and passed the full suite alone.** Where a constructor signature changed (6b-ii, 6b-iii), the service edit and the matching `Game` line were applied as one unit and compiled together. No commit was ever red.
- **The seed scan was byte-diffed, not eyeballed.** Captured once before 6a, compared after every structural commit. Three identical results.
- **The 4-file cap forced good splits.** 6a and 6b both exceeded it on first count; splitting into facade-routing and ownership-move commits produced smaller, more reversible units than a single commit would have.
- **Session resumed cleanly after five months.** `RECOVERY_PROMPT.md`, `todo.md`, and a green baseline were enough to orient in one pass. The handover investment paid off.

---

## Challenges

- **A coverage claim in the 6b draft was false.** The plan stated `GameMementoTest` pinned input-history restoration. It asserts seed, LIP, and coherence only. The claim was made from the file name and a remembered purpose. The user's question ("how are we mitigating the risk?") surfaced it before any code changed. The blast-radius grep rule held — it finds *references* — but nothing required a *behavioral* claim to be evidenced.
- **`InputHandler` did not fit the plan's ownership assignment.** The plan text said `TurnProcessor` owns it. Two services constructed earlier (`RenderingCoordinator`, `PersistenceService`) also need it. Resolved by building it in `Game` and injecting into all three; declared as a deviation in the plan doc and commit message.
- **`PersistenceService.restore()` replaced the handler instance.** Once three services hold a reference, replacement leaves stale handlers. Changed to `restoreHistory()` in place — behaviorally identical, and the 6b-0 test would have caught the stale-reference variant in either direction.

---

## Surprises

- **`MnemonicReversalTest` does not test reversal in the engine.** Despite the name, it asserts room and floor option *keys* on model objects. `NavigationEngine`'s three behaviors (record, repetition context, boundary reversal) had no test at all until 6c-0. Test names are not coverage.
- **`CorridorPersistenceTest` restores through `SyncManager`, which never touches the handler.** It was listed as a focus test for 6b by association ("persistence"). `/grill` caught it on its first run.
- **`GameState` ends the phase with one remaining service field: `inventoryController`.** Not in the plan's scope. Left alone per surgical precision; noted below.

---

## Concerns for Upcoming Phases

- **Phase 7 is the cadence review point.** WF-002 (`/grill`) is IN PROGRESS and must be evaluated: did the six checks catch what went wrong in 6b/6c (yes: two UNGUARDED findings, one mis-listed focus test), and did any check never fire (check 6, reversion unit, has not yet produced a non-PASS). Decide whether to keep all six.
- **Phase 7 (BridgeView decomposition) requires pixel-identical scan output.** The byte-diff discipline used here is the right gate; keep the pre-phase capture in the scratchpad and diff after every sub-phase, not just at the end.
- **`GameState.inventoryController` is a service, not data.** Candidate for a future housekeeping commit (`QuantumBufferController` → `TurnProcessor` or `Game`). Not urgent; no caller confusion today.
- **`Game.processInput()` duplicates `NavigationCommand.execute()`.** Both resolve a choice, bump `stepCount`, record the choice, call the closure. Test-only path. Candidate for delegation in a housekeeping pass.

---

## Lessons

- **A coverage claim is not a grep hit — read the assertions.** Before writing "test X guards Y", open X and quote the assertion. If none exists, the behavior is UNGUARDED and a step-0 pinning test precedes any production change.
  *Promoted to `tasks/lessons/infrastructure.md` and `.claude/CODEX.md` §4 (Coverage Claim Protocol).*

- **Facade-first is the safe shape for moving a field out of a shared container.** Commit 1 switches every external caller to the existing facade accessor (zero structural change, trivially reversible). Commit 2 moves ownership and repoints the accessor. Callers and tests never change in commit 2. The pattern kept three moves at ≤4 production files each.
  *Promoted to `tasks/lessons/core.md`.*

- **When an instance becomes shared, replacement becomes a bug.** Any `field = new X(...)` after construction is a stale-reference risk once more than one holder exists. Grep for assignment sites (not just construction sites) during lifecycle analysis; prefer in-place mutation (`restoreHistory`) over re-instantiation.
  *Promoted to `tasks/lessons/core.md`.*
