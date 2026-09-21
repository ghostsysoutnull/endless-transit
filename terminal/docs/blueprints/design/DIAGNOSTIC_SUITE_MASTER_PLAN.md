# Vinculum Diagnostic Suite: Master Implementation Plan

This document tracks the execution of the `DIAGNOSTIC_SUITE_DESIGN.md` architecture. Development is split into logical phases, ensuring iterative delivery of value without breaking the existing `Game` loop.

---

## Phase 1: Output Abstraction & The Virtual Buffer
**Goal:** Decouple `System.out` from the procedural generation logic, establishing the foundation for both screenshots and headless testing.

- [x] **1.1 Introduce `RenderSink` Abstractions**
- [x] **1.2 The `VirtualBuffer` & Terminal Refactor**
- [x] **1.3 Environment Strategy**

---

## Phase 2: The Screenshot Engine
**Goal:** Implement the ability to capture, format, and save the visual state of the game without blocking the main thread.

- [x] **2.1 Core Capture Abstractions**
- [x] **2.2 Formatting Strategies**
- [x] **2.3 The `CaptureService`**
- [x] **2.4 UI Integration**

---

## Phase 3: Headless Simulation & Deterministic Replay
**Goal:** Abstract player input to allow the game to "play itself" using scripts, enabling massive automated test coverage.

- [x] **3.1 Input Abstraction**
- [x] **3.2 Time Abstraction ("Instant Mode")**
- [x] **3.3 The `HeadlessRunner` Test Harness**
- [x] **3.4 Regression Replay Service**

---

## Phase 4: Verification & Advanced Auditing
**Goal:** Move beyond string-matching tests to structural assertions and implement time-travel debugging.

- [x] **4.1 `VisualAssertionEngine`**
- [x] **4.2 The `SeedScanner` (Discovery Engine)**
- [x] **4.3 State Injection (Memento Pattern)**

---

## Future Roadmap (Phase 5+)
- [ ] `IntegrityAuditor` (Background Aspect-Oriented invariant checking).
- [ ] `HtmlFormatter` (for high-fidelity web galleries).
- [ ] Resource Management/Rotation for the `CaptureService` directory.
- [ ] `FuzzInputSource` for automated stress testing.
- [ ] Visual Diffing for automated regression detection.