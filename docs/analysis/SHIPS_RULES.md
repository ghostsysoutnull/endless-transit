# Ships of the Lattice — Rules as Mocked
**Created:** 2026-09-21
**Companion to:** `docs/analysis/SHIPS_CONCEPT.md` (what a ship is and why). This file is the *how*: every rule the two
mocks run on, with its number, so the rules do not live only as JavaScript inside two HTML files.
**Status:** CONCEPT — **not a plan.** Nothing here is decided until the concept doc's §7 verdict column is filled; this
file authorizes no source change. Backlog pointer: `tasks/backlog/CONCEPTS.md` (CONCEPT-001).
**Sources:** `docs/analysis/mocks/ships-of-the-lattice.html` (text mock v1) and
`docs/analysis/mocks/ships-of-the-lattice-visual.html` (visual mock, artifact version 13). Where the two differ, §9 says so.

**Status of each rule**

| Mark | Meaning |
| :-- | :-- |
| **PICK** | The design pick in the concept doc's §7 table. Awaiting the user's verdict. |
| **INVENTED** | Made up so the mock could run. Never discussed; a plan must decide it. |
| **GAME** | Follows a rule the game already has (source cited). |
| **OPEN** | The mocks do not answer it. |

---

## 1. The hauler — one hand-written ship

`MV Buckled Girder`, registry `1809246`. Culture rust, era industrial, trait Industrial → class **hauler**. Fate: dormant,
crewed by sleepers. Everything about it is hand-written; nothing is generated (INVENTED).

| Deck | Zone | Sections (hatches) → rooms | Heart |
| :-- | :-- | :-- | :-- |
| 4 | BRIDGE | Command Hatch *(sealed)* → The Bridge · Cabin Door *(sealed)* → Captain's Cabin | **bridge** |
| 3 | HABITAT | Bulkhead Door → Bunk A, Bunk B, The Mess · Medical Hatch → Medbay · Vault Door *(sealed)* → Cryo Vault | **cryo** |
| 2 | PROCESS | Pressure Door → Processing Core · Hatch → Maintenance Bay, Parts Cage · Storeroom Door → Supply Node | — |
| 1 | CARGO | Cargo Door → Main Hold · Pod Hatch → Pod Bay · Bulk Hatch *(sealed)* → Hold 3 | **pod**, **hold3** |
| 0 | ENGINEERING | Blast Hatch → Reactor Well · Grate → Coolant Gallery, Pump Room | **reactor** |

