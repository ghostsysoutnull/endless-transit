# Rules diet — plan (WF-012, widened)

**Status:** plan, not started. Written 2026-09-25 in a process session; the build runs in the next session.
**Evidence:** an independent read-only investigation of every rule home and 16 past sessions (22 user corrections).
Its row-by-row inventory (86 rules: file:line, words, category, verdict, plus the duplicate, contradiction and
incident lists) is `tasks/RULES_DIET_INVENTORY.md` — model output: step 0 re-reads every cited line before trusting it.

## The problem, in the evidence's words
- **Always loaded ≈ 7,000 words** (≈ 9,200 in a web session): `CLAUDE.md` 166, `.claude/CODEX.md` 2,441,
  `tasks/lessons/infrastructure.md` 3,109, the two March post-mortems 1,152, memory index 127.
- **What breaks is how the agent works with the user**, never a Groovy or engineering rule: 5 breaks + 1 loophole in
  22 corrections, all against rules that live in full only in memory (answer-don't-act ×3, no wall of text ×2, a
  rule scoped to the finished port). Those rules are 9 % of the always-loaded words, at the tail of the file.
- **Contradiction beats size.** "Keep going / no questions" (always loaded, written as law) wins over "a question gets
  only an answer" (memory, on demand). Four standing "confirm before commit / push only on the user's word" rules
  fight three "never ask for a second commit" rules — the source of the "infernal loop".
- **Dead weight:** ≈ 36 % of the always-loaded words are Groovy-only (1,567) or superseded (1,022); most of the rest are
  stories where a sentence would do.
- **Growth without order:** 11 of 22 corrections had no rule yet; each adds a bullet of equal weight.
- **Timing:** a rule written to an always-loaded file reaches the next session, not this one, and not a sub-agent
  spawned in this one (it got the pre-edit CODEX). A brief carries the rules its agent needs.

## Target
| Home | Holds | Loads | Words |
| :-- | :-- | :-- | :-- |
| `CLAUDE.md`, first block **"Working with the user"** | ≤ 12 one-line rules in priority order (below) — the one home; memory and the queue point here | always | ≈ 300 |
| `.claude/CODEX.md` | one current Standing Order (no amendments stacked on it, subordinate to the block above); Coverage Claim; OO table; Shape Claim; subagent discipline; the lesson format | always | ≈ 1,300 |
| `tasks/lessons/infrastructure.md` | ≈ 15 engineering rules, one or two lines each, rule + pointer | always | ≈ 600 |
| `terminal/CLAUDE.md` + `terminal/tasks/lessons/groovy-tooling.md` | the vinc.sh Gates table, branch strategy, Groovy tooling lessons | `terminal/` touched | + ≈ 1,600 |
| `journals/` | the two March post-mortems, as history | never | — |
**Always loaded ≈ 7,000 → ≈ 2,200 words.**

The user block, draft wording (the build shows it verbatim before writing it):
1. A question gets only an answer — no edit, commit, branch or agent. A message with a question and a directive: answer
   first, then do only what the directive names. ("hi" in a queue session is a go, not a question.)
2. A question or process talk inside a queue run pauses the run until an explicit go.
3. Chat is short and plain: no wall of text, no §, no document shorthand; detail goes in files.
4. One question per message, lettered options, the pick first as `(A) ★ …`; design options ambitious, process options
   lean (each names its cost, what it teaches, the failure it prevents).
5. A pick is built, not re-asked.
6. Stay inside what was asked; recommend only there; a vague go takes the smaller, reversible reading.
7. Every leftover fact carries its verdict — nothing to do, what was done, or one question. No leftovers list.
8. A commit/push directive covers the wave's close-out records.
9. "Your take" means picks on what is still open, starting at the concept, not the code.
10. All findings at once, fixed once; never end a finished task with "fix this too?".
11. A rule written this session binds the next; now, state it in chat and put it in every brief.

## Steps (next session) — order by value, smallest first
0. **Refresh the inventory** (main session, a script): `wc -w` every home; re-read each cited file:line of
   `tasks/RULES_DIET_INVENTORY.md` (this session's edits moved some). It is the checklist the survival check (step 6)
   runs against.
1. **The user block** (main session — the wording matters most, the user sees it verbatim first). Write it; rewrite
   Standing Order items 1–3 and 8 as one current text that defers to it.
2. **Kill the contradictions:** the Vinculum "Standard Responses" and the post-mortems' per-commit confirm mandate
   ("Git Gatekeeper": a separate confirmation for every commit) against "a commit/push directive covers the close-out".
   **Kept on purpose:** "Push only on the user's word" (START_PROMPT 5, `.claude/commands/close-wave.md:5,73`) — it
   agrees with rule 8, and deleting it would let the agent push unasked outside a queue. Also the dead PreToolUse hook and the `./vinc.sh:*` allow entry in `.claude/settings.json` (the hook reads
   `$CLAUDE_TOOL_INPUT`, which is never set — it has never fired).
3. **Move Groovy-only** rules to `terminal/` by script, text unchanged (reverse check: the moved lines match the
   originals byte for byte). The post-mortems move to `journals/`; their `@` imports in the CODEX go and the pointer in
   `tasks/RECOVERY_PROMPT.md` (Context Links, "Lessons + safety mandates") follows them.
4. **Retire the superseded** (Session Initialization list, Plan Mode Default, the 5-file cap in its four homes, the
   phase cadence, persona mandates 1/4/5, the backup and between-phases bullets, the nine-item close-out list now owned
   by `/close-wave`), each with a one-line reason in the commit.
5. **Shorten stories to rule + pointer.** WF-012's risk: a shortened lesson can lose its rule. So the writer produces
   one table — old bullet | new line | what was cut — and the user approves the table in one pass, not bullet by bullet
   in chat.
6. **Survival check** (one fresh agent): given the step-0 checklist and the new files, list every rule with no home
   and every rule that changed meaning. Cost ≈ 60–100k tokens; it teaches what the writer cannot see in its own edit;
   it prevents WF-012's named failure.
7. **One owner for the user rules:** the seven memory notes become one pointer to the user block (or retire), the
   index stays true, the broken `[[vinculum-protocol-authorization]]` links go; UI_QUEUE Decision 17 and START_PROMPT 4
   become one-line pointers to the block. CODEX section names stay, or the `CODEX § 4` pointers
   (`tasks/RECOVERY_PROMPT.md:12,36`) are updated in the same commit.
8. **Gates and records:** `./terminal/vinc.sh --docs` green — it guards only the handover's facts and size, **not**
   rule survival: step 6 and the user's read of steps 1 and 5 are the only guards; one merge, one note
   in the WF-012 entry; tell the user the new rules bind from the next session.

**Optional (decide at step 8):** a word cap on the user block (12 rules) and on `infrastructure.md` in `--docs`, so the
file cannot silently regrow — a new rule then merges or replaces.

## Commits and revert unit
Branch `docs/rules-diet`; one commit per step (1, 2, 3, 4, 5, 7), each leaving every rule with exactly one live home
(a move is one commit: add in the new home and delete in the old together). A step that fails the survival check is
reverted alone. Merge `--no-ff` after step 8; push on the user's word.

## Agents
Main session: steps 0–2 and 8 (short, and the wording the user must see). One writer agent: steps 3–5 and 7 from the
inventory, returning the step-5 table before it edits. One fresh checker: step 6. No reviewer beyond that.

## Not in scope
The web law (`web/CLAUDE.md`, 1,841 words, loads in every queue session) — its own diet later if the evidence shows a
cost. The `/grill` and `/close-wave` commands' bodies beyond the two lines named.
