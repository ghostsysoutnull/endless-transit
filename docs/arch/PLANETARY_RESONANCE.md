# Architectural Spec: Planetary Resonance & Regional Divergence

## 1. Objective
Transition the procedural engine from "Atomic Randomness" (room-level generation) to "Hierarchical Inheritance." This ensures planets feel like distinct "places" with unique tech-levels and aesthetics while allowing regional divergence across countries and cities.

## 2. Core Entity: The `VibeCapsule`
The `VibeCapsule` is a data-transfer object (DTO) generated at the **Planet** level and passed down the hierarchy. It encapsulates the "DNA" of the local space.

### 2.1 Properties
- **Chronos (Timeline):** *Immutable.* Sets the technological era (e.g., `Industrial`).
- **Resonances (Cultures):** 
    - `Primary`: The dominant aesthetic (e.g., `Neon`).
    - `Secondary`: The "drift" or sub-culture (e.g., `Rust`).
- **StabilityFactor:** A percentage (0.0 - 1.0) defining the probability of picking the Primary resonance over the Secondary.
- **LatticeMutation (Functional Trait):** A regional modifier (e.g., `Ceremonial`, `Military`, `Industrial`).
- **AtmosphericSignature:** A fixed color palette for lighting and HUD accents.

## 3. The Resonance Cascade (Inheritance Flow)

### 3.1 Planet: The Genesis
The Planet instantiates the `VibeCapsule`.
- Selects a single **Timeline** for the entire planetary body.
- Selects **Primary** and **Secondary** cultures.
- Defines the **Atmospheric Signature** (Global color vibe).

### 3.2 Country: The Mutation
The Country receives the Planet's capsule and applies a "Lattice Mutation."
- **Functional Specialization**: Assigns a trait (e.g., a "Baroque" planet with a "Military" country).
- **Stability Shift**: Can increase or decrease the `StabilityFactor` (e.g., making the sub-culture more prominent in this region).

### 3.3 City/Street: The Filter
The City refines the capsule further.
- **Resonance Flip**: Small chance (e.g., 10%) for a city to "flip" the Primary and Secondary resonances, representing a cultural enclave or rebel district.
- **Density Mutation**: Shifts building height and street length parameters based on the `FunctionalTrait`.

### 3.4 Room: The Realization
The Room consumes the final `VibeCapsule` to generate descriptions.
- **Asset Selection**: Instead of `ThemeManager.getRandom()`, the room pulls from the capsule's weighted culture pool and applies the `LatticeMutation` as a secondary descriptor.

## 4. Gematria & Mechanical Impact
Planetary Resonance influences the "Neural Link" (mechanics):
- **Cultural Resonance**: Objects found in a room matching the Planet's `Primary` culture receive a +10% frequency bonus.
- **Coherence Stability**: Certain timelines might have a slower or faster coherence drain (e.g., `Entropic` timelines drain faster).

## 5. The Anomaly Protocol (The "Outlier")
To prevent aesthetic fatigue, a 1% "Outlier Chance" exists at the **Apartment** level. If triggered, the `VibeCapsule` is ignored for that specific branch, allowing the discovery of "Temporal Anomalies" or "Universal Drifters" that don't belong on that planet.

## 6. Implementation Strategy
1. **Model Update**: Add `VibeCapsule` to the `com.endlesstransit.model` package.
2. **Interface Update**: Update `Location` to support vibe inheritance.
3. **Refactor Generators**: Update `Building`, `Floor`, `Apartment`, and `Room` to use capsule data for their internal random logic.
