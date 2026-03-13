# Atmospheric HUD Integration Specification

## Objective
The **Atmospheric HUD** integration will physically reflect the "vibe" of the current planet or region through dynamic color shifts in the player's interface.

## Proposed Features

1.  **Dynamic Border Tinting**:
    *   **Logic**: The ASCII box-drawing characters in the Command Bridge (top status bar, navigation frame, input area) will be tinted using `vibe.atmosphericColor`.
    *   **Implementation**: Pass the atmospheric color into `Terminal.drawBoxTop()`, `Terminal.drawBoxBottom()`, and `Terminal.drawBoxSeparator()` calls in `Game.renderBridgeHUD()`.

2.  **Lattice Icon Synchronization**:
    *   **Logic**: The symbolic neural lattice (e.g., `∞ »»»»» ⊕`) will use the atmospheric color for the "active" location icon.
    *   **Implementation**: Update `Terminal.renderRadar` or the manual path rendering in `Game.groovy` to use the vibe's color for the current locus.

3.  **Coherence-Vibe Blending**:
    *   **Logic**: Low player coherence (e.g., < 20) will cause the atmospheric color to flicker or "glitch," visually representing the neural link's instability.
    *   **Implementation**: Use `Terminal.glitchText` on the border components when `player.coherence` is below a certain threshold.

## Current Technical Readiness
*   `VibeCapsule` correctly stores the `atmosphericColor` as a `Terminal` constant.
*   `Game.groovy` already has a `vibe` variable in its main loop.
*   `Terminal.groovy` drawing methods are already color-parameterized.

---
*Status: Implemented.*
