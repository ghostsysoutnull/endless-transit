---
layout: terminal
title: GEMATRIA_SPECIFICATIONS
map_type: telemetry
---

# TECHNICAL_SUBSTRATE: Gematria Specifications

The Gematria Engine is the core mathematical parser that translates the name of any procedural object into its spectral frequency (Hz).

## [THE BREATHLESS ABJAD]
Frequencies are calculated based on the **Consonants** of an item's name. In the logic of the Unimatrix, vowels carry no weight—they are merely the "breath" between the hard data of consonants.

### [VALUE_MAP]
Each consonant carries its **ordinal position** in the alphabet. Vowels (A, E, I, O, U) and anything that is not a letter carry nothing.

| Characters | Base Value |
| :--- | :--- |
| **B, C, D** | 2, 3, 4 |
| **F, G, H** | 6, 7, 8 |
| **J, K, L, M, N** | 10, 11, 12, 13, 14 |
| **P, Q, R, S, T** | 16, 17, 18, 19, 20 |
| **V, W, X, Y, Z** | 22, 23, 24, 25, 26 |

## [CALCULATION_LOGIC]
The final frequency of an object is derived using the following formula:
`Frequency = (Sum of Consonants, doubled if a Master Number) * (Lattice Depth) * (Resonance Multiplier)`

1.  **Base Sum:** Sum the values of all consonants in the object's name.
2.  **Master Number:** If the base sum is exactly **11, 22 or 33**, the engine announces `RESONANCE DETECTED` and doubles it.
3.  **Depth Scaling:** The sum is multiplied by the depth of the cell. Every room in the web sits at **Depth 12**, so in practice every capture is base sum × 12.
4.  **Resonance Multiplier:** **1.1x** if the room's Culture matches the planet's primary Culture (the fraction is truncated). Otherwise 1.0x.

## [STABILIZATION_WAVEFORMS]
A frequency is considered **Stable** if it is divisible by **11**. 
*   Stable fragments and stable syntheses are counted in your `RESONANT_TRACES` tally. They provide no additional Coherence.
*   Stabilized cells appear with the `≈≈≈` waveform in the Apartment Aperture Scan; anomalous cells show `###`.

## [DATA_EXAMPLE]
**Item:** "Rust Piston"
1.  **Consonants:** R (18), S (19), T (20), P (16), S (19), T (20), N (14)
2.  **Base Sum:** 126 — not a Master Number, so no doubling
3.  **Depth (12):** 1512 Hz
4.  **Resonance:** If the planet's primary Culture is "Rust", ×1.1 → **1663 Hz**
5.  **Stabilization:** 1663 / 11 = 151.18… (not divisible → unstabilized; without the Culture match, 1512 / 11 = 137.45… likewise)

A Master Number example: any name whose consonants sum to exactly 22 doubles to 44, then × 12 = **528 Hz**, which is divisible by 11 — Master Numbers always yield Stabilized fragments.

---
*Next Node: [\[THE_INVERSION_RITUAL\]]({{ "/terminal/codex/the_inversion_ritual.html" | relative_url }})*
