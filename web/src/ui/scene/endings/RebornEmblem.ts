import type { Point } from '#ui/scene/Point.ts';
import type { EmblemInk } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** Reborn: the flat line, then the pulse again. */
export class RebornEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const y = size.height / 2;
    const span = size.width - 20;
    const head = 10 + span * ((seconds * 0.6) % 1);
    const points: Point[] = [];
    for (let x = 10; x <= head; x += 2) {
      const along = (x - 10) / span;
      let lift = 0;
      if (along > 0.55) {
        const beat = (along - 0.55) % 0.22;
        lift = beat < 0.04 ? beat * 900 : beat < 0.08 ? (0.08 - beat) * 900 : 0;
      }
      points.push({ x, y: y - lift });
    }
    this.#ink.line(
      painter,
      [
        { x: 10, y },
        { x: size.width - 10, y },
      ],
      palette('dim'),
      1,
      0.3,
    );
    this.#ink.line(painter, points, palette('gn'), 1.8);
    const last = points[points.length - 1];
    if (last !== undefined) this.#ink.dot(painter, last, 3, palette('wh'));
  }
}
