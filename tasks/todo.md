# Phase 1: Domain Separation

## Objective
Reorganize the codebase into functional domains (`core`, `ui`, `procgen`, `model`) to reduce cognitive noise for AI agents and improve project modularity.

## Plan

### Infrastructure & Entry Point
- [x] Move `Main.groovy` to `src/main/groovy/com/endlesstransit/Main.groovy`.
- [x] Add `package com.endlesstransit` to `Main.groovy`.
- [x] Update `run.sh` to launch `com.endlesstransit.Main`.
- [x] Verify game still starts.

### Atomic Domain Moves
- [x] **UI Domain**: Move `Terminal.groovy`, `ThemeManager.groovy` to `com.endlesstransit.ui`.
    - [x] Update package headers.
    - [x] Update imports in other files.
    - [x] Verify with tests.
- [x] **ProcGen Domain**: Move `Gematria.groovy`, `NameGenerator.groovy` to `com.endlesstransit.procgen`.
    - [x] Update package headers.
    - [x] Update imports in other files.
    - [x] Verify with tests.
- [x] **Core Domain**: Move `Game.groovy`, `Player.groovy`, `InventoryItem.groovy`, `Logger.groovy`, `JournalManager.groovy` to `com.endlesstransit.core`.
    - [x] Update package headers.
    - [x] Update imports in other files.
    - [x] Verify with tests.
- [x] **Model Domain**: Move all location and container classes to `com.endlesstransit.model`.
    - [x] Update package headers.
    - [x] Update imports in other files.
    - [x] Verify with tests.

### Final Verification
- [x] Run `./run.sh --test` and ensure 100% pass rate.
- [x] Perform a manual "vibe check" by running the game.

## Review
- [x] Phase 1 completed: Files moved to domains, imports updated, tests passing.

# Phase 2: Context Localization

## Objective
Distribute technical knowledge and "vibes" into domain-specific `GEMINI.md` files to optimize agent context windows.

## Plan
- [x] Create `src/main/groovy/com/endlesstransit/ui/GEMINI.md`.
- [x] Create `src/main/groovy/com/endlesstransit/model/GEMINI.md`.
- [x] Create `src/main/groovy/com/endlesstransit/procgen/GEMINI.md`.
- [x] Create `src/main/groovy/com/endlesstransit/core/GEMINI.md`.
- [x] Update root `GEMINI.md` with `@import` syntax.
- [x] Consolidate lessons into local context files where applicable.

## Review
- [x] Phase 2 completed: Knowledge is now localized and indexed.

# Phase 3: Standardize Testing

## Objective
Migrate tests into a standard source tree (`src/test/groovy`) and align them with the new domain packages for better isolation and discovery.

## Plan
- [x] Create `src/test/groovy/com/endlesstransit/` structure.
- [x] Move tests and categorize them by domain (e.g., `model/`, `ui/`, `core/`).
- [x] Update test package headers and imports.
- [x] Update `run.sh` to execute tests from the new classpath.
- [x] Verify 100% test pass rate.

# Liminal Glitch Environments

## Objective
Implement a deep environmental synthesis engine that combines Culture and Timeline into wall, lighting, and structural descriptions to create a "neural reconstruction" aesthetic.

## Plan
- [x] **Asset Expansion**: Add `walls.txt`, `lighting.txt`, and `structures.txt` categories to `src/main/resources/themes/`.
- [x] **Synthesis Engine**: Implement `generateAtmosphere(culture, timeline)` in `ThemeManager.groovy`.
- [x] **Room Refactor**: Update `Room.groovy` to use synthesized walls and lighting instead of random strings.
- [x] **Lattice Integration**: Ensure `Region Traits` (Military, Research, etc.) influence the structural description.
- [x] **Verification**: Manual audit of room descriptions across different planet vibes.

# Spectral Echoes & Null-Sector Refactor

## Objective
Make Null-Sectors mechanically distinct and atmospheric by implementing "blind" navigation and high-value Spectral Echo discovery.

## Plan
- [x] **Blind Navigation**: Hide coordinates and path when inside a Null-Sector.
- [x] **Hot/Cold Tracking**: Implement a signal-strength indicator that reacts to the player's proximity to a "Spectral Echo."
- [x] **Capturing Logic**: Add a closure to Null-Sector that allows capturing an echo if signal strength is maximized.
- [x] **Lore Integration**: Update descriptions to emphasize the void and static.
- [x] **Verification**: Manual test of echo-hunting in a Null-Sector.

# Liminal Glitch Environments
- [x] Implement mismatched lighting/wall descriptions based on Culture/Timeline synthesis.

# Symbolic Neural Lattice HUD

## Objective
Enhance the Cell Trace with graphical icons and spatial radar components to provide better depth visualization and spatial awareness.

## Plan
- [x] **Iconography**: Define scale icons in `Terminal.groovy` (e.g., Universe: ∞, Planet: ⊕).
- [x] **Lattice Sparkline**: Implement a symbolic depth indicator in the HUD header.
- [x] **Cell Radar**: Add a 1D grid representation of the player's position within the current container.
- [x] **Path Truncation**: Refine text path display to complement the symbolic icons.
- [x] **Verification**: Manual audit of icon rendering and radar accuracy across all scales.

# Command Bridge HUD Refactor

