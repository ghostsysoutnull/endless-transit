import type { AreaInk } from './AreaInk.ts';
import type { AreaMark } from './AreaMark.ts';
import type { AreaMoment } from './AreaScene.ts';
import type { Point } from './Point.ts';

/** A planet on its orbit (U04): a small world in its own hue, a thin ring round it. */
export class GlobeMark implements AreaMark {
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
    const hues = ['bl', 'gn', 'ab', 'mg', 'cy'];
    const hue = hues[Math.floor(ink.fraction(marked.address, 3) * hues.length)] ?? 'bl';
    ink.glow(painter, at, 11, palette(hue), 0.35 * fade * shine);
    painter.fillStyle = palette(hue);
    painter.globalAlpha = 0.9 * fade;
    painter.beginPath();
    painter.arc(at.x, at.y, 5.5, 0, Math.PI * 2);
    painter.fill();
    painter.strokeStyle = palette('text');
    painter.globalAlpha = 0.35 * fade;
    painter.lineWidth = 1;
    ink.line(painter, ink.ellipse(at, 9, 3, -0.4, 24));
    painter.stroke();
    painter.globalAlpha = 1;
  }
}
