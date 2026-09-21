# Phase 2: Context Localization - Detailed Breakdown

Phase 2, **Context Localization**, is the process of breaking down the monolithic "Source of Truth" into small, highly relevant "Context Capsules" located exactly where the code lives.

In a "Vibe Coding" workflow, the goal is to provide the AI agent with **high signal and low noise**. Phase 2 achieves this through three main mechanisms:

## 1. Just-in-Time Context
Currently, if an agent is asked to fix a bug in the UI, it must read the entire global `GEMINI.md`, which includes details about planetary generation, Gematria math, and the world hierarchy. 
*   **In Phase 2:** When an agent enters the `ui/` directory, the Gemini CLI can prioritize a `GEMINI.md` found *inside* that directory. This "local vibe" provides specific constraints, such as: *"In this folder, we only use ANSI colors from the Terminal class; do not use raw escape codes."* 

## 2. Preventing "Context Pollution"
When all rules reside in one file, an agent might accidentally cross-contaminate logic (e.g., applying procedural generation patterns like lazy-loading to a UI component where they don't belong).
*   **In Phase 2:** By moving "Lazy Initialization" rules into `model/GEMINI.md`, that information is only "active" and prominent when the agent is working on the world structure.

## 3. The Modular Import Strategy
The root `GEMINI.md` transforms into a high-level index using the `@` import syntax. 

### Example of a Modular Root `GEMINI.md`:
```markdown
# Endless Transit - Global Context

@src/main/groovy/com/endlesstransit/ui/GEMINI.md
@src/main/groovy/com/endlesstransit/model/GEMINI.md
@src/main/groovy/com/endlesstransit/procgen/GEMINI.md

## High-Level Vision
[The overarching mission of the project]
```

## Why this enhances the "Vibe":
*   **Surgical Accuracy:** The agent acts like a specialist for its current working directory.
*   **Token Efficiency:** We avoid filling the context window with planetary logic when only UI fixes are required.
*   **Maintainability:** When generation logic changes, only the local `GEMINI.md` in `procgen/` needs updating, keeping the documentation as modular as the code itself.
