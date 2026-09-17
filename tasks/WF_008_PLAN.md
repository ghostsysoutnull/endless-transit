# WF-008 — `/close-wave` learns tiers; the handover stops growing

## Context
User review of WF-007, one hour after it merged: *"is this skill not too token hungry, with a much larger scope than it
should?"* Measured, not guessed: the skill file is cheap (979 words, loaded on invoke) and `./vinc.sh --docs` is one line —
but the ritual it made mandatory is not. WF-007's work added ~2,180 words and its close-out ~2,215; the same facts were
written seven times (index row, log, retro, todo, backlog, recovery prompt, plan record). All ten rows apply to every wave,
and ten minutes after merging I (rightly) skipped it for a one-line fix — so the rule was already discretionary, which is
what WF-007 existed to remove. User decisions: tiers, **and the skill itself must carry the guidance to judge the tier**;
include (a) recovery-prompt trim and (b) drop the full OOA-plan include. Also: the skill should not retell WF-007/HK-019 anecdotes.

Facts read this session:
- `tasks/RECOVERY_PROMPT.md` = 2,960 words: Current Status 1,601 (of which **nine per-wave history bullets ≈ 1,110**, each
  already carrying its chronicle id), substrate paragraph 180 (duplicates the domain `CLAUDE.md`s), Lessons carried forward
  500 (duplicates `tasks/lessons/`), How to Resume 248, Context Links 350.
- `CLAUDE.md:29` `@`-includes the whole OOA plan (7,493 words, all phases complete) into every session; `CLAUDE.md:16` and
  `:31` include the chronicle index twice.
- `.agents/docs-check.sh:24,36` read the lines `- **Test Suite:**` and `- **Latest chronicle:**` — both must survive (a).

## Design

### 1. `.claude/commands/close-wave.md` — rewritten, same length or shorter
**Step 0 — pick the tier, print the evidence** (`git diff --name-only <base>..HEAD` + the tier it implies, in the report header):

| Tier | Mechanical floor | Rows |
| :-- | :-- | :-- |
| **Trivial** | the wave is one commit touching only `tasks/RECOVERY_PROMPT.md` / `tasks/todo.md` | `./vinc.sh --docs --agent`; report = that line |
| **Light** | nothing under `src/` | preconditions · false-facts grep · task records · recovery prompt · `--docs`; 5-row table |
| **Full** | anything under `src/`, a moved golden, a changed lint baseline | all ten rows |

**Add-on rows** (judgment may only add, never remove; each add-on names its reason in the table):
| Reason | Adds |
| :-- | :-- |
| a user correction happened in the wave | Lessons |
| law or tooling changed (`.claude/`, `CLAUDE.md`, `vinc.sh`, `.agents/`, `config/lint/`) | Chronicle |
| a High backlog item closes, or the wave spanned sessions | Chronicle + Retro |
| the player can see a difference (`docs/terminal/`, resource text) | Player docs |

Going *below* the floor needs the user's word, quoted in the report.

**One record per wave** — budgets written into the rows: facts live in the chronicle log when there is one, else in the todo
line. Everything else is a pointer: index row ≤ 40 words, todo line ≤ 30, backlog resolution ≤ 60 + record link, recovery
prompt `Active Work` ≤ 60 and **no per-wave history bullets**. Plan execution record = commits + gate lines only.

**Text hygiene:** one `Origin: WF-007 / WF-008` line; the HK-019/HK-013 anecdote goes (it lives in the backlog and retros);
example ids and row-2 phrases become neutral.

`.claude/CODEX.md` § 1.5: "…with `/close-wave`, **at the tier the command selects**".

### 2. (b) Context diet — `CLAUDE.md`
- **Step first, same commit:** the OOA plan's *Verification Gates* table (5 rows) moves into CODEX § 4 — the grill found the
  **Determinism gate (`DeterministicUniverseTest`) exists in no other always-loaded file**. The Refactor Guard bullets are
  already covered (5-file cap CODEX § 3; branches/`@CompileStatic`/lint § 1.5 + § 4; test-tree blast radius and test cadence
  in `tasks/lessons/infrastructure.md`).
