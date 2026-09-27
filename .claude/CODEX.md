# THE CODEX: Operating Law

This file defines the workflow and the verification law; the OO and testing principles live in `CLAUDE.md`. When to act
and how to talk to the user: the block at the top of `CLAUDE.md`, which outranks this file.

---

## 🚦 How work runs
One process: **the Solo loop** (`.claude/SOLO_LOOP.md`), how every wave runs. **Law mode** (`.claude/LAW_MODE.md`)
adds to it for work on the rules themselves, when the user says "law mode" or starts with "hi" a handover that names
it.

---

## 🏗️ Workflow Orchestration

### Re-plan
* When a test or a step fails in a way the plan did not predict, STOP and re-plan — don't keep pushing.

### Surgical precision
* Minimal, targeted changes; no "cleanup" of code outside the task.

### Closing a wave
A wave — a queue iteration, a backlog item, a docs session, a one-line fix — closes after its last action (the merge,
the push, the live check), in one go under the directive that started it:
1. **False facts:** write each fact the wave made false in the old state's own words; `grep -rn` them across `docs/`,
   `tasks/`, every `CLAUDE.md`, `.claude/`, `README.md`; fix every live hit (`journals/` and `tasks/completed/` are
   history).
2. **Handover true:** `tasks/RECOVERY_PROMPT.md` holds current state only — the branch, the work in progress and its
   next step, the open threads, each as a pointer; never a rule or a start-up prompt, which drift from their owners. A
   backlog entry closes with a pointer to its record.
3. **Lessons:** each user correction becomes a block line or a lesson (the Self-Improvement Loop below).
4. **Gate:** `./.claude/docs-check.sh --agent` → `DOCS=PASS`.
5. **One chain:** the edits `&& git add <paths> && git commit`, merged `--no-ff`. A branch is deleted when its work is
   done; one the handover names as continuing stays.

A chronicle or a retro only when the user asks.

### Verification
* Never mark a task complete without proving it works.
* **AI-TDD**: reproduce every behavior bug with a test before fixing it; a change of wording or look is not a bug;
  when a UI bug's browser test runs is the process's call.
* **Coverage Claim Protocol**: a plan statement of the form "test X guards behavior Y" cites the assertion lines of an
  enabled test that prove it, read in the current session; a file name, a grep hit, a disabled test or a remembered
  purpose is not evidence. If no assertion exists, the plan marks the behavior **UNGUARDED** and adds a pre-check test
  as step 0, committed before any production change.
* **OO Principles**: in `CLAUDE.md`. `/grill`'s Shape check asks each of them on the plan. The **design check** asks
  them, the TypeScript and OO rules and the testing principles on the built code: the `design-check` agent
  (`.claude/agents/design-check.md`) runs them on each commit's diff with the evidence named, and its breaks are fixed
  before the next commit begins.
* **Shape Claim Protocol**: every plan that adds a class, a method on a new class, or a static carries a
  **Shape table** — one row per new thing: `what | kind | owner | the one fact it owns | statics + why`
  (`kind` ∈ value object / entity / service / listener / command / factory). It is the evidence for one owner per fact,
  behavior with its data, injected abstractions and domain types; a missing row is a grill FAIL.
* **Known smells**: a change that extends something the backlog or a lesson already names as a smell says so and logs
  the item.

---

## 🏺 Self-Improvement Loop
* After ANY correction from the user: a correction about how to work with the user becomes a line in the block at the
  top of `CLAUDE.md`; any other updates the relevant `tasks/lessons/<domain>.md` file.
* **Do NOT use Claude's persistent memory for project lessons** — `tasks/lessons/` is the source of truth. Lessons
  written there survive across sessions and agents.
* **A lesson is the rule, not the story**: one or two sentences, with no incident, pointer or date; the history lives
  in the records and `git log`. Every sentence is paid for each time its file loads.
* Lessons load with their domain: `infrastructure.md` (process) every session, each domain's file from its folder's
  `CLAUDE.md` (`tasks/lessons/web.md` from `web/CLAUDE.md`).

## 🏛️ Safety Mandates
- **A moved or refactored file keeps its logic**: read the whole original, never a template or a skeleton; after the
  move, `git diff` shows the move and nothing else.
- **Lazy loading**: stated once, in `web/CLAUDE.md`'s engine laws.
