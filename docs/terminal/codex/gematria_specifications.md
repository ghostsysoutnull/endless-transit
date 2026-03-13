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
| Characters | Base Value |
| :--- | :--- |
| **B, C, D, F** | 10 |
| **G, H, J, K** | 20 |
| **L, M, N, P** | 30 |
| **Q, R, S, T** | 40 |
| **V, W, X, Y, Z** | 50 |

## [CALCULATION_LOGIC]
The final frequency of an object is derived using the following formula:
`Frequency = (Sum of Consonants) * (Lattice Depth) * (Resonance Multiplier)`

1.  **Base Sum:** Sum the values of all consonants in the object's name.
2.  **Depth Scaling:** Frequencies are amplified as you go deeper into the web. An object at Depth 10 (Apartment) is 10x more resonant than an object at Depth 1 (Filament).
3.  **Resonance Multiplier:**
    *   **Standard:** 1.0x
    *   **Culture Match:** 1.1x (Scanned in a room matching the planet's primary culture).
    *   **Master Number:** 2.0x (If the base sum is 11, 22, 33, etc.).

## [STABILIZATION_WAVEFORMS]
A frequency is considered **Stable** if it is divisible by **11**. 
*   Stable fragments provide a higher Coherence return when synthesized.
*   Stabilized items appear with the `≈≈≈` waveform visual in the Aperture Scan.

## [DATA_EXAMPLE]
**Item:** "Rust Piston"
1.  **Consonants:** R (40), S (40), T (40), P (30), S (40), T (40), N (30)
2.  **Base Sum:** 260
3.  **Depth (10):** 2600 Hz
4.  **Resonance:** If the planet is "Rust", +10% → **2860 Hz**
5.  **Stabilization:** 2860 / 11 = 260.0 (Divisible! → **STABILIZED**)

---
*Next Node: [\[THE_INVERSION_RITUAL\]]({{ "/terminal/codex/the_inversion_ritual.html" | relative_url }})*
