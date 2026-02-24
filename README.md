# Endless Transit

A procedural universe simulation and text-based adventure written in Groovy. Explore infinite scales of space, from cosmic filaments to individual rooms, through an immersive cybernetic terminal interface.

## 🚀 Getting Started

### Prerequisites
- Groovy 4.x+
- A terminal with ANSI color support

### Running the Game
The easiest way to launch is via the provided shell script:
```bash
./run.sh
```

### Running Tests
Standardized tests are located in `src/test/groovy`:
```bash
./run.sh --test
```

## 🏗️ Project Architecture

The codebase is organized into functional domains to optimize for modularity and AI-agent collaboration:

- **`core`**: Game engine, player state, and system services.
- **`model`**: The hierarchical world structure (Universe -> Room).
- **`procgen`**: Procedural logic including Gematria frequency calculations.
- **`ui`**: Cyber-Terminal TUI utilities and theme management.

### Key Directories
- `src/main/groovy/com/endlesstransit/`: Source code.
- `src/test/groovy/com/endlesstransit/`: Standardized test suite.
- `src/main/resources/themes/`: Cultural and temporal assets for procedural generation.
- `docs/`: Design specifications and optimization roadmaps.

## 🤖 AI-Agent Optimized
This project uses **Context Localization**. Each domain directory contains its own `GEMINI.md` file, providing surgical context and "vibe" instructions for AI-driven development.

## 🌌 Gameplay Features
- **Infinite Procedural Scale**: Navigate a seamless hierarchy of generated spaces.
- **Cyber-Terminal HUD**: Real-time diagnostic readout of coordinates, depth, and neural coherence.
- **Quantum Trace Buffer**: Holographic inventory for collecting and synthesizing spectral fragments.
- **Gematria Logic**: Mysterious frequency-based object generation derived from hierarchical depth.

## 🛠️ Development Workflow
- **Plan First**: All non-trivial tasks start with a plan in `tasks/todo.md`.
- **Domain Integrity**: Maintain strict separation between core logic and procedural generation.
- **Vibe Coding**: Prioritize aesthetic immersion and structural elegance.
