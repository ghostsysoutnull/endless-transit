# U03e fast loop — the room card's strip, sheet and telemetry; the buffer; the relic take

A fast loop (CLAUDE.md rule 15) of 2026-10-02 on branch `ui/card-ear-right`, fourteen rounds, one save-point commit
per kept look, closed at the user's approval under the Solo loop's step 4 and 5. Spec: the user's asks, round by round.

## Picks (what was kept)

- **The card's corner** sits bottom right on both faces; the peel sweeps from it both ways. The turn back to the
  picture replays the turn that took the card to its words.
- **The strip**: MORE, BUFFER, MAP, TRACE, BACK or LEAVE, FORWARD — icons only, the words kept for a reader. FORWARD is
  the engine's forward move, shown where the room offers it (absent in the last room, pick A of its round). Over the
  plan the MAP key is ROOM with a zoom-in icon (pick A: the word changes, not only the icon).
- **MORE**, first in the strip, opens a second strip of the game's own keys over the card's foot — SCAN, LATTICE, HELP,
  then TITLE and END a little apart — each an icon with its word; a tap on the veil, on MORE or a step closes it. GAME
  left the back; the echo moves stay under WAYS (pick A: moves of the room stay on the back). The lattice map's option
  is named LATTICE so MAP means the plan alone.
- **The telemetry pane** (shared by the floor and corridor screens) is an instrument block: TELEMETRY, a sync light
  tinted by the coherence band beside NOMINAL or PRESSURE HIGH, the spectrogram, one readout (Resonant traces), the
  void's voice as speech. The address line went (the rail has it). The user declined retiring the pane (option A of
  that round) and chose the block (B, then its A).
- **The spectrogram** is a live scope drawn by the canvas: the engine's five anchors are a low breathing floor filled
  in from the frame's seed; the room's objects stand as peaks by their frequency on a log axis (one hertz to ten
  million), resonant ones tall, capped in white and haloed; the apartment's anomaly makes it shiver, tear and flicker.
  Bloom, a reflection under the baseline, a sweep with a trail, decade ticks. The clock only paces; the seed decides.
- **A travelling key tapped on the back** turns the card to its picture first, then rides — the bug met on the phone
  (the ride played on the hidden face).
- **A taken relic** raises a ticket with its full name where it lay, holds, then flies to the Buffer key; in place
  under reduced motion.
- **The buffer screen** is tiles: the tile is its pick (select, merge, unselect), the drop a tray key in its corner in a
  room, chips for the counts, BACK the way out; a merged hybrid's tile flashes yellow, beats twice and is the spot the
  shell scrolls to and focuses.

## Shape table

| what | kind | owner | the one fact it owns | statics + why |
| :-- | :-- | :-- | :-- | :-- |
| `SpectrumPicture` | value object (a pure `Picture`) | `ui/canvas` | how the spectrogram's anchors, peaks, glitch and the frame's seed become a scope at a phase | none |
| `SpectrumVM` | value object (data for the picture) | `ui/canvas` | what the spectrum is drawn from | none |
| `SpectralPeak` (in `TelemetrySummary`) | value object | `engine/rules/Telemetry` | where an object's frequency sits on the axis, and whether it resonates | none |
| `Location.glitched()` | method on an existing kind | `Location`, `Room` | whether an anomaly glitches every reading taken here | none |
| `KeyWords`, `MapKey` (two faces) | value objects | `ui/scene` | the MAP key's words, one face per view mode | none |
| `ViewMode.keyWords` | method on an existing kind | `InRoom`, `OverPlan` | which face of the MAP key this mode shows | none |
| `RoomCard.reveal` | method on an existing kind | `RoomCardView` | the picture is shown before what must be seen on it | none |
| `Curtain` | type (a function) | `ui/scene` | what a scene draws aside before a ride, handed in by the screen; the card answers it | none |
| `FORWARD_MOVE`, `SCAN_ID`, `LATTICE_ID`, `TO_TITLE_ID` | constants | `engine/model/ForwardMove`, `engine/rules/GameOption` | each option id's one owner, so a screen finds it by id | none |
| `GAME_KEYS` | table (a constant) | `HudPresenter` | the MORE sheet's short word and icon by option id | none |

## As built

Tests: the presenters' and the engine's unit tests brought to the new words and shapes; new `SpectrumPicture`,
`MapKeyFaces`; the browser tests of the card (five keys in the first room, the MAP key's two names, MORE, the turn
before the ride), the buffer (tiles, the fresh hybrid), the telemetry's words and the relic's ticket. The goldens
rewritten and read: the dock's LATTICE, the telemetry's plain line, the card's FORWARD key, the game keys' words.
The design check found eight breaks, all fixed (two owners for the axis's top, the decades, BACK, Resonant and the
sync's shape; a pick that also remembered; a turn kept across rooms; a seed share dealt outside `Seed`). The browser
suite found one regression of the loop: a take from the card's back turned the card, since every pick the scene led
went through the card's reveal — the scene now asks the card only before a ride (`Curtain`).
