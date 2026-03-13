# BEHAVIORAL SPEC: ThemeService (ProcGen)

## 🌌 Responsibility
The `ThemeService` is the "aesthetic synthesizer" of the simulation. It maps abstract cultures and timelines to concrete sensory descriptions (walls, lighting, structures) and hybrid objects.

---

## ⚙️ Public API Behavior

### 📍 Atmosphere Synthesis (`generateAtmosphere`)
- **Culture -> Walls**: The `culture` (e.g., `rust`, `neon`) determines the material and texture of the room's walls.
- **Timeline -> Lighting**: The `timeline` (e.g., `analog`, `future`) determines the source and quality of illumination.
- **Trait/Mutation -> Structure**: The room's functional trait (e.g., `Military`, `Research`) or local mutation determines its architectural form.
- **Abyssal Override**: If the culture is `abyssal`, all sensory pools are forced to `abyssal` variants (e.g., `red strobe`, `raw concrete`).
- **Glitch Logic**: Anomaly rooms have a 5% chance to "cross-pollinate" themes (e.g., a `baroque` room with `singularity` lighting).

### 📍 Object Hybridization (`generateHybridObject`)
- **Synthesis**: Combines a culture asset (e.g., `marbled fountain`) with a timeline asset (e.g., `CRT monitor`) to create a unique narrative object (e.g., `CRT monitor infused with marbled fountain`).
- **Variety**: Randomly flips the order of the hybrid parts for narrative variety.

---

## 🔄 Logic Invariants
- **Thematic Consistency**: Each room's atmosphere is deterministically derived from the location's `LocusSeed`.
- **Resource Loading**: Themes are loaded from flat `.txt` files in `src/main/resources/themes/` at initialization.

---

## 🔗 Dependencies
- **`LocusSeed`**: Provides the entropy for atmospheric rolls.
- **`VibeCapsule`**: Provides the base culture and timeline parameters.

---
*Neural Map Stabilized.*
