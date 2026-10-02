# Handover

- **Branch:** `master` (the U03e fast loop — the room card's strip and MORE sheet, the telemetry scope, the buffer's
  tiles, the relic's ticket — merged; its branch deleted).
- **Next:** U06 of the UI rework, the wrap-up, now the title, the map and the scan tables (the buffer and the telemetry
  pane are done) — its row in `tasks/UI_QUEUE.md`; then U06b, the node pictures (a mock first), then U07.
- **Open threads:**
  - a flaky browser test: `web/e2e/ritual.spec.ts:114` (the breach and descent) failed once in U03e's one full run and
    passed alone right after; to be fixed or deleted, never retried (`tasks/ui/U03e.md`, "As built");
  - the test cleanup ranked in `docs/analysis/TEST_SUITE_REVIEW.md`, section 6;
  - ships (CONCEPT-001): the verdicts in `docs/analysis/SHIPS_CONCEPT.md`, section 7, none judged;
  - `docs/analysis/WORKFLOW_BACKLOG.md`: WF-011, WF-006 (moot — close at the next review), WF-013 (needs the user's
    `gh auth refresh -s workflow`);
  - the tester's findings, when they come: each becomes a fix under the queue's "Reported by the tester";
  - the rule reviews are closed; not reviewed: `.claude/commands/chronicle.md`;
  - `tasks/backlog/HOUSEKEEPING.md`: HK-025 (keep the keys in a phones-only game, or remove them — the user's call),
    HK-026 to HK-040.
