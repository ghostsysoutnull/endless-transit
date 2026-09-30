import type { AreaInk } from './AreaInk.ts';
import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** A null reach: a dark pocket, a ring of signal widening out of it, a few faint stars. */
export class ReachGlyph implements PoleGlyph {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint({ painter, at, radius, seconds, ink }: GlyphMoment): void {
    painter.strokeStyle = ink;
    painter.beginPath();
    painter.arc(at.x, at.y, radius * 0.45, 0, Math.PI * 2);
    painter.stroke();
    const spread = (seconds * 0.5) % 1;
    painter.globalAlpha = 1 - spread;
    painter.beginPath();
    painter.arc(at.x, at.y, radius * (0.5 + spread * 0.5), 0, Math.PI * 2);
    painter.stroke();
    painter.globalAlpha = 1;
    for (let star = 0; star < 3; star++) {
      const angle = star * 2.3 + 0.6;
      this.#ink.dot(
        painter,
        { x: at.x + Math.cos(angle) * radius * 0.85, y: at.y + Math.sin(angle) * radius * 0.85 },
        radius * 0.07,
        ink,
        0.6,
      );
    }
  }
}
