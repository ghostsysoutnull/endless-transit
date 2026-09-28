import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { Fractions } from './Fractions.ts';
import type { HallShape } from './HallShape.ts';
import type { HallView } from './HallView.ts';

/** How many specks of static fill the hall's end, and how fast they are dealt again (a new field this many times a second). */
const SPECKS = 90;
const RATE = 12;

/**
 * A corridor whose far end dissolves into static (designed for U02; the mock has none): straight, and where a wall
 * would stand, a field of magenta specks that never holds still. On the slider, a few specks. The specks come from
 * the scene's hash, never the clock's randomness.
 */
export class StaticHall implements HallShape {
  readonly #noise: Fractions;

  constructor(noise: Fractions) {
    this.#noise = noise;
  }

  bend(): number {
    return 0;
  }

  reach(ahead: number, sight: number): number {
    return Math.min(ahead, sight);
  }

  end(painter: Painter, palette: Palette, hall: HallView, seconds: number): void {
    if (!hall.endInSight()) return;
    const z = hall.endAhead();
    const low = hall.project(-1, hall.floor(), z);
    const high = hall.project(1, hall.ceiling(), z);
    const width = high.x - low.x;
    const height = low.y - high.y;
    const field = `static/${String(Math.floor(seconds * RATE))}`;
    painter.fillStyle = palette('mg');
    for (let speck = 0; speck < SPECKS; speck++) {
      painter.globalAlpha = (0.25 + 0.6 * this.#noise.fraction(field, speck * 3 + 2)) * hall.fog(z);
      painter.fillRect(
        low.x + this.#noise.fraction(field, speck * 3) * width,
        high.y + this.#noise.fraction(field, speck * 3 + 1) * height,
        2,
        2,
      );
    }
  }

  mark(painter: Painter, palette: Palette, point: { readonly x: number; readonly y: number }): void {
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
