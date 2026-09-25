# Infrastructure Lessons
Rule plus pointer, one or two lines; the story lives in the wave's record. How to work with the user: the block at the
top of `CLAUDE.md`.

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
- **A scripted edit asserts after its last change and before it writes**, on the construct it removed, never on text it
  inserts (a false positive then costs a rerun, not a revert); chain it with `&&` so a failed check never commits.
  (HK-005)
- **A scripted edit puts a comment on its own line**, and prints what lies between two anchors before a range replace.
  (CONCEPT-001)
- **Show a new pin RED against the old state and GREEN against the new** before trusting it, and read its logic for a
  self-contradiction. (HK-016)
- **A coverage claim quotes the assertion lines of an enabled test, read this session**: a file name, a grep hit or a
  disabled test guards nothing. (Phase 6b, Phase 10)
- **A new gate ships green on its first commit**: baseline today's debt, then let the baseline only shrink. (O2)
- **A docs edit is a pipeline**: `script && git add && git commit` in one chain; anchor inserts on a unique line (assert
  one match); read the edited region before committing; never write "the top commit is X" into a file the next commit
  buries. (HK-013)
- **Never `git add -A` or `git add .`**: name the paths, `git status --short` first. (GitHub Pages audit)
- **`/close-wave` runs after the wave's last action** — the merge, the push, the live check — or re-runs its row 2
  after them. (WF-010)
- **Grep the backlog before presenting a finding as new.** (HK-023)
- **An import is not a call**: grep the call before planning; a public method with no caller is a regression to log
  (`git log -S`), not a feature to wire. (Phase 10)
- **Verify a tool against the tool, not the plan**: list what it holds and probe its flags and exit codes on a scratch
  run before designing around it. (O2)
- **`git status --short` after a test run**: a dirty tree means a test leaks files.
- **A ritual costs less than the failure it prevents**: size it from the diff, judgment only adds steps with a named
  reason, one record per wave, a cap on any file every close-out appends to; question a habit before codifying it into a
  command. (WF-008)
- **A law states the principle with its incident as the pointer**; the grill asks only questions with a verifiable
  form. (WF-009)
