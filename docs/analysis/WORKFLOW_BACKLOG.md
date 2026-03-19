# Workflow Backlog
**Purpose:** Capture workflow friction, tooling gaps, and agentic improvement opportunities
as they surface — primarily from retros and mid-session observations. Reviewed every 3 phases.
When enough items accumulate (or a High priority item appears), a dedicated workflow
improvement session is planned before the next phase begins.

**Sources:** Phase retros → "Concerns for Upcoming Phases" section → logged here.
**Cadence:** Review at Phase 1, 4, 7, 10 (every 3 phases). Trigger early for High priority.
**Process:** Open item → plan session → execute → mark CLOSED with resolution.

---

## 🔴 OPEN

*No open items.*

> **Phase 1 cadence review completed — 2026-03-18.** Backlog clean. No workflow session
> required before Phase 2. Next scheduled review: Phase 4.

> **Phase 4 cadence review completed — 2026-03-18.** One latent infrastructure issue surfaced
> post-phase (not from retro): `--scan`, `--replay`, and game launch classpaths in `vinc.sh`
> diverged from `--test` — `src/main/resources` was missing, causing silent load failures at
> runtime while tests passed. Fixed immediately; lesson promoted to `tasks/lessons/infrastructure.md`.
> Backlog otherwise clean. No workflow session required before Phase 5. Next scheduled review: Phase 7.

> **Phase 5 note — 2026-03-18.** The pre-Commit-G grep for `ModelOutput.fmt` only caught
> direct static field accesses. Tests depending on the ambient formatter *implicitly* (via
> `getEffectiveFmt()` fallback on directly-constructed model objects) were invisible to the grep.
> Future Service Locator removals should include: (1) grep for direct usage, AND (2) audit every
> test file that constructs a model object outside the factory and exercises any rendering path.
> Lesson promoted to `tasks/lessons/model.md`. No workflow session warranted — backlog clean.
> Next scheduled review: Phase 7.

---

## 🟢 CLOSED

### WF-001 — Build cache never purged between compiles
**Priority:** High
**Source:** `docs/retro/RETRO_TEST_RUNNER.md` — "Concerns for Upcoming Phases"
**Problem:** `vinculum_compile()` used `mkdir -p build/vinc` without clearing stale `.class`
files first. Deleted or renamed source files left compiled classes in the cache, which were
discovered and run by the test runner — producing phantom tests, inflated counts, and
unexpected output. Surfaced when `DiscoverSnapshotValues.groovy` was deleted but its class
continued appearing in the suite.
**Risk for OOA:** Phase 3–9 create and potentially rename/delete multiple classes. Without
this fix, discovered test counts would drift and stale classes could run silently.
**Resolution:** Changed `mkdir -p build/vinc` to `rm -rf build/vinc && mkdir -p build/vinc`
in `vinculum_compile()`. Every compile now starts from a clean slate.
**Closed:** 2026-03-17 | commit: see workflow session after TEST_RUNNER_IMPROVEMENTS
