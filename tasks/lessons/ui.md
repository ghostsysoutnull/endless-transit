# UI Domain Lessons

## Patterns
- **ANSI Encapsulation**: Keep all color and cursor logic in `Terminal.groovy`.
- **Vibe Consistency**: Use typewriter effects for narrative text but instant rendering for frequently refreshed HUD elements.

## Mistakes/Corrections
- **Terminal Buffering**: Always call `System.out.flush()` after printing partial lines (like in `typewrite`) to ensure real-time feedback in all terminal emulators.
- **Visual Width (Surrogates)**: Standard `String.length()` fails for emojis and symbolic icons. Use `codePointAt` iteration to correctly identify 2-cell wide characters for HUD alignment.
- **ANSI-Safe Truncation**: Never use `String.substring()` on strings containing ANSI codes. It can cut codes in half, leading to "ghost" colors and UI corruption. Implement logic that tracks escape sequences during truncation.
- **Border Alignment (CHA)**: Calculating the visual width of mixed icons and emojis is notoriously unreliable across different terminals. Use the **Cursor Horizontal Absolute** (`\u001b[nG`) escape sequence to force-position the right border of a HUD box. This bypasses the need for accurate character-width guessing.
- **Infinite String Manipulation Loops**: When implementing truncation or sparklines (like `getLatticeSparkline`), ensure that the reduction step actually modifies the collection being checked. Using `take()` (which returns a new list) instead of `removeAt()` in a while loop will cause a permanent freeze.
- **Ellipsis Overflow**: Adding an ellipsis (`...`) during a truncation loop can increase the visual width, potentially negating the reduction step and causing an infinite loop if not handled carefully.
