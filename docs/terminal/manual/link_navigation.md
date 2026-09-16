---
layout: terminal
title: LINK_NAVIGATION
map_type: telemetry
---

# LINK_NAVIGATION: Field Operations Guide

This guide details the specific inputs and protocols required to navigate the Neural Web through your terminal interface.

## [CORE CONTROLS]
The neural link recognizes single-character mnemonics for rapid traversal.

| Key | Action | Context |
| :--- | :--- | :--- |
| **[u]** | Go Up | Vertical navigation within a Building or Shaft. |
| **[d]** | Go Down | Vertical navigation within a Building or Shaft. |
| **[f]** | Forward | Move to the next room in an Apartment. |
| **[b]** | Back | Move to the previous room in an Apartment. |
| **[l]** | Leave | Exit the current container (e.g., leave a Building to the Street). |
| **[c]** | Corridor | From a floor's elevator, step into the corridor. |
| **[j]** | Breach | At the Peak of a primed building, with its Keystone: breach the Bedrock. |
| **[t]** | Interact | Capture (`1`…`N`) or drop (`d1`…`dN`) objects within a local cell. |
| **[s]** | Scan | Aperture scan of the corridor, the surrounding strata, or the apartment. |
| **[i]** | Buffer | Open the Quantum Trace Buffer (Inventory). |
| **[m]** | Map | Refresh the 2D spatial Neural Map (Macro Scale). |
| **[ll]** | Tree | View the full vertical world hierarchy trace (`lattice` also works). |
| **[p]** | Snapshot | Capture the bridge to `screenshots/` (`P` keeps the colour codes). |
| **[sync]** | Save | Synchronize your neural trace to the substrate. |
| **[quit]** | Terminate | Confirm, optionally sync, and sever the link. |

An empty directive (Enter alone) repeats your last movement — or reverses it when the way ahead has run out.

## [QUANTUM TRACE BUFFER]
Accessing your buffer `[i]` allows you to manage harvested fragments.
*   **Capacity:** The buffer has no ceiling. The `/16` on the HUD is a legacy calibration mark.
*   **Dropping:** Use `d [ID]` to dissolve a fragment. To leave one in the local cell for later, use `d[ID]` from the room's `[t]` menu instead.
*   **Merging:** Use `m [ID1] [ID2]` to synthesize two fragments into a new hybrid. Every synthesis restores **+15 Coherence**.
*   **Stabilization:** If a synthesis result is divisible by 11, it is **Stabilized** and added to your `RESONANT_TRACES` tally.

## [THE COMMAND BRIDGE (HUD)]
Your terminal header is a high-fidelity data deck providing real-time telemetry:
*   **Lattice Sparkline:** A symbolic path of your depth (e.g., `∞ » ☼ ⊕ ⌂`).
*   **Locus Hash:** Your precise procedural coordinates.
*   **Event Ticker:** Real-time logging of discoveries and synthesis events.
*   **Pulse Traversal:** Total steps taken in the current session.

## [SYNCHRONIZATION PROTOCOL]
*   **Manual Sync:** Use the `sync` command to preserve your progress at any time.
*   **Neural Trace:** At link initialization, the system will offer to restore your previous trace.
*   **Termination:** Always confirm your intent to `quit`. You will be offered a final synchronization before the link is severed.

---
*Proceed to [SYSTEM_SPECIFICATIONS]({{ "/terminal/manual/system_specifications.html" | relative_url }}) for a deep dive into the system architecture.*
