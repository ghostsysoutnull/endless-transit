# Gemini CLI Instructions for Endless Transit

## Project Overview
Endless Transit is a procedural text adventure. The codebase is organized into a modular structure following standard JVM/Groovy conventions.

## Engineering Standards
- **Modular Class Structure**: Keep one class per file in `src/main/groovy/com/endlesstransit/`.
- **Procedural Generation**: When adding new features, maintain the random/procedural nature of the game.
- **Resource Management**: New data files for room generation should be placed in `src/main/resources/objects/`.

## Key Commands
- **Run Game**: `groovy -cp src/main/groovy Main.groovy`
- **Add Tests**: Use Spock framework for testing (to be implemented).

## Contextual Notes
- The `Room` class dynamically loads its list of objects from the `src/main/resources/objects/` directory at startup.
- The game uses a simple console-based UI. Avoid adding complex dependencies unless requested.
