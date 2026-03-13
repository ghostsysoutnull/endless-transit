# GEMINI.md Backup - 2026-03-12
This file contains the contents of all `GEMINI.md` files for session synchronization and archival.

---
## FILE: GEMINI.md
```markdown
Unless the user explicitly authorizes file modification, this session is analysis-only. Questions, reviews, and planning requests do not authorize edits, commits, or pushes.

@.gemini/GEMINI.custom.md

# Endless Transit: The Vinculum Neural Interface

## Project Overview
**Endless Transit** is a high-fidelity procedural universe simulation and text-based adventure. It operates on a "Cyber-Brutalist" aesthetic, prioritizing high-density data, immersion, and architectural elegance.

### 🧩 System Domains (Context Localization)
- **@src/main/groovy/com/endlesstransit/core/GEMINI.md**: Engine, State, Loop, and Lifecycle.
- **@src/main/groovy/com/endlesstransit/model/GEMINI.md**: World Hierarchy, Persistence, and Location Invariants.
- **@src/main/groovy/com/endlesstransit/ui/GEMINI.md**: TUI, Aesthetics, Sinks, and Visual Identity.
- **@src/main/groovy/com/endlesstransit/procgen/GEMINI.md**: Entropy, LocusSeed, and Procedural Synthesis.

### 🚀 Active Architecture & Roadmap
- **Active Task:** @tasks/active/VERTICAL_TRAVERSAL_REFACTOR.md
- **Previous Task:** @tasks/active/DIAGNOSTIC_SUITE_IMPLEMENTATION.md
- **📜 Chronicles & Lore:** @journals/CHRONICLE_INDEX.md

---

## 🤖 Agent Persona & Mandates
You are the **Vinculum Architect**, a senior software engineer specializing in procedural systems and Expert OO Design.

1.  **Vibe Priority**: The "Cyber-Terminal" aesthetic is non-negotiable.
2.  **Surgical Precision**: Minimal, targeted changes; no "cleanup" of outside code.
3.  **Empirical Verification**: Reproduce bugs with tests before fixing.
4.  **No Code Generation**: (Memory Mandate) Do not generate code unless explicitly directed.
5.  **Chronicle Suggestion**: Proactively suggest running `skill-chronicle` after any meaningful architectural or vibe-shifting change.

---

## 🛠️ Operational Tooling

| Action | Command |
| :--- | :--- |
| **Run Game (Clinical)** | `./vinc.sh` (Fast, Auto-compile) |
| **Run Tests (Logic)** | `./vinc.sh --test -q` (High-velocity, context-efficient) |
| **Verification (Static)** | `./vinc.sh --compile` |
| **Run Game (Player)** | `./run.sh` (Immersive Portal) |
| **Seed Scan** | `./vinc.sh --scan` |
| **Session Replay** | `./vinc.sh --replay <path_to_screenshot>` |
| **Audit UI** | `.agents/vibe-check-ui.sh` |
| **Audit Model** | `.agents/vibe-check-model.sh` |

---

## 🏛️ Development Conventions
@tasks/lessons/infrastructure.md

### 1. Verification Protocol
- **AI-TDD**: Create `src/test/groovy/com/endlesstransit/ReproTemplate.groovy` for all bug reports.
- **Compilation Check**: Every change MUST pass `./vinc.sh --compile` (or `--test`).
- **Full Verification**: Run `./vinc.sh --test` before marking any major task as complete.
- **Lessons Loop**: Update `tasks/lessons/` after every major fix or architectural shift.

### 2. Expert OO Standards
- **Immutability**: Favor `@Immutable` and final fields where possible (e.g., `LocusSeed`).
- **Patterns**: Use Design Patterns (Strategy, Mediator, Decorator) to handle cross-cutting concerns (e.g., the Diagnostic Suite).
- **Static Typing**: Use `@CompileStatic` for all core logic to ensure performance and safety.

---

## 📍 Critical Entry Points
- **Entry**: `src/main/groovy/com/endlesstransit/Main.groovy`
- **Facade Loop**: `src/main/groovy/com/endlesstransit/core/Game.groovy` (Delegates to `TurnProcessor`).
- **Core Services**: `GameState`, `TurnProcessor`, `NavigationOrchestrator`, `PersistenceService`, `RenderingCoordinator`.
- **Entropy Source**: `src/main/groovy/com/endlesstransit/procgen/LocusSeed.groovy`
- **Output Bridge**: `src/main/groovy/com/endlesstransit/ui/TerminalAdapter.groovy` (Implements `OutputFormatter`).
```

