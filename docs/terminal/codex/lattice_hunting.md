---
layout: terminal
title: LATTICE_HUNTING
map_type: filament
---

# FIELD_STRATEGY: Lattice Hunting & Scanning

This node details protocols for identifying high-value targets within the procedural web. To an experienced Observer, the lattice is not just a path—it is a resource field.

## [THE 2D_MAP_READOUT]
From the Universe down to the Street, the bridge's right pane carries a 2D map — a fixed schematic at the Universe and Filament scales, a projection of the nodes beneath you from the Sector down; from the Building inward it yields to telemetry. The `m` directive projects the children of the node you stand in on demand, at any depth short of a cell.

*   **Node Reading:** Each child is drawn with its own glyph — `⌂` for a building, `⊕` for a planet; dim nodes are unvisited, bright nodes are visited. (The legend's `■` is a generic mark, not what is drawn.) The map is a projection of the container you stand in — it shows nothing about fragment counts.
*   **Void Identification:** On the filament menu, a conduit labelled `VOID_REACH` leads to a **Null Reach**. Each holds exactly one **Spectral Echo** (1,000–9,999 Hz). Issue the `e` directive until the signal reaches 100, then `c` to capture. Buildings beneath a Null Reach are twice as likely to be Landmarks.
*   **No Targeting:** The lattice offers no vector-lock. Navigation is by list; use `ll` for your ancestry and `m` for the children of the node you stand in.

## [APERTURE_SCAN_TELEMETRY]
Inside a building, the **Corridor Aperture Scan** provides a direct readout of the rooms ahead.

*   **Designation Decoding:** Room types are chosen by the Country's **Trait**, four per Trait. They shape the name and the description of a cell; the objects inside come from the planet's Culture and Era.
*   **Door Traces:** In the scan — not in the corridor's plain door list, which shows only inscription, material and state — every door carries a sensory trace that reports the type of the first cell behind it, and the trace never lies: *frost* is a Memory Well; *ozone* is a Laboratory, Neural Link Array, Bio-Server, Power Plant or Processing Core; *clicking* is a Security Station, Armory, Maintenance Bay or Supply Node; a *low thrum* is a Barracks, Tactical Hub, Fuel Depot or Credit Hub; *stillness* is any of the rest. A `[DATA_VAULT]` inscription guarantees a Laboratory or Bio-Server; `!! DANGER !!` guarantees a Security Station or Armory.
*   **Resonance Signatures:** In the Apartment scan, watch the **Hz** and **Waveform** columns.
    *   A `###` waveform marks a temporal anomaly — a one-in-a-hundred apartment whose cells are glitched.
    *   A `≈≈≈` waveform marks a **Stabilized Signature**: the cell's own *name* resolves to a frequency divisible by 11. It is a reading of the cell, not of its fragments — it grants no Coherence and feeds no tally.

## [THE "LANDMARK" PING]
Some buildings appear in **BOLD CYAN** on the street list. These are **Legendary Landmarks** (e.g., *The Eye of the Web*, *The Void-Watcher*) — one building in twenty-five on an ordinary street, one in twelve beneath a Null Reach.
*   **Protocol:** A Landmark announces itself on first entry. Its strata and cells are cut from the same procedural cloth as any other building; the name and the discovery are the reward.

## [PRO-TIPS]
1.  **Read the Header:** The street header shows `[TECH_ERA: …]` and `[RESONANCE: …]`. An ENTROPIC Era doubles every pulse; the RESONANCE Culture is the one whose cells amplify your captures by 10%.
2.  **Breadcrumb Tracking:** If you enter a room and see `[Visited]` or `[V]`, you have already harvested its primary signal. Move forward to maximize step-to-fragment efficiency.

---
*Next Node: [\[SYNTHESIS_THEORY\]]({{ "/terminal/codex/synthesis_theory.html" | relative_url }})*
