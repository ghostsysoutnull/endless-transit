import type { EmblemInk } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** Pacing: a corridor, and the steps going back and forth along it. */
export class PacingEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const { width, height } = size;
    const centre = { x: width / 2, y: height / 2 };
    const far = Math.min(width, height) * 0.12;
    const dim = palette('dim');
    this.#ink.line(painter, [{ x: 10, y: height - 10 }, { x: centre.x - far, y: centre.y + far }], dim);
    this.#ink.line(painter, [{ x: width - 10, y: height - 10 }, { x: centre.x + far, y: centre.y + far }], dim);
    this.#ink.line(painter, [{ x: 10, y: 10 }, { x: centre.x - far, y: centre.y - far }], dim);
    this.#ink.line(painter, [{ x: width - 10, y: 10 }, { x: centre.x + far, y: centre.y - far }], dim);
    painter.strokeStyle = dim;
    painter.lineWidth = 1;
    painter.strokeRect(centre.x - far, centre.y - far, far * 2, far * 2);
    for (let step = 0; step < 8; step++) {
      const along = (Math.sin(seconds * 1.2 + step * 0.35) + 1) / 2;
      const y = height - 14 - along * (height - 28 - far * 2) * 0.9;
      const x = centre.x + (step % 2 === 1 ? 8 : -8) * (1 - along * 0.6);
      this.#ink.dot(painter, { x, y }, 2.5 - along * 1.5, palette('yl'), 0.9 - step * 0.1);
    }
  }
}
