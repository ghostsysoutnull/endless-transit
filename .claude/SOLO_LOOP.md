# The Solo loop

How a queue iteration runs by default.

## The loop
1. **Scope.** The iteration starts from the scope the user accepted (the first rule of the block at the top of
   `CLAUDE.md`).
2. **Plan, review, show.** I write the plan; the plan review (`/grill`) reads it once in a subagent and only judges
   it, since the author is the worst judge of their own plan; an amendment it asks for is fixed, never reviewed again.
   I show the user the plan with the review's verdict and build on their go. No other subagents.
3. **Tests.** I test only the logic that is not UI, with unit tests; no browser tests until the end. The screen's words
   are UI too: the approved snapshot waits for the end, not rewritten as I go.
4. **The fast loop.** The user tests the UI on the phone. They report, I change it, they test again. Each round is
   quick.
5. **The end.** With the user: the full browser suite, the approved snapshot rewritten and its diff read, and the
   browser tests that move on purpose; the design check on the iteration's diff (the Codex's Verification). Then the
   close-out of the Codex ("Closing a wave"), plus the queue's own: the iteration's note as built, its queue row ticked,
   and a publish on the user's word.

## What it sets that other rules leave open
- **A UI bug's test:** the user's report is the reproduction; its browser test waits for the end. A logic bug still
  gets a unit test first.
- **A push:** I do not check the live site afterwards; the user does.

Everything in `.claude/CODEX.md` still holds, with the active queue's Decisions and the user block.
