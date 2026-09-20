---
layout: terminal
title: LIP_ADDRESSING
map_type: telemetry
---

# TECHNICAL_SUBSTRATE: Locus Index Path (LIP) Addressing

The **Locus Index Path (LIP)** is the primary coordinate system of the Neural Web. It provides a unique, immutable mathematical address for every cell in the infinite universe.

## [ANATOMY_OF_AN_ADDRESS]
A LIP is a sequence of whole decimal numbers separated by periods. Each number is the index of a child node within its parent, counted from zero. The web has thirteen scales, so the address of a cell has thirteen segments.

**Example:** `0.4.1.2.0.3.1.0.5.2.0.3.1`

| Segment | Scale | Resolution |
| :--- | :--- | :--- |
| **0** | Universe | The root. Always 0. |
| **4** | Filament | The 5th Cosmic Filament. |
| **1** | Sector | The 2nd Galactic Sector (or Null Reach) on that filament. |
| **2** | System | The 3rd Solar System in the sector. |
| **0** | Planet | The 1st Planet in the system. |
| **3** | Country | The 4th Country on the planet. |
| **1** | City | The 2nd City of the country. |
| **0** | Street | The 1st Street of the city. |
| **5** | Building | The 6th Building on the street. |
| **2** | Floor | Floor 2. Above the Bedrock the segment *is* the floor number — the lobby is 0 — however the lobby lists them. |
| **0** | Corridor | A floor has one corridor. Always 0. |
| **3** | Apartment | The 4th apartment on the floor. |
| **1** | Room | The 2nd cell of the apartment. |

A shorter address is simply a shallower node: `0.4.1.2.0` is the planet.

## [STABLE_LOCI]
Because the Neural Web is deterministic, a LIP always resolves to the exact same location **for a given Master Seed**. The address is half of a coordinate; the seed is the other half.

*   **Sharing Loci:** Observers who find a locus worth keeping — a one-cell apartment dense with fragments, a three-floor building fit for the Ritual — record the **seed and the LIP together**. There is no directive that leaps to an address: another operator opens a link on the same seed (`--seed <n>` at launch) and *walks* the path, index by index. No locus drains more gently than another; every pulse costs at least 1.
*   **Restoration:** When you restore a neural link, the system uses your last recorded LIP to walk the world tree and reconstitute your position.

## [ABYSSAL_ADDRESSING]
The Substrate has no addresses of its own. Its segments are plain decimal indices like any other — a negative segment resolves to nothing, and a hexadecimal one cannot be read at all; the `-0x…` on a Layer's name is a label, not a coordinate. A Layer is grown on demand beneath a breached building and is indexed *after* the Peak: in a three-floor building, Layer -1 answers to segment 3.

Such an address outlives the session that grew the Layer. On a regrown web — after a reboot, or on restoring a trace — the Layer does not yet exist, but the breach is remembered, and a breached building regrows its Layers the moment one of their addresses is walked: always in the same order, Layer -1 first, whichever is asked for. A trace written in the Substrate can be walked back. The address holds only where the breach does: **on a web where the building was never breached, a LIP from below the Bedrock resolves to nothing** — another operator on the same seed must perform the Ritual before your address means anything to them.

## [PRO-TIPS]
1.  **Read the LIP:** Your current LIP is printed in the **LOCAL_CELL_DIAGNOSTIC** header of any room, on the `> Trace:` line of the telemetry pane from the Building inward, and as `FINAL_LOCUS` when you terminate a long expedition above the Bedrock.
2.  **Breadcrumbs:** The web is a strict tree: every node has exactly one parent, and there are no loops or shortcuts. Your LIP read right to left *is* the way back — every `l` climbs toward the root, one scale or two at a time.

---
**END OF CODEX DATA-NODES.**
*Return to [\[SYSTEM_ENTRY\]]({{ "/index.html" | relative_url }})*
