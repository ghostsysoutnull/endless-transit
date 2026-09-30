import type { AreaMark } from './AreaMark.ts';
import type { AreaMoment } from './AreaScene.ts';
import type { Point } from './Point.ts';

/** A null reach on its filament (U04): a dark ring, a hollow in the thread. */
export class VoidMark implements AreaMark {
  paint(
    moment: AreaMoment,
    at: Point,
    marked: { readonly lit: boolean; readonly sealed: boolean; readonly address: string },
  ): void {
    const { painter, palette, seconds } = moment;
    const fade = marked.sealed ? 0.4 : 1;
    painter.fillStyle = palette('ground');
    painter.globalAlpha = 1;
    painter.beginPath();
    painter.arc(at.x, at.y, 9, 0, Math.PI * 2);
    painter.fill();
    painter.strokeStyle = palette(marked.lit ? 'mg' : 'dim');
    painter.globalAlpha = (0.6 + 0.2 * Math.sin(seconds * 0.8)) * fade;
    painter.lineWidth = 1.4;
    painter.stroke();
    painter.globalAlpha = 1;
  }
}
