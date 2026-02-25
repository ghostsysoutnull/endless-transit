# Vision Document: Endless Transit - Procedural Universe Expansion

## 1. Introduction
Endless Transit is evolving from a procedural apartment explorer into a multi-scale universe simulation. The goal is to allow players to traverse a seamless hierarchy of procedural spaces, ranging from the intimacy of a single room to the vastness of solar systems, while maintaining the "endless" and text-based nature of the core experience.

## 2. Core Philosophy
- **Procedural Infinity:** Every layer of the hierarchy (Room -> Solar System) is procedurally generated on demand.
- **Loose Coupling:** The architecture must decouple the specific details of a container (e.g., a City) from its contents (e.g., Buildings).
- **Text-First Immersion:** The complexity of the universe is conveyed through rich textual description rather than graphical representation.
- **Navigation Consistency:** The player's interaction model (Enter, Exit, Traverse, Inspect) remains consistent across all scales.

## 3. Architectural Overview

### 3.1 The Hierarchy
The world is organized into a strict composite hierarchy:
- **Solar System** (Contains Planets)
- **Planet** (Contains Countries)
- **Country** (Contains Cities)
- **City** (Contains Streets)
- **Street** (Contains Buildings)
- **Building** (Contains Floors)
- **Floor** (Contains Corridors)
- **Corridor** (Contains Rooms/Apartments)
- **Room** (Atomic Unit)

### 3.2 Design Patterns
- **Composite Pattern:** To treat individual objects (Rooms) and compositions of objects (Buildings, Cities) uniformly. A common interface (e.g., `TransitNode` or `Location`) will define navigation and description methods.
- **Factory/Builder Pattern:** To encapsulate the complex procedural generation logic for each layer. A `CityFactory` generates a city with unique traits, while a `PlanetBuilder` assembles countries.
- **Strategy Pattern:** To vary the generation algorithms (e.g., `CyberpunkCityGenerationStrategy` vs. `MedievalCityGenerationStrategy`) without modifying the container classes.
- **Flyweight Pattern (Potential):** To manage memory if the universe becomes too large, though procedural generation typically handles this by only instantiating the active local context.

### 3.3 Key Abstractions
- **Location (Interface/Abstract Class):**
    - `enter()`
    - `exit()`
    - `describe()`
    - `listConnections()`
- **Container (Extends Location):**
    - Manages a collection of child `Location`s.
    - Handles "diving in" (generating children) and "popping out" (returning to parent).
- **Navigator:**
    - A service or component responsible for moving the player between these nodes, decoupling the input loop from the structural hierarchy.

## 4. Technical Roadmap

### Phase 1: Refactor Core
- Extract the existing `Room`, `Apartment`, `Corridor`, `Floor` logic into the new `Location` hierarchy.
- Standardize the `enter/exit` mechanism.

### Phase 2: The City Layer
- Implement `Building`, `Street`, `City`.
- Create generators for these layers.
- Allow traversal between buildings on a street.

### Phase 3: The Planetary Layer
- Implement `Country`, `Planet`, `Solar System`.
- Introduce high-level travel mechanics (e.g., "Take train to next city", "Board shuttle to next planet").

### Phase 4: Content & Variety
- Expand the procedural text engines to support the diverse themes (Sci-Fi, Historical, Abstract) implied by the new scale.

## 5. Success Criteria
- A player can start in a Room, walk out to the Corridor, down to the Street, travel to another City, and enter a new Building, with all transitions feeling seamless and logically consistent.
- The code structure allows adding a new layer (e.g., "District" between City and Street) with minimal refactoring.

## 6. Future Horizons

### Phase 8: Harmonic Resonance Hubs
- **Objective:** Create rare, stable locations where players can safely synthesize high-level Keystones.
- **Mechanics:** These hubs will feature "Stability Wells" that protect the player from coherence drain and provide advanced synthesis tools (e.g., merging more than 3 fragments).
- **Aesthetic:** Clean, high-fidelity geometry with vibrant, non-glitching colors.

### Phase 9: The Neural Web Map (Interactive Lattice)
- **Objective:** Expand the `map` / `lattice` command into a detailed, interactive ASCII representation of the current sector.
- **Features:** A 2D "Lattice Map" that shows nearby buildings, streets, and planetary anomalies in real-time, allowing for non-linear exploration and tactical navigation.

### Phase 10: Spectral Echoes & Entity Integration
- **Objective:** Introduce "Spectral Echoes" as actual entities that the player can interact with, track, or even "reclaim."
- **Mechanics:** Entities will have their own "Trace Signatures" and movements through the hierarchy. Interaction might involve frequency-matching or dialogue-based "Neural Syncing."

