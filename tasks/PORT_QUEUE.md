# The Port Queue
**What this is:** the web port (CONCEPT-002) cut into playable iterations. **"hi" = run the first unticked iteration, then
the next, until the queue is empty** — the rules are in `.claude/CODEX.md`, "The Standing Order". Technical spec:
`docs/analysis/WEB_PORT_STUDY.md`; **where the study and this file disagree, this file wins** (it is newer). Each
iteration leaves one short note, `tasks/port/<id>.md` (plan, Shape table, choices made, gate lines, what the tester can
try); the note and the merge commit are the record.

**Estimate (2026-09-21):** 10 iterations. An iteration that proves too big is split here.

## Decisions (user, 2026-09-21) — nothing here is asked again
1. **Runs perfectly on a phone.** Touch first: every action is a button big enough for a thumb, portrait layout works,
   nothing depends on hover or on a key. On desktop the keyboard is an extra, never a requirement.
2. **Every iteration ends in a live build** the user can test on a desktop browser and on a phone. Publishing is part of
   iteration 1. The run does not wait for the tester; whatever the user reports becomes a fix piece at the front.
3. **Browser tests run twice** in every iteration: a desktop profile and a phone profile (portrait, touch).
4. **Saves live in the browser only** (`localStorage`). No export, no import, no old saves. A browser may clear them — accepted.
5. **No journal in the game.**
6. **The Player's Guide wins** over the Groovy code when they disagree on a rule or a number; each case is listed in the note.
7. **Known bugs of the old game are fixed, never copied** (study 2.4): a dropped relic keeps its frequency; a relic counts
   once in the tally; a Keystone at 0 Hz is not "divisible by 11"; labels and map symbols that never showed are made to show.
8. **Debug commands** (spawn Keystone, set integrity, glitch menu) exist only in a debug mode; tests use them.
9. **Look and controls come from the visual mock** (`docs/analysis/mocks/ships-of-the-lattice-visual.html`); where mock and
   old game disagree on a rule, the old game wins.
10. **Tools are the study's** (TypeScript 6, Vite, Vitest, Playwright, ESLint, Prettier, lit-html). If one does not work,
    the closest working version is used and noted.
11. **The agent looks at screenshots itself** after every iteration (desktop and phone); the user tests the live build.
12. **Ships are not part of this run.** The run ends when the ported game is live and wrapped up.
13. **The user's old save and journal files** in the folder stay where they are, untouched and untracked.
14. **A check that stays red after honest tries:** that iteration is not merged and the run stops there with a report.
    This is the only early stop.
15. **No users, no compatibility, no chronicles** (the user decides about chronicles after the full port).

## Reported by the tester
*(the user's findings — each becomes a fix piece run before the next iteration)*
- none

## Iterations

| ✓ | id | Iteration | The tester can |
| :-- | :-- | :-- | :-- |
| [x] | I01 | **Groundwork**: Groovy and its records move to `terminal/` (renames only, Groovy gates green from there); root law slimmed, `web/CLAUDE.md`; the web project with `npm run check` (one `STATUS=` line), the engine walls, the seed kernel, content forked; `npm run publish:site` commits the build into `docs/play/`, which Pages serves with the site | open the live page on phone and desktop, start a world from a seed, tap and get a response |
| [x] | I02 | **The big world**: universe → filament → sector → solar system → planet → country → city → street; options as data, tap to go down and back up; first HUD from the mock | walk from the universe down to a street and back, on both devices |
| [ ] | I03 | **Buildings**: building → floor → corridor → apartment → room, elevator, doors, Null Sector; a new world starts on a street (Guide:41) | ride the elevator, walk corridors, open doors, enter rooms |
| [ ] | I04 | **World richness**: names, themes, cultures and eras, objects, furniture, room text; the mock's look; variety floors and first snapshot pins | read a world that feels like the old game and looks like the mock |
| [ ] | I05 | **Survival**: turns, coherence drain, death, recap; save and continue in the browser; visited marks on lists (`[V]`, needs the visited path saved) | play until death; close the tab and continue |
| [ ] | I06 | **Items**: capture, inventory, quantum buffer, gematria, spectral frequency, synthesis | collect, inspect, combine and drop relics |
| [ ] | I07 | **The ritual**: scans, Keystone, breach, descent, the abyssal layer | complete the Keystone ritual and descend |
| [ ] | I08 | **Map and trace**: the drawn canvas — lattice map, trace, effects seeded from the frame | open the map and the trace on both devices |
| [ ] | I09 | **Polish**: help, debug mode, reduced motion, focus, phone layout fine-tuning; every known bug of decision 7 confirmed fixed by a test | play a full run comfortably with one thumb |
| [ ] | I10 | **Wrap-up**: player docs for the web game, README, site link to the game, final full-playthrough test on both profiles | play the finished game from the site |
