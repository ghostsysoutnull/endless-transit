# Domain Invariants: The Visual Interface

> Gemini equivalent: `GEMINI.md` (same directory)

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
4. **Adapter Pattern**: `OutputFormatter` (e.g. `StandardTerminalAdapter`) is instantiated once in `Game` and injected into model objects via `ProceduralFactory`. The model accesses it as the `fmt` field — never via a static reference.

## 🧩 Bridge Composition (Phase 7)
- **`BridgeView`** is a compositor only: it owns one instance of each `ViewComponent` and prints their lines in frame order.
- **`ViewComponent.render(RenderContext, int width)`** returns lines and never prints; `width` is the width allotted by the compositor (`FrameGeometry`: frame 130, split 90, panes 86 / 38).
- **Components:** `HUDHeaderComponent`, `NarrativePaneComponent`, `TelemetryComponent`, `CompassComponent`, `DirectiveMenuComponent`, `InventoryOverlayComponent`, `LatticeTraceComponent`, `LatticeMapComponent`.
- **Frame inputs only:** a component reads `RenderContext` and nothing else — no `core` statics, no services. The ticker lines arrive as `ctx.recentEvents`, supplied by the compositor from `Game.journal` (HK-011); a component that reaches for `JournalManager` is a bug.
- **Determinism:** every source of HUD noise draws from `FrameEntropy.forFrame(ctx)` (location LIP + step count). A `new Random()` in a component is a bug — it surfaces as a flaky golden.
- **Box lines:** build with `Terminal.boxTop/boxedLine/splitBoxedLine/boxSeparator/boxBottom` (strings); `draw*` only print them.

## 📡 Diagnostic Sinks
- **Active System**: @docs/design/DIAGNOSTIC_SUITE_DESIGN.md
- **`MemorySink`**: Screen state for screenshots.
- **`VirtualBuffer`**: Circular buffer for history.
- **`VisualAssertionEngine`**: Tool for verifying TUI layout invariants.

## 🏛️ Verification Checklist
- [ ] **Visual Baseline**: the golden frames (`src/test/groovy/com/endlesstransit/ui/golden/`, 36 frames, raw bytes) must be unchanged unless the change is intended — then `./vinc.sh --goldens`, review the diff, commit goldens with the change. `./vinc.sh --scan` is a model gate, not a UI gate.
- [ ] **Vibe Regression**: Markers (`RADAR`, `ELEVATOR`) are checked.
- [ ] **Alignment Check**: Verified at 100-character width.

## 🧬 Localized Lessons
- **UI Domain Lessons**: @tasks/lessons/ui.md
