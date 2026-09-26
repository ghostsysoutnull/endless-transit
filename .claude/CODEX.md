# THE CODEX: Operating Law

This file defines the workflow and the engineering law. When to act and how to talk to the user: the block at the top
of `CLAUDE.md`, which outranks this file.

---

## 🚦 How an iteration runs
Two processes, each whole in its own file: **the Solo loop** (`.claude/SOLO_LOOP.md`), the default, and **the Standing
Order** (`.claude/STANDING_ORDER.md`), only when the user asks for it.

---

## 🏗️ Workflow Orchestration

### 1. Re-plan
* If something goes sideways, STOP and re-plan immediately — don't keep pushing.
* **Surgical precision:** minimal, targeted changes; no "cleanup" of code outside the task.

### 1.5. Closing a wave (outside a queue)
A wave — a backlog item, a docs session, a one-line fix — closes after its last action (the merge, the push, the live
check), in one go under the directive that started it:
1. **False facts:** write each fact the wave made false in the old state's own words; `grep -rn` them across `docs/`,
   `tasks/`, every `CLAUDE.md`, `.claude/`, `README.md`; fix every live hit (`journals/` and `tasks/completed/` are history).
2. **Handover true:** `tasks/RECOVERY_PROMPT.md` holds current state only; a backlog entry closes with a pointer to its record.
3. **Lessons:** each user correction becomes a block line or a lesson (the Self-Improvement Loop below).
4. **Gate:** `./.claude/docs-check.sh --agent` → `DOCS=PASS`; a Groovy wave adds the steps in `terminal/CLAUDE.md`.
5. **One chain:** the edits `&& git add <paths> && git commit`, merge `--no-ff`, the merged branch deleted. A chronicle
   or a retro only when the user asks.

### 4. Verification
* Never mark a task complete without proving it works.
* **AI-TDD**: reproduce every bug with a test before fixing it; when a UI bug's browser test runs is the process's call.
* **Coverage Claim Protocol**: Any plan statement of the form "test X guards behavior Y" MUST cite
  the assertion lines that prove it, read from the test file in the current session. A file name or
  a remembered purpose is not evidence. If no assertion exists, the plan marks the behavior
  **UNGUARDED** and adds a pre-check test as step 0, committed before any production change.

* **OO Principles (the Shape Gate, WF-009)**: the eight rules this codebase lives by, in one place. 1–6 are asked by
  `/grill` check 3 with the evidence named; 7–8 are guidance. The evidence is read in `web/` (`src/`, `tests/`, `e2e/`).

| # | Principle | Taught by | Check (evidence) |
| :-- | :-- | :-- | :-- |
| 1 | **One owner per fact** — a rule, a list, a table lives in exactly one place | HK-020 | grep the fact's literal across `web/src`; a second owner is a FAIL unless removed in the same wave |
| 2 | **Behavior lives with its data** — no static logic, no anemic type | HK-015, model "No Anemic Models" | every `static` names its reason in a comment (a factory for a text form, an entry point); a static holding a rule or state is a FAIL — "pure function" is not a reason |
| 3 | **Ask the object** — polymorphism over type checks | Phase 8/9/10, WF-004 | grep the new code and its tests for `instanceof` on a place, fragment, option or prompt, and for a `switch` on `kind().key()` |
| 4 | **Dependencies are injected, never located** | HK-008 | adapters are built only in `src/main.ts`, the composition root; the engine gets what it needs through interfaces it owns; no static instance; the Shape table's `owner` column |
| 5 | **A new kind is a registry entry, not a new branch** | Phase 9, HK-005 | a new place kind is a `LocationRegistry` entry, a new action a `GameEngine` registry entry naming its `Turn`, a new fragment a row in the reader's table, a new screen a stage in `main.ts`; a new `if`/`switch` on kind is a FAIL |
| 6 | **Domain values are objects with identity by stable key** — not primitives, not display strings | Phase 3, HK-018 | a new `number`/`string` field carrying a domain concept names why it is not a value object (identity by stable key, as `Relic`); a lookup by display name is a FAIL |
| 7 | State changes through domain-meaningful methods; immutable where nothing needs to change | model "Behavior-Driven Mutation" | guidance — no gate |
| 8 | One class, one job; one method, one job | HK-013 | guidance — no gate |

* **Shape Claim Protocol**: every plan that adds a class, a method on a new class, or a static carries a **Shape table** —
  one row per new thing: `what | kind | owner | the one fact it owns | statics + why` (`kind` ∈ value object / entity /
  service / listener / command / factory). It is the evidence for checks 1, 2, 4 and 6; a missing row is a grill FAIL.
  A change that extends something the backlog or a lesson already names as a smell says so and logs the item.

---

## 🏺 Self-Improvement Loop
* After ANY correction from the user: a correction about how to work with the user becomes a line in the block at the
  top of `CLAUDE.md` (≤ 12 rules, ≤ 500 words, checked by `./.claude/docs-check.sh` — merge or replace, never grow past); any other updates the relevant
  `tasks/lessons/<domain>.md` file.
* **Do NOT use Claude's persistent memory for project lessons** — `tasks/lessons/` is the source of truth. Lessons written there survive across sessions and agents.
* Write rules that prevent the same mistake from recurring.
* **A lesson is the rule plus a pointer, not the story**: state the rule in one or two sentences and cite the wave (`(HK-012)`) — the incident lives in that wave's chronicle and retro. `infrastructure.md` loads every session and the domain files whenever their folder is touched; every sentence is paid for each time.
* Lessons load with their domain: `infrastructure.md` (process) every session, `tasks/lessons/web.md` from `web/CLAUDE.md`.

## 🏛️ Safety Mandates
- **A moved or refactored file keeps its logic**: read the whole original, never a template or a skeleton; after the
  move, `git diff` shows the move and nothing else (structural collapse, `journals/POST_MORTEM_2026_03_11.md`).
- **Lazy loading**: a place's children are reached only through the accessor that generates them
  (`journals/POST_MORTEM_2026_03_06.md`; the web law's `Location`).
