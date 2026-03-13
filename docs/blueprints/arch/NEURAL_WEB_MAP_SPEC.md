# Technical Specification: The Neural Web Map (Phase 9)

## 1. Objective
To provide a spatial, 2D ASCII visualization of the player's current container (the "Lattice"), enhancing spatial awareness and enabling tactical navigation towards specific resonances or anomalies.

## 2. The Lattice Projection Engine
The map is not a pre-stored asset. It is a **procedural projection** generated on-demand by scanning the `children` of the current `Container`.

### 2.1 Coordinate Mapping
Since `Location` objects only know their index in their parent, the Engine assigns them spatial coordinates using their `locusHash`:
- **X-Coordinate:** `hashCode() % mapWidth`
- **Y-Coordinate:** `(hashCode() / mapWidth) % mapHeight`
- **Collision Handling:** If two nodes share a coordinate, they are rendered as a "Dense Node Cluster" (`░` or `▒`).

### 2.2 Symbolic Representation
| Symbol | Meaning | Color Logic |
| :--- | :--- | :--- |
| `▲` | Player Position | `CYAN` |
| `■` | Stable Building / Node | `Atmospheric Color` |
| `◈` | Resonant Node (Culture Match) | `GREEN` (Bright) |
| `░` | High Entropy / Null Zone | `GREY` (Dim) |
| `¤` | Spectral Echo Signature | `YELLOW` (Flickering) |
| `☠` | Abyssal Breach | `RED` (Glitching) |
| `○` | Visited Node | `WHITE` (Dim) |

## 3. Map Modes & Scaling

### 3.1 Macro View (Sector/System)
- **Scale:** Shows Streets or Cities as points in a transit network.
- **Visuals:** Connects nodes with `· · ·` lines to indicate "Stable Transit Arteries."

### 3.2 Micro View (Street/Building)
- **Scale:** Shows individual Buildings or Rooms.
- **Visuals:** Uses a 2D grid representation (e.g., a 20x10 block area).

## 4. Mechanical Integration

### 4.1 "Tactical Ping"
Executing the `map` command costs **1.0 Coherence** (Neural Scan drain). This "ping" reveals the traits of nearby nodes (e.g., "Research Lab," "Corrupted Crypt") for 10 steps.

### 4.2 Low Coherence Distortion
If `player.coherence < 30`:
- **Ghosting:** Map shows 2-3 "Phantom Nodes" that don't exist.
- **Drift:** The player's `▲` icon moves randomly on the map even when stationary.
- **Static:** 20% of the map is replaced with random `ASCII` characters.

## 5. Implementation Plan

### Phase A: The 2D Grid Utility
- Implement `Terminal.renderGrid(Map<Point, Symbol> nodes)` to handle ASCII alignment and border drawing.

### Phase B: Location Projection
- Update `Container` with a `getMapProjection()` method that returns a map of relative coordinates for its children.

### Phase C: The `map` Command
- Integrate the rendering into the main `Game` loop and add the coherence-drain logic.
