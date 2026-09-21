# Ships of the Lattice — Concept
**Created:** 2026-09-20
**Trigger:** user idea — "spaceships like the Nostromo or the Borg ones, that could be traversed like buildings, influenced by Culture, Temporal Eras and Traits"
**Status:** CONCEPT — explored with a playable mock. **This is not a plan.** It has no Shape table, no slices and no commitments, and it authorizes no source change. Backlog pointer: `tasks/backlog/CONCEPTS.md` (CONCEPT-001).
**Mock:** `docs/analysis/mocks/ships-of-the-lattice.html` (version 1, 2026-09-20) — open it in a browser, no server needed. The same page is published privately at `https://claude.ai/artifact/8MGLTL8r98eZZvrFvd3vsb`; the file in this folder is the durable copy. When the mock changes in a way that matters, copy it here again and bump the version in this line.

> **The idea in one paragraph.** Everything in Endless Transit stands still and never ends. A ship is the opposite on
> both counts: it is the only thing that moves, and the only place with a hull around it. You catch a signal, find the
> ship dead in orbit, walk it in the dark, wake it, and leave in it. After that it is yours. At the far end of the
> same idea sits the hive: a ship with no name that finds *you*.

---

## 1. What a ship is that a building is not

| # | Answer | What it gives the game |
| :-- | :-- | :-- |
| 1 | **A building that left.** A culture, an era and a trait, cut loose from the planet that made them. | A rust hauler over a zenith world tells a story nobody wrote. Its home planet exists somewhere in the same seed. |
| 2 | **The only thing that moves.** Ships live *between* the nodes of the tree. | Real transit, in a game called Endless Transit: crossing the tree without climbing it level by level. |
| 3 | **Finite.** Streets, floors and the basement never end; a ship has a hull. | The one place you can finish: every deck walked, a heart reached. |
| 4 | **Present tense.** Every building says "someone was here". | A ship can say "something is here" — and at the hive end, "it has noticed you". |

**The two poles.** Culture decides where a ship sits between them: rust, baroque and shogun lean crewed; monolith and void lean hive.

| | The hauler (Nostromo pole) | The hive (Borg pole) |
| :-- | :-- | :-- |
| Scale | human, a few decks | inhuman, every junction identical |
| Words | named rooms, crew tags, a log | designations only |
| Question | what happened to them? | what is it doing to me? |
| How you meet it | you find it | it arrives |

## 2. How the Atlas concepts read on a ship

| Concept | On a planet | On a ship |
| :-- | :-- | :-- |
| **Culture** | walls, names, objects | who built it: hull, walls, names |
| **Era** | lighting, objects, drain | when it was built, and so how it flies: an ancient generation ark, an atomic pulse-drive, a singularity cube |
| **Trait** | the country's four room types | the ship's **class**: Military → warship, Research → science vessel, Industrial → hauler, Agricultural → hydroponic ark, Ceremonial → tomb ship, Commercial → trader. The existing four-room-types-per-trait table fills the middle decks |
| **Fate** *(new, ships only)* | — | what happened: derelict, dormant, adrift, crewed by sleepers, assimilated. Fate writes the log |

## 3. The arc

**Catch a signal → find it dead → wake it → leave in it.** The ship is a dungeon first, a vehicle second, a home third.
It mirrors the one quest the game has: the Keystone opens *down* and is an ending; the ship goes *out* and is a
continuation. Descend, or depart.

## 4. Where a ship can be seen, level by level

The mock scripts one path from level 00 to level 07 and lets the hauler and the hive be placed on it.

| Level | Place | Ship there? | Trade-off |
| :-- | :-- | :-- | :-- |
| 00 | Universe | never | Too far out. The signal still gives a bearing from here. |
| 01 | Filament | hive only, "in transit" | A ship this high is an event, not a place. |
| 02 | Sector | never | The corridor you cross on the way. |
| 02 | Null Reach | hauler, adrift | Gives the reach a second reason to exist besides the echo. The loneliest placement. |
| 03 | Solar System | hauler in orbit; hive arrives | **Preferred.** Listed after the planets, so planet numbers never move. `s` becomes the orbit scan. |
| 04 | Planet | hauler in low orbit | One level closer to the street; a ship reads oddly in a list of countries. |
| 05–06 | Country, City | never | A spaceport would live at 06 if there were one. |
| 07 | Street | hauler, grounded | Cheapest to reach, least like a ship. |

## 5. Seeing, entering, leaving, exploring

