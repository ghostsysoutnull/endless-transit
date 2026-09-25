# terminal/ — the Groovy terminal game (frozen)

The original Endless Transit: a Groovy text adventure for the terminal. **Frozen since the web port (2026-09-21): no
features, no housekeeping** — it is the reference the web game is ported from (`docs/analysis/WEB_PORT_STUDY.md`, D5).
A change here needs the user's word and every gate below. The operating law is the root `.claude/CODEX.md`; this file
adds only what is Groovy-specific. Paths below are relative to `terminal/`.

## 🧩 System Domains (The Invariants)
- **Engine/Core**: `src/main/groovy/com/endlesstransit/core/CLAUDE.md`
- **World/Model**: `src/main/groovy/com/endlesstransit/model/CLAUDE.md`
- **Interface/UI**: `src/main/groovy/com/endlesstransit/ui/CLAUDE.md`
- **Entropy/ProcGen**: `src/main/groovy/com/endlesstransit/procgen/CLAUDE.md`

Each domain file imports its own lessons (`tasks/lessons/{core,model,procgen,ui}.md`).

## 🛠️ Operational Tooling
Both scripts anchor themselves to this folder: `./vinc.sh …` from `terminal/` and `./terminal/vinc.sh …` from the
repository root are the same. The game reads and writes its save, journal and log files in this folder.

| Action | Command |
| :--- | :--- |
| **Run Game (Clinical)** | `./vinc.sh` (Fast, Auto-compile) |
| **Run Tests (Full suite)** | `./vinc.sh --test --agent 2>/dev/null` — run whenever codebase is coherent; mandatory before every commit |
| **Run Tests (Inner loop)** | `./vinc.sh --test ClassName --agent 2>/dev/null` — multi-file migrations only, while callers are partially updated |
| **Run Tests (Debug)** | `./vinc.sh --test -q` (20-line output with failure location) |
| **Verification (Static)** | `./vinc.sh --compile` |
| **Lint (House rules)** | `./vinc.sh --lint --agent 2>/dev/null` — CodeNarc + Vinculum invariants (`config/lint/`); mandatory before merge, recommended after every commit. `./vinc.sh --lint --baseline` only to accept or pay down known debt — review the diff, commit it with the change |
| **Docs audit (close-out gate)** | `./vinc.sh --docs --agent 2>/dev/null` — suite count, latest chronicle, handover size (root `tasks/`, `journals/`) and blueprint stamps (`docs/blueprints/`) |
| **Run Game (Player)** | `./run.sh` (Immersive Portal) |
| **Seed Scan (model gate)** | `./vinc.sh --scan` |
| **Regenerate UI goldens** | `./vinc.sh --goldens` — only after an INTENDED visual change; review the diff, commit goldens with the change |

`.agents/vibe-check-ui.sh` and `.agents/vibe-check-model.sh` are dead (study §8) — do not run them as a gate.

## 🗄️ Groovy-only records
Class blueprints `docs/blueprints/`, retros `docs/retro/`, the OOA plan and report `docs/analysis/OOA_*.md`, finished
HK and phase plans `tasks/completed/`. History — read on demand, never rewritten.

## 📌 Current state of the frozen tree (moved here from the recovery prompt, I02; the status lines 2026-09-25)
- **Test Suite:** 296 discovered / 296 pass / 0 skipped / 0 failed (`./vinc.sh --test --agent 2>/dev/null`; checked by `--docs` D1)
- **Lint:** `./vinc.sh --lint --agent 2>/dev/null` → `LINT=PASS FILES=222 P1=0 P2=0 P3=0`
- **Docs:** `./vinc.sh --docs --agent 2>/dev/null` → `DOCS=PASS` (D1 suite count, D3 the 15 blueprint stamps; the project's own
  checks are the root `.claude/docs-check.sh`). The last Groovy code merge is `55f9460`.
- **Known declared edges:** HK-019's (`journals/LOG_20260916_231644_0x0033981.md`, "Left open") and HK-018's (pre-HK-018
  Keystones open nothing: bound by LIP, no name fallback). **O1** HeadlessRunner DSL: moot with the freeze.
- **Records:** retros `docs/retro/`; finished plans and execution records `tasks/completed/`; housekeeping
  root `tasks/backlog/HOUSEKEEPING.md` (nothing OPEN: HK-021/023/024 closed by the port, HK-013 moot).
- **Player guide numbering:** `docs/terminal/guide/players_guide.md` (root `docs/`) — every number cited from source;
  `cheat_sheet.md` beside it is a copy the guide owns; lines 1–103 keep their numbering (a test comment cites `:102-103`).
- **Lint baseline:** `config/lint/baseline.xml` holds 8 entries — the long methods of HK-013 (extract or re-baseline with a
  reason, never reformat); the `NoNewStaticLogic` allow-list in `config/lint/vinc-ruleset.groovy` is 15 files,
  shrink-only — none of them a rule-holding class since HK-022. One writer: `./vinc.sh --lint --baseline`. Jars: `lib/lint/`.
