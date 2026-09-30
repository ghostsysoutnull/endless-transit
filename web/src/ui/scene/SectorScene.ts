import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { AreaInk } from './AreaInk.ts';
import type { AreaMoment, AreaScene } from './AreaScene.ts';
import type { AreaSpots } from './AreaSpots.ts';
import type { Point } from './Point.ts';

/**
 * A galactic sector (U04; the mock's `sector`, `:684-689`): a slow spiral of old stars round a warm core, its
 * solar systems standing round the core on the arms.
 */
export class SectorScene implements AreaScene {
  readonly #ink: AreaInk;
  readonly #spread: AreaSpots;

  constructor(ink: AreaInk, spread: AreaSpots) {
    this.#ink = ink;
    this.#spread = spread;
  }

  spots(count: number, size: PictureSize, address: string): readonly Point[] {
    const start = this.#ink.fraction(address, 0) * Math.PI * 2;
    return this.#spread.ring(
      count,
      { x: size.width / 2, y: size.height / 2 },
      size.width * 0.36,
      size.height * 0.33,
      start,
    );
  }

  backdrop(moment: AreaMoment): void {
    const { painter, size, palette, seconds } = moment;
    const m = Math.min(size.width, size.height);
    const core = { x: size.width / 2, y: size.height / 2 };
    const ink = this.#ink;
    ink.glow(painter, core, m * 0.16, palette('yl'), 0.35);
    const inks = [palette('mg'), palette('bc'), palette('wh')];
    const reach = Math.max(size.width, size.height) * 0.55;
    for (let star = 0; star < 900; star++) {
      const arm = star % 3;
      const d = Math.pow(ink.fraction('s-d', star), 0.7) * reach;
      const angle = arm * 2.094 + (d / m) * 5.2 + seconds * 0.025 + (ink.fraction('s-a', star) - 0.5) * 0.5;
      painter.globalAlpha = 0.15 + ink.fraction('s-g', star) * 0.55 * (1 - d / reach) + 0.1;
      const pick = ink.fraction('s-c', star);
      painter.fillStyle = inks[pick < 0.2 ? 0 : pick < 0.5 ? 1 : 2] ?? palette('wh');
      painter.fillRect(core.x + Math.cos(angle) * d, core.y + Math.sin(angle) * d * 0.62, 1.3, 1.3);
    }
    painter.globalAlpha = 1;
  }
}