## Objective
Transition the current text-list HUD into a structured "Command Bridge" interface using ASCII box-drawing characters to enhance tactile immersion and data organization.

## Plan
- [x] **UI Utilities**: Add ASCII box-drawing helpers to `Terminal.groovy`.
- [x] **Frame Logic**: Implement a `renderBridgeHUD` method in `Game.groovy`.
- [x] **Logical Grouping**:
    - [x] Top: Navigation Path & Pulse Traversal.
    - [x] Middle: Scanning Diagnostic & Location Description.
    - [x] Bottom: Compass (Navigational Vector Array) & Directive Input.
- [x] **Vibe Integration**: Ensure atmospheric colors apply to the box borders.
- [x] **Verification**: Manual audit of HUD alignment across different location scales.

# Planetary Resonance & Regional Divergence
- [x] Hierarchical Vibe Inheritance
- [x] Regional Mutations & Anomaly Protocol

## Mechanical & Atmospheric Synthesis
- [x] **Resonant Gematria**: Implement +10% bonus for culture match in `Gematria.groovy`.
- [x] **Temporal Drain**: Implement timeline-specific coherence drain rates in `Game.groovy`.
- [x] **Atmospheric HUD**: Integrate `atmosphericColor` into the main UI loop.
- [x] **Verification**: Audit mechanical impacts via tests and HUD vibe check.

# Phase 7: The Abyssal Substrate
- [x] **Ritual Mechanics**:
    - [x] Track floor-sampling and infusion counts in `Building.groovy`.
    - [x] Implement `Keystone` synthesis logic.
    - [x] Implement `Breach the Bedrock` directive at the Building Peak.
- [x] **The Substrate (Negative Floors)**:
    - [x] Update `Floor.groovy` to handle negative indices and "Layer" terminology.
    - [x] Implement "Arteries," "Crypts," and "Shards" naming overrides.
    - [x] Create "Abyssal" theme set in `ThemeManager.groovy` (Dark Brutalism).
- [x] **HUD & Map Integration**:
    - [x] Add "Abyssal Pressure" visual indicators to HUD.
    - [x] Update `Lattice Trace` (map) to show the "Dark Root" hierarchy.
- [x] **Verification**: Manual test of the full top-to-bottom unlock ritual.

# Phase 6: Wide-Screen Command Bridge
- [x] **Infrastructure**: Increase hardcoded HUD width to 100 in `Game.groovy`.
- [x] **Multi-Pane Layout**:
    - [x] Split the middle section into "Location Data" (Left) and "System Status" (Right).
    - [x] Implement a vertical box-divider logic in `Terminal.drawSplitBoxedLine`.
- [x] **Data Expansion**:
    - [x] Remove/Reduce path truncation in `LOCUS_TRACE`.
    - [x] Expand the `LATTICE` sparkline to show up to 50 characters of depth.
    - [x] Increase 1D Radar limit to 20 units.
- [x] **Real-time Event Log**: Add a 3-line "Ticker" on the right side of the HUD.
- [x] **Lattice Trace Command**: Implement global `map` / `lattice` command for vertical hierarchy visualization.
- [x] **Debugging & Help**:
    - [x] Implement `help` / `?` command for system guidance.
    - [x] Implement `glitch` debug menu for rapid testing of Abyssal rituals.
- [x] **Verification**: Manual audit of alignment at 100-char width across all locations.

# Phase 5: Documentation Categorization

## Objective
Reorganize the `docs/` folder into functional categories and provide a central index to improve knowledge discovery for agents and architects.

## Plan
- [x] Create `docs/arch/`, `docs/vision/`, `docs/workflow/`, and `docs/archive/` directories.
- [x] Categorize existing documents into these folders.
- [x] Create `docs/README.md` as a central documentation map.
- [x] Update any internal links between documents (if necessary).
- [x] Verify that all context imports in `GEMINI.md` still point to correct (or root) documentation if they reference `docs/`.

# Proposed Future Phases

## Phase 8: Harmonic Resonance Hubs
- [ ] Implement Stability Wells in rare location types.
- [ ] Add advanced synthesis tools (4+ fragment merges).
- [ ] Create "High Fidelity" UI theme for hubs.

## Phase 9: The Neural Web Map
- [x] Expand `map` command to a 2D ASCII grid representation.
- [x] Add real-time tracking of nearby building/sector traits.
- [x] Implement "Tactical Zoom" for different hierarchy levels.

## Phase 10: Spectral Echoes & Entity Integration
- [ ] Implement NPC "Trace Signatures" that move between locations.
- [ ] Add "Neural Sync" interaction mechanic (frequency-matching dialogue).
- [ ] Create "Entity Scanner" HUD component.

## Phase 11: The Neural Soundscape (Sensory Depth)
- [ ] Implement ASCII Pulse Meter (Sinewave/Sawtooth patterns).
- [ ] Add `tune` command for room stabilization/hidden item discovery.
- [ ] Expand room generation to include "Auditory Descriptions."

## Phase 12: Macro-Traversal & The Great Filaments
- [ ] Implement "Keystone Jumping" between Solar Systems.
- [ ] Add mechanics for navigating Cosmic Filaments (managing "Neural Drift").
- [ ] Flesh out Star-Gate architecture at the highest scales.

---
*See [docs/vision/EVOLUTION_ROADMAP.md](../docs/vision/EVOLUTION_ROADMAP.md) for the strategic vision.*
