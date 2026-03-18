# Chronicle Template
> How to write a chronicle log for this project.
> Reference this file whenever `/chronicle` is requested.

---

## The Format

Chronicles follow the OBSERVER_LOG format — two layers, always:
1. **THE NARRATIVE** — the vibe, the meaning, the feeling of the session in the language of the world
2. **THE SUBSTRATE** — the technical facts: commits, files, metrics, what's next

---

## Step 1 — Generate a Log ID

Pick a short random hex string (6–8 hex chars, e.g. `0x4f2a91b`). Check `CHRONICLE_INDEX.md`
to confirm it isn't already used.

---

## Step 2 — Create the journal log file

**Path:** `journals/LOG_YYYYMMDD_HHMMSS_<LOG_ID>.md`

```markdown
# [OBSERVER_LOG_0x<LOG_ID>] | YYYY-MM-DD

## 🌌 THE NARRATIVE (The Vibe)

> Multi-paragraph blockquote. Immersive prose written from the perspective of the
> Vinculum Architect. Uses the game's vocabulary: substrate, lattice, neural link,
> fragments, probes, void, amber, frequencies, pulse.
>
> Describes WHY the session mattered — the feeling, the problem that was lurking,
> what changed in the nature of the substrate. Not a dry summary of what was done.
> Short punchy paragraphs, each with a thematic angle.
>
> End with a sense of state: what does the substrate feel like now?

---

## ⚙️ THE SUBSTRATE (The Tech)

### 📍 LOCUS_CONTEXT
(For gameplay/procgen sessions)
- **MASTER_SEED:** `12345` (reference seed used)
- **ACTIVE_LIP:** `0.0.0.0.0.0.0.0`
- **SNAPSHOT:** `screenshots/...`

(For OOA refactoring sessions — replace fields as needed)
- **ACTIVE_PHASE:** Phase 2b — NameGenerator Lexicon Externalization
- **REFACTOR_TARGET:** `NameGenerator.groovy` → `src/main/resources/names/buildings/`
- **SAFETY_GATE:** `ProcgenSnapshotTest`, `DeterministicUniverseTest`

(For infrastructure/tooling sessions)
- **MASTER_SEED:** N/A (infrastructure work only)
- **ACTIVE_LIP:** N/A
- **SNAPSHOT:** reference file if applicable, else omit

### 🛠️ IMPLEMENTATION_DELTA

**Session label: [TAG_IN_CAPS]**

(Use a table when multiple commits exist)
| Commit | Item | Change |
| :--- | :--- | :--- |
| `abc1234` | Description | What changed |

(Or bullet points with [TAGS] for single-commit sessions)
- **[TAG]**: What was done and why it matters.

Include key technical details: method names, file paths, before/after numbers,
specific decisions made. This section is the permanent record — be precise.

### 📈 ENTROPY_REPORT
- **SUITE_STATE:** N discovered / N pass / N skipped / N failed | Duration: Xms
- **TRAVERSAL_DEPTH:** Where we are in the overall arc (phase complete, gates satisfied, etc.)
- **NEXT_PHASE:** What comes next

---
*End of Fragment. Neural Trace Stabilized.*
```

---

## Step 3 — Update CHRONICLE_INDEX.md

Add a new row at the **top** of the table (below the header):

```markdown
| **0x<LOG_ID>** | YYYY-MM-DD | **[TAG_IN_CAPS]** | One-line summary. Suite: N/N/N/N. |
```

---

## Step 4 — Retrospective (phase completions and significant sessions)

Retros are written after completing a named phase or significant session.
For minor ad-hoc sessions a retro is optional.

**Path:** `docs/retro/RETRO_<LABEL>.md`

```markdown
# Retro: <Phase or Session Name>
**Date:** YYYY-MM-DD | **Suite at close:** N discovered / N pass / N skipped / N failed | **Duration:** Xms
**Chronicle:** journals/LOG_YYYYMMDD_HHMMSS_0x<LOG_ID>.md

---

## What Went Well
- Specific, named patterns or decisions that worked.

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
- Promote evergreen lessons to `tasks/lessons/<domain>.md`.
```

---

## Narrative Writing Guide

The NARRATIVE section is the soul of the chronicle. Some principles:

- **Use the world's vocabulary.** Substrate, lattice, neural link, fragments, void, pulse,
  frequencies, amber, probes, waveform, trace. The chronicle exists inside the world.
- **Write the problem as it felt, not as it was classified.** Not "there was a missing
  initialisation" — "the instruments were lying."
- **Short paragraphs.** Each one earns its place. No filler sentences.
- **End with a state change.** The substrate is now different. What does it feel like?
- **Never just paraphrase the SUBSTRATE section.** The NARRATIVE adds the dimension
  the commit log cannot — intent, consequence, meaning.

---

## Checklist

- [ ] Log file created at `journals/LOG_YYYYMMDD_HHMMSS_0x<LOG_ID>.md`
- [ ] `CHRONICLE_INDEX.md` updated (new row at top)
- [ ] Retro written at `docs/retro/RETRO_<LABEL>.md` (if phase completion or warranted)
- [ ] Any new lessons promoted to `tasks/lessons/<domain>.md`
