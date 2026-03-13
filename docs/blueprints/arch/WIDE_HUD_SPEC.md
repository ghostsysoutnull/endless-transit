# Wide-Screen Command Bridge Specification

## Objective
Expand the HUD to 100 characters wide and introduce a split-pane layout to better utilize the increased horizontal space.

## 1. Dimensional Shift
*   **Target Width**: 100 characters.
*   **Aesthetic Goal**: "Widescreen Tactical Display."

## 2. Structural Changes

### Top Section (Global Sync)
*   **Sparkline**: Expanded to 50 visual width characters.
*   **Global Stats**: Moved to the far right of the top row.

### Middle Section (Multi-Pane)
We will split the diagnostic area into two columns:
*   **Left Column (60 chars)**: 
    *   `LATTICE_IDENT`
    *   `LOCUS_HASH` / `DEPTH`
    *   `ALIGNMENT` / `RADAR` (Limit expanded to 20 units)
*   **Right Column (36 chars)**:
    *   `SYSTEM_DIAGNOSTIC`
    *   `COHERENCE_BAR`
    *   `EVENT_TICKER` (Last 2 actions)

### Navigation Row (Path)
*   `LOCUS_TRACE` will occupy the full width, significantly reducing the need for truncation.

## 3. Technical Requirements

### `Terminal.groovy`
*   Add `drawSplitBoxedLine(String left, String right, int splitPoint, int width, String color)`: 
    *   Renders a line with a vertical separator at `splitPoint`.
    *   Uses CHA (`\u001b[nG`) for both the separator and the right border.

### `Game.groovy`
*   Update `renderBridgeHUD()` to use the 100-width constant.
*   Implement the split-pane logic for the middle section.

## 4. Interaction Feedback
*   When a new fragment is captured, the `EVENT_TICKER` on the right should highlight it immediately.

---
*Status: Implemented.*
