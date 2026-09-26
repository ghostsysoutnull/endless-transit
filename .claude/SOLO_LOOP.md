# The Solo loop

How an iteration runs (user, 2026-09-26). **It is the default**; the Standing Order (`.claude/STANDING_ORDER.md`) runs
instead only when the user asks for it.

## The loop
1. **Scope.** On "hi" I name the active queue's first open item and ask to work on it; on a yes I state its scope in a
   few lines, and the user accepts it.
2. **Plan, grill, build.** I plan; the grill reviews it once in a subagent (the author is the worst judge of their own
   plan) — an AMEND is fixed and built, never grilled again (user, 2026-09-26); I build it. No other subagents. The
   plan is not shown to the user; the scope was the go.
3. **Tests.** I test only the logic that isn't UI (unit tests, `npm run check`). I run no browser, Playwright or Chrome
   until the end. The screen's words are UI too: word pins and goldens wait for the end, not re-pinned as I go (user,
   2026-09-26). After a push I do not poll the live site: the user checks it.
4. **The fast loop.** The user tests the UI. They report, I change it, they test again. Each round is quick.
5. **The end.** We decide together on the full browser suite and headless Chrome.
6. **Talk.** I never answer with a wall of text.

## What it sets that other rules leave open
- **A UI bug's test**: the user's report is the reproduction; its browser test waits for the end (step 5). A logic bug
  still gets a unit test first.
- **The user block, rule 9's token check on a plan**: it does not apply, because the plan is not shown.
- **The user block, rule 12**: the Solo loop binds from the session that wrote it (2026-09-26), not the next one.

Everything in `.claude/CODEX.md` still holds, with the active queue's Decisions and the user block.
