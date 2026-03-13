# BEHAVIORAL SPEC: NavigationOrchestrator (Core)

## 🌌 Responsibility
The `NavigationOrchestrator` is responsible for world initialization, location transitions, and cross-domain navigation rules. It ensures spatial consistency and handles "Auto-Entry" triggers.

---

## ⚙️ Public API Behavior

### 📍 Initialization
- **`initializeWorld()`**: Uses `WorldGenesis` to create the initial `Universe` and starting location. Sets the global `state.universe`.

### 📍 Transitions (`enterLocation`)
1.  **Safety Check**: If the target location is null, the transition is aborted.
2.  **Spatial Pivot Reset**: If entering a `Floor`, its `isCorridorActive` state is **forced to `false`** (resets to the elevator view).
3.  **Apartment Auto-Entry**: If entering an `Apartment`, the orchestrator immediately transitions to the **first room** (`rms[0]`) to streamline exploration.
4.  **Footprint Tracking**: Updates the player's `currentLocation` and marks the location (and its macro-scale ancestors) as **Visited**.
5.  **Path Stability**: Recursively updates the player's visited paths for HUD/Journal tracking.

### 📍 Back-Tracking (`exitLocation`)
- Moves the player to the current location's **parent**. 
- If no parent exists, logs "End of reality reached."

---

## 🔄 Logic Invariants
- **Auto-Entry Priority**: Apartment entry is transparent; the player "enters" the apartment and is immediately placed in the first room.
- **Vertical Reset**: Returning to a floor always places the player at the elevator, regardless of their previous state.

---

## 🔗 Dependencies
- **`GameState`**: Stores the player and current location state.
- **`WorldGenesis`**: Handles the actual instantiation of the initial world hierarchy.
- **`Player`**: Tracks visited locations and paths.

---
*Neural Map Stabilized.*
