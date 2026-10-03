# Corridor keys fast loop — the room's strip of keys on the corridor

A fast loop (CLAUDE.md rule 15) on branch `ui/corridor-keys`. Spec: the user's pick (A): the corridor gets the room
card's strip of icon keys in place of its word buttons; the door list, the slider, the telemetry and every other screen
stay as they are.

## Shape table

| what | kind | owner | the one fact it owns | statics + why |
| :-- | :-- | :-- | :-- | :-- |
| `KeyStripVM` | value object (data for the view) | `ui/screens` | what a strip of keys holds: MORE, the lead and trail keys, the game's keys behind MORE | none |
| `KeyStrip` | interface | `ui/screens` (its users: `HudView`, `RoomCardView`) | what a screen asks of the strip: close it, draw its keys, draw its sheet | none |
| `KeyStripView` | service (a view part) | `ui/screens` | the strip's markup and whether its MORE sheet lies open | none |
| `KeyStripParts` | interface | `ui/screens` | what a screen hands the strip: its middle slot, the lit mark, the repaint | none |
| `MovesInKeys` | value object (a `MovesPlace`) | `ui/screens` | a place whose moves stand among the keys at the screen's foot | none |
| `MovesLayout.keys` | field on an existing kind | `MovesPlace` members | whether the moves are keys | none |
| `HudVM.keys` | field on an existing kind | `HudPresenter` | the strip of a place that is no card | none |
| `UP_MOVE`, `DOWN_MOVE`, `DESCEND_MOVE`, `CORRIDOR_MOVE`, `ELEVATOR_MOVE` and their `…_MOVE_ID` | constants | `engine/model/FloorMoves`, `engine/rules/GameOption` | the id of each of a floor's moves, so a screen finds it by id | none |
| `BREACH_ID` | constant | `engine/rules/GameOption` | the breach command's option id | none |
| `RIDES`, `BARRED` | tables (constants) | `HudPresenter` | which moves have no button where the keys stand, and which arrive as the bar | none |
| `HudVM.bar` | field on an existing kind | `HudPresenter` | the moves shown as a bar over the keys | none |
| `MOVE_KEYS` | table (a constant) | `HudPresenter` | a move's short word and icon as a key, by option id | none |
