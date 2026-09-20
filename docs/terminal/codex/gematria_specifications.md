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
4.  **Resonance Multiplier:** **1.1x** if the cell's Culture matches the local **RESONANCE** — the Culture named on the street header (the fraction is truncated). Otherwise 1.0x.

## [STABILIZATION_WAVEFORMS]
A frequency is considered **Stable** if it is divisible by **11**. 
*   Stability provides no additional Coherence. A **synthesis** whose result is Stable adds one to your `RESONANT_TRACES` tally; a **capture** adds one when it was amplified by the Resonance Multiplier, Stable or not. The law of the tally is set out in [OPERATIONAL_PROTOCOLS]({{ "/terminal/manual/operational_protocols.html" | relative_url }}).
*   The Apartment Aperture Scan applies the same test to each cell's **name**: a cell whose name resolves to a frequency divisible by 11 shows the `≈≈≈` waveform; anomalous cells show `###`. It is a reading of the cell, not of the fragments inside it, and it feeds no tally.

## [DATA_EXAMPLE]
**Item:** "oscilloscope" (an Analog-era relic, as found on seed 4660)
1.  **Consonants:** S (19), C (3), L (12), L (12), S (19), C (3), P (16)
2.  **Base Sum:** 84 — not a Master Number, so no doubling
3.  **Depth (12):** 1008 Hz
4.  **Resonance:** Captured in a cell of the local RESONANCE Culture, ×1.1 = 1108.8 → **1108 Hz** (the fraction is cut, not rounded)
5.  **Stabilization:** 1108 / 11 = 100.72… (not divisible → unstabilized; without the Culture match, 1008 / 11 = 91.63… likewise)

**On Master Numbers.** A name whose consonants sum to exactly 22 doubles to 44, then × 12 = **528 Hz**, divisible by 11: an unamplified Master Number is always Stabilized. Amplify it and the cut fraction breaks the harmony — 528 becomes 580 — so an amplified Master Number never is. The point is a theoretical one: in the current lexicon no fragment's name sums to 11, 22 or 33. The lightest known is "oil can", at 29.

---
*Next Node: [\[THE_INVERSION_RITUAL\]]({{ "/terminal/codex/the_inversion_ritual.html" | relative_url }})*
