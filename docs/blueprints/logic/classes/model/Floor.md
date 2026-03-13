# BEHAVIORAL SPEC: Floor (Model)

## 🌌 Responsibility
The `Floor` class acts as a **Spatial Pivot Point**. It separates vertical traversal (Elevator) from horizontal exploration (Corridor).

---

## ⚙️ Public API Behavior

### 📍 Spatial Pivot Mode
- **`isCorridorActive`**: The core state flag.
    - `false` (Default): Player is at the Elevator. Options include `u/d` (vertical move) and `c` (enter corridor).
    - `true`: Player is walking the hallway. Options include `b` (back to elevator) and room exploration via the child `Corridor`.

### 📍 Navigation
- **`getElevatorOptions`**: 
    - `u/d`: Requests `Building.getFloor(number +/- 1)` to move between floors.
    - `j`: Breach the Bedrock action (available only at specific conditions).
    - `c`: Transitions to `isCorridorActive = true`.
- **`getCorridorOptions`**:
    - `b`: Transitions back to `isCorridorActive = false`.
    - Delegates other options to the `Corridor` child.

### 📍 UI Rendering
- **`getExtraContent`**:
    - If Elevator: Returns the **Floor Diagnostic Suite** (Metadata like Tech Era, Resonance, Stability).
    - If Corridor: Delegates to the child `Corridor.getExtraContent()`.

---

## 🔄 State Transitions
- **`isCorridorActive`**: Toggled via `c` and `b` actions. This change triggers an `instantRender` for the UI to reflect the mode switch without a turn cycle penalty.
- **Abyssal Transformation**: If `number < 0`, the floor's culture is forced to `abyssal`, and symbols/labels change (e.g., `FLOOR` -> `LAYER`).

---

## 🔗 Dependencies
- **`Building`**: Parent container; provides vertical navigation.
- **`Corridor`**: Child container; provides horizontal unit exploration.
- **`ProceduralFactory`**: Used to populate the floor with a corridor and apartments.
- **`ModelOutput`**: For TUI diagnostic formatting.

---
*Neural Map Stabilized.*
