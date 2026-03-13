# Endless Transit: The Vinculum Neural Interface (Nexus)

This is the central router for the Endless Transit substrate. All behavioral laws are defined in the Codex.

## ⚖️ THE CODEX: Operating Law
Mandatory safety mandates and workflow orchestration:
- **@.gemini/GEMINI.custom.md**

---

## 🧩 System Domains (The Invariants)
- **Engine/Core**: @src/main/groovy/com/endlesstransit/core/GEMINI.md
- **World/Model**: @src/main/groovy/com/endlesstransit/model/GEMINI.md
- **Interface/UI**: @src/main/groovy/com/endlesstransit/ui/GEMINI.md
- **Entropy/ProcGen**: @src/main/groovy/com/endlesstransit/procgen/GEMINI.md

---

## 🚀 Active Architecture & Roadmap
- **Active Task:** @tasks/active/VERTICAL_TRAVERSAL_REFACTOR.md
- **Previous Task:** @tasks/active/DIAGNOSTIC_SUITE_IMPLEMENTATION.md
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
