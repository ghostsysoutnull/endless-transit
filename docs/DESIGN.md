# Design Documentation

## Domain Model

### Hierarchy (Composite Pattern)
- **SolarSystem**: The highest container level.
- **Planet / Country / City**: Mid-level planetary containers.
- **Street**: Contains Buildings, displayed in a specialized visual grid.
- **Building**: A container for Floors; enforces fixed height and apartment density.
- **Floor**: Represents a level, containing a Corridor.
- **Corridor**: Contains multiple Apartments.
- **Apartment**: A sequence of Rooms.
- **Room**: The atomic unit of space, containing furniture, lighting, and objects.

### Core Systems
- **Generic Navigator**: The game loop interacts with any `Location` through a standard interface (`enter`, `getOptions`), allowing for infinite scale.
- **Structural Consistency**: Rules are applied top-down (e.g., a Building's apartments-per-floor is set once and shared).
- **Intelligent HUD**: Preserves previous context to show descriptive action names and precise "X of N" progress.

## Mechanics

### Generation
The game uses `java.util.Random` for procedural generation.
- **NameGenerator**: A centralized utility providing thematic naming for all levels (Planets, Cities, Streets, etc.).
- **Gematria**: A mystical system ("The Breathless Abjad") that calculates object frequencies based on consonants and hierarchical depth.
- **Structural Constraints**: Enforced boundaries (e.g., `maxFloors`) ensure navigation logic is predictable.

### Navigation & UI
- **Cyber-Terminal HUD**: Displays recursive breadcrumb paths, hierarchal depth, procedurally stable coordinates, and a step counter.
- **Inventory System**: Stores `InventoryItem` objects (Name + Frequency). The HUD provides a "Recent" preview of scanned data.
- **Sub-Menu Actions**: Intentional interaction (e.g., `t` to take objects) uses dedicated sub-menus to keep the main interface clean.
- **Auto-Reversal**: Automatically switches directional pairs at container boundaries.

## Future Considerations
- Implement a saving/loading system.
- Add more interactive objects within rooms.
- Transition to a more robust CLI framework (e.g., Picocli).
