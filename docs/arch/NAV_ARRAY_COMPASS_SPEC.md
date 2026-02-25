# Navigational Vector Array Specification

## Objective
Replace the static 2D cross compass with a structured "Vector Array" that provides high-density navigational data and tactile visual feedback, aligned with the Command Bridge aesthetic.

## 1. Visual Architecture
The array will use double-line box-drawing characters (`╬`, `║`, `═`) tinted with the local `vibe.atmosphericColor`.

**Mockup (Building Context):**
```text
               [U] Floor 16
                ║
 [L] Leave ═══ [╬] ═══ [·]
 Building       ║
               [D] Floor 14
```

## 2. Dynamic Features

### A. Contextual Path Overlays
Instead of just showing directions, the compass will peek into the `options` map to extract short destination names.
*   **UP/DOWN**: Display Floor numbers (e.g., "Floor 12").
*   **FORWARD/BACK**: Display relative Room indices (e.g., "Room 4").
*   **LEAVE**: Display the container name (e.g., "Exit Apartment").

### B. Signal Attenuation (Coherence Integration)
*   **Nominal (> 40%)**: Labels are clear and stable.
*   **Degraded (20% - 40%)**: Labels flicker using `Terminal.glitchText`.
*   **Critical (< 20%)**: The entire array jitters; directional labels may scramble or disappear, leaving only the raw vector icons.

## 3. Implementation Plan

### UI Components (`Terminal.groovy`)
*   Ensure full support for Vector connectors: `╠`, `╣`, `╦`, `╩`.

### Logic (`Game.groovy`)
*   **`getCompassLabel(String direction, Map options)`**: Helper to extract a 10-15 character summary of the destination from the menu labels.
*   **`renderCompass(Map options)`**: 
    1.  Resolve `accent` color.
    2.  Determine active vectors based on `options` keys (u, d, f, b, l).
    3.  Anchor all rendering to a fixed `centerCol` (currently 25) to ensure perfect vertical and horizontal alignment regardless of label length.
    4.  Calculate left-padding using `Terminal.getVisualWidth` to account for hidden ANSI codes.

## 4. Interaction Vibe
Active vectors should be **Bold** and high-contrast, while inactive vectors are **Dimmed** and represented by a single pulse-dot (`·`).

---
*Status: Draft Proposal.*
