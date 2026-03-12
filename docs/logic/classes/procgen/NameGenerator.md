# BEHAVIORAL SPEC: NameGenerator (ProcGen)

## 🌌 Responsibility
The `NameGenerator` provides strictly deterministic string synthesis for all entities in the simulation. It ensures that any location, given its stable `LocusSeed`, will always have the same name, tech era, and atmospheric narrative.

---

## ⚙️ Public API Behavior

### 📍 Macro-Scale Synthesis (Universe -> Street)
- **`generatePlanetName(LocusSeed)`**: Combines two phonetic parts (e.g., `Ter + ra`) for a sci-fi feel.
- **`generateSolarSystemName(LocusSeed)`**: Combines a Greek/Star prefix (e.g., `Alpha`) with a celestial suffix (e.g., `Prime`).
- **`generateCityName(LocusSeed)`**: Combines a material/vibe prefix (e.g., `Neon`) with a structural suffix (e.g., `Spire`).

### 📍 Building & Room Synthesis
- **`generateBuildingName(...)`**:
    - **Landmark Roll**: Checks if the building is a unique landmark (e.g., "The Void-Watcher"). Probability scales with depth and Abyssal status.
    - **Lexicon Matching**: Uses a `buildingLexicon` map to pick adjectives and nouns based on the building's culture (e.g., `rust` -> `Corroded Shell`).
    - **Template Dispatch**: Randomly chooses between "Adj Noun" or "NounCompound" (e.g., "Gate", "Fall") templates.
- **`generateRoomName(culture, trait, LocusSeed)`**: 
    - Maps a country's `functionalTrait` (e.g., `Military`, `Research`) to specific room types (e.g., `Laboratory`, `Armory`).
    - Combines culture-specific adjectives/nouns with a random Hex ID (e.g., `[0xAF]`).

---

## 🔄 Logic Invariants
- **Seed Discipline**: Every method *must* accept a `LocusSeed`. No static `Random` or `ThreadLocalRandom` is allowed, ensuring cross-session and cross-platform stability.
- **Abyssal Influence**: Abyssal buildings have a 3x multiplier for landmark probability.

---

## 🔗 Dependencies
- **`LocusSeed`**: The primary source of entropy for all rolls.
- **`buildingLexicon`**: The internal source of thematic strings.

---
*Neural Map Stabilized.*
