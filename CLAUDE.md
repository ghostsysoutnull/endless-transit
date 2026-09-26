# Endless Transit

## 🤝 Working with the user — read first; this block outranks every rule below it
1. **"hi"**: I name the handover's next step (`tasks/RECOVERY_PROMPT.md`) and ask to start it; yes → I state its scope;
   yes → it runs under the process the handover names, else the Solo loop (@.claude/SOLO_LOOP.md); the Standing Order
   only on the user's ask.
2. Chat is short and plain: an answer in 2–4 lines, a report in a few bullets; no tables, headers, wall of text, project
   jargon or document shorthand — say what the thing is in plain words. Content the user asks to see (a list to approve,
   a draft) is shown whole; the limit covers my words around it. "What is X" gets the content, not the location. Detail
   goes in files. A correction about form changes the form and keeps the judgment: adjust, never swing to the opposite.
3. One question per message, lettered options, the pick first as `(A) ★ …` — never as prose ending "want me to…?". A
   confirm option names its scope: the files, the kind of edit, and what is not touched. Options make sense without
   having read the document. A pick is built, not re-asked; a decision already made is never reopened.
4. Design options are ambitious; a process option is offered only if it names its cost, what it teaches that isn't
   already known and the failure it prevents.
5. Nothing changes without a directive. A question gets only an answer: no edit, commit, branch or agent; a request for
   a review or a plan gets only the review or the plan; a request that implies a change ("this looks wrong") without a
   directive gets a plan and one question. A message with a question and a directive: answer, then do only what the
   directive names. A question or process talk during a running task pauses it until an explicit go.
6. Read the verb. *Why / tell me / explain* → answer. *Your take* → a short take with a marked pick on what is still
   open; a new idea starts at the concept, not the code. *Expand X* → read the code, bring options, each with its
   change, cost and edge. An imperative that names a change (*do it / move / apply / fix / commit / push*) or a picked
   option → exactly that scope, then report.
7. A short "go" takes the smaller, reversible reading. If unsure, ask in one line.
8. Stay in scope: recommend only inside what was asked, no tools or extra rounds the user didn't mention. A scope that
   names items covers those items only: anything it does not name is asked, never changed on my reading. A reference the
   change makes false is inside its scope, and the confirm option lists those files up front. Tidy what is in scope
   instead of reporting it.
9. A plan is judged before it is shown: what the user sees new, what changes underneath, its cost in tokens and in the
   user's waiting time — one whose cost dwarfs its result is re-cut first, never left for the user to catch.
10. All findings in one message, fixed in one go once authorized. A finished task ends with its result, never with "fix
    this too?"; every leftover fact carries its verdict: nothing to do, what was done, or one question.
11. A commit/push directive covers the work's close-out records. No second confirmation.
12. A rule approved in this session binds at once. The file loads only when a session starts, so until the next one I
    state the rule in chat and put it in every agent's brief.

## 🧱 OO Principles — every plan and every diff is checked against each of them
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
7. **State changes only through methods named for what they mean in the domain.** A class guards its invariant: it is
   never built or left in an invalid state. Immutable unless it has to change; no setter bypasses a rule.
8. **Each class hides one decision likely to change; each method does one job.** A second reason to change is a second
   class.
9. **Composition over inheritance.** Inherit only when the subclass works anywhere its parent is expected.
10. **Don't reach through one object to command another.** A chain of builders, a fluent API or plain data is fine.
11. **A method either changes state or answers a question, never both.** Asking must not change the answer. A builder
    that returns itself is the exception.

## 🧪 Testing principles — a test earns its place by the regression it would catch
1. **Test behavior, not structure.** A test's result changes when behavior changes, and only then; a refactor that
   keeps behavior leaves every test green.
2. **Every test can catch a real regression.** A test that can only fail on an intended change is a change detector
   and is not written.
3. **Assert the outcome, not the incidentals.** Check the facts the test is about — not whole objects, exact wording,
   markup or styling it does not name.
4. **One behavior, one layer: the lowest that can see it.** A broad test checks the flow, not what a narrow test
   already checks; duplicates across layers are merged down.
5. **Test the way the software is used.** Find UI elements by role and accessible name or a stable id, never by
   incidental text or structure.
6. **Output reviewed as a whole lives in one approved snapshot.** Changing it means re-approving it and reading the
   diff, never editing assertions one by one.
7. **A characterization test is scaffolding.** A snapshot taken to protect a refactor is removed, or turned into
   behavior tests, when the refactor lands.
8. **Deterministic, isolated, fast.** Same code, same result; no clock, randomness or order dependence; a flaky test is
   fixed or deleted, never retried.
9. **A skipped test guards nothing.** It runs or it is deleted; what only it guarded is covered again first.
10. **Readable over DRY.** Each test reads on its own; shared setup covers only what the test doesn't care about, and
    test data comes from builders with defaults, so a new field is one edit.

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
