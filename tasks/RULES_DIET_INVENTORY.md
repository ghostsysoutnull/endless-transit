# Always-loaded rules inventory (2026-09-25)

Categories: a user interaction · b engineering practice · c Groovy/terminal-only · d close-out/records · e superseded/dead · f other

| # | rule | file:line | words | cat | still applies? | verdict |
|--|--|--|--|--|--|--|
| 1 | Backup strategy (tarballs) | `tasks/lessons/infrastructure.md:4` | 20 | c | no (no backup script in use) | retire |
| 2 | Verified AI-TDD repro test | `tasks/lessons/infrastructure.md:5` | 22 | b | yes | merge with CODEX:79/114 + PM06:44 (third home) |
| 3 | Test artifact convention | `tasks/lessons/infrastructure.md:7` | 64 | b | yes (Groovy examples) | shorten; move to terminal/tasks/lessons/groovy-tooling.md (terminal-only) |
| 4 | Tests never touch player-owned file | `tasks/lessons/infrastructure.md:8` | 105 | b | yes | shorten to rule + (HK-012) |
| 5 | Polling over sleeping | `tasks/lessons/infrastructure.md:9` | 47 | b | yes | shorten |
| 6 | git status after vinc.sh --test | `tasks/lessons/infrastructure.md:10` | 42 | c | Groovy frozen | move to groovy-tooling.md |
| 7 | Codegen in tests = missing abstraction | `tasks/lessons/infrastructure.md:11` | 50 | b | rarely | move to groovy-tooling.md |
| 8 | Consistency beats correctness-in-isolation | `tasks/lessons/infrastructure.md:13` | 46 | b | yes | shorten (overlaps Shape #1 one owner) |
| 9 | Failing test during authoring is information | `tasks/lessons/infrastructure.md:15` | 49 | b | yes | shorten |
| 10 | Silent defaults deserve a guard (?:) | `tasks/lessons/infrastructure.md:16` | 44 | b | yes; web has WarningSink rule | move to groovy-tooling (web/CLAUDE.md already owns [THEME_WARN]) |
| 11 | replace_all only when indentation identical | `tasks/lessons/infrastructure.md:18` | 86 | b | yes (tool) | shorten to one line |
| 12 | Blast radius includes test tree | `tasks/lessons/infrastructure.md:20` | 73 | b | yes | shorten |
| 13 | 5-file limit counts production files | `tasks/lessons/infrastructure.md:22` | 68 | e | 5-file cap suspended by Standing Order; user "without the 5max limit" (09-20) | retire (with the cap) |
| 14 | Run full suite whenever coherent (2.5s) | `tasks/lessons/infrastructure.md:24` | 105 | c | Groovy frozen; web has its own "targeted while working" (CODEX:45) | move to groovy-tooling; contradicts CODEX item 8 for web |
| 15 | Clear backlog between phases | `tasks/lessons/infrastructure.md:26` | 62 | d | phase model gone | retire |
| 16 | Move method bodies by script w/ reverse check | `tasks/lessons/infrastructure.md:28` | 63 | b | yes, refactors | shorten; load on demand |
| 17 | Assert after last edit; not on inserted text | `tasks/lessons/infrastructure.md:30` | 127 | b | yes | shorten (127 w story) |
| 18 | Run a new pin RED and GREEN | `tasks/lessons/infrastructure.md:31` | 90 | b | yes | shorten; merge with web.md mutant lesson |
| 19 | Re-pin literals by allow-list script | `tasks/lessons/infrastructure.md:32` | 119 | c | Groovy content phase | move to groovy-tooling |
| 20 | New gate ships green; baseline then ratchet | `tasks/lessons/infrastructure.md:34` | 109 | b | yes | shorten (Groovy CodeNarc detail out) |
| 21 | Verify rule names vs the jar | `tasks/lessons/infrastructure.md:35` | 111 | c | Groovy/CodeNarc | move to groovy-tooling (keep 1-line general form) |
| 22 | Close-out script is a pipeline; chain steps | `tasks/lessons/infrastructure.md:36` | 166 | d | yes, partly | shorten to 2 rules; story out (166 w) |
| 23 | "Close the session" = doc audit done (9-row list) | `tasks/lessons/infrastructure.md:37` | 233 | d | superseded by /close-wave + Standing Order 5 | retire (it says itself the command is the source of truth; 233 w) |
| 24 | A workflow fix must cost less than the failure | `tasks/lessons/infrastructure.md:38` | 131 | d | yes | shorten; merge with :39 |
| 25 | A process step is offered with cost/teach/failure | `tasks/lessons/infrastructure.md:39` | 72 | a | yes (2026-09-25) | merge with :38 |
| 26 | A law states the principle; incident is pointer | `tasks/lessons/infrastructure.md:40` | 84 | d | yes | merge with CODEX:160 |
| 27 | "Expand item X" = read code, bring options | `tasks/lessons/infrastructure.md:41` | 36 | a | yes | keep, move to user block |
| 28 | Never git add -A | `tasks/lessons/infrastructure.md:42` | 59 | b | yes | keep (dup: CODEX:35, RECOVERY:9) -> one home |
| 29 | Close-out ending in leftovers list is not one | `tasks/lessons/infrastructure.md:43` | 68 | a | yes | merge with :46 + memory no-dangling-facts + CODEX:32 |
| 30 | Constraint stated with request is outside "your take" | `tasks/lessons/infrastructure.md:44` | 49 | a | yes | keep in user block |
| 31 | Take on a game idea starts at the concept | `tasks/lessons/infrastructure.md:45` | 38 | a | yes | keep in user block |
| 32 | A leftover fact carries its verdict | `tasks/lessons/infrastructure.md:46` | 41 | a | yes | merge (dup memory feedback-no-dangling-facts) |
| 33 | A confirm option names its scope | `tasks/lessons/infrastructure.md:47` | 35 | a | yes | keep in user block |
| 34 | UI change unverified until seen; find the browser | `tasks/lessons/infrastructure.md:48` | 66 | b | yes (web) | move to tasks/lessons/web.md |
| 35 | Scripted edits: comment own line, bounded cut | `tasks/lessons/infrastructure.md:49` | 56 | b | yes | shorten; merge with :30 |
| 36 | One decision per message, (A) ★ pick first | `tasks/lessons/infrastructure.md:50` | 67 | a | yes | merge: dup memory one-question, UI_QUEUE D17, START_PROMPT 4 |
| 37 | Design options ambitious; build the pick | `tasks/lessons/infrastructure.md:51` | 47 | a | yes | merge: dup UI_QUEUE D17 |
| 38 | Options in plain words, no § | `tasks/lessons/infrastructure.md:52` | 47 | a | yes | merge: dup memory eli5 |
| 39 | Commit/push Directive covers close-out | `tasks/lessons/infrastructure.md:53` | 43 | a | yes | merge: dup memory no-confirmation-loops; contradicts PM11:26, close-wave header |
| 40 | Import is not a call; caller-less method | `tasks/lessons/infrastructure.md:56` | 110 | c | Groovy Phase 10 | move to groovy-tooling / core.md |
| 41 | A disabled test guards nothing | `tasks/lessons/infrastructure.md:57` | 39 | b | yes | merge into CODEX Coverage Claim (CODEX:130) |
| 42 | Coverage claim is not a grep hit | `tasks/lessons/infrastructure.md:58` | 113 | b | yes | merge: dup CODEX:130-133 + /grill check 1 |
| 43 | Title + "immutable mandates" | `.claude/CODEX.md:1-3` | 19 | f | contradicted by its own Standing Order | retire wording |
| 44 | Standing Order preamble: what it replaces | `.claude/CODEX.md:7-11` | 85 | e/f | yes | keep; it is the evidence of 5+ dead rules below |
| 45 | SO1 "hi" means go, keep going | `.claude/CODEX.md:13-15` | 47 | f | amended by SO8 | merge SO1-3 with SO8 (1 text) |
| 46 | SO2 main manages, one writer + history | `.claude/CODEX.md:16-24` | 164 | f | yes | shorten (history out) |
| 47 | SO3 No questions | `.claude/CODEX.md:25-26` | 30 | a | amended by SO8 plan gate | merge with SO8 |
| 48 | SO4 Safety net | `.claude/CODEX.md:27-29` | 57 | b | yes | keep |
| 49 | SO5 Lean records | `.claude/CODEX.md:30-31` | 39 | d | yes | keep |
| 50 | SO6 Ends clean, no leftovers | `.claude/CODEX.md:32-33` | 23 | a | yes | keep; home of leftovers rule (dup infra:43,46, memory) |
| 51 | SO7 No compat; never -A | `.claude/CODEX.md:34-35` | 26 | b | yes | keep |
| 52 | SO8 plan gate (3 sub-rules) | `.claude/CODEX.md:36-48` | 239 | f | yes (09-25) | keep; move UI-queue specifics to UI_QUEUE.md |
| 53 | Vinculum Protocol (read-only default, Directive words, standard responses) | `.claude/CODEX.md:52-62` | 149 | e/a | only outside queues; standard responses ("Do you authorize…") contradict no-confirmation-loops | retire; keep ONE line: "a question gets an answer, not action" everywhere |
| 54 | Session Initialization (todo.md, vinc.sh --test) | `.claude/CODEX.md:66-70` | 79 | e | Groovy frozen; todo.md is "older records" | retire |
| 55 | Persona: Vinculum Architect | `.claude/CODEX.md:74-75` | 23 | f | flavor | retire or 1 line |
| 56 | M1 Vibe priority (Cyber-Terminal) | `.claude/CODEX.md:77` | 8 | e | web rework drops terminal jargon (UI D1) | retire / rephrase for web |
| 57 | M2 Surgical precision | `.claude/CODEX.md:78` | 11 | b | yes | keep |
| 58 | M3 Reproduce bugs with tests | `.claude/CODEX.md:79` | 9 | b | yes | keep (single home of TDD rule) |
| 59 | M4 No code generation unless directed | `.claude/CODEX.md:80` | 11 | e | suspended by SO; contradicts queue work | retire |
| 60 | M5 Suggest /chronicle | `.claude/CODEX.md:81` | 18 | e | suspended; user: lean records | retire |
| 61 | Plan Mode Default (EnterPlanMode) | `.claude/CODEX.md:87-90` | 40 | e | suspended by SO; SO8 plan gate replaces | retire |
| 62 | Refactoring branch strategy, @CompileStatic, close-wave, retro | `.claude/CODEX.md:92-98` | 161 | c/d | Groovy frozen | move to terminal/CLAUDE.md |
| 63 | Subagent strategy / discipline | `.claude/CODEX.md:100-103` | 61 | b | yes | shorten, keep |
| 64 | Refactor guard 5 files | `.claude/CODEX.md:105-108` | 39 | e | suspended by SO; user rejected | retire |
| 65 | Never mark done without proof | `.claude/CODEX.md:111` | 10 | b | yes | keep |
| 66 | Visual baseline, vinc.sh verification, Gates table | `.claude/CODEX.md:112-128` | 314 | c | Groovy frozen | move to terminal/CLAUDE.md |
| 67 | Coverage Claim Protocol | `.claude/CODEX.md:130-133` | 65 | b | yes | keep (absorb infra:57,58) |
| 68 | OO Principles table (Shape Gate) | `.claude/CODEX.md:135-147` | 346 | b | yes; Groovy-flavored evidence (grep src/main, @CompileStatic) | keep; rewrite evidence column for web |
| 69 | Shape Claim Protocol | `.claude/CODEX.md:149-152` | 97 | b | yes | keep |
| 70 | Self-improvement loop (lessons home, no memory, rule+pointer) | `.claude/CODEX.md:157-161` | 139 | d | yes; "no memory" contradicted by practice | keep; decide memory vs file |
| 71 | Workflow improvement cadence (phases 1,4,7,10) | `.claude/CODEX.md:164-167` | 79 | e | phase model gone | retire |
| 72 | Safety Mandates: import both post-mortems | `.claude/CODEX.md:171-174` | 27 | e | see below | retire imports |
| 73 | PM 03-11 story (objective, failure, causes, lessons) | `tasks/lessons/POST_MORTEM_2026_03_11.md:1-22` | 333 | e | Groovy incident, story | move to journals/ (history); not loaded |
| 74 | Mandate 1 Explicit confirmation (ZERO_ASSUMPTION) | `tasks/lessons/POST_MORTEM_2026_03_11.md:25` | 42 | e | contradicts SO, memory no-confirmation-loops | retire |
| 75 | Mandate 2 Git Gatekeeper | `tasks/lessons/POST_MORTEM_2026_03_11.md:26` | 23 | e | contradicts infra:53, SO2 | retire |
| 76 | Mandate 3 Reference screenshots (vinc --scan) | `tasks/lessons/POST_MORTEM_2026_03_11.md:27` | 25 | c | Groovy; CODEX:112 says --scan never draws HUD | retire |
| 77 | Mandate 4 Semantic string tests in InitialScreenTest | `tasks/lessons/POST_MORTEM_2026_03_11.md:28` | 20 | c | Groovy | retire |
| 78 | Mandate 5 Diff-verify moved files | `tasks/lessons/POST_MORTEM_2026_03_11.md:29` | 28 | b | yes | keep 1 line in CODEX subagent discipline |
| 79 | Mandate 6 Incremental execution | `tasks/lessons/POST_MORTEM_2026_03_11.md:30` | 21 | e | dup CODEX:105-108 | retire |
| 80 | PM 03-06 story (4 Groovy bugs, struggles) | `tasks/lessons/POST_MORTEM_2026_03_06.md:1-31` | 431 | c | Groovy history | move to journals/ |
| 81 | Safe accessors / lazy-loading law | `tasks/lessons/POST_MORTEM_2026_03_06.md:37-38` | 34 | c | web: owned by web/CLAUDE.md (Location) | retire here (web/CLAUDE.md + model.md own it) |
| 82 | Forensic debug mode | `tasks/lessons/POST_MORTEM_2026_03_06.md:41` | 40 | c | Groovy | retire |
| 83 | Verification-first repro | `tasks/lessons/POST_MORTEM_2026_03_06.md:44` | 36 | b | dup CODEX:79 | retire (dup) |
| 84 | VibeTest idea | `tasks/lessons/POST_MORTEM_2026_03_06.md:47` | 35 | c | idea, never a rule | retire |
| 85 | Conclusion | `tasks/lessons/POST_MORTEM_2026_03_06.md:50` | 43 | f | story | retire |
| 86 | Read the verb: why->answer; Execute->act | `memory/feedback-answer-the-question-asked.md` | 191 | a | yes; broken 3x after written | keep; promote to top of always-loaded user block + mixed-message clause |
| 87 | ELI5, no wall of text, plain words | `memory/feedback-eli5-summaries.md` | 252 | a | yes; broken 4x after written | keep; shorten (dup infra:52) |
| 88 | Commit/push Directive covers close-out | `memory/feedback-no-confirmation-loops.md` | 166 | a | yes | merge (dup infra:53) |
| 89 | Leftover fact carries its verdict | `memory/feedback-no-dangling-facts.md` | 191 | a | yes | merge (dup infra:46, :43, CODEX SO6) |
| 90 | Batch findings once; recommend only within scope | `memory/feedback-no-drip-findings.md` | 227 | a | yes | keep; scope part dup START_PROMPT 4 |
| 91 | Vague "do it" never overrides an earlier decision | `memory/feedback-no-scope-creep-on-vague-go.md` | 180 | a | yes | NOT INDEXED in MEMORY.md -> never loaded; index or move |
| 92 | One question per message (web port only) | `memory/feedback-one-question-at-a-time.md` | 149 | a/e | self-scoped to the ended port, says "delete when port ends" | rescope (all efforts) or retire in favour of one home |

## Words by category (rows above)

| cat | rows | words |
|--|--|--|
| a | 19 | 1803 |
| a/e | 1 | 149 |
| b | 30 | 2054 |
| c | 13 | 1406 |
| c/d | 1 | 161 |
| d | 7 | 854 |
| e | 13 | 788 |
| e/a | 1 | 149 |
| e/f | 1 | 85 |
| f | 6 | 535 |

## Duplicates (same rule, several homes)
- One question per message / lettered / pick marked: infra:50, memory one-question, UI_QUEUE D17, RECOVERY START_PROMPT 4.
- Ambitious options, build the pick: infra:51, UI_QUEUE D17.
- Plain words, no §: infra:52, memory eli5, START_PROMPT 4.
- Leftover fact carries its verdict / no leftovers: infra:43, infra:46, memory no-dangling-facts, CODEX SO6.
- Commit/push covers close-out: infra:53, memory no-confirmation-loops.
- Scope creep: memory no-drip (2026-09-24 part), START_PROMPT 4, infra:44 (partial).
- Repro test before fix: infra:5, CODEX M3 (:79), CODEX :114, PM06:44.
- Coverage claims: infra:57, infra:58, CODEX:130-133, /grill check 1.
- 5-file cap: CODEX:105-108, PM11 mandate 6, infra:22, START_PROMPT 5.
- Never git add -A: infra:42, CODEX SO7, RECOVERY:9.
- Lazy-loading law: PM06, web/CLAUDE.md (Location), terminal model.md.

## Contradictions
- PM11 mandates 1-2 (confirm every file edit, every commit/push) + CODEX Vinculum standard responses ("Do you authorize me…?") + close-wave header ("never commits … without a Directive") + START_PROMPT 5 ("Push only on the user's word") vs infra:53 + memory no-confirmation-loops + SO2 (commit, push without asking).
- CODEX title "immutable mandates" vs its own SO preamble suspending 7 of them.
- CODEX SO1/SO3 ("hi means go", "No questions") vs SO8 (plan gate, wait for go) — the amendment sits after, the original text is unchanged.
- Vinculum "an Inquiry never authorizes action" is switched OFF in queue sessions by SO — the only written answer-don't-act rule outside memory disappears exactly in the sessions where "keep going" is the default.
- infra:24 "full suite after every edit" vs SO8 "targeted while working, full once".
- CODEX "Do NOT use persistent memory for project lessons" vs 7 user-interaction lessons living in memory.
- memory one-question "web port only; delete when the port ends" (port ended 09-24) vs infra:50 "every question".
- .claude/settings.json PreToolUse hook "[VINCULUM_PROTOCOL] git commit/push requires explicit user authorization" — dead config (reads $CLAUDE_TOOL_INPUT, which is never set; no hook output in any transcript), but a live statement of the retired rule. Allow-list `./vinc.sh:*` also stale (script moved to terminal/).
- Dangling link: memory eli5 + no-scope-creep point at [[vinculum-protocol-authorization]] (no such file).

## Correction incidents, last ~16 sessions (UTC; commit dates are -0500)
| when | session | user line (short) | status |
|--|--|--|--|
| 09-17 04:17 | fc5346f0 | "EVERY TIME I NEED TO ASK YOU IF ALL DOCS ARE UPDATED" | no rule yet (HK-019 lesson born) |
| 09-20 19:08 | dc7bec3c | "no wall of text" | pre-emptive reminder with a new request (prior reply 229 words) — eli5 (09-11) not trusted |
| 09-20 19:22 | 7e441f90 | "do not outrank hk-022, I told you not to." | in-session instruction; rule infra:44 born |
| 09-20 20:18 | 7e441f90 | "why the end wave did not take care of this All" | /close-wave followed, missed it (process gap) |
| 09-20 20:57 | 9285a592 | "what the hell is option 1 scope??" | no rule yet (infra:47 born) |
| 09-20 21:05 | 9285a592 | "without the 5max limit … I do not want bureacracy" | rule followed, user outgrew it |
| 09-20 21:17 | 9285a592 | "THIS IS AN INFERNAL LOOP!!!" | no rule yet (memory no-drip born); caused by confirm-rules |
| 09-20 21:18 | 5200c230 | "no wall of text, use OO terms, BRIEF" | pre-emptive (first message of the session) |
| 09-21 01:03 | 0a4ec6f9 | "you just roll these facts... what should I do" | no rule yet (memory no-dangling born) |
| 09-21 01:07 | 0a4ec6f9 | "repeat but no wall of text" | BROKEN — memory eli5 |
| 09-21 02:20 | 1fb680fc | "why I cannot go B/F … Just reply" | no rule yet (memory answer-the-question born 18:14Z) |
| 09-21 18:49-54 | 2dc4b8c6 | "one question at a time" | no rule yet |
| 09-21 20:39 | 2dc4b8c6 | "I asked if we should start the plan" | BROKEN — memory answer-the-question (2.5h old); mixed Directive+question |
| 09-21 20:59 | cb0a5eaa | "how can I know hat $12 MEANS" | no rule yet (infra:52 born) |
| 09-21 21:32 | cb0a5eaa | "I do not want an infernal loop again!" | partly covered by memory no-drip; contradicted by PM11/close-wave/Vinculum; infra:53 + memory no-confirmation-loops born minutes later |
| 09-21 21:43 | cb0a5eaa | "I ASKED YOU QUESTIONS!! WHAT ARE YOU DOING?" | BROKEN — memory answer-the-question; mixed Directive+question |
| 09-24 23:23 | cb0a5eaa | "stop asking for iphone or safari" | no rule yet (START_PROMPT 4 born) |
| 09-25 01:36 | e016f9a7 | "present them with options and mark your preference" | BROKEN-ish — infra:50 (09-21) but self-scoped to the port |
| 09-25 01:37-38 | e016f9a7 | "do not choose the lazy simple option! and no wall of text" | lazy: no rule yet (infra:51 born); wall: BROKEN — eli5 |
| 09-25 12:24 | ff3b2414 | "you did not show me a plan, a grill, nothing" | rule FOLLOWED (SO1: "hi" = go, no grill) — user outgrew it |
| 09-25 12:29 | ff3b2414 | "why you suggest the opposite at first" | no rule for process options yet (infra:39 born) |
| 09-25 12:38 | ff3b2414 | "my last msg was just a question and you just moved with 1000 actions" | BROKEN — memory answer-the-question; after writing the announced rules the agent also committed, merged, re-branched and launched the U01 writer: always-loaded "hi = keep going" beat on-demand "answer only" |

## Mid-session edits do not reach the running session
SO item 8 and infra:39 were committed 12:34:54Z; this subagent (launched 12:41Z) received a CODEX without item 8 and an infrastructure.md without line 39 in its injected context. At 12:30Z the parent told the user the new lesson "applies from this session on". An always-loaded file is read at session start.
