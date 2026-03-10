# ACTIVE TASK: Door Enhancement & Sensory Deduction

## Objective
Refactor the `Door` model into a structured composition of sensory and technical components. This introduces "Anomalous Traces" (clues to room types), "Written Inscriptions" (system/ghost labels), and "Enhanced Diagnostics" (via the `[s] Scan` command) while preserving the current two-stage navigation flow.

## Context & Blueprints
- **Design Philosophy:** "Physical Presence through Sensory Data."
- **Core Concept:** The `Door` acts as a **Signal Source**, leaking information about the room behind it through material, sound, smell, and thermal signatures.

---

## Phase 1: Component Substrate
- [x] **1.1 Define `InscriptionStyle` & `DoorInscription`**
    - Create `src/main/groovy/com/endlesstransit/model/DoorInscription.groovy`.
    - Styles: `STAMPED` ([WORD]), `SCRAWLED` (_word_), `ETCHED` (⟨WORD⟩), `BURNED` (!! WORD !!).
- [x] **1.2 Define `AnomalousTrace` Enum**
    - Create `src/main/groovy/com/endlesstransit/model/AnomalousTrace.groovy`.
    - Properties: `name`, `sensoryDescription`, `targetRoomHint`.
- [x] **1.3 Create `DoorAppearance` Object**
    - Create `src/main/groovy/com/endlesstransit/model/DoorAppearance.groovy`.
    - Manage material lists and physical states (Vibrating, Cold, Rusted).

## Phase 2: Model & Synthesis Integration
- [x] **2.1 Refactor `Door.groovy`**
    - Replace string-based description with component objects.
    - Implement `getMinimalDescription()` for HUD list.
    - Implement `getEnhancedDescription()` for Technical Scan.
- [x] **2.2 Update `ProceduralFactory.groovy`**
    - Implement "Back-Propagation" logic: Room Type -> Door Trace.
    - Implement Inscription Distribution (20% chance for specific labels).

## Phase 3: UI & Command Refactor
- [x] **3.1 Update `ScanCommand.groovy`**
    - Refactor the diagnostic table to include the new `EnhancedDescription` components.
- [x] **3.2 HUD Refinement**
    - Ensure visual tags like `[STORAGE]` or `!!DANGER!!` render correctly in the Corridor list.

## Phase 4: Verification & Vibe Check
- [x] **4.1 Unit Test: Deductive Consistency**
    - Verify that specific traces (Ozone) lead to correct room types (Generator).
- [x] **4.2 Visual Assertion**
    - Verify alignment and ANSI stability in high-density scan output.

---

## Session History & Notes
- **2026-03-10:** Brainstormed the "Component-Aperture Pattern" for doors. Established the link between sensory traces and room types to reward player deduction.
