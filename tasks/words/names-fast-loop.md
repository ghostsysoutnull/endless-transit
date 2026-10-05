# Names fast loop — rooms, filaments, doors, buildings, floors, Null Reaches

A fast loop (CLAUDE.md rule 15) of 2026-10-05 on branch `words/room-types`, eight rounds, one save-point commit per
kept look, closed at the user's word under the Solo loop's step 4 and 5. It followed the place names
(`tasks/words/place-names.md`) and began from the throwaway page that showed every name list with names from real
worlds. Spec: the user's picks, round by round. No rule of play changed: counts, seeds of places and the vibe's rules
stay; every name below moves once.

## Picks (what was kept)

- **Room kinds**: sixteen a trait; dealt among the rooms of an apartment, so none repeats; the door still learns the
  kind of its first room from the same deal. The two guaranteed door words stay on the four kinds that had them — a
  guaranteed word is rarer for it (the user's pick: the clues stay as they are).
- **Filaments**: a universe letters its filaments in one alphabet, picked on its seed among seven; the types grown.
- **Doors**: a material of the culture in force and a state of the era in force, each dealt along the corridor; every
  material keeps one of the six drawn families and every era a frosted, a cold and a motionless state, so no picture
  changed. No state is named like a trace; no material name carries a condition.
- **Door words**: a list for each way of writing — the way is who wrote it (the system stamps, those who came before
  scrawl, the structure etches, a warning is burned) — the twelve original words kept, each in its voice; dealt along
  the corridor. The form the words keep is the analysis's, below.
- **Buildings**: every word and landmark title dealt along the street; the endings in the words of the era; no ending
  is a building noun of any culture, no adjective a noun of its own culture.
- **Floor zones**: in the words of the country's trait — the trait that picks the room kinds behind the doors; one
  deal a building, read round up the tower. No zone is named like a room kind or a door word.
- **Null Reaches**: the words `Null Reach` and a word of their own, dealt among the filament's nodes. The sector words
  that read like game terms and the Greek letters among the star names replaced.

## The door words' spirit (the independent analysis, 2026-10-05)

From the records (`tasks/active/DOOR_ENHANCEMENT_STRATEGY.md`, `journals/LOG_20260310_1915_0xF1A2.md`, the terminal's
`DoorInscription.groovy:11-14`): system and ghost labels, "the desperate inscriptions left by those who came before";
the style was meant to pick the speaker. The form a new word keeps: one to three words, upper case joined by
underscores; no name, place, number, "I" or "you", no reason, nothing of one culture or era, nothing that says what is
behind the door; it implies something that happened and someone unseen, and withholds the cause. A burned word never
reads like a second `DANGER`.

## Shape table

| what | kind | owner | the one fact it owns | statics + why |
| :-- | :-- | :-- | :-- | :-- |
| `FamilyPart` | value object | `engine/procgen` | a part read from the one list of its own index that the parent's seed picks | none |
| `NameAxes` (changed) | factory | `engine/procgen` | which axes exist and the part each makes: a new axis is one entry | none |
| `DoorSlot` | interface, owned by `Doors` | `engine/procgen` | where a door stands: its corridor's seed, its place along it, the vibe there | none |
| `BuildingSite` | interface, owned by `BuildingNamer` | `engine/procgen` | where a building stands when it is named | none |
| `Tower` | interface, owned by `FloorZones` | `engine/procgen` | the building a floor's zone is named in | none |

`RoomCategories`, `Doors`, `BuildingNamer`, `FloorZones` and `NullReachFactory` each take the `Dealer` or the name
lists from `LocationRegistry`, the engine's composition root.

## What the approval did

The tests rewritten or re-pinned are in the branch's two test commits; the design check ran once on
`master..words/room-types` and every break it found was fixed (no plan judged the diff first). The throwaway page and
its generator were never part of the project.
