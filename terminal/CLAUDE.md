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

## 🏛️ Development Conventions
- **Groovy Tooling Lessons**: @tasks/lessons/groovy-tooling.md
- Process lessons that apply to any code: root `tasks/lessons/infrastructure.md` (loaded every session).
