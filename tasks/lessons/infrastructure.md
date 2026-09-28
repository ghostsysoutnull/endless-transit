# Infrastructure Lessons
Process lessons, in the form the Codex's Self-Improvement Loop sets. How to work with the user: the block at the top of
`CLAUDE.md`.

- **A test never reads, writes or deletes a file the player owns**: the path is injectable, the test uses a temp file
  and asserts the real one is untouched — never deletes it to unblock a prompt.
- **Poll, don't sleep**: wait for an async effect with a deadline loop, never a fixed sleep.
- **Two places sharing a pattern are fixed together**: converting one alone leaves two patterns and no owner.
- **A new test that fails unexpectedly is information**: find out why before touching the assertion.
- **`replace_all` matches exact whitespace**: grep that every instance is indented alike first, else replace each site.
- **Blast radius includes the tests**: a changed field or signature's references come from the `LSP` tool's
  `findReferences`, backed by a grep of `web/tests` and `web/e2e` for its name — the tests are a separate TypeScript
  project.
- **Move code by script**: lift the text, apply only the listed substitutions, assert the reverse gives back the
  original.
- **A scripted edit checks itself and commits in one chain**: anchor on a unique line (assert one match), print what
  lies between two anchors before a range replace, put a comment on its own line; after the last change and before it
  writes, assert on the construct it removed, never on text it inserts; then `script && git add <paths> && git commit`,
  the edited region read before the commit.
- **Show a new pin RED against the old state and GREEN against the new** before trusting it, and read its logic for a
  self-contradiction.
- **A new gate ships green on its first commit**: baseline today's debt, then let the baseline only shrink.
- **A file never names the commit it sits under**: "the top commit is X" is false after the next commit.
- **Never `git add -A` or `git add .`**: name the paths, `git status --short` first.
- **Never type `git checkout <rev> --` without a path**: it detaches HEAD and hides the branch's files; restore single
  files with `git restore --source=<rev> <path>`.
- **Grep the backlog before presenting a finding as new.**
- **An import is not a call**: find the callers (the `LSP` tool's `incomingCalls`) before planning; a public method
  with no caller is a regression to log (`git log -S`), not a feature to wire.
- **Verify a tool against the tool, not the plan**: list what it holds and probe its flags and exit codes on a scratch
  run before designing around it.
- **`git status --short` after a test run**: a dirty tree means a test leaks files.
- **A ritual costs less than the failure it prevents**: size it from the diff, add a step only with a named reason, and
  question a habit before codifying it into a command.
- **Weigh a review against what it can find before running it**: a plan too big to review cheaply is cut, not reviewed
  twice.
- **A record never restates the size of a list it points to**: a count beside the list's owner goes stale with
  every edit; the owner's check boxes are the progress.
- **A plan note holds decisions, picks and pointers**: numbers and details the code and its comments already hold
  are not restated, and a review's asks enter the note only where they change a decision.
