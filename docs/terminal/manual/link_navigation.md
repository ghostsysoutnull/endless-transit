---
layout: terminal
title: LINK_NAVIGATION
map_type: telemetry
---

# LINK_NAVIGATION: Field Operations Guide

This guide details the specific inputs and protocols required to navigate the Neural Web through your terminal interface.

## [CORE CONTROLS]
The neural link recognizes single-character mnemonics for rapid traversal. Most directives, however, are **numbered**: every child node, building, floor and door carries an index, and you travel by typing it. Leading zeros are optional — `1` selects `01`. In a building's lobby the index is the **floor number**, whatever its position in the list.

| Key | Action | Context |
| :--- | :--- | :--- |
| **[u]** | Go Up | From a floor's elevator: ride one floor up. |
| **[d]** | Go Down | From a floor's elevator: ride one floor down. From Floor 0 of a breached building: descend into the Substrate. |
| **[f]** | Forward | Move to the next room in an Apartment. |
| **[b]** | Back | Move to the previous room in an Apartment. From a floor's corridor: back to the elevator. |
| **[l]** | Leave | Exit the current container (e.g., leave a Building to the Street). |
| **[c]** | Corridor | From a floor's elevator, step into the corridor. |
| **[j]** | Breach | At the Peak of a primed building, with its Keystone: breach the Bedrock. |
| **[t]** | Interact | Capture (`1`…`N`) or drop (`d1`…`dN`) objects within a local cell. |
| **[s]** | Scan | Aperture scan of the corridor, the surrounding strata, or the apartment. |
| **[i]** | Buffer | Open the Quantum Trace Buffer (Inventory). |
| **[m]** | Map | Project the children of the node you stand in (`map` also works). Returns `SCAN_ERROR` inside a cell. |
| **[ll]** | Tree | View the full vertical world hierarchy trace (`lattice` also works). |
| **[p]** | Snapshot | Capture the bridge to `screenshots/` (`P` keeps the colour codes). |
| **[sync]** | Save | Synchronize your neural trace to the substrate. |
| **[quit]** | Terminate | Confirm, optionally sync, and sever the link (`q` also works). |
| **[help]** | Recall | A one-line reminder of the core directives (`?` also works). |

An empty directive (Enter alone) repeats your last movement — or reverses it when the way ahead has run out.

The link is forgiving of case for `i`, `m`, `map`, `sync`, `lattice`, `help`, `quit` and `q`. It is exact for `s`, `ll`, `p` and `P` — a capital `P` is a different directive.

## [QUANTUM TRACE BUFFER]
Accessing your buffer `[i]` allows you to manage harvested fragments.
*   **Capacity:** The buffer has no ceiling. The `/16` on the HUD is a legacy calibration mark.
*   **Dropping:** Use `d [ID]` to dissolve a fragment. To leave one in the local cell, use `d[ID]` from the room's `[t]` menu instead — but the cell retains only the fragment's **name**. Re-captured, it resonates at the frequency its name spells: a relic returns unchanged; a Hybrid, a Hidden Frequency or a **Keystone** returns as a common fragment, its sum, its millions or its binding gone.
*   **Merging:** Use `m [ID1] [ID2]` to synthesize two fragments into a new hybrid. Every synthesis restores **+15 Coherence**.
*   **Stabilization:** If a synthesis result is divisible by 11, it is **Stabilized** and added to your `RESONANT_TRACES` tally. The full law of the tally is set out in [OPERATIONAL_PROTOCOLS]({{ "/terminal/manual/operational_protocols.html" | relative_url }}).

## [THE COMMAND BRIDGE (HUD)]
Your terminal header is a high-fidelity data deck providing real-time telemetry:
*   **Lattice Sparkline:** A symbolic path of your depth (e.g., `∞ » ☼ ⊕ ⌂`).
*   **Locus Hash:** Your precise procedural coordinates.
*   **Event Ticker:** Real-time logging of discoveries and synthesis events.
*   **Pulse Traversal:** Every directive the lattice accepted from a location's own menu — movements and `[t]` interactions alike. It is carried in your neural trace, so it spans restored sessions. Scans, maps and buffer checks cost Coherence but do not advance it.

## [SYNCHRONIZATION PROTOCOL]
*   **Manual Sync:** Use the `sync` command to preserve your progress at any time.
*   **Neural Trace:** At link initialization, the system will offer to restore your previous trace. To open a fresh link on a chosen Master Seed instead, launch with `--seed <n>` (see [LINK_SETUP]({{ "/terminal/manual/installation_guide.html" | relative_url }})).
*   **Termination:** Always confirm your intent to `quit`. You will be offered a final synchronization before the link is severed.

---
*Proceed to [SYSTEM_SPECIFICATIONS]({{ "/terminal/manual/system_specifications.html" | relative_url }}) for a deep dive into the system architecture.*
