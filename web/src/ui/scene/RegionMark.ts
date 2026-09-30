import type { AreaInk } from './AreaInk.ts';
import type { AreaMark } from './AreaMark.ts';
import type { AreaMoment } from './AreaScene.ts';
import type { Point } from './Point.ts';

/** A country on its planet's face (U04): a small region, its border lit. */
export class RegionMark implements AreaMark {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint(
    moment: AreaMoment,
    at: Point,
    marked: { readonly lit: boolean; readonly sealed: boolean; readonly address: string },
  ): void {
    const { painter, palette } = moment;
    const ink = this.#ink;
    const fade = marked.sealed ? 0.4 : 1;
    const shine = marked.lit ? 1.35 : 1;
    const points: Point[] = [];
    for (let step = 0; step < 9; step++) {
      const angle = (step / 9) * Math.PI * 2;
      const reach = 8 + ink.fraction(marked.address, 10 + step) * 5;
      points.push({ x: at.x + Math.cos(angle) * reach, y: at.y + Math.sin(angle) * reach * 0.8 });
    }
    painter.fillStyle = palette('bc');
    painter.globalAlpha = 0.22 * fade * shine;
    ink.line(painter, points);
    painter.closePath();
    painter.fill();
    painter.strokeStyle = palette('bc');
    painter.globalAlpha = 0.75 * fade;
    painter.lineWidth = 1.2;
    painter.stroke();
    painter.globalAlpha = 1;
  }
}
