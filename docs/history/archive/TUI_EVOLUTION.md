# TUI Evolution: The Borg-Neural Interface

This document outlines the visual and structural evolution of the *Endless Transit* terminal interface, moving from a standard text log to an immersive cybernetic diagnostic readout.

## 1. Technical Terminology (The "Collective" Lexicon)
To maintain immersion, standard "game" terms are re-classified into Borg-Neural jargon:

| Game Term | Collective Term | Description |
| :--- | :--- | :--- |
| **Depth** | `[HOP_DENSITY]` | Number of neural nodes from the core. |
| **Steps** | `[PULSE_TRAVERSAL]` | Movement visualized as data pulses. |
| **Coordinates** | `[LOCUS_HASH]` | Geometric reality hashes. |
| **Building** | `[LATTICE_IDENT]` | Physical structure identification. |
| **Floor** | `[Z-AXIS_ALIGN]` | Vertical alignment within a lattice. |
| **Room** | `[CELL_INDEX]` | Individual spatial cell within a node. |
| **Inventory** | `[TRACE_BUFFER]` | Local memory storage for data fragments. |
| **Path** | `[UP-LINK_TRACE]` | Connection history to the root Universe. |

---

## 2. Core Enhancements

### 2.1 Spectral Glitches (Environmental Feedback)
The terminal reacts to the stability of the local "render."
- **Visuals**: Text occasionally "flickers" (replacing chars with `░` or `█`) or shifts into `DIM` mode.
- **Trigger**: Entering `Null-Sectors` or having low `COHERENCE` stability.
- **Resonance**: Prompt symbols (`>>`) change to `⚡` when carrying resonant hybrids.

### 2.2 Navigation Compass (Spatial Awareness)
A 3x3 ASCII widget provided alongside the action menu to help orientation.
```text
   [U]
[L][+][F]   [U]=Up, [D]=Down, [F]=Forward, [B]=Back, [L]=Leave
   [D]
```

### 2.3 Typewriter Uplink (Data Streaming)
Simulates a low-bandwidth neural connection.
- **Behavior**: Room descriptions and spectral alerts stream in character-by-character.
- **Pacing**: High-importance collective directives trigger a brief screen "shudder."

### 2.4 Biometric Coherence (Stability Gauge)
A visual representation of the player's "render integrity."
- **Logic**: Stability drains with movement and depth; recovers through spectral synthesis.
- **Degradation**: As coherence drops, the TUI itself begins to fail (more glitches, red shifts).

---

## 3. Future Concepts (Deferred)

### 3.1 Fixed Dashboard (HUD Anchoring)
The concept of locking the HUD to the top 6 lines of the terminal window using absolute viewport positioning. 
- **Status**: Researching robust height-detection for various terminal emulators to ensure the dashboard doesn't collide with the scrolling game text.
