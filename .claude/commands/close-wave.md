# /close-wave — The Close-Out Protocol

Closes a **wave**: any unit of work that gets closed — a phase, a backlog item, a docs session, a one-line fix.
It finds the documents the wave made false, makes the handover true, runs the mechanical gate and ends in a
table. It sizes itself: step 0 picks a tier from the diff. It never commits, merges or pushes without a Directive.

Origin: WF-007 (the gate) and WF-008 (the tiers) in `docs/analysis/WORKFLOW_BACKLOG.md`.

**Web port queue sessions do not run this command.** Their close-out is the Standing Order in `.claude/CODEX.md`:
gates green, queue ticked, handover true, `./terminal/vinc.sh --docs` green, commit, push — no chronicle, no retro (user,
2026-09-21).

---

## 🌌 PHILOSOPHY
The author of a change remembers what they *touched*; nobody remembers what they *made false*. So this pass
assumes a document is stale and looks for which one. Two halves: `./terminal/vinc.sh --docs` owns the facts a machine
can check; this protocol owns the ones that need reading. And a close-out must cost less than the work it
closes: **one record per wave, pointers everywhere else.**

---

## 🛠️ WORKFLOW

### 0. PICK THE TIER — mechanically, then print it
Name the wave, its base commit, and run `git diff --name-only <base>..HEAD`. The file list sets the **floor**:

| Tier | Floor (from the file list) | Rows to run |
| :--- | :--- | :--- |
| **Trivial** | one commit, touching only `tasks/RECOVERY_PROMPT.md` and/or `tasks/todo.md` | 10 only — the report is the `DOCS=` line |
| **Light** | nothing under `terminal/src/` | 1, 2, 8, 9, 10 |
| **Full** | anything under `terminal/src/`, a moved golden, a changed `terminal/config/lint/baseline.xml` | all ten |

Judgment may only **add** rows. Check each reason against the wave; an add-on names its reason in the report:

| Reason | Adds row |
| :--- | :--- |
| the user corrected the agent during the wave | 7 Lessons |
| law or tooling changed (`.claude/`, any `CLAUDE.md`, `vinc.sh`, `terminal/.agents/`, `terminal/config/lint/`) | 5 Chronicle |
| a High backlog item closes, or the wave spanned more than one session | 5 Chronicle + 6 Retro |
| the player can see a difference (`docs/terminal/`, resource text) | 4 Player docs |

Running fewer rows than the floor needs the user's word, quoted in the report. When in doubt between two
tiers, the diff decides — not how small the wave felt.

### 1. RUN THE ROWS — in order
Every row is backed by tool output from this session (Read, grep, `./terminal/vinc.sh`, `git`). A row answered from
memory is **not done**, whatever the answer.

| # | Row | What to do | Evidence |
| :--- | :--- | :--- | :--- |
| 1 | **Preconditions** | Code waves: merged to `master` (the chronicle id is that merge's hash). A wave with no `terminal/src/` change may close on its own branch (id = its last work commit; one merge carries both). `./terminal/vinc.sh --test --agent`, `--lint --agent`, `--scan` if `model`/`procgen` changed. `git status --short` clean (the player's untracked save backups excepted). | the output lines |
| 2 | **False facts** | Write each fact the wave made false **in the old state's own words** — the phrase a stale document would still contain (an old count, an old rule, "open", "blocks"), not the symbol names. `grep -rn` each across `docs/`, `tasks/`, every `CLAUDE.md`, `.claude/`, `README.md`. Fix or justify every hit. Chronicles, retros and `tasks/completed/` are history — never rewritten. | phrases, hits, disposition of each |
| 3 | **Blueprints** | For every touched class with a file in `terminal/docs/blueprints/logic/classes/<pkg>/`: read the blueprint against the class, correct it, re-stamp its last line `*Verified against: <Class>.groovy @ <hash>*` (`git hash-object <file> \| cut -c1-10`). `Baselined (not audited)` becomes `Verified` only after the whole blueprint was read against the class. Domain `CLAUDE.md` if an invariant moved. | class → what changed |
| 4 | **Player docs** | `docs/terminal/` (guide, manual, codex) for every behavior the player can see. | pages, or n/a + why |
| 5 | **Chronicle** | Invoke `/chronicle`. **This log is the wave's one record** — every other file points at its id. Index row ≤ 40 words. | log id |
| 6 | **Retro** | `terminal/docs/retro/RETRO_<WAVE>.md` — what went well / wrong / concerns, not a second changelog. Friction → `WORKFLOW_BACKLOG.md`; a `High` item blocks the next phase. | file, items logged |
| 7 | **Lessons** | One lesson per user correction → `tasks/lessons/<domain>.md`. Never Claude's memory. | title, or n/a |
| 8 | **Task records** | Pointers, not retellings: `tasks/todo.md` line ≤ 30 words; backlog entry → CLOSED, resolution ≤ 60 words + record link; plan → `tasks/completed/` with commits + gate lines only; the active task document's status line. With no chronicle, the todo line is the record. | files |
| 9 | **Recovery prompt** | `tasks/RECOVERY_PROMPT.md` holds **current state only**: header, the status lines (Test Suite, Latest chronicle, Lint, Docs, Branch), Active Work ≤ 60 words, Next (every open thread and undecided user question), resume steps, links. No per-wave history — that is the chronicle's job, and D4 caps the file. Hints must survive one more commit ("the last code merge is X", never "the top commit is Y"). | lines changed |
| 10 | **Gate** | `./terminal/vinc.sh --docs --agent` → `DOCS=PASS`. A FAIL names the file and the stale value. Never edit a stamp, a count or a word total to match without doing the row it belongs to. | the output line |

### 2. REPORT
Header: `wave · tier (floor evidence) · add-ons (reason each)`. Then the table of the rows run, each **done**
(evidence) or **n/a** (reason); rows outside the tier are not listed. End with one of:
- **READY TO CLOSE** — ask for the commit/merge Directive. Only after that merge may the chat say **closed**.
- **OPEN ROWS** — list them; the wave is not closed.

### 3. COMMIT DISCIPLINE (after the Directive)
- One branch (`docs/close-<wave>`, or the wave's own branch when it had no `terminal/src/` change). Scripted edits and
  `git add && git commit` on one `&&` chain; anchor inserts on a unique line and assert `count == 1`; read
  the edited region before committing.
- `./terminal/vinc.sh --docs --agent` again after the merge. Push only on the user's word.

---

## 📍 EXAMPLE TRIGGERS
- "Close the wave." / "Wrap the session."
- Any moment the agent is about to write "closed", "merged" or "done" about a wave.

---

## 🏺 ARCHITECT'S NOTE
The word "closed" is this command's output and nothing else's. Add a script check only when a stale fact got
past the table and a machine could have caught it; add a row never — widen a tier's reasons instead.
