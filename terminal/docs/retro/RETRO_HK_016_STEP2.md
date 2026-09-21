# Retrospective: HK-016 step 2
**Date:** 2026-09-16 | **Chronicle:** `0x0c49e5d` | **Plan:** `tasks/completed/HK_016_STEP2_PLAN.md` | **Merge:** `0c49e5d`
**Suite:** 220 → 227 / 227 / 0 / 0 | **Lint:** 209 files / 0 | **Goldens:** 12 frames regenerated across six commits, each simulated first

## What went well
- **Decisions before the grill, in one round.** Seven numbered questions with a marked preference; "all ★" fixed the design; the grill then
  interrogated a decided plan and found the real flaw (the model reaching the factory at render time) instead of arguing options.
- **The stop rule worked as a mechanism, not a sentiment.** From c6a on the chain itself refused to regenerate goldens unless the simulated
  frame set matched the row. At c4 the human-run check caught 8 frames instead of 2–3, stopped, verified the cause (the golden city is a rebel
  district; Q4a swaps eras), amended the row with the evidence, and only then regenerated.
- **Every pin shown red for its own reason** (six of seven): the same scratchpad trick as step 1 — compile the *previous* commit's class ahead of
  `build/vinc` and run the pin. A duplicate `heavy flywheel`, a hybrid furnishing, a planet with one era, one corridor sentence.
- **The simulation caught a real bug before commit:** the `createRoom` delegator's signature changed but its body still dropped the adjective;
  the simulated name came from the lexicon draw, not the dealt deck.

## What was corrected mid-flight
- **The c4 row under-predicted** (rebel-district era swap). Predicting golden movement needs the golden *world's* facts (is the city rebel? which
  era? which culture?) in the plan, not just the pinned literals. Lesson promoted.
- **Adjective decks wrap.** Eight adjectives, up to ten rooms: a rename pass and a pin that states the exact contract ("unique unless a category is
  dealt more rooms than the culture has adjectives"). Step 3's twelve adjectives close the gap.
- **A phase target was wrong arithmetic** ("objects distinct ≥ 90 % of total per seed"). A 272-card deck cannot yield 700 distinct draws. The
  target should have been stated as the *ceiling* (256 → ≈ 1,100 per planet) and the measured no-repeat rate, which is what the audit now records.
- **One red demo was inconclusive** (c5: the old generator lacks the new accessor, so the pin failed to compile rather than to assert). When a pin
  depends on new production API, demonstrate red on the *assertion that does not need it* (here: "no `[0x` in a name") or say so.

## Concerns for upcoming phases
- **Step 3 is pure content and every list is now binding.** Culture/era items, conditions, adjectives, atmosphere lines, door parts. Growing a list
  changes every deck's order (the deck is built in file order, then shuffled), so *every* pinned object list and most room goldens move once
  per list. Land each list in one commit and regenerate once per commit as before; expect the whole room/apartment golden set to move.
- **Furniture and room names got *less* distinct in the sample** (by design: 64 furniture strings per culture, 32 names per culture-country). Say
  so in the step-3 plan's before-table so the improvement is measured from the right baseline.
- **The right pane's off-by-one (HK-017 note) is still latent.** Unchanged, unreachable, noted.

## Workflow friction → `docs/analysis/WORKFLOW_BACKLOG.md`
- None new. The "simulate, then gate the regeneration on the simulated set" chain could become a `vinc.sh` mode (`--goldens --expect 14,15`)
  if a fourth content step repeats it by hand; logged as a candidate, not an item.
