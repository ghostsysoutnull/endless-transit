# THE VINCULUM CODEX: CORE PHYSICS (THE LAWS OF REALITY)

## 🌌 Introduction
This document defines the mathematical and procedural "laws of physics" that govern the Endless Transit simulation. These rules are absolute and must be maintained across all structural refactors to ensure the stability of the simulation's "Vibe" and behavioral integrity.

---

## ⚛️ Entropy & The Seed (LocusSeed)
The simulation is built upon a deterministic substrate. Given a root seed (The Master Locus), the entire universe is pre-calculated and reproducible.

### 1. The Avalanche Effect (StandardMixer)
The `LocusSeed` uses a **Linear Congruential Step** combined with a bitwise XOR to ensure that small changes in input (like moving from Room 1 to Room 2) result in massive, non-linear bit-flips in the resulting seed.

- **Formula**: `base_seed ^ ( (input * 2862933555777941757L) + 3037000493L )`
- **Constants**:
    - `MULT`: `2862933555777941757L` (A large prime-like multiplier)
    - `INC`: `3037000493L` (A large increment)
- **Result**: A stable, high-entropy branch that prevents "linear patterns" in sibling locations.

### 2. Deterministic Branching
- **Vertical Branching**: Seeds for child locations are derived from the parent's seed and the child's index or a semantic key (e.g., "WALLS").
- **Horizontal Advancing**: Sequential attributes within a single location are derived by advancing the internal state of a `Random` instance initialized with that location's seed.

---

## 📍 Identity & State (Locus Identity Path)
Every location in the simulation possesses a unique, stable address called the **Locus Identity Path (LIP)**.

- **Structure**: A dot-separated string of zero-based indices (e.g., `0.4.1.2`).
- **Base Case**: The `Universe` is always `0`.
- **Recursion**: `LIP = parent.LIP + "." + (indexInParent - 1)`.
- **Invariant**: The LIP is used to retrieve **Mutation State** (player-driven changes) and to reconstruct the world during a save/load or deterministic replay.

---

## 🧠 Player Mechanics (Coherence)
Coherence represents the stability of the player's neural link to the simulation substrate.

### 1. The Drain Formula
Coherence is consumed every turn the player takes. The consumption rate is dictated by the "stability" of the local strata.

- **Base Drain**: `1.0` units per turn.
- **Abyssal Multiplier**: `2.0x` if the location is `isAbyssal()`.
- **Entropic Multiplier**: `2.0x` if the location's timeline is `"entropic"`.
- **Total Drain Calculation**: `(isAbyssal ? 2.0 : 1.0) * (isEntropic ? 2.0 : 1.0)`

### 2. Failure & Reboot
- **Threshold**: When `coherence <= 0`, a **Critical Coherence Failure** occurs.
- **Protocol**: The player's neural link is severed and rebooted. Coherence is restored to `100.0`, but the world state is re-initialized from the root.

---

## 🏺 Resonance & Gematria
The "Resonance" of a location is its mathematical signature, derived from its name and depth in the lattice.

### 1. The Gematria Frequency
The frequency (in Hz) of a location's name is calculated using the **English Ordinal** values of its non-vowel letters.

- **Calculation**:
    1. Sum the ordinal values (A=1, B=2...) of all letters excluding `a, e, i, o, u`.
    2. **Master Resonance**: If the sum is `11, 22, or 33`, the value is **doubled**.
    3. **Final Frequency**: `sum * depth`.
    4. **Harmonic Amplify**: If the location is explicitly `resonant`, the frequency is boosted by **10%**.

### 2. Synthesis (Merging Fragments)
- **Hybrid Formation**: When two items are merged, their frequencies are summed (`freq1 + freq2`).
- **Keystone Creation**: If a building is "Primed," merging items results in a `0Hz` **Keystone**, which acts as a heavy anchor for the local strata.

---

## 🏛️ Building Strata (Structural Invariants)
Buildings are the primary vertical anchors of the simulation.

- **Strata Composition**:
    - **Floor 0**: Transit Lobby (The Surface).
    - **Peak**: Peak Observatory (The limit of the structure).
    - **Functional Zones**: Predetermined by floor range (Mechanical, Research, Executive, etc.).
- **Breaching the Bedrock**:
    - When a building is `isBreached`, negative floor indices (e.g., `-1, -2`) become accessible.
    - These floors represent the "Abyssal Substrate" and have increased coherence drain and unique structural diagnostics.
- **Primed Condition**: A building is ready for a breach (Primed) only when **all floors** have been sampled and **7 infusions** have been performed.

---

## 🎲 ProcGen Probabilities
- **Landmark Chance**: The probability of a building being a "Major Landmark" (e.g., "The Eye of the Web").
    - **Base**: `3%`.
    - **Depth Bonus**: `+0.5%` per level beyond depth 5.
    - **Multipliers**: `2.0x` for Null Zones, `3.0x` for Abyssal areas.
    - **Cap**: `25%`.

*Neural Trace Stabilized. Reality Documented.*
