# Corridor keys fast loop — the room's strip of keys on the corridor

A fast loop (CLAUDE.md rule 15) of 2026-10-03 on branch `ui/corridor-keys`, twelve rounds, one save-point commit per
kept look, closed at the user's word under the Solo loop's step 4 and 5. Spec: the user's asks, round by round; it
began at the corridor and went on, on the user's word, to every level.

## Picks (what was kept)

- **The row of buttons** of the room's card stands on every drawn level: MORE, BUFFER, TRACE, the place's moves, the
  way out — icons, the words kept in the markup. It is fixed to the bottom edge of the screen and never scrolls with
  the page (the user's rule: never found by scrolling). MORE opens the game's own options over it.
- **The corridor**: ELEVATOR among its buttons, a car with two arrows.
- **The building and the elevator**: the floor number buttons are gone — the tower is the list; the picture runs from
  the name down to the row of buttons. The elevator has no UP or DOWN (the user's call): a floor is picked on the
  building's tower. Its way into the corridor is a wide button with its words under the picture (pick A of its round),
  not an icon in the row.
- **The breach** arrives as a wide red pulsing bar over the row, only while offered (pick C); the bedrock as the button
  and the Keystone doing it went to the concepts backlog (CONCEPT-003, CONCEPT-004).
- **The tower's picture**: no counts above and below; the floors take its whole height and the window scrolls onto the
  roof and the bedrock at the ends; the number strip is as wide as the longest label; a drag on the floors scrolls the
  page and the gauge alone moves the tower (pick A of its round: the page must be reachable from the picture).
- **The street** holds 4 to 22 buildings (the user's number), each in a slot that keeps its shape; a long row slides
  sideways under a finger and the page still scrolls up and down (pick A: sideways only).
- **The levels drawn as marks**: every mark is written by its name, never its number, broken over up to three lines
  and cut with an ellipsis only as the last resort.
- **A place's facts** (position, culture, era, trait, drift) stand under its name, above the picture, on as many lines
  as they need; its description is folded to its first line under the list. The room keeps both on its card's back.
- **Accessibility is not a concern for this game** (the user's rule, in `tasks/lessons/web.md`).

## Shape table

| what | kind | owner | the one fact it owns | statics + why |
| :-- | :-- | :-- | :-- | :-- |
| `KeyStripVM`, `KeyVM` (was `CardKeyVM`) | value objects (data for the view) | `ui/screens` | what a strip of keys holds: MORE, the lead and trail keys, the game's keys behind MORE | none |
| `KeyStrip` | interface | `ui/screens` (its users: `HudView`, `RoomCardView`) | what a screen asks of the strip: close it, draw its keys, draw its sheet | none |
| `KeyStripView` | service (a view part) | `ui/screens`, built in `main.ts` | the strip's markup and whether its MORE sheet lies open | none |
| `KeyStripParts` | interface | `ui/screens` | what a screen hands the strip: its middle slot, the lit mark, the repaint | none |
| `MovesInKeys` | value object (a `MovesPlace`) | `ui/screens`, built by `SceneDrawing` | by its id, where a move of a keyed place stands: a key, under the picture, the bar, or no button | none |
| `MovesLayout.keys` | field on an existing kind | `MovesPlace` members | the keyed place's moves, split as `moves`, `bar`, `unseen` | none |
| `HudVM.keys` (with its `bar`) | field on an existing kind | `HudPresenter` | the strip of a place that is no card, and the bar over it | none |
| `MoveVM` | value object (data for the view) | `ui/screens` | a move under the picture with its drawn icon | none |
| `Drawing.beside` | method on an existing kind | each `Drawing` member | whether the listed places stand in a list beside the picture (the tower: none) | none |
| `UP_MOVE`, `DOWN_MOVE`, `DESCEND_MOVE`, `CORRIDOR_MOVE`, `ELEVATOR_MOVE` and their `…_MOVE_ID`; `BREACH_ID` | constants | `engine/model/FloorMoves`, `engine/rules/GameOption` | the id of each of a floor's moves and of the breach, so a screen finds it by id | none |
| `MOVE_KEYS` | table (a constant) | `HudPresenter` | a move's short word and icon as a key, by option id | none |
| `PageScroll` | value (a union of three words) | `ui/canvas` | which way the page still scrolls under a finger on a picture | none |
| `SceneCamera.page` | method on an existing kind | `TravelCamera`, `StillCamera` | what its drag leaves the page: a sideways drag leaves up and down | none |
| `StreetPicture`'s row (`SLOT`, `NEAR`, `#row`) | constants and a method on an existing kind | `StreetPicture` | the least width a building's slot keeps, and how far the view slides along a longer row | none |
| `AreaNames` | service (pure) | `ui/scene`, handed to `AreaPicture` by `ScenePictures` | how the names under an area's marks share the room: up to three lines, then a cut, never a number | none |
| `NameLine` | value object | `ui/scene` | one line of a name as placed: its text and where it stands | none |

## As built

- **Gone with the loop**: the floor pad (`FloorPad`, `FloorsByTen`, `LayersTogether`, `Pads`, `PadGroup`, `HudVM.pad`,
  its markup and styles) and the tower's counts of floors out of view. The title's, the recap's and the reboot's
  buttons had been laid out by the pad's style rule of the same class name; that rule now stands with them, unchanged
  in effect.
- **The design check** (once, on the whole diff) found fifteen breaks, all fixed: a street that fits could come out
  sliding by a rounding error; a move under the picture could carry an icon the stylesheet had no picture for; where a
  keyed place's moves stand was decided in two classes; the bar stood beside the keys instead of in them; the row's
  height, the page's column and the ground colour stood as bare numbers; comments the loop made false; two parallel
  arrays into `AreaNames`; three test assertions that pinned too much or caught nothing.
- **Tests**: the presenter's (the keys of a corridor, an area and the tower; the bar; the rides on offer), `MovesInKeys`,
  `SceneDrawing` (where each picture puts its moves and its list), the tower's window and page scroll, the sliding
  street, `AreaNames`, the cameras' `page`; the in-game manual's words; the world's street range and one pin.
- **The in-game manual** no longer names GO UP and GO DOWN; its second heading reads THE BUTTONS BELOW.
- **Not settled here**: `web/CLAUDE.md` wall 3 still demands accessibility and lists the view controls without the
  description's fold; the elevator's up, down and descend are still moves of the engine, with no button.
