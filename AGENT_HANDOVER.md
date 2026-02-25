# Agent Handover: Endless Transit

## 1. The Core Directive: "Vibe Coding"
This project is developed using the **Vibe Coding** philosophy. 
- **Aesthetic Priority**: The Cyber-Terminal/Borg aesthetic is a first-class citizen. High contrast, data-heavy, and immersive.
- **Momentum through Modularity**: We use "Context Localization" to keep the context window clean and high-signal.
- **Elegance over Hacks**: We prioritize surgical, idiomatic updates over quick fixes.

## 2. Context Architecture (Mandatory)
We use a hierarchical context system powered by `@` imports in `GEMINI.md`. 
- **Root**: `GEMINI.md` (Orchestration & Index)
- **Workflow**: `GEMINI.custom.md` (Task management and subagent strategy)
- **Domains**: Each sub-directory in `src/main/groovy/com/endlesstransit/` has its own `GEMINI.md`.
- **Lessons**: Categorized history in `tasks/lessons/`.

**Constraint**: When working in a domain (e.g., `ui`), always read the local `GEMINI.md` first.

## 3. Mandatory Workflow
1.  **Plan First**: Every non-trivial task MUST be planned in `tasks/todo.md` before a single line of code is written.
2.  **Verify Always**: Use `./run.sh --test` AND the high-signal scripts in `.agents/` (`vibe-check-ui.sh`, `vibe-check-model.sh`).
3.  **Capture Lessons**: After any correction or major implementation, update the relevant file in `tasks/lessons/`.

## 4. Architectural "Source of Truth"
- **Hierarchy**: Composite Pattern (Universe -> Room) with lazy initialization.
    - **Re-entrancy Guard**: `Container.ensureChildrenPopulated()` uses a `childrenPopulated` flag set *before* population to prevent infinite recursion during Groovy property access.
- **Aesthetics**: `src/main/groovy/com/endlesstransit/ui/Terminal.groovy`. 
    - **Hardware Alignment**: Always use `Terminal.drawBoxedLine()`. It uses **Cursor Horizontal Absolute** (`\u001b[nG`) to ensure perfect right-border alignment regardless of icon/emoji visual width.
    - **Visual Width**: Use `Terminal.getVisualWidth()` for safe content truncation. Standard `length()` fails for icons/emojis.
    - **Atmospheric HUD**: The interface dynamically tints its borders, radar, and sparkline based on the current location's `vibe.atmosphericColor`.
    - **Vector Array Compass**: Replaced the simple cross with a high-density "Navigational Vector Array" that displays dynamic destination labels (e.g., "Floor 16") and anchors all components to a fixed `centerCol` for perfect visual alignment.
- **Inheritance**: `VibeCapsule` system for planetary consistency and regional divergence.
- **Math**: `Gematria` mystical frequency logic with cultural resonance bonuses.

## 5. Entry Points for New Agents
- Read `GEMINI.md` to load the full context tree.
- Check `tasks/todo.md` for the current roadmap.
- Run `.agents/vibe-check-model.sh` to see the current hierarchy stability.
