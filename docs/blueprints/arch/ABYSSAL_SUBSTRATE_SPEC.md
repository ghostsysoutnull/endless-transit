# Architectural Specification: The Abyssal Substrate

## 1. The Harmonic Inversion Protocol (Ritual)

A building's reality is inverted through a four-stage process that "weights" the local lattice until it breaches the bedrock of the simulation.

### A. Priming (State Tracking)
The `Building` class will track the following metrics:
*   `sampledFloors`: A set of floor indices where the player has captured at least one object.
*   `infusionCount`: An integer tracking successful syntheses performed within the building's cells.
*   `isBreached`: A boolean flag (persistent).

**Completion Criteria**:
1. `sampledFloors.size() == building.maxFloors`
2. `infusionCount >= 7`

### B. The Keystone (Synthesis)
A unique `InventoryItem` generated via synthesis within a primed building.
*   **Ingredients**: Any 3 items captured within the building.
*   **Result**: `[Building Name] Keystone`.
*   **Properties**: `frequency: 0Hz`, `isKeystone: true`.

### C. The Breach (Peak Event)
*   **Location**: Top Floor (`maxFloors - 1`).
*   **Action**: If Building is Primed AND Keystone is in inventory, show directive: `j. Breach the Bedrock`.
*   **Visuals**: Screen-wide static glitch (`Terminal.glitchText`).
*   **Persistence**: Building set to `isBreached = true`.

### D. The Descent (Aperture)
*   **Location**: Floor 0.
*   **Action**: If `isBreached`, show new path: `d. Descend into the Substrate`.
*   **Transition**: Teleports player to `Layer -1`.

## 2. Abyssal Facet (Terminology Mapping)

When `location.getDepth() < 0` or in a `isBreached` building's negative hierarchy, the following terminology is enforced:

| Scale | Surface Lattice | Abyssal Substrate |
| :--- | :--- | :--- |
| Building | Building | [Name] Root / Bedrock |
| Floor | Floor | Layer (displayed in Hex: -0x01) |
| Corridor | Corridor | The Arteries |
| Apartment | Apartment | Crypt |
| Room | Room | Shard |
| Furniture | Furniture | Infrastructure (Oily, Brutalist) |

## 3. Aesthetic Constraints: "Dark Brutalism"

### Color Palette
*   **Primary**: `Terminal.GREY` (Dim)
*   **Accent**: `Terminal.RED` (Emergency Power) or `Terminal.L_BLUE` (Cold Data)
*   **Atmosphere**: Forced override of planetary vibe colors.

### Environmental Texture
*   **Walls**: Unpainted concrete, rusted rebar, vibrating metal plates.
*   **Lighting**: Single flickering green bulbs, red emergency strobes, unshielded sparking conduits.
*   **Liminality**: Hallways that feel abandoned, transitionary, and infinite. No windows.

## 4. Mechanical Rules

### Abyssal Pressure (Integrity)
*   **Coherence** is renamed to **[INTEGRITY]**.
*   **Passive Drain**: 2.0x standard rate.
*   **Movement Penalty**: Extra -5 Integrity per step.
*   **Integrity Recovery**: Only via "Source Trace" synthesis.

### Source Traces
*   Instead of "Items," players find **Source Traces** (e.g., `Reality Hook`, `Null Pointer`, `Static Echo`).
*   **Synthesis**: Source Traces provide a **+100% Frequency Bonus** when combined with Surface items.

### The Voices (Ticker)
*   Probability-based output in the HUD `EVENT_TICKER`.
*   **Quotes**: *"It is cold down here,"* *"We see you,"* *"Return to the surface,"* *"Bedrock approaching."*

---
*Status: Approved Spec v1.0*
