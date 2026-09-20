---
layout: terminal
title: SYSTEM_SPECIFICATIONS
map_type: hardware
---

# SYSTEM_SPECIFICATIONS: Architectural Whitepaper

This document details the engineering principles and procedural patterns that power the Endless Transit universe.

## [HIERARCHICAL SEED BRANCHING]
Endless Transit uses a **Top-Down Deterministic Seeding** model.
*   **The Master Seed:** Every session starts with a single `long` value (the Master Seed), taken from the clock or from `--seed`.
*   **The Locus:** Every node owns a **Locus** — an immutable seed value. A parent never hands its children `seed + index`; it **branches**: `locus.branch(index)` passes the parent's value and the child's index through a bit-mixer and yields a new Locus. No random generator is shared, stored or advanced between siblings.
*   **Stability:** Siblings (two planets in one system) receive seeds that share nothing visible, which keeps names and atmospheres varied, while the same Master Seed always unfolds into the same web. Rolls *inside* a node draw from that node's own Locus, so a change in one branch can never disturb another.

## [LOCUS INDEX PATHS (LIP)]
To support saving and loading in an infinite, procedural world without a database, the engine addresses every location by its **Locus Index Path**.
*   **The Address:** Every location is a node in a tree. Its address is its sequence of child indices from the root (e.g., `0.1.4.2`).
*   **Lazy Reality:** Nothing exists until it is observed. A node's children are generated the first time they are asked for, so an unvisited branch costs nothing.
*   **The Neural Trace:** A save does not store the world. It stores the Master Seed, your LIP, your Coherence and pulse count, your footprints, your buffer (a Keystone remembers the LIP of its building), and the **mutations** you caused, keyed by LIP: which objects are gone from which cells, which buildings are primed or breached. On restore the web is regrown from the seed and the mutations are laid back over it.
*   **Visited LIPs:** Visited status is a `Set<String>` of LIP strings — compact even for massive expeditions — and it drives the hierarchical progress readouts (a floor's `[PROBE: 4/12]`, the lobby's `[CLEARED]`).

## [ADAPTIVE BRIDGE ARCHITECTURE]
The terminal UI is a **Persistent Split-Pane** frame, 130 characters wide.
*   **Pane Separation:** The frame is divided at column 90. The left pane (86 chars) handles narrative prose and technical tables; the right pane (38 chars) provides persistent spatial mapping or telemetry.
*   **Composition:** The bridge is a compositor. Eight independent components — header, narrative, telemetry, compass, directive menu, buffer overlay, lattice trace, lattice map — each return their lines for the width they are allotted; the compositor only arranges them. A component reads the frame's inputs and nothing else.
*   **Visual-Aware Padding:** Standard padding (like `String.format`) fails when ANSI colour codes or wide icons are present. Every border is aligned through a visual-width measure, so glitched or colour-heavy text never breaks the vertical separator.
*   **Deterministic Noise:** Even the static is seeded — by location and pulse count. The same frame renders byte for byte the same, which is how the interface is verified: 36 reference frames are compared on every test run.
*   **Scale-Aware Content:** The right pane shifts with the Observer's depth:
    *   **Macro (Depth 0-7, down to the Street):** 2D Neural Map (Spatial Navigation).
    *   **Micro (Depth 8+, from the Building inward):** System Telemetry (Internal Diagnostics).

## [DOMAIN DRIVEN DESIGN]
The codebase is divided into four domains:
1.  **Core:** The turn loop, input, the command table, persistence, and the event channel.
2.  **Model:** The location hierarchy — a recursive composite from Universe to Room — with its behaviour. A Floor is a state machine (elevator / corridor); clients ask the Floor, never the state. The model knows nothing of the UI.
3.  **UI:** Terminal utilities and the bridge components. It observes the model and is never called by it.
4.  **Procgen:** The Locus, Gematria, name generation, the lexicons and themes, and **one factory per location type** behind a single registry — a new kind of place is a new registry entry, not a new branch in old code.

**Domain Events:** The Observer's actions are published, not reported. A capture, a synthesis or a discovery is an event on a single channel; the journal and the Inversion Ritual are listeners, and the HUD ticker simply shows the journal's latest lines. The model never writes to the journal.

---
*Return to [SYSTEM_INITIALIZATION]({{ "/terminal/manual/system_initialization.html" | relative_url }}) to reboot the link.*
