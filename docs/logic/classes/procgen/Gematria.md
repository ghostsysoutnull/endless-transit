# BEHAVIORAL SPEC: Gematria (ProcGen)

## 🌌 Responsibility
The `Gematria` class is the **Spectral Calculation Engine**. It translates textual names into numeric frequencies (Hz) that represent the "resonance" of a location or object.

---

## ⚙️ Public API Behavior

### 📍 Frequency Calculation (`calculateFrequency`)
- **Vowel Suppression**: Excludes `a, e, i, o, u` from the calculation to emphasize the structural consonants.
- **English Ordinal Sum**: Sums the character values (A=1, B=2...) of the remaining letters.
- **Master Number Resonance**:
    - If the sum is `11, 22, or 33`, the frequency is **doubled**.
    - This triggers a special TUI alert: `!!! RESONANCE DETECTED !!!`.
- **Depth Scaling**: The sum is multiplied by the location's `depth` in the world lattice.
- **Harmonic Amplification**: If the location is flagged as `isResonant`, the final frequency is boosted by **10%**.

---

## 🔄 Logic Invariants
- **Case-Insensitive**: Letter values are calculated based on their uppercase counterparts.
- **Non-Alphabetic Handling**: Only alphabetic characters contribute to the sum; numbers and symbols are ignored in the base frequency roll.

---

## 🔗 Dependencies
- **`Terminal`**: Used for displaying resonance detection alerts in real-time.

---
*Neural Map Stabilized.*
