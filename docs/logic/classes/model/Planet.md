# BEHAVIORAL SPEC: Planet (Model)

## 🌌 Responsibility
The `Planet` class is a major structural container within a `SolarSystem`. It acts as the anchor for planetary-wide **Vibe** (Atmosphere, Timeline, and Culture) and manages the collection of `Country` entities.

---

## ⚙️ Public API Behavior

### 📍 Vibe & Resonance
- **`getStatusSummary()`**: Displays the primary planetary resonance (e.g., `RESONANCE: [MONOLITH]`).
- **`getLatticeMeta()`**: Indicates whether the player is on the `SURFACE` or the `BEDROCK` (Abyssal), and shows the planetary **Era** (e.g., `SINGULARITY`).
- **`getDescription()`**: Synthesizes a high-level overview of the planet's resonance and timeline with color-coded labels.

### 📍 Navigation
- **`getOptions(Game)`**: Lists all countries on the planet for traversal. 
    - Triggers `ensureChildrenPopulated()` to instantiate children from the `masterSeed`.
- **`getExtraContent(Player, width)`**: Generates a two-column "Planetary landmass scan" table, marking visited locations with `[V]`.

---

## 🔄 Logic Invariants
- **Deterministic Vibe**: The planetary vibe (set during creation in `ProceduralFactory`) is the "source of truth" for all child locations (Cities, Streets, Rooms).
- **Symbolism**: Uses the `⊕` symbol on the map, shifting to `☠` if the planet is `isAbyssal()`.

---

## 🔗 Dependencies
- **`SolarSystem`**: Parent container.
- **`Country`**: Primary child type.
- **`ProceduralFactory`**: Used to populate the planet with landmasses.
- **`VibeCapsule`**: Stores the planetary-wide thematic state.

---
*Neural Map Stabilized.*
