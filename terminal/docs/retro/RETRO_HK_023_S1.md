# Retro: HK-023 slice 1 — a save made below the Bedrock restores
**Date:** 2026-09-20 | **Suite at close:** 296 discovered / 296 pass / 0 skipped / 0 failed | **Duration:** ~4.5 s
**Chronicle:** journals/LOG_20260920_182600_0x55f9460.md

---

## What Went Well
- **The backlog entry was a finished diagnosis.** File, line and probe seed were all there and all still true; planning was reading five files, not hunting.
- **The grill removed code.** Reasoning through the draft's R4 pin showed it would pass without its fix, and that the sort it guarded protected no save a player can make. One production edit and one pin fewer.
- **Every RED was predicted.** Three pins failed on the old tree at the line the backlog named (`PersistenceService.groovy:59`), the fourth on the index the plan computed.
- **Edits by script with `count == 1` asserts** — four production files in one pass, no drift.

---

## Challenges
- **Two approvals for one decision.** The harness's plan approval is not a CODEX Directive, so the user approved the plan and then had to answer the execute question as well (and asked for it to be shown again). → WF-011.

---

## Surprises
- **The player docs had documented the bug as lore.** Row 2 found `lip_addressing.md` and the cheat sheet warning that a Substrate save "cannot be walked back" — the plan only said "grep `docs/terminal/`"; the old state's own words found it.
- Layer order was never enforced anywhere, yet every production caller happened to ask in order — which is the only reason old saves need no migration.

---

## Concerns for Upcoming Phases
- HK-023 still has 13 bullets plus two added here (two LIP walkers; the memento carries no mutations). The tally bullets need user decisions on the rule before any plan.
- `Building.md` was `Baselined`; reading it against the class found a dead dependency (`ModelOutput`) and an invented label (`[PROBED: 4/12]`). The ten blueprints still `Baselined` are likely no better.

---

## Lessons
- None promoted: no user correction this wave. The R4 catch is the existing "run a new pin RED and GREEN" lesson, applied at plan time.
