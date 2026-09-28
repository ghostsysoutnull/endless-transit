import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { DoorMark } from './DoorMark.ts';
import type { MarkedDoor } from './MarkedDoor.ts';
import type { Fractions } from './Fractions.ts';

const SPECKS = 40;

/** Frost (the mock's): specks of white rime over the door, each twinkling, placed by the door's own fractions. */
export class FrostMark implements DoorMark {
  readonly #noise: Fractions;

  constructor(noise: Fractions) {
    this.#noise = noise;
  }

  draw(painter: Painter, palette: Palette, door: MarkedDoor, seconds: number): void {
    const { quad, fog, key } = door;
    painter.fillStyle = palette('wh');
    for (let speck = 0; speck < SPECKS; speck++) {
      const glint = this.#noise.fraction(`frost/${key}`, speck * 3 + 2);
      painter.globalAlpha = (0.15 + 0.35 * glint * (0.6 + 0.4 * Math.sin(seconds * 2 + speck))) * fog;
      painter.fillRect(
        quad.left() + this.#noise.fraction(`frost/${key}`, speck * 3) * quad.width(),
        quad.top() + this.#noise.fraction(`frost/${key}`, speck * 3 + 1) * quad.height(),
        1.5,
        1.5,
      );
    }
  }
}
