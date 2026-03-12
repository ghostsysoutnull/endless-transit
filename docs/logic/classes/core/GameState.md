# BEHAVIORAL SPEC: GameState (Core)

## 🌌 Responsibility
The `GameState` is the **Central Source of Truth** for the entire simulation. It is a data-rich container that holds the current world state, player metrics, and the various engines that power the game loop.

---

## ⚙️ Public API Behavior

### 📍 Data Management
- **`masterLocus`**: The root `LocusSeed` from which the entire universe is generated.
- **`player`**: The `Player` instance containing metrics (Coherence), inventory, and visited locations.
- **`currentLocation`**: The `Location` where the player is currently positioned.

### 📍 Sub-System Instances
- **`inputHandler`**: Manages interaction with the `InputSource`.
- **`mapper`**: The `ActionMapper` responsible for translating numeric inputs to menu labels.
- **`navEngine`**: The `NavigationEngine` that handles input normalization and boundary checks.
- **`bridgeView`**: The primary UI renderer for the "Bridge" HUD.
- **`inventoryController`**: Manages complex inventory interactions (Merging/Synthesis).

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
