import type { AreaInk } from './AreaInk.ts';
import type { AreaMark } from './AreaMark.ts';
import type { AreaMoment } from './AreaScene.ts';
import type { Point } from './Point.ts';

/** A galactic sector on its filament (U04): a small spiral knot, turning slowly. */
export class SpiralMark implements AreaMark {
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
    ink.glow(
      painter,
      at,
      13,
      palette(ink.fraction(marked.address, 1) < 0.4 ? 'mg' : 'bc'),
      0.5 * fade * shine,
    );
    painter.fillStyle = palette('wh');
    for (let dot = 0; dot < 18; dot++) {
      const arm = dot % 2;
      const d = 2 + (dot / 18) * 9;
      const angle = arm * Math.PI + d * 0.45 + seconds * 0.3;
      painter.globalAlpha = 0.7 * fade * (1 - dot / 24);
      painter.fillRect(at.x + Math.cos(angle) * d, at.y + Math.sin(angle) * d * 0.6, 1.3, 1.3);
    }
    painter.globalAlpha = 1;
  }
}
