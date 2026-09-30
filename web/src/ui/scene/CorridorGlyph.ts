import type { AreaInk } from './AreaInk.ts';
import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** A corridor in perspective, its far door framed, a light flickering over it. */
export class CorridorGlyph implements PoleGlyph {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint({ painter, at, radius, seconds, ink, accent }: GlyphMoment): void {
    painter.strokeStyle = ink;
    painter.beginPath();
    for (const [x, y] of [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ] as const) {
      painter.moveTo(at.x + x * radius, at.y + y * radius);
      painter.lineTo(at.x + x * radius * 0.3, at.y + y * radius * 0.3);
    }
    painter.stroke();
    painter.strokeRect(at.x - radius * 0.3, at.y - radius * 0.3, radius * 0.6, radius * 0.6);
    if (Math.sin(seconds * 9) > -0.6)
      this.#ink.dot(painter, { x: at.x, y: at.y - radius * 0.8 }, radius * 0.12, accent);
  }
}
