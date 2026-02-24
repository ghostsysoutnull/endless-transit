# HUD Enhancement Proposals

This document outlines potential directions for the Endless Transit TUI, focusing on immersion, clarity, and the "Endless" aesthetic.

## 1. The "Command Bridge" Style (Boxed & Grouped)
Focuses on framing information using ASCII box-drawing characters to create a sense of a physical terminal.

**Example:**
```text
╔══════════════════════════════════════════════════════════════════════╗
║ Universe > Altair > Auraon > Metropolis > Ave 1 > Tower > Floor 4    ║
╠══════════════════════════════════════════════════════════════════════╣
║ [ TYPE: Corridor ]                                   [ PROGRESS: 4/8 ]║
╟──────────────────────────────────────────────────────────────────────╢
║ DESCRIPTION: A dimly lit corridor smelling of ozone.                 ║
║ CONTENTS: 14 Doors detected.                                         ║
╚══════════════════════════════════════════════════════════════════════╝
```

## 2. The "Minimalist Status Bar" (Functional & Fast)
Reduces vertical noise. Uses a single line for coordinates/path and a subtle divider.

**Example:**
```text
U:Sol / P:Earth / C:Japan / S:Main / B:Alpha / F:0 / R:1  [INV: 4 items]
------------------------------------------------------------------------
You are in a Room. 
Color: Red | Lighting: Soft | Furniture: Sofa, Table
------------------------------------------------------------------------
```

## 3. The "Cyber-Terminal" (Data Heavy)
Adds procedural "metadata" to the HUD to increase Sci-Fi immersion (e.g., coordinates, scanning status).

**Example:**
```text
[SCANNING...] Area: Sector 7G
[COORDS: 42.001 / -12.99]
[DEPTH: 7 Levels Below Root]

>>> Building: Obsidian Spire (1 of 4)
----------------------------------------------------------------------
[!] 12 Residents detected. 
[!] 3 Elevators offline.
----------------------------------------------------------------------
```

## 4. The "Navigation Compass" (Visual Cues)
Adds a small 2D representation of where the player can move, helping orient them in the hierarchy.

**Example:**
```text
PATH: ... > Building > Floor 2 > Corridor
----------------------------------------------------------------------
NAVIGATION:
   [U] Up (Floor 3)        
    |
 [L]--[C]--[Enter Door]    [C] = Current Position
    |                      [L] = Leave to Floor 2
   [D] Down (Floor 1)
----------------------------------------------------------------------
```

## 5. Feature Improvements

### 5.1 Inventory Preview
Instead of having to type `i`, show the last 3 items found or a total count directly in the HUD header.
- `[INV: 8070... | 2218... | +5 more]`

### 5.2 Dynamic Theming
Change the HUD separators based on the current location's scale:
- **Solar System:** Uses `* * *` (Stars)
- **City:** Uses `_|_|_` (Buildings)
- **Room:** Uses `- - -` (Standard)

### 5.3 Step Counter / Distance
Add a "Distance from Origin" or "Steps Taken" counter to emphasize the "Endless" nature.
- `[DIST: 4,209 Units from Origin]`
