import type { AreaInk } from './AreaInk.ts';
import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** A floor seen whole, someone walking its length. */
export class FloorGlyph implements PoleGlyph {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint({ painter, at, radius, seconds, ink, accent }: GlyphMoment): void {
    painter.strokeStyle = ink;
    painter.strokeRect(at.x - radius, at.y - radius * 0.55, radius * 2, radius * 1.1);
    painter.beginPath();
    painter.moveTo(at.x - radius, at.y);
    painter.lineTo(at.x + radius, at.y);
    painter.stroke();
    const along = ((seconds * 0.5) % 1) * 2 - 1;
    this.#ink.dot(painter, { x: at.x + along * radius * 0.9, y: at.y }, radius * 0.13, accent);
  }
}
