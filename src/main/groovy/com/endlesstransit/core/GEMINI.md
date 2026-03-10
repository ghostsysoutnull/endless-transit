# Core Domain: The Engine

**AI ARCHITECT CONTEXT: CORE ORCHESTRATION**
- **Decomposed Facade:** `Game.groovy` is a thin facade. It MUST delegate all orchestration to specialized services: `GameState` (data), `TurnProcessor` (loop logic), `NavigationOrchestrator` (movement), `PersistenceService` (IO), and `RenderingCoordinator` (UI bridge).
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
- [ ] **Survival Mechanics**: Does coherence drain correctly?

## 🏺 Localized Lessons
@../../../../../../tasks/lessons/core.md
