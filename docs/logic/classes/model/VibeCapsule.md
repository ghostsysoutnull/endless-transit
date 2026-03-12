# BEHAVIORAL SPEC: VibeCapsule (Model)

## 🌌 Responsibility
The `VibeCapsule` is the **Thematic DNA** of a location. It defines the cultural, historical (timeline), and atmospheric resonance of a world, ensuring that sub-locations (cities, streets, rooms) maintain a cohesive "Vibe".

---

## ⚙️ Public API Behavior

### 📍 Regional Divergence (`mutate`)
- **Stability Shift**: Creates a new capsule with a shifted `stabilityFactor` (clamped between `0.1` and `0.9`). 
    - Higher stability favors the **Primary Culture**.
    - Lower stability increases the chance of seeing the **Secondary Culture**.
- **Mutation Inscription**: Records the `latticeMutation` (e.g., `Industrial`, `Ruined`) for downstream description synthesis in `ThemeService`.

### 📍 Culture Selection (`pickCulture`)
- **Logic**: Performs a probability roll against the `stabilityFactor`. 
    - `roll < stability`: Returns `primaryCulture`.
    - `roll >= stability`: Returns `secondaryCulture`.

---

## 🔄 Logic Invariants
- **Vibe Propagation**: Sub-locations recursively pull their vibe from their parents, ensuring that a "Neon" planet primarily contains "Neon" rooms, even if some have small cultural variations.
- **Deterministic Color**: The `atmosphericColor` (derived from the primary culture) is the source for all ANSI-coded HUD labels and map symbols for that location.

---

## 🔗 Dependencies
- **`LocusSeed`**: Provides the entropy for culture selection.
- **`ProceduralFactory`**: Initializes the planet-wide vibe.

---
*Neural Map Stabilized.*
