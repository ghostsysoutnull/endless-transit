import type { AreaInk } from './AreaInk.ts';
import type { AreaMark } from './AreaMark.ts';
import type { AreaMoment } from './AreaScene.ts';
import type { Point } from './Point.ts';

/** A street in its city (U04): a lit lane, a light running along it. */
export class LaneMark implements AreaMark {
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
    painter.fillStyle = palette('yl');
    painter.globalAlpha = 0.16 * fade * shine;
    painter.fillRect(at.x - 17, at.y - 5, 34, 10);
    painter.strokeStyle = palette('yl');
    painter.globalAlpha = 0.7 * fade;
    painter.lineWidth = 2;
    painter.beginPath();
    painter.moveTo(at.x - 16, at.y);
    painter.lineTo(at.x + 16, at.y);
    painter.stroke();
    const run = ((seconds * 0.5 + ink.fraction(marked.address, 4)) % 1) * 32 - 16;
    painter.fillStyle = palette('wh');
    painter.globalAlpha = 0.9 * fade;
    painter.fillRect(at.x + run - 1.5, at.y - 1.5, 3, 3);
    painter.globalAlpha = 1;
  }
}
