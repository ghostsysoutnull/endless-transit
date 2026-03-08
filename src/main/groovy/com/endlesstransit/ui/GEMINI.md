# UI Domain: The Visual Interface

## 👁️ Aesthetics & "Vibe"
- **Style**: Cyber-Brutalist. Data-heavy, high contrast.
- **Styling**: Exclusively use `Terminal.colorize()`, `Terminal.dim()`, and `Terminal.bold()`. 

## 🏗️ Technical Invariants
1. **Column Alignment**: All right-aligned borders MUST use `Terminal.getVisualWidth()` to account for icons/emojis.
2. **Deterministic ANSI**: Never hardcode raw escape codes; use the `Terminal` constants.
3. **Stateful Rendering**: The UI is now transitioning to a `RenderSink` model.

## 📡 Diagnostic Sinks
- **Active System:** @docs/design/DIAGNOSTIC_SUITE_DESIGN.md
- **`MemorySink`**: Capture screen state for screenshots.
- **`VirtualBuffer`**: Circular buffer for historical UI state.

## 🏛️ Verification Checklist
- [ ] UI alignment check at 100-character width.
- [ ] Color consistency across location vibe shifts.
- [ ] Proper terminal cleanup on exit/crash.

## 🧬 Localized Lessons
@../../../../../../tasks/lessons/ui.md
