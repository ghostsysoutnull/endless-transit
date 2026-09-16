# Domain Invariants: Engine & Core

> Gemini equivalent: `GEMINI.md` (same directory)

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
- **World generation (HK-008)**: `Game.factory` (final) is the one `ProceduralFactory`, built with the game's `fmt` and injected into `NavigationOrchestrator` and `PersistenceService` (which passes it to `SyncManager.restore` and `WorldGenesis.createInitialWorld`). A restored world is rebuilt by the restoring game's factory. There is no static factory anywhere.
- **Domain Events (Phase 10, HK-010)**: `GameState.events` is the one `EventBus` (final, never replaced). `Player` is the sole publisher (`capture` → `ItemCaptured`, `mergeItems` → `SynthesisPerformed`, `markFootprint` → `LocationDiscovered` once per new macro path). Listeners are attached once in `Game`: `game.journal.attach` (the one `JournalManager` instance, `final` on `Game` — HK-011) then `RitualTracker.attach`. The HUD ticker never reads the journal: `BridgeView` passes `journal.getRecentEvents(TICKER_DEPTH)` into `RenderContext.recentEvents`. A listener is a **typed subscription per event class** — never `instanceof` an event. A `Player` built outside `GameState` carries an inert bus. The `Game` constructor publishes the start-locus discoveries; `Game.start()` → `startSession` wipes them, so the journal and ticker never show the starting locus (test harnesses that build a `Game` reset the journal *after* construction).

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
