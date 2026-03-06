---
layout: terminal
title: SYSTEM_SPECIFICATIONS
---

# SYSTEM_SPECIFICATIONS: Architectural Whitepaper

This document details the engineering principles and procedural patterns that power the Endless Transit universe.

## [HIERARCHICAL SEED SCRAMBLING]
Endless Transit uses a **Top-Down Deterministic Seeding** model. 
*   **The Master Seed:** Every session starts with a single `long` value (the Master Seed).
*   **The Scrambler:** Instead of simple linear increments (e.g., `seed + index`), each container uses its own seed to initialize a local **Scrambler Random** instance. This instance calls `nextLong()` to generate high-entropy seeds for its children.
*   **Stability:** This ensures that siblings (e.g., two planets in the same system) have seeds millions of units apart, drastically increasing name and atmospheric variety while maintaining 100% mathematical determinism.

## [LOCUS INDEX PATHS (LIP)]
To support saving and loading in an infinite, procedural world without a traditional database, we implemented the **Locus Index Path** engine.
*   **The Address:** Every location is a node in a tree. A location's "address" is its sequence of child indices (e.g., `0.1.4.2`).
*   **Infinite Persistence:** By saving only the Master Seed and the player's current LIP, we can perfectly reconstitute the entire world-path upon reload.
*   **Footprints:** To track "visited" status for thousands of rooms, we store a `Set<String>` of LIP strings. This remains compact (~kilobytes) even for massive expeditions.

## [ADAPTIVE BRIDGE ARCHITECTURE]
The terminal UI utilizes a **Persistent Split-Pane Rendering** system designed for a 130-character width.
*   **Pane Separation:** The terminal is divided at column 90. The left pane (88 chars) handles narrative prose and technical tables, while the right pane (38 chars) provides persistent spatial mapping or telemetry.
*   **Visual-Aware Padding:** Standard padding (like `String.format`) fails when ANSI color codes are present. The UI uses a custom `getVisualWidth` utility to ensure that even glitched or color-heavy text never breaks the vertical separator alignment.
*   **Scale-Aware Content:** The rendering engine automatically shifts the right-pane context based on the player's depth:
    *   **Macro (Depth 0-7):** 2D Neural Map (Spatial Navigation).
    *   **Micro (Depth 8+):** System Telemetry (Internal Diagnostics).

## [DOMAIN DRIVEN DESIGN]
The codebase is strictly divided into four functional domains to minimize cognitive noise:
1.  **Core:** The game loop, input processing, and state management.
2.  **Model:** The location hierarchy and container logic.
3.  **UI:** Terminal utilities, themes, and HUD composition.
4.  **Procgen:** Gematria math, name generation, and lexicons.

---
*Return to [SYSTEM_INITIALIZATION]({{ "/manual/system_initialization.html" | relative_url }}) to reboot the link.*
