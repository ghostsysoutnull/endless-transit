# Mystical Gematria Specification: The Breathless Abjad

## 1. Overview
In the "Cyber-Terminal" HUD of Endless Transit, objects found in rooms are not merely physical items but carry "Numeric Frequencies." These frequencies are calculated using a mystical system that ignores vowels (the spirit) and quantifies consonants (the body), amplified by the observer's depth within the universe.

## 2. The Calculation Algorithm
To determine the frequency of an object:
1.  **Vowel Exclusion**: All vowels (A, E, I, O, U) are treated as "The Void" and carry a value of `0`.
2.  **Consonant Weight**: Each consonant is assigned its English Ordinal value (B=2, C=3, D=4, F=6, ..., Z=26).
3.  **Summation**: The values of all consonants in the object's name are summed.
4.  **Depth Amplification**: The total sum is multiplied by the current `DEPTH` of the room (where Universe root = 0).

**Formula:**
`Frequency = (Sum of Consonant Ordinals) * Hierarchical Depth`

### Example: "Key" at Depth 10
- K = 11
- e = 0 (Vowel)
- y = 25
- Sum = 36
- Depth = 10
- **Final Frequency: 360**

## 3. TUI Interaction
- **Display**: Objects in a room are displayed using the format `objectName<index>`.
- **Command**: Players interact using `o<index>` (e.g., `o1`, `o2`).
- **Collection**: Upon interaction, the object is "Scanned" and its Frequency is added to the player's inventory. 
- **Persistence**: Once an object is scanned, it is removed from the room's detectable list.

## 4. Master Number Resonance
If the `Sum of Consonants` is a Master Number (11, 22, 33), the object is considered "Resonant." The terminal should provide a visual cue (e.g., `!!! RESONANCE DETECTED !!!`) and the value is doubled before applying the Depth Multiplier.
