---
layout: terminal
title: WEB_PLAYERS_GUIDE
map_type: strategy
description: How to play Endless Transit in the browser, on a phone or a desktop - every button, every number, and where the web game differs from the terminal game.
---

<div class="guide" markdown="1">

# The Player's Guide to Endless Transit on the web

This page is written in plain language, for the game you play at
[**ghostsysoutnull.github.io/endless-transit/play/**]({{ "/play/" | relative_url }}) — on a phone held upright or in a
desktop browser, nothing to install. The terminal game has its own [guide]({{ "/terminal/guide/players_guide.html" | relative_url }});
the two games share a world and most rules, and the last section of this page lists every place they differ.

Every number here was read from the web game's source code (`web/src`) on 2026-09-23. If this page and the game ever
disagree, one of them has a bug.

<div class="toc" markdown="1">
**Contents**

* [What this game is](#what-this-game-is)
* [Your first five minutes](#your-first-five-minutes)
* [Every button](#every-button)
* [How not to die](#how-not-to-die)
* [Finding things worth taking](#finding-things-worth-taking)
* [Reading doors before you open them](#reading-doors-before-you-open-them)
* [The buffer: merging and keystones](#the-buffer-merging-and-keystones)
* [The ritual and the bedrock](#the-ritual-and-the-bedrock)
* [Where to go](#where-to-go)
* [Reading the screen](#reading-the-screen)
* [Saving, seeds and the debug tools](#saving-seeds-and-the-debug-tools)
* [Ten tips, ranked](#ten-tips-ranked)
* [How the web game differs from the terminal game](#how-the-web-game-differs-from-the-terminal-game)
* [FAQ](#faq)
</div>

## What this game is

Endless Transit is a text adventure set in an infinite world that is generated from a single seed. The world is a
tree: universe, filament, sector, solar system, planet, country, city, street, building, floor, corridor, apartment,
room. You start on a **street**. Every level is built the moment you look at it, and the same seed always builds the
same world. <!-- src/engine/rules/Journey.ts:71-77 -->

You have one resource, called **Coherence**. It starts at 100 and goes down every time you tap something that acts.
The only way to get it back is to merge two things you picked up. When it reaches zero, the world resets.
<!-- src/engine/rules/Coherence.ts:1-2, src/engine/rules/GameEngine.ts:351-358 -->

There is one long-term goal. Do enough work inside a building and you can forge a **Keystone**, break through the
building's floor, and climb down into a red basement ten layers deep that whispers at you. That is the ending, if you
want one.

## Your first five minutes

**Opening the game.** Open the link above. The title screen shows one button, **NEW WORLD**; tap it and a seed
(`XXXX-XXXX-XXXX-XXXX`) and a universe name appear, with **ENTER WORLD** and **RE-ROLL** under them. Re-roll as often
as you like; enter when you like the name. The seed is drawn from your browser's random source; there is no box to
type one in. <!-- src/engine/rules/GameEngine.ts:104-126, src/platform/CryptoEntropySource.ts -->

**Coming back.** If you have played before, the title shows **CONTINUE** instead, and reloading the page while you are
in the world puts you straight back where you stood — the game saves itself after every tap, in this browser only.
See [Saving](#saving-seeds-and-the-debug-tools).

**The screen, on a phone.** The top box is the HUD: the game's name, **Steps**, **Buffer** (what you carry, out of
16) and the Coherence bar (Integrity below the bedrock). Under it runs the **depth rail**: one glyph for each level from
the universe down to where you stand, which is ringed. <!-- src/ui/screens/HudPresenter.ts:24-35, 99-115 --> Under the
rail is the place: its kind, its name, its chips (your position among your neighbours, such as `Z-axis 1 of 16` on a
floor or `Strata 2 of 20` in a building, then its tags), then the **moves** as buttons, then its description.
<!-- src/ui/screens/HudPresenter.ts:116-131 --> Below that, the list of what lies one level down, one
button per place. At the bottom, always in reach of your thumb, is the **dock**: the way out (`▲ LEAVE …`) and **MORE**.
MORE opens the rest of the dock above it — SCAN, MAP, BUFFER, TRACE, HELP, TITLE SCREEN, END SESSION — and folds again
after your next tap. <!-- src/ui/screens/HudPresenter.ts:162-169 -->

**The screen, on a desktop.** The same, with the rail down the left and each level's name beside its glyph, the list beside the place, all eight dock buttons in
a row, and a letter on every button: that letter is its key. A phone needs none.

**Your first walk.** Every action is a button. Tap it.

1. You begin on a **street** with 100 Coherence. The street's tags tell you the era and culture of this part of the
   world. Everything worth taking is below you, inside the buildings; the rest of the universe is above you, one
   `▲ LEAVE STREET` at a time.
2. Tap a building. You arrive in its lobby with a list of floors, top floor first, the elevator marked `[>X<]` at the
   floor it waits on. Tap a floor. <!-- src/engine/model/Building.ts:16-17 -->
3. You are in the **elevator** for that floor: **GO UP**, **GO DOWN**, **ENTER CORRIDOR**.
4. The corridor lists doors. Tap one. You are dropped straight into the first room behind it.
5. If the room has objects, each one is a button: tap it to take it. **GO FORWARD** walks to the next room, **GO BACK**
   to the previous; **EXIT APARTMENT** is offered in the first room only.

Congratulations, you have played the game. Everything below is how to play it well. Short of time? The
[cheat sheet]({{ "/web/cheat_sheet.html" | relative_url }}) is one screen, and **HELP** in the dock is the same manual
inside the game.

## Every button

A tap does one of three things: a **step** (a move, a place, a take) costs Coherence and counts on **Steps**;
a **command** (SCAN, MAP, BUFFER, TRACE, HELP, TITLE SCREEN, END SESSION) costs Coherence and counts nothing; an
**answer** on a screen the game opened (the buffer, the recap, HELP, the link failure) costs nothing.
<!-- src/engine/rules/Turn.ts, src/engine/rules/GameEngine.ts:331-370 --> A tap on something that is no longer on
offer changes nothing and costs nothing.

### Moving

| Button | What it does |
| :-- | :-- |
| A listed place | Enters it. The list is what lies one level down. |
| `▲ LEAVE …` | Back up one level. From a corridor it goes to the building and skips the elevator; the floor is back at the elevator on your next visit. <!-- src/engine/model/Floor.ts:180-183 --> |
| **GO UP** / **GO DOWN** | Ride the elevator one floor. The top floor drops GO UP, the ground floor drops GO DOWN. <!-- src/engine/model/ElevatorState.ts:9-10 --> |
| **ENTER CORRIDOR** / **BACK TO ELEVATOR** | The corridor lists the floor's doors; a door opens an apartment's first room. |
| **GO FORWARD** / **GO BACK** | Walk an apartment's rooms. |
| **EXIT APARTMENT** | Back to the corridor, from the first room only. <!-- src/engine/model/Room.ts:282-284 --> |
| An object | Takes it into the buffer. The tiles stop being buttons when the buffer is full (`BUFFER FULL — merge or drop a fragment to take more`). <!-- src/ui/screens/HudPresenter.ts:291 --> |
| **BREACH THE BEDROCK** | On the top floor of a primed building whose Keystone you hold, in the elevator or the corridor. Spends the Keystone. |
| **DESCEND INTO THE SUBSTRATE** | On floor 0 of a breached building, where GO DOWN used to be. |
| **SCAN FOR SPECTRAL ECHOES** / **CAPTURE SPECTRAL ECHO** | In a Null Reach: scan until the signal reaches 100, then capture. <!-- src/engine/rules/GameEngine.ts:480-494 --> |

### The dock

| Button | Key | What it does |
| :-- | :-- | :-- |
| **SCAN** | `S` | What is behind the doors, which floors are near you (two either side), or the rooms of the apartment. Costs 1, no step. <!-- src/engine/model/Building.ts:18-19 --> |
| **MAP** | `M` | Draws the places you can enter from here, you at the centre; dim is unvisited. Nothing inside a room. Costs 1, no step. |
| **BUFFER** | `I` | Your inventory. Costs 1 to open; everything inside is free. |
| **TRACE** | none | Your whole path from the universe down to here, drawn. Costs 1. |
| **HELP** | `H` | The operator's manual: what every button does and how not to die. Costs 1. |
| **TITLE SCREEN** | `T` | Back to the title; the world waits behind CONTINUE. Costs 1. |
| **END SESSION** | `Q` | The recap of this run. **RESUME** comes back for free; END SESSION again goes to the title with your place kept. |
| **MORE** / **LESS** | — | On a phone, the rest of the dock. |

<!-- src/engine/rules/GameEngine.ts:201-282 -->

The keys are a desktop extra and the letter on the button is the key: a listed place takes a digit (`1`–`9`) or, for
floors, its **floor number** (`0` is the lobby; floors 10 and up have no key); the moves take `U`, `D`, `C`, `B`, `F`;
the way out `L`; the breach `J`; the echo hunt `E` and `C`. <!-- src/engine/rules/GameEngine.ts:44-64, 426-441 -->

### The buffer screen

Every fragment is a row with its frequency, its bar, its phase (`[STABLE]` or `[SHIFTING]`) and, when it has one, its
`[RESONANT]` badge, then two buttons: **SELECT** and **DROP HERE**. Select one fragment, then a second (its button now
reads **MERGE**): they merge. **DROP HERE** lays the fragment on the floor of the room you are standing in, where it stays;
outside a room there is nothing to drop onto. **▲ BACK TO REALITY** closes the screen. Nothing on this screen costs
anything. <!-- src/engine/rules/BufferPrompt.ts, src/engine/rules/Journey.ts:147-153 -->

## How not to die

Coherence is the whole survival game, so here is exactly how it works.

**Every step and every command costs Coherence, before anything else happens.** A move costs 1. Taking an object costs
1. Scanning costs 1. Opening the buffer costs 1. Opening HELP costs 1. Answers cost nothing.
<!-- src/engine/rules/Drain.ts:3-4, src/engine/rules/GameEngine.ts:351-352 -->

**Some places cost more.** The 1 becomes 2 in a place whose era is `ENTROPIC`, and 2 anywhere below a building's
bedrock. Both at once is 4, but that only happens on a Layer's own screens, its elevator and its corridor view: the
crypts and shards below bedrock are never entropic, so they cost 2. Nothing costs less than 1. The era that counts is the
one in the street header, never an apartment's own. <!-- src/engine/rules/Drain.ts:9-10, 19-22; src/engine/model/Layer.ts:15-16 -->

**Only merging gives it back.** Every merge adds 15. It is capped at 100. Nothing else restores Coherence: not
resonance, not visiting new places, not time. <!-- src/engine/rules/Player.ts:7-8, 81; src/engine/rules/Coherence.ts:63-65 -->

**What zero actually does.** The tap that takes your last point never runs: you see
`!!! CRITICAL_COHERENCE_FAILURE !!!` and one button, **REBUILD**. The world is rebuilt from the same seed and you are back
on the starting street with 100. You keep your buffer, your step count and your list of visited places. You lose
everything that lived inside the world: objects you took come back, ritual progress is gone, a breached building is
sealed again, a Null Reach forgets you took its echo. <!-- src/engine/rules/GameEngine.ts:353-358, src/engine/rules/Journey.ts:194-206 -->

**The warning signs.**

| Coherence | What you see |
| :-- | :-- |
| 70 and up | Green bar, `STABLE`. |
| 30 to 69 | Yellow bar, `DEGRADED`. |
| Under 40 | The place's description starts corrupting: each character has a 1-in-10 chance of turning to static. |
| Under 30 | Red bar, `CRITICAL`. The map sprouts magenta `X` marks, one for every two points below 30. |

<!-- src/engine/rules/Coherence.ts:7-15, 86-90; src/engine/rules/Corruption.ts:6-7 -->

<div class="tip" markdown="1">
**Rule of thumb.** Keep at least two fragments in the buffer at all times. Two fragments is one merge, and one merge is
15 Coherence. Never let yourself drop below 30 with an empty buffer.
</div>

## Finding things worth taking

**Objects live in apartments, not rooms.** Each apartment gets between 5 and 19 objects, dealt from a shuffled deck of
every culture-and-era combination, so no apartment holds the same object twice; they are scattered at random across its
1 to 10 rooms. Some rooms get nothing, some get a pile. Once you take an object it is gone for good; apartments do not
restock. About one apartment in a hundred is a temporal anomaly. <!-- src/engine/procgen/ApartmentFactory.ts:17-22 -->

**Furniture is not loot.** Each room describes one to three pieces of the culture's furniture in some condition. You
cannot take them. Only the tiles are objects. <!-- src/engine/procgen/RoomFactory.ts:19-20 -->

**Every object has a frequency.** It is a number in hertz, computed from the object's *name*: add up the alphabet
positions of the consonants (B is 2, Z is 26, vowels count nothing), double the sum if it is exactly 11, 22 or 33, then
multiply by 12, because every room sits at depth 12. If the room's culture matches the `RESONANCE` shown on the street
header, which is true most of the time, the frequency is amplified by a tenth (whole hertz kept) and the resonance tally
goes up by one. <!-- src/engine/model/Gematria.ts:5-6, 34-37; src/engine/model/Frequency.ts:1-4 -->

**The free lottery.** Every *step* you take inside an apartment (into a room, forward, back, a take) is a 30% chance
that the room hands you a **Hidden Frequency** worth between one and ten million hertz. It prints `SPECTRAL_DEVIATION`
after the tap's own message. One roll per step, decided by the room and your step count: commands (SCAN, the buffer,
HELP) never roll, and reloading a save does not either. <!-- src/engine/model/Room.ts:30-33, src/engine/rules/GameEngine.ts:361-367 -->

**Echoes in the void.** A Null Reach on the filament list holds one **Spectral Echo** worth 1,000 to 9,999 Hz. Tap
**SCAN FOR SPECTRAL ECHOES** a few times until the signal reaches 100 — each scan adds 10 to 39, fixed by the reach and
your step count — then **CAPTURE SPECTRAL ECHO**. One echo per reach, until a reboot rebuilds the world.
<!-- src/engine/model/Echo.ts:6-10 -->

## Reading doors before you open them

The door list in a corridor shows each door's inscription if it has one, what it is made of and its state, like
`_void_sink_ Brutalist Slab [PITTED]`, with a sentence about its look under it. Reading all of that is free.

Every door also carries a **trace**, a line of sensory text, and a **room type**, but you only see them when you scan:
tap **SCAN** in the corridor. The trace is decided by the type of the first room behind the door, and it never lies.
The five traces, and which four room types a country's trait allows, are the same as in the
[terminal guide]({{ "/terminal/guide/players_guide.html#reading-doors-before-you-open-them" | relative_url }}): the
web game reads the same word lists. <!-- src/engine/model/RoomCategory.ts, src/content/names/rooms -->

**Inscriptions are rarer and stronger.** About one door in five has words on it. Two of them are guarantees:
`[DATA_VAULT]` means Laboratory or Bio-Server, `!! DANGER !!` means Security Station or Armory. Any other word just
means "not one of those four". <!-- src/engine/procgen/Doors.ts:9-10 -->

**Material and state mean nothing.** Whether the door is a rusted hatch or polished ceramic is decoration.

Room type is mostly flavour. It changes the name and the description. It does not change what objects you find, which
come from the planet's culture and era.

## The buffer: merging and keystones

The buffer is your inventory. It holds **sixteen** fragments; the HUD's `n/16` means it. When it is full the room's
tiles are shown but not tappable, the echo cannot be captured, and the lottery pays nothing — merge or drop to make
room. <!-- src/engine/rules/Buffer.ts:4-5, 34-43 -->

**Merging** takes two fragments out and puts one in. The new fragment's frequency is the sum of the two. Its name is the
first word of each parent joined with a dash, plus "Hybrid", in the order you selected them, so selecting "Rusted
Chain" then "Paper Lantern" gives `Rusted-Paper Hybrid`. Every merge gives you 15 Coherence.
<!-- src/engine/model/Hybrid.ts:5-6, src/engine/rules/Player.ts:78-84 -->

**"Resonance" is a badge, not a bonus.** A fragment whose frequency divides evenly by 11 wears `[RESONANT]`, and the
tally (`RESONANT_TRACES` on the buffer screen, `> Resonant traces` in the telemetry pane, and in the ending) goes up
once for every resonant object you take fresh from a room and once for every resonant merge. 0 Hz never resonates, so
a Keystone never counts; a Hidden Frequency or an Echo never counts either. Dropping a fragment and taking it back
counts nothing. The tally does nothing else. <!-- src/engine/model/Frequency.ts:1-2, 36-38; src/engine/rules/Player.ts:61-71, 82 -->

**Keystones.** When a building is primed (next section) and you merge two fragments while inside it, you get that
building's Keystone instead of a hybrid: `Critical waveform collapse: KEYSTONE_STABILIZED`. It is worth 0 Hz, and it is
the key to the basement. You only ever hold one per building, and it opens only that building, even if another one has
the same name. <!-- src/engine/model/Keystone.ts:6-7, src/engine/model/Building.ts:132-140 -->

## The ritual and the bedrock

This is the game's one real quest. <!-- src/engine/model/Building.ts:20-23, 124-126 -->

1. **Pick a small building.** You will need to pick up at least one object on *every* floor. Buildings have 3 to 100
   floors, and 41% of them are small, with 3 to 10. The street list does not show floor counts; the lobby lists every
   floor, and SCAN at any elevator says `TOTAL_STRATA`. <!-- src/engine/procgen/BuildingSizes.ts:5-10 -->
2. **Take something on every floor.** Any capture counts, including a Hidden Frequency that lands in your lap. Nothing
   on screen shows which floors you have sampled, so keep count yourself.
3. **Merge seven times inside the building.** Merges done on the street or elsewhere do not count. This is seven
   merges, not seven "resonant" fragments.
4. **Merge an eighth time.** The seventh merge is counted *after* the game checks whether you are primed, so the
   eighth is the first that can produce the Keystone. You need at least nine fragments in total to get there.
   <!-- src/engine/rules/Journey.ts:155-166 -->
5. **Ride to the top floor.** A new button, **BREACH THE BEDROCK**, appears in the elevator and in the corridor. It
   consumes the Keystone and the lobby's status line reads `BEDROCK_BREACHED`.
6. **Go to floor 0.** GO DOWN now reads **DESCEND INTO THE SUBSTRATE**. Tap it.

**What is down there.** Ten Layers, `-0x1` down to `-0xA`, listed under the floors in the lobby with a pressure reading
that climbs 10% a layer to 100%. Floors are called Layers, corridors Arteries, apartments Crypts, rooms Shards. The
frame turns red, Coherence is relabelled `INTEGRITY` and drains twice as fast, on the map every node is `☠`, and the
telemetry pane adds a `[VOID]` line about a third of the time. Everything you take down there gets the culture bonus,
because the whole basement is one culture, the abyssal one, whose 28 objects you never see above ground.
<!-- src/engine/model/Building.ts:22-23; src/engine/model/Layer.ts:12-16; src/engine/rules/Telemetry.ts:8-10; src/engine/procgen/ThemeCatalog.ts:10-11 -->

**Ending the session down there gives you a different ending.** See the FAQ.

<div class="warn" markdown="1">
**Dying resets the ritual.** A reboot rebuilds the building, so sampled floors, merge count and the breach are all
lost. Your Keystone survives in the buffer and still fits: it remembers the building's address, not its name.
</div>

## Where to go

**Null Reaches.** On the filament list, `Null Reach` entries are just that. About 30% of filament nodes are one. They
are thinner, with only one or two solar systems, but buildings under them have double the chance of being a landmark,
and each reach holds one free Spectral Echo. <!-- src/engine/procgen/FilamentFactory.ts:13, src/engine/procgen/NullReachFactory.ts:10, src/engine/model/NullReach.ts:14 -->

**Landmarks** are buildings with grand names, marked on the street list. There are 15 names. They contain nothing
special; the name is the prize. A street's building has a 4% chance (3% plus half a percent per level below depth 5),
doubled under a Null Reach, never more than 25%. <!-- src/engine/procgen/BuildingNamer.ts:10-15 -->

**Check the era.** The street's tags show `TECH_ERA`. If it is `ENTROPIC`, every prompt costs 2. There is no era that
costs less. <!-- src/engine/rules/Drain.ts:10 -->

**Rebel districts.** One city in ten is a rebel district. It swaps the planet's main and secondary culture, so the
frequency bonus lands on the *other* culture there, and it swaps the planet's two eras the same way, so the street era
(and the Entropic drain) can differ from the rest of the planet. <!-- src/engine/procgen/CityFactory.ts:12, 29 -->

**Apartments drift in time.** Some apartments carry the planet's *second* era: their objects and lighting are of that
era, and the room's `TEMPORAL_MARKER` tag says so. The drain cost still follows the street header.

**Stability.** `STABILITY` on a floor's diagnostic is the share of the country's apartments that follow the planet's
main culture: 85% shifted by up to a tenth either way, kept between 10% and 90%. <!-- src/engine/model/Vibe.ts:6-8, src/engine/procgen/CountryFactory.ts:13-14 -->

**Building size odds.** Small 41% (3 to 10 floors, 2 to 6 doors a corridor), medium 30% (10 to 25, 4 to 10), large
20% (30 to 50, 8 to 16), massive 9% (50 to 100, 10 to 20). <!-- src/engine/procgen/BuildingSizes.ts:6-10 -->

**How big the world is.** 3 to 7 filaments in the universe, 4 to 8 nodes on a filament, 3 to 7 solar systems in a
sector, 2 to 10 planets, 2 to 8 countries, 2 to 10 cities, 3 to 15 streets, 4 to 20 buildings on a street (always an
even number). <!-- src/engine/procgen/UniverseFactory.ts:15, src/engine/procgen/FilamentFactory.ts:25, src/engine/procgen/SectorFactory.ts:19, src/engine/procgen/SolarSystemFactory.ts:19, src/engine/procgen/PlanetFactory.ts:27, src/engine/procgen/CountryFactory.ts:28, src/engine/procgen/CityFactory.ts:21, src/engine/procgen/StreetFactory.ts:19 -->

## Reading the screen

**The depth rail** under the HUD is your path, one glyph for each level, the current one ringed: `∞` universe,
`»` filament, `○` sector or null reach, `☼` solar system, `⊕` planet, `⬚` country, `🏙` city, `═` street, `⌂` building,
`▤` floor, `▅` corridor, `🚪` apartment, `□` room; below bedrock the shard is `☠`. Its length is how deep you are: one
glyph at the universe, thirteen in a room. A phone shows the glyphs, and a screen reader reads each level's kind and
name. A desktop shows the names too, in a column down the left.

**Steps** is how many steps the game accepted: moves, places and takes alike. It carries over when you reload.
Commands cost Coherence but do not count here.

**The pane** beside the list (under it on a phone) is a drawn map from the street level upward and a telemetry block
from the building level downward. On the map, dim symbols are unvisited and bright ones are visited.
<!-- src/engine/rules/Telemetry.ts:33-34 -->

**Visited marks.** A place you have been to shows a green `[V]` on its row. One trip into a room marks the room, the
apartment, and every ancestor on the way up to the universe. <!-- src/engine/rules/Player.ts:123-131 -->

**The status line** under the description is what your last tap did: the place entered, the object captured and its
frequency, the merge made.

**The frame colour** is the planet's main culture, one of nine; below bedrock it is the void's red.

**Floor zone names** in the lobby are picked by height. Floor 0 is always `TRANSIT_LOBBY` and the top floor
`PEAK_OBSERVATORY`; floors 1 to 4 draw from four basement-style names, floors within four of the top from four
executive names, everything between from four living names. <!-- src/engine/procgen/FloorZones.ts:5-7, 26 -->

## Saving, seeds and the debug tools

**Saving is automatic.** After every tap the game writes one save into this browser's storage, under the key
`endless-transit.save`: the seed, where you stand, your Coherence, steps, every place you have visited, your buffer,
your resonance tally, and what every visited place remembers — which objects are gone from which rooms, what lies
dropped on their floors, which floors are in corridor mode, where each elevator waits, which buildings are primed or
breached, whether a reach's echo is taken. There is one slot; a new world replaces it.
<!-- src/platform/LocalStorageSaveStore.ts:3, src/engine/persistence/SavedGame.ts:6, src/engine/rules/Journey.ts:208-224 -->

<div class="warn" markdown="1">
**The save lives in this browser only.** Another browser, another device or a private window starts from nothing, and
a browser may clear its storage at any time. There is no export and no import.
</div>

**Finding your seed.** It is on the title screen: **TITLE SCREEN** in the dock shows it, and **CONTINUE** takes you back.

**Playing a specific seed.** There is no seed box. RE-ROLL draws a new one; a seed you like, keep by not re-rolling.

**The debug tools.** Add `?debug` to the game's address
(`…/play/?debug`). A **DEBUG** button appears at the very bottom of every world screen and opens a strip of free
tools: an `INTEGRITY` ladder that sets your Coherence to 100, 70, 69, 40, 39, 30, 29 or 1; inside a building,
**PRIME BUILDING** (every floor sampled, seven merges in — your next merge inside it forges the Keystone) and
**SPAWN KEYSTONE** (the building's Keystone straight into your buffer). There is no breach tool: prime, merge, ride to
the top and breach. <!-- src/main.ts:34-35, src/engine/rules/GameEngine.ts:283-318, src/engine/rules/Coherence.ts:36-44 -->

## Ten tips, ranked

1. **Keep two fragments in the buffer, always.** They are 15 Coherence you have not spent yet.
2. **Merge inside the building you are working on.** Merges elsewhere are worth 15 Coherence and nothing more.
3. **Read the inscriptions before scanning.** `[DATA_VAULT]` and `!! DANGER !!` on the door list are free; the trace
   and the room type cost one SCAN.
4. **Walk through every room of an apartment.** Each step is a fresh 30% shot at a seven-figure fragment. Commands
   roll nothing.
5. **Do the ritual in a small building.** Ten floors is a chore; a hundred is a lifestyle.
6. **Avoid entropic eras** unless you are hunting something specific there. Double cost, no upside.
7. **Take the Null Reach detour** at least once. The echo is free, and landmarks are twice as common.
8. **Drop freely.** A dropped fragment lies in the room exactly as it was — a hybrid, a Keystone, a Hidden Frequency
   too — and comes back the same. Rooms are lockers.
9. **Make room before the lottery.** A full buffer pays nothing: sixteen is the cap.
10. **Open HELP once.** It is the manual, inside the game, and it costs one.

## How the web game differs from the terminal game

The web game was ported from the terminal game rule by rule; where the terminal guide and the terminal code disagreed,
the guide won, and the terminal game's known bugs were fixed rather than copied. Everything below was read from the
port's iteration notes (`tasks/port/I02.md` to `I09.md`).

1. **The first screen shows 100.** The terminal game drains before it draws its first screen, so you begin a point or
   two down; here the drain belongs to the tap, and the first tap shows 99.
2. **The basement is ten Layers deep**, `-0x1` to `-0xA`, listed in the lobby with their pressure. The terminal game
   manufactures layers for as long as you keep pressing `d`.
3. **A dropped fragment keeps everything**: its frequency, its provenance, its kind. A dropped Keystone still opens its
   building; a dropped hybrid or Hidden Frequency comes back worth what it held. The terminal game keeps only the name.
4. **The tally counts once.** A resonant object counts when taken fresh from its room, not again after a drop and a
   retake. A Keystone (0 Hz) never counts; a Hidden Frequency or an Echo never counts.
5. **The buffer holds sixteen.** The terminal HUD says `n/16` and means nothing by it; here the cap is real, a full
   buffer seals the tiles, and the lottery and the echo pay nothing until you make room.
6. **Nothing is ever destroyed.** The terminal buffer's `d 3` is gone; DROP HERE lays the fragment in the room instead,
   and it costs nothing (the terminal `t` menu charged a prompt and a step for a drop).
7. **No auto-take.** A lone object in a room is one tap, like any other.
8. **The hybrid's name keeps your order**: the first fragment you select is first. The terminal game put the higher
   buffer index first.
9. **No journal.** The terminal game writes `journal.txt` on quit; the web game writes nothing but its save.
10. **Saves live in the browser only**, one slot, written after every tap; no `sync`, no `session.trace`, no export,
    no import, and a browser may clear it. There is no restore prompt: a reload continues.
11. **No screenshots.** The terminal `p` and `P` commands have no browser equivalent; the seed is on the title screen
    instead.
12. **A typo costs nothing.** Buttons cannot mistype; a tap on something no longer offered changes nothing. In the
    terminal game every prompt, typos included, costs 1.
13. **The tap that takes your last point never runs.** The terminal game runs the last command and kills you on the
    next prompt's drain; the screens read the same, the step count at death differs by one.
14. **The drain follows the street header** (as the terminal *guide* says); the terminal *code* read the era of the
    apartment you stood in, so a drifted apartment could change the cost.
15. **A footprint marks every ancestor**, streets, countries, systems and filaments included, so the twenty-place
    ending counts what the guide says it counts. The terminal code skipped those levels.
16. **The room shows its apartment's `TEMPORAL_MARKER`.** The terminal game generated the tag and never showed it.
17. **A door's full appearance is on the door list**, under its name; the terminal game shows it only in a scan.
18. **The echo hunt and the tally are saved.** The terminal save forgets whether you took a reach's echo and resets the
    resonance counter to 0 on reload.
19. **Planets draw from nine cultures.** The terminal code could give a planet the abyssal culture (white frame); here
    the abyssal culture waits below the bedrock.
20. **A planet's second culture and era always differ from its first**; the terminal code retried ten times and could
    still end up with the same one.
21. **The map's legend is true.** It is built from the glyphs actually drawn; the `X` glitch marks appear as `X`, and
    the colours come from the stylesheet (the terminal game printed colour names as words in places). MAP at an
    elevator plots the floor's doors, where the terminal game plotted one node. The decorative universe and filament
    pane variants are not ported: every level draws the same local map.
22. **TRACE has no key.** The terminal `ll` is two letters; keys here are one. It is a button.
23. **`[CLEARED]` and `[n/total]` floor progress** in the lobby are not carried (they need every floor's sub-tree
    generated), nor are the session's `[NEW_SYNTHESIS]` labels; the status line names the hybrid instead.
24. **`stabilized` became `resonant`.** The terminal recap and telemetry counted resonant traces under the wrong name;
    the lines say what they count.
25. **HELP is a manual**, not one line, and it costs one like every command.
26. **The debug tools are behind `?debug`**, not a `glitch` command, and there is no BREACH tool — only INTEGRITY,
    PRIME and KEYSTONE.
27. **The drain runs on a Layer's own screens at ×4 under an entropic era** exactly as the guide says; below bedrock a
    scan costs 2, and never rolls the lottery.

## FAQ

**Why did the world change when I died?**
It did not change; it was rebuilt from the same seed. Everything is where it was, except that changes you made inside
it, like taking objects, are undone.

**Why does scanning cost Coherence?**
Every command costs one, because the drain happens once per tap before the command runs. Only answers on a screen the
game opened (the buffer, the recap, HELP) are free.

**Can I pick a seed?**
Not by typing one. RE-ROLL until you like the name, and the seed stays in this browser's save.

**I lost my save.**
It lived in the browser you played in. Another browser, a private window or a cleared site storage starts fresh. There
is no way to bring it back.

**What are the endings?**
END SESSION shows one of three: below bedrock, `[VOID_RESONANCE_TERMINATION]` and "Sleep among the static, Operator."
(this one wins); with twenty or more places visited, `[SESSION_RECAP_INITIALIZED]` with your final locus, steps,
footprints, buffer size and resonant traces, ending "Expedition successful."; with fewer, `[LINK_TERMINATION_PROTOCOL]`,
four shutdown steps and "Neural link severed." RESUME takes you back to the world for free.
<!-- src/engine/rules/Endings.ts:3-14, src/ui/screens/RecapPresenter.ts:45-67 -->

**Is there a bottom to the basement?**
Yes: Layer `-0xA`, where the pressure reads 100%.

**Do landmarks have better loot?**
No. Same objects as any other building. The name is the whole reward.

---

*Back to the [index]({{ "/" | relative_url }}) · The [cheat sheet]({{ "/web/cheat_sheet.html" | relative_url }}) ·
The [terminal game's guide]({{ "/terminal/guide/players_guide.html" | relative_url }}).*

</div>
