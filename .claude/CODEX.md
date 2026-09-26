# THE CODEX: Operating Law

This file defines the workflow and the engineering law. When to act and how to talk to the user: the block at the top
of `CLAUDE.md`, which outranks this file.

---

## 🚦 THE STANDING ORDER — queue sessions (user Directive, 2026-09-21; extended to the UI queue 2026-09-24)
For every session that works a queue — `tasks/PORT_QUEUE.md` (done) or `tasks/UI_QUEUE.md` — this section **replaces** `/grill` as an authorization step and the
close-out of § 1.5. The rest of this file (OO principles, Shape
table, coverage claims, tests before fixes) still governs the code that gets written.

1. **"hi" runs the queue** — the user block at the top of `CLAUDE.md` outranks this order (a question or process talk
   pauses the run until an explicit go). Read `tasks/RECOVERY_PROMPT.md` and the active queue. Every "hi" opens with
   the queue, one line per iteration — done ✓, next ▶, to come · — each with its name and what the tester can try,
   read from the queue's table; then the work starts. Run anything under "Reported by the tester" first, then the
   first unticked iteration, then the next — until the queue is empty. Each UI iteration stops once, at its plan (item
   2); "hi" resumes at the next plan, never past it. The next "hi" continues from the queue.
2. **The main session manages; a writer plans, a fresh builder builds.** Per iteration: branch `ui/<id>-<name>` → the
   writer, briefed from `.claude/brief.md`, reads what the brief names (the queue's Decisions, the mock's part for this
   scene in full, the study's lines, the code files it will change; a targeted plan ends near 105–140k of context) and
   returns a plan — scope, Shape table, the tests that change, what the tester can try, what changes underneath, a
   token estimate, the file list a builder needs — and ends; a true unknown gets a probe of minutes, never a throwaway
   spike; an iteration too big is split in the plan into slices that each show the tester something new → the main
   session grills it (the Decisions, the Shape Gate, and the build's tokens against what the tester sees new — a plan
   whose cost dwarfs its result is re-cut before it is shown) and shows the user about ten lines → on the user's go a
   **fresh builder** gets the approved plan and its file list and builds (every build step re-reads its whole context:
   the writer's plan carried into U01a's build was 70% of its spend, `tasks/ui/U01-cost.md`): tests first, green is
   done, one commit per module with its tests, a note `tasks/ui/<id>.md` (it records for the plan and the build the
   agent tool's figure — the final context — and the processed tokens from the transcript, beside the estimate);
   it runs `npm run check` and only the browser specs it touches, phone profile, and past 1.5× its token estimate it
   stops and reports → the main session runs `npm run check` and the full `npm run e2e` once, looks at the fixed
   screenshots (the new scene on the phone, and under reduced motion), fixes or sends back → merge
   `--no-ff` → tick the queue, make the handover true → commit → push → confirm the live build answers. No reviewer or
   fixer agent (user decision 2026-09-23: they cost ~900k tokens an iteration and half their findings were test
   tightness; the tester's findings are the review).
3. **After the go, no questions.** What the plan and the Decisions do not cover, the build decides in their spirit and
   writes in the note.
4. **Safety net.** Merge only when every gate of the touched tree is green (`web/**` → `npm run check`, browser tests in
   the phone profile — the game is for phones only). **The only early stop:** a gate still red after honest
   tries — that iteration stays unmerged and the run ends with a plain report.
5. **Lean records.** No chronicle, no retro, no blueprint, no `todo.md` line, no workflow-backlog entry — the note and
   the merge commit are the record. A user correction still becomes a line: in the block at the top of `CLAUDE.md` when it is about working with the
   user, else a one-line lesson. `./.claude/docs-check.sh` stays green.
6. **Ends clean.** The last message says what was done, what the tester can try and where. No leftovers list, no
   closing question.
7. **No users, no compatibility.** Saves, journals and old seeds need no protection and no migration. Still name the
   paths in `git add` — never `-A`.

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

### 2. Subagent Strategy
* Use subagents (via the `Agent` tool) to keep the main context window clean.
* **Subagent Discipline**: Subagents MUST read the full content of any file they are instructed to move, copy, or refactor. Proposing changes based on templates or skeletons is a failure.
* **Agent Verification**: Verify all subagent-proposed changes against the original files before implementation.

### 4. Verification
* Never mark a task complete without proving it works.
* **AI-TDD**: reproduce every bug with a test before fixing it.
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
