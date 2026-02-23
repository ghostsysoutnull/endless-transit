# Design Documentation

## Domain Model

### Hierarchy
- **Floor**: Represents a level in the building.
- **Corridor**: Belongs to a floor, contains multiple doors/apartments.
- **Apartment**: Behind each door, consists of one or more rooms.
- **Room**: The basic unit of space, containing furniture, lighting, and objects.

### Entity Relationships
- A `Game` has many `Floors` and one `Player`.
- A `Floor` has one `Corridor`.
- A `Corridor` has many `Doors` and many `Apartments`.
- An `Apartment` has many `Rooms`.

## Mechanics

### Generation
The game uses `java.util.Random` for all procedural generation.
- **Doors**: Randomized color, decor, and occasional "scary words".
- **Rooms**: Randomized from static lists and external resource files.

### Inventory System
The `Player` can collect 7-digit numbers found randomly in rooms. Currently, these are stored in a simple integer list.

## Future Considerations
- Implement a saving/loading system.
- Add more interactive objects within rooms.
- Transition to a more robust CLI framework (e.g., Picocli).
