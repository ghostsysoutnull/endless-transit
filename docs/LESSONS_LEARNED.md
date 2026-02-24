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
- **Recursive Paths**: Implementing a recursive `getPath()` method provides essential spatial context in deeply nested hierarchies.
- **Intentional UI**: Using sub-menus for high-density actions (like "Take Object") reduces main-menu clutter and improves intentionality.
- **Atmospheric Shell**: A simple wrapper script (run.sh) with random flavor text can significantly enhance the initial user experience and tone.
- **Data-Rich Inventory**: Transitioning from primitive lists to specialized objects (InventoryItem) allows for descriptive metadata and better HUD integration.
- **Quantum Sidebar Overlays**: Using ANSI escape codes for cursor movement (`\u001b[s`, `\u001b[u`, `\u001b[nA`) allows for non-disruptive UI updates like overlays without re-rendering the whole screen.
- **ANSI Color Encapsulation**: Centralizing terminal codes in a `Terminal` utility class keeps game logic clean and ensures consistent styling across disparate location classes.
- **Zero-Flicker Interaction**: Implementing localized UI updates (like the inventory buffer) improves immersion by maintaining the visual state of the world while accessing menus.
- **TUI Scroll vs. Overlay**: While absolute positioning (`moveTo`) creates a "holographic" sidebar feel, it limits horizontal space for dynamic content. Pivoting to a linear, scrolling inventory provides much more room for long object names while maintaining the "Quantum" aesthetic.
- **Operational Diagnostics**: A rolling custom `Logger` with level-based filtering and stacktrace capture is essential for debugging TUI crashes that would otherwise be lost in terminal buffer scrolling.



