# Implementation Plan: Aperture Scan & Hybrid Room Presentation

## Phase 1: Functional Room Naming (NameGenerator)
- [ ] **Word Banks**:
    - [ ] Define `roomLexicon` in `NameGenerator.groovy` keyed by culture (rust, neon, etc.).
    - [ ] Map building traits (Military, Research) to functional room types.
- [ ] **Logic**:
    - [ ] Implement `generateRoomName(String culture, String trait, long seed)`.

## Phase 2: Hybrid Room Diagnostic (Room)
- [ ] **Model Update**:
    - [ ] Add `roomName`, `roomType`, and `atmoTraits` Map to `Room.groovy`.
- [ ] **UI Overhaul**:
    - [ ] Refactor `Room.getDescription()` to use a 100-char structured data header.
    - [ ] Maintain sensory prose below the header.
    - [ ] Add a "NEURAL_LINK_INTERPRETATION" label to the prose section.

## Phase 3: Aperture Scan UI (Corridor & Apartment)
- [ ] **Corridor Table**:
    - [ ] Refactor `Corridor.enter()` to display a "Bank of Doors" table.
    - [ ] Columns: `[ID]`, `[SCAN_LABEL]`, `[SIGNATURE]`, `[STATUS]`.
- [ ] **Preview Logic**:
    - [ ] Allow Corridors to "preview" the name of the first room in an apartment during the scan.

## Phase 4: Verification
- [ ] **Determinism**: Verify the same seed produces identical room names and atmo-traits.
- [ ] **UI Alignment**: Ensure the corridor table respects the 100-char width.
