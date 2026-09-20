# RECOVERY HANDOVER
**Last updated:** 2026-09-20 (context diet). This file holds **current state only** — history lives in `journals/CHRONICLE_INDEX.md` and the logs it points to; `./vinc.sh --docs` (D4) caps this file at 1,000 words.

## 🎯 Current Status
- **Test Suite:** 282 discovered / 282 pass / 0 skipped / 0 failed (`./vinc.sh --test --agent 2>/dev/null`)
- **Latest chronicle:** `0xb629529` (top row of `journals/CHRONICLE_INDEX.md`; checked by `./vinc.sh --docs`, D2)
- **Lint:** `./vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS FILES=220 P1=0 P2=0 P3=0` (baseline: 8 entries — the long methods of HK-013; `NoNewStaticLogic` allow-list of 16 files in the ruleset, shrink-only)
- **Docs:** `./vinc.sh --docs --agent 2>/dev/null` → `DOCS=PASS` (15 blueprints; `Room` and `TurnProcessor` are `Verified`, 13 still `Baselined (not audited)`)
- **Branch:** `master`. The last *code* merge is `0e7b6db` (HK-020); WF-009 (law + lint, no `src/`) merged after it. The GitHub Pages audit and the context diet (docs + law, no code) merged after it; a push republishes the site. If `git status -sb` shows ahead/behind origin, ask before pushing. The player's untracked `session.trace` and `session.trace.bak-hk018` are theirs — never edit, never commit.
- **Active Work:** none; nothing blocks the next phase. All ten OOA phases and O2 are complete. Every wave closes through `/close-wave`, which picks its own tier from the diff (WF-007, WF-008).
- **Next — user decision, none has a plan yet.** Every plan with a `src/` change now carries a **Shape table** (CODEX § 4, WF-009); `/grill` check 5 asks the six checked principles — the next wave is the dogfood.
  - **HK-022** `NameGenerator` is eleven statics (the one real smell on the `NoNewStaticLogic` allow-list): one per `ProceduralFactory`, via `registry`.
  - **HK-021** residue of HK-015, low value: dead `Door.visited`, `/screenshots/` message, a dropped Keystone loses its flag, double `l` after an apartment, dead inscription pool. Any player-visible fix edits `docs/terminal/guide/players_guide.md` in the same commit.
  - **HK-023** game-side oddities found by the GitHub Pages audit, none fixed: a save made below the Bedrock does not restore (probe only — a suite test is step 0), `run.sh --test` targets a missing file, map colours print as words, the model calls `ui.Terminal.clock`, the tally is not saved. Ordered below HK-022 by user decision.
  - **HK-013** eight long methods left in the lint baseline (extract or re-baseline with a reason — never reformat to the recorded length).
  - **O1** HeadlessRunner DSL (optional, not started). **WF-010** (Medium) `/close-wave` has no post-merge step. **WF-006** (Low) complexity metric beside `MethodSize`, at the next cadence review.
  - **Undecided user question:** should the debug glitch `KEYSTONE` also prime the building? Today it gives a correctly bound Keystone but no `j`, because `Building.isPrimed` needs every floor sampled + 7 infusions (diagnosed in the HK-019 session, nothing changed, not in the backlog).
  - **Candidate lessons diet (user call, deferred):** only `infrastructure.md` and the post-mortems load every session now, domain lessons with their domain (`0xb629529`); rewriting bullets as rule + pointer needs bullet-by-bullet user review. New lessons already follow that form (CODEX). The chronicle index is no longer included.
- **Known declared edges (HK-019):** a direct `game.exitLocation()` and the debug `BREACH` teleport do not reset corridor mode; old saves heal on the first `l`. Pre-HK-018 Keystones open nothing (bound by LIP, no name fallback).

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Codex:** Read `.claude/CODEX.md` — Safety Mandates, session init, the Gates table, Coverage Claim Protocol.
2. **Orient:** `git branch --show-current` = `master`; `git status -sb`; `git log --oneline -5`. Read `tasks/todo.md`, this file's **Next**, the top rows of
   `journals/CHRONICLE_INDEX.md` (open a log only when its wave matters to the task), the OPEN items of `tasks/backlog/HOUSEKEEPING.md` and
   `docs/analysis/WORKFLOW_BACKLOG.md`. For a content change, read the execution notes of `tasks/completed/HK_016_STEP3_PLAN.md` first
   (simulate → expected set → allow-list re-pin). The OOA plan is no longer loaded automatically — read `docs/analysis/OOA_REFACTOR_PLAN.md` on demand.
3. **Audit:** `./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS DISCOVERED=282 …`; `./vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS`;
   `./vinc.sh --scan` → seed 0, 9 nodes; `./vinc.sh --docs --agent 2>/dev/null` → `DOCS=PASS`.
4. **Ask before choosing:** there is no active phase. Present the options under **Next** and wait for a Directive. The user likes decisions as
   numbered questions with lettered options and a marked preference, answered in one word — and short plain-language summaries in chat.
5. **Every task:** plan file (with its Shape table, CODEX § 4) → `/grill` → authorization → branch → ≤ 5 production files per commit → full suite + `--lint` after every commit →
   merge `--no-ff` → **`/close-wave`** (it prints its tier and table) **before saying "closed"**. Push only on the user's word.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| History | `journals/CHRONICLE_INDEX.md` → `journals/LOG_*`; retros `docs/retro/`; finished plans and execution records `tasks/completed/` |
| Law + commands | `.claude/CODEX.md`; `.claude/commands/{grill,chronicle,close-wave}.md`; `./vinc.sh --help` |
| Gate internals | lint: `config/lint/vinc-ruleset.groovy`, `config/lint/baseline.xml` (one writer: `--lint --baseline`), `lib/lint/`; docs: `.agents/docs-check.sh`; goldens: `src/test/groovy/com/endlesstransit/ui/golden/` (one writer: `--goldens`) |
| Backlogs | `tasks/backlog/HOUSEKEEPING.md` (OPEN: HK-022, HK-021, HK-023, HK-013); `docs/analysis/WORKFLOW_BACKLOG.md` (OPEN: WF-010 Medium, WF-006 Low) |
| Completed refactor plan | `docs/analysis/OOA_REFACTOR_PLAN.md` (per-phase execution records) |
| Domain invariants | `src/main/groovy/com/endlesstransit/{core,model,ui,procgen}/CLAUDE.md`; class blueprints `docs/blueprints/logic/classes/` (stamped; see `/close-wave` row 3) |
| Lessons + safety mandates | `tasks/lessons/{ui,infrastructure,core,model,procgen}.md`; `tasks/lessons/POST_MORTEM_2026_03_{06,11}.md` |
| Content (procgen lists) | `src/main/resources/{themes,names}/` — every list has a size floor in `ThemeResourceCoverageTest`; audit `docs/analysis/VARIETY_AUDIT.md` |
| Contract pins by area | events `core/{JournalEventContractTest,EventBusTest}`; factory wiring `procgen/FactoryWiringContractTest`; floor `model/{FloorStateContractTest,BreachOptionContractTest,CorridorLeaveContractTest}`; restore `core/RestoreContractTest`; variety `procgen/ProcgenVarietyContractTest` (all under `src/test/groovy/com/endlesstransit/`) |
| Player docs + site | `docs/terminal/` (guide: `docs/terminal/guide/players_guide.md`, every number cited from source; `cheat_sheet.md` beside it is a copy the guide owns; lines 1–103 keep their numbering — a test comment cites `:102-103`); live at `https://ghostsysoutnull.github.io/endless-transit/` — GitHub Pages from `master:/docs`, so **a push republishes the site**; branches are never published |
