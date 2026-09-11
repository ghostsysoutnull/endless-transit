# UI Domain Lessons

## Patterns
- **ANSI Encapsulation**: Keep all color and cursor logic in `Terminal.groovy`.
- **Vibe Consistency**: Use typewriter effects for narrative text but instant rendering for frequently refreshed HUD elements.
- **MapBuffer Composition**: Use a 2D buffer (`MapBuffer`) for complex ASCII maps. This allows for layer-based rendering (e.g., drawing the background, then plotting entities) and handles color transitions efficiently by minimizing ANSI escape sequence repeats.
- **Semantic UI Labels**: Use a centralized `HUDLabels` class to manage all HUD strings (`LOCUS_INDEX`, `STRATA`, etc.). This prevents "Semantic Drift" where AI agents inconsistently rename UI elements.
- **Absolute Positioning (CHA)**: Use the `\u001b[nG` (Cursor Horizontal Absolute) escape sequence for all right-side borders. This bypasses the need for complex character-width calculations for 2-cell icons and ANSI codes.
- **Visual Width Validation**: Use `TUIValidator.getVisualWidth()` instead of `String.length()` to account for emojis and icons during manual padding operations.
- **Output Virtualization (RenderSink)**: Decouple `System.out` from the UI by using a `RenderSink` abstraction. This allows the game to "render" to memory buffers (`MemorySink`) for screenshots or automated visual assertions without a physical terminal.
- **Visual Assertion DSL**: Instead of brittle string matching, use a `VisualAssertionEngine` that operates on the `ScreenBuffer` to verify structural invariants (e.g., "is the HUD boxed correctly?").

- **A gate that never draws the screen is not a UI gate**: `./vinc.sh --scan` runs `SeedScanner` and never constructs `BridgeView`; two phases reported "scan identical" as their visual gate for `ui` changes and the check was vacuous. Before trusting any gate, confirm what it exercises. The UI gate is `BridgeViewGoldenFrameTest` (goldens under `src/test/groovy/com/endlesstransit/ui/golden/`, regenerated only via `./vinc.sh --goldens` after an intended visual change). Phase 7, 2026-09-11.
- **Random output cannot be pinned — run the capture twice first**: before choosing golden frames, capture every screen twice and diff. Anything that differs is masked with a documented regex (the wall-clock spectrogram) or excluded (abyssal voices/static, low-coherence glitches), and the cause is logged for a seed fix (HK-001). Never "pin" a frame you have not seen reproduce. Resolved 2026-09-11 (HK-001): every HUD noise source now draws from `FrameEntropy.forFrame(ctx)` and goldens are compared raw — keep it that way; a new `new Random()` in a component will surface as a flaky golden.
- **Synthetic-input frames pin branches the seed walk never reaches**: a component that reads only its inputs (option keys, a location's vibe) can be rendered with hand-built inputs. Four such goldens closed every UNGUARDED verdict in Phase 7 (compass D-active, menu skip-list forms, deep lattice trace, map error at a leaf).

## Mistakes/Corrections
- **Terminal Buffering**: Always call `System.out.flush()` after printing partial lines (like in `typewrite`) to ensure real-time feedback in all terminal emulators.
- **Visual Width (Surrogates)**: Standard `String.length()` fails for emojis and symbolic icons. Use `codePointAt` iteration to correctly identify 2-cell wide characters for HUD alignment.
- **ANSI-Safe Truncation**: Never use `String.substring()` on strings containing ANSI codes. It can cut codes in half, leading to "ghost" colors and UI corruption. Implement logic that tracks escape sequences during truncation.
- **Border Alignment (CHA)**: Calculating the visual width of mixed icons and emojis is notoriously unreliable across different terminals. Use the **Cursor Horizontal Absolute** (`\u001b[nG`) escape sequence to force-position the right border of a HUD box. This bypasses the need for accurate character-width guessing.
- **Infinite String Manipulation Loops**: When implementing truncation or sparklines (like `getLatticeSparkline`), ensure that the reduction step actually modifies the collection being checked. Using `take()` (which returns a new list) instead of `removeAt()` in a while loop will cause a permanent freeze.
- **Ellipsis Overflow**: Adding an ellipsis (`...`) during a truncation loop can increase the visual width, potentially negating the reduction step and causing an infinite loop if not handled carefully.
- **ANSI-Aware Capture**: When capturing the screen state for tests, ensure the sink can differentiate between raw ANSI (for screenshots) and stripped text (for logic assertions). Using raw ANSI in assertions will fail due to escape code mismatches.
