# Vinculum Diagnostic Suite: Master Implementation Plan

This document tracks the execution of the `DIAGNOSTIC_SUITE_DESIGN.md` architecture. Development is split into logical phases, ensuring iterative delivery of value without breaking the existing `Game` loop.

---

## Phase 1: Output Abstraction & The Virtual Buffer
**Goal:** Decouple `System.out` from the procedural generation logic, establishing the foundation for both screenshots and headless testing.

- [ ] **1.1 Introduce `RenderSink` Abstractions**
  - Create the `RenderSink` interface.
  - Implement `ConsoleSink` (standard stdout).
  - Implement `MemorySink` (in-memory list of strings).
  - Implement `TeeSink` (Decorator to split output).
- [ ] **1.2 The `VirtualBuffer` & Terminal Refactor**
  - Refactor `Terminal.groovy` to push rendered lines to a `VirtualBuffer`.
  - Replace direct `println` calls in high-level game logic (e.g., `BridgeView`, `SessionRecap`) with calls to the `Terminal`/`VirtualBuffer`.
- [ ] **1.3 Environment Strategy**
  - Implement basic `EnvironmentStrategy` to route sinks based on runtime flags (e.g., `--test` uses `MemorySink`).

---

## Phase 2: The Screenshot Engine
**Goal:** Implement the ability to capture, format, and save the visual state of the game without blocking the main thread.

- [ ] **2.1 Core Capture Abstractions**
  - Implement `ScreenBuffer` (Value Object with Metadata Header).
  - Implement `ScreenshotProvider` interface and apply it to `BridgeView`.
- [ ] **2.2 Formatting Strategies**
  - Implement `AnsiFormatter` (raw ANSI).
  - Implement `PlainFormatter` (ANSI stripping).
- [ ] **2.3 The `CaptureService`**
  - Implement asynchronous file writing (Producer-Consumer).
  - Implement deterministic file naming (`screenshot_${LIP}_${TIMESTAMP}.txt`).
- [ ] **2.4 UI Integration**
  - Add `ScreenshotRegistry` to allow multiple components to register.
  - Implement `CaptureCommand` and map it to a key (e.g., `P` or `F12`) in `ActionMapper`.
  - Connect the service to the Event Ticker to display success/failure notifications.

---

## Phase 3: Headless Simulation & Deterministic Replay
**Goal:** Abstract player input to allow the game to "play itself" using scripts, enabling massive automated test coverage.

- [ ] **3.1 Input Abstraction**
  - Create the `InputSource` interface.
  - Refactor `InputHandler` to depend on `InputSource` rather than `System.in`.
  - Implement `RealTerminalSource` and `MockInputSource`.
- [ ] **3.2 Time Abstraction ("Instant Mode")**
  - Implement a `ClockStrategy` in the `Terminal` to bypass UI delays (`Thread.sleep`) during headless runs.
- [ ] **3.3 The `HeadlessRunner` Test Harness**
  - Create a test runner that initializes the game with a specific Master Seed and a `MockInputSource` script.
  - Ensure the runner can execute a full script and capture the final `ScreenBuffer` for assertions.
- [ ] **3.4 Regression Replay Service**
  - Implement the service to parse a `CaptureResult` (seed + input history) and dynamically generate an executable JUnit test.

---

## Phase 4: Verification & Advanced Auditing
**Goal:** Move beyond string-matching tests to structural assertions and implement time-travel debugging.

- [ ] **4.1 `VisualAssertionEngine`**
  - Build the Interpreter/DSL for asserting against the `ScreenBuffer` (e.g., `expect(screen).isBoxedCorrectly()`).
  - Update existing fragile UI tests to use the new assertion engine.
- [ ] **4.2 The `SeedScanner` (Discovery Engine)**
  - Implement `WorldProbe` (Specification Pattern).
  - Build the headless `SeedScanner` service to iterate seeds and apply the Visitor Pattern to find matches.
  - Create the `SeedVault` to persist discovered scenario seeds for the test suite.
- [ ] **4.3 State Injection (Memento Pattern)**
  - Implement Memento creation for the `Game` and `Location` state.
  - Allow the `HeadlessRunner` to load a Memento mid-script for fast-forward debugging.

---

## Future Roadmap (Phase 5+)
- [ ] `IntegrityAuditor` (Background Aspect-Oriented invariant checking).
- [ ] `HtmlFormatter` (for high-fidelity web galleries).
- [ ] Resource Management/Rotation for the `CaptureService` directory.
- [ ] `FuzzInputSource` for automated stress testing.
- [ ] Visual Diffing for automated regression detection.