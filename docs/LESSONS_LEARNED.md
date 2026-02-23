# Lessons Learned: Endless Transit Refactoring

- **Composite Pattern**: Essential for treating multi-scale spaces (Rooms to Solar Systems) through a single navigation loop.
- **State Persistence**: HUD descriptive names require preserving action maps across loop iterations to resolve previous input keys.
- **Procedural Consistency**: Top-down variable passing (e.g., Building to Floor) is necessary to ensure internal structural logic.
- **TUI Synchronization**: Visual grids and input menus must share the same indexing logic to avoid user confusion.
- **Input Robustness**: Prefix matching (e.g., "1L" vs "1L. Label") significantly improves CLI ergonomics and navigation speed.
- **Generic Auto-Reversal**: Using directional pairs (Up/Down, Forward/Back) decouples boundary logic from specific location types.
- **Container Abstraction**: Moving "Leave" logic to a base class ensures consistent navigation without code duplication.
- **Visual vs functional**: Decoupling the visual presentation (Street table) from the functional menu allows for rich TUI layouts.
- **Utility Centralization**: Moving procedural logic (e.g., NameGenerator) to static utility classes simplifies container constructors and improves variety.

