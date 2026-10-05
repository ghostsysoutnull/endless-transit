import type { EmblemInk } from './EmblemInk.ts';
import { TAU } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** The void: a dark disc eating the static, the strata sinking into it. */
export class VoidEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const centre = { x: size.width / 2, y: size.height / 2 };
    const radius = Math.min(size.width, size.height) * 0.3;
    for (let index = 0; index < 160; index++) {
      const angle = (index * 2.399) % TAU;
      const away = radius * 1.1 + ((index * 37 + seconds * 40) % (radius * 1.4));
      this.#ink.dot(
        painter,
        { x: centre.x + Math.cos(angle) * away, y: centre.y + Math.sin(angle) * away * 0.7 },
        1,
        index % 7 === 0 ? palette('rd') : palette('dim'),
        0.8 - (away - radius) / (radius * 2),
      );
    }
    for (let band = 0; band < 5; band++) {
      const y = centre.y + radius * 1.5 + band * 14 - ((seconds * 10) % 14);
      this.#ink.line(
        painter,
        [
          { x: centre.x - radius * 1.6, y },
          { x: centre.x + radius * 1.6, y },
        ],
        palette('frame'),
        1,
        0.25 + band * 0.1,
      );
    }
    this.#ink.dot(painter, centre, radius, palette('ground'));
    this.#ink.ring(painter, centre, radius, palette('frame'), 2);
    const spread = (seconds * 0.5) % 1;
    this.#ink.ring(painter, centre, radius * (1 + spread * 0.6), palette('rd'), 1, 1 - spread);
  }
}
