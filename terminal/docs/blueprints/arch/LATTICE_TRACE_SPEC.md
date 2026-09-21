# Lattice Trace (Map) Specification

## Objective
Provide a global command (`lattice` or `map`) that renders a vertical, high-density visualization of the player's current position within the nested world hierarchy.

## 1. Commands
*   `map`: Primary alias.
*   `lattice`: Thematic alias.

## 2. Visual Architecture
The trace will be rendered as a top-down tree with depth indices, scale icons, and contextual metadata.

### Indentation Logic
*   Depth 0-4 (Universe to Planet): Zero or minimal indentation to establish the "Macro context."
*   Depth 5+ (Country to Room): Incremental indentation (2-3 spaces per level) using box-drawing branch characters (`└─`).

### Metadata Requirements
From the **Planet** level downwards, specific properties should be extracted:
*   **Planet**: `[Era: TIMELINE | Resonance: CULTURE]`
*   **Country**: `[Trait: FUNCTIONAL_TRAIT]`
*   **City**: `[Rebel District: YES/NO]`
*   **Building**: `[Floors: MAX_FLOORS]`

## 3. Implementation Plan

### `Game.groovy`
*   **`renderLatticeTrace()`**:
    1.  Climb the `parent` chain from `currentLocation` to `Universe`.
    2.  Reverse the collection.
    3.  Iterate and print each level.
    4.  Use `Terminal.colorize` with the atmospheric accent for the current location.
*   **`processInput()`**: Add catch-all for `map` and `lattice`.

## 4. Example Output
```text
  [DEPTH: 00]  ∞ UNIVERSE : The Endless Web
  [DEPTH: 01]  » FILAMENT : Alpha-96-Pulse
  [DEPTH: 02]  ○ SECTOR   : Outer Reach 65
  [DEPTH: 03]  ☼ SYSTEM   : Proxima Eridani
  [DEPTH: 04]  ⊕ PLANET   : Zionos [ERA: FUTURE | RESONANCE: NEON]
               │
               └─ [CTR] COUNTRY : Great Verdant Federation [Trait: Research]
                   └─ [CTY] CITY : Silvercity
                       └─ [STR] STREET : Busy Lane
                           └─ [YOU] BUILDING : Neon Heights
```

---
*Status: Approved for Implementation.*
