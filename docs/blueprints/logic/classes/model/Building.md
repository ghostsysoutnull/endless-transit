# BEHAVIORAL SPEC: Building (Model)

## 🌌 Responsibility
The `Building` class represents a vertical container of `Floor` units. It manages the vertical lattice structure, landmark status, and the "Bedrock Breach" ritual state.

---

## ⚙️ Public API Behavior

### 📍 Navigation & Access
- **`getFloor(int number)`**: Retrieves a specific floor. 
    - If `number < 0` and `isBreached` is true, it dynamically creates an "Abyssal Floor" if it doesn't exist.
    - Triggers child population via `LazyLocusList`.
- **`getFloorProgress(Floor, Player)`**: Computes `visited/total` sub-location counts for a floor to show progress in the TUI (e.g., `[PROBED: 4/12]`).

### 📍 Ritual Mechanics
- **`notifySampled(int floorNumber)`**: Records that a floor has been entered/scanned.
- **`isPrimed()`**: Returns `true` only if **all** floors have been sampled AND `infusionCount >= 7`.
- **`breach()`**: Transitions the building into a "Breached" state, enabling access to negative floor indices.

### 📍 UI Rendering
- **`getFloorZone(int floorNum)`**: Deterministically maps a floor number to a functional zone (e.g., `MECHANICAL_SUMP`, `RESEARCH_LAB`).
    - Uses `locus.branch(floorNum)` for deterministic randomness.
- **`getFloorIntegrity(int floorNum)`**: Calculates structural integrity.
    - Drops significantly near Floor 0 if the building is `isBreached`.
- **`getExtraContent(Player, width)`**: Generates the **Building Strata Diagnostics** table, including the "Radar" (`[>X<]`) and floor metadata.

---

## 🔄 State Transitions
- **Landmark Discovery**: On `enter()`, if `isLandmark` is true and not previously visited, triggers a unique UI notification.
- **Breach State**: Once `breach()` is called, `isBreached` becomes true, affecting `getFloorIntegrity` and `getOptions`.

---

## 🔗 Dependencies
- **`ProceduralFactory`**: Used to populate the building with floors.
- **`Floor`**: The primary child type.
- **`LazyLocusList`**: Manages the collection of floors.
- **`ModelOutput`**: For TUI formatting and coloring.

---
*Neural Map Stabilized.*
