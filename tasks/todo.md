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

### 2.2 Command Pattern: Action & Navigation (DONE)
*Goal: Finalize the decoupling of the game loop and make player actions testable in isolation.*
- [x] **Introduce `GameCommand` Interface**: Unified interface for all player actions with `GameState` and `choice` context.
- [x] **Refactor `TurnProcessor`**: Migrated to a `Command` dispatch system with a `globalCommands` registry.
- [x] **Implement `NavigationCommand`**: Encapsulated f/b, u/d, and numeric choice logic.
- [x] **Implement `GlitchCommands`**: Successfully migrated Breach, Prime, Keystone, and Integrity into the Command substrate.
- [x] **Refactor System Commands**: Ported Scan, Sync, Help, Map, and Capture to `GameCommand`.

### 2.3 Virtual Proxy: Lazy-Loading Automation (DONE)
*Goal: Eliminate the "Temporal Coupling" bug where children must be manually populated.*
- [x] **Implement `LazyLocusList`**: Automated population via Virtual Proxy on first list access.
- [x] **Refactor `Location` Classes**: Migrated `Container`, `Street`, `Building`, `Corridor`, and `Apartment`.
- [x] **Verification**: Confirmed recursive safety and list synchronization across deep hierarchies.

### 2.4 Display Adapter: UI Flexibility (⭐ RECOMMENDED)
*Goal: Allow for multiple rendering modes (e.g., Glitched, High-Contrast) via dependency injection.*
- [ ] **Formalize `OutputFormatter`**: Finalize the interface used by the model.
- [ ] **Create `StandardTerminalAdapter`**: The baseline "Cyber-Brutalist" implementation.
- [ ] **Create `GlitchedTerminalAdapter`**: A decorator that adds visual artifacts/noise to the output.
- [ ] **Verification**: Successfully swap adapters in `Main.groovy` and see visual changes without touching model code.

---

## 🚀 Active Plan (Phase 3.6): Door Enhancement & Sensory Deduction (DONE)
**Objective:** Refactor doors into sensory signal sources with enhanced scan diagnostics and deductive clues.

### Phase 1: Component Substrate (DONE)
- [x] **1.1 Define `InscriptionStyle` & `DoorInscription`**
- [x] **1.2 Define `AnomalousTrace` Enum**
- [x] **1.3 Create `DoorAppearance` Object**

### Phase 2: Model & Synthesis Integration (DONE)
- [x] **2.1 Refactor `Door.groovy`**
- [x] **2.2 Update `ProceduralFactory` (Back-Propagation Logic)**

---

## 🚀 Active Plan (Phase 3.5): Entropy Unification & Mixer Pattern (DONE)
**Objective:** Unify branching entropy via the `EntropyMixer` pattern to ensure deep variety across all procedural layers.

### Phase 1: The Scrambling Substrate (DONE)
- [x] **1.1 Define `EntropyMixer` Interface**
- [x] **1.2 Implement `StandardMixer` (LCG Scramble)**
- [x] **1.3 Unit Test: Entropy Divergence**

### Phase 2: LocusSeed Refactor (DONE)
- [x] **2.1 Integrate Mixer into `LocusSeed`**
- [x] **2.2 Unify Branching Methods (int/String)**
- [x] **2.3 Implement `branch(long)`**

---

## 🚀 Active Plan (Phase 3): Spatial Pivot & Vertical Traversal (DONE)
**Objective:** Refactor the `Building` -> `Floor` -> `Corridor` flow to introduce "Spatial Presence" via a two-stage Elevator/Corridor pivot.

### 3.1 Model & State Integrity (DONE)
- [x] **Implement `Visited` Status**: Allow `Building` to query `Player.visitedLIPs` for floor progress.
- [x] **Define Pivot State**: Add `isCorridorActive` flag to `Floor` or `Player`.

### 3.2 UI & Rendering (The "Elevator Interface") (DONE)
- [x] **Design "Floor Diagnostic Scan"**: Create the Stage 1 view (high-level floor summary).
- [x] **Refactor "Door Listing"**: Convert current `Corridor` view into the Stage 2 "Pivot" state.

### 3.3 Navigation & Action Mapping (DONE)
- [x] **Implement Two-Stage Entry**: Refactor `NavigationOrchestrator` for `Select Floor -> Pivot to Elevator`.
- [x] **Context-Aware Commands**: Map `u`/`d` to Elevator and `01-XX`/`b` to Corridor.

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