**Seeing one — three ways.** *Led:* a Hidden Frequency is a beacon and the HUD gives a bearing at every level
(`REGISTRY 1809246 · BEARING: UP 4 · ☼ Vega Borealis`). *Looked:* `s` at a system or a reach lists what is in orbit.
*Found:* the hive was not on the menu a moment ago, and now it is, in red.

**Entering.** An approach screen works like a building lobby: silhouette by culture, fate readable from outside
(no running lights, no heat bloom), and a hull scan that gives class, decks and a hull trace that never lies — the door
traces, one size up. `Dock` puts you in the airlock. The hive has no airlock; an aperture opens before you ask.

**Leaving.** Only through the airlock. A building lets you leave from any floor; a ship makes you walk back, with
Coherence draining. Three exceptions: a one-use **escape pod** that drops you on a street; the **bridge**, where you
leave by arriving somewhere else; and the hive, where the aperture moves away from you the longer you stay.

**Inside.** The building's skeleton, shaped by how a ship works. A **spine** replaces the elevator (`u`, `d`, `c`). Few
decks, placed by function: bridge on top, habitat, the class decks the trait decides, cargo with the airlock, reactor at
the bottom. **Hearts** are single named rooms buildings have nothing like: reactor (wake the ship), bridge (log and
launch), cargo hold (the jackpot room), crew quarters (names), cryo (fate revealed). The ship is **explored twice**:
dark — thin descriptions, sealed hatches, scans cost one more — and lit, after the reactor wakes. **Log fragments**
scattered through the rooms tell the fate. The hive interior is eight identical subjunctions, a ticker that says "we",
a drain that rises, and one heart.

## 6. Two tie-ins to what already exists

* **Hidden Frequencies become beacons.** Today they are a leftover: the game's original loot mechanic, a free 30% roll
  worth a thousand times any object, spent on nothing (`Room.groovy:69-78`, wrapped "for compatibility" in `eab576b`).
  In this concept the seven digits are a registry. In the mock the number turns out to be the hum of an unlisted
  container in Hold 3 — and merging the beacon away costs you the bearing (`NO CARRIER`).
* **The Vinculum.** The hive's heart carries the name of the player's own interface. The mock's node greets you with
  `PARENT NODE FOUND :: WELCOME BACK, UNIT`. The game's existing ending, "Neural link severed", gains a second meaning.
  Hinted, never stated.

## 7. Decisions

Every open question, the options, the pick made while designing, and a verdict column for after playing the mock.

| # | Question | Options | Pick | Verdict (user) |
| :-- | :-- | :-- | :-- | :-- |
| 1 | Core fantasy | explore derelicts · travel · own one · be hunted · the arc (explore → travel → own) | the arc | |
| 2 | Tone | past tense only · something aboard the hives notices you | something notices you | |
| 3 | How common | like buildings · rare, found by signal | rare, by signal | |
| 4 | Relation to the basement | none · a mirror quest with a "departed" ending | mirror quest | |
| 5 | Where ships live | Null Reach · orbit (level 03) · low orbit · street | orbit | |
| 6 | Leaving | airlock only · from anywhere | airlock only | |
| 7 | Explored twice (dark, then lit) | yes · one state | yes | |
| 8 | Vinculum as the hive's heart and the Operator's origin | hinted · just a name · leave the lore alone | hinted | |
| 9 | Hidden Frequencies | beacons to ships · rescaled · left alone | beacons | |
| 10 | What a ship is, in code terms | a Building with a structure kind · a new hierarchy | a Building with a kind | |
| 11 | Loot value at a ship's shallower depth | pin at 12 · let ships be poorer | pin at 12 | |

## 8. Using the mock

Type a key and press Enter, as in the game; menu lines are also clickable. Every prompt costs Coherence.
Anywhere: `i` buffer, `s` scan, `ll` lattice.

| Switch | What it tests |
| :-- | :-- |
| The hauler sits at (02 / 03 / 04 / 07) | Decision 5 — the side panel's ladder shows you, the hauler and the hive by level |
| The hive (off / level 03 / level 01) | Decisions 1–2 — it arrives after 30 prompts, when you wake the hauler, or when you take the container |
| You start at (street / universe) | the climb to a ship, from either end of the tree |
| Leaving the ship | Decision 6 — compare **last walk-out** in the cost panel with the switch each way |
| Explored twice | Decision 7 |
| Coherence per prompt (0 / 1 / 2) | how much of the tension is the drain |
| Beacon on / off | Decision 9 — led by signal versus found by scanning |

The **cost panel** counts prompts and Coherence spent in total and aboard, and the last walk-out: prompts from the last
room you stood in to off the ship. That number is the evidence for decision 6.

