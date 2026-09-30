import type { AreaInk } from './AreaInk.ts';
import type { AreaMark } from './AreaMark.ts';
import type { AreaMoment } from './AreaScene.ts';
import type { Point } from './Point.ts';

/** A solar system in its sector or reach (U04): a star, warm glow round a white point. */
export class StarMark implements AreaMark {
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
    ink.glow(painter, at, 12, palette('yl'), 0.5 * fade * shine);
    painter.fillStyle = palette('wh');
    painter.globalAlpha = fade;
    painter.beginPath();
    painter.arc(
      at.x,
      at.y,
      2.8 + 0.4 * Math.sin(seconds * 1.3 + ink.fraction(marked.address, 2) * 6),
      0,
      Math.PI * 2,
    );
    painter.fill();
    painter.globalAlpha = 1;
  }
}
