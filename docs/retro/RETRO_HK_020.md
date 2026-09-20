# Retrospective: HK-020 — global command aliases had two owners
**Date:** 2026-09-20 | **Merge:** `0e7b6db` | **Record:** `tasks/completed/HK_020_PLAN.md` | **Chronicle:** `0x0e7b6db`

## What went well
- The first answer to "I want to work on HK-020" read both owners, every caller of `normalize` and `dispatch`, and the existing pins, and came back with two options, a recommendation and two decisions — the HK-015 lesson applied without prompting.
- Step 0 pinned the seam that was about to move and said so: the alias/case rows were labelled a migration checklist and moved one for one in c1, so no pin was deleted without its replacement in the same commit.
- The `processInput` gap (no `normalize` on that path) was found while reading, not after; its pin was written API-free (`processInput("?")` + `instantRender`) and shown RED on master before the change.
- The grill caught the undeclared deviation from the backlog's fix design (`normalize` asks it → `dispatch` asks it) and the second `TurnProcessor` constructor caller; both cost one line each.

## What went wrong
- The plan text said `alias("ll", "lattice")`; writing the class showed `alias` must inherit the target's case rule, and `ll` is exact while `lattice` is any-case. Registered exact instead, recorded in the commit and the plan. Small, but the plan had not asked "which case rule does an alias carry?" — the question the object exists to answer.
- The suite run for the baseline was started before the user had finished answering the plan's questions; it was interrupted. Take the baseline when the grill asks for it, not before.

## Concerns for upcoming work
- `RenderingCoordinator.helpMenu:40` spells the aliases as text; a help line generated from `GlobalCommands` would remove the last hand-kept copy. Not logged as an item — one line, when someone next touches the help line.
- No workflow friction to log.
