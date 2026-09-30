import type { AreaInk } from './AreaInk.ts';
import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** Three towers: where each stands and how tall, in radii. */
const TOWERS = [
  [-0.8, 0.3],
  [-0.25, 0.9],
  [0.35, 0.55],
] as const;

/** A city: three towers, their windows lit and dark by turns. */
export class CityGlyph implements PoleGlyph {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint({ painter, at, radius, seconds, ink, accent }: GlyphMoment): void {
    painter.strokeStyle = ink;
    TOWERS.forEach(([left, tall], tower) => {
      const height = tall * radius * 1.6;
      painter.strokeRect(at.x + left * radius, at.y + radius * 0.8 - height, radius * 0.45, height);
      for (let window = 0; window < 3; window++) {
        if (Math.sin(seconds * 2 + tower * 3 + window * 1.7) > 0)
          this.#ink.dot(
            painter,
            { x: at.x + (left + 0.22) * radius, y: at.y + radius * 0.55 - window * radius * 0.42 },
            radius * 0.07,
            accent,
          );
      }
    });
  }
}
