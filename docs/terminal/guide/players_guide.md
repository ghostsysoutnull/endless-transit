---
layout: terminal
title: PLAYERS_GUIDE
map_type: strategy
---

<div class="guide" markdown="1">

# The Player's Guide to Endless Transit

This page is written in plain language. The rest of this site is written in the voice of the game. If you want to
know how the game *actually* works, what the numbers are, and where the good stuff is, you are in the right place.

Every number here was read from the game's source code, first on 2026-09-16 and re-checked on 2026-09-20. If this
page and the manual or the codex ever disagree, tell us: one of them has a bug. **Playing in the browser?** The web game differs in places: read the [web Player's Guide]({{ "/web/players_guide.html" | relative_url }}) instead.

<div class="toc" markdown="1">
**Contents**

* [What this game is](#what-this-game-is)
* [Your first five minutes](#your-first-five-minutes)
* [Every key](#every-key)
* [How not to die](#how-not-to-die)
* [Finding things worth taking](#finding-things-worth-taking)
* [Reading doors before you open them](#reading-doors-before-you-open-them)
* [The buffer: merging and keystones](#the-buffer-merging-and-keystones)
* [The ritual and the bedrock](#the-ritual-and-the-bedrock)
* [Where to go](#where-to-go)
* [Reading the screen](#reading-the-screen)
* [Saving, quitting and seeds](#saving-quitting-and-seeds)
* [Ten tips, ranked](#ten-tips-ranked)
* [Known quirks](#known-quirks)
* [Spoilers and exploits](#spoilers-and-exploits)
* [FAQ](#faq)
</div>

## What this game is

Endless Transit is a text adventure set in an infinite world that is generated from a single number. The world is a
tree: universe, filament, sector, solar system, planet, country, city, street, building, floor, corridor, apartment, room.
You start on a **street**. Every level is built the moment you look at it, and the same number always builds the same world.

You have one resource, called **Coherence**. It starts at 100 and goes down every time you press Enter. The only
way to get it back is to merge two things you picked up. When it reaches zero, the world resets.

There is one long-term goal. Do enough work inside a building and you can forge a **Keystone**, break through the
building's floor, and climb down into a bottomless red basement that whispers at you. That is the ending, if you
want one.

## Your first five minutes

**Launching.** `./run.sh` (from the repository's `terminal/` folder) plays a short scripted intro first. `./vinc.sh` skips it, compiles, and
starts. <!-- run.sh:48-112, vinc.sh:122-127 --> Both need Groovy 5 and a JDK: see [installation]({{ "/terminal/manual/installation_guide.html" | relative_url }}).

**The restore prompt.** If a save file exists you are asked `Restore previous session? [y/N]`. The default is No.
Type `y` (or `Y`) to continue your last game. <!-- Game.groovy:86-90 -->

**The prompt.** The game waits for you on a line that ends `[Last: <something>] Enter choice:`. The thing in
brackets is your last move. Pressing Enter on its own repeats it.

**The screen.** The top box is the HUD: where you are, how many moves you have made, your Coherence. Below it,
on the left, is a description of the place and a table of what is here. On the right is a map, or a fake
spectrogram once you are inside a building. At the bottom is the menu of things you can do right now.

**Your first walk.** Every menu item has a key in front of it. Type the key and press Enter.

1. You begin on a **street**, already a point or two of Coherence down: the drain runs before the first screen is drawn. The street
   header tells you the era and culture of this part of the world in yellow and colour.
2. The rest of the universe is above you. `l` climbs one level at a time, numbered options descend. Leave that for later;
   everything worth taking is below you, inside the buildings.
3. Pick a building. You arrive in its lobby with a list of floors. Type a floor's number (`0` is the ground floor).
4. You are in the **elevator** for that floor. Press `c` to step into the corridor.
5. The corridor lists doors. Pick one. You are dropped straight into the first room behind it.
6. If the room has objects, press `t` to take one. If there is exactly one object and your buffer is empty, it is
   taken automatically. <!-- Room.groovy:163-179 -->
7. Press `f` to walk to the next room, `b` to go back, `l` from the first room to return to the corridor.

Congratulations, you have played the game. Everything below is how to play it well. Short of time? The [cheat sheet]({{ "/terminal/guide/cheat_sheet.html" | relative_url }}) is one screen.

## Every key

Keys are checked in this order: first the global commands, then whatever the current place offers.
<!-- TurnProcessor.groovy:79-83 -->

### Global commands, work anywhere

| Key | What it does |
| :-- | :-- |
| `i` | Open the buffer, which is your inventory. |
| `s` | Scan. Shows what is behind doors, or which floors are near you, or the rooms of the apartment. |
| `m` or `map` | Draw a map of the children of the place you are in. Does nothing inside a room. |
| `ll` or `lattice` | Print your full path from the universe down to here. |
| `sync` | Save the game to `session.trace`. |
| `p` | Take a plain-text screenshot into `screenshots/`. |
| `P` | Same, but with colour codes. Not mentioned anywhere in the game. |
| `help` or `?` | One line listing a few commands. |
| `glitch` | Opens the debug menu. See the spoilers section. |
| `quit`, `q` | Asks for confirmation, offers to save, prints an ending. |
| `quitnow` | Exits immediately, no confirmation, no save. Hidden. |
| Enter alone | Repeats your last move. If that move is now impossible but its opposite is possible, it turns you around instead. <!-- NavigationEngine.groovy:42-55 --> |

Case matters for some of these and not others. `i`, `m`, `map`, `sync`, `lattice`, `glitch`, `help`, `quit` and `q`
work in any case. `s`, `ll`, `p`, `P` and `quitnow` must be typed exactly. <!-- TurnProcessor.groovy:31-47 (GlobalCommands table) -->
Numbered options are forgiving: `1` selects `01`. <!-- InputHandler.groovy:62-80 -->

### Place-specific keys

| Where you are | Keys |
| :-- | :-- |
| Universe down to street | Numbered children, and `l` to go back up one level. |
| Building lobby | Floors listed top floor first; the key is the **floor number**, so `0` is the ground floor and `1` is floor 1, wherever they sit in the list. `l` to leave. |
| Floor, elevator | `u` up, `d` down, `c` into the corridor, `l` leave the building. On the top floor, `j` appears once you can breach. |
| Floor, corridor | `b` back to the elevator, numbered doors, `l` leave to the building (it skips the elevator; the floor is back at the elevator on your next visit). On the top floor, `j` appears here too once you can breach. |
| Corridor, on your way out of an apartment | Leaving an apartment puts you on a second, plainer corridor screen: numbered doors and `l`, no `b`. `l` there takes you to the floor's corridor screen above. It looks like a repeat; it is not a bug in your typing. <!-- Room.groovy:251, Corridor.groovy:81-92 --> |
| Room | `t` interact, `f` next room, `b` previous room, `l` from the first room back to the corridor. |
| Null Reach | `e` to scan for an echo, `c` to capture it once the signal is strong enough. |

### The `t` menu inside a room

`1` to `N` takes that object. `d1` to `dN` drops the Nth item in your buffer *onto the floor of this room*, where it
stays and can be picked up again later, **but only its name survives the drop**: see the warning under
[Spoilers and exploits](#spoilers-and-exploits) before you drop anything valuable. `c` or Enter cancels. <!-- Room.groovy:162-239 -->

### The buffer screen (`i`)

`d 3` destroys item 3. `m 1 4` merges items 1 and 4. `b` or Enter goes back. Items are numbered from 1.
<!-- QuantumBufferController.groovy:13-52 -->

## How not to die

Coherence is the whole survival game, so here is exactly how it works.

**Every prompt costs Coherence, not every step.** Each time you press Enter, before anything else happens, you
lose 1. Scanning costs 1. Opening the buffer costs 1. A typo costs 1. Standing still and pressing Enter costs 1.
<!-- TurnProcessor.groovy:51-53 -->

**Some places cost more.** The 1 becomes 2 in a place whose era is `entropic`, and 2 anywhere below a building's
bedrock. Both at once is 4, but that only happens on a Layer's own screens, its elevator and its corridor view: the
apartments and rooms below bedrock are never entropic, so they cost 2. Nothing costs less than 1. <!-- TurnProcessor.groovy:52, Corridor.groovy:112-122 -->

**Only merging gives it back.** Every merge command in the buffer screen adds 15. It is capped at 100. Nothing else
restores Coherence: not resonance, not visiting new places, not time. <!-- QuantumBufferController.groovy:44, Player.groovy:48-50 -->

**What zero actually does.** You see `!!! CRITICAL_COHERENCE_FAILURE !!! REBOOTING...`, press Enter, and the
world is rebuilt from the same seed. You are back on the starting street with 100 Coherence. You keep your buffer,
your step count and your list of visited places. You lose everything that lived inside the world: objects you
took come back, ritual progress is gone, a breached building is sealed again. <!-- TurnProcessor.groovy:94-100 -->

**The warning signs.**

| Coherence | What you see |
| :-- | :-- |
| 70 and up | Green bar. |
| 30 to 69 | Yellow bar. |
| Under 40 | The room description starts corrupting. |
| Under 30 | Red bar. The map sprouts magenta `X` marks, more as you drop. |

<!-- HUDHeaderComponent.groovy:142-151, NarrativePaneComponent.groovy:25, LatticeMapComponent.groovy:43-49 -->

<div class="tip" markdown="1">
**Rule of thumb.** Keep at least two items in the buffer at all times. Two items is one merge, and one merge is
15 Coherence. Never let yourself drop below 30 with an empty buffer.
</div>

## Finding things worth taking

**Objects live in apartments, not rooms.** Each apartment gets between 5 and 19 objects, dealt from a shuffled deck
of every culture-and-era combination, so no apartment holds the same object twice; they are scattered at random
across its 1 to 10 rooms. Some rooms get nothing, some get a pile. Once you take an object it is gone for good;
apartments do not restock. <!-- ApartmentFactory.groovy, ThemeService.objectDeck, Room.groovy:176 -->

**Furniture is not loot.** Each room describes one to three pieces of the culture's furniture in some condition
(*overturned tatami mat*). You cannot take them. Only things listed under the `t` menu are objects.
<!-- RoomFactory.groovy, ThemeService.generateFurniture -->

**One-room apartments are the best.** All 5 to 19 objects are in the one room you land in. The corridor's scan
does not tell you room counts, but the door's room type applies to the first room, and the fewer rooms, the more
crowded they are.

**Every object has a frequency.** It is a number in hertz, and it is computed from the object's *name*: add up
the alphabet positions of the consonants (B is 2, Z is 26, vowels count nothing), then multiply by 12, because every
room in the game sits at depth 12. Long names with lots of consonants are worth more. If the room's culture matches
the culture shown as `RESONANCE` on the street header, which is true most of the time, you get another 10%, and the
resonance counter goes up by one. (A consonant sum of exactly 11, 22 or 33 would be doubled first, but no object
name in the current word lists adds up to one of those.) <!-- Gematria.groovy:11-33, Room.groovy:167-173 -->

**The free lottery.** Every time you *move* inside an apartment (step into a room, go `b` or `f`, or use `t`), there
is a 30% chance the room hands you a **Hidden Frequency** worth between one million and ten million hertz, about a thousand times any normal
object. It prints `>>> SPECTRAL_DEVIATION` in yellow when it happens. One roll per move: prompts spent
standing still (`i`, `s`, `help`) never roll again, and reloading a save does not either. <!-- Room.groovy:69-78, Player.groovy claimPassiveRoll -->

**Echoes in the void.** A `VOID_REACH` on the filament menu is a **Null Reach**. It holds one **Spectral Echo**,
worth 1,000 to 9,999 Hz, and the way to get it is to type `e` a few times until the signal reaches 100, then `c`. Each scan adds 10 to 39,
fixed by the reach and your step count, so the same walk gives the same readings. One echo per reach, ever.
<!-- NullSector.groovy:89-110, TurnProcessor.groovy:80 -->

## Reading doors before you open them

The door list in a corridor shows three things per door: an inscription if it has one, what the door is made of, and
its state, like `01. Bone-Lattice Aperture [PITTED]`. Of those, only the **inscription** tells you anything, and
reading it is free. <!-- Door.groovy:62-70 -->

Every door also carries a **trace**, a line of sensory text, but you only see it when you scan: press `s` in the
corridor. The trace is decided by the type of the first room behind the door, and it never lies.
<!-- CorridorFactory.groovy:43-47, ScanCommand.groovy:117-121 -->

| The scan reads | Room behind it is one of |
| :-- | :-- |
| frost forming on the hinges | Memory Well. Only this. Only in Ceremonial countries. |
| a sharp smell of ozone | Laboratory, Neural Link Array, Bio-Server, Power Plant, Processing Core |
| rhythmic clicking from the lock | Security Station, Armory, Maintenance Bay, Supply Node |
| a heavy low thrum | Barracks, Tactical Hub, Fuel Depot, Credit Hub |
| unnatural stillness | Observation Deck, Prayer Hall, Ritual Chamber, Archive, Trading Floor, Logic Market, and all four farm rooms |

<!-- RoomCategory.groovy:14-53, AnomalousTrace.groovy:10-15 -->

**Which four you can get depends on the country.** Each country has a trait, shown as `TRAIT:` in its header,
and that trait picks the four room types used in every building there. Military countries only ever click or hum.
Agricultural countries are all stillness, so their doors tell you nothing. Research countries are 75% ozone.
<!-- NameGenerator.groovy:104-114 -->

**Inscriptions are rarer and stronger.** About one door in five has words on it. Two of them are guarantees:
`[DATA_VAULT]` means Laboratory or Bio-Server, `!! DANGER !!` means Security Station or Armory. Any other word
just means "not one of those four". <!-- CorridorFactory.groovy:50, 63-88 -->

**Material and state mean nothing.** Whether the door is a rusted hatch or polished ceramic is decoration.
<!-- Door.groovy:28-40 -->

**The scan spells it out anyway.** The same `s` table has a `ROOM_TYPE` column next to the trace, so the trace table
above is for curiosity; the column is the answer. A scan costs one Coherence, like everything else you type.
<!-- ScanCommand.groovy:90-121 -->

Room type is mostly flavour, by the way. It changes the name and the description. It does not change what objects
you find, which come from the planet's culture and era.

## The buffer: merging and keystones

The buffer is your inventory. The HUD says `n/16`, but there is no limit; it will hold as many items as you like.
<!-- HUDHeaderComponent.groovy:99 -->

**Merging** takes two items out and puts one in. The new item's frequency is the sum of the two. Its name is the
first word of each parent joined with a dash, plus "Hybrid", so "Rusted Chain" and "Paper Lantern" become
`Rusted-Paper Hybrid`. Every merge gives you 15 Coherence. <!-- SynthesisService.groovy:19-22 -->

**"Resonance" is a badge, not a bonus.** If the new frequency divides evenly by 11 you see a green
`!!! RESONANCE DETECTED` and a counter goes up. The same counter also goes up for every object you take in a room
whose culture matches the street's `RESONANCE`, and once for every Keystone you forge (0 divides by 11). It appears in
the telemetry pane and in the ending. It does nothing else. <!-- Player.groovy:106-108, Room.groovy:173, SpectralFrequency.groovy:16 --> The codex's "stabilized merges give more
Coherence" is not in the game. All merges give 15.

**Keystones.** When a building is primed (next section) and you merge two items while inside it, you get that
building's Keystone instead of a hybrid. It is worth 0 Hz, and it is the key to the basement. You only ever hold
one per building, and it opens only that building, even if another one has the same name.
<!-- SynthesisService.groovy:16, Building.groovy:37-39 -->

## The ritual and the bedrock

This is the game's one real quest, and the manual describes it wrong. Here is the recipe from the code.
<!-- Building.groovy:32-34, RitualTracker.groovy:22-39 -->

1. **Pick a small building.** You will need to pick up at least one object on *every* floor. Buildings have 3
   to 100 floors, and 41% of them are small, with 3 to 10. <!-- BuildingFactory.groovy:29-52 --> The street list does
   not show floor counts. Walk in: the lobby lists every floor, and `ll` shows `[FLOORS: n]` once you are inside.
2. **Take something on every floor.** Any capture counts, including a Hidden Frequency that lands in your lap.
   The building's status line reads `INFUSION_ACTIVE` once you start merging. **Nothing on screen shows which floors
   you have sampled**, so keep count yourself. The lobby's `[CLEARED]` means something else: you have visited every
   corridor, apartment and room on that floor. <!-- Building.groovy:128-133, 224-225 -->
3. **Merge seven times inside the building.** Merges done on the street or elsewhere do not count. This is seven
   merges, not seven "resonant" items. <!-- RitualTracker.groovy:32-38 -->
4. **Merge an eighth time.** The seventh merge is counted *after* the game checks whether you are primed, so the
   eighth is the first that can produce the Keystone. You need at least nine items in total to get there.
   <!-- Player.groovy:79-81 --> You will see `>>> CRITICAL_WAVEFORM_COLLAPSE: KEYSTONE_STABILIZED <<<`.
5. **Ride to the top floor.** A new option, `j. Breach the Bedrock`, appears anywhere on that floor, in the elevator
   and in the corridor. It consumes the Keystone. <!-- Floor.groovy:59-72 -->
6. **Go to floor 0.** `d` now says `Descend into the Substrate`. Press it.

**What is down there.** Floors count down from -1 and never stop; the building will manufacture layer -100 if you
keep pressing `d`. <!-- Building.groovy:247-251 --> Floors are called Layers, corridors Arteries, apartments Crypts, rooms
Shards. On the map every node becomes `☠`. Coherence is relabelled Integrity and drains twice as fast. Everything
you take down there gets the 10% culture bonus, because the whole basement is one culture. The ticker starts
adding lines like `[VOID] We see you.` about a third of the time. <!-- HUDHeaderComponent.groovy:85-88 --> The objects
down there come from a special word list of 28 entries that you never see above ground.

**Quitting down there gives you a different ending.** See the spoilers.

<div class="warn" markdown="1">
**Dying resets the ritual.** A reboot rebuilds the building, so sampled floors, merge count and the breach are all
lost. Your Keystone survives in the buffer and still fits: it remembers the building's address in the world, not its
name, so it keeps working even if a game update renames the building. <!-- Building.groovy:37-39 --> A Keystone forged
before that fix remembers nothing and opens nothing; the building is still primed, so merging two more items inside it
forges a working one. Sync before you attempt the breach anyway.
</div>

## Where to go

**Null Reaches.** On the filament menu, `VOID_REACH` entries are Null Reaches. About 30% of filament nodes are
one. <!-- FilamentFactory.groovy:30-39 --> They are thinner, with only one or two solar systems, but buildings under them
have double the chance of being a landmark (8% instead of 4%), and each reach holds one free Spectral Echo.

**Landmarks** are buildings with grand names like "The Void-Watcher" or "The Eye of the Web", shown in bold cyan on
the street list, with a banner when you first enter. There are 15 names. They contain nothing special; the name is
the prize. <!-- NameGenerator.groovy:82-98, 126-137 -->

**Check the era.** The street header shows `[TECH_ERA: X]`. If X is `ENTROPIC`, every prompt costs 2. There is
no era that costs less. <!-- Street.groovy:87, TurnProcessor.groovy:47 -->

**Rebel districts.** One city in ten is flagged `[UNAUTHORIZED_ZONE]` in red. It swaps the planet's main and
secondary culture, so the 10% frequency bonus lands on the *other* culture there, and it swaps the planet's two
eras the same way, so the street era (and the Entropic drain) can differ from the rest of the planet.
<!-- CityFactory.groovy:34-41 -->

**Apartments drift in time.** About one apartment in six carries the planet's *second* era: its objects and lighting
are of that era, and nothing on screen announces it. The drain cost still follows the street header.
<!-- VibeCapsule.pickTimeline, ApartmentFactory.groovy:29 -->

**Every culture, era and trait has its own words.** Each of the ten cultures has its own wall descriptions and
its own building and room names, each of the eight eras its own lighting, and each of the six country traits its own
room structures. <!-- ThemeService.groovy, NameGenerator.groovy; themes/atmosphere/*/index.txt, names/buildings/index.txt -->
If a room ever falls back to a generic line, the game prints a `[THEME_WARN]` message naming the missing file. That is a
bug, not a feature.

**Building size odds.** Small 41% (3 to 10 floors), medium 30% (10 to 25), large 20% (30 to 50), massive 9%
(50 to 100). <!-- BuildingFactory.groovy:29-52 -->

## Reading the screen

**The sparkline** on the first HUD line is your path drawn as icons, one per level, with your current level in
brackets: <!-- Container.groovy:258-276 -->

`∞` universe, `»` filament, `○` sector or null reach, `☼` solar system, `⊕` planet, `⬚` country, `🏙` city,
`═` street, `⌂` building, `▤` floor, `▅` corridor, `🚪` apartment, `□` room. Below bedrock the tail reads `▤-1 ▅ 🚪 ☠`:
the layer shows its number and only the room turns into `☠`. <!-- Floor.groovy:88-91, Room.groovy:65 -->

**PULSE_TRAVERSAL** is how many menu choices you have made that the game accepted, moves and `t` alike; it carries
over when you restore a save. Global commands (`s`, `i`, `m`, `p`, `sync`) cost Coherence but do not count here. **HOP_DENSITY** is how deep you are, with the
universe at 0 and rooms at 12. **LOCUS_HASH** looks like coordinates but is decorative; it is a stable random
number per place. <!-- Container.groovy:202-211 -->

**The right pane** shows a map from the street level upward and a fake spectrogram from the building level
downward. <!-- TelemetryComponent.groovy:48-55 --> On the map, dim symbols are unvisited and bright ones are visited.

**The compass** under the description shows which of `u`, `d`, `f`, `b` and `l` work right now. A bold letter is
available. A grey `X` means you cannot go that way but its opposite exists. <!-- CompassComponent.groovy:36-44 -->

**The ticker** shows your last events: `LOC:` for a newly discovered place, `OBJ:` for a capture, `SYN:` for a
merge. <!-- HUDHeaderComponent.groovy:90-94 -->

**The frame colour** is the planet's main culture: rust is red, neon is bright cyan, baroque yellow, monolith cyan,
organic green, void grey, shogun magenta, zenith blue, gilded white. <!-- PlanetFactory.groovy:40-51 -->

**ATMOS_SHIFT and Sector Mutation** are the same thing under two names: the country's trait, in capitals. The floor
diagnostic calls it `ATMOS_SHIFT`, the country screen calls it `Sector Mutation`, and above country level it reads
`STANDARD`. `STABILITY` on the same floor diagnostic is the share of apartments that follow the planet's main
culture, between 75% and 90%. <!-- VibeCapsule.groovy:12-27, CountryFactory.groovy:37, ElevatorState.groovy:81-82 -->

**Floor zone names** in the building lobby are picked by height, not by what is on the floor. Floor 0 is always
`TRANSIT_LOBBY` and the top floor is always `PEAK_OBSERVATORY`. Floors 1 to 4 draw from four basement-style names,
up to three floors under the top draw from four executive names (a building needs nine floors to have all three), and
everything between draws from four living names.
The rooms behind the doors are chosen by the country's trait, not by the zone. <!-- Building.groovy:72-90 -->

## Saving, quitting and seeds

**`sync`** writes `session.trace` in the folder you launched from. It stores the world's seed, your position,
Coherence, step count, every place you have visited, your buffer, and per-place changes: which objects are gone
from which rooms, which buildings are primed or breached, and whether each floor was in elevator or corridor mode.
<!-- SyncManager.groovy:21-39, Building.groovy:49-58, Floor.groovy:23-28, Room.groovy:91-99 -->

It does **not** store your resonance counter, so that ends at 0 after a reload, and it does not store whether you
already took a Null Reach's echo.

**`quit`** asks `Are you sure? [y/N]`, then `Synchronize before termination? [Y/n]`, then writes a journal entry
to `journal.txt` and prints an ending. <!-- QuitCommand.groovy:16-27 -->

**Crashes lose everything since your last sync.** There is no autosave. Sync often.

**Finding your seed.** There is no seed on screen. Press `p`; the screenshot file's header has a `SEED:` line.
<!-- ScreenBuffer.groovy:35 -->

**Playing a specific seed.** `./run.sh --seed <n>` starts a new game on master seed `n` (a whole number, negative
allowed); without it a new game uses the current time. A value that is not a whole number is refused before the
game starts. `./vinc.sh --seed <n>` does the same without the intro. <!-- LaunchArgs.groovy, Main.groovy, Game.groovy:31 -->

**The seed scanner.** `./vinc.sh --scan <start> <count> building <floors>` or `... culture <name>` searches
seeds for a building with at least that many floors, or that culture, and prints the first seed that matches.
<!-- SeedScanner.groovy:28-58 --> It prints the seed only, not where in that world the match is. Feed the seed to `--seed`.

## Ten tips, ranked

1. **Keep two items in the buffer, always.** They are 15 Coherence you have not spent yet.
2. **Merge inside the building you are working on.** Merges elsewhere are worth 15 Coherence and nothing more.
3. **Read the inscriptions before scanning.** `[DATA_VAULT]` and `!! DANGER !!` on the door list are free; the trace and
   the room type cost one `s`.
4. **Walk through every room of an apartment.** Each move is a fresh 30% shot at a seven-figure item. Standing still
   and pressing `i` or `s` rolls nothing.
5. **Do the ritual in a small building.** Ten floors is a chore; a hundred is a lifestyle.
6. **Avoid entropic eras** unless you are hunting something specific there. Double cost, no upside.
7. **Take the Null Reach detour** at least once. The echo is free, and landmarks are twice as common.
8. **Never drop anything you care about.** `d 1` in the buffer screen destroys an item; `d1` in a room's `t` menu
   keeps only its name. Ordinary objects survive that. Keystones, hybrids and Hidden Frequencies do not.
9. **Sync before the breach and before quitting.** Reboots and crashes both eat unsaved progress. A save made below the bedrock loads where you stood. <!-- Building.groovy childAt + getFloor; AbyssalRestoreContractTest R1-R2 -->
10. **Use `./vinc.sh`** after you have seen the intro once.

## Known quirks

These are things the game says that are not true, or things that work differently from how they look. They may be
fixed in a future version.

* `TRACE_BUFFER: n/16` suggests a cap of 16. There is no cap.
* After a screenshot the game says it went to `/screenshots/`. It is `screenshots/` relative to where you launched.
  <!-- CaptureCommand.groovy:32, CaptureService.groovy:21 -->
* A door marked `(VISITED)` in the corridor text never appears; visited status is shown as `[V]` in the door list
  instead.

## Spoilers and exploits

<details markdown="1">
<summary>Open at your own risk. Everything below spoils something or breaks the game on purpose.</summary>

### The three endings

The ending you see on `quit` depends on where you are and how much you have seen. <!-- SessionRecap.groovy:14-69 -->

* **Below bedrock:** a red `[VOID_RESONANCE_TERMINATION]` and four typewritten lines ending "Sleep among the
  static, Operator." This one wins over the others.
* **Twenty or more places visited:** a full recap with your final position, steps, places, buffer size and
  resonance count, ending "Expedition successful."
* **Fewer than twenty:** four fake shutdown steps and "Neural link severed."

Twenty places is easy. One trip into one apartment marks the apartment, the room, and every ancestor on the way.

### The debug menu

Type `glitch` at any prompt. You get a numbered menu; `c` cancels. <!-- RenderingCoordinator.groovy:45-71 -->

| Option | What it does |
| :-- | :-- |
| `1` PRIME | Marks every floor of the current building as sampled and sets its merge count to 7. Your next merge inside it yields the Keystone. |
| `2` KEYSTONE | Puts the current building's Keystone straight into your buffer. |
| `3` BREACH | Marks the building breached and teleports you to layer -1. |
| `4` INTEGRITY | Sets your Coherence to any number from 0 to 100. |

This is a developer tool that shipped in the game. It is not a secret ending. It is a way to see the basement
without doing the work.

### Rooms are lockers, for plain objects only

Dropping an item with `d1` in the `t` menu adds it to the room's object list, and room object lists are saved.
Come back after a reload and it is still there.

<div class="warn" markdown="1">
**The room remembers the name and nothing else.** When you pick the item up again, its frequency is worked out from
its name, as if you had found it there. An ordinary object taken back from the same room comes back the same. A **Keystone** comes back as a plain
item that opens nothing. A **hybrid** or a **Hidden Frequency** comes back worth whatever its name spells, a thousand
or two hertz, instead of the sum or the millions it held. Do not stash any of those. <!-- Room.groovy:207-208, 221-223 -->
</div>

### Things that were built and never wired up

* A door trace called `METALLIC_TEARING`, with full text about structural stress, assigned to no room type.
* A scrawled `_it_hums_` inscription for abandoned rooms. There are no abandoned rooms.
* Lootable containers with names like `Quantum Vault` and `Sealed Terminal`. The generator exists, nothing calls it.
* A vault of named seeds (`STRESS_TEST_CITY = 12345`, `ABYSSAL_SUBSTRATE_FOUND = 777`). Nothing reads it.

### The 15 landmark names

The Eye of the Web · Old Unimatrix Root · The Last Stable Surface · The Crystal Sanctum · The Silent Node ·
The Phantom Spire · The First Pillar · The Heart of the Strata · Apex of Lost Frequencies · The Great Neural Anchor ·
Pillar of Eternal Static · Unit Zero · The Bleeding Sky-Structure · Memory of the First Pulse · The Void-Watcher

### What the void is made of

Below bedrock, objects are drawn from a 28-entry list that reads like a haunted stack trace: `unhandled exception`,
`null reference`, `dead thread`, `orphan process`, `impossible cube`, `eyeless observer-node`, `altar of the
core-dump`, `sigil of the unmaker`, `pact of the root-user`, `shackled deity-process`, `void-gate of the deep`,
`hunger of the zero-vector`. Every other culture has sixteen relics of its own.

### A known world: seed 4660

Launch with `./run.sh --seed 4660`. You start on street **Busy Terrace** with 14 buildings, in city **Starford**, the
**Free Dust Kingdom** (Industrial), planet **Hydraia** (monolith, analog era), filament **Mu-993-Sync**; `ll` shows the
whole path. Building `1` is the **Eternal Shaft**, three floors. Type `0` for the ground floor, `c` for the corridor,
`1` for the first door: it opens on `Unbroken Fuel Depot`, holding all 15 of its apartment's objects. A three-floor
building with a fifteen-object room is a good place to learn the ritual. (Walked on 2026-09-20; a content update can
rename things, the shape stays.)

</details>

## FAQ

**Why did the world change when I died?**
It did not change; it was rebuilt from the same seed. Everything is where it was, except that changes you made
inside it, like taking objects, are undone.

**Why does scanning cost Coherence?**
Everything you type costs one, because the drain happens once per prompt before your command runs.

**Can I pick a seed?**
Yes: `./run.sh --seed <n>` or `./vinc.sh --seed <n>`, any whole number. See "Saving, quitting and seeds".

**Why does my resonance count reset when I load?**
It is not part of the save file. It is cosmetic anyway.

**Is there a bottom to the basement?**
No. Floors are created on demand for as long as you keep pressing `d`. The pressure readout stops at 100% from
layer -10 onward. <!-- Building.groovy:89 -->

**What is the buffer limit?**
There is none. Ignore the `/16`.

**Do landmarks have better loot?**
No. Same objects as any other building. The name and the banner are the whole reward.

---

*Back to the [index]({{ "/" | relative_url }}) · The in-world manual starts at
[SYSTEM_INITIALIZATION]({{ "/terminal/manual/system_initialization.html" | relative_url }}).*

</div>
