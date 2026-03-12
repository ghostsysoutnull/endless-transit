# BEHAVIORAL SPEC: Street (Model)

## 🌌 Responsibility
The `Street` class represents a horizontal urban lane within a `City`. It is the primary container for `Building` entities and the last "macro-scale" location before entering vertical structures.

---

## ⚙️ Public API Behavior

### 📍 Building Exploration
- **`getExtraContent(Player, width)`**: Generates a two-column "Buildings on this street" table.
    - **Landmark Highlighting**: Buildings flagged as `isLandmark` are rendered in **Bold Cyan** for visibility.
    - **Name Truncation**: Building names are truncated with an ellipsis (...) if they exceed 25 characters to preserve table alignment.
- **`getOptions(Game)`**: Lists all buildings for entry.
    - **Menu Feedback**: Logs menu key generation via `Logger` for debugging.
    - **Visited Markers**: Shows `[Visited]` in the menu label for tracked buildings.

### 📍 State & Sync
- **`getStatusSummary()`**: Displays `SYNC: [PRESSURE_HIGH]` if the street is `isAbyssal()`.
- **`getDescription()`**: Synthesizes a one-line overview including the name, tech era, and atmospheric resonance.

---

## 🔄 Logic Invariants
- **Lazy Loading**: Utilizes `LazyLocusList` to automatically populate buildings only when accessed.
- **Symbolism**: Uses the `═` symbol on the map, shifting to `☠` if the street is `isAbyssal()`.

---

## 🔗 Dependencies
- **`City`**: Parent container.
- **`Building`**: Primary child type.
- **`LazyLocusList`**: Manages the collection of buildings.
- **`ProceduralFactory`**: Used to populate the street with building pairs.

---
*Neural Map Stabilized.*
