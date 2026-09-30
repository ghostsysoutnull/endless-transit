import type { AreaInk } from './AreaInk.ts';
import type { AreaMark } from './AreaMark.ts';
import type { AreaMoment } from './AreaScene.ts';
import type { Point } from './Point.ts';

/** A city in its country (U04): a cluster of lights. */
export class CityMark implements AreaMark {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint(
    moment: AreaMoment,
    at: Point,
    marked: { readonly lit: boolean; readonly sealed: boolean; readonly address: string },
  ): void {
    const { painter, palette, seconds } = moment;
    const ink = this.#ink;
    const fade = marked.sealed ? 0.4 : 1;
    const shine = marked.lit ? 1.35 : 1;
    ink.glow(painter, at, 12, palette('yl'), 0.3 * fade * shine);
    for (let light = 0; light < 6; light++) {
      const x = at.x + (ink.fraction(marked.address, 20 + light) - 0.5) * 12;
      const y = at.y + (ink.fraction(marked.address, 30 + light) - 0.5) * 10;
      painter.fillStyle = palette(light % 3 === 0 ? 'yl' : 'text');
      painter.globalAlpha = (0.55 + 0.3 * Math.sin(seconds * 2 + light)) * fade;
      painter.fillRect(x - 1.5, y - 1.5, 3, 3);
    }
    painter.globalAlpha = 1;
  }
}
