import type { AreaInk } from './AreaInk.ts';
import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** A solar system: a sun, and a planet going round it on its orbit. */
export class SystemGlyph implements PoleGlyph {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint({ painter, at, radius, seconds, ink, accent }: GlyphMoment): void {
    painter.strokeStyle = ink;
    painter.globalAlpha = 0.45;
    this.#ink.line(painter, this.#ink.ellipse(at, radius, radius * 0.45));
    painter.stroke();
    painter.globalAlpha = 1;
    this.#ink.dot(painter, at, radius * 0.26, accent);
    const angle = seconds * 1.1;
    this.#ink.dot(
      painter,
      { x: at.x + Math.cos(angle) * radius, y: at.y + Math.sin(angle) * radius * 0.45 },
      radius * 0.16,
      ink,
    );
  }
}
