# Retrospective: HK-016 step 3 (and the HK-016 arc)
**Date:** 2026-09-16 | **Chronicle:** `0x0408475` | **Plan:** `tasks/completed/HK_016_STEP3_PLAN.md` | **Merge:** `0408475`
**Suite:** 227 → 236 / 236 / 0 / 0 | **Lint:** 209 files / 0 | **Goldens:** 16 distinct frames regenerated across 10 of 18 commits

## What went well
- **The chain became a tool, and the tool said no once.** `family.sh` + `sim3.groovy` + `repin.py`: every commit compiled, simulated, checked its moved
  frames against the row, re-pinned only its own family's literals and refused any other drift. The one refusal (c8b: a second pin of the 0x1234
  building name at `ProcgenDeepSnapshotTest:117` that the map lacked) was exactly the class of error the tool exists for — a literal moving that the
  plan had filed under "must not change". Adding the key and resuming cost one run.
- **Zero-diff refactor before growth (doors).** Moving lists and narratives to files with the gate "36 goldens and every door literal byte-identical"
  made the growth commit a pure content diff with no code risk.
- **Docs tracked the files.** The atlas lexicon table was rewritten *from the files* in each lexicon commit (`atlas3.py`), and the guide's known-world
  names were read from the run — no doc literal was typed by hand.
- **The arc's numbers are honest.** The audit table gained two columns (step 2, step 3) and a ceiling correction rather than a rewritten baseline.

## What was corrected mid-flight
- **A "must not change" row that should have been "moves".** `ProcgenDeepSnapshotTest:117` pins the building name as a precondition; the coverage table
  cited `:117-122` as guards for counts. Lesson: grep every literal the family feeds (`grep -n '"Impenetrable Unit"' src/test`) before writing the row.
- **Three proposed relics began with a condition word** (grill F2) and two existing ones already did. The guard in `generateFurniture` is two lines; the
  pin walks 400 furnishings and asserts no doubled first word.
- **The street lattice map moved with building names** (c8c). Building names feed the map's projected coordinates, so a lexicon change moves plots.
  Predicted only loosely ("maps") — worth a precise sentence in any future naming change.

## Concerns for upcoming phases
- **HK-016 is closed; the next variety complaint is a file edit.** Every list has a size floor pinned; growing one is `append lines → run the chain`.
  The scratchpad tools are not committed — if a fourth content phase ever happens, `family.sh`'s shape (simulate, gate on the expected set, re-pin by
  allow-list) should become a `vinc.sh` mode rather than be rebuilt.
- **Furniture is still the least varied line** (16 items × 16 conditions per culture = 256 strings, two cultures per planet). Fine for now; the F2
  guard means growing either list is safe.
- **HK-015 items 1–2 are the next gameplay decisions**; the door constructor's dead inscription roll joined that entry's "lower value" list.

## Workflow friction → `docs/analysis/WORKFLOW_BACKLOG.md`
- Candidate, not filed: `./vinc.sh --goldens --expect <frames>` with a literal re-pin allow-list (the `family.sh` shape). Filed only if a fourth
  content phase appears.