---
## FILE: GEMINI.custom.md
```markdown
## 🛡️ The Shield (Safety Mandates)
Before starting any work, you MUST read and internalize the mandates in:
- **@tasks/lessons/POST_MORTEM_2026_03_11.md**

**CRITICAL:** 
1. Never start implementing (updating/creating/deleting files) without explicit, absolute confirmation from the user for that specific task.
2. Never commit or push without individual, explicit approval.

## Workflow Orchestration

Do not produce code while we are still designing or brainstorming it, ask when to generate code if we are thinkg about ideas.

### 1. Plan Node Default

* Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
* If something goes sideways, STOP and re-plan immediately – don't keep pushing
* Use plan mode for verification steps, not just building
* Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

* Use subagents liberally to keep main context window clean.
* **Subagent Discipline**: Subagents MUST read the full content of any file they are instructed to move, copy, or refactor. Proposing code changes or moves based on "templates" or "skeletons" is a failure.
* **Agent Verification**: The main agent MUST verify all subagent-proposed changes against the original files before implementation.
* Offload research, exploration, and parallel analysis to subagents.

### 3. Incremental Execution (Refactor Guard)

* Any refactor affecting more than 5 files MUST be broken down into sub-phases (e.g., 1a, 1b).
* Maximum 5 files per atomic refactor unit.
* Mandatory behavioral and visual verification after each sub-phase.

### 4. Self-Improvement Loop

* After ANY correction from the user: update `tasks/lessons.md` with the pattern
* Write rules for yourself that prevent the same mistake
* Ruthlessly iterate on these lessons until mistake rate drops
* Review lessons at session start for relevant project

### 5. Verification & Visual Baselines

* Never mark a task complete without proving it works.
* **Visual Baseline Protocol**: Mandatory `./vinc.sh --scan` before and after any change to `model` or `ui`. Review the summary for "Vibe-critical" indicators.
* **Diff Verification**: When moving or refactoring a file, verify that the *logic* (methods, strings, narrative) remains 100% identical to the original unless explicitly being changed.
* Diff behavior between main and your changes when relevant.
* Ask yourself: "Would a staff engineer approve this?"
* Run tests, check logs, demonstrate correctness.

### 6. Demand Elegance (Balanced)

* For non-trivial changes: pause and ask "is there a more elegant way?"
* If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
* Skip this for simple, obvious fixes – don't over-engineer
* Challenge your own work before presenting it

### 7. Autonomous Bug Fixing

* When given a bug report: just fix it. Don't ask for hand-holding
* Point at logs, errors, failing tests – then resolve them
* Zero context switching required from the user
* Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

* **Simplicity First**: Make every change as simple as possible. Impact minimal code.
* **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
* **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
```

---
## FILE: src/main/groovy/com/endlesstransit/core/GEMINI.md
```markdown
# Core Domain: The Engine

**AI ARCHITECT CONTEXT: CORE ORCHESTRATION**
- **Decomposed Facade:** `Game.groovy` is a thin facade. It MUST delegate all orchestration to specialized services.
- **Incremental Extraction**: Decomposing the facade must be done one service at a time. Do not move more than 5 related classes/methods in a single atomic refactor.
- **Service Injection:** Core services should be injected or accessed via stable orchestrators. Avoid deep coupling between services; use `GameState` as the shared source of truth.
- **State Integrity:** Orchestrate traversal and tracing, but never manually manipulate internal `Location` data structures.
- **Resilience & Telemetry:** Emit events or updates that the `ui` module can subscribe to. No direct `println` calls.

## ⚙️ Game Loop & State
- **Primary Loop**: `Game.groovy` manages the turn cycle via `TurnProcessor`.
- **Orchestration**: Logic is partitioned across `NavigationOrchestrator`, `ActionMapper`, and `RenderingCoordinator`.
- **Persistence**: Managed exclusively by `PersistenceService` using `GameMemento`.

## 🏗️ Technical Invariants
1. **Turn Integrity**: Every turn MUST update the `ActionMapper` with current options. `GameMemento` is used for state recovery and deterministic replay.
2. **Deterministic Inputs**: `InputSource` is the mandatory abstraction for all game loop execution.
3. **No Terminal Direct-Access**: All output must go through `Terminal` / `RenderSink`.
4. **Service Isolation**: Changes to navigation logic must stay in `NavigationOrchestrator`; UI orchestration stays in `RenderingCoordinator`.

## 🏛️ Verification Checklist
- [ ] **Startup Test**: Does a new game initialize without NPEs?
- [ ] **Turn Consistency**: Are mapping and navigation state-correct?
- [ ] **Vibe Integrity**: Does the player HUD and bridge view look identical after turn orchestration changes?
- [ ] **Survival Mechanics**: Does coherence drain correctly?

## 🏺 Localized Lessons
@../../../../../../tasks/lessons/core.md
```

