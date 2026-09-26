# The Standing Order

The older, agent-run way to work a queue (user Directive, 2026-09-21). **It runs only when the user asks for it**; the
Solo loop (`.claude/SOLO_LOOP.md`) is the default. The law both share is `.claude/CODEX.md`; the user block at the top of
`CLAUDE.md` outranks both.

## 🚦 THE STANDING ORDER — queue sessions (user Directive, 2026-09-21; extended to the UI queue 2026-09-24)
For every session that works a queue — `tasks/PORT_QUEUE.md` (done) or `tasks/UI_QUEUE.md` — this section **replaces** `/grill` as an authorization step and the
close-out of CODEX § 1.5. `.claude/CODEX.md` (OO principles, Shape
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
   stops and reports → the main session runs `npm run check` (not the browser suite — the tester plays the build first and asks
   for it; user decision 2026-09-25), fixes or sends back → merge
   `--no-ff` → tick the queue, make the handover true → commit → push → confirm the live build answers. No reviewer or
   fixer agent (user decision 2026-09-23: they cost ~900k tokens an iteration and half their findings were test
   tightness; the tester's findings are the review).
3. **After the go, no questions.** What the plan and the Decisions do not cover, the build decides in their spirit and
   writes in the note.
4. **Safety net.** Merge only when every gate of the touched tree is green (`web/**` → `npm run check`; the browser suite in
   the phone profile when the user asks for it — the game is for phones only). **The only early stop:** a gate still red after honest
   tries — that iteration stays unmerged and the run ends with a plain report.
5. **Lean records.** No chronicle, no retro, no blueprint, no `todo.md` line, no workflow-backlog entry — the note and
   the merge commit are the record. A user correction still becomes a line: in the block at the top of `CLAUDE.md` when it is about working with the
   user, else a one-line lesson. `./.claude/docs-check.sh` stays green.
6. **Ends clean.** The last message says what was done, what the tester can try and where. No leftovers list, no
   closing question.
7. **No users, no compatibility.** Saves, journals and old seeds need no protection and no migration. Still name the
   paths in `git add` — never `-A`.

## Subagent Strategy
* Use subagents (via the `Agent` tool) to keep the main context window clean.
* **Subagent Discipline**: Subagents MUST read the full content of any file they are instructed to move, copy, or refactor. Proposing changes based on templates or skeletons is a failure.
* **Agent Verification**: Verify all subagent-proposed changes against the original files before implementation.
