# Rules diet, step 5 — `tasks/lessons/infrastructure.md`, old → new

Today: 37 lessons, 2,015 words. After: 19 lines, ≈ 550 words. Line numbers are the file at `2a8d01f`.
**Goes to the block** = the rule already lives in the "Working with the user" block at the top of `CLAUDE.md` and is
deleted here (step 7 makes the block its one home). Two block rules gain a few words (marked **+block**).

| Line | Old (short name, words) | New line | What is cut |
| :-- | :-- | :-- | :-- |
| 4 | Verified AI-TDD (23) | deleted — CODEX owns it ("AI-TDD", "Empirical Verification") | a third copy |
| 6 | A test never touches a file the player owns (106) | A test never reads, writes or deletes a file the player owns: the path is injectable, the test uses a temp file and asserts the real one is untouched. (HK-012) | the six-month `session.trace` story, Groovy class names |
| 7 | Polling over sleeping (48) | Wait for an async effect with a deadline loop, never a fixed sleep. | the 50 ms detail |
| 9 | Consistency beats correctness-in-isolation (47) | Two places sharing a pattern are fixed together; converting one alone leaves two patterns and no owner. | the example |
| 11 | A failing test during authoring is information (50) | A new test that fails unexpectedly is information: find out why before touching the assertion. | the `TOPOLOGY_WARN` story |
| 13 | `replace_all` and indentation (87) | `replace_all` matches exact whitespace: grep that every instance is indented alike first, else replace each site. | the Groovy compile/runtime detail |
| 15 | Blast radius includes the test tree (74) | Blast radius includes the tests: grep them separately from the source for every field or signature changed. (Phase 3b-ii) | the three test names |
| 20 | Move bodies by script, reverse check (64) | Move code by script: lift the text, apply only the listed substitutions, assert the reverse gives back the original. (Phase 7) | the example substitution |
| 22 | Assert after the last edit (128) | A scripted edit asserts at its end, on the construct it removed, never on text it inserts; chain it with `&&` so a failed check never commits. (HK-005) | two incident stories |
| 23 | Run a new pin RED and GREEN (91) | Show a new pin RED against the old state and GREEN against the new before trusting it, and read its logic for a self-contradiction. (HK-016) | the `ThemeResourceCoverageTest` story |
| 25 | A new gate ships green (110) | A new gate ships green on its first commit: baseline today's debt, then let the baseline only shrink. (O2) | the CodeNarc keying detail |
| 26 | A close-out script is a pipeline (167) | A docs edit is a pipeline: `script && git add && git commit` in one chain; anchor inserts on a unique line (assert one match); read the edited region before committing; never write "the top commit is X" into a file the next commit buries. (HK-013) | the HK-013 story |
| 27 | A workflow fix must cost less (132) | A ritual costs less than the failure it prevents: size it from the diff, judgment only adds steps with a named reason, one record per wave, a cap on any file every close-out appends to. (WF-008) | the WF-007 story |
| 28 | A process step names its cost (73) | goes to the block (rule 6) | — |
| 29 | A law states the principle (85) | A law states the principle with its incident as the pointer; the grill asks only questions with a verifiable form. (WF-009) | the story |
| 30 | "Expand item X" (37) | goes to the block, **+block** rule 2: "*Expand X* → read the code, bring options, each with its change, cost and edge." | — |
| 31 | Never `git add -A` (60) | Never `git add -A` or `git add .`: name the paths, `git status --short` first. (GitHub Pages audit) | the story |
| 32 | No "leftovers" list (69) | `/close-wave` runs after the wave's last action — the merge, the push, the live check. (WF-010) The verdict half goes to the block (rule 9). | — |
| 33 | A constraint stated with the request (50) | Grep the backlog before presenting a finding as new. (HK-023) The rest goes to the block (rules 2 and 3). | — |
| 34 | A take starts at the concept (39) | goes to the block (rule 2) | — |
| 35 | A leftover fact carries its verdict (42) | goes to the block (rule 9) | — |
| 36 | A confirm option names its scope (36) | goes to the block (rule 6) | — |
| 37 | Scripted edits: comment line, bounded cut (57) | A scripted edit puts a comment on its own line, and prints what lies between two anchors before a range replace. (CONCEPT-001) | the story |
| 38 | One decision per message (68) | goes to the block (rule 6); **+block** rule 6: "never as prose ending 'want me to…?'" | — |
| 39 | Design options ambitious, a pick is built (48) | goes to the block (rule 6) | — |
| 40 | Options stand on their own words (48) | goes to the block (rule 5) | — |
| 41 | A commit/push directive covers the close-out (44) | goes to the block (rule 10) | — |
| 44 + 45 | A disabled test guards nothing (40) + A coverage claim is not a grep hit (114) | One line: a coverage claim quotes the assertion lines of an **enabled** test, read this session; a file name, a grep hit or a disabled test guards nothing. (Phase 6b, Phase 10) | the `GameMementoTest` story |

The two headings ("Patterns", "Mistakes/Corrections") become one list. The file's first line gains: "Rule plus
pointer, one or two lines; the story lives in the wave's record."
