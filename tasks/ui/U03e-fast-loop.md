# U03e fast loop — the room card's strip, sheet and telemetry

A fast loop (CLAUDE.md rule 15) on branch `ui/card-ear-right`, one save-point commit per kept look. Picks:

- The card's folded corner sits bottom right on both faces; the turn back replays the turn there.
- The strip: MORE, BUFFER, MAP, BACK or LEAVE, FORWARD — icons only, words for a reader. Over the plan the MAP key is
  ROOM with a zoom-in icon.
- MORE opens a second strip of the game's own keys (SCAN, LATTICE, HELP, TITLE, END) over the card's foot; GAME left
  the back; the lattice map's option is named LATTICE.
- The telemetry pane is an instrument block: plain heading, a band-tinted sync light, the spectrum drawn live, one
  readout, the void's voice as speech. The address line went (the rail has it).

## Shape table

| what | kind | owner | the one fact it owns | statics + why |
| :-- | :-- | :-- | :-- | :-- |
| `SpectrumPicture` | value object (a pure `Picture`) | `ui/canvas` | how the spectrogram's anchors and the frame's seed become a strip of bars at a phase | none |
| `SpectrumVM` | value object (data for the picture) | `ui/canvas` | what the spectrum is drawn from: anchors, the tallest, the frame's seed | none |
| `KeyWords`, `MapKey` (two faces) | value objects | `ui/scene` | the MAP key's words, one face per view mode | none |
| `ViewMode.keyWords` | method on an existing kind | `InRoom`, `OverPlan` | which face of the MAP key this mode shows | none |
