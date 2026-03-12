## 🛡️ The Shield (Safety Mandates)
Before starting any work, you MUST read and internalize the mandates in:
- **@tasks/lessons/POST_MORTEM_2026_03_11.md**

**CRITICAL:** 
1. Never start implementing (updating/creating/deleting files) without explicit, absolute confirmation from the user for that specific task.
2. Never commit or push without individual, explicit approval.

## Workflow Orchestration

Do not produce code while we are still designing or brainstorming it, ask when to generate code if we are thinkg about ideas.

### 1. Plan Node Default

* Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
* If something goes sideways, STOP and re-plan immediately – don't keep pushing
* Use plan mode for verification steps, not just building
* Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

* Use subagents liberally to keep main context window clean.
* **Subagent Discipline**: Subagents MUST read the full content of any file they are instructed to move, copy, or refactor. Proposing code changes or moves based on "templates" or "skeletons" is a failure.
* **Agent Verification**: The main agent MUST verify all subagent-proposed changes against the original files before implementation.
* Offload research, exploration, and parallel analysis to subagents.

### 3. Incremental Execution (Refactor Guard)

* Any refactor affecting more than 5 files MUST be broken down into sub-phases (e.g., 1a, 1b).
* Maximum 5 files per atomic refactor unit.
* Mandatory behavioral and visual verification after each sub-phase.

### 4. Self-Improvement Loop

* After ANY correction from the user: update `tasks/lessons.md` with the pattern
* Write rules for yourself that prevent the same mistake
* Ruthlessly iterate on these lessons until mistake rate drops
* Review lessons at session start for relevant project

### 5. Verification & Visual Baselines

* Never mark a task complete without proving it works.
* **Visual Baseline Protocol**: Mandatory `./vinc.sh --scan` before and after any change to `model` or `ui`. Review the summary for "Vibe-critical" indicators.
* **Diff Verification**: When moving or refactoring a file, verify that the *logic* (methods, strings, narrative) remains 100% identical to the original unless explicitly being changed.
* Diff behavior between main and your changes when relevant.
* Ask yourself: "Would a staff engineer approve this?"
* Run tests, check logs, demonstrate correctness.

### 6. Demand Elegance (Balanced)

* For non-trivial changes: pause and ask "is there a more elegant way?"
* If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
* Skip this for simple, obvious fixes – don't over-engineer
* Challenge your own work before presenting it

### 7. Autonomous Bug Fixing

* When given a bug report: just fix it. Don't ask for hand-holding
* Point at logs, errors, failing tests – then resolve them
* Zero context switching required from the user
* Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

* **Simplicity First**: Make every change as simple as possible. Impact minimal code.
* **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
* **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
