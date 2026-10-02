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
4. **The fast loop.** When the user asks for one (the block's rule 15), or when there is something to try. A round:
   I conceive the change on the OO and TypeScript principles before a line is written, the Shape row for anything new
   in the loop's note, then edit, with no plan shown, reviewed or approved and no subagent; `npm run phone` type-checks,
   builds the working tree and uploads it to the phone address (`web/CLAUDE.md`, "Phone check"); the user tries it
   the way it is used and reports. Nothing else runs in a round — no test, lint, design check or record; a bug met on
   the phone is fixed at once and gets its test at approval. Each look the user
   keeps is a save-point commit on the branch, untested, so a dead end is one revert and a suite that fails at the end
   is bisected over the save points. Nothing merges or publishes until the user approves; then the fast gate, the
   touched tests, the design check (every shape break it finds is fixed, none logged: no plan judged the diff first),
   the record written from what was kept, and step 5.
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
  still gets a unit test first, except in a fast loop, where its test comes at approval.
- **A push:** I do not check the live site afterwards; the user does.
- **Subagents only read:** the plan review, the design check and a wide search (the built-in `Explore` agent); the
  build is mine.

Everything in `.claude/CODEX.md` still holds, with the queue's decisions and the user block.
