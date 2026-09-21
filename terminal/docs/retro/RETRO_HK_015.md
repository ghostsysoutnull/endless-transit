# Retrospective: HK-015 — five player-facing bugs the guide had to confess
**Date:** 2026-09-17 | **Merge:** `a47cdb6` | **Record:** `tasks/completed/HK_015_PLAN.md` | **Chronicle:** `0xa47cdb6`

## What went well
- The user's question "won't 1a create a huge state persistence?" turned a per-room flag into one int on the player — and surfaced the sync → restore loophole a transient flag would have left open.
- Pins written API-free on purpose, so ten of fifteen could be shown RED on an *assertion* against master; the echo determinism pin got its RED by applying the key rename alone first.
- The launch check ran from a scratch directory with absolute classpaths: real `Main`, real arguments, no player file touched (HK-012 rule held without a test seam).
- The grill's A1 kept the guide honest: the fix removes the repeat, not the lottery.

## What went wrong
- **The first answer to "expand HK-015" restated the backlog** — problems with one-line sketches, no options read from the code. The user had to ask "how can we plan if we just describe them". An expansion of a bug list means reading the code and offering fixes.
- **`LaunchArgs` shipped as a static function** and the `q` alias leaned on an existing two-owner smell without saying so; both came out only when the user asked whether the wave was sound OO. Lesson → `tasks/lessons/core.md`; smell → HK-020.
- c4 needed an amend: the guide's command table was not grepped for `quit` before the commit.

## Concerns for upcoming work
- HK-020 touches input normalization, where case sensitivity is deliberate for some keys and undocumented outside the guide — pin first.
- The lottery is still a cheap source of seven-figure items (A1). Not a bug; a balance question if the user wants one.
- No workflow friction to log: tiers, grill and gates cost less than the work this time.
