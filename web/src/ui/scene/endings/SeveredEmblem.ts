import type { EmblemInk } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** End of session: the link, and the cut in it. */
export class SeveredEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const y = size.height / 2;
    const cut = size.width / 2 + Math.sin(seconds * 0.8) * 10;
    this.#ink.line(
      painter,
      [
        { x: 10, y },
        { x: cut - 14, y },
      ],
      palette('frame'),
      2,
    );
    this.#ink.line(
      painter,
      [
        { x: cut + 14, y },
        { x: size.width - 10, y },
      ],
      palette('frame'),
      2,
      0.4,
    );
    this.#ink.dot(painter, { x: cut - 14, y }, 3, palette('wh'));
    this.#ink.dot(painter, { x: cut + 14, y }, 3, palette('dim'));
    for (let spark = 0; spark < 4; spark++) {
      this.#ink.dot(
        painter,
        { x: cut + (spark - 1.5) * 6, y: y + Math.sin(seconds * 5 + spark) * 6 },
        1,
        palette('rd'),
        0.8,
      );
    }
  }
}
