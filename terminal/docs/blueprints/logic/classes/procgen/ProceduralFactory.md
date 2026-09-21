# BEHAVIORAL SPEC: ProceduralFactory (ProcGen)

## 🌌 Responsibility
The `ProceduralFactory` is the central "architect" of the simulation: a registry facade over one `<Type>Factory` per location type (Phase 9). Every `create*` below delegates to that type's factory and stamps the result with this registry; it also owns the shared services the factories read through `registry` — `themeService`, `nameGenerator` (HK-022) and `fmt`.

---

## ⚙️ Public API Behavior

### 📍 Creation & Initialization
- **`createPlanet(parent, locus)`**: 
    - Deterministically initializes the **Planetary Vibe** (Timeline, Primary Culture, Secondary Culture, Secondary Timeline — HK-016 step 2).
    - Maps the primary culture to a specific **Atmospheric Color** (e.g., `rust` -> `RED`).
- **`createBuilding(parent, ...)`**: 
    - Deterministically rolls for **Scale** (Small, Medium, Large, Massive).
    - Sets `maxFloors` and `apartmentsPerFloor` based on the scale category.
- **`createRoom(parent, ...)`**: 
    - Inherits `isAnomaly` from the parent `Apartment`.
    - Coordinates with `ThemeService` to generate descriptions and hybrid objects (furniture).

### 📍 Recursive Population Strategies
- **`populate(Container location)`** (Phase 9o / HK-005): 
    - `Container.populateChildren()` calls this on first lazy access; it dispatches on the location's exact class to the `LocationFactory` registered for it (`factoryFor(Class)`). An unregistered `Container` subclass fails loud (`IllegalStateException`).
    - Each `<Type>Factory.populate(T)` uses the location's `LocusSeed` to branch and create its children (e.g., `BuildingFactory.populate` creates `maxFloors` floors).
    - **`CorridorFactory.populate` (Back-Propagation)**: Peeks at the first room's type in each apartment to determine the door's `AnomalousTrace` (e.g., if the room is a `Bio-Server`, the trace might be `LATTICE`).
- **`countSubLocations(Floor)`**: 
    - A unique logic path that deterministically calculates the total number of sub-locations (Corridor, Apartments, Rooms) *without* building the full object tree. 
    - **Note**: This is critical for computing [PROBED: X/Y] progress labels.

---

## 🔄 Logic Invariants
- **Vibe Drift Guard**: 99% of apartments match the planetary vibe; 1% are anomalies with mismatched cultures or timelines.
- **Rebel Districts**: In `CityFactory.populate`, there is a 10% chance to flip the primary and secondary cultures (and both eras), creating an "unauthorized resonance" zone.

---

## 🔗 Dependencies
- **`NameGenerator`**: Used for all entity naming. One instance per facade (`nameGenerator`, final, built here); factories call `registry.nameGenerator`.
- **`ThemeService`**: Used for generating atmospheric descriptions and hybrid objects.
- **`LocusSeed`**: The foundational entropy source for all creation.
- **`AnomalousTrace`**: Used for back-propagating signals from rooms to doors.

---
*Neural Map Stabilized.*
*Verified against: ProceduralFactory.groovy @ 47f3cd68dc*
