# Endless Transit: The Vinculum Neural Interface (Nexus)

> NOTE: This file coexists with `GEMINI.md`. Both agents share the same `tasks/`, `journals/`, and source domains.
> Gemini equivalent → `GEMINI.md` + `.gemini/GEMINI.custom.md`

This is the central router for the Endless Transit substrate. All behavioral laws are defined in the Codex.

## ⚖️ THE CODEX: Operating Law
Mandatory safety mandates and workflow orchestration:
- **@.claude/CODEX.md**

---

## 📡 Session Context (Chronicle Feed)
Latest journal state for session continuity:
- **@journals/CHRONICLE_INDEX.md**

---

## 🧩 System Domains (The Invariants)
- **Engine/Core**: @src/main/groovy/com/endlesstransit/core/CLAUDE.md
- **World/Model**: @src/main/groovy/com/endlesstransit/model/CLAUDE.md
- **Interface/UI**: @src/main/groovy/com/endlesstransit/ui/CLAUDE.md
- **Entropy/ProcGen**: @src/main/groovy/com/endlesstransit/procgen/CLAUDE.md

---

## 🚀 Active Architecture & Roadmap
- **Active Task:** @docs/analysis/OOA_REFACTOR_PLAN.md
- **Previous Task:** @tasks/active/VERTICAL_TRAVERSAL_REFACTOR.md
- **📜 Chronicles & Lore:** @journals/CHRONICLE_INDEX.md

---

## 🛠️ Operational Tooling

| Action | Command |
| :--- | :--- |
| **Run Game (Clinical)** | `./vinc.sh` (Fast, Auto-compile) |
| **Run Tests (Logic)** | `./vinc.sh --test -q` (Context-efficient) |
| **Verification (Static)** | `./vinc.sh --compile` |
| **Run Game (Player)** | `./run.sh` (Immersive Portal) |
| **Seed Scan** | `./vinc.sh --scan` |
| **Audit UI** | `.agents/vibe-check-ui.sh` |
| **Audit Model** | `.agents/vibe-check-model.sh` |

---

## 🏛️ Development Conventions
- **Infrastructure Lessons**: @tasks/lessons/infrastructure.md
- **Expert OO Standards**: Immutability, Design Patterns, and `@CompileStatic` logic.

---

## 📍 Critical Entry Points
- **Entry**: `src/main/groovy/com/endlesstransit/Main.groovy`
- **Facade Loop**: `src/main/groovy/com/endlesstransit/core/Game.groovy`
- **Entropy Source**: `src/main/groovy/com/endlesstransit/procgen/LocusSeed.groovy`
- **Output Bridge**: `src/main/groovy/com/endlesstransit/ui/TerminalAdapter.groovy`
