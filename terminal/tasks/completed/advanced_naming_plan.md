# Implementation Plan: Advanced Building Naming & Landmarks

## Phase 1: The Lexicon (NameGenerator)
- [ ] **Expanded Word Banks**:
    - [ ] Add `buildingLexicon` Map to `NameGenerator.groovy`.
    - [ ] Populate with Cultural Adjectives/Nouns (Rust, Neon, Baroque, etc.).
    - [ ] Define **Size-Based Suffixes** (Pod, Block, Arcology).
- [ ] **Landmark Table**:
    - [ ] Define 15+ "Legendary" Landmark titles (e.g., "The Eye of the Web").

## Phase 2: Selection Logic (NameGenerator)
- [ ] **New API**: Refactor `generateBuildingName(String culture, int maxFloors, long seed)`.
- [ ] **10% Landmark Logic**: If `scrambler.nextDouble() < 0.10`, pick a Legendary title.
- [ ] **Template Engine**: Implement 4+ naming templates for regular buildings.

## Phase 3: Integration (Model & UI)
- [ ] **Update Building**: Modify constructor to pass `culture` and `maxFloors` to the generator.
- [ ] **Lattice Identification**: Add an `isLandmark` boolean to `Building.groovy`.
- [ ] **UI Polish**: Show Landmark names in `Terminal.CYAN` and `Terminal.BOLD` on the Street list.

## Phase 4: Mechanical Impact
- [ ] **Discovery Events**: Log a unique journal entry when a Landmark is first entered.
- [ ] **Vibe Boost**: Landmarks have a higher base resonance (+10% stability).

## Phase 5: Verification
- [ ] **Audit**: Ensure Landmark names are deterministic and saved/restored correctly.
- [ ] **Vibe Check**: Manual run to verify the visual variety on a Street.
