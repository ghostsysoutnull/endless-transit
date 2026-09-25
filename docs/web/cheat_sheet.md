---
layout: terminal
title: WEB_CHEAT_SHEET
map_type: strategy
description: Endless Transit in the browser on one screen - every button, what things cost, and how not to die.
---

<div class="guide" markdown="1">

# Endless Transit on the web, on one screen

The short version of the [web Player's Guide]({{ "/web/players_guide.html" | relative_url }}). The guide owns these
facts; if the two ever disagree, the guide wins and this page has a bug.

## Start

Open [**the game**]({{ "/play/" | relative_url }}) on a phone or a desktop. **NEW WORLD** draws a seed, **RE-ROLL**
draws another, **ENTER WORLD** starts you on a **street** with 100 Coherence. Every action is a button; on a desktop the
letter on a button is its key. The game saves itself after every tap, in this browser only; a reload continues.

**Try it:** tap a building, then `00 TRANSIT_LOBBY`, **ENTER CORRIDOR**, the first door. Tap an object.

## Buttons

| Moving | |
| :-- | :-- |
| A listed place | enters it (a floor's key is its number: `0` is the lobby) |
| `▲ LEAVE …` | up one level (from a corridor: to the building, skipping the elevator) |
| Elevator | **GO UP**, **GO DOWN**, **ENTER CORRIDOR** |
| Corridor | doors, **BACK TO ELEVATOR** |
| Room | an object takes it; **GO FORWARD**, **GO BACK**; **EXIT APARTMENT** in the first room only |
| Null Reach | **SCAN FOR SPECTRAL ECHOES** until 100, then **CAPTURE SPECTRAL ECHO** |

| The dock (a phone keeps `▲ LEAVE` and **MORE** under your thumb) | |
| :-- | :-- |
| **SCAN** | doors and room types, nearby floors, or the apartment's rooms |
| **MAP** | what is below you, drawn; dim is unvisited |
| **BUFFER** | inventory: **SELECT** one, **SELECT** another = merge; **DROP HERE** lays it in the room; **▲ BACK TO REALITY** |
| **TRACE** | your whole path, drawn |
| **HELP** | the manual, inside the game |
| **TITLE SCREEN** · **END SESSION** | the title (the world waits behind **CONTINUE**) · the recap (**RESUME** comes back) |

The depth rail under the HUD is your path, one glyph for each level; the one you stand in is ringed.

## What things cost

* **Every move, take and dock button costs 1 Coherence** before it acts. Answers on a screen the game opened (the
  buffer, the recap, HELP) are free. A tap on something no longer offered costs nothing.
* It costs **2** if the street header says `ENTROPIC`, and **2** below a building's bedrock (**4** where both apply).
* **Only merging gives it back: +15 per merge**, capped at 100.
* At **0** the tap never runs: **REBUILD** rebuilds the world from the same seed and you wake on the starting street at
  100. You keep your buffer, your steps and your visited places. You lose everything you changed in the world.

| Coherence | You see |
| :-- | :-- |
| 70 and up | green bar |
| 30 to 69 | yellow bar |
| under 40 | the place's description starts corrupting |
| under 30 | red bar, `X` marks on the map |

<div class="tip" markdown="1">
**The one rule.** Always carry two fragments. Two fragments is one merge, and one merge is 15 Coherence. Never drop
below 30 with an empty buffer.
</div>

## Finding things

* Objects live in **apartments**: 5 to 19 of them, spread over 1 to 10 rooms. They never restock.
* Every step inside an apartment is a 30% shot at a **Hidden Frequency** worth millions of hertz. Dock buttons roll
  nothing.
* A room whose culture matches the street's `RESONANCE` gives +10% and a `[RESONANT]` badge when the hertz divide by 11.
* The door list is free to read, but only **inscriptions** mean anything: `[DATA_VAULT]` is a Laboratory or Bio-Server,
  `!! DANGER !!` is a Security Station or Armory. Room types and traces show only in the scan.
* The buffer holds **16**. Full means the tiles stop being buttons: merge or drop.
* **Drop freely.** A dropped fragment lies in the room exactly as it was and comes back the same — Keystones and hybrids
  too.

## The long game

<details markdown="1">
<summary>Spoiler: how to break through a building's floor.</summary>

1. Pick a **small building**. The street list does not show floor counts; walk in and look at the lobby.
2. Take at least one object on **every floor**. Nothing on screen tracks this. Keep count.
3. **Merge seven times inside the building.**
4. **Merge an eighth time.** That merge makes the building's **Keystone**. You need at least nine fragments in all.
5. Ride to the **top floor** and tap **BREACH THE BEDROCK**.
6. Go to floor 0 and tap **DESCEND INTO THE SUBSTRATE**. Ten Layers wait; Coherence is Integrity down there and drains
   twice as fast.

Dying resets the ritual and the breach; the Keystone survives in your buffer. `?debug` on the address gives you
**PRIME BUILDING** and **SPAWN KEYSTONE** to skip the work.

</details>

---

*The full [web Player's Guide]({{ "/web/players_guide.html" | relative_url }}) · [Play]({{ "/play/" | relative_url }}) · [Index]({{ "/" | relative_url }})*

</div>
