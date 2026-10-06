import type { EmblemInk } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** The signal answered: rings go out from you, and one comes back. */
export class EchoEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const centre = { x: size.width / 2, y: size.height / 2 };
    const reach = Math.min(size.width, size.height) * 0.42;
    for (let ring = 0; ring < 3; ring++) {
      const out = (seconds * 0.35 + ring / 3) % 1;
      this.#ink.ring(painter, centre, reach * out, palette('frame'), 1.2, 0.7 * (1 - out));
    }
    const back = (seconds * 0.35) % 1;
    this.#ink.ring(painter, centre, reach * (1 - back), palette('yl'), 1.6, back * 0.9);
    this.#ink.dot(painter, centre, 3, palette('wh'));
    this.#ink.dot(
      painter,
      { x: centre.x + reach * 0.95, y: centre.y - reach * 0.5 },
      2.5,
      palette('yl'),
      0.6 + 0.4 * Math.sin(seconds * 6),
    );
  }
}
