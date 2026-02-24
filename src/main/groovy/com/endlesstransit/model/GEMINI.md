# Model Domain - Development Context

## World Hierarchy
The world is a strict composite hierarchy:
Universe > Filament > Sector > System > Planet > Country > City > Street > Building > Floor > Corridor > Apartment > Room.

## Development Patterns
- **Interfaces**: All new location types MUST implement the `Location` interface.
- **Lazy Initialization**: To support infinite scale, all `Container` subclasses must override `populateChildren()`. 
- **Population Trigger**: Never populate children in the constructor. Use `ensureChildrenPopulated()` which is called by `getChildren()` or when options are requested.
- **Parentage**: Always call `addLocation(child)` to ensure the `parent` reference is correctly set for path-finding and breadcrumbs.

## Structural Constraints
- **Building**: Must have a fixed `maxFloors` and `apartmentsPerFloor`.
- **Street**: Uses a grid-like display for buildings.
- **Room**: The atomic unit. Does not contain other `Location` objects.

## Key Classes
- `Location.groovy`: The core interface.
- `Container.groovy`: The base class for all nested structures.
