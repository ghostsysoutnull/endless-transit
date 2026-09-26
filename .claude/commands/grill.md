# /grill — The Plan Interrogation Protocol

Adversarial review of a draft plan before the user sees it: every UI-queue iteration plan (the Solo loop's step 2; the Standing
Order's item 2 when the user asks for it) and every non-trivial plan outside a queue. Read-only: this command never edits source, tests or the plan. It produces
verdicts. Stance: **assume the plan is wrong and look for where** — the author is the worst person to find its weakest
claim. Origin: WF-002 (a draft asserted coverage that did not exist); reshaped for the web game 2026-09-25.

## 1. Locate
The plan under review (the writer's returned plan, or a path the user names) and what binds it: for a UI iteration the
queue's Decisions (`tasks/UI_QUEUE.md`, where it and the study disagree the queue wins) and its row; always
`web/CLAUDE.md` and the CODEX OO table.

## 2. The six checks
Each is answered from tool output produced in this session (Read, grep, a probe). From memory is a FAIL.

| # | Check | Evidence | Verdict |
| :-- | :-- | :-- | :-- |
| 1 | **Coverage claims** — every "test X guards Y" | the assertion lines of X, quoted, from an enabled test | PASS / UNGUARDED (a step-0 test is added) |
| 2 | **Decisions** — every queue Decision the plan touches, and every place it departs from one or from the mock's look | each named with the plan line that honours it; a departure carries its reason (the game wins over the mock on rules, names, numbers) | PASS / DEVIATES |
| 3 | **Shape** — the CODEX OO table's checks 1–6, each with the evidence its row names | the Shape table (a missing row is a FAIL); engine purity (no DOM, clock or `Math.random` in `src/engine/`) | PASS / UNDECLARED |
| 4 | **Walls** — the rules the tests enforce | for each the plan touches, the enforcing test named: the first move in view at 360 × 640 (`e2e/fold.spec.ts`), picture text ≥ 12 px (`Pictures.test.ts`), contrast and no opacity (`Contrast.test.ts`), views carry no words (`ViewsCarryNoWords.test.ts`), named images and reduced motion (`e2e/a11y.spec.ts`), noise seeded from `FrameEntropy`, a tap in a picture resolves to an option id and every tappable thing is a real `button[data-option]` | PASS / UNGUARDED |
| 5 | **Tests that move on purpose** (Decision 16) | every golden, pin and e2e selector the change retires or rewrites, by name; goldens only through their one writer | PASS / UNLISTED |
| 6 | **Revert unit and cost** | one commit per module with its tests, each green alone; the token estimate present and plausible against the actual tokens in earlier iterations' notes | PASS / UNBOUNDED |

## 3. Blast radius
grep `web/src`, `web/tests` and `web/e2e` for every type, field, method, test id and CSS class the plan touches; any
hit the plan does not list is reported.

## 4. Report
The six verdicts as a table, then one line per non-PASS with the exact amendment. End with **CLEARED** (present it),
**AMEND** (amend, re-grill, then present) or **STOP** (the premise is wrong — re-plan). Keep the checks at six: a
longer list becomes a ritual that gets skimmed.
