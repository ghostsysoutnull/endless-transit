# Core Engine - Development Context

## Game Loop
- `Game.groovy` manages the primary while-loop, input processing, and location transitions.
- **Coherence**: Constant drain per step. If coherence drops to 0, the neural link is severed (reboot to start).

## Player State
- `Player.groovy` tracks step count, coherence, and the "Quantum Trace Buffer" (Inventory).
- **Inventory**: Limited to 16 fragments. Supports merging (synthesis) which restores coherence.

## System Services
- **Logging**: Use `Logger.groovy` for all internal state tracking and error reporting.
- **Persistence**: `JournalManager.groovy` logs major discoveries and session summaries to `journal.txt`.

## Guidelines
- Avoid putting UI styling or procedural generation math directly in `Game.groovy`. Delegate to `ui` and `procgen` domains.
- When entering a new location, always use `game.enterLocation(target)` to ensure visited paths and journal entries are handled.

## Localized Lessons
@tasks/lessons/core.md
