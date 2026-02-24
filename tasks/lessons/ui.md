# UI Domain Lessons

## Patterns
- **ANSI Encapsulation**: Keep all color and cursor logic in `Terminal.groovy`.
- **Vibe Consistency**: Use typewriter effects for narrative text but instant rendering for frequently refreshed HUD elements.

## Mistakes/Corrections
- **Terminal Buffering**: Always call `System.out.flush()` after printing partial lines (like in `typewrite`) to ensure real-time feedback in all terminal emulators.