| Rule | Value | Status |
| :-- | :-- | :-- |
| Shape | a spine (`u`/`d`/`c`, as a building's elevator), a passage per deck, hatches, rooms in a row behind each hatch | PICK (§7 #10: a Building with a structure kind) |
| Decks placed by function | bridge on top, habitat, the trait's decks, cargo with the airlock, reactor at the bottom | PICK |
| The airlock | deck 1, the only way in | PICK (§7 #6) |
| Hearts | five single named rooms a building has nothing like: reactor, bridge, pod, hold3, cryo | PICK |
| Middle decks | filled from the trait's four room types (`RoomCategory`) | PICK — the mock hand-writes them |

## 2. Dark and lit — explored twice

| Rule | Value | Status |
| :-- | :-- | :-- |
| A ship starts dark | thin descriptions ("Dark. …"), objects read as OUTLINES, four hatches sealed (bridge, cabin, cryo, Hold 3) | PICK (§7 #7) |
| Sealed hatch | "The hatch does not answer. No power reaches it." Costs the move, goes nowhere | INVENTED |
| Scan while dark | costs **1 extra** Coherence | INVENTED |
| Waking the reactor | in the Reactor Well, feed the core **two buffer items**; the two lowest-Hz non-beacon items are taken; **+15 Coherence** | INVENTED — one gesture, not a mirror of the ritual (every floor sampled + 7 infusions, `Building.isPrimed`) |
| After the wake | every room uses its lit description, sealed hatches open, the lift runs, the hive's arrival is triggered (§5) | PICK / INVENTED |
| Switch "explored twice: off" | the ship starts lit, nothing is sealed | mock switch for §7 #7 |

## 3. Boarding, leaving, owning

| Rule | Value | Status |
| :-- | :-- | :-- |
| Approach screen | a lobby for the ship: silhouette, fate readable from outside; hull scan gives class, decks, airlock, culture, era, fate, hull trace | PICK |
| Leaving | **only through the airlock** — walk back, Coherence draining | PICK (§7 #6). Switch "from any deck" exists to compare |
| Evidence for #6 | the cost panel's **last walk-out**: moves from the last room stood in to off the ship | mock instrument |
| Escape pod | Pod Bay, **one use**, drops you on the scripted street (`Busy Terrace`); refused when the ship is grounded | INVENTED |
| Launch | from the bridge: pick one of five destinations (two systems, low orbit over Hydraia, the Null Reach, grounded on the street). The ship moves, you stay on the bridge, the walk to the airlock ends somewhere new | INVENTED |
| Ownership | the first launch makes the ship **yours** (`[YOURS]`, beacon reads LOCKED) | INVENTED |
| A launched ship | stays where you parked it; nothing brings it to you | INVENTED / OPEN |
| Reboot (Coherence 0) | world rebuilt from the same seed: ship dark again, back where it first was, no longer yours; you keep your buffer, moves and ticker | INVENTED |

## 4. The beacon — a Hidden Frequency is a registry

The player starts with a `Hidden Frequency` of 1,809,246 Hz in the buffer (PICK, §7 #9). The signal line has these states:

| State | When |
| :-- | :-- |
| `BEARING: UP n · <node>` / `DOWN · via <node>` / `UP n to <node>, then down` | anywhere in the lattice; the bearing reads at every level, 00 to 07 |
| `HERE` | standing on the node the ship sits at |
| `SOURCE: THIS HULL` → `SOURCE BELOW/ABOVE YOU · DECK 1` → `THIS DECK · HOLD 3` | on approach, then aboard |
| `LOCKED — your ship` | after the first launch |
| `NO CARRIER` | no beacon item in the buffer — merged away, destroyed or dropped |
| `CARRIER DROWNED` | aboard the hive: "everything here hums at 1809246" |

| Rule | Value | Status |
| :-- | :-- | :-- |
| Where the number comes from | the hum of an unlisted container in Hold 3; taking it gives a second beacon item at the same Hz | INVENTED (the story beat) |
| Merging the beacon | the hybrid is not a beacon: the bearing is lost | INVENTED |
| Beacon off (switch) | ships are found by scanning: `s` at the node lists "1 UNREGISTERED MASS" with its hull trace | PICK ("looked") |
| Three ways to see a ship | led (beacon), looked (scan), found (the hive appears in red) | PICK |

## 5. The hive

| Rule | Value | Status |
| :-- | :-- | :-- |
| It arrives | not there at the start. Appears when the hauler wakes, **or** after **30 moves**, **or** when the Unlisted Container is taken | INVENTED |
| Where | level 03 (the scripted system) or level 01 (in transit on the filament); switchable, or off | PICK (§7 #1–2) |
| No airlock | an aperture opens before you ask; entering puts you at subjunction 00 | PICK |
| Interior | eight identical subjunctions in a ring (forward / back), one component in each alcove, the central node reached inward from subjunction **04** | INVENTED |
| Drain | the per-move drain rises by **1 every 5 moves** aboard | INVENTED |
| Aperture | every **4 moves** aboard it moves one subjunction **away** from you; you leave only from the subjunction it is at | INVENTED |
| Voice | a `[WE] …` line every **3 moves** aboard, six lines cycling | INVENTED |
| The central node | named Vinculum: `PARENT NODE FOUND :: WELCOME BACK, UNIT` — hinted, never stated | PICK (§7 #8) |
| Severing | silences the voice, stops the aperture, returns the drain to normal, gives a `Vinculum shard` | INVENTED |

## 6. Placement in the lattice

| Placement | Level | Status |
| :-- | :-- | :-- |
| Hauler in orbit, listed after the planets so planet numbers never move | 03 | PICK (§7 #5) |
| Hauler adrift in the Null Reach · low orbit over the planet · grounded on the street | 02 · 04 · 07 | mock switches |
| Never at universe, sector, country or city | 00, 02, 05, 06 | PICK |
| Rarity: found by signal, not as common as buildings | — | PICK (§7 #3) — the mocks hold exactly one |

## 7. Objects and frequency aboard

| Rule | Value | Status |
| :-- | :-- | :-- |
| An object's Hz | consonant ordinals summed (A=1…), vowels silent, master numbers 11/22/33 doubled, × depth | GAME — `procgen/Gematria.groovy` |
| Aboard the hauler | × depth **pinned at 12** (a building's room depth), then **× 1.1** | PICK (§7 #11) for the pin; the 1.1 is the game's resonant bonus borrowed, INVENTED here |
| Merge | Hz add; name = first word of each + `Hybrid`; **+15 Coherence**; merge count kept | GAME — `core/SynthesisService.groovy` |
| "Resonance" when a hybrid's Hz divides by 11 | a message only | INVENTED |
| Buffer | 16 slots | GAME shows it (`ui/HUDHeaderComponent.groovy:99` prints `n/16`); a grep finds no code that enforces it. The visual mock refuses the 17th item — INVENTED |
| Log fragments | five, pinned in five rooms, found on first entry; the bridge assembles them | INVENTED |

## 8. Costs

| Rule | Value | Status |
| :-- | :-- | :-- |
| Every move costs the drain | 1 by default; switch 0 / 1 / 2 | GAME (one prompt, one drain) |
| Text mock | *every* prompt costs, including opening the buffer and a failed choice | as the game |
| Visual mock | picking (selection) is free; **walking** costs — floors, rooms, the hive ring, entering, leaving. Buffer and lattice trace are free; **taking an object costs one move** | INVENTED — see §9 |

## 9. Where the two mocks differ

| Topic | Text mock v1 | Visual mock |
| :-- | :-- | :-- |
| Purpose | pacing — it keeps type-and-Enter, so §7 #6 is judged here | spatial feel, and the whole game as a single page |
| World | one scripted path, siblings are scenery | the same path, every sibling generated from a seed (fake names, real counts) |
| Buffer / objects | modes opened with `i` and `t`, one prompt each | a buffer screen and take-tiles; see §8 |
| Sections | entering a hatch puts you in room 1; `f`/`b` between rooms | same rule, shown as a floor plan of the section |
| Hive ring | numbered subjunctions on a fixed map | the ring turns so you always stand at the bottom; no numbers |

## 10. Open — the mocks do not answer

1. How a ship is generated: hull, decks, hearts, log and fate from culture × era × trait × fate. Both mocks hand-write one.
2. What brings an owned ship to you, and whether a second ship can be owned.
3. Whether the wake should mirror the building ritual or stay one gesture.
4. How a ship, its state and its position are saved (LIP, memento) — see the concept doc's appendix.
5. Whether the hive is one entity or a kind; what it does after it is severed.
6. The "departed" ending (§7 #4): the mocks stop at ownership.
