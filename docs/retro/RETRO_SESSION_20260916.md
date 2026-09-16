# Retro: Housekeeping day — HK-010, HK-009, HK-011, HK-012
**Date:** 2026-09-16 | **Suite at close:** 207 discovered / 207 pass / 0 skipped / 0 failed | **Duration:** ~3.2s
**Chronicle:** journals/LOG_20260916_150000_0xf7c7745.md (session); per-item logs `0x00194f4`, `0xa3f6e4d`, `0xa307827`, `0xfe739f4`
**Branches:** four, each merged `--no-ff` to `master` and pushed; 16 commits in total

---

## What Went Well
- **One item, one branch, one grill, one chronicle — four times.** The cadence held without shortcuts even for the ten-minute item (HK-009), and that item is where the double-population finding came from.
- **Behavior changes were always the user's call and always their own commit.** HK-010 (restore discovery), HK-011c (name in the ticker): each named as a visual/behavior change up front, each with its own golden review, each strikeable at approval.
- **Empirical step 0 before deleting anything.** HK-009's counts script and HK-012's before/after `stat` on the real save turned a hypothesis into a recorded number before the change and a proof after it.
- **The user report was treated as a bug report, not a mood.** "I think it loaded another one" became a `transit.log` read, a `git log -S`, two root causes with dates, and a fix inside the hour.

## Challenges
- **The five-file commit in HK-011b.** Removing a static means every caller migrates at once; the per-commit cap is a guide for independent edits, not a reason to add a shim. Declared rather than dodged.
- **Every grill found an off-by-one citation.** Line numbers quoted from memory of an earlier read drift as files are edited during the same session. Quote from a `grep -n` run *after* the last edit, not from the read that preceded it.

## Surprises
- **Two tests had been populating every apartment twice for months** with no red result — no assertion asked for an absolute count.
- **The suite had been destroying the player's save since March**, and the only signal was a player noticing. Gitignore is where side effects go to hide.
- **The corridor's "back-propagation" never touches the rooms** — it re-derives the first room's category from the seed. A plan premise the grill caught.

## Concerns for Upcoming Phases
- **HK-008 is wide.** Every `Container.populateChildren()` plus `Building`, `SyncManager`, `PersistenceService`, `WorldGenesis` and tests read the factory singleton. Grep both trees before planning.
- **O2 has a wrong premise in the OOA plan** (Gradle). Re-plan as a `vinc.sh` mode on the test classpath.
- **`.journal_session_tmp` is still one shared path** (HK-011 E3). Fine until two games share a JVM.
- **Backlog CLOSED section has duplicate entries** (HK-001..006, pre-existing). One docs pass.

## Lessons
- **Grep the harness for every route into shared state before claiming a gate will not move** (HK-010; promoted to `core.md`).
- **A view component takes frame inputs, not services** (HK-011; promoted to `ui.md`).
- **A test never reads, writes or deletes a file the player owns** (HK-012; promoted to `infrastructure.md`).
- **Quote citations after the last edit, not before it.** Recorded here; four grills in a row said so.
