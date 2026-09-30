import type { AreaInk } from './AreaInk.ts';
import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';
import type { Point } from './Point.ts';

/** A filament: a strand that waves, beads of light running along it. */
export class FilamentGlyph implements PoleGlyph {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint({ painter, at, radius, seconds, ink }: GlyphMoment): void {
    const along = (u: number): Point => ({
      x: at.x + u * radius,
      y: at.y + Math.sin(u * 3 + seconds * 1.6) * radius * 0.35,
    });
    painter.strokeStyle = ink;
    this.#ink.line(
      painter,
      Array.from({ length: 21 }, (_, step) => along(step / 10 - 1)),
    );
    painter.stroke();
    for (let bead = 0; bead < 3; bead++) {
      this.#ink.dot(painter, along(((seconds * 0.35 + bead / 3) % 1) * 2 - 1), radius * 0.15, ink);
    }
  }
}
