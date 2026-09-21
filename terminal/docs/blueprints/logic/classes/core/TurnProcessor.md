# BEHAVIORAL SPEC: TurnProcessor (Core)

## 🌌 Responsibility
The `TurnProcessor` is the "heartbeat" of the simulation. It manages the sequential turn cycle, handles player input dispatching via the Command Pattern, and enforces survival mechanics (Coherence).

---

## ⚙️ Public API Behavior

### 📍 Turn Lifecycle (`processTurn`)
1.  **Coherence Drain**: Calculates and applies the coherence drain based on the location's stability (Abyssal/Entropic multipliers).
2.  **Failure Check**: If `coherence <= 0`, triggers a `reboot()` sequence.
3.  **Location Interaction**: Calls `location.enter()` and `location.processAction()` to trigger local events (e.g., landmark discoveries or frequency extractions).

### 📍 Input Dispatching (`handleInput`)
1.  **Normalization**: Retrieves raw user input; `NavigationEngine` handles the empty-line reversal and `InputHandler.normalize` only the two non-command rules (end of input → `quit`, empty line → last choice). Words pass through as typed.
2.  **Global Command Check**: `dispatch` asks `globalCommands.resolve(choice)` — the one `GlobalCommands` table built by `initializeGlobalCommands` (HK-020) owns the keys, the aliases (`m`, `q`, `?`, `ll`) and the case rule per key (`i sync map lattice help glitch quit` any case; `s ll p P quitnow` exact). A hit executes immediately; `Game.processInput` uses the same path.
3.  **Navigation Delegation**: If not a global command, delegates the input to the `NavigationCommand` for context-specific movement (e.g., entering a room or changing floors).

---

## 🔄 Logic Invariants
- **Coherence Drain Formula**: `(isAbyssal ? 2.0 : 1.0) * (isEntropic ? 2.0 : 1.0)`.
- **Command Prioritization**: Global commands always override navigation options (e.g., if a menu uses `i`, the inventory command takes precedence).

---

## 🔗 Dependencies
- **`GameState`**: The central source of truth for the player and world state.
- **`NavigationOrchestrator`**: Used for world re-initialization during a reboot.
- **`GameCommand`**: The base interface for all executable actions.
- **`GlobalCommands`**: `register(key, cmd, anyCase = true)`, `alias(alias, key)`, `resolve(input)`; a new global command is one `register` call.

---
*Neural Map Stabilized.*
*Verified against: TurnProcessor.groovy @ 21caa33204*
