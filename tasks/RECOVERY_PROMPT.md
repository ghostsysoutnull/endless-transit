# RECOVERY HANDOVER
**Last updated:** 2026-09-25 (UI rework: U01a the frame merged and live; U01b next). This file holds **current state only** — history lives in `journals/CHRONICLE_INDEX.md` and the logs it points to; `./.claude/docs-check.sh` caps this file at 1,000 words.

## 🎯 Current Status
- **Latest chronicle:** `0x55f9460` (top row of `journals/CHRONICLE_INDEX.md`; checked by `./.claude/docs-check.sh`)
- **Docs:** `./.claude/docs-check.sh --agent` → `DOCS=PASS` (the chronicle, this file's size, the user block's size).
- **Branch:** `master`. A push republishes the site, game included: `cd web && npm run publish:site` writes `docs/play/` (commit it), live at `https://ghostsysoutnull.github.io/endless-transit/play/`. Web gates: `npm run check`, `npm run e2e` (from `web/`). The user's old untracked save and journal files stay where they are; never `git add -A`.
- **Web game:** `cd web && npm run check` → `STATUS=PASS … TESTS=ok(474/474)` (unit tests on a quarter of the cores — more starves the heavy ones past 5 s on this machine); `npm run e2e` → 233 passed / 23 skipped by design (desktop + phone profiles, one worker, ≈ 5 min); save format v6; player docs `docs/web/{players_guide,cheat_sheet}.md`; the full playthrough: `npx playwright test --grep @playthrough`.
- **Rules diet done (2026-09-25):** how to work with the user lives only in the block at the top of `CLAUDE.md`; record `tasks/completed/RULES_DIET_PLAN.md`.
- **Active Work:** the **picture-first UI rework** — **`tasks/UI_QUEUE.md`** (Decisions, 9 iterations — U01 split into U01a ✓ and U01b), run under the Standing Order (`.claude/CODEX.md`, with its item 2: a plan the user approves before each iteration's code): **"hi" starts U01b's plan** (its outline: `tasks/ui/U01.md`). Look: the mock `docs/analysis/mocks/transit-reframed.html` (+ `pole-wireframe.html`); how it maps onto `web/`: `docs/analysis/UI_REFRAME_STUDY.md`; notes go to `tasks/ui/`. The **web port** (CONCEPT-002) is complete — record `tasks/PORT_QUEUE.md` + `tasks/port/I01..I10.md`; the TypeScript game in `web/` is the game (law: `web/CLAUDE.md`; how it is built: `docs/analysis/WEB_GAME_ARCHITECTURE.md`).
- **Open threads — none has a plan.** Every plan with a `src/` change carries a **Shape table** (CODEX § 4, WF-009). One line each; the detail lives at the pointer.
  - **The user's findings** from playing the web game, when they send them — each becomes a fix piece (queue section "Reported by the tester").
  - **CONCEPT-001** ships: concept `docs/analysis/SHIPS_CONCEPT.md`, every rule the mocks run on `docs/analysis/SHIPS_RULES.md`, two mocks (text v1, visual v13). **Open: the concept's §7 verdict column — eleven decisions, none judged.** No plan until then.
  - Ships will exist only in the web game; the visual mock stays their lab (study D5). A UI change is unverified until seen: `node docs/analysis/mocks/look.js`.
  - **Workflow** (`docs/analysis/WORKFLOW_BACKLOG.md`): WF-011 Low · WF-006 Low (moot — close at the next review) · WF-013 Low Actions on push (needs the user's `gh auth refresh -s workflow`).
  - **Chronicle:** none written for the port (user decision: lean records); one chronicle for the whole port if the user asks.

## 🚀 How to Resume

---
**START_PROMPT**

Initialize session for the Endless Transit substrate.

1. **Rules:** the user block at the top of `CLAUDE.md` first; then `.claude/CODEX.md` (the Standing Order, the Coverage
   Claim Protocol, the OO table).
2. **Orient:** `git branch --show-current` = `master`; `git status -sb`; `git log --oneline -5`; this file's Active Work
   and open threads; the active queue. Records on demand: `journals/CHRONICLE_INDEX.md`, the backlogs.
3. **Audit:** `cd web && npm run check` → `STATUS=PASS`; `./.claude/docs-check.sh --agent` → `DOCS=PASS`.
4. **"hi" runs `tasks/UI_QUEUE.md`** under the Standing Order; anything else waits for a Directive.
5. **Every task outside a queue:** plan file (with its Shape table, CODEX § 4) → `/grill` → the user's go → branch →
   the touched tree's gates after every commit → merge `--no-ff` → the close-out (CODEX § 1.5) before saying "closed". Push only
   on the user's word; a commit/push directive covers the close-out.

**END_PROMPT**

---

## 🏛️ Context Links
| Resource | Path |
| :--- | :--- |
| History | `journals/CHRONICLE_INDEX.md` → `journals/LOG_*`; finished plans `tasks/completed/`; the port `tasks/port/` |
| Law + commands | root `CLAUDE.md` (the user block first); `.claude/CODEX.md`; `web/CLAUDE.md`; `.claude/brief.md` (every agent brief starts from it); `.claude/commands/{grill,chronicle}.md`; `./.claude/docs-check.sh` |
| Backlogs | `tasks/backlog/CONCEPTS.md` (OPEN: CONCEPT-001); `docs/analysis/WORKFLOW_BACKLOG.md` (OPEN: WF-011, WF-006, WF-013 Low) |
| Lessons | `tasks/lessons/infrastructure.md` (process, every session); `tasks/lessons/web.md` (with `web/`) |
| Player docs + site | `docs/web/` (web game guide + cheat sheet, numbers cited from `web/src`); live at `https://ghostsysoutnull.github.io/endless-transit/` — GitHub Pages from `master:/docs`, so **a push republishes the site**; branches are never published |
