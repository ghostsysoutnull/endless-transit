import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { Fractions } from './Fractions.ts';
import type { HallReach } from './HallReach.ts';
import type { HallShape } from './HallShape.ts';
import type { Point } from './Point.ts';
import type { Quad } from './Quad.ts';

/** How many specks of static fill the hall's end, and how often they are dealt again (a new field this many times a second). */
const SPECKS = 90;
const RATE = 12;

/**
 * A corridor whose far end dissolves into static (designed for U02; the mock has none): straight, and where a wall
 * would stand, a field of magenta specks that never holds still. On the slider, a few specks. The specks come from
 * the scene's hash, never the clock's randomness.
 */
export class StaticHall implements HallShape {
  readonly #noise: Fractions;
  readonly #reach: HallReach;

  constructor(noise: Fractions, reach: HallReach) {
    this.#noise = noise;
    this.#reach = reach;
  }

  bend(): number {
    return 0;
  }

  reach(ahead: number, sight: number): number {
    return this.#reach.of(ahead, sight);
  }

  end(painter: Painter, palette: Palette, face: Quad, fog: number, seconds: number): void {
    const field = `static/${String(Math.floor(seconds * RATE))}`;
    painter.fillStyle = palette('mg');
    for (let speck = 0; speck < SPECKS; speck++) {
      painter.globalAlpha = (0.25 + 0.6 * this.#noise.fraction(field, speck * 3 + 2)) * fog;
      painter.fillRect(
        face.left() + this.#noise.fraction(field, speck * 3) * face.width(),
        face.top() + this.#noise.fraction(field, speck * 3 + 1) * face.height(),
        2,
        2,
      );
    }
  }

  mark(painter: Painter, palette: Palette, point: Point): void {
    painter.fillStyle = palette('mg');
    painter.globalAlpha = 0.9;
    for (let speck = 0; speck < 7; speck++) {
      painter.fillRect(
        point.x - 10 + this.#noise.fraction('static-mark', speck * 2) * 20,
        point.y - 8 + this.#noise.fraction('static-mark', speck * 2 + 1) * 16,
        2,
        2,
      );
    }
  }
}
