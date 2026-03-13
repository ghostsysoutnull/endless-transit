# BEHAVIORAL SPEC: ProceduralFactory (ProcGen)

## 🌌 Responsibility
The `ProceduralFactory` is the central "architect" of the simulation. It manages the recursive instantiation and "population" of all locations in the universe.

---

## ⚙️ Public API Behavior

### 📍 Creation & Initialization
- **`createPlanet(parent, locus)`**: 
    - Deterministically initializes the **Planetary Vibe** (Timeline, Primary Culture, Secondary Culture).
    - Maps the primary culture to a specific **Atmospheric Color** (e.g., `rust` -> `RED`).
- **`createBuilding(parent, ...)`**: 
    - Deterministically rolls for **Scale** (Small, Medium, Large, Massive).
    - Sets `maxFloors` and `apartmentsPerFloor` based on the scale category.
- **`createRoom(parent, ...)`**: 
    - Inherits `isAnomaly` from the parent `Apartment`.
    - Coordinates with `ThemeService` to generate descriptions and hybrid objects (furniture).

### 📍 Recursive Population Strategies
- **`populate[Location](location)`**: 
    - Each method uses the location's `LocusSeed` to branch and create its children (e.g., `populateBuilding` creates `maxFloors` floors).
    - **`populateCorridor` (Back-Propagation)**: Peeks at the first room's type in each apartment to determine the door's `AnomalousTrace` (e.g., if the room is a `Bio-Server`, the trace might be `LATTICE`).
- **`countSubLocations(Floor)`**: 
    - A unique logic path that deterministically calculates the total number of sub-locations (Corridor, Apartments, Rooms) *without* building the full object tree. 
    - **Note**: This is critical for computing [PROBED: X/Y] progress labels.

---

## 🔄 Logic Invariants
- **Vibe Drift Guard**: 99% of apartments match the planetary vibe; 1% are anomalies with mismatched cultures or timelines.
- **Rebel Districts**: In `populateCity`, there is a 10% chance to flip the primary and secondary cultures, creating an "unauthorized resonance" zone.

---

## 🔗 Dependencies
- **`NameGenerator`**: Used for all entity naming.
- **`ThemeService`**: Used for generating atmospheric descriptions and hybrid objects.
- **`LocusSeed`**: The foundational entropy source for all creation.
- **`AnomalousTrace`**: Used for back-propagating signals from rooms to doors.

---
*Neural Map Stabilized.*
