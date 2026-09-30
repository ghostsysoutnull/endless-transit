import type { AreaInk } from './AreaInk.ts';
import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** The universe: rays turning round a bright core. */
export class UniverseGlyph implements PoleGlyph {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint({ painter, at, radius, seconds, ink }: GlyphMoment): void {
    painter.strokeStyle = ink;
    for (let ray = 0; ray < 8; ray++) {
      const angle = (ray * Math.PI) / 4 + seconds * 0.35;
      const reach = ray % 2 === 1 ? 0.55 : 1;
      painter.beginPath();
      painter.moveTo(at.x + Math.cos(angle) * radius * 0.28, at.y + Math.sin(angle) * radius * 0.28);
      painter.lineTo(at.x + Math.cos(angle) * radius * reach, at.y + Math.sin(angle) * radius * reach);
      painter.stroke();
    }
    this.#ink.dot(painter, at, radius * 0.2, ink);
  }
}
