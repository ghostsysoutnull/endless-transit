# Handover

Current state only. The rules live in `CLAUDE.md` and the files it names; the history lives in `journals/`.
**Updated:** 2026-09-26.

- **Branch:** `ui/u02-inside-the-building`, where U02 continues; it is merged into `master` at each handover. A push of
  `master` republishes the site.
- **Next session — law mode** (`.claude/LAW_MODE.md`), two targets in order:
  1. **Review the rules not yet reviewed**, the full review of the grill first, then the most often loaded
     (`.claude/CODEX.md` was reviewed whole on 2026-09-26):
     - `.claude/commands/grill.md`, the whole file — runs on every plan;
     - `tasks/lessons/infrastructure.md` — loaded every session;
     - `tasks/lessons/web.md` — loaded whenever work touches `web/`;
     - `.claude/brief.md` — every agent starts from it;
     - `tasks/UI_QUEUE.md`, its Decisions — they bind every iteration;
     - `.claude/STANDING_ORDER.md`, `.claude/commands/chronicle.md` — run only on the user's ask.
  2. **OO with TypeScript:** research how the OO principles in `CLAUDE.md` are best expressed in TypeScript, then weigh
     what belongs in `web/CLAUDE.md`'s code rules.
- **In progress:** U02 of the UI rework (`tasks/UI_QUEUE.md`), under the Solo loop. Its next step is in
  `tasks/ui/U02.md` ("State at handover"): the design fixes in `tasks/ui/U02-fixes.md`, then the corridor, then the
  end-of-iteration browser tests. The browser suite is red on this branch until then, by plan.
- **Open threads** (none has a plan):
  - the test cleanup ranked in `docs/analysis/TEST_SUITE_REVIEW.md`, section 6;
  - ships (CONCEPT-001): the verdicts in `docs/analysis/SHIPS_CONCEPT.md`, section 7, none judged;
  - `docs/analysis/WORKFLOW_BACKLOG.md`: WF-011, WF-006 (moot — close at the next review), WF-013 (needs the user's
    `gh auth refresh -s workflow`);
  - the tester's findings, when they come: each becomes a fix under the queue's "Reported by the tester".
