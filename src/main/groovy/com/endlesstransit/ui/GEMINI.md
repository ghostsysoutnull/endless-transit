# UI Domain - Development Context

## Aesthetics & "Vibe"
- **Style**: Cyber-Terminal / Borg-inspired. Data-heavy, high contrast, minimalist but immersive.
- **Styling**: Exclusively use `Terminal.colorize()`, `Terminal.dim()`, and `Terminal.bold()`. Avoid raw ANSI escape codes in game logic.
- **Rendering**: Interactive descriptions and room data should use `Terminal.typewrite()` with appropriate delays (default ~5-10ms).
- **HUD**: Maintain the standard HUD layout:
    - Coherence Bar (Green/Yellow/Red)
    - Scanning status
    - Lattice Identity (Class Name) >> Name
    - Locus Hash (Coordinates) and Hop Density (Depth)
    - Pulse Traversal (Steps) and Trace Buffer status.

## Key Utilities
- `Terminal.groovy`: Core ANSI and TUI utility class.
- `ThemeManager.groovy`: Manages cultures and timelines for procedural descriptions.

## Guidelines
- When adding new TUI elements, ensure they respect the `Terminal` utility class.
- Descriptions should support "glitch" effects when player coherence is low (`Terminal.glitchText`).
