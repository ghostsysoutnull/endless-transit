# Place names — dealt, grown and flavoured

Scope accepted by the user on 2026-10-05 (Solo loop, plan first; branch `words/place-names`): the names of the places
from a filament's nodes down to the street. Three things: places listed together never share a word; the lists grow;
a planet, a country, a city and a street are named in the words of the vibe in force. No rule of the game changes:
the counts, every seed and the vibe's rules stay. Not here: rooms, doors, buildings, the Null Reach's serial, the
apartment's plan (CONCEPT-005).

## What was measured
300 worlds, the real generator on the real content, from a scratch script outside the project. The lists are the old
game's, word for word (`terminal/…/NameGenerator.groovy:16-61`); each word of a name is picked on the child's own
seed, so nothing keeps two siblings apart. Sharing a first word with a sibling: streets 46 %, sectors 36 %, countries
31 %, star systems 21 %; a last word: streets 46 %, countries 42 %, star systems 29 %. Planets and cities are two
halves glued, and the halves repeat side by side (`Zionus | Zionos`, `Goldgate | Goldfall | Goldford`). The whole game
holds 196 cities, 196 streets, 224 planets, 176 star systems.

## Picks
1. **One naming rule for every kind**: each word of a child's name is dealt (`Deal.nth`) from its list on a branch of
   the **parent's** seed, at the child's index among its siblings — the rule a room's adjective already follows
   (`RoomFactory.ts`, `apartment.seed().branch('adjectives')`). A child's seed is untouched; the numbers a sector and
   a filament carry stay on the child's own naming seed.
2. **A name part is a list, or a directory of lists keyed by an axis**; the kind's `index.txt` says which on every
   line, `part|axis`, cut by `ContentLibrary.pairs` (the one owner of the cut): `descriptor|shared`,
   `adjective|culture`. Four axis words: `shared` (one list), `culture` (the nine surface cultures,
   `themes/planet-frames` — the building lexicons keep all ten of `themes/cultures/index`), `era`
   (`themes/timelines/index`), `trait` (`themes/traits`). A keyed directory carries no index of its own, as the
   culture-keyed ones already do.
