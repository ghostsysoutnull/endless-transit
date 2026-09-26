# THE CODEX: Operating Law

This file defines the workflow and the verification law; the OO and testing principles live in `CLAUDE.md`. When to act
and how to talk to the user: the block at the top of `CLAUDE.md`, which outranks this file.

---

## 🚦 How an iteration runs
Three processes, each whole in its own file: **the Solo loop** (`.claude/SOLO_LOOP.md`), the default; **the Standing
Order** (`.claude/STANDING_ORDER.md`), only when the user asks for it; and **law mode** (`.claude/LAW_MODE.md`), for
work on the rules themselves, when the user says "law mode" or starts with "hi" a handover that names it.

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
2. **Handover true:** `tasks/RECOVERY_PROMPT.md` holds current state only; a backlog entry closes with a pointer to its
   record.
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
  as step 0, committed before any production change. (Phase 6b, Phase 10)
* **OO Principles**: in `CLAUDE.md`. `/grill`'s Shape check asks each of them on the plan; the **design check** asks
  each of them on the built code: before an iteration closes, they are run on its diff with the evidence named. (U02:
  the plan passed them, the code broke them 19 times, `tasks/ui/U02-fixes.md`.)
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
* **A lesson is the rule plus a pointer, not the story**: state the rule in one or two sentences and cite the wave
  (`(HK-012)`) — the incident lives in that wave's chronicle and retro. Every sentence is paid for each time its file
  loads.
* Lessons load with their domain: `infrastructure.md` (process) every session, each domain's file from its folder's
  `CLAUDE.md` (`tasks/lessons/web.md` from `web/CLAUDE.md`).

## 🏛️ Safety Mandates
- **A moved or refactored file keeps its logic**: read the whole original, never a template or a skeleton; after the
  move, `git diff` shows the move and nothing else (structural collapse, `journals/POST_MORTEM_2026_03_11.md`).
- **Lazy loading**: stated once, in `web/CLAUDE.md`'s engine laws (`journals/POST_MORTEM_2026_03_06.md`).
