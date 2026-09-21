# Retro: Housekeeping — HK-010 (discovery journaling restored as a domain event)
**Date:** 2026-09-16 | **Suite at close:** 207 discovered / 207 pass / 0 skipped / 0 failed | **Duration:** ~3.0s
**Chronicle:** journals/LOG_20260916_110554_0x00194f4.md
**Branch:** `housekeeping/hk-010-discovery-events` — 3 commits, merged to `master` @ `00194f4`, pushed

---

## What Went Well
- **The decision came before the plan.** HK-010 was logged in Phase 10 as "needs a user decision"; the session opened with that question, got a yes, and only then planned. No behavior change was ever proposed as a side effect of something else.
- **Phase 10 paid for itself in one session.** The whole feature is one event class, one `if`, and one `subscribe` line. `Player` stays the sole publisher; the journal stays a typed listener; no model file changed.
- **RED first, on purpose.** All four contract methods failed on the old code for the same reason (0 events published, `Network Expansion: 0`). The RED output is in the commit message — the reproduction the CODEX asks for, without a red commit.
- **The golden diff was predicted before it was generated.** The plan named the six files and the one line each; the first full-suite run showed the two extra frames (01/02) the plan had also predicted for the pre-harness-move state; after the move the diff matched exactly.

## Challenges
- **The backlog note said the goldens would not move.** "The harness feeds the journal directly" was true and incomplete: the harness also navigates through `Game`, and the constructor discovers the start locus. Reading `HudFrameHarness` line by line, not its description, found this before any code changed.

## Surprises
- **The starting locus has never been journaled, in March or now.** `initializeWorld()` runs in the constructor; `startSession()` runs in `start()` and resets the log. The harness reset move mirrors that order, and the `core/CLAUDE.md` bullet now says so.
- **Every `LOC:` line is truncated to the same prefix.** The ticker pane is 37 chars and paths are ~100. Restoring March verbatim restores that too; it is declared, not fixed, because a name-based ticker line is a HUD decision with its own golden review.
- **The housekeeping backlog's CLOSED section has duplicates (HK-001..006 twice).** Pre-existing; left untouched under surgical precision, noted for the next docs pass.

## Concerns for Upcoming Phases
- **HK-011 (de-static the journal) now also owns the ticker question.** When `getRecentEvents` moves into `RenderContext`, decide whether the `LOC:` line should carry the location name instead of the path.
- **Memento `restore()` re-discovers the start chain and the target chain.** Test-only today (`GameMementoTest`, `MementoInputHistoryTest`). If it ever becomes a production path, `visitedPaths` needs to travel in the memento — the Phase 1b comment in `Player.groovy` would then be stale.

## Lessons
- **A golden harness that builds a `Game` inherits every constructor side effect.** Mirror the production lifecycle (here: `startSession` after construction) rather than pinning what the player never sees. Promoted to `tasks/lessons/core.md`.
- **"The harness feeds X directly" is a claim about one path, not all of them.** Grep the harness for every route into the shared state (`enterLocation`, `new Game`) before asserting a gate will not move. Recorded here.