3. **Which part reads what** (the size is each list's floor):

   | kind | parts | named under |
   | :-- | :-- | :-- |
   | filament | `greek` 12, `type` 8 — plain, unchanged | — |
   | sector | `descriptor` 24, `noun` 24 — plain | — |
   | solar system | `prefix` 48, `suffix` 32 — plain | — |
   | planet | `head\|culture` 12, `tail` 30 plain | the vibe it has just drawn |
   | country | `prefix` 30 plain, `core\|culture` 12, `suffix\|trait` 10 | the vibe it hands down (its own trait) |
   | city | `head\|culture` 14, `tail\|era` 14 | its own vibe: a rebel district is named in the swapped pair |
   | street | `adjective\|culture` 16, `noun\|era` 16 | its city's vibe |

   A planet's tail stays plain: an era does not read in the ending of a coined word.
4. **Two guarantees from the content, not from luck**: every list holds at least as many words as its kind can have
   siblings, so a deal never starts over inside one parent; inside one part no word sits in two lists, so siblings of
   different cultures cannot share one either.
5. **The vibe is asked, never re-derived**: a planet and a country name themselves under the vibe they draw (hoisted
   in `create`); a city under the one its factory chose — the swapped one it already builds for a rebel district
   (`CityFactory.ts:32`), else the country's; a street asks its city (`City.vibe()` answers).

The tone, for the user's eye before a thousand words are written (the lists are judged on the phone at the end):
rust and industrial — `Cinder Viaduct`, `Rivet Sidings`, the city `Slagworks`; neon and digital — `Flicker Loop`,
`Chrome Relay`, the city `Voltgrid`; shogun and ancient — `Lantern Causeway`, `Cedar Processional`, the city
`Cranehold`; countries — `Free Cinder Garrison` (rust, Military), `Old Mycel Commons` (organic, Agricultural),
`Greater Brass Exchange` (gilded, Commercial); planets — `Ferrox` (rust), `Voltis` (neon), `Sporum` (organic).

## Shape table

| what | kind | owner | the one fact it owns | statics + why |
| :-- | :-- | :-- | :-- | :-- |
| `NameParts.words(origin, vibe)` (changed; was `words(seed)`) | method on a service | `engine/procgen` | how a name is drawn: one word a part, in index order, dealt among siblings from the parent's seed and the child's index; an origin with no parent is refused | none |
| `NamePart` | interface, owned by `NameParts` | `engine/procgen` | what `NameParts` asks of a part: its name, and the list it reads under a vibe | none |
| `PlainPart` | value object | `engine/procgen` | a part read from its one list, whatever the vibe | none |
| `KeyedPart` | value object | `engine/procgen` | a part read from the list its axis's key names | none |
| `NameAxes` | service | `engine/procgen` | which axes exist and the key each reads from a vibe (a new axis is one entry); refuses an unknown axis, a place with no vibe, and a vibe with no key for the axis (a trait above the country) | none |

`NameParts` turns each index pair once into a `PlainPart` or a `KeyedPart` (the edge; nothing past it reads the line
again). `LibraryNames` takes the `Dealer` and the `NameAxes`, both built in `LocationRegistry` (the engine's
composition root). `Names.naming(seed)` stays as it is. `ContentLibrary` is not touched.

## Coverage claims
- *A street's name does not depend on how it was reached*: `tests/engine/procgen/LocationRegistry.test.ts:150-151`
  (`portrait` holds `name`, line 15: walked, jumped to, and after its siblings were visited). *The same for the
  places above it*: **UNGUARDED** — step 0.
- *Naming a place populates no sibling*: `LocationRegistry.test.ts:194`.
- *How many children each kind has*: `tests/engine/procgen/WorldRanges.test.ts:50-52`.
- *A child's seed*: `tests/engine/rng/Seed.test.ts:213-215`.
- *Siblings never share a word; a name follows the vibe in force*: new behaviour; its tests are written and shown red
  before the code.

## Tests
Step 0, committed before any production change, green before and after: `LocationRegistry.test.ts`'s walked, jumped
and crowded comparison covers every place on the chain, not the street alone.

New, red first:
- `tests/engine/procgen/NameParts.test.ts` (a memory content source): the children of one parent get different words
  in each part while the list lasts; the same parent seed and index give the same words whatever was asked before; a
  keyed part reads the list its vibe names; refused — an unknown axis, a keyed part with no vibe, a trait part on a
  vibe with no trait, an origin with no parent.
- `tests/content/PlaceNames.test.ts` (the real content, a sample of worlds): among the sectors, star systems,
  planets, countries, cities and streets of one parent no two carry the same name (the Null Reach's serial is its
  own seed's and stays out); a city's head and its streets' adjectives come from the list of the vibe in force — a
  rebel district's from its swapped pair. Sharing a word is the two lower tests' to prove: the deal, and the floors.
- `tests/content/ContentFloors.test.ts`: the floors of pick 3; inside one part no word in two lists.

Moved on purpose:
- `tests/content/BundledContent.test.ts`: the file count, the directory count, the index lines (`part|axis`); a name
  part is a list or a directory whose members equal its axis's keys.
- The unit tests that quote a name of these kinds, each read at the re-pin (a hand-built name stays):
  `content/WorldPins`; `engine/model/` `Floor`, `Fragments`, `Location`, `Ritual`, `Scans`, `Substrate`,
  `VibeFigure`; `engine/rules/` `Descent`, `Drain`, `GameEngine`, `Journey`, `Lattice`, `Sessions`;
  `support/hudSnapshots`; `ui/scene/StreetPicture`; `ui/screens/` `HelpPresenter`, `HudPresenter`, `PolePresenter`,
  `SceneDrawing`.
- At the end, with the user: the three goldens (`tests/goldens/*.txt`), rewritten by their one writer and the diff
  read; the browser tests that quote a name (`announce`, `buildings`, `fold`, `help`, `items`, `map`, `page`,
  `playthrough`, `richness`, `ritual`, `scene`, `survival`, `tower`, `trace`, `world`), then the whole suite once.

## Decisions and laws touched
- Decision 14 (the vibe follows the game's rules exactly; names come from the game's lists): honoured — a name reads
  the vibe in force and adds no rule; a rebel district's swap reaches its name and its streets'.
- Decision 16 (tests change on purpose): the list above.
- The lazy-loading law: child `i`'s seed is still `parentSeed.branch(i)`; its name now also reads a branch of the
  parent's seed at `i`, never a sibling — as a room's adjective does today. The law's "and nothing else" is made true
  in its two places: `web/CLAUDE.md:43-44` and `Progeny.ts:12-13`.
- No wall moves. The content floors grow by the new lists.
- Records made true at the close-out: `web/CLAUDE.md:17-18` (the axes, the `part|axis` line, nine surface cultures
  against the lexicons' ten); `docs/analysis/WEB_GAME_ARCHITECTURE.md:152-153` and where it tells how a name is
  drawn; `docs/web/players_guide.md:345, 357, 365, 372, 509`, whose citations into the seven factories are re-read.

## Commits (each a revert unit)
0. **Step 0**: the test above.
1. **The rule**: `Names`, `NameParts`, `NamePart`, `PlainPart`, `KeyedPart`, `NameAxes`, `LibraryNames`, the seven
   factories, `LocationRegistry`, `Progeny`'s comment; the seven indexes change form only (every line gains
   `|shared`); `NameParts.test.ts`, `BundledContent`'s index lines; the unit re-pins. No word changes, so every name
   from the filament to the street moves once.
2. **The words**: the lists and the indexes' axes; `PlaceNames.test.ts`, `ContentFloors`, `BundledContent`; the unit
   re-pins. Every name but a filament's moves again.
3. **The end**, with the user: the goldens and the browser re-pins.

From commit 1 to commit 3 the fast gate is red in `tests/content/Goldens.test.ts` alone, by plan: the approved
snapshot waits for the end (the Solo loop, step 5). A revert of 1 or 2 after commit 3 needs the goldens rewritten.

## The plan review (once, 2026-10-05)
AMEND, every ask taken: step 0; every re-pinned test named; who cuts the index line; the refusals; the city's vibe;
`KeyedPart`'s two facts split (`NameAxes`); the world test cut to what it can see; the filament's floors; what moves
in commit 2; the end commit; the records the review found.

## After the build
The design check once on the diff; `npm run phone` for the user's judgment of the words, with the measure's count
beside it; then the end with the user, the close-out and the merge; a publish on the user's word.

## Cost
About a thousand words of content, and the source and test files named above. Tokens: about
250–400k for the build (inferred from the UI iterations of like reach; not measured), then the end.
