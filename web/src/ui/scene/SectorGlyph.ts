import type { AreaInk } from './AreaInk.ts';
import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** A sector: three arms of stars turning round a warm core. */
export class SectorGlyph implements PoleGlyph {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint({ painter, at, radius, seconds, ink, accent }: GlyphMoment): void {
    for (let arm = 0; arm < 3; arm++) {
      for (let star = 1; star <= 5; star++) {
        const angle = arm * 2.094 + star * 0.55 + seconds * 0.5;
        const reach = (star / 5) * radius;
        this.#ink.dot(
          painter,
          { x: at.x + Math.cos(angle) * reach, y: at.y + Math.sin(angle) * reach * 0.6 },
          radius * (0.13 - star * 0.012),
          ink,
          1 - star * 0.12,
        );
      }
    }
    this.#ink.dot(painter, at, radius * 0.2, accent);
  }
}
