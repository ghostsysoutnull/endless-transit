# RECOVERY HANDOVER
**Last updated:** 2026-09-24 (the web port is complete; the picture-first UI rework is queued, nothing run yet). This file holds **current state only** — history lives in `journals/CHRONICLE_INDEX.md` and the logs it points to; `./terminal/vinc.sh --docs` (D4) caps this file at 1,000 words.

## 🎯 Current Status
- **Test Suite:** 296 discovered / 296 pass / 0 skipped / 0 failed (`./terminal/vinc.sh --test --agent 2>/dev/null`)
- **Latest chronicle:** `0x55f9460` (top row of `journals/CHRONICLE_INDEX.md`; checked by `./terminal/vinc.sh --docs`, D2)
- **Lint:** `./terminal/vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS FILES=222 P1=0 P2=0 P3=0` (baseline and allow-list: `terminal/CLAUDE.md`)
- **Docs:** `./terminal/vinc.sh --docs --agent 2>/dev/null` → `DOCS=PASS` (15 blueprints; which are `Verified`: `terminal/CLAUDE.md`)
- **Branch:** `master`. The last Groovy code merge is `55f9460`. A push republishes the site, game included: `cd web && npm run publish:site` writes `docs/play/` (commit it), live at `https://ghostsysoutnull.github.io/endless-transit/play/`. Web gates: `npm run check`, `npm run e2e` (from `web/`). The user's old untracked save and journal files stay where they are; never `git add -A`.
- **Web game:** `cd web && npm run check` → `STATUS=PASS … TESTS=ok(476/476)`; `npm run e2e` → 233 passed / 23 skipped by design (desktop + phone profiles, one worker, ≈ 5 min); save format v6; player docs `docs/web/{players_guide,cheat_sheet}.md`; the full playthrough: `npx playwright test --grep @playthrough`.
- **Next, before the UI queue:** the **rules diet** — `tasks/RULES_DIET_PLAN.md` (grilled, cleared; its inventory `tasks/RULES_DIET_INVENTORY.md`), built on the user's go.
- **Active Work:** the **picture-first UI rework** — **`tasks/UI_QUEUE.md`** (Decisions, 8 iterations, none run), run under the Standing Order (`.claude/CODEX.md`, with its item 2: a plan the user approves before each iteration's code): **"hi" starts U01's plan**. Look: the mock `docs/analysis/mocks/transit-reframed.html` (+ `pole-wireframe.html`); how it maps onto `web/`: `docs/analysis/UI_REFRAME_STUDY.md`; notes go to `tasks/ui/`. The **web port** (CONCEPT-002) is complete — record `tasks/PORT_QUEUE.md` + `tasks/port/I01..I10.md`; Groovy is frozen in `terminal/`; the TypeScript game in `web/` is the game (law: `web/CLAUDE.md`; how it is built: `docs/analysis/WEB_GAME_ARCHITECTURE.md`).
- **Open threads — none has a plan.** Every plan with a `src/` change carries a **Shape table** (CODEX § 4, WF-009). One line each; the detail lives at the pointer.
  - **The user's findings** from playing the web game, when they send them — each becomes a fix piece (queue section "Reported by the tester").
  - **CONCEPT-001** ships: concept `docs/analysis/SHIPS_CONCEPT.md`, every rule the mocks run on `docs/analysis/SHIPS_RULES.md`, two mocks (text v1, visual v13). **Open: the concept's §7 verdict column — eleven decisions, none judged.** No plan until then.
  - Ships will exist only in the web game; the visual mock stays their lab (study D5). A UI change is unverified until seen: `node docs/analysis/mocks/look.js`.
  - **Housekeeping** (`tasks/backlog/HOUSEKEEPING.md`) — nothing OPEN: HK-021/023/024 closed by the port (every bug pinned, `tasks/port/I09.md`), HK-013 closed as moot (Groovy frozen).
  - **Workflow** (`docs/analysis/WORKFLOW_BACKLOG.md`): WF-010 Medium · WF-011 Low · WF-006 Low (moot with Groovy frozen — close at the next review) · WF-012 Low lessons diet · WF-013 Low Actions on push (needs the user's `gh auth refresh -s workflow`). **O1** HeadlessRunner DSL: Groovy-only, moot.
  - **Chronicle:** none written for the port (user decision: lean records); one chronicle for the whole port if the user asks.
- **Known declared edges:** HK-019's (`journals/LOG_20260916_231644_0x0033981.md`, "Left open") and HK-018's (pre-HK-018 Keystones open nothing: bound by LIP, no name fallback).

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Codex:** Read `.claude/CODEX.md` — Safety Mandates, Coverage Claim Protocol (the Groovy Gates table: `terminal/CLAUDE.md`).
2. **Orient:** `git branch --show-current` = `master`; `git status -sb`; `git log --oneline -5`. Read `tasks/todo.md`, this file's **Next**, the top rows of
   `journals/CHRONICLE_INDEX.md` (open a log only when its wave matters to the task), the OPEN items of `tasks/backlog/HOUSEKEEPING.md`, `tasks/backlog/CONCEPTS.md` and
   `docs/analysis/WORKFLOW_BACKLOG.md`. Groovy-only recipes and records: `terminal/CLAUDE.md`.
3. **Audit:** `./terminal/vinc.sh --test --agent 2>/dev/null` → `STATUS=PASS DISCOVERED=296 …`; `./terminal/vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS`;
   `./terminal/vinc.sh --scan` → seed 0, 9 nodes; `./terminal/vinc.sh --docs --agent 2>/dev/null` → `DOCS=PASS`.
4. **"hi" runs `tasks/UI_QUEUE.md`** under the Standing Order (it replaces steps 3 and 5 for queue sessions); anything else waits for a Directive. How to talk to the user: the block at the top of
   `CLAUDE.md`.
5. **Every task:** plan file (with its Shape table, CODEX § 4) → `/grill` → authorization → branch → full suite + `--lint` after every commit →
   merge `--no-ff` → **`/close-wave`** (it prints its tier and table) **before saying "closed"**. Push only on the user's word.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| History | `journals/CHRONICLE_INDEX.md` → `journals/LOG_*`; retros `terminal/docs/retro/`; finished plans and execution records `terminal/tasks/completed/` (Groovy), `tasks/completed/` (workflow, site) |
| Law + commands | root `CLAUDE.md` (slim) + `terminal/CLAUDE.md` (Groovy domains, tooling); `.claude/CODEX.md`; `.claude/commands/{grill,chronicle,close-wave}.md`; `./terminal/vinc.sh --help` |
| Groovy game (frozen) | `terminal/CLAUDE.md` — domains, tooling, gate internals, contract pins, content lists, lint baseline, blueprint status; docs gate `terminal/.agents/docs-check.sh` |
| Backlogs | `tasks/backlog/HOUSEKEEPING.md` (OPEN: none); `tasks/backlog/CONCEPTS.md` (OPEN: CONCEPT-001); `docs/analysis/WORKFLOW_BACKLOG.md` (OPEN: WF-010 Medium, WF-011, WF-006, WF-012, WF-013 Low) |
| Lessons + safety mandates | `tasks/lessons/infrastructure.md` (process); `terminal/tasks/lessons/{groovy-tooling,core,model,procgen,ui}.md` (Groovy, loaded from `terminal/CLAUDE.md` and the domain files); the March post-mortems are history in `journals/` |
| Player docs + site | `docs/web/` (web game guide + cheat sheet, numbers cited from `web/src`); `docs/terminal/` (guide: `docs/terminal/guide/players_guide.md`, every number cited from source; `cheat_sheet.md` beside it is a copy the guide owns; lines 1–103 keep their numbering — a test comment cites `:102-103`); live at `https://ghostsysoutnull.github.io/endless-transit/` — GitHub Pages from `master:/docs`, so **a push republishes the site**; branches are never published |
