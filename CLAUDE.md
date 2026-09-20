# Endless Transit: The Vinculum Neural Interface (Nexus)

This is the central router for the Endless Transit substrate. All behavioral laws are defined in the Codex.

## ⚖️ THE CODEX: Operating Law
Mandatory safety mandates and workflow orchestration:
- **@.claude/CODEX.md**

---

## 📡 Session Context (Chronicle Feed)
Not included — read on demand. Current state: `tasks/RECOVERY_PROMPT.md`. History: the top rows of `journals/CHRONICLE_INDEX.md`, then the log a row points to.

---

## 🧩 System Domains (The Invariants)
- **Engine/Core**: `src/main/groovy/com/endlesstransit/core/CLAUDE.md`
- **World/Model**: `src/main/groovy/com/endlesstransit/model/CLAUDE.md`
- **Interface/UI**: `src/main/groovy/com/endlesstransit/ui/CLAUDE.md`
- **Entropy/ProcGen**: `src/main/groovy/com/endlesstransit/procgen/CLAUDE.md`

---

## 🚀 Active Architecture & Roadmap
- **Active Task:** none — see `tasks/todo.md`. The OOA refactor plan (all phases complete) is `docs/analysis/OOA_REFACTOR_PLAN.md` — read on demand, not included.

- **📜 Chronicles & Lore:** `journals/CHRONICLE_INDEX.md` → `journals/LOG_*` (read on demand)
- **Backlog:** `tasks/backlog/`

---

## 🛠️ Operational Tooling

| Action | Command |
| :--- | :--- |
| **Run Game (Clinical)** | `./vinc.sh` (Fast, Auto-compile) |
| **Run Tests (Full suite)** | `./vinc.sh --test --agent 2>/dev/null` — run whenever codebase is coherent; mandatory before every commit |
| **Run Tests (Inner loop)** | `./vinc.sh --test ClassName --agent 2>/dev/null` — multi-file migrations only, while callers are partially updated |
| **Run Tests (Debug)** | `./vinc.sh --test -q` (20-line output with failure location) |
| **Verification (Static)** | `./vinc.sh --compile` |
| **Lint (House rules)** | `./vinc.sh --lint --agent 2>/dev/null` — CodeNarc + Vinculum invariants (`config/lint/`); mandatory before merge, recommended after every commit. `./vinc.sh --lint --baseline` only to accept or pay down known debt — review the diff, commit it with the change |
| **Docs audit (close-out gate)** | `./vinc.sh --docs --agent 2>/dev/null` — suite count, latest chronicle, blueprint stamps, handover size; run by `/close-wave`, mandatory before a wave is called closed |
| **Run Game (Player)** | `./run.sh` (Immersive Portal) |
| **Seed Scan (model gate)** | `./vinc.sh --scan` |
| **Regenerate UI goldens** | `./vinc.sh --goldens` — only after an INTENDED visual change; review the diff, commit goldens with the change |
| **Audit UI** | `.agents/vibe-check-ui.sh` |
| **Audit Model** | `.agents/vibe-check-model.sh` |

---

## 🏛️ Development Conventions
- **Infrastructure Lessons**: @tasks/lessons/infrastructure.md
- **Core Domain Lessons**: `tasks/lessons/core.md` (loaded by the core domain file)
- **Model Domain Lessons**: `tasks/lessons/model.md` (loaded by the model domain file)
