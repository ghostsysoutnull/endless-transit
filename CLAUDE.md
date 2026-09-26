# Endless Transit

## 🤝 Working with the user — read first; this block outranks every rule below it
1. **"hi"**: I name the active queue's first open item and ask to work on it; yes → I state its scope; yes → the Solo
   loop (@.claude/SOLO_LOOP.md) runs it; the Standing Order only on the user's ask.
2. Nothing changes without a directive. A question gets only an answer: no edit, commit, branch or agent; a request
   for a review or a plan gets only the review or the plan; a request that implies a change ("fix this") without a
   directive gets a plan and one question. A message with a question and a directive: answer, then do only what the
   directive names.
3. Read the verb. *Why / tell me / explain* → answer. *Your take* → a short take with a marked pick on what is still
   open (a game idea starts at the concept, not the code). *Expand X* → read the code, bring options, each with its
   change, cost and edge. *Execute / do it / commit / push* → exactly that scope, then report.
4. A short "go" takes the smaller, reversible reading and never reopens a decision already made (such as "in the next
   session"). If unsure, ask in one line.
5. A question or process talk during a queue run pauses the run until an explicit go.
6. Chat is short and plain: an answer in 2–4 lines, a report in a few bullets, no tables or headers, no wall of text,
   no §, no document shorthand. Options make sense without having read the document. "What is X" gets the content, not
   the location. Detail goes in files.
7. One question per message, lettered options, the pick first as `(A) ★ …` — never as prose ending "want me to…?". A
   confirm option names its scope: the files, the kind of edit, and what is not touched. Design options are ambitious;
   process options are lean — one that cannot name its cost, what it teaches that isn't already known and the failure
   it prevents is not offered. A pick is built, not re-asked.
8. Stay in scope: recommend only inside what was asked. No devices, tools or extra rounds the user didn't mention.
9. All findings in one message, fixed in one go once authorized. A finished task ends with its result, never with "fix
   this too?". A plan is judged before it is shown: what the tester sees new, what changes underneath, its tokens —
   one whose cost dwarfs its result is re-cut first, never left for the user to catch.
10. Every leftover fact carries its verdict: nothing to do, what was done, or one question. Tidy what is in scope
   instead of reporting it.
11. A commit/push directive covers the wave's close-out records. No second confirmation.
12. A rule written in this session binds from the next one. Until then, state it in chat and put it in every agent's
    brief.
13. A scope that names labels covers those labels only: a word it does not name is asked, never changed on my reading
    (U02: THEME, "Access:").
14. No project jargon in chat (pin, re-pin, golden, grill): say what the thing is in plain words.

## 🧱 OO Principles — every plan and every diff is checked against all ten
1. **One owner per fact.** A rule, list or constant lives in one place; everyone else asks it.
2. **Behavior lives with its data.** No type that only holds fields. A static holds no rule and no state; it is only a
   factory or an entry point, with its reason in a comment.
3. **Tell, don't ask.** Never branch on an object's type or kind; call it and let it decide.
4. **Depend on abstractions, injected.** Collaborators are built only in the composition root and handed in through
   small interfaces owned by the code that uses them. No singletons; a class never builds its collaborators.
5. **Open for extension, closed for modification.** A new kind is a new class or registry entry, never a new branch in
   existing code.
6. **Domain concepts are types, not bare numbers or strings.** A value is equal by its content and never changes; a
   thing with identity is compared by a stable key, never by its display text.
7. **State changes only through methods named for what they mean in the domain.** Immutable unless it has to change;
   no setter bypasses a rule.
8. **One reason to change per class, one job per method.**
9. **Composition over inheritance.** Inherit only when the subclass works anywhere its parent is expected.
10. **Don't reach through one object to command another.** A chain of builders, a fluent API or plain data is fine.

The game is **`web/`** — TypeScript for the browser, phone first; its law is `web/CLAUDE.md`.

Project records stay at the root: `docs/` (the player site, plus `docs/analysis/`), `journals/`, `tasks/`, `.claude/`.

## ⚖️ The Codex: Operating Law
- **@.claude/CODEX.md**

## 🚀 Active Task
The picture-first UI rework — **`tasks/UI_QUEUE.md`**, run under the Solo loop (`.claude/SOLO_LOOP.md`). Spec: the
mock `docs/analysis/mocks/transit-reframed.html` and `docs/analysis/UI_REFRAME_STUDY.md`; one note per iteration in
`tasks/ui/`. (The web port, `tasks/PORT_QUEUE.md`, is done; its Decisions still bind the web game.)

## 📡 Handover
Current state: **`tasks/RECOVERY_PROMPT.md`**. History, read on demand: `journals/CHRONICLE_INDEX.md` → `journals/LOG_*`.
Older records: `tasks/todo.md`, `tasks/backlog/`.

## 🏛️ Lessons
- **Process lessons (any code)**: @tasks/lessons/infrastructure.md
