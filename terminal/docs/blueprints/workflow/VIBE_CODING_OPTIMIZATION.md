# Vibe Coding Optimization: AI-Agent Workflow Enhancements

"Vibe Coding" is the practice of maintaining a high-momentum, flow-state development cycle where the AI agent anticipates the architect's intent with minimal friction. To achieve this in *Endless Transit*, we need to move from a "flat script" organization to a "context-isolated" modular structure.

## 1. Identified Friction Points
*   **Context Saturation:** When an agent reads the `com.endlesstransit` package, it sees UI logic (`Terminal.groovy`), Domain logic (`Universe.groovy`), and procedural utilities (`Gematria.groovy`) all at once.
*   **Discovery Overhead:** High-level architectural intent is buried in `docs/`, which agents may not read unless explicitly prompted.
*   **Testing Rigidity:** The script-based test runner (`AllTests.groovy`) is harder for agents to surgically invoke for specific modules compared to standard suite patterns.

## 2. The "Vibe-Ready" Architecture
We should reorganize the codebase into functional domains. This allows agents to "zoom in" on a specific vibe (e.g., "I'm working on the UI") without being distracted by planetary generation logic.

### Proposed Structure
```text
src/
└── main/
    └── groovy/
        └── com/
            └── endlesstransit/
                ├── core/           # Game loop, Player, Engine state
                ├── model/          # The Hierarchy (Universe, Planet, Room)
                ├── procgen/        # Gematria, NameGenerator, ThemeManager
                └── ui/             # Terminal, HUD, Cyber-Interface
```

## 3. Strategies for Agent-Centric Flow

### A. Nested Context Imports (@-Imports)
Instead of one giant `GEMINI.md`, we use the import feature to provide "localized vibes":
- `src/main/groovy/com/endlesstransit/ui/GEMINI.md`: Contains rules for ANSI colors and typewriter delays.
- `src/main/groovy/com/endlesstransit/model/GEMINI.md`: Explains the lazy-loading population pattern.
- The root `GEMINI.md` simply imports these sub-contexts.

### B. "Vibe Check" Validation Scripts
Create a `.agents/` directory containing small, high-signal scripts that agents can run to verify specific "vibes":
- `vibe-check-ui.sh`: Renders a sample HUD to ensure styling hasn't regressed. Also validates visual width alignment for emojis and symbols.
- `vibe-check-gen.sh`: Generates 100 random locations and checks for naming collisions.

### C. Active Lesson Injection
The current `tasks/lessons.md` is excellent. We should enhance this by categorizing lessons by **Component**. When an agent starts a task in `ui/`, it should be instructed (via the local `GEMINI.md`) to read `tasks/lessons/ui.md`.

## 4. Implementation Roadmap

1.  **Phase 1: Domain Separation**
    - Move files into `core`, `model`, `procgen`, and `ui` packages.
    - Update imports in all files.
2.  **Phase 2: Context Localization**
    - Create small `GEMINI.md` files in each sub-package.
    - Move specific development conventions from the root `GEMINI.md` into these local files.
3.  **Phase 3: Standardize Testing**
    - Move `tests/` to `src/test/groovy`.
    - Mirror the package structure of the source for easy test-discovery.
4.  **Phase 4: Entry Point Refinement**
    - Move `Main.groovy` to `src/main/groovy/com/endlesstransit/Main.groovy`.
    - Update `run.sh` to point to the new location.

## 5. Summary of Benefits
- **Surgical Tooling:** Agents spend less time reading irrelevant code.
- **Higher Accuracy:** Local context files act as "guardrails" for specific subsystems.
- **Faster Onboarding:** New agents (or new sessions) "catch the vibe" of a sub-module instantly.
