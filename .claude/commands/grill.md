# /grill — The Plan Interrogation Protocol

Adversarial review of a draft plan before the user sees it: every UI-queue iteration plan (the Solo loop's "Plan,
review, show") and every plan outside a queue that changes code. Read-only: this command never edits source, tests or the plan; it produces verdicts. Stance: **assume the plan is
wrong and look for where** — the author is the worst person to find its weakest claim.

## 1. Locate
The plan under review (the main session's plan, or a path the user names) and what binds it: for a UI iteration the
queue's Decisions (`tasks/UI_QUEUE.md`) and its row; always `web/CLAUDE.md` and the OO principles in `CLAUDE.md`.

## 2. The six checks
Each is answered from tool output produced in this session (Read, grep, a probe). From memory is a FAIL.

| # | Check | Evidence | Verdict |
| :-- | :-- | :-- | :-- |
| 1 | **Coverage claims** — every "test X guards Y" | as the Codex's Coverage Claim Protocol asks | PASS / UNGUARDED |
| 2 | **Decisions** — every queue Decision the plan touches, and every place it departs from one or from the mock's look | each named with the plan line that honours it; a departure carries its reason | PASS / DEVIATES |
| 3 | **Shape** — each OO principle and each rule of "TypeScript and OO" in `CLAUDE.md`, with the code or plan line that honours or breaks it | the Shape table, as the Codex's Shape Claim Protocol asks | PASS / UNDECLARED |
| 4 | **Walls** — the walls in `web/CLAUDE.md` and its engine laws | for each the plan touches, the enforcing test named from that list; a wall with no test is UNGUARDED | PASS / UNGUARDED |
| 5 | **Tests that move on purpose** (the queue's Decision "Tests change on purpose") | each new or changed test against the testing principles in `CLAUDE.md`, with the line that honours or breaks it; every snapshot and name lookup the change rewrites, by name | PASS / UNLISTED |
| 6 | **Revert unit and cost** | one commit per module with its tests, each green alone; the token estimate present and plausible against the actual tokens in earlier iterations' notes | PASS / UNBOUNDED |

## 3. Blast radius
grep `web/src`, `web/tests` and `web/e2e` for every type, field, method, test id and CSS class the plan touches; any
hit the plan does not list is reported.

## 4. Report
The six verdicts as a table, then one line per non-PASS with the exact amendment. End with **CLEARED** (present it),
**AMEND** (amend, then present it) or **STOP** (the premise is wrong — re-plan). Keep the checks at six: a longer list
becomes a ritual that gets skimmed.