**A good first run:** defaults; follow the bearing up from the street; board; explore dark; feed the reactor; read the
log on the bridge; launch; walk down and out somewhere new. Then move the hauler and compare.

**Invented for the mock, never decided:**
* waking the reactor costs two buffer items — one gesture, not a full mirror of the ritual (every deck sampled, seven merges);
* a reboot resets the ship: dark, back where it first was, no longer yours;
* a launched ship stays where you parked it — nothing yet brings it to you;
* the hive's drain rises by 1 every 5 prompts aboard and the aperture moves every 4;
* the hauler, its crew, its log and the number 1809246 are hand-written; nothing is generated.

## 9. What the mock is not

It is a scripted scenario: one path through the world, one hauler, one hive, no procedural generation, no save. It keeps
the game's input rhythm so the pacing is honest, but it draws with HTML boxes, not the terminal's character grid — it
says nothing about how the HUD would really lay out. A mock always feels faster than the terminal.

## 10. Next — a parallel visual mock

**Decided 2026-09-20:** the user wants a second mock of the same scenario, fully visual — no text input, graphics,
animation, effects — built in a fresh session so its whole context goes to the visuals. It sits beside mock v1; it does
not replace it. To be recorded as `docs/analysis/mocks/ships-of-the-lattice-visual.html`, with a line here, when the
user says it is good.

**The two mocks answer different questions.** The text mock keeps the game's type-and-Enter rhythm, so it is the
evidence for pacing — decision 6 (airlock-only exit) is judged there. A clickable, animated mock cannot test that; it
tests spatial feel (the lattice with ships drawn in place, the ship as a cross-section), the dark-to-lit moment, the
hive's sameness, and whether the fantasy lands at all.

**Brief for the session that builds it:**

```
Read docs/analysis/SHIPS_CONCEPT.md and docs/analysis/mocks/ships-of-the-lattice.html (mock v1, text-driven).

I want a PARALLEL visual mock of the same scenario — same world path (levels 00–07), same hauler
(5 decks, hearts, log fragments, dark→lit), same hive (8 subjunctions, moving aperture, Vinculum),
same switches and cost panel — but fully visual: no text input (click/tap/keyboard arrows),
graphics, animation and effects. Ideas to consider: a zoomable lattice from universe to street with
ships drawn in place; the beacon as a pulsing bearing; the hauler as a cross-section you move
through; the reactor wake as a deck-by-deck lighting sequence; the hive as an identical ring with a
drifting aperture; Coherence as a visual decay of the whole screen.

Keep the Cyber-Terminal vibe. Do not change v1 or the concept doc. Publish as a NEW private
artifact. Before building, give me your take on the visual direction as numbered questions with
lettered options and a marked pick; build only on "Execute". When it is good, I will ask you to
record it as mocks/ships-of-the-lattice-visual.html and add a line to the concept doc.
```

## Appendix — code facts, parked

Read from the source on 2026-09-20 while forming a first take. None is a blocker for the concept; each is a question
the first plan will have to answer.

1. **No planet above a ship.** Interiors find their trait through a `Country` ancestor (`RoomFactory.groovy:36`,
   `CorridorFactory.groovy:33`). A ship in orbit has none, and a missing ancestor falls back silently — the failure
   `tasks/lessons/infrastructure.md` already warns about. A ship would carry its own `VibeCapsule`, trait included.
2. **The quest looks for a `Building`.** `findAncestor(Building.class)` in `SynthesisService:15`,
   `BreachBedrockCommand:17`, `PrimeBuildingCommand:17`, `SpawnKeystoneCommand:17`, `RitualTracker:24,34`. If a ship
   is a kind of Building these all work; if it is a new hierarchy none do.
3. **The abyss is the precedent, and it has a smell.** Layers, Arteries and Crypts are already a renamed building,
   done with booleans: `BuildingFactory.create(…, boolean isNull, boolean isAbyssal)` (`:22`). A third flag would be a
   new branch on kind (CODEX principle 5). One value object for the structure kind — terrestrial, abyssal, vessel —
   owning nouns, zone names and icon is the likely first slice, with no behaviour change.
4. **Depth prices the loot.** Frequency is consonant sum × depth (`Gematria.groovy:28`); a room in a city building is
   at depth 12, a room on a ship in orbit around depth 8.
5. **The solar system's child list is typed to planets** (`SolarSystem.groovy:37` casts each child to `Planet`). Ships
   appended after the planets, on their own seed branch, would leave existing worlds, saves and the seed-0 scan as
   they are — to be verified against LIP resolution, not assumed.
