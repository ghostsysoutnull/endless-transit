# RECOVERY HANDOVER
**Last updated:** 2026-09-17 (WF-008). This file holds **current state only** — history lives in `journals/CHRONICLE_INDEX.md` and the logs it points to; `./vinc.sh --docs` (D4) caps this file at 1,000 words.

## 🎯 Current Status
- **Test Suite:** 256 discovered / 256 pass / 0 skipped / 0 failed (`./vinc.sh --test --agent 2>/dev/null`)
- **Latest chronicle:** `0x8885fa2` (top row of `journals/CHRONICLE_INDEX.md`; checked by `./vinc.sh --docs`, D2)
- **Lint:** `./vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS FILES=212 P1=0 P2=0 P3=0` (baseline: 8 entries — the long methods of HK-013)
- **Docs:** `./vinc.sh --docs --agent 2>/dev/null` → `DOCS=PASS` (15 blueprints, all still stamped `Baselined (not audited)`)
- **Branch:** `master`. The last *code* merge is `0033981` (HK-019); everything after it is docs and tooling. If `git status -sb` shows ahead/behind origin, ask before pushing. The player's untracked `session.trace` and `session.trace.bak-hk018` are theirs — never edit, never commit.
- **Active Work:** none; nothing blocks the next phase. All ten OOA phases and O2 are complete. Every wave closes through `/close-wave`, which picks its own tier from the diff (WF-007, WF-008).
- **Next — user decision, none has a plan yet:**
  - **HK-015** player-facing bugs (`tasks/backlog/HOUSEKEEPING.md`; items 1–2 are gameplay changes and need an explicit Directive; every fix edits `docs/terminal/guide/players_guide.md` in the same commit; includes the double `l` after an apartment).
  - **HK-013** eight long methods left in the lint baseline (extract or re-baseline with a reason — never reformat to the recorded length).
  - **O1** HeadlessRunner DSL (optional, not started). **WF-006** (Low) complexity metric beside `MethodSize`, at the next cadence review.
  - **Undecided user question:** should the debug glitch `KEYSTONE` also prime the building? Today it gives a correctly bound Keystone but no `j`, because `Building.isPrimed` needs every floor sampled + 7 infusions (diagnosed in the HK-019 session, nothing changed, not in the backlog).
  - **Candidate diet (user call):** the chronicle index and the lessons files are included in every session and are large.
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
3. **Audit:** `./vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS DISCOVERED=256 …`; `./vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS`;
   `./vinc.sh --scan` → seed 0, 9 nodes; `./vinc.sh --docs --agent 2>/dev/null` → `DOCS=PASS`.
4. **Ask before choosing:** there is no active phase. Present the options under **Next** and wait for a Directive. The user likes decisions as
   numbered questions with lettered options and a marked preference, answered in one word — and short plain-language summaries in chat.
5. **Every task:** plan file → `/grill` → authorization → branch → ≤ 5 production files per commit → full suite + `--lint` after every commit →
   merge `--no-ff` → **`/close-wave`** (it prints its tier and table) **before saying "closed"**. Push only on the user's word.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| History | `journals/CHRONICLE_INDEX.md` → `journals/LOG_*`; retros `docs/retro/`; finished plans and execution records `tasks/completed/` |
| Law + commands | `.claude/CODEX.md`; `.claude/commands/{grill,chronicle,close-wave}.md`; `./vinc.sh --help` |
| Gate internals | lint: `config/lint/vinc-ruleset.groovy`, `config/lint/baseline.xml` (one writer: `--lint --baseline`), `lib/lint/`; docs: `.agents/docs-check.sh`; goldens: `src/test/groovy/com/endlesstransit/ui/golden/` (one writer: `--goldens`) |
| Backlogs | `tasks/backlog/HOUSEKEEPING.md` (OPEN: HK-015, HK-013); `docs/analysis/WORKFLOW_BACKLOG.md` (OPEN: WF-006 Low) |
| Completed refactor plan | `docs/analysis/OOA_REFACTOR_PLAN.md` (per-phase execution records) |
| Domain invariants | `src/main/groovy/com/endlesstransit/{core,model,ui,procgen}/CLAUDE.md`; class blueprints `docs/blueprints/logic/classes/` (stamped; see `/close-wave` row 3) |
| Lessons + safety mandates | `tasks/lessons/{ui,infrastructure,core,model,procgen}.md`; `tasks/lessons/POST_MORTEM_2026_03_{06,11}.md` |
| Content (procgen lists) | `src/main/resources/{themes,names}/` — every list has a size floor in `ThemeResourceCoverageTest`; audit `docs/analysis/VARIETY_AUDIT.md` |
| Contract pins by area | events `core/{JournalEventContractTest,EventBusTest}`; factory wiring `procgen/FactoryWiringContractTest`; floor `model/{FloorStateContractTest,BreachOptionContractTest,CorridorLeaveContractTest}`; restore `RestoreContractTest`; variety `procgen/ProcgenVarietyContractTest` (all under `src/test/groovy/com/endlesstransit/`) |
| Player docs + site | `docs/terminal/` (guide: `docs/terminal/guide/players_guide.md`, every number cited from source); live at `https://ghostsysoutnull.github.io/endless-transit/` — GitHub Pages from `master:/docs`, so **a push republishes the site**; branches are never published |