- **Blueprints:** 15 under `docs/blueprints/logic/classes/` (stamped; see `/close-wave` row 3). `Room`, `TurnProcessor`,
  `NameGenerator`, `ProceduralFactory` and `Building` are `Verified`; 10 are still `Baselined (not audited)`.
- **Goldens:** `src/test/groovy/com/endlesstransit/ui/golden/` — one writer: `./vinc.sh --goldens`.
- **Content (procgen lists):** `src/main/resources/{themes,names}/` — every list has a size floor in
  `ThemeResourceCoverageTest`; audit: root `docs/analysis/VARIETY_AUDIT.md`. For a content change read the execution
  notes of `tasks/completed/HK_016_STEP3_PLAN.md` first (simulate → expected set → allow-list re-pin).
- **Contract pins by area** (all under `src/test/groovy/com/endlesstransit/`): events
  `core/{JournalEventContractTest,EventBusTest}`; factory wiring `procgen/FactoryWiringContractTest`; floor
  `model/{FloorStateContractTest,BreachOptionContractTest,CorridorLeaveContractTest}`; restore
  `core/{RestoreContractTest,AbyssalRestoreContractTest}`; variety `procgen/ProcgenVarietyContractTest`; names
  `procgen/NameGeneratorContractTest`.
- **Housekeeping detail** (root `tasks/backlog/HOUSEKEEPING.md`): HK-021 is the HK-015 residue (a player-visible fix edits
  `docs/terminal/guide/players_guide.md` in the same commit); HK-023 game-side oddities, restore bullet done; HK-024 waits
  for the user's decision on the `KEYSTONE` debug glitch. HK-013 and WF-006 go moot with the freeze (study §2.4).
- **The OOA plan** (`docs/analysis/OOA_REFACTOR_PLAN.md`, per-phase execution records) is not loaded automatically — read on demand.

## ⚙️ Groovy workflow and gates (moved from the root CODEX, 2026-09-25; text unchanged)
* Each refactoring phase runs on its own git branch: `refactor/phase-N-short-name`.
* Merge to `master` only when ALL phase gates pass (`./terminal/vinc.sh --test`, `./terminal/vinc.sh --lint`, `./terminal/vinc.sh --scan` where applicable).
* Every new class created during refactoring MUST include `@CompileStatic`.
* Write a phase retrospective in `terminal/docs/retro/RETRO_PHASE_N.md` after every phase (chronicle first, retro second). Promote any evergreen lessons to `tasks/lessons/<domain>.md`.
* The active task pointer in `CLAUDE.md` should reflect the current refactoring phase document, not a stale task.
* **Visual Baseline Protocol**: The UI gate is the golden-frame suite (`BridgeViewGoldenFrameTest` + `ViewComponentGoldenTest`, run by `./terminal/vinc.sh --test`) — 36 frames compared byte for byte. `./terminal/vinc.sh --scan` is a **model** gate (world generation); it never draws the HUD (WF-003). Regenerate goldens with `./terminal/vinc.sh --goldens` only after an intended visual change, review the diff, commit them with the change. Run both gates before and after any change to `model` or `ui`.
* **Verification Protocol**:
    * **Compilation Check**: Every change MUST pass `./terminal/vinc.sh --compile` (or `--test`).
    * **Full Verification**: Run `./terminal/vinc.sh --test` before marking any major task complete.
    * **Lint Check (O2)**: `./terminal/vinc.sh --lint` must be green before any merge; `terminal/config/lint/baseline.xml` has one writer (`--lint --baseline`) and a diff that *adds* entries is a regression being laundered — review it like a golden.
    * **Docs Check (WF-007)**: `./terminal/vinc.sh --docs` must be green before a wave is called closed — suite count and latest chronicle in `tasks/RECOVERY_PROMPT.md` / `tasks/todo.md`, every class blueprint stamped with its class's current hash, and the recovery prompt under its 1,000-word cap (current state only; history lives in the chronicle). A stamp or a count is never edited to match without doing the `/close-wave` row it belongs to.
* **The Gates** (mandatory after every phase; the full history is in `terminal/docs/analysis/OOA_REFACTOR_PLAN.md`, read on demand):

| Gate | Command | Checks |
| :--- | :--- | :--- |
| Logic | `./terminal/vinc.sh --test` | full suite |
| Visual | golden frames inside `--test` | 36 HUD frames byte-identical |
| Model | `./terminal/vinc.sh --scan` | seed 0 → 9-node match |
| Lint | `./terminal/vinc.sh --lint` | house rules + invariants; baseline may only shrink |
| Determinism | `DeterministicUniverseTest` | same seed → same world (procgen/model changes) |
| Docs | `./terminal/vinc.sh --docs` | handover facts + blueprint stamps (at close-out) |

## 🏛️ Development Conventions
- **Groovy Tooling Lessons**: @tasks/lessons/groovy-tooling.md
- Process lessons that apply to any code: root `tasks/lessons/infrastructure.md` (loaded every session).
