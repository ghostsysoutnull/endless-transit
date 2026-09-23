# RECOVERY HANDOVER
**Last updated:** 2026-09-21 (the port runs under the Standing Order; I07 is live; next is iteration I08 under the lean process — one writer, no reviewer/fixer agents). This file holds **current state only** — history lives in `journals/CHRONICLE_INDEX.md` and the logs it points to; `./terminal/vinc.sh --docs` (D4) caps this file at 1,000 words.

## 🎯 Current Status
- **Test Suite:** 296 discovered / 296 pass / 0 skipped / 0 failed (`./terminal/vinc.sh --test --agent 2>/dev/null`)
- **Latest chronicle:** `0x55f9460` (top row of `journals/CHRONICLE_INDEX.md`; checked by `./terminal/vinc.sh --docs`, D2)
- **Lint:** `./terminal/vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS FILES=222 P1=0 P2=0 P3=0` (baseline and allow-list: `terminal/CLAUDE.md`)
- **Docs:** `./terminal/vinc.sh --docs --agent 2>/dev/null` → `DOCS=PASS` (15 blueprints; which are `Verified`: `terminal/CLAUDE.md`)
- **Branch:** `master`. The last Groovy code merge is `55f9460`. A push republishes the site, game included: `cd web && npm run publish:site` writes `docs/play/` (commit it), live at `https://ghostsysoutnull.github.io/endless-transit/play/`. Web gates: `npm run check`, `npm run e2e` (from `web/`). The user's old untracked save and journal files stay where they are; never `git add -A`.
- **Active Work:** the **web port effort** (CONCEPT-002), decided 2026-09-21: Groovy is frozen in `terminal/` (moved by I01; its gates run as `./terminal/vinc.sh …`, and the game now reads and writes saves inside `terminal/`), the new TypeScript game in `web/` is where development happens. Decisions, stack, `web/` tree, stages and an older note on how the work is run (§12, superseded by the Standing Order): `docs/analysis/WEB_PORT_STUDY.md`. **How it runs: "hi" = work `tasks/PORT_QUEUE.md` to the end under `.claude/CODEX.md` "The Standing Order" — sub-agents write, the main session gates and merges, no questions (the user's decisions are in the queue), a live build after every iteration, touch-first. Where the queue and the study disagree, the queue wins.**
- **Other open threads — none has a plan.** Every plan with a `src/` change carries a **Shape table** (CODEX § 4, WF-009). One line each; the detail lives at the pointer.
  - **CONCEPT-001** ships: concept `docs/analysis/SHIPS_CONCEPT.md`, every rule the mocks run on `docs/analysis/SHIPS_RULES.md`, two mocks (text v1, visual v13). **Open: the concept's §7 verdict column — eleven decisions, none judged.** No plan until then.
  - Ships will exist only in the web game; the visual mock stays their lab (study D5). A UI change is unverified until seen: `node docs/analysis/mocks/look.js`.
  - **Housekeeping** (`tasks/backlog/HOUSEKEEPING.md`) — OPEN: HK-021, HK-023, HK-013, HK-024. With Groovy frozen the game-side items are the port's fix list (study §2.4); the detail of each is in the backlog.
  - **Workflow** (`docs/analysis/WORKFLOW_BACKLOG.md`): WF-010 Medium · WF-011 Low · WF-006 Low (next cadence review) · WF-012 Low lessons diet. **O1** HeadlessRunner DSL: optional, not started.
- **Known declared edges:** HK-019's (`journals/LOG_20260916_231644_0x0033981.md`, "Left open") and HK-018's (pre-HK-018 Keystones open nothing: bound by LIP, no name fallback).

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Codex:** Read `.claude/CODEX.md` — Safety Mandates, session init, the Gates table, Coverage Claim Protocol.
2. **Orient:** `git branch --show-current` = `master`; `git status -sb`; `git log --oneline -5`. Read `tasks/todo.md`, this file's **Next**, the top rows of
   `journals/CHRONICLE_INDEX.md` (open a log only when its wave matters to the task), the OPEN items of `tasks/backlog/HOUSEKEEPING.md`, `tasks/backlog/CONCEPTS.md` and
   `docs/analysis/WORKFLOW_BACKLOG.md`. Groovy-only recipes and records: `terminal/CLAUDE.md`.
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
| Law + commands | root `CLAUDE.md` (slim) + `terminal/CLAUDE.md` (Groovy domains, tooling); `.claude/CODEX.md`; `.claude/commands/{grill,chronicle,close-wave}.md`; `./terminal/vinc.sh --help` |
| Groovy game (frozen) | `terminal/CLAUDE.md` — domains, tooling, gate internals, contract pins, content lists, lint baseline, blueprint status; docs gate `terminal/.agents/docs-check.sh` |
| Backlogs | `tasks/backlog/HOUSEKEEPING.md` (OPEN: HK-021, HK-023, HK-013, HK-024); `tasks/backlog/CONCEPTS.md` (OPEN: CONCEPT-001, CONCEPT-002); `docs/analysis/WORKFLOW_BACKLOG.md` (OPEN: WF-010 Medium, WF-011, WF-006, WF-012 Low) |
| Lessons + safety mandates | `tasks/lessons/infrastructure.md` (process); `terminal/tasks/lessons/{groovy-tooling,core,model,procgen,ui}.md` (Groovy, loaded from `terminal/CLAUDE.md` and the domain files); `tasks/lessons/POST_MORTEM_2026_03_{06,11}.md` |
| Player docs + site | `docs/terminal/` (guide: `docs/terminal/guide/players_guide.md`, every number cited from source; `cheat_sheet.md` beside it is a copy the guide owns; lines 1–103 keep their numbering — a test comment cites `:102-103`); live at `https://ghostsysoutnull.github.io/endless-transit/` — GitHub Pages from `master:/docs`, so **a push republishes the site**; branches are never published |
