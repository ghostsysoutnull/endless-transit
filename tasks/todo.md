# Refactoring Phase 2: Logic & Behavior Hardening

**Objective:** Transition from structural separation to behavioral excellence by implementing advanced OO patterns (Command, Proxy, Adapter) and finishing the Domain Migration.

---

## 🚀 Active Plan (Phase 2)

### 2.1 Domain Migration: LocusSeed Integration (DONE)
*Goal: Remove all raw `long` seeds from the domain to ensure deterministic branching.*
- [x] **Update `Location` Interface**: Replace `getSeed()/setSeed()` with `getLocus()/setLocus()` returning `LocusSeed`.
- [x] **Update `Container` Base**: Migrate the internal `seed` field to a `LocusSeed` instance.
- [x] **Batch Update Models**: Update constructors and internal logic for all 12+ location types (Planet, Building, Room, etc.).
- [x] **Overhaul `ProceduralFactory`**: Use `locus.branch()` for all child generation; eliminate manual `new Random(seed)` calls.

### 2.2 Command Pattern: Action & Navigation (⭐ RECOMMENDED)
*Goal: Finalize the decoupling of the game loop and make player actions testable in isolation.*
- [ ] **Refactor `TurnProcessor`**: Move from simple method delegation to a `Command` dispatch system.
- [ ] **Implement `NavigationCommand`**: Encapsulate f/b, u/d, and numeric choice logic.
- [ ] **Implement `GlitchCommands`**: Complete the migration of world mutations (Breach, Prime, Keystone) into Command objects.
- [ ] **Move Boundary Logic**: Relocate "auto-reversal" and "leave/exit" repetition logic to `NavigationOrchestrator`.

### 2.3 Virtual Proxy: Lazy-Loading Automation
*Goal: Eliminate the "Temporal Coupling" bug where children must be manually populated.*
- [ ] **Implement `LazyLocusList`**: A proxy/wrapper for child lists that automatically calls `ensureChildrenPopulated()` on first access.
- [ ] **Refactor `Location` Classes**: Use the proxy for all `children`, `rooms`, `apartments`, etc.
- [ ] **Verification**: Ensure that calling `location.getChildren().size()` triggers population without manual intervention.

### 2.4 Display Adapter: UI Flexibility
*Goal: Allow for multiple rendering modes (e.g., Glitched, High-Contrast) via dependency injection.*
- [ ] **Formalize `OutputFormatter`**: Finalize the interface used by the model.
- [ ] **Create `StandardTerminalAdapter`**: The baseline "Cyber-Brutalist" implementation.
- [ ] **Create `GlitchedTerminalAdapter`**: A decorator that adds visual artifacts/noise to the output.
- [ ] **Verification**: Successfully swap adapters in `Main.groovy` and see visual changes without touching model code.

---

## 🚀 Active Plan (Phase 3): Spatial Pivot & Vertical Traversal
**Objective:** Refactor the `Building` -> `Floor` -> `Corridor` flow to introduce "Spatial Presence" via a two-stage Elevator/Corridor pivot.

### 3.1 Model & State Integrity
- [ ] **Implement `Visited` Status**: Allow `Building` to query `Player.visitedLIPs` for floor progress.
- [ ] **Define Pivot State**: Add `isCorridorActive` flag to `Floor` or `Player`.

### 3.2 UI & Rendering (The "Elevator Interface")
- [ ] **Design "Floor Diagnostic Scan"**: Create the Stage 1 view (high-level floor summary).
- [ ] **Refactor "Door Listing"**: Convert current `Corridor` view into the Stage 2 "Pivot" state.

### 3.3 Navigation & Action Mapping
- [ ] **Implement Two-Stage Entry**: Refactor `NavigationOrchestrator` for `Select Floor -> Pivot to Elevator`.
- [ ] **Context-Aware Commands**: Map `u`/`d` to Elevator and `01-XX`/`b` to Corridor.

---

## ✅ Completed Tasks

### Phase 1: Critical Architecture Cleanup (DONE)
- [x] **Game.groovy Decomposition**: Decomposed into 5 specialized services (`GameState`, `TurnProcessor`, etc.).
- [x] **Location Interface Segregation**: Split into `Locatable`, `Navigable`, `Renderable`, and `Stateful`.
- [x] **Polymorphic Dispatch**: Removed `instanceof` checks; implemented `getMapSymbol()` in concrete classes.
- [x] **Service Injection**: `ThemeService` and `ProceduralFactory` converted to instances.
- [x] **Model/UI Decoupling**: Implemented `OutputFormatter` and `TerminalAdapter`.

### Phase 4: Verification & Advanced Auditing (DONE)
- [x] **SeedScanner**: High-performance headless world discovery with branch pruning.
- [x] **Memento Pattern**: Robust state capture and LIP-based restoration in `GameMemento`.

---

## 🏛️ Phase 2 Recommendations
1.  **Start with 2.1 (LocusSeed)**: This is the most foundational change. Every other part of the system relies on how seeds are managed. Getting this right now prevents massive re-work later.
2.  **Follow with 2.2 (Command Pattern)**: This cleans up the "Brain" of the game (`TurnProcessor`) and allows us to test navigation scenarios without a real terminal.
3.  **Implement 2.3 (Virtual Proxy) as a safety measure**: It removes a major category of "empty world" bugs caused by forgetting to call lazy-loading methods.
