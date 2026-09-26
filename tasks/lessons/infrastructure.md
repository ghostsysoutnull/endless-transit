# Infrastructure Lessons
Process lessons, in the form the Codex's Self-Improvement Loop sets. How to work with the user: the block at the top of
`CLAUDE.md`.

- **A test never reads, writes or deletes a file the player owns**: the path is injectable, the test uses a temp file
  and asserts the real one is untouched — never deletes it to unblock a prompt. (HK-012)
- **Poll, don't sleep**: wait for an async effect with a deadline loop, never a fixed sleep.
- **Two places sharing a pattern are fixed together**: converting one alone leaves two patterns and no owner.
- **A new test that fails unexpectedly is information**: find out why before touching the assertion.
- **`replace_all` matches exact whitespace**: grep that every instance is indented alike first, else replace each site.
- **Blast radius includes the tests**: grep them separately from the source for every field or signature changed.
  (Phase 3b-ii)
- **Move code by script**: lift the text, apply only the listed substitutions, assert the reverse gives back the
  original. (Phase 7)
- **A scripted edit checks itself and commits in one chain**: anchor on a unique line (assert one match), print what
  lies between two anchors before a range replace, put a comment on its own line; after the last change and before it
  writes, assert on the construct it removed, never on text it inserts; then `script && git add <paths> && git commit`,
  the edited region read before the commit. (HK-005, HK-013, CONCEPT-001)
- **Show a new pin RED against the old state and GREEN against the new** before trusting it, and read its logic for a
  self-contradiction. (HK-016)
- **A new gate ships green on its first commit**: baseline today's debt, then let the baseline only shrink. (O2)
- **A file never names the commit it sits under**: "the top commit is X" is false after the next commit. (HK-013)
- **Never `git add -A` or `git add .`**: name the paths, `git status --short` first. (GitHub Pages audit)
- **Grep the backlog before presenting a finding as new.** (HK-023)
- **An import is not a call**: grep the call before planning; a public method with no caller is a regression to log
  (`git log -S`), not a feature to wire. (Phase 10)
- **Verify a tool against the tool, not the plan**: list what it holds and probe its flags and exit codes on a scratch
  run before designing around it. (O2)
- **`git status --short` after a test run**: a dirty tree means a test leaks files.
- **A ritual costs less than the failure it prevents**: size it from the diff, add a step only with a named reason, and
  question a habit before codifying it into a command. (WF-008)
- **Weigh a review against what it can find before running it**: a plan too big to review cheaply is cut, not
  reviewed twice. (U02)
