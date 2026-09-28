import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { DoorMark } from './DoorMark.ts';
import type { MarkedDoor } from './MarkedDoor.ts';

const LINES = 14;

/** Static (the mock's): scan lines in the state's ink, rolling down the door at 90 px a second. */
export class StaticMark implements DoorMark {
  draw(painter: Painter, palette: Palette, door: MarkedDoor, seconds: number): void {
    const { quad, fog, ink } = door;
    painter.fillStyle = palette(ink);
    painter.globalAlpha = 0.25 * fog;
    const height = Math.max(1, quad.height());
    for (let line = 0; line < LINES; line++) {
      painter.fillRect(quad.left(), quad.top() + ((line * 17 + seconds * 90) % height), quad.width(), 1);
    }
  }
}
