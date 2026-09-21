# Retrospective: WF-007 — the close-out becomes a gate (`/close-wave` + `./vinc.sh --docs`)
**Date:** 2026-09-17 | **Branch:** `workflow/wf-007-close-wave` | **Record:** `tasks/completed/WF_007_PLAN.md` | **Chronicle:** `0x8885fa2`

## What went well
- The shape came from the user ("a close-wave skill") and one objection to it: a skill is still prose the agent grades itself on — HK-019's exact failure. Splitting it into a protocol (judgment, order, mandatory table) and a script (three facts a machine can check) answered both.
- The gate shipped green on its first commit, the O2 way: the 15 blueprints were stamped `Baselined (not audited)` instead of pretending they had been verified. The debt is visible in every stamp and is paid one class at a time, when that class next changes.
- A content hash (`git hash-object`) instead of a commit hash or a timestamp: it works on an uncommitted tree, survives merges, and a trivial class edit still forces someone to open the blueprint.
- Red before green, per check: the unstamped tree failed D2 + 15 × D3; then each of D1/D2/D3 was shown red alone on a scratch copy (`DOCS_ROOT`, `VINC_DISCOVERED`) without touching the tree.
- D2 needed a fact that was not machine-readable (the "latest journal" lived inside a sentence on line 99 of the recovery prompt). Adding one plain `Latest chronicle` line was cheaper than parsing prose.

## What went wrong
- **The skill's first row blocked its own first use.** "Code merged to `master`" is right for a code wave (the chronicle id is the merge hash) and impossible for a docs/workflow wave whose close-out rides its own branch. Found by the dogfood run, fixed in `8885fa2`. The plan had even listed c5 on the branch; the row was written from the HK habit, not from the plan.
- The plan said "three checks" and the recovery prompt also carries lint `FILES` and baseline counts, which no check reads. Left out on purpose (add a check only when a close-out misses something) — declared here so it is a decision and not an oversight.

## Concerns for upcoming work
- `/close-wave` has been run once, by its author, on a wave with no production change. Its first real test is the next code wave — rows 3 (blueprints) and 4 (player docs) were n/a here. If that run needs a row the table lacks, fix the command in that wave's close-out.
- D3 only guards the 15 classes that have a blueprint. A touched class without one passes silently. Not logged as a WF item: whether the other 124 need blueprints is a documentation decision, not workflow friction.
- No workflow friction to log. WF-006 (Low) remains for the next cadence review.

## Lessons
- None new: no user correction in this wave. The HK-019 lesson ("Close the session" …) now points at the command as the source of truth.
