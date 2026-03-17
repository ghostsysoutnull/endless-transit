# Domain Invariants: Engine & Core

> Gemini equivalent → `GEMINI.md` (this file)

**ARCHITECTURAL CONSTRAINTS**
- **Decomposed Facade:** `Game.groovy` is a thin facade. It MUST delegate all orchestration to specialized services.
- **Incremental Extraction**: Decomposing the facade must be done one service at a time (max 5 files/methods per refactor).
- **Service Injection:** Core services should access `GameState` as the shared source of truth.
- **State Integrity**: Never manually manipulate internal `Location` data structures.
- **Resilience & Telemetry**: Emit events or updates for the UI. No direct `println`.

## ⚙️ Game Loop & State
- **Primary Loop**: Managed via `TurnProcessor`.
- **Orchestration**: Logic partitioned across `NavigationOrchestrator`, `ActionMapper`, and `RenderingCoordinator`.
- **Persistence**: Exclusive management by `PersistenceService` via `GameMemento`.

## 🏗️ Technical Invariants
1. **Turn Integrity**: Every turn MUST update `ActionMapper`.
2. **Deterministic Inputs**: `InputSource` abstraction is mandatory.
3. **No Terminal Direct-Access**: All output MUST go through `Terminal` / `RenderSink`.
4. **Service Isolation**: Navigation logic stays in `NavigationOrchestrator`.

## 🏛️ Verification Checklist
- [ ] **Startup Test**: New game initializes without NPEs.
- [ ] **Turn Consistency**: Mapping and navigation are state-correct.
- [ ] **Survival Mechanics**: Coherence drain is verified.

## 🏺 Localized Lessons
- **Core Domain Lessons**: @tasks/lessons/core.md
