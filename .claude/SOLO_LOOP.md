# The Solo loop

How every wave runs (the Codex's unit: a queue iteration, a backlog item, a docs session, a one-line fix). Law mode
(`.claude/LAW_MODE.md`) adds what work on the rules needs.

## The loop
1. **Scope.** A wave starts from a scope the user accepted: the handover's next step after "hi", or a directive. A
   directive that names the change is its own go: it skips to the build (the user block).
2. **Plan, review, show.** For a scope accepted without its how: I write the plan; the
   plan review (`/grill`) reads it once in a subagent and only judges it, since the author is the worst judge of their
   own plan; an amendment it asks for is fixed, never reviewed again. I show the user the plan with the review's
   verdict and build on their go.
3. **Build.** The finished piece gets the design check once, before it merges (the Codex's Verification). Fast tests judge
   what a machine can; what the user judges by using it (the look, the feel, the words on screen) waits for them, and
   the slow suites and the approved snapshot wait for the end.
4. **The fast loop.** When there is something to try, the user tries it the way it is used and reports; I change it,
   they try again. Each round is quick.
5. **The end.** With the user: the slow suites, the approved snapshot rewritten and its diff read, the tests that move
   on purpose. Then the Codex's close-out
   ("Closing a wave"), the queue's own where it names one, and a publish on the user's word.

## Ending a session
Every session ends with a handover, so the next one starts from "hi" alone. It runs in one chain:
1. **When.** The session ends on the user's word, whether its wave is closed or open. When a wave closes, I say so.
2. **Nothing loose.** All work is committed on its branch. A gate red by plan is named red, with why, in the state.
3. **An open wave's state.** Its note — the queue iteration's, else `tasks/<branch name>.md` — gets "State at
   handover", rewritten whole: what is done, with its commits; what is left, in order; the decisions made this
   session; the questions asked and not answered.
4. **The handover.** `tasks/RECOVERY_PROMPT.md` is rewritten whole, in three fields and nothing else:
   - **Branch:** the branch the next session works on.
   - **Next:** one step — what it is, the file that holds its state, and "law mode" when it is work on the rules. An
     open wave is next. Else, in order: what the user reported broken, the queue's first unticked iteration, or the
     user's pick, asked before the handover is written.
   - **Open threads:** one pointer each to the file that holds it.
5. **Close.** The Codex's close-out; the branch merged into `master`; a push only on the user's word, since a push of
   `master` republishes the site.

## Starting from "hi"
The block's first rule reads **Next**. For an open wave, the scope stated is its note's, and the open questions are
asked first.

## What it sets that other rules leave open
- **A bug the user sees on screen:** their report is the reproduction; its browser test waits for the end. A logic bug
  still gets a unit test first.
- **A push:** I do not check the live site afterwards; the user does.
- **Subagents only read:** the plan review, the design check and a wide search (the built-in `Explore` agent); the
  build is mine.

Everything in `.claude/CODEX.md` still holds, with the queue's decisions and the user block.
