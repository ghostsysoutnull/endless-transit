# Vinculum Diagnostic & Simulation Suite: Architectural Design

This document outlines the architectural blueprint for a state-of-the-art diagnostic, simulation, and screenshot system for the **Endless Transit** procedural engine. The design prioritizes **Separation of Concerns (SoC)**, **Dependency Inversion**, and **Determinism**.

---

## 1. System Vision: The "Closed-Loop" Testing Environment
The goal is to transition the game from a procedural CLI application into a **Stateful Rule Engine** that can be driven by a variety of inputs (Real User, Mock Script, Fuzzer) and verified through a variety of sinks (Console, Screenshot, Automated Assertions).

### Core Components
- **System A: Capture & Screenshot Logic** (The "Camera")
- **System B: Headless Input & Execution** (The "Pilot")
- **System C: Seed Discovery & Probing** (The "Cartographer")
- **System D: Verification & State Injection** (The "Auditor & Time-Machine")

---

## 2. Capture & Screenshot Architecture

To capture visual errors and verify the procedural UI's integrity, we treat the screen as an **Immutable Value Object**.

### `ScreenBuffer` (Value Object)
- **Responsibility:** Holds an immutable snapshot of the terminal's state.
- **Data:** `List<String> lines`, `long timestamp`, `String locationPath` (LIP), and a **Metadata Header** (Master Seed, Step Count, Version).

### `ScreenshotProvider` (Interface)
- **Responsibility:** A contract for any component capable of producing a `ScreenBuffer`.
- **Primary Implementation:** `BridgeView` will implement this interface by returning its last rendered frame.

### `ScreenshotRegistry` (Registry Pattern)
- **Responsibility:** A central repository for all `ScreenshotProvider` instances.
- **Benefit:** Allows the `CaptureService` to take a "Full System State" snapshot by iterating through multiple providers (e.g., Main HUD, Inventory Buffer, Journal Log).
- **Pattern:** Follows the **Observer/Composite** approach to manage multiple snapshottable components.

### `CaptureService` (Singleton/Facade)
- **Responsibility:** Orchestrates the capture process.
- **Naming Convention:** `screenshot_${LIP}_${TIMESTAMP}.txt`
- **Workflow:**
    1. Triggers the provider for a `ScreenBuffer`.
    2. Uses a **Strategy Pattern** (`FormatStrategy`) to decide the output format:
        - `RawAnsiStrategy`: For terminal playback.
        - `CleanTextStrategy`: Strips ANSI for documentation/bug reports.
        - `HtmlStrategy`: For visual galleries.
    3. Handles **Asynchronous I/O** via a dedicated background thread (Producer-Consumer) to avoid blocking the main game loop.
- **Atomic Snapshots:** The service enforces **Render Synchronization**, ensuring a snapshot is only granted when the provider is in a `STABLE_RENDER` state (not mid-animation or during a glitched frame).
- **Result Pattern:** Returns an immutable `CaptureResult` object containing the generated file path, metadata hash, and any diagnostic warnings (e.g., "Partial Buffer Detected").

### `CaptureCommand` (Command Pattern)
- **Responsibility:** Encapsulates the request to take a screenshot.
- **Trigger:** Mapped in `ActionMapper` to keys like `P` or `F12`.
- **Execution:** When triggered, the command invokes `CaptureService.capture(bridgeView)`.

---

## 3. Output Abstraction: From `println` to `RenderSink`

To enable the screenshot feature, we must decouple the game's output from the physical terminal hardware.

### Environment-Aware Configuration
- **Environment Strategy Pattern:** Manages where diagnostic data is stored.
    - `ProdEnvironment`: Saves to a managed `screenshots/` directory with rotation limits.
    - `TestEnvironment`: Redirects output to temporary directories or `/dev/null` to prevent workspace clutter during automated CI runs.

### The Evolution of the `Terminal` Class
- **From Utility to Abstraction:** The `Terminal` class shifts from being a static collection of ANSI constants to a managed **Output Mediator**.
- **Virtualization:** We introduce a `VirtualBuffer` (or a `CircularBuffer`) inside the `Terminal` wrapper. Every character or line "printed" is simultaneously pushed to this buffer, creating a "Visual State" that can be queried at any moment.
- **Decorator Pattern:** We can wrap the standard output stream in a `TeeOutputStream`. This splits the data: one stream goes to the physical screen, and the other is captured by the `CaptureService` buffer.

### `RenderSink` (The Destination)
Instead of hardcoding `println` into the logic, we use the **Strategy Pattern** to define where a frame goes:
- **`ConsoleSink`:** The standard real-time output for the player.
- **`MemorySink`:** Used for screenshots and simulation, storing frames as objects.
- **`TeeSink` (Decorator):** Splits the output stream, sending it to the console and the memory buffer simultaneously.

### `BridgeView` as Mediator
- **Mediator Pattern:** `BridgeView` acts as the mediator between the raw procedural data (the world) and the physical output (`RenderSink`). It is the "Expert" on the final visual frame.

### Formatter Strategies
- **Strategy Pattern:** Decouples the visual data from its storage format.
    - `AnsiFormatter`: Preserves raw escape codes for console-perfect playback.
    - `PlainFormatter`: A specialized visitor that strips all non-printable metadata and ANSI codes for clean bug reports.
    - `HtmlFormatter`: Converts ANSI metadata to CSS styles for high-fidelity web viewing.

