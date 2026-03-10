# ACTIVE TASK: Vertical Traversal & Spatial Pivot Refactor

## Objective
Refactor the `Building` -> `Floor` -> `Corridor` navigation flow from a "teleport-based" jump to a "spatial pivot" model. This introduces a "Lobby/Elevator" state where the player can scout floor diagnostics before committing to the horizontal corridor.

## Context & Blueprints
- **Design Philosophy:** "Physical Presence over Data Teleportation."
- **Core Concept:** The `Floor` acts as a **Pivot Point**. 
    - **State A (Elevator):** Vertical navigation (`u`/`d`), high-level floor diagnostics, and "Visited" status.
    - **State B (Corridor):** Horizontal navigation (Door listing), specific unit scanning, and "Back to Elevator" option.

---

## Phase 1: Model & State Integrity
- [ ] **1.1 Visited Status Tracking**
    - Ensure `Building` can query `Player.visitedLIPs` to show `[PROBED]` or `[4/12]` progress in the floor list.
- [ ] **1.2 Spatial State Definition**
    - Introduce a `isCorridorActive` flag (or similar) to the `Floor` or `Player` state to differentiate between "Standing at the Elevator" and "Walking the Hallway."

## Phase 2: UI & Rendering (The "Elevator Interface")
- [ ] **2.1 The "Floor Diagnostic Scan" (Stage 1)**
    - Design the TUI for the "Elevator" view: High-level summary of floor signatures, tech era, and atmospheric resonance.
- [ ] **2.2 The "Door Listing" (Stage 2)**
    - Refactor the current `Corridor` view to be the secondary state of the `Floor` pivot.
- [ ] **2.3 Layout Consistency**
    - Ensure the transition between Stage 1 and Stage 2 maintains the "Cyber-Brutalist" box alignment and HUD labels.

## Phase 3: Navigation & Action Mapping
- [ ] **3.1 Two-Stage Entry Logic**
    - Update `NavigationOrchestrator` to handle the `Select Floor -> Pivot to Elevator` transition.
- [ ] **3.2 Context-Aware Action Mapping**
    - **Elevator Map:** `u` (Up), `d` (Down), `c` (Enter Corridor).
    - **Corridor Map:** `01-XX` (Doors), `b` (Back to Elevator).

## Phase 4: Verification & Regression
- [ ] **4.1 Navigation Stress Test**
    - Verify that `u`/`d` from a "Corridor" state correctly resets the pivot to the next floor's "Elevator" state.
- [ ] **4.2 Visual Assertion**
    - Use `vinc.sh --test` to verify that the "Visited" labels appear correctly in the Building list.

---

## Session History & Notes
- **2026-03-10:** Brainstormed the "Elevator/Pivot" model. Identified the need for a two-stage floor entry to ground the player spatially.
