# Retro: HK-022 — NameGenerator becomes an injected instance
**Date:** 2026-09-20 | **Suite at close:** 290 discovered / 290 pass / 0 skipped / 0 failed | **Duration:** ~4.5 s
**Chronicle:** journals/LOG_20260920_163456_0x9549527.md

---

## What Went Well
- **Callers first, statics last.** One `groovy -e` probe showed `@CompileStatic` resolves a static through an instance, so 13 production files moved in four commits that were each green alone — no inner-loop, no broken intermediate state.
- **Pins written against an instance crossed the change unedited.** The step-0 rows needed no migration list, so nothing could be lost in one.
- **The RED demo was free.** Removing the allow-list entry before the statics gave `LINT=FAIL P3=11` — the rule was proven to see the file in the same commit that satisfied it.
- **The Shape table was short and sufficient.** Three rows answered grill checks 1, 2, 4 and 6 without prose.

---

## Challenges
- **Finding seeds for the rare building branches.** 3,000 raw `LocusSeed(n)` values produced only common names; the first `nextDouble` of a small unmixed seed never falls under ~0.2. Branched loci found all three branches within 35 tries.

---

## Surprises
- The grill found the plan's own citation wrong (`:136,142,146` are door descriptions; the trace asserts are `:134,138,144`) — the Coverage Claim Protocol applies to line numbers, not just to test names.
- The player's guide cites `NameGenerator.groovy` line ranges that had already drifted before this wave; the wave moved none, and the drift is logged under HK-023.
- `generateContainerName` had never had a caller — `git log -S` shows one commit, the one that added it.

---

## Concerns for Upcoming Phases
- A false-fact hit outside the plan's named files (`DESIGN.md:28`, "centralized utility") was left and justified rather than edited, because the approval named its files. Loose wording, not wrong — no backlog item.
- The close-out still needs two merges for a code wave (code, then records) — already WF-010; nothing new to log.

---

## Lessons
- **Probe the compiler before planning an all-at-once migration.** If the old static form and the new instance form both compile during the move, the migration is N green commits, not one big one. → `tasks/lessons/procgen.md`
- **A test seed for a probability branch must be a branched locus.** → same lesson file.
