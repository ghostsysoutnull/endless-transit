# RECOVERY HANDOVER
**Last updated:** 2026-09-21 (the port runs under the Standing Order; next is iteration I01). This file holds **current state only** — history lives in `journals/CHRONICLE_INDEX.md` and the logs it points to; `./terminal/vinc.sh --docs` (D4) caps this file at 1,000 words.

## 🎯 Current Status
- **Test Suite:** 296 discovered / 296 pass / 0 skipped / 0 failed (`./terminal/vinc.sh --test --agent 2>/dev/null`)
- **Latest chronicle:** `0x55f9460` (top row of `journals/CHRONICLE_INDEX.md`; checked by `./terminal/vinc.sh --docs`, D2)
- **Lint:** `./terminal/vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS FILES=222 P1=0 P2=0 P3=0` (baseline: 8 entries — the long methods of HK-013; `NoNewStaticLogic` allow-list of 15 files in the ruleset, shrink-only — none of them a rule-holding class since HK-022)
- **Docs:** `./terminal/vinc.sh --docs --agent 2>/dev/null` → `DOCS=PASS` (15 blueprints; `Room`, `TurnProcessor`, `NameGenerator`, `ProceduralFactory` and `Building` are `Verified`, 10 still `Baselined (not audited)`)
- **Branch:** `master`. The last *code* merge is `55f9460` (HK-023 slice 1); only docs merged after it. A push republishes the site. If `git status -sb` shows ahead/behind origin, ask before pushing. The user's old untracked save and journal files stay where they are; never `git add -A`.
- **Active Work:** the **web port effort** (CONCEPT-002), decided 2026-09-21: Groovy is frozen in `terminal/` (moved by I01; its gates run as `./terminal/vinc.sh …`, and the game now reads and writes saves inside `terminal/`), the new TypeScript game in `web/` is where development happens. Decisions, stack, `web/` tree, stages and how the work is run (§12: one session per wave, one writer, ultracode off): `docs/analysis/WEB_PORT_STUDY.md`. **How it runs: "hi" = work `tasks/PORT_QUEUE.md` to the end under `.claude/CODEX.md` "The Standing Order" — sub-agents write, the main session gates and merges, no questions (the user's decisions are in the queue), a live build after every iteration, touch-first. Where the queue and the study disagree, the queue wins.**
- **Other open threads — none has a plan.** Every plan with a `src/` change carries a **Shape table** (CODEX § 4, WF-009). One line each; the detail lives at the pointer.
  - **CONCEPT-001** ships: concept `docs/analysis/SHIPS_CONCEPT.md`, every rule the mocks run on `docs/analysis/SHIPS_RULES.md`, two mocks (text v1, visual v13). **Open: the concept's §7 verdict column — eleven decisions, none judged.** No plan until then.
  - Ships will exist only in the web game; the visual mock stays their lab (study D5). A UI change is unverified until seen: `node docs/analysis/mocks/look.js`.
  - **Housekeeping** (`tasks/backlog/HOUSEKEEPING.md`) — with Groovy frozen, the game-side items are the port's fix list and HK-013/WF-006 go moot when stage 0 lands (study §2.4); all stay OPEN until then: HK-021 HK-015 residue (a player-visible fix edits `docs/terminal/guide/players_guide.md` in the same commit) · HK-023 game-side oddities, restore bullet done · HK-013 eight long methods (extract or re-baseline with a reason — never reformat) · HK-024 user decision on the `KEYSTONE` debug glitch.
  - **Workflow** (`docs/analysis/WORKFLOW_BACKLOG.md`): WF-010 Medium · WF-011 Low · WF-006 Low (next cadence review) · WF-012 Low lessons diet. **O1** HeadlessRunner DSL: optional, not started.
- **Known declared edges:** HK-019's (`journals/LOG_20260916_231644_0x0033981.md`, "Left open") and HK-018's (pre-HK-018 Keystones open nothing: bound by LIP, no name fallback).

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Codex:** Read `.claude/CODEX.md` — Safety Mandates, session init, the Gates table, Coverage Claim Protocol.
2. **Orient:** `git branch --show-current` = `master`; `git status -sb`; `git log --oneline -5`. Read `tasks/todo.md`, this file's **Next**, the top rows of
   `journals/CHRONICLE_INDEX.md` (open a log only when its wave matters to the task), the OPEN items of `tasks/backlog/HOUSEKEEPING.md`, `tasks/backlog/CONCEPTS.md` and
   `docs/analysis/WORKFLOW_BACKLOG.md`. For a content change, read the execution notes of `terminal/tasks/completed/HK_016_STEP3_PLAN.md` first
   (simulate → expected set → allow-list re-pin). The OOA plan is no longer loaded automatically — read `terminal/docs/analysis/OOA_REFACTOR_PLAN.md` on demand.
3. **Audit:** `./terminal/vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS DISCOVERED=296 …`; `./terminal/vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS`;
   `./terminal/vinc.sh --scan` → seed 0, 9 nodes; `./terminal/vinc.sh --docs --agent 2>/dev/null` → `DOCS=PASS`.
4. **Web port = go:** work the queue under the Standing Order, no questions. Any other effort: wait for a Directive; one question per
   message, plain words (no symbols, no section numbers), lettered options, a marked pick. Chat summaries short and plain.
5. **Every task outside the port queue:** plan file (with its Shape table, CODEX § 4) → `/grill` → authorization → branch → ≤ 5 production files per commit → full suite + `--lint` after every commit →
   merge `--no-ff` → **`/close-wave`** (it prints its tier and table) **before saying "closed"**. Push only on the user's word.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| History | `journals/CHRONICLE_INDEX.md` → `journals/LOG_*`; retros `terminal/docs/retro/`; finished plans and execution records `terminal/tasks/completed/` (Groovy), `tasks/completed/` (workflow, site) |
| Law + commands | `.claude/CODEX.md`; `.claude/commands/{grill,chronicle,close-wave}.md`; `./terminal/vinc.sh --help` |
| Gate internals | lint: `terminal/config/lint/vinc-ruleset.groovy`, `terminal/config/lint/baseline.xml` (one writer: `--lint --baseline`), `terminal/lib/lint/`; docs: `terminal/.agents/docs-check.sh`; goldens: `terminal/src/test/groovy/com/endlesstransit/ui/golden/` (one writer: `--goldens`) |
| Backlogs | `tasks/backlog/HOUSEKEEPING.md` (OPEN: HK-021, HK-023, HK-013, HK-024); `tasks/backlog/CONCEPTS.md` (OPEN: CONCEPT-001, CONCEPT-002); `docs/analysis/WORKFLOW_BACKLOG.md` (OPEN: WF-010 Medium, WF-011, WF-006, WF-012 Low) |
| Completed refactor plan | `terminal/docs/analysis/OOA_REFACTOR_PLAN.md` (per-phase execution records) |
| Domain invariants | `terminal/src/main/groovy/com/endlesstransit/{core,model,ui,procgen}/CLAUDE.md`; class blueprints `terminal/docs/blueprints/logic/classes/` (stamped; see `/close-wave` row 3) |
| Lessons + safety mandates | `tasks/lessons/{ui,infrastructure,core,model,procgen}.md`; `tasks/lessons/POST_MORTEM_2026_03_{06,11}.md` |
| Content (procgen lists) | `terminal/src/main/resources/{themes,names}/` — every list has a size floor in `ThemeResourceCoverageTest`; audit `docs/analysis/VARIETY_AUDIT.md` |
| Contract pins by area | events `core/{JournalEventContractTest,EventBusTest}`; factory wiring `procgen/FactoryWiringContractTest`; floor `model/{FloorStateContractTest,BreachOptionContractTest,CorridorLeaveContractTest}`; restore `core/{RestoreContractTest,AbyssalRestoreContractTest}`; variety `procgen/ProcgenVarietyContractTest`; names `procgen/NameGeneratorContractTest` (all under `terminal/src/test/groovy/com/endlesstransit/`) |
| Player docs + site | `docs/terminal/` (guide: `docs/terminal/guide/players_guide.md`, every number cited from source; `cheat_sheet.md` beside it is a copy the guide owns; lines 1–103 keep their numbering — a test comment cites `:102-103`); live at `https://ghostsysoutnull.github.io/endless-transit/` — GitHub Pages from `master:/docs`, so **a push republishes the site**; branches are never published |
