# WF-007 — `/close-wave`: the close-out becomes a gate

## Context
Every close-out this month updated only the files its plan listed; the user had to ask "are all docs updated?" and the answer
was always no (HK-019: `Floor` blueprint, recovery-prompt header + latest-journal pointer, a lesson's tense, retro, lesson;
HK-013: three repair commits). The nine-point list now in `tasks/lessons/infrastructure.md` is prose the agent must remember.
WF-007 is **High** and blocks the next phase. User proposal: a **close-wave skill**. Agreed shape: the skill is the
orchestrator (judgment + order + mandatory output table); a small script is the part that cannot be argued with.
A "wave" = any unit that gets closed: an OOA phase, an HK item, a WF item, a docs session.

Facts read this session: commands live in `.claude/commands/` (`chronicle.md` 48 lines, `grill.md` 65); `vinc.sh` is a
121-line `case "$1"` with `--lint` as the model for an `--agent` one-line mode (`vinc.sh:62-99`); `.agents/` already holds
two check scripts; only **15** blueprints exist for 139 production classes (`docs/blueprints/logic/classes/{core 3, model 7,
procgen 5}`), footer `*Neural Map Stabilized.*`; suite count lives in `tasks/RECOVERY_PROMPT.md:5` and `tasks/todo.md:17`;
the recovery prompt's "latest journal" is buried in a sentence at line 99 (not machine-checkable today); chronicle ids are
the code-merge hash, so the close-out necessarily runs **after** the code merge, on a docs branch (HK-019 used three).

## Design

### 1. `./vinc.sh --docs [--agent]` → `.agents/docs-check.sh` (three checks, read-only)
| # | Check | Fails when |
| :-- | :-- | :-- |
| D1 | **Suite count** | `DISCOVERED` from `./vinc.sh --test --agent` ≠ the number in `RECOVERY_PROMPT.md` "Test Suite" line or `todo.md` "Suite baseline" line |
| D2 | **Latest chronicle** | top `LOG_ID` row of `journals/CHRONICLE_INDEX.md` ≠ new machine-readable line `- **Latest chronicle:** \`0x…\`` in the recovery prompt's Current Status, or ≠ the id in the newest `journals/LOG_*` filename |
| D3 | **Blueprint freshness** | for each `docs/blueprints/logic/classes/<pkg>/<Class>.md`: footer stamp `*Verified against: <Class>.groovy @ <10-char blob hash>*` ≠ `git hash-object` of the class file (content hash: works before commit, survives merges) |

- Output mirrors `--lint`: `DOCS=PASS|FAIL D1=ok D2=ok D3=ok(15)`; failures name file + expected/actual on stderr; exit 1.
- Script reads under `$DOCS_ROOT` (default `.`) and takes `$VINC_DISCOVERED` to skip the suite run — only so the negative
  checks can run against a scratchpad copy without touching the tree.
- **Ships green (the O2 baseline lesson):** c2 stamps all 15 blueprints as `*Baselined (not audited) against: … @ <hash>*`.
  The first edit to a class breaks its stamp; whoever closes that wave must read the blueprint against the class and
  re-stamp it `Verified against`. No claim is made today that 15 blueprints are true. Classes without a blueprint: n/a.

### 2. `.claude/commands/close-wave.md` (same format as `grill.md`: philosophy, workflow, verdict table)
Order (each step backed by tool output from this session; from memory = FAIL, as in `/grill`):
1. **Preconditions** — code merged; `--test`, `--lint`, (`--scan` if model/procgen) green; `git status --short` clean.
2. **False-facts grep** — list the facts this wave made false *in the old behavior's words* (not symbol names); `grep -rn`
   across `docs/`, `tasks/`, `*/CLAUDE.md`, `*/GEMINI.md`, `README.md`; show hits, fix or justify each.
3. Blueprints for every production class touched (`git diff --name-only <wave-base>..HEAD -- src/main`) → review, re-stamp.
4. Player docs (`docs/terminal/`) if behavior changed.
5. `/chronicle` (invoked, not duplicated) + index row.
6. Retro `docs/retro/RETRO_<WAVE>.md`; friction → `WORKFLOW_BACKLOG.md`.
7. Lesson for any user correction → `tasks/lessons/<domain>.md`.
8. `tasks/todo.md`, backlog entry, plan → `tasks/completed/`; active-task document's footer line.
9. `tasks/RECOVERY_PROMPT.md` — header, suite count, `Latest chronicle` line, OPEN/closed lists.
10. `./vinc.sh --docs --agent` → must be `DOCS=PASS`.
11. **Output:** the ten-row table, each row `done (evidence)` / `n/a (reason)`. Then, and only then, ask for the
    commit/merge Directive — one `docs/close-<wave>` branch, script-and-commit on one `&&` chain. Never pushes.

