---
layout: terminal
title: CHEAT_SHEET
map_type: strategy
description: Endless Transit on one screen - every key, what things cost, and how not to die.
---

<div class="guide" markdown="1">

# Endless Transit on one screen

The short version of the [Player's Guide]({{ "/terminal/guide/players_guide.html" | relative_url }}). The guide owns
these facts; if the two ever disagree, the guide wins and this page has a bug.

## Start

`./run.sh` (with intro, from the repository's `terminal/` folder) or `./vinc.sh` (without). Add `--seed 4660` to play a known world. You start on a **street**.
Type a menu item's key and press Enter. Numbers work without the zero: `1` is `01`.

**Try it:** with `--seed 4660`, type `1`, `0`, `c`, `1`. You are in a room with 15 objects. Press `t`.

## Keys

| Anywhere | |
| :-- | :-- |
| `i` | Buffer (inventory). Inside: `m 1 2` merge, `d 1` **destroy**, `b` back. |
| `s` | Scan: doors and room types, nearby floors, or the apartment's rooms. |
| `m` | Map of what is below you. `ll` prints your whole path. |
| `sync` | Save. There is no autosave. |
| `p` | Screenshot to `screenshots/` (its header shows your seed). |
| `quit` or `q` | Confirms, offers to save, ends. |
| Enter alone | Repeat your last move. |

| Where | Keys |
| :-- | :-- |
| Street and above | numbers go down, `l` goes up |
| Lobby | type the **floor number** (`0` = ground floor) |
| Elevator | `u` up, `d` down, `c` corridor, `l` leave |
| Corridor | numbers open doors, `b` elevator, `l` leave |
| Room | `t` take or drop, `f` next room, `b` previous, `l` out |

In the `t` menu: `1`–`N` takes an object, `d1`–`dN` drops one of yours, `c` cancels.

## What things cost

* **Every Enter costs 1 Coherence**, whatever you typed: a move, a scan, a typo.
* It costs **2** if the street header says `ENTROPIC`, and **2** below a building's bedrock (**4** where both apply).
* **Only merging gives it back: +15 per merge**, capped at 100.
* At **0** the world is rebuilt from the same seed and you wake on the starting street at 100. You keep your buffer.
  You lose everything you changed in the world.

| Coherence | You see |
| :-- | :-- |
| 70 and up | green bar |
| 30 to 69 | yellow bar |
| under 40 | the room description starts corrupting |
| under 30 | red bar, static on the map |

<div class="tip" markdown="1">
**The one rule.** Always carry two items. Two items is one merge, and one merge is 15 Coherence. Never drop below 30
with an empty buffer.
</div>

## Finding things

* Objects live in **apartments**: 5 to 19 of them, spread over 1 to 10 rooms. They never restock.
* Every move inside an apartment is a 30% shot at a **Hidden Frequency** worth millions of hertz. Standing still
  rolls nothing.
* A room whose culture matches the `RESONANCE` on the street header gives +10%.
* The door list is free to read, but only **inscriptions** mean anything: `[DATA_VAULT]` is a Laboratory or
  Bio-Server, `!! DANGER !!` is a Security Station or Armory. Room types and traces show only in the scan (`s`).

<div class="warn" markdown="1">
**Never drop a Keystone, a hybrid or a Hidden Frequency.** A room remembers only an item's name. Those three come
back as ordinary junk.
</div>

## The long game

<details markdown="1">
<summary>Spoiler: how to break through a building's floor.</summary>

1. Pick a **small building**. The street list does not show floor counts; walk in and look at the lobby.
2. Take at least one object on **every floor**. Nothing on screen tracks this. Keep count.
3. **Merge seven times inside the building.**
4. **Merge an eighth time.** That merge makes the building's **Keystone**. You need at least nine items in all.
5. Ride to the **top floor** and press `j`.
6. Go to floor 0 and press `d`.

`sync` **before** the breach. A save made below the bedrock loads where you stood.

</details>

---

*The full [Player's Guide]({{ "/terminal/guide/players_guide.html" | relative_url }}) · [Installation]({{ "/terminal/manual/installation_guide.html" | relative_url }}) · [Index]({{ "/" | relative_url }})*

</div>
