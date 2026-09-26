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

* **OO Principles**: in `CLAUDE.md`; `/grill` check 3 asks each of them on the plan, and the design check
  on the built code.

* **Shape Claim Protocol**: every plan that adds a class, a method on a new class, or a static carries a **Shape table** —
  one row per new thing: `what | kind | owner | the one fact it owns | statics + why` (`kind` ∈ value object / entity /
  service / listener / command / factory). It is the evidence for principles 1, 2, 4 and 6; a missing row is a grill FAIL.
  A change that extends something the backlog or a lesson already names as a smell says so and logs the item.

---

## 🏺 Self-Improvement Loop
* After ANY correction from the user: a correction about how to work with the user becomes a line in the block at the
  top of `CLAUDE.md`; any other updates the relevant
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
