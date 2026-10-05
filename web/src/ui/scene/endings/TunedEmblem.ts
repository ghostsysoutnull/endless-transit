import type { EmblemInk } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** In tune: three waves in step, and the glow where they agree. */
export class TunedEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const y = size.height / 2;
    const centre = { x: size.width / 2, y };
    // The glow: rings from wide and faint to small and bright, squashed into a band by their spacing.
    for (let ring = 0; ring < 6; ring++) {
      this.#ink.dot(painter, centre, size.width * 0.3 * (1 - ring / 7), palette('yl'), 0.04);
    }
    const inks = [palette('frame'), palette('yl'), palette('wh')];
    inks.forEach((ink, index) => {
      this.#ink.wave(
        painter,
        { from: 10, to: size.width - 10, y: y + (index - 1) * 18 },
        { amplitude: 12, frequency: 0.11, phase: seconds * 2.8 },
        ink,
        1.6,
        0.9,
      );
    });
  }
}
