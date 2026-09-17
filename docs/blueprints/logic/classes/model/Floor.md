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
- **`leave(game)`** (HK-019): `returnToElevator()` then `game.exitLocation()`. Corridor mode means "standing in the corridor"; walking out of the floor from there hands it back to the elevator, so the next visit opens on the elevator menu. The reset is on *leave*, never on enter (restore goes through `enterLocation` — Phase 1a).
- **`getScanTarget()`**: what a lattice scan (`s`) inspects — the parent `Building` in elevator mode, the child `Corridor` in corridor mode. Clients ask the Floor; they never inspect the state class.

### 📍 Navigation
- **`getOptions(game)`**: populates children, then delegates to `currentState.getOptions(this, game)`.
    - `ElevatorState`:
        - `u/d`: Requests `Building.getFloor(number +/- 1)` to move between floors.
        - `j`: Breach the Bedrock action (available only at specific conditions).
        - `c`: calls `floor.enterCorridor()`.
    - `CorridorState`:
        - `b`: calls `floor.returnToElevator()`.
        - `j`: the same breach rule as the elevator (`floor.addBreachOption`, HK-018).
        - Delegates other options to the `Corridor` child. Its `l. Leave Corridor` entry keeps its key and slot, but its action is re-routed to `floor.leave(game)` (HK-019; the key comes from `Container.leaveLabel()`, never a copied string).
        - Standing on the `Corridor` *location* (after leaving an apartment) the menu is the Corridor's own: that `l` returns to the Floor, still in corridor mode.

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
- **`leave`**: Triggered by `l` in corridor mode. Corridor → Elevator, then the player lands on the Building. Entering an apartment, coming back from one, and sync/restore while in the corridor do **not** change the mode.
- **Not covered (declared, HK-019 E2/E7):** a direct `game.exitLocation()` or the debug `BREACH` teleport leaves the mode as it was.
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
- `CorridorLeaveContractTest` (HK-019) pins where `l` lands in either mode, the apartment return keeping corridor mode, and the floor returning to the elevator after a corridor leave (direct, full walk-out, bedrock).
- `BreachOptionContractTest` (HK-018) pins the `j` rule in both modes.
- `FloorStateContractTest` pins menu order, content delegation, bedrock behavior, mutation round trip and scan routing, driving every transition through the option closures.

---
*Neural Map Stabilized.*
