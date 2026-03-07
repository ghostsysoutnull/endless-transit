# UI Domain Lessons

## Patterns
- **ANSI Encapsulation**: Keep all color and cursor logic in `Terminal.groovy`.
- **Vibe Consistency**: Use typewriter effects for narrative text but instant rendering for frequently refreshed HUD elements.
- **MapBuffer Composition**: Use a 2D buffer (`MapBuffer`) for complex ASCII maps. This allows for layer-based rendering (e.g., drawing the background, then plotting entities) and handles color transitions efficiently by minimizing ANSI escape sequence repeats.
- **Semantic UI Labels**: Use a centralized `HUDLabels` class to manage all HUD strings (`LOCUS_INDEX`, `STRATA`, etc.). This prevents "Semantic Drift" where AI agents inconsistently rename UI elements.
- **Absolute Positioning (CHA)**: Use the `\u001b[nG` (Cursor Horizontal Absolute) escape sequence for all right-side borders. This bypasses the need for complex character-width calculations for 2-cell icons and ANSI codes.
- **Visual Width Validation**: Use `TUIValidator.getVisualWidth()` instead of `String.length()` to account for emojis and icons during manual padding operations.

## Mistakes/Corrections
- **Terminal Buffering**: Always call `System.out.flush()` after printing partial lines (like in `typewrite`) to ensure real-time feedback in all terminal emulators.
- **Visual Width (Surrogates)**: Standard `String.length()` fails for emojis and symbolic icons. Use `codePointAt` iteration to correctly identify 2-cell wide characters for HUD alignment.
- **ANSI-Safe Truncation**: Never use `String.substring()` on strings containing ANSI codes. It can cut codes in half, leading to "ghost" colors and UI corruption. Implement logic that tracks escape sequences during truncation.
- **Border Alignment (CHA)**: Calculating the visual width of mixed icons and emojis is notoriously unreliable across different terminals. Use the **Cursor Horizontal Absolute** (`\u001b[nG`) escape sequence to force-position the right border of a HUD box. This bypasses the need for accurate character-width guessing.
- **Infinite String Manipulation Loops**: When implementing truncation or sparklines (like `getLatticeSparkline`), ensure that the reduction step actually modifies the collection being checked. Using `take()` (which returns a new list) instead of `removeAt()` in a while loop will cause a permanent freeze.
- **Ellipsis Overflow**: Adding an ellipsis (`...`) during a truncation loop can increase the visual width, potentially negating the reduction step and causing an infinite loop if not handled carefully.
