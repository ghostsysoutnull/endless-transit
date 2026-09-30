import type { AreaInk } from './AreaInk.ts';
import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** The coast of a country, its capital's light breathing inside it. */
const COAST = [
  [-0.9, -0.3],
  [-0.4, -0.8],
  [0.3, -0.6],
  [0.9, -0.7],
  [0.8, 0.2],
  [0.3, 0.8],
  [-0.5, 0.6],
] as const;

/** A country: a coastline and its capital's light. */
export class CountryGlyph implements PoleGlyph {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint({ painter, at, radius, seconds, ink, accent }: GlyphMoment): void {
    painter.strokeStyle = ink;
    this.#ink.line(
      painter,
      COAST.map(([x, y]) => ({ x: at.x + x * radius, y: at.y + y * radius })),
    );
    painter.closePath();
    painter.stroke();
    this.#ink.dot(
      painter,
      { x: at.x + radius * 0.1, y: at.y },
      radius * 0.18,
      accent,
      0.5 + 0.5 * Math.sin(seconds * 3),
    );
  }
}
