# Retrospective: HK-018 — breach rule on the model, Keystone bound by LIP
**Date:** 2026-09-16 | **Merge:** `7ca28f8` | **Record:** `tasks/completed/HK_018_PLAN.md` | **Chronicle:** `0x7ca28f8`

## What went well
- **Step 0 of the previous session paid off**: restoring *copies* of the player's save in a scratch game and printing the Peak menu in both floor modes found the second cause in one run, and proved the earlier workaround had worked.
- Pins forged their Keystone by a real merge, so the rule change needed no re-pin; every new pin was shown RED on an assertion (plumbing first, rule second), never on a compile error.
- The lint ratchet fired exactly as designed on a one-line growth of a baselined method.
- The user's "no backward compatibility" decision removed a branch and an edge after the grill, without reopening the plan.

## What went wrong
- The first diagnosis (previous session) stopped at the first sufficient cause. The name mismatch explained the symptom, so the mode the floor restores into was never printed.
- The chat answer "press `b`" came only after the user repeated the report; the live game's log had to be read to see it was a different world from the save under study.
- The guide said the corridor has no `l`. It does, and that `l` is half the trap. A source-cited guide can still be wrong where the citation was for a neighbouring fact.

## Concerns for upcoming work
- Corridor mode is sticky and `l` skips the elevator; `u`/`d` are still elevator-only. Not logged as an item by user decision on scope; revisit if another report touches it.
- HK-015 gained an item: a Keystone dropped in a room comes back as a plain item.
- No workflow friction to log in `docs/analysis/WORKFLOW_BACKLOG.md`.