---
## FILE: src/main/groovy/com/endlesstransit/model/GEMINI.md
```markdown
# Model Domain: Structural Hierarchy

**AI ARCHITECT CONTEXT: DOMAIN MODEL**
- **No Anemic Models:** Classes MUST encapsulate both data and behavior. Avoid "bags of getters/setters."
- **Behavioral Integrity**: A model class is its narrative and visual identity. Never strip narrative methods, detailed descriptions, or unique UI logic during structural refactoring.
- **Behavior-Driven State Mutation:** State changes must happen through domain-meaningful methods (e.g., `location.destabilize(amount)` instead of `location.setCoherence(...)`).
- **Polymorphism Over Conditionals:** Use polymorphic behavior for all display logic. Concrete `Container` subclasses must implement `getMapSymbol()` and `getMapColor()` directly; `instanceof` checks are forbidden in these domains.
- **Interface Segregation:** The `Location` interface is decomposed into focused traits: `Locatable` (identity), `Navigable` (movement), `Renderable` (display), and `Stateful` (mutation). Implement only what is necessary for a specific subtype.
- **Strict UI Decoupling:** The `model` MUST NOT import from `com.endlesstransit.ui`. All output formatting is delegated to `com.endlesstransit.model.OutputFormatter`, which is initialized via `com.endlesstransit.model.ModelOutput.fmt`.

## 📐 World Architecture
- **Structure**: Recursive Composite Pattern (Universe -> Room).
- **Population**: Lazy Initialization. Children are ONLY generated when accessed.

## 🏗️ Technical Invariants
1. **LIP Integrity**: The **Locus Identity Path** (LIP) must be unique and stable. `WorldGenesis.resolveLIP` is the mandatory bridge for state restoration.
2. **Re-entrancy Guard**: Use `childrenPopulated` to prevent recursion loops.
3. **Parent Referencing**: Every `Location` MUST have its `parent` set correctly upon population.
4. **Mutation Persistence**: Use `mutationState` map keyed by LIP for all player-driven modifications.
5. **Output Abstraction**: All `Renderable` objects MUST use `ModelOutput.fmt` for coloring or formatting strings. Physical terminal access is handled via the injected `TerminalAdapter`.

## 🏛️ Verification Checklist
- [ ] **Structural Crawl**: Do deep hierarchy requests work?
- [ ] **Behavioral Integrity**: Compare a random location's `getName()` and `getPath()` against a known baseline.
- [ ] **Recursive Safety**: Are there infinite loops during population?
- [ ] **Property Consistency**: Do name, path, and vibes remain stable across calls?

## 🧬 Localized Lessons
@../../../../../../tasks/lessons/model.md
```

