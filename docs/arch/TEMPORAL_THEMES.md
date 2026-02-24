# Temporal Themes & Cultural Mismatch

In the universe of *Endless Transit*, reality is often a composite of fragments. The "Neural Web" renders environments using available data-traces from across human (and non-human) history. This document outlines the conceptual rules for how these themes are applied to Floors, Apartments, and Rooms.

## 1. The Core Philosophy: "Asset Recycling"
The Borg-Neural network does not create unique furniture for every room; it pulls from a database of **Cultures** (Style) and **Timelines** (Technology). When these two are mismatched, it creates the "Liminal Glitch" aesthetic—rooms that feel familiar yet fundamentally wrong.

---

## 2. The Structural Layers

### 2.1 The Floor Scale (Culture)
Every Floor is assigned a single **Culture**. This defines the aesthetic "DNA" of every apartment on that level.
- **Example Cultures**: *Zenith* (Hellenic), *Shogun* (Japanese), *Gilded* (Victorian), *Monolith* (Borg/Brutalist).
- **Impact**: Defines the material (marble, wood, obsidian) and the basic form of furniture.

### 2.2 The Apartment Scale (Timeline)
Every Apartment is assigned a **Timeline** (Point in Time). This defines the technological level or "wear" of the space.
- **Example Timelines**: *Ancient* (Stone/Clay), *Analog* (80s Electronics), *Near-Future* (Sleek/Glass), *End-of-Time* (Quantum/Singularity).
- **Impact**: Defines the "state" of the objects. An "Ancient" apartment in a "Zenith" floor results in crumbling marble and clay pots.

### 2.3 The Room Scale (Synthesis)
The Room is the canvas where Culture and Timeline meet. 
- **Object Distribution**: The Apartment defines the total "Object Density." These objects are then distributed across the rooms. 
- **The Hybrid Rule**: Every object and piece of furniture in a room is a hybrid. A "Zenith" Culture mixed with a "Near-Future" Timeline produces "Holographic Marble Columns" or "Laser-Etched Statues."

---

## 3. Data Generation Rules

1. **Floor Dominance**: The Floor forces all inhabitants into its Cultural style. You cannot find a Victorian sofa on a Shogun floor.
2. **Apartment Specificity**: The Timeline is localized to the apartment. You can walk from a 1980s Analog apartment into a High-Tech Future apartment on the same floor.
3. **Budgeted Objects**: To maintain a sense of space, the Apartment decides how many objects it contains in total. Rooms share this pool, ensuring some rooms are cluttered while others are eerie and empty.

---

## 4. Expansion Guide

Expanding the game's variety is done by adding plain-text files to the resource directories. No code changes are required to add new themes.

### To add a Culture:
Create `src/main/resources/themes/cultures/[name].txt`.
- List stylistic nouns: `marble, pillar, toga, white_stone, leaf_crown`.

### To add a Timeline:
Create `src/main/resources/themes/timelines/[name].txt`.
- List technological nouns: `crt_monitor, floppy_disk, glowing_wire, gravity_plate`.

### The "Glitch" Generator
The engine takes one noun from the active **Culture** and one from the active **Timeline** to create unique, mismatched descriptions on the fly.
