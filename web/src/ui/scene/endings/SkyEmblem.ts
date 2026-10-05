import type { EmblemInk } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** Never left the sky: stars, a planet far below, and you still up here. */
export class SkyEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const { width, height } = size;
    for (let star = 0; star < 70; star++) {
      this.#ink.dot(
        painter,
        { x: (star * 53) % width, y: (star * 29) % (height * 0.7) },
        1,
        palette('wh'),
        0.3 + 0.5 * Math.abs(Math.sin(seconds * 1.3 + star)),
      );
    }
    const planet = { x: width / 2, y: height + 40 };
    this.#ink.dot(painter, planet, 70, palette('ground'));
    this.#ink.ring(painter, planet, 70, palette('frame'), 1.5, 0.7);
    this.#ink.ring(painter, planet, 84, palette('dim'), 1, 0.5);
    const you = { x: width / 2, y: height * 0.25 };
    this.#ink.ring(painter, you, 5, palette('yl'), 1.6);
    this.#ink.line(
      painter,
      [
        { x: you.x, y: you.y + 5 },
        { x: you.x, y: you.y + 22 + 6 * Math.sin(seconds * 2) },
      ],
      palette('yl'),
      1.2,
      0.6,
    );
  }
}
