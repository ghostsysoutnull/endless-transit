import type { EmblemInk } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** Something new carried out: two waves run together and leave as one. */
export class HybridEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const y = size.height / 2;
    const middle = size.width * 0.5;
    this.#ink.wave(painter, { from: 10, to: middle, y: y - 22 }, { amplitude: 10, frequency: 0.12, phase: seconds * 3 }, palette('frame'));
    this.#ink.wave(painter, { from: 10, to: middle, y: y + 22 }, { amplitude: 10, frequency: 0.19, phase: -seconds * 2.2 }, palette('mg'));
    const meet = { x: middle + 18, y };
    this.#ink.line(painter, [{ x: middle, y: y - 22 }, meet], palette('frame'), 1, 0.6);
    this.#ink.line(painter, [{ x: middle, y: y + 22 }, meet], palette('mg'), 1, 0.6);
    this.#ink.wave(painter, { from: meet.x, to: size.width - 10, y }, { amplitude: 14, frequency: 0.15, phase: seconds * 2.6 }, palette('yl'), 2);
    this.#ink.dot(painter, meet, 3, palette('wh'));
  }
}
