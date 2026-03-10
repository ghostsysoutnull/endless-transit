# Core Domain: The Engine

**AI ARCHITECT CONTEXT: CORE ORCHESTRATION**
- **Thin Orchestrators:** `Game.groovy` manages the loop, but DELEGATES logic to `model` classes. No business rules in this module.
- **Strict Interface Boundaries:** Treat the `procgen` module as an external service. Pass resulting data into `model` behavior methods.
- **State Integrity:** Orchestrate traversal and tracing, but never manually manipulate internal `Location` data structures.
- **Resilience & Telemetry:** Emit events or updates that the `ui` module can subscribe to. No direct `println` calls.

## ⚙️ Game Loop & State
- **Primary Loop**: `Game.groovy` manages the turn cycle.
- **Input Delegation**: Entrusted to `InputHandler`, `ActionMapper`, and `NavigationEngine`.

## 🏗️ Technical Invariants
1. **Turn Integrity**: Every turn MUST update the `ActionMapper` with current options. `GameMemento` is used for state recovery and deterministic replay.
2. **Deterministic Inputs**: `InputSource` is the mandatory abstraction for all game loop execution.
3. **No Terminal Direct-Access**: All output must go through `Terminal` / `RenderSink`.

## 🏛️ Verification Checklist
- [ ] **Startup Test**: Does a new game initialize without NPEs?
- [ ] **Turn Consistency**: Are mapping and navigation state-correct?
- [ ] **Survival Mechanics**: Does coherence drain correctly?

## 🏺 Localized Lessons
@../../../../../../tasks/lessons/core.md
