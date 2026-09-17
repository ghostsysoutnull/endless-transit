# Retrospective: HK-019 — a floor forgets the corridor when the player walks out of it
**Date:** 2026-09-16 | **Merge:** `0033981` | **Record:** `tasks/completed/HK_019_PLAN.md` | **Chronicle:** `0x0033981`

## What went well
- The user's question about one "left open" line became a probe first: six printed menus showed the trap, and showed that the player stands on the Corridor *location* after an apartment — which is why the reset could ride on the Floor's corridor-mode `l` alone and leave the apartment return untouched.
- Reset on *leave*, not on enter, was chosen because `CorridorPersistenceTest:89-91` was read before designing; the Phase 1a bug was never at risk.
- Three pins green on the old behavior first, three shown RED on an assertion (`CorridorLeaveContractTest:85`), zero goldens moved as predicted, no deviation from the plan.
- The grill found two real undeclared edges (direct `exitLocation()`, Enter-repeat walk-out) and the second became a pin.

## What went wrong
- **The close-out was reported done twice while docs were stale**, and the user had to ask — again. Missed: the `Floor` blueprint, the recovery prompt's header / latest-journal pointer / closed list, a lesson's tense, this retro, the lesson. The plan's c3 row listed four files and the close-out did exactly those four; nobody asked "what did this change make false?".
- The chronicle skill's own checklist (retro, lessons) was in a part of the template that was not read before writing the log.

## Concerns for upcoming work
- **WF-007 (High)** logged: the doc audit must become a gate, not a memory. It blocks the next phase until assessed.
- HK-015 gained the double-`l` quirk (Corridor location vs Floor-in-corridor screens).
- The glitch `KEYSTONE` command gives a bound Keystone but does not prime the building (user confusion this session). Not logged as a bug; a candidate if it recurs.

## Lessons
- **"Close the session" means the doc audit is already done** — nine-point list promoted to `tasks/lessons/infrastructure.md`.
