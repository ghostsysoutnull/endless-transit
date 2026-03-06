---
layout: terminal
title: LIP_ADDRESSING
map_type: telemetry
---

# TECHNICAL_SUBSTRATE: Locus Index Path (LIP) Addressing

The **Locus Index Path (LIP)** is the primary coordinate system of the Neural Web. It provides a unique, immutable mathematical address for every cell in the infinite universe.

## [ANATOMY_OF_AN_ADDRESS]
A LIP is a sequence of integers separated by periods. Each number represents the index of a child node within its parent container.

**Example:** `0.4.1.2.0.3`

| Segment | Index | Resolution |
| :--- | :--- | :--- |
| **0** | Root | The Universe (Always 0). |
| **4** | Filament | The 5th Cosmic Filament from the core. |
| **1** | Sector | The 2nd Galactic Sector within that filament. |
| **2** | System | The 3rd Solar System in the sector. |
| **0** | Planet | The 1st Planet in the system. |
| **3** | Country | The 4th Country on the planet. |

## [STABLE_LOCI]
Because the Neural Web is deterministic (based on the Master Seed), a LIP will always resolve to the exact same location for a given seed. 

*   **Sharing Loci:** High-level Observers record the LIP of "Stable Loci"—locations with low drain rates or high object density—and share them with other operators.
*   **Restoration:** When you restore a neural link, the system uses your last recorded LIP to "walk" the world tree and reconstitute your exact position.

## [ABYSSAL_ADDRESSING]
In the **Abyssal Substrate**, LIPs can include negative indices or extended hexadecimal segments to represent the "glitched" strata. These addresses are extremely unstable and should be recorded with caution.

## [PRO-TIPS]
1.  **Read the LIP:** You can find your current LIP in the **LOCAL_CELL_DIAGNOSTIC** header of any room.
2.  **Breadcrumbs:** By tracking the sequence of your LIP, you can identify "Loops" or "Arteries" in the lattice that lead back to stable hubs.

---
**END OF CODEX DATA-NODES.**
*Return to [\[SYSTEM_ENTRY\]]({{ "/index.html" | relative_url }})*
