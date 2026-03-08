# Implementation Plan: AI Development Strategy

This plan outlines the "How" for transforming our development workflow into a verified, AI-hardened system.

## Phase 1: Infrastructure & Static Analysis
*Goal: Catch logical errors during compilation rather than runtime.*

- [ ] **Static Annotation Audit**:
    - [ ] Add `@CompileStatic` to the `procgen` domain (highest math/logic density).
    - [ ] Add `@CompileStatic` to `model/Location` and `model/Container`.
    - [ ] Add `@CompileStatic` to `core/Logger` and `core/SyncManager`.
- [ ] **Compiler Enforcement**:
    - [ ] Update `run.sh` to include a `compile` check before running tests.
    - [ ] Ensure `groovyc` is used to validate all `.groovy` files in `src/main` during the CI/Test cycle.

## Phase 2: Testing Framework & AI-TDD
*Goal: Mandate empirical proof before any code change.*

- [ ] **The "Repro" Template**:
    - [ ] Create `src/test/groovy/com/endlesstransit/ReproTemplate.groovy` as a skeleton for AI agents to clone when a bug is reported.
- [ ] **Failure Logging Enhancement**:
    - [ ] Update `Logger.error` to automatically dump `Player.currentLocation.getLIP()` and `Game.sessionSeed` to help the AI reconstruct the exact failed state.
- [ ] **Stress Test Integration**:
    - [ ] Incorporate `DeepLatticeCrawlTest` into the standard `./run.sh --test` loop so it runs on every commit.

## Phase 3: Domain Refactoring (The Lazy-Load Law)
*Goal: Prevent "Empty List" bugs through strict encapsulation.*

- [ ] **Getter Encapsulation Audit**:
    - [ ] Change all child lists (`rooms`, `apartments`, `floors`, `countries`, etc.) to `@PackageScope` or `private`.
    - [ ] Audit every class in the `model` domain to ensure **no** internal logic uses the field directly.
    - [ ] *How*: Use `grep_search` to find all occurrences of `this.rooms` and replace with `this.getRooms()`.
- [ ] **LIP Resolution Hardening**:
    - [ ] Ensure `getIndexInParent()` always triggers `parent.ensureChildrenPopulated()` to prevent stable LIPs from breaking during a restore.

## Phase 4: UI Engine Hardening (Grid Math & CHA)
*Goal: Make the HUD "indestructible" regardless of character width.*

- [ ] **Implement `TUIValidator` Utility**:
    - [ ] Create a class that calculates "Visual Width" by:
        1. Stripping ANSI escape sequences.
        2. Counting 2-cell wide Unicode characters (Emoji/Icons).
- [ ] **CHA Transition**:
    - [ ] Refactor `Terminal.drawBox` and `Game.renderHUD` to use `\u001b[nG` (Cursor Horizontal Absolute) for every right-side border character (`║`, `╟`, `╚`).
- [ ] **Label Standardization**:
    - [ ] Create a `HUDLabels` constant class to ensure `LOCUS_INDEX`, `STRATA`, etc., are never misspelled or inconsistently renamed by the AI.

## Phase 5: Workflow Integration
*Goal: Bake these rules into the Gemini-CLI context.*

- [ ] **Update GEMINI.md Files**:
    - [ ] Add the "AI Strategy Mandate" link to the root `GEMINI.md`.
    - [ ] Update the `Project Workflow` section in the root `GEMINI.md` to explicitly mention the **AI-TDD Protocol**.
- [ ] **Subagent Trigger Definition**:
    - [ ] Define specific prompts for the `codebase_investigator` to use when "Investigating a Depth Bug."

---
**Success Criteria**: A subagent should be able to navigate to Depth 50 (Abyssal Substrate) and back to the surface without a single `MissingPropertyException`, `NullPointerException`, or HUD border corruption.
