# ORCHESTRATION FLOW: The Neural Heartbeat

## 🌌 Overview
This document codifies the high-level interaction patterns between the engine, the domain model, and the user interface. It describes how a single "pulse" (turn) propagates through the system.

---

## ⚙️ 1. The Game Loop (Heartbeat)
The loop resides in `Game.groovy` and follows a strict four-stage cycle for every player interaction.

1.  **Process Turn Context**: 
    - `TurnProcessor.processTurn()` is called.
    - Coherence is drained based on location stability.
    - Local events (landmark discovery, frequency extraction) are triggered via `location.enter()`.
2.  **Map Actions**:
    - `currentLocation.getOptions()` generates the available interaction menu.
    - `ActionMapper.update()` binds these options to numeric or mnemonic keys.
3.  **Render State**:
    - `RenderingCoordinator.render()` (delegating to `BridgeView`) draws the HUD, Map, and Menu.
    - Data is pulled from the `model` and formatted via `TerminalAdapter`.
4.  **Input & Dispatch**:
    - `TurnProcessor.handleInput()` waits for user input.
    - Input is normalized and dispatched to the appropriate `GameCommand` or `Action`.

---

## ⚙️ 2. Navigation Lifecycle (Spatial Pivot)
Navigation is not a simple "jump" between objects; it is a state transition managed by the `NavigationOrchestrator`.

- **Entry Trigger**: `enterLocation(target)`
    - **Reset**: If the target is a `Floor`, its `isCorridorActive` flag is reset to `false` (Elevator view).
    - **Auto-Entry**: If the target is an `Apartment`, it immediately cascades to the first `Room`.
    - **Trace**: The location and its ancestors are marked as `Visited` in the player's footprint.
- **Back-Propagation**: `exitLocation()`
    - Moves the player to the `currentLocation.parent`.
    - Ensures the hierarchy remains navigable even in deep procedural branches.

---

## ⚙️ 3. UI Data Mapping (The Bridge)
The UI (`BridgeView`) is a reactive observer of the `model`. It uses a "Split-Pane Composition" to display dense information.

- **The Left Pane (Narrative)**:
    - Displays `location.getDescription()` and `location.getExtraContent()`.
    - Truncates and wraps text based on the terminal width.
- **The Right Pane (Telemetry)**:
    - **Macro-Scale (Depth <= 7)**: Displays the `Neural Map` (Universe/Filament/City layout).
    - **Micro-Scale (Depth > 7)**: Displays `System Telemetry` (Spectral Spectrogram and Trace Logs).
- **The HUD (Metadata)**:
    - Pulls static invariants (`Coordinates`, `Depth`, `LIP`) directly from the `Location`.
    - Displays dynamic state (`Coherence`, `StepCount`) from the `Player`.

---

## ⚙️ 4. Procedural Synthesis (Entropy Flow)
Data flows downward from the `masterLocus` at the root of the `Universe`.

- **Branching**: Every child node is instantiated using `parent.locus.branch(index)`.
- **Mixing**: `StandardMixer` ensures that siblings have unique, deterministic seeds.
- **Reconstitution**: Using the `LIP` (Locus Identity Path), the `WorldGenesis` service can recreate any specific location from the `masterLocus` without storing the entire world in memory.

---
*Neural Flow Documented. System Coherence: 100%.*