- `CLAUDE.md:29` → plain path, no `@`: "Active Task: none — `tasks/todo.md`; completed plan: `docs/analysis/OOA_REFACTOR_PLAN.md`
  (read on demand)". `CLAUDE.md:31` duplicate index include → plain path. `/grill` and `/chronicle` already Read the plan explicitly.
- Saves ≈ 7,500 words per session. No GEMINI sync (CODEX note).

### 3. (a) Recovery prompt → current state only (target ≤ 900 words)
- Keep: header (one line), the five status lines (Test Suite, Latest chronicle, Lint, Docs, Branch), Active Work ≤ 60 w,
  Next, How to Resume, Context Links. Drop: nine history bullets, substrate paragraph, Lessons carried forward.
- **Nothing is dropped unread** (structural-collapse mandate): a script asserts, per dropped bullet, that its chronicle id
  has a `journals/LOG_*` file; I read each bullet and move every *open thread* to Next (known one: "glitch `KEYSTONE` also
  primes the building — user undecided"). The dropped text is listed in the plan record.
- **D4 in `.agents/docs-check.sh`:** `wc -w tasks/RECOVERY_PROMPT.md` ≤ 1000, else FAIL "history belongs in the chronicle".
  Same commit as the trim so the gate is green on every commit; shown red on a scratch copy (`DOCS_ROOT`).

## Commits — branch `workflow/wf-008-close-wave-tiers` (each reverts alone)
- **c1** `tasks/WF_008_PLAN.md` + WF-008 logged (Medium, user review) in `WORKFLOW_BACKLOG.md`.
- **c2** `close-wave.md` rewrite + CODEX § 1.5 wording.
- **c3** CODEX § 4 gates table + `CLAUDE.md` includes (b).
- **c4** `RECOVERY_PROMPT.md` trim + D4 + `vinc.sh --help`/CODEX Docs Check mention of D4 (a).
- **c5** close-out **through the new skill**: floor Light, add-on Chronicle (law changed). No retro.

## Grill (six checks, run inline — read-only)
| # | Check | Verdict |
| :-- | :-- | :-- |
| 1 | Coverage claims | **PASS** — "D1/D2 survive the trim": `docs-check.sh:24` / `:36` sed patterns quoted above; both lines kept; `--docs` rerun after c4 is the guard. |
| 2 | Behavioral edges | **AMEND → applied** — dropping the OOA include silently removed the Determinism gate from session context; table moves to CODEX in the same commit. Second edge: a session no longer sees phase history unprompted — acceptable, CODEX init step 1 already says to read the plan. |
| 3 | Lifecycle | n/a — no ownership move, no code. |
| 4 | Per-commit coherence | **PASS** — D4 lands with the trim (never red on a commit); gates table lands with the include removal; c2 independent. `--test`/`--lint`/`--docs` after every commit. |
| 5 | Deviations from what the user was told | **DECLARED** — (i) escalation reasons became *add-on rows*, not a jump to Full (my chat version contradicted itself: it called this wave Light while a law change "escalated"); (ii) D4 is new; (iii) item id WF-008; (iv) old index rows are history — budgets apply forward only. |
| 6 | Reversion unit | **PASS** — five commits, no commit mixes (a), (b) and the skill. |
**CLEARED** after the check-2 amendment.

## Verification
- **Tier dry run on three real ranges**, output recorded in the plan: HK-019 code branch → Full; WF-007 `9e686d2..464e420` →
  Light + Chronicle + Retro (law changed, High closed); the "pushed" fix `5073dc7..574b424` → Trivial.
- `./vinc.sh --docs --agent` → `DOCS=PASS … D4=ok(<n>)`; D4 red on a scratch copy of the *current* 2,960-word prompt.
- `./vinc.sh --test --agent` 256/256/0/0; `--lint` PASS; zero files under `src/`.
- After c3: `grep -c DeterministicUniverseTest .claude/CODEX.md` ≥ 1; `grep -c '@docs/analysis/OOA' CLAUDE.md` = 0.
- Word counts before/after reported for the skill, the recovery prompt and the always-loaded set.

## Out of scope
Rewriting old chronicle index rows or lessons files (both always-loaded and large — a candidate for a later diet, user call);
auditing the 15 blueprints; WF-006.
