import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { MarkedDoor } from './MarkedDoor.ts';

/**
 * How one look of a door's state moves on the door in the corridor (U02; the mock's frost, scan lines and cold glow,
 * `transit-reframed.html:849-852`), drawn inside the door's clip. One class a look, found by the look's key.
 */
export interface DoorMark {
  draw(painter: Painter, palette: Palette, door: MarkedDoor, seconds: number): void;
}
