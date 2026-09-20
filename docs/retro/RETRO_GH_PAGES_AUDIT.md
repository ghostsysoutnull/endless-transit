# Retro: GitHub Pages audit (2026-09-20)

Record: chronicle `0x8cf9a5a`; plan, deviations and gate lines in `tasks/completed/GH_PAGES_AUDIT_PLAN.md`. This file is not a second changelog.

## What went well
- **Verification by readers who did not write the text.** The grill (before writing) caught 4 false replacement sentences — three would have overwritten text that was *true*. The post-writing pass caught 17 more problems in the corrections themselves. Without the two passes the wave would have shipped a wrong survival number on four pages. Authors verify poorly; the cost (two agent passes) was small against that.
- **Fixing by fact, not by page.** The errors came from one fact living in several copies. A table of facts with every copy listed, then a grep of the *old wording* across the site, found three copies no page-by-page reading had.
- **Running the game instead of reading about it** settled what no test covers: the first frame, the door list, the seed 4660 walkthrough, a real Gematria example. Run from a scratch directory, so no player file was touched.
- **Line-count-neutral edits** above the guide's line 103 kept a test comment's `:102-103` pointer true without touching `src/`.

## What went wrong
- **The first answer to "give your take" argued against an ordering the user had just fixed** (HK-022 first). Lesson written.
- **A finding was presented as new without grepping the backlog** — the dropped Keystone was already HK-021.
- **`/grill` was dismissed unread** ("the plan changes no source"), then found 21 amendments. A plan made of claims about code is what the grill is for, whatever the plan edits.
- **The close-out ran before the merge and the push and ended in a "leftovers" list**; the user had to ask why. Lesson written; WF-010 logged.
- **The close-out tier was mis-sized the second time by a whisker:** `ui/CLAUDE.md` lives under `src/`, so a one-word doc fix makes the floor Full. The floor was followed (this retro exists because of it), but a domain `CLAUDE.md` is law, not source — see Concerns.

## Concerns for upcoming phases
- **WF-010 (Medium):** `/close-wave` needs a post-merge step for waves that publish, and "justify" in row 2 should mean *logged in a backlog*.
- **Tier floor vs domain docs:** a change to `src/**/CLAUDE.md` alone trips the Full tier through the "anything under `src/`" rule, while the add-on table already treats "any `CLAUDE.md`" as law (Chronicle). Worth one line in WF-010's decision.
- **HK-016-style content waves must revisit `docs/terminal/`** — row 4 exists since WF-007; the Monolith error predates it by a day. No new rule needed, only the reminder that the player pages quote resource files.
- **HK-023's restore bug** is the one finding here that can cost a player their progress. It stays below HK-022 by user decision; its step 0 is a suite test.
- **The recovery prompt sits at 942 / 1,000 words.** The next wave that adds a line must remove one.