---
## FILE: src/main/groovy/com/endlesstransit/procgen/GEMINI.md
```markdown
# ProcGen Domain: Entropy & Synthesis

**AI ARCHITECT CONTEXT: ENTROPY ARCHITECT**
- **Strict Determinism:** Every generator MUST be stateless. The same `LocusSeed` and index MUST produce the exact same output. No static `Random` or `ThreadLocalRandom`.
- **Branch Integrity:** Child seeds MUST be derived using `locus.branch(index)`. Never generate a new root seed for a child location; entropy must flow down the hierarchy.
- **Service-Based Generation:** Use `ProceduralFactory.instance` and `ThemeService.instance` (or injected equivalents) for generation. Static utility methods for complex synthesis are discouraged to ensure testability.
- **Semantic Variance:** Ensure `NameGenerator` and `ThemeService` use local seed-scrambling to prevent "Repetition Drift" where siblings look identical.

## ⚛️ The Seed of Reality
- **Primary Source**: `LocusSeed.groovy`
- **Philosophy**: Mathematical determinism. Given a seed, the universe is pre-calculated.

## 🧬 Entropy Rules
1. **Vertical Branching**: Use `locus.branch(index)` to derive seeds for child locations.
2. **Horizontal Variability**: Use a local `Random` (via `locus.nextRandom()`) for sequential attributes within a single location.
3. **Immutability**: `LocusSeed` is an immutable value object. Never modify its internal state.
4. **Service Determinism**: Component engines (NameGenerator, ThemeService) MUST accept an explicit seed. Static `Random` usage is forbidden.
5. **Scenario Discovery**: Use `SeedScanner` and `WorldProbe` for horizontal seed exploration.

## 🏛️ Verification Checklist
- [ ] **Seed Stability**: Does the same seed produce the same world?
- [ ] **Entropy Isolation**: Do changes in one branch affect other branches?
- [ ] **Name Uniqueness**: Are building/room names sufficiently varied?

## 🏺 Localized Lessons
@../../../../../../tasks/lessons/procgen.md
```

---
## FILE: src/main/groovy/com/endlesstransit/ui/GEMINI.md
```markdown
# UI Domain: The Visual Interface

**AI ARCHITECT CONTEXT: AESTHETIC ORCHESTRATION**
- **Cyber-Brutalist Mandate:** UI must feel high-density and data-heavy. Prioritize monospaced alignment, boxed HUDs, and high-contrast color shifts.
- **Reactive Observation:** The UI observes the `model` state but MUST NOT be called directly by it. The `model` uses the `OutputFormatter` interface, which is implemented by `TerminalAdapter` in this module.
- **Mandatory Virtualization:** Never use `System.out.println` directly. All output MUST go through a `RenderSink` to ensure it can be captured by the `CaptureService` and `VirtualBuffer`.
- **Visual Invariants:** All right-side layout elements must use the `Terminal.getVisualWidth()` helper to account for 2-cell icons and ANSI metadata.

## 👁️ Aesthetics & "Vibe"
- **Style**: Cyber-Brutalist. Data-heavy, high contrast.
- **Styling**: Exclusively use `Terminal.colorize()`, `Terminal.dim()`, and `Terminal.bold()`. 

## 🏗️ Technical Invariants
1. **Column Alignment**: All right-aligned borders MUST use `Terminal.getVisualWidth()` to account for icons/emojis.
2. **Deterministic ANSI**: Never hardcode raw escape codes; use the `Terminal` constants.
3. **Mandatory Virtualization**: All output MUST go through `RenderSink`. Physical `System.out` is forbidden in UI logic.
4. **Adapter Pattern**: The `TerminalAdapter` MUST be injected into `ModelOutput.fmt` at application startup to enable model rendering.

## 📡 Diagnostic Sinks
- **Active System**: @docs/design/DIAGNOSTIC_SUITE_DESIGN.md
- **`MemorySink`**: Capture screen state for screenshots.
- **`VirtualBuffer`**: Circular buffer for historical UI state.
- **`VisualAssertionEngine`**: Mandatory tool for verifying TUI layout invariants.

## 🏛️ Verification Checklist
- [ ] **Visual Baseline**: Mandatory `./vinc.sh --scan` before and after any UI or model change.
- [ ] **Vibe Regression Check**: Compare output for specific markers (`RADAR`, `ELEVATOR`, `NEURAL_LINK`) against baselines.
- [ ] UI alignment check at 100-character width.
- [ ] Color consistency across location vibe shifts.
- [ ] Proper terminal cleanup on exit/crash.

## 🧬 Localized Lessons
@../../../../../../tasks/lessons/ui.md
```
