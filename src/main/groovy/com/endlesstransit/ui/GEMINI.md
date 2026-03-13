# Domain Invariants: The Visual Interface

**ARCHITECTURAL CONSTRAINTS**
- **Cyber-Brutalist Mandate:** UI must feel high-density and data-heavy. Monospaced alignment and boxed HUDs are non-negotiable.
- **Reactive Observation:** The UI observes the model but MUST NOT be called directly by it.
- **Mandatory Virtualization:** All output MUST go through `RenderSink`. Physical `System.out.println` is forbidden.
- **Visual Invariants:** Use `Terminal.getVisualWidth()` for icon/ANSI-aware alignment.

## 👁️ Aesthetics & "Vibe"
- **Style**: Cyber-Brutalist. High contrast, data-heavy.
- **Styling**: Exclusively use `Terminal` color constants.

## 🏗️ Technical Invariants
1. **Column Alignment**: All borders MUST use icon-aware width logic.
2. **Deterministic ANSI**: Use `Terminal` constants; no raw escape codes.
3. **Mandatory Virtualization**: Output goes through `RenderSink`.
4. **Adapter Pattern**: `TerminalAdapter` MUST be injected into `ModelOutput.fmt`.

## 📡 Diagnostic Sinks
- **Active System**: @docs/design/DIAGNOSTIC_SUITE_DESIGN.md
- **`MemorySink`**: Screen state for screenshots.
- **`VirtualBuffer`**: Circular buffer for history.
- **`VisualAssertionEngine`**: Tool for verifying TUI layout invariants.

## 🏛️ Verification Checklist
- [ ] **Visual Baseline**: Mandatory `./vinc.sh --scan` for all UI/Model changes.
- [ ] **Vibe Regression**: Markers (`RADAR`, `ELEVATOR`) are checked.
- [ ] **Alignment Check**: Verified at 100-character width.

## 🧬 Localized Lessons
- **UI Domain Lessons**: @tasks/lessons/ui.md
