# UI Domain Lessons

## Patterns
- **ANSI Encapsulation**: Keep all color and cursor logic in `Terminal.groovy`.
- **Vibe Consistency**: Use typewriter effects for narrative text but instant rendering for frequently refreshed HUD elements.

## Mistakes/Corrections
- **Terminal Buffering**: Always call `System.out.flush()` after printing partial lines (like in `typewrite`) to ensure real-time feedback in all terminal emulators.
- **Visual Width (Surrogates)**: Standard `String.length()` fails for emojis and symbolic icons. Use `codePointAt` iteration to correctly identify 2-cell wide characters for HUD alignment.
- **ANSI-Safe Truncation**: Never use `String.substring()` on strings containing ANSI codes. It can cut codes in half, leading to "ghost" colors and UI corruption. Implement logic that tracks escape sequences during truncation.