### 3. Law + pointers
- `.claude/CODEX.md` § 1.5 and § 4: "Run `/chronicle` after every completed phase" → "Run `/close-wave`…"; new line:
  **"closed" / "merged" may appear in chat only as the output of `/close-wave` with its table**; `--docs` joins the gates.
- `CLAUDE.md` tooling table: `./vinc.sh --docs --agent` row. `OOA_REFACTOR_PLAN.md` Refactor Guard: same one-line swap.
- `tasks/lessons/infrastructure.md`: the nine-point lesson keeps its *why* and points to the skill for the list (one source).
- `vinc.sh --help` gains `--docs`. No GEMINI sync (CODEX note). No production or test source touched.

## Commits — branch `workflow/wf-007-close-wave` (≤ 5 files each, except c2's mechanical stamps)
- **c1** `tasks/WF_007_PLAN.md` (this plan).
- **c2** `.agents/docs-check.sh`, `vinc.sh`, `RECOVERY_PROMPT.md` (+ `Latest chronicle` line), 15 blueprint footers stamped
  by script (anchor `*Neural Map Stabilized.*`, assert `count == 1` per file, asserts before write).
- **c3** `.claude/commands/close-wave.md`.
- **c4** `CODEX.md`, `CLAUDE.md`, `OOA_REFACTOR_PLAN.md`, `infrastructure.md`.
- **c5** dogfood: run `/close-wave` on WF-007 itself — WF-007 → CLOSED in the backlog, todo, recovery prompt, chronicle,
  `docs/retro/RETRO_WF_007.md`, plan → `tasks/completed/`.

## Verification
- **Green:** `./vinc.sh --docs --agent` → `DOCS=PASS` on the tree after c2.
- **Red, one per check** (scratchpad copy via `DOCS_ROOT`, tree untouched): wrong suite number → D1 names both files;
  stale `Latest chronicle` id → D2; one appended byte to a copied `Floor.groovy` → D3 names `Floor.md`. Recorded in the plan.
- **Gates unchanged:** `./vinc.sh --test --agent` 256/256/0/0, `--lint` PASS (no `.groovy` touched), `git status --short` clean.
- **Dogfood (c5):** the skill's own table closes WF-007; the first skipped or unprovable row is a defect in the skill, fixed before merge.
- `/grill` the plan before c1 if wanted (read-only).

## Out of scope
Auditing the 15 blueprints now; blueprints for the other 124 classes; WF-006; any `--docs` check beyond D1–D3 (add one
only when a close-out misses something a script could have caught).

---

## Execution record (2026-09-17)
- **Commits:** `4f31661` c1 plan · `14708b6` c2 `--docs` + stamps · `463bd98` c3 `/close-wave` · `3f92f2e` c4 law · `8885fa2` dogfood fix (row 1) · c5 close-out (this commit).
- **Red first:** unstamped tree → `DOCS=FAIL D1=ok(256) D2=FAIL D3=FAIL(15)`. After stamping → `DOCS=PASS D1=ok(256) D2=ok(0x0033981) D3=ok(15)`.
- **Red, one per check (scratch copy, `DOCS_ROOT`):** `VINC_DISCOVERED=257` → D1 names `RECOVERY_PROMPT.md` and `todo.md`; a new top index row → D2 names the recovery prompt and the newest `LOG_*`; one byte appended to a copied `Floor.groovy` → D3 names `model/Floor.md` (`2196f64c3c` vs `55cb304e2b`). Control copy green.
- **Deviation:** the dogfood run found `/close-wave` row 1 ("code merged") impossible for a no-`src/` wave closing on its own branch; row amended (`8885fa2`). Chronicle id is therefore the last work commit, not a merge hash.
- **Gates at close:** suite 256/256/0/0 · `LINT=PASS FILES=212` · `DOCS=PASS D1=ok(256) D2=ok(0x8885fa2) D3=ok(15)` · zero files under `src/` changed.