---

## 4. Headless Input & Simulation

To enable automated verification, the source of player input and the progression of time are abstracted.

### `InputSource` (Interface)
- **`RealTerminalSource`:** Reads from the actual console/scanner.
- **`MockInputSource`:** Reads from a pre-defined command script (e.g., `["f", "01", "u", "quit"]`).
- **`FuzzInputSource`:** Generates random navigation commands for stress testing.

### Time Abstraction & "Instant Mode"
- **The Problem:** UI animations (typewriter effects, glitched delays) slow down automated tests.
- **The Solution:** The `Terminal` abstraction supports a "Clock Strategy."
    - **Standard Clock:** Normal delays for human players.
    - **Instant Clock:** Skips all delays, allowing 1,000 turns to execute in milliseconds for simulation and testing.

### `InputHandler` & `Game` Integration
- The `InputHandler` no longer "owns" the scanner. Instead, it **delegates** to the injected `InputSource`.
- The `Game` class accepts the source via **Dependency Injection** at instantiation, allowing for a "Headless Runner" to drive the game at CPU speeds rather than human speeds.

### `HeadlessRunner` (Test Harness)
- Manages the lifecycle of a simulated game session.
- Allows for **Instant Mode** rendering, skipping all typewriter delays or UI pauses.
- Captures the final `ScreenBuffer` and performs assertions on the world state without opening a real window.
- **Deterministic Playback:** Combine the **Seed** + **Input Script** to ensure a bug found in the simulator can be perfectly reproduced in the `HeadlessRunner`.

---

## 5. Verification & State Injection

Advanced systems for ensuring structural integrity and enabling efficient debugging through time-traveling state management.

### `VisualAssertionEngine` (Interpreter Pattern)
- **Responsibility:** Operates on the `ScreenBuffer` using a Domain-Specific Language (DSL) to verify visual invariants.
- **Example Use:** `expect(screen).isBoxedCorrectly()`, `expect(screen).hasLayout("Apartment_Unit_Diagnostics")`.
- **Benefit:** Decouples test logic from brittle string matching, allowing for robust structural verification.

### `Memento Pattern` (State Injection / Time Travel)
- **Responsibility:** Allows the `HeadlessRunner` or a developer to save/load an immutable "Snapshot" of the entire `Game` and `Location` state.
- **How it helps:**
    - **Instant Debugging:** If a simulation fails on turn 50, the developer can jump directly to turn 49 using a saved memento, bypassing the initial turns.
    - **Scenario Branching:** Allows a test to fork from a single starting state into multiple divergent player choices to verify behavioral consistency.

### `ReplayService` (Regression Replay)
- **Responsibility:** Automates the "Bug Report to Test Case" pipeline.
- **Workflow:** Takes the `CaptureResult` (which includes the Seed and Input History) and automatically generates a new, executable JUnit test file that reproduces that exact session for regression testing.

---

## 6. Seed Discovery & World Probing

The Seed Simulator is a discovery engine that explores the entropy space horizontally to find specific "Scenarios" for testing.

### `WorldProbe` (Specification Pattern)
- A "Predicate" class that defines criteria for a location (e.g., `HasAnomalyCriteria`, `FloorCountCriteria(99)`).
- Multiple criteria can be combined into a `CompositeCriteria` (And/Or/Not).

### `SeedScanner` (Discovery Engine)
- A decoupled service that interacts directly with `WorldGenesis`.
- It iterates through seed ranges and uses a **Visitor Pattern** to traverse the resulting world hierarchy.
- **Short-Circuiting:** If a `WorldProbe` is satisfied, the scanner immediately stops generation and returns the "Scenario Seed."
- **Optimization:** Decoupled from the UI, it can be multi-threaded to check thousands of seeds per second.

### `SeedVault` (Persistence)
- A repository mapping semantic names (e.g., `"STRESS_TEST_MASSIVE_CITY"`) to raw `Master Seeds` and `LIPs`.
- Allows the test suite to request specific scenarios by name rather than searching for them on every run.

---

## 7. Implementation Standards & Best Practices

- **Separation of Concerns:** The UI should never know about files, and the `CaptureService` should never know about the game loop.
- **Observability:** Use the **Observer Pattern** so the `CaptureService` can fire "Success/Failure" events (via the `CaptureResult`) back to the UI without being coupled to the game's message ticker.
- **Resource Management:** Implement a **Rotation Strategy** in the service configuration to auto-delete old snapshots and maintain a clean workspace.

---

## 8. Future Roadmap

Additional planned enhancements for the Vinculum Diagnostic Suite:

- **`IntegrityAuditor` (Invariant Enforcement):** A background interceptor using the **Proxy Pattern** or **AOP** (Aspect-Oriented Programming). It will monitor every generated `Location` to ensure it adheres to internal logic rules (e.g., `hasAtLeastOneExit()`, `isParentChildConsistencyMaintained()`) and flag "Silent Failures" during massive seed simulations.
- **`PerformanceTelemetry`:** Tracking generation speed and memory footprint of complex world hierarchies to identify bottleneck seeds.
- **`VisualDiff`:** Automated comparison between two screenshots to identify accidental UI regressions across versions.
