# The Solo loop

How every wave runs (the Codex's unit: a queue iteration, a backlog item, a docs session, a one-line fix). Law mode
(`.claude/LAW_MODE.md`) adds what work on the rules needs.

## The loop
1. **Scope.** A wave starts from a scope the user accepted: the handover's next step after "hi", or a directive. A
   directive that names the change is its own go: it skips to the build (the user block).
2. **Plan, review, show.** For a scope accepted without its how: I write the plan with its estimate in tokens; the
   plan review (`/grill`) reads it once in a subagent and only judges it, since the author is the worst judge of their
   own plan; an amendment it asks for is fixed, never reviewed again. I show the user the plan with the review's
   verdict and build on their go. No other subagents.
3. **Build.** Each commit gets the design check before the next begins (the Codex's Verification). Fast tests judge
   what a machine can; what the user judges by using it (the look, the feel, the words on screen) waits for them, and
   the slow suites and the approved snapshot wait for the end.
4. **The fast loop.** When there is something to try, the user tries it the way it is used and reports; I change it,
   they try again. Each round is quick.
5. **The end.** With the user: the slow suites, the approved snapshot rewritten and its diff read, the tests that move
   on purpose. A wave with a note records there the tokens spent beside the estimate. Then the Codex's close-out
   ("Closing a wave"), the queue's own where it names one, and a publish on the user's word.

## A wave that spans sessions
- **Stopping partway:** the wave's note — its queue iteration's, or a new one under `tasks/` — gets a "State at
  handover": what is done, with its commits; what is left, in order; the questions asked and not answered. The
  handover points to it; the next session starts there, the open questions first.
- **A queue** lists its iterations and holds their decisions; what the user reports broken runs before the next one.

## What it sets that other rules leave open
- **A bug the user sees on screen:** their report is the reproduction; its browser test waits for the end. A logic bug
  still gets a unit test first.
- **A push:** I do not check the live site afterwards; the user does.

Everything in `.claude/CODEX.md` still holds, with the queue's decisions and the user block.
