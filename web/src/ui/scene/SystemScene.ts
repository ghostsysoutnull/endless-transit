import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { AreaInk } from './AreaInk.ts';
import type { AreaMoment, AreaScene } from './AreaScene.ts';
import type { Point } from './Point.ts';

/** The orbits' squash: a system seen a little from above. */
const SQUASH = 0.8;
/** The rows the planets take in turn — on the sun's line, above it, below it — so neighbours stay a tap apart. */
const ROWS = [0, -1, 1];

/**
 * A solar system (U04; the mock's `system`, `:690-696`): a pale sun at the left edge, its orbits sweeping out
 * across the picture, a planet on each, every other one above the sun's line so neighbours stay a tap apart.
 */
export class SystemScene implements AreaScene {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  spots(count: number, size: PictureSize): readonly Point[] {
    const sun = this.#sun(size);
    const lift = Math.min(size.height * 0.3, 80);
    return this.#radii(count, size).map((reach, index) => ({
      x: sun.x + reach,
      y: sun.y + (ROWS[index % ROWS.length] ?? 0) * lift,
    }));
  }

  backdrop(moment: AreaMoment): void {
    const { painter, size, palette, seconds, spots } = moment;
    const m = Math.min(size.width, size.height);
    const ink = this.#ink;
    ink.stars(painter, size, palette, seconds, 'sy', Math.round((size.width * size.height) / 2600), 0.6);
    const sun = this.#sun(size);
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1;
    // Each orbit the ellipse about the sun that runs through its planet.
    spots.forEach((spot, index) => {
      const dx = spot.x - sun.x;
      const dy = (spot.y - sun.y) / SQUASH;
      const radius = Math.sqrt(dx * dx + dy * dy);
      painter.globalAlpha = index % 2 === 0 ? 0.3 : 0.18;
      painter.setLineDash(index % 2 === 0 ? [] : [2, 4]);
      ink.line(painter, ink.ellipse(sun, radius, radius * SQUASH, 0, 72));
      painter.stroke();
    });
    painter.setLineDash([]);
    ink.glow(painter, sun, m * 0.22, palette('yl'), 0.45 + 0.05 * Math.sin(seconds));
    painter.fillStyle = palette('wh');
    painter.globalAlpha = 0.95;
    painter.beginPath();
    painter.arc(sun.x, sun.y, m * 0.04, 0, Math.PI * 2);
    painter.fill();
    painter.globalAlpha = 1;
  }

  #sun(size: PictureSize): Point {
    return { x: size.width * 0.06, y: size.height * 0.5 };
  }

  /** How far out from the sun each planet stands, from a tap away to near the far edge. */
  #radii(count: number, size: PictureSize): readonly number[] {
    const first = 64;
    const last = Math.max(first, size.width * 0.86);
    return Array.from({ length: count }, (_, index) =>
      count === 1 ? (first + last) / 2 : first + ((last - first) * index) / (count - 1),
    );
  }
}
