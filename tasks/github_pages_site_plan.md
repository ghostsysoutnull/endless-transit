# Implementation Plan: GitHub Pages "Neural Link Manual"

## Objective
To create an immersive, terminal-styled project site on GitHub Pages that introduces players to the world of Endless Transit, its lore, mechanics, and technical foundations.

## Phase 1: Content Modules (Writing & Copy)
- [x] **Module A: SYSTEM_INITIALIZATION (The Hook)**
    - [x] Narrative introduction: You are the Observer.
    - [x] Project objective and "The Transit" lore.
- [x] **Module B: THE_LATTICE_ATLAS (World & Lore)**
    - [x] Detailed breakdown of the World Hierarchy.
    - [x] Descriptions of the 6 core cultures (Rust, Neon, Baroque, etc.).
    - [x] The "Bedrock" and Abyssal Substrate primer.
- [x] **Module C: OPERATIONAL_PROTOCOLS (Mechanics)**
    - [x] Coherence and Integrity rules.
    - [x] Gematria and Frequency scanning logic.
    - [x] The Synthesis Ritual (Breaching the Bedrock).
- [x] **Module D: LINK_NAVIGATION (How to Play)**
    - [x] Input guide (u, d, f, b, l, i, m, sync).
    - [x] Inventory management and Keystone synthesis.
- [x] **Module E: THE_SUBSTRATE_CODE (Technical)**
    - [x] Deterministic seeding explanation.
    - [x] Locus Index Paths (LIP) and infinite save logic.
    - [x] Split-pane rendering architecture.

## Phase 2: Visual Design (Jekyll/CSS)
- [x] **Terminal Vibe**:
    - [x] Deep black background, glowing cyan/green text.
    - [x] Monospaced font stack (Fira Code / JetBrains Mono).
- [x] **Adaptive Layout**:
    - [x] Implement a split-pane web layout (Content on left, HUD/Map on right).
    - [x] CSS "Typewriter" effect for headers.
- [x] **Navigation**:
    - [x] ASCII-styled top navigation bar.

## Phase 3: Assets & Showcase
- [ ] **Asciinema Integrations**:
    - [ ] Record and embed a "Standard Traversal" session.
    - [ ] Record and embed an "Abyssal Breach" ritual.
- [ ] **SVG Diagrams**:
    - [ ] Create high-quality SVG versions of the vertical tree and spatial maps.
- [ ] **Seed Gallery**:
    - [ ] Showcase 3-5 "Stable Loci" (famous seeds).

## Phase 4: Integration & Deployment
- [ ] **README Overhaul**:
    - [ ] Clean up `README.md` to act as a "Link Gateway."
    - [ ] Add tech badges and link to the Manual.
- [ ] **GitHub Pages Config**:
    - [ ] Set up the `docs/` or `gh-pages` branch.
    - [ ] Configure custom domain (optional).
