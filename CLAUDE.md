# Endless Transit

## 🤝 Working with the user — read first; this block outranks every rule below it
1. Nothing changes without a directive. A question gets only an answer: no edit, commit, branch or agent; a request
   for a review or a plan gets only the review or the plan; a request that implies a change ("fix this") without a
   directive gets a plan and one question. A message with a question and a directive: answer, then do only what the
   directive names. ("hi" in a queue session is a go for the queue — never the go for a plan that is waiting.)
2. Read the verb. *Why / tell me / explain* → answer. *Your take* → a short take with a marked pick on what is still
   open (a game idea starts at the concept, not the code). *Expand X* → read the code, bring options, each with its
   change, cost and edge. *Execute / do it / commit / push* → exactly that scope, then report.
3. A short "go" takes the smaller, reversible reading and never reopens a decision already made (such as "in the next
   session"). If unsure, ask in one line.
4. A question or process talk during a queue run pauses the run until an explicit go.
5. Chat is short and plain: an answer in 2–4 lines, a report in a few bullets, no tables or headers, no wall of text,
   no §, no document shorthand. Options make sense without having read the document. "What is X" gets the content, not
   the location. Detail goes in files.
6. One question per message, lettered options, the pick first as `(A) ★ …` — never as prose ending "want me to…?". A
   confirm option names its scope: the files, the kind of edit, and what is not touched. Design options are ambitious;
   process options are lean — one that cannot name its cost, what it teaches that isn't already known and the failure
   it prevents is not offered. A pick is built, not re-asked.
7. Stay in scope: recommend only inside what was asked. No devices, tools or extra rounds the user didn't mention.
8. All findings in one message, fixed in one go once authorized. A finished task ends with its result, never with "fix
   this too?". A plan is judged before it is shown: what the tester sees new, what changes underneath, its tokens —
   one whose cost dwarfs its result is re-cut first, never left for the user to catch.
9. Every leftover fact carries its verdict: nothing to do, what was done, or one question. Tidy what is in scope
   instead of reporting it.
10. A commit/push directive covers the wave's close-out records. No second confirmation.
11. A rule written in this session binds from the next one. Until then, state it in chat and put it in every agent's
    brief.

The game is **`web/`** — TypeScript for the browser, phone first; its law is `web/CLAUDE.md`.

Project records stay at the root: `docs/` (the player site, plus `docs/analysis/`), `journals/`, `tasks/`, `.claude/`.

## ⚖️ The Codex: Operating Law
- **@.claude/CODEX.md**

## 🚀 Active Task
The picture-first UI rework — **`tasks/UI_QUEUE.md`**, run under the Standing Order (`.claude/CODEX.md`). Spec: the
mock `docs/analysis/mocks/transit-reframed.html` and `docs/analysis/UI_REFRAME_STUDY.md`; one note per iteration in
`tasks/ui/`. (The web port, `tasks/PORT_QUEUE.md`, is done; its Decisions still bind the web game.)

## 📡 Handover
Current state: **`tasks/RECOVERY_PROMPT.md`**. History, read on demand: `journals/CHRONICLE_INDEX.md` → `journals/LOG_*`.
Older records: `tasks/todo.md`, `tasks/backlog/`.

## 🏛️ Lessons
- **Process lessons (any code)**: @tasks/lessons/infrastructure.md
