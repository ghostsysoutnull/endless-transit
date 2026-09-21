# Retro: Housekeeping — HK-011 (JournalManager owned by Game; ticker via RenderContext; name-based LOC line)
**Date:** 2026-09-16 | **Suite at close:** 207 discovered / 207 pass / 0 skipped / 0 failed | **Duration:** ~2.9s
**Chronicle:** journals/LOG_20260916_121500_0xa307827.md
**Branch:** `housekeeping/hk-011-journal-instance` — 5 commits, merged to `master` @ `a307827`, pushed

---

## What Went Well
- **UI first, ownership second.** Commit a moved the journal read from the component to the compositor while the journal was still static, with goldens as the proof of same-bytes. Commit b then changed *who owns* the journal without touching any component. Each step had one kind of risk.
- **The inert-default pattern carried over cleanly.** `BridgeView(JournalManager = new JournalManager())` is the same shape as `Player(EventBus = new EventBus())` from Phase 10: bare constructions in tests keep compiling and get a silent collaborator.
- **A defaulted constructor parameter on `RenderContext`** added the fifth field without editing the other eleven construction sites.
- **The visual change was isolated in its own commit** with its own pin (D2 → name line; D4 → the full-path line in the file) and its own six-file golden review. Reverting c alone restores the path form.

## Challenges
- **Five production files in commit b.** The recovery prompt's per-commit cap is 4, the CODEX's is 5. Every static caller had to migrate in the same commit or the build would not compile; the cap was declared in the plan rather than met by an artificial split. Rule of thumb: when removing a static, the commit is the set of callers, and the cap is a guide, not a reason to add a shim.

## Surprises
- **`JournalManager` took `@CompileStatic` with one typed local** (`VibeCapsule v`). The class was dynamic Groovy since March for no reason the code shows.
- **Frame 20 did not move under commit c** because the harness logs that discovery without a location, and the name fallback keeps the path. A worked example that the fallback branch is live.

## Concerns for Upcoming Phases
- **HK-008 is the last singleton** (`ProceduralFactory.instance`), and it is the wide one: every `Container.populateChildren()` reaches it, plus `Building`, `SyncManager`, `PersistenceService`, `WorldGenesis` and tests. Plan it with a full grep of `src/main` and `src/test` before anything else.
- **O2 CodeNarc** should be re-planned as a `vinc.sh` mode; the OOA plan's Gradle premise is wrong for this runner.
- **`.journal_session_tmp` is still a shared path.** Fine today; the day two games run in one JVM it becomes a per-instance file.

## Lessons
- **A view component takes frame inputs, not services.** Promoted to `tasks/lessons/ui.md`.
- **Removing a static: the atomic commit is the set of its callers.** Recorded here; the file cap is a guide for splitting *independent* edits, not for splitting a compile-coupled set.
