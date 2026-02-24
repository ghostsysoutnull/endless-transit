@GEMINI.custom.md

# Endless Transit - Development Context

## Project Overview
Endless Transit is a procedural universe simulation and text-based adventure written in Groovy. It features an infinite, hierarchical world navigated through a "Cyber-Terminal" aesthetic.

### Project Domains
@src/main/groovy/com/endlesstransit/core/GEMINI.md
@src/main/groovy/com/endlesstransit/model/GEMINI.md
@src/main/groovy/com/endlesstransit/ui/GEMINI.md
@src/main/groovy/com/endlesstransit/procgen/GEMINI.md

## Commands

### Running the Game
```bash
./run.sh
```

### Running Tests
```bash
./run.sh --test
```

### Backups
```bash
./backup.sh
```

## Global Development Conventions

@tasks/lessons/infrastructure.md

### 1. Workflow & Planning (Mandatory)
- **Plan First**: Write task plans to `tasks/todo.md` before implementation.
- **Verification**: Never mark a task complete without proving it works via tests or manual verification.
- **Lessons Learned**: Update `tasks/lessons.md` after any correction or major learning to prevent recurring mistakes.
- **Autonomous Bug Fixing**: Fix reported bugs directly; use logs and failing tests to identify root causes.
- **Elegance**: For non-trivial tasks, prioritize architectural elegance over "hacky" fixes.

### 2. Code Standards
- **Logging**: Use the `Logger` class for debug and error tracking.
- **Package Integrity**: Maintain the domain separation (core, model, ui, procgen). Do not introduce circular dependencies between domains.

## Key Files
- `src/main/groovy/com/endlesstransit/Main.groovy`: Entry point.
- `src/main/groovy/com/endlesstransit/core/Game.groovy`: Main loop.
- `src/main/groovy/com/endlesstransit/model/Location.groovy`: Core interface.
- `src/main/groovy/com/endlesstransit/ui/Terminal.groovy`: TUI utility.
