import type { EmblemInk } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** Expedition complete: the long line down, a mark a level, all of them lit, the pulse running to the last. */
export class ExpeditionEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const x = size.width / 2;
    const levels = 12;
    const top = 14;
    const bottom = size.height - 14;
    const step = (bottom - top) / (levels - 1);
    this.#ink.line(painter, [{ x, y: top }, { x, y: bottom }], palette('frame'), 1.5, 0.6);
    // The pulse: short dashes running down, by hand (the painter has no dash offset).
    const pitch = 17;
    const offset = (seconds * 40) % pitch;
    for (let y = top + offset; y < bottom; y += pitch) {
      this.#ink.line(painter, [{ x, y }, { x, y: Math.min(bottom, y + 3) }], palette('wh'), 2, 0.8);
    }
    for (let level = 0; level < levels; level++) {
      const at = { x, y: top + level * step };
      this.#ink.dot(painter, at, 3, palette('ground'));
      this.#ink.ring(painter, at, 4, level === levels - 1 ? palette('yl') : palette('frame'), 1.4);
    }
    const spread = (seconds * 0.6) % 1;
    this.#ink.ring(painter, { x, y: bottom }, 8 + 6 * spread, palette('yl'), 1, 1 - spread);
  }
}
