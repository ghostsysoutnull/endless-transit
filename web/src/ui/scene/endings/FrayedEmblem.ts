import type { Point } from '#ui/scene/Point.ts';
import type { EmblemInk } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** Frayed: one thread coming apart into strands. */
export class FrayedEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const y = size.height / 2;
    const split = size.width * 0.45;
    this.#ink.line(painter, [{ x: 10, y }, { x: split, y }], palette('frame'), 2);
    for (let strand = 0; strand < 6; strand++) {
      const points: Point[] = [];
      for (let x = split; x <= size.width - 10; x += 4) {
        const out = (x - split) / (size.width * 0.55);
        points.push({
          x,
          y:
            y +
            Math.sin(x * 0.07 + strand * 1.3 + seconds * (2 + strand)) * out * (6 + strand * 7) +
            (strand - 2.5) * out * 9,
        });
      }
      this.#ink.line(painter, points, strand % 2 === 1 ? palette('rd') : palette('frame'), 1, 0.9 - strand * 0.1);
    }
  }
}
