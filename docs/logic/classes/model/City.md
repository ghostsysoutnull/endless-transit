# BEHAVIORAL SPEC: City (Model)

## 🌌 Responsibility
The `City` class represents an urban regional node within a `Country`. It manages the collection of `Street` entities and can manifest as a "Rebel District" with volatile resonance.

---

## ⚙️ Public API Behavior

### 📍 Rebel District Mode
- **`isRebelDistrict`**: A state flag that significantly alters the city's behavior and UI representation.
    - **UI Impact**: Shows `[UNAUTHORIZED_ZONE]` in the lattice meta and `STABILITY: [VOLATILE]` in the status summary.
    - **Description**: Displays custom narrative text (e.g., "The air is thick with illegal data-streams and shifting static").
    - **Resonance Logic**: (Handled by `ProceduralFactory`) Flips the primary and secondary cultures of the planetary vibe for this city.

### 📍 Navigation
- **`getOptions(Game)`**: Lists all streets in the city for traversal. 
- **`getExtraContent(Player, width)`**: Generates a two-column "Streets detected in this city" table.

---

## 🔄 Logic Invariants
- **Rebel Roll**: There is a 10% chance for any city to become a "Rebel District" during population.
- **Symbolism**: Uses the `🏙` symbol on the map, shifting to `☠` if the city is `isAbyssal()`.

---

## 🔗 Dependencies
- **`Country`**: Parent container.
- **`Street`**: Primary child type.
- **`ProceduralFactory`**: Used to populate the city with streets.

---
*Neural Map Stabilized.*
