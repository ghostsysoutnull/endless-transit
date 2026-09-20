# BEHAVIORAL SPEC: NameGenerator (ProcGen)

## 🌌 Responsibility
The `NameGenerator` turns a `LocusSeed` into a name. It is a service **instance**: each `ProceduralFactory` builds exactly one
(`factory.nameGenerator`, final) and the per-type factories ask it through `registry.nameGenerator` (HK-022). It has no static
methods and keeps nothing between calls — every method draws from a fresh `locus.nextRandom()`, so two generators given the same
locus return the same name (`NameGeneratorContractTest`).

---

## ⚙️ Public API Behavior

### 📍 Macro-Scale Synthesis (Filament → Street)
Each takes only the `LocusSeed` and joins parts picked from short lists inside the method:
- **`generateFilamentName`**: `<Greek>-<0..998>-<type>` (e.g. `Mu-993-Sync`).
- **`generateSectorName`**: `<descriptor> <noun> <0..98>` (e.g. `Void Quadrant 80`).
- **`generateSolarSystemName`**: star prefix + celestial suffix (e.g. `Tau Minor`).
- **`generatePlanetName`**: two phonetic parts, no space (e.g. `Hydraia`).
- **`generateCountryName`**: prefix + core + suffix (e.g. `Free Dust Kingdom`).
- **`generateCityName`**: two parts, no space (e.g. `Starford`).
- **`generateStreetName`**: adjective + noun (e.g. `Busy Terrace`).

### 📍 Building & Room Synthesis
- **`generateBuildingName(culture, floors, locus, depth, isNullZone, isAbyssal)`** → `[name, isLandmark]`:
    - **Landmark roll**: base 3%, +0.5% per depth level past 5, ×2 in a null zone, ×3 when abyssal, capped at 25%. A landmark
      takes one of the 15 `landmarkTitles`.
    - **Uncommon** (the next 15% of the roll): `Unit 0x<HEX> <size word>` (size word by floor count: < 10 small, < 20 medium,
      else large) or `The <noun> of <concept>`.
    - **Common**: `<adj> <noun>` or `<noun><compound>` (e.g. `Eternal Shaft`, `FoundationWell`), from the culture's lexicon.
- **`generateRoomName(culture, trait, locus, adjective = null)`** → `[name, category]`:
    - The Country's `functionalTrait` picks four `RoomCategory` values (an unknown trait picks the four generic cells); the
      category is the **first** draw, so `CorridorFactory`'s peek at the first room (door traces) sees the same category.
    - The name is `<adjective> <category.displayName>`. An apartment passes a dealt adjective so no two of its cells share a
      name; a null adjective draws one from the lexicon. There is no hex serial (HK-016 step 2).
- **`adjectivesFor(culture)`**: the culture's adjective list — what `ApartmentFactory` shuffles and deals.

### 📍 The Lexicon
- **`buildingLexicon`** (instance field): `culture → [adj, noun]`, loaded when the generator is built from
  `/names/buildings/index.txt` and `<culture>_adj.txt` / `<culture>_noun.txt` on the classpath.
- An unknown culture falls back to monolith's lexicon and prints a `[THEME_WARN]` line; every indexed culture has a lexicon
  (`ThemeResourceCoverageTest`), so this never fires in production.

---

## 🔄 Logic Invariants
- **Seed Discipline**: every method takes a `LocusSeed`. No static `Random`, no `ThreadLocalRandom`, no state between calls.
- **One owner**: the only `new NameGenerator()` in `src/main` is in `ProceduralFactory`. Lint `NoNewStaticLogic` applies to
  this file (it left the allow-list with HK-022); `landmarkTitles` is the one `static final` constant.

---

## 🔗 Dependencies
- **`LocusSeed`**: the entropy source for every roll.
- **`RoomCategory`**: the room identities a trait maps to.
- **`Terminal`**: the `[THEME_WARN]` line only.

---
*Neural Map Stabilized.*
*Verified against: NameGenerator.groovy @ 19dd99de17*
