# Chronicle Template
> How to write a chronicle log and retrospective for this project.
> Reference this file whenever `/chronicle` is requested.

---

## Step 1 — Generate a Log ID

Pick a short random hex string (6–8 hex chars, e.g. `0x4f2a91b`). Check `CHRONICLE_INDEX.md`
to confirm it isn't already used.

---

## Step 2 — Create the journal log file

**Path:** `journals/LOG_YYYYMMDD_HHMMSS_<LOG_ID>.md`
**Naming:** use today's date and a rough time (24h, no colons).

```markdown
# Chronicle: <Short Title>
**Log ID:** <LOG_ID>
**Date:** YYYY-MM-DD

---

## Summary
One short paragraph. What changed, why it matters, net result (suite state, perf gain, etc.).

---

## What Was Done

### <Sub-task or Fix Label>
Describe *what* the problem was, *why* it existed, and *what the fix was*.
Include filenames, line numbers, or code snippets where they add clarity.
One `###` block per meaningful unit of work.

---

## Suite at Close
`STATUS=PASS DISCOVERED=N SUCCEEDED=N FAILED=0 SKIPPED=N DURATION=Xms`
(Run `./vinc.sh --test --agent 2>/dev/null` to get this line.)

---

## Key Lesson
**Bold headline.** One or two sentences on the most transferable insight from this session.
```

---

## Step 3 — Update CHRONICLE_INDEX.md

Add a new row at the **top** of the table (below the header), before the previous entry:

```markdown
| **<LOG_ID>** | YYYY-MM-DD | **[TAG_IN_CAPS]** | One-line summary. Suite: N/N/N/N, duration Xms. |
```

`TAG_IN_CAPS` examples: `PHASE_1_BUG_FIXES`, `TEST_SPEED_IMPROVEMENTS`, `PROCGEN_REFACTOR`.

---

## Step 4 — Retrospective (phase completions only)

Retros are written after completing a named phase (Phase 1, Phase 0.5, etc.), not for every session.
For ad-hoc sessions (tooling fixes, speed improvements) a retro is optional but welcome.

**Path:** `docs/retro/RETRO_<LABEL>.md`

```markdown
# Retro: <Phase or Session Name>
**Date:** YYYY-MM-DD | **Suite at close:** N discovered / N pass / N skipped / N failed | **Duration:** Xms
**Chronicle:** journals/LOG_YYYYMMDD_HHMMSS_<LOG_ID>.md

---

## What Went Well
- Bullet points. Be specific — name the pattern or decision that worked.

---

## Challenges
- What slowed things down or required rethinking.

---

## Surprises
- Anything that contradicted the plan or prior assumptions.

---

## Concerns for Upcoming Phases
- Risks or open questions carried forward.

---

## Lessons
- **Bold headline.** One sentence elaboration.
- Promote evergreen lessons to `tasks/lessons/<domain>.md` after writing them here.
```

---

## Checklist

- [ ] Log file created at `journals/LOG_YYYYMMDD_HHMMSS_<LOG_ID>.md`
- [ ] `CHRONICLE_INDEX.md` updated (new row at top)
- [ ] Retro written at `docs/retro/RETRO_<LABEL>.md` (if phase completion or warranted)
- [ ] Any new lessons promoted to `tasks/lessons/<domain>.md`
