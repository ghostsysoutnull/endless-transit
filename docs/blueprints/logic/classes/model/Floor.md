# BEHAVIORAL SPEC: Floor (Model)

## 🌌 Responsibility
The `Floor` class acts as a **Spatial Pivot Point**. It separates vertical traversal (Elevator) from horizontal exploration (Corridor).

---

## ⚙️ Public API Behavior

### 📍 Spatial Pivot Mode (State pattern — OOA Phase 8)
- **`currentState`**: a `FloorState`, one of two stateless singletons.
    - `ElevatorState.INSTANCE` (Default): Player is at the Elevator. Options include `u/d` (vertical move) and `c` (enter corridor).
    - `CorridorState.INSTANCE`: Player is walking the hallway. Options include `b` (back to elevator) and room exploration via the child `Corridor`.
- **`enterCorridor()` / `returnToElevator()`**: the only transitions. Nothing outside `Floor` assigns the state.
- **`getScanTarget()`**: what a lattice scan (`s`) inspects — the parent `Building` in elevator mode, the child `Corridor` in corridor mode. Clients ask the Floor; they never inspect the state class.

### 📍 Navigation
- **`getOptions(game)`**: populates children, then delegates to `currentState.getOptions(this, game)`.
    - `ElevatorState`:
        - `u/d`: Requests `Building.getFloor(number +/- 1)` to move between floors.
        - `j`: Breach the Bedrock action (available only at specific conditions).
        - `c`: calls `floor.enterCorridor()`.
    - `CorridorState`:
        - `b`: calls `floor.returnToElevator()`.
        - Delegates other options to the `Corridor` child (including its `l. Leave Corridor`).

### 📍 UI Rendering
- **`getExtraContent(player, width)`**: populates children, then delegates to `currentState.getExtraContent(this, player, width)`.
    - `ElevatorState`: Returns the **Floor Diagnostic Suite** (Metadata like Tech Era, Resonance, Stability).
    - `CorridorState`: Delegates to the child `Corridor.getExtraContent()`.

### 📍 Persistence
- **`getMutationState()`**: `["state": currentState.id]` — `"ELEVATOR"` or `"CORRIDOR"`.
- **`applyMutationState(map)`**: looks the id up in an id → state registry; unknown ids fall back to `ElevatorState`. No reader for the pre-Phase-8 boolean key.

---

## 🔄 State Transitions
- **`enterCorridor` / `returnToElevator`**: Triggered by the `c` and `b` actions. Each triggers an `instantRender` for the UI to reflect the mode switch without a turn cycle penalty.
- **Abyssal Transformation**: If `number < 0`, the floor's culture is forced to `abyssal`, and symbols/labels change (e.g., `FLOOR` -> `LAYER`).

---

## 🔗 Dependencies
- **`FloorState` / `ElevatorState` / `CorridorState`**: the mode objects (same package).
- **`Building`**: Parent container; provides vertical navigation.
- **`Corridor`**: Child container; provides horizontal unit exploration.
- **`ProceduralFactory`**: Used to populate the floor with a corridor and apartments.
- **`OutputFormatter fmt`** (injected): For TUI diagnostic formatting.

---

## 🧪 Contract
- `FloorStateContractTest` pins menu order, content delegation, bedrock behavior, mutation round trip and scan routing, driving every transition through the option closures.

---
*Neural Map Stabilized.*
