# /close-wave — The Close-Out Protocol

Closes a **wave**: any unit of work that gets closed — an OOA phase, an HK item, a WF item, a docs session.
Use after the wave's code is merged and before anyone says "closed". It audits every document the wave
could have made false, writes the chronicle and the retro, makes the recovery prompt true for the next
session, runs the mechanical gate, and ends in a filled table. It never commits, merges or pushes without
a Directive.

---

## 🌌 PHILOSOPHY
A close-out that edits only the files the plan listed is not a close-out. The author of a change remembers
what they *touched*; nobody remembers what they *made false*. So this pass assumes a document is stale and
looks for which one, the same stance `/grill` takes toward a plan. Origin: WF-007 in
`docs/analysis/WORKFLOW_BACKLOG.md` — the user had to ask "are all docs updated?" at every close, and the
answer was never yes (HK-019: blueprint, recovery prompt header and journal pointer, a lesson's tense, the
retro, the lesson; HK-013: three repair commits).

Two halves: the **script** (`./vinc.sh --docs`) owns the facts a machine can check; this **protocol** owns
the ones that need reading. Neither is optional.

---

## 🛠️ WORKFLOW

### 1. NAME THE WAVE
- The wave id (`HK-020`, `PHASE_11`, `WF-008`, `DOCS_<topic>`), its plan document, its base commit
  (`git merge-base` of the wave's first branch with `master`, or the commit before its first change) and
  whether it changed behavior the player can see.
- `git diff --name-only <base>..HEAD -- src/main` → the production classes touched. This list drives rows 3 and 4.

### 2. RUN THE TEN ROWS — in this order
Every row must be backed by tool output produced in this session (Read, grep, `./vinc.sh`, `git`).
A row answered from memory is **not done**, whatever the answer.

| # | Row | What to do | Evidence |
| :--- | :--- | :--- | :--- |
| 1 | **Preconditions** | Code merged to `master`. `./vinc.sh --test --agent`, `./vinc.sh --lint --agent`, and `./vinc.sh --scan` if `model`/`procgen` changed. `git status --short` clean (the player's untracked save backups excepted). | the three output lines |
| 2 | **False facts** | Write down each fact the wave made false **in the old behavior's words** ("is sticky", "by name", "9 entries"), not the symbol names. `grep -rn` each across `docs/`, `tasks/`, every `CLAUDE.md` + `GEMINI.md`, `.claude/`, `README.md`. Fix or justify every hit (chronicles, retros and `tasks/completed/` are history — never rewritten). | the phrases, the hit list, the disposition of each hit |
| 3 | **Blueprints** | For every touched class with a file in `docs/blueprints/logic/classes/<pkg>/`: read the blueprint against the class, correct it, re-stamp the last line `*Verified against: <Class>.groovy @ <hash>*` with `git hash-object <file> \| cut -c1-10`. A `Baselined (not audited)` stamp may only be replaced by `Verified` after the whole blueprint has been read against the class. Domain invariants (`src/main/groovy/com/endlesstransit/<pkg>/CLAUDE.md`) if an invariant moved. | class → blueprint → what changed |
| 4 | **Player docs** | If behavior changed: `docs/terminal/` (guide, manual, codex) for the affected rows. | pages edited, or n/a + why |
| 5 | **Chronicle** | Invoke `/chronicle` (do not reimplement it). New `journals/LOG_*` + top row in `journals/CHRONICLE_INDEX.md`. | log id |
| 6 | **Retro** | `docs/retro/RETRO_<WAVE>.md` (chronicle first, retro second). Workflow friction from it → `docs/analysis/WORKFLOW_BACKLOG.md`; a `High` item blocks the next phase. | file, items logged |
| 7 | **Lessons** | One lesson per user correction in the wave → `tasks/lessons/<domain>.md`. Never Claude's memory. | lesson title, or n/a (no corrections) |
| 8 | **Task records** | `tasks/todo.md` line; backlog entry (`tasks/backlog/`, `WORKFLOW_BACKLOG.md`) → CLOSED with resolution; plan → `tasks/completed/`; the active task document's status rows and footer line. | files |
| 9 | **Recovery prompt** | `tasks/RECOVERY_PROMPT.md`: header "Last updated", **Test Suite** count, **Latest chronicle** line, Lint line, Branch line, OPEN / closed lists, Next. Orientation hints must survive one more commit ("the last code merge is X", never "the top commit is Y"). | the lines changed |
| 10 | **Gate** | `./vinc.sh --docs --agent` → `DOCS=PASS`. A FAIL names the file and the stale value; fix and rerun. Never edit a stamp or a count to match without doing the row it belongs to. | the output line |

### 3. REPORT
Print the ten-row table, each row **done** (with its evidence) or **n/a** (with the reason). An unlisted row is
an unaudited row. End with one of:
- **READY TO CLOSE** — all rows done or n/a, `DOCS=PASS`. Ask for the Directive to commit on one
  `docs/close-<wave>` branch and merge. Only after that merge may the chat say the wave is **closed**.
- **OPEN ROWS** — list them; the wave is not closed.

### 4. COMMIT DISCIPLINE (after the Directive)
- One branch, `docs/close-<wave>`; scripted edits and `git add && git commit` on one `&&` chain so a failed
  assertion never reaches a commit; anchor inserts on a unique line and assert `count == 1`; read the edited
  region before committing.
- `./vinc.sh --docs --agent` again after the merge. Push only on the user's word.

---

## 📍 EXAMPLE TRIGGERS
- "Close the wave." / "Close HK-020."
- "Wrap the session."
- Any moment the agent is about to write "closed", "merged" or "done" about a wave.

---

## 🏺 ARCHITECT'S NOTE
The word "closed" is this command's output and nothing else's. Keep the script at the checks a close-out has
actually missed — add one only when a stale fact got past the table and a machine could have caught it.
