# BEHAVIORAL SPEC: GameState (Core)

## 🌌 Responsibility
The `GameState` is the **Central Source of Truth** for the entire simulation. Since OOA Phase 6 it is a lean data container: world state, player, master seed, two render flags, and the inventory controller. The engines that power the game loop live in their owning services and are reached through the `Game` facade.

---

## ⚙️ Public API Behavior

### 📍 Data Management
- **`masterLocus`**: The root `LocusSeed` from which the entire universe is generated.
- **`player`**: The `Player` instance containing metrics (Coherence), inventory, and visited locations.
- **`currentLocation`**: The `Location` where the player is currently positioned.

### 📍 Sub-System Instances
- **`inventoryController`**: Manages complex inventory interactions (Merging/Synthesis).

> `BridgeView` is no longer held here. Since OOA Phase 6a it is owned by `RenderingCoordinator` and exposed via `Game.getBridgeView()`.
> `NavigationEngine` is owned by `NavigationOrchestrator` since OOA Phase 6c and exposed via `Game.getNavEngine()`.
> `InputHandler` and `ActionMapper` are no longer held here either. Since OOA Phase 6b the handler is built in `Game` and injected into `PersistenceService`, `RenderingCoordinator`, and `TurnProcessor`; the mapper is owned by `TurnProcessor`. Both are exposed via `Game.getInputHandler()` / `Game.getMapper()`. The `GameState` constructor takes only a `LocusSeed`.

---

## 🔄 Logic Invariants
- **Identity Integrity**: All components within `GameState` share the same `masterLocus`, ensuring consistent procedural generation.
- **Re-entrancy Guard**: `instantRender` can be toggled to bypass the typewriter effect and animations for instantaneous state updates (e.g., when switching between elevator and corridor views).

---

## 🔗 Dependencies
- **`Universe`**: The root of the structural hierarchy.
- **`Player`**: The primary subject of survival mechanics.
- **`LocusSeed`**: The foundational entropy for all state.

---
*Neural Map Stabilized.*
*Baselined (not audited) against: GameState.groovy @ d122d45d36*
