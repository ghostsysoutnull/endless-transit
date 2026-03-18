# Retro: TEST_RUNNER_IMPROVEMENTS
**Date:** 2026-03-17 | **Suite at close:** 84 pass / 5 skip / 0 fail (89 discovered)

---

## What Went Well

**Clean commit decomposition.** Three commits, one concern each. T1+T2+T3 were a natural unit — all in `TestRunner.groovy`, all about suppressing noise. T4 was self-contained. T5 was additive and touched a second file. The split held cleanly throughout implementation.

**TTY detection was a one-liner with big payoff.** `System.console() == null` is the right primitive — it detects both pipe and redirect without shell gymnastics. Folding `agentMode` into the same `isPiped` flag meant all "suppress progress" logic had a single chokepoint. The line count went from 110+ to 20 without touching any test logic.

**`--agent` mode came out cleaner than planned.** The spec said "one line on clean run" and it delivered exactly that. The decision to redirect compile/header output to stderr in `vinc.sh` rather than trying to suppress it in Groovy was the right call — it kept the separation clean: stderr for operator noise, stdout for machine-readable signal.

**Deliberate failure probes.** Writing a temporary `StackFrameProbeTest`, running it, verifying the exact output, then deleting it is a rigorous verification pattern. It caught the leaking `[VINCULUM_TARGETED_TEST_RUN:]` and inline `[VINC:FAILURE]` lines in `--agent` mode that would have been invisible without an actual failure to trigger them.

---

## Challenges

**`--agent` mode required more suppression than anticipated.** The initial implementation suppressed progress lines but three other output sources were still leaking to stdout: the targeted run header (`[VINCULUM_TARGETED_TEST_RUN:]`), the inline failure block (`[VINC:FAILURE]` + message + stack frame), and the suite header (`[VINCULUM_FULL_SUITE_INITIATED]`). Each required a separate `!agentMode` guard. The plan said "suppress decorative output" but the actual number of suppression sites was underestimated. Required two rounds of fixes on the same commit before the output was truly clean.

**Stale build cache hid a phantom test.** Deleting `DiscoverSnapshotValues.groovy` from source but not cleaning `build/vinc/` left the compiled `.class` being discovered and run every suite. It produced real output (the building snapshot values), inflating counts from 89/84 to 90/85. This went unnoticed across multiple runs until the new clean output format made the extra println lines visible. The root cause: `vinculum_compile()` never clears old artifacts — it `mkdir -p build/vinc` and appends. The fix was manual (`rm -rf build/vinc`), not automatic.

---

## Surprises

**The stale class issue revealed a latent vinc.sh bug.** The build directory accumulates stale `.class` files whenever a source file is deleted. This is silent and cumulative — over a long refactoring effort where classes are renamed, moved, or deleted, the discovered test count will drift upward. The OOA refactoring plan involves creating and deleting multiple classes; without a clean step, discovered counts become unreliable. Adding `rm -rf build/vinc` to `vinculum_compile()` before compiling would fix this permanently. Not in scope here, but worth tracking.

**Slow test output order is non-deterministic in piped mode.** In TTY mode, slow tests print inline as they finish (chronological). In piped mode they only appear in the post-run summary (sorted by duration). This is actually better behavior — an agent seeing a `[VINC:SLOW]` mid-stream before the summary would have to parse it separately. The current behavior consolidates slow info into the summary where it belongs.

**Settings.json auto-allow had an immediate effect.** Adding `Write` and `Edit` to the allow list for this session meant no approval prompts for the ~15 file writes and edits during implementation. The friction reduction was noticeable — the session moved faster and the approval rhythm didn't break focus. Worth noting that this was entirely safe because all writes stayed within the project tree and all changes were intentional.

---

## Concerns for Upcoming Phases

**Build cache staleness is a real risk for OOA.** Phase 3 adds `RoomCategory.groovy` (new), Phase 4 adds `AbstractLeafLocation.groovy` (new), Phase 9 adds ~14 factory classes. None of these involve deleting source files — but Phases 3–4 might involve renaming or replacing existing classes. If any class is removed during refactoring without a `rm -rf build/vinc`, the stale `.class` will be discovered and potentially run, producing false test counts or unexpected test execution. The safe habit: always `rm -rf build/vinc` when deleting or renaming a source file.

**`--agent` mode is now the recommended agent invocation, but it's not yet in the CODEX.** The CODEX and domain CLAUDE.md files reference `./vinc.sh --test` and `./vinc.sh --test -q` for verification. Future sessions should default to `--agent` for quick gate checks and `-q` for debugging. This should be added to the CODEX operational tooling table — not urgent, but worth doing before Phase 1 so it's in context from the start.

---

## Lessons (promoted to tasks/lessons/)

**Build cache must be cleaned when source files are deleted or renamed.** Add to `tasks/lessons/infrastructure.md`: *"Always run `rm -rf build/vinc` after deleting or renaming any `.groovy` source file. The `vinculum_compile()` function never clears stale artifacts — deleted classes continue to be discovered and run until the cache is purged."*
