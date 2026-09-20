# Retro: Context Diet (broken imports, lazy domains, Gemini removal)
**Date:** 2026-09-20 | **Suite at close:** 282 discovered / 282 pass / 0 skipped / 0 failed | **Duration:** 4342ms
**Chronicle:** journals/LOG_20260920_160807_0xb629529.md

---

## What Went Well
- The broken imports were found by comparing what the session *had loaded* with what the files *said to load* — not by reading the files.
- All doc edits ran from one script with `count == 1` asserts before any write; zero repairs.
- After the edits every remaining `@` import was resolved mechanically against the disk (8/8).

## Challenges
- The confirmation question said "apply everything" without naming files; the user had to ask what the scope was.

## Surprises
- The "Safety Mandates" post-mortems had never been loaded. An `@` import that resolves to nothing is silent.
- `tasks/skills/skill-chronicle/` is a second copy of the Gemini skill, outside `.gemini/`.

## Concerns for Upcoming Phases
- Nothing checks that an `@` import resolves. A `--docs` check (D5: every `@path` in a `CLAUDE.md` / `CODEX.md` exists relative to its file) would have caught this in March. Candidate, not logged as a WF item — user call.
- Test-only sessions do not trigger the `src/main/…` domain files (accepted edge).
- WF-010's note stands: a `src/**/CLAUDE.md` edit trips the Full floor. Second occurrence recorded there.

## Lessons
- **A confirm option names its scope.** Promoted to `tasks/lessons/infrastructure.md`.
