# Retro: Optional Phase O2 — CodeNarc as `./vinc.sh --lint`
**Date:** 2026-09-16 | **Suite at close:** 213 discovered / 213 pass / 0 skipped / 0 failed | **Duration:** ~3.4s | **Lint:** 206 files / 0 violations (~6.6s)
**Chronicle:** journals/LOG_20260916_160210_0x7b3e2c9.md
**Branch:** `refactor/o2-lint` — 13 commits, merged `--no-ff` to `master`, pushed

---

## What Went Well
- **Prototype before plan.** Every claim in the plan came from a scratchpad run against the real tree: the true violation counts, the real rule names, exit-code and suppression behavior, the baseline round trip, and `Player` under `@CompileStatic` passing the full suite. The grill had nothing to catch on coverage because nothing was asserted from memory.
- **Green from the first commit.** Baselining the 100 existing violations at c2 meant every commit on the branch was independently green on all four gates and reverts alone. The fix commits shrank the file; the commit script refused any diff that added a `<Violation>`.
- **Invariants became rules.** Six retro-era greps ("no static instance", "no `instanceof` on a State/Factory/event", "model never imports the journal or UI", "no `new Random()` in a component") are now `IllegalRegex` / `IllegalClassReference` / `IllegalPackageReference` entries that fire in six seconds. Each was proven on a bad probe file before it shipped.
- **Deletions by report, not by eye.** The import script read a fresh CodeNarc report, asserted the exact line text at the exact line number, and only then deleted. 83 deletions across 38 files, zero drift, zero re-touched files.
- **Two intentional leaks declared in source.** `Game.start`'s WF-005 exit and `ConsoleSink`'s `System.out` carry `@SuppressWarnings` beside the code with a one-line reason, not a file-name exemption buried in the ruleset.

## Challenges
- **A line flagged twice.** `Apartment.groovy`'s `import java.util.Random` was both `UnusedImport` and `UnnecessaryGroovyImport`; the script queued the same deletion twice. The pre-write assertion fired on the second, nothing was written, the script was deduped and c4 re-ran clean. Cheap because the assert came before the write.
- **Counting from the wrong column.** The c9 file list was built from `UnusedImport` per-file counts; two files with only an `UnnecessaryGroovyImport` hit were missed and surfaced in the shrunken baseline. One extra test-only commit (c9b).
- **CodeNarc's path regex matches the whole path.** `'test/.*'` silently matched nothing; `'.*/test/.*'` was needed. Found in the prototype, not in production — which is the point of the prototype.

## Surprises
- **The OOA plan's O2 had two false premises.** A Gradle plugin on a runner that never invokes Gradle, and a rule (`NoSystemExit`) that does not exist. Both would have survived a plan written from the document alone.
- **`Player` was the only dynamic production class** besides the `Main` script — the one aggregate every domain event passes through. It compiled and passed everything with the annotation alone.
- **The baseline is a ratchet by accident of format.** Entries are keyed by file + rule + message with no line numbers, and `MethodSize`'s message embeds the length. A baselined long method resurfaces the moment its length changes — exactly the behavior a debt register should have, for free.
- **100, not 98.** The prototype had exempted `ConsoleSink` by file name; the shipped ruleset does not, because c11 annotates it instead. The plan's estimate was two off for a reason the plan itself had already decided.

## Concerns for Upcoming Phases
- **HK-013: nine methods over 50 lines** sit in the baseline (`Room.getOptions` 103, `HUDHeaderComponent.render` 90, `Building.getExtraContent` 84, `ScanCommand.renderCorridorScan` 75, `SyncManager.restore` 64, `LatticeTraceComponent.renderTrace` 63, `SessionRecap.show` 56, `LatticeMapComponent.render` 52, `ScanCommand.renderApartmentScan` 52). Any edit to one of them will fail lint until it is split or the baseline is regenerated — decide per touch, and never regenerate to make a longer method pass.
- **No automated self-test of the lint mode.** If a rule breaks silently (a CodeNarc upgrade, a regex edit), nothing fails. The negative check is manual and recorded; a `LintSelfTest` would need the lint jars on the test classpath, which the design keeps separate. Revisit if the ruleset grows.
- **Naming rules are not enabled**, and the `enhanced` ruleset (needs compiled classes) is untouched. Both are one-line additions plus a baseline regeneration when wanted.
- **The `.journal_session_tmp` shared path** (HK-011 E3) is still the one shared resource between two games in one JVM; unchanged by O2.

## Lessons
- **A new gate ships green on its first commit.** Baseline the debt, ratchet it down; the baseline has one writer and its diff may only remove. Promoted to `tasks/lessons/infrastructure.md`.
- **Verify a tool against its jar with a scratchpad prototype, not against the plan.** Rule names, CLI flags, regex semantics and violation counts all differed from the document. Promoted to `tasks/lessons/infrastructure.md`.
- **When a phase establishes an invariant, add the lint rule in the same phase** and prove it fires on a scratch bad file. Promoted to `tasks/lessons/infrastructure.md`.
- **Build a fix list from every rule that flags a file, and dedupe by line.** Two small script bugs, both caught by asserts placed before the write. Recorded here.
