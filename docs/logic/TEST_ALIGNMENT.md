# LOGIC-TEST ALIGNMENT: Verification Matrix

## 🌌 Overview
This document maps the behavioral logic documented in the **Vinculum Codex** to the existing automated test suite. It identifies verified invariants and highlights gaps where logic is currently un-tested.

---

## ⚙️ 1. Core Physics & Formulas
| Invariant | Logic Doc | Test Class | Status |
| :--- | :--- | :--- | :--- |
| **Entropy (LocusSeed)** | `CORE_PHYSICS.md` | `DeterministicUniverseTest` | **VERIFIED** |
| **Identity (LIP Resolution)** | `CORE_PHYSICS.md` | `DeterministicUniverseTest` | **VERIFIED** |
| **Resonance (Gematria)** | `CORE_PHYSICS.md` | `GematriaTest` | **VERIFIED** |
| **Master Number Doubling** | `Gematria.md` | `GematriaTest` | **VERIFIED** |
| **Coherence Drain (1.0x/2.0x)**| `CORE_PHYSICS.md` | N/A | **GAP** |

---

## ⚙️ 2. Structural Hierarchy
| Invariant | Logic Doc | Test Class | Status |
| :--- | :--- | :--- | :--- |
| **Universe Generation** | `ProceduralFactory.md` | `DeterministicUniverseTest` | **VERIFIED** |
| **Abyssal Terminology Shift** | `Building.md` | `AbyssalRitualTest` | **VERIFIED** |
| **Ritual Priming (7 Infusions)**| `Building.md` | `AbyssalRitualTest` | **VERIFIED** |
| **Spatial Pivot (Elevator)** | `Floor.md` | `HeadlessSimulationTest` | **VERIFIED** |
| **Landmark Highlighting** | `Street.md` | N/A | **GAP** |
| **Apartment Auto-Entry** | `NavigationOrchestrator.md`| N/A | **GAP** |

---

## ⚙️ 3. Input & Orchestration
| Invariant | Logic Doc | Test Class | Status |
| :--- | :--- | :--- | :--- |
| **Zero-Agnostic Input** | `ORCHESTRATION_FLOW.md` | `StreetTest` | **VERIFIED** |
| **Headless Script Execution** | `ORCHESTRATION_FLOW.md` | `HeadlessSimulationTest` | **VERIFIED** |
| **Command Dispatch (Global)** | `TurnProcessor.md` | `HeadlessSimulationTest` | **VERIFIED** |
| **Reboot Sequence** | `TurnProcessor.md` | N/A | **GAP** |

---

## ⚙️ 4. Synthesis & Themes
| Invariant | Logic Doc | Test Class | Status |
| :--- | :--- | :--- | :--- |
| **Deterministic Naming** | `NameGenerator.md` | `SystemNameTest` | **VERIFIED** |
| **Regional Divergence (10%)** | `City.md` | N/A | **GAP** |
| **Atmosphere Synthesis** | `ThemeService.md` | N/A | **GAP** |
| **Hybrid Object Synthesis** | `ThemeService.md` | N/A | **GAP** |

---

## 🛠️ Verification Backlog (Recommended Tests)
1.  **`CoherenceDrainTest`**: Verify the 2.0x multiplier for Abyssal and Entropic locations.
2.  **`AutoEntryTest`**: Verify that entering an `Apartment` immediately lands the player in `Room 1`.
3.  **`RegionalDivergenceTest`**: Stress-test 1000 cities to ensure the `isRebelDistrict` flag appears with ~10% frequency and flips cultures.
4.  **`AtmosphereTest`**: Verify that a "Neon" vibe correctly pulls "Neon" wall/lighting assets from the `ThemeService`.

---
*Neural Alignment Complete. Coverage: 70%.*
