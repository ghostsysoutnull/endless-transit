# 🚀 VINCULUM_EVOLUTION: NEXT_STEPS_PRIORITIZED

This document outlines the high-priority technical and aesthetic initiatives for the next phase of development. These tasks are designed to deepen the "Cyber-Brutalist" immersion while hardening the procedural substrate.

---

## 1. 💀 NEURAL_COLLAPSE: AESTHETIC_REBOOT
**Focus:** Vibe / Interaction Feedback
**Goal:** Transform the current "Game Over" (0% Coherence) from a simple message into a high-density, immersive failure sequence.

### Implementation Goals:
- **Visual Glitch Layer:** Use `Terminal.glitchText` to progressively scramble the HUD as coherence drops below 5%.
- **Memory Purge Animation:** Create a sequence that "flushes" the terminal buffer, visibly deleting inventory and history line-by-line.
- **Cold Boot Sequence:** Transition into a medical/system-recovery UI for the reboot, using high-contrast colors (RED/WHITE) and clinical diagnostics.
- **Deterministic Re-entry:** Ensure the reboot preserves the `masterSeed` but resets the player's spatial state and coherence.

---

## 2. 🛗 VERTICAL_TRAVERSAL: THE_ELEVATOR_PIVOT
**Focus:** Architecture / Navigation Flow
**Goal:** Introduce a "spatial pivot" between the Building and its Floors, replacing the "teleport-based" jump with a dedicated Elevator state.

### Implementation Goals:
- **Elevator Interface:** A unique TUI view showing a vertical "diagnostic scan" of the building's floors.
- **Scout Mechanic:** Allow the player to scan floor signatures (Atmosphere, Tech Era, Resonance) from within the elevator before committing to a floor.
- **State Transition:** Refactor `NavigationOrchestrator` to handle the `Elevator (Pivot) -> Corridor (Horizontal)` flow, ensuring "Visited" status is correctly tracked and displayed.

---

## 3. 🌀 ABYSSAL_LOGIC: SURVIVAL_HARDENING
**Focus:** Logic / Survival Mechanics
**Goal:** Deepen the unique identity of "Abyssal" locations (negative floor IDs or `Artery` corridors) with distinct survival challenges.

### Implementation Goals:
- **Coherence Static:** Implement a variable coherence drain multiplier that increases in Abyssal environments.
- **Sensory Blindness:** Partially obscure room descriptions or map data until a "Pulse Scan" (new action) is performed.
- **Spectral Fragments:** Introduce unique items that only spawn in the Abyss, providing high-frequency data but accelerated coherence drain while held.

---

## 4. 🏗️ CORE_DECOMPOSITION: SERVICE_REFACTOR
**Focus:** Infrastructure / Code Quality
**Goal:** Continue decomposing the `Game.groovy` facade into specialized, testable services to maintain "Expert OO" standards.

### Implementation Goals:
- **TraversalService:** Extract the complex logic of entering/exiting locations and updating the `ActionMapper`.
- **TurnOrchestrator:** Move the turn-cycle logic (Input -> Process -> Render) into a dedicated service.
- **StateRepository:** Formalize the storage and retrieval of `GameMemento` for cleaner save/load/replay integration.

---

## 📍 ARCHITECT'S NOTE
Prioritize **Initiative 1 (Neural Collapse)** for an immediate "Vibe" win, or **Initiative 2 (Elevator Pivot)** to resolve the most significant remaining navigation bottleneck.
