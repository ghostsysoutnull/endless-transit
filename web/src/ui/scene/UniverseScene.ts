import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { AreaInk } from './AreaInk.ts';
import type { AreaMoment, AreaScene } from './AreaScene.ts';
import type { AreaSpots } from './AreaSpots.ts';
import type { Point } from './Point.ts';

/**
 * The universe (U04; the mock's `universe`, `transit-reframed.html:667-674`): faint galaxies and stars, a web of
 * filaments, and its own filaments as strands out of the root at the middle, each ending at its knot.
 */
export class UniverseScene implements AreaScene {
  readonly #ink: AreaInk;
  readonly #spread: AreaSpots;

  constructor(ink: AreaInk, spread: AreaSpots) {
    this.#ink = ink;
    this.#spread = spread;
  }

  spots(count: number, size: PictureSize): readonly Point[] {
    return this.#spread.ring(
      count,
      { x: size.width / 2, y: size.height / 2 },
      size.width * 0.36,
      size.height * 0.34,
    );
  }

  backdrop(moment: AreaMoment): void {
    const { painter, size, palette, seconds, spots } = moment;
    const m = Math.min(size.width, size.height);
    const ink = this.#ink;
    for (let galaxy = 0; galaxy < 9; galaxy++) {
      const at = {
        x: ink.fraction('u-gx', galaxy) * size.width,
        y: ink.fraction('u-gy', galaxy) * size.height,
      };
      ink.glow(
        painter,
        at,
        m * (0.05 + ink.fraction('u-gr', galaxy) * 0.1),
        palette(galaxy % 2 ? 'mg' : 'bl'),
        0.22,
      );
    }
    ink.stars(painter, size, palette, seconds, 'u', Math.round((size.width * size.height) / 1500));
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1;
    for (let thread = 0; thread < 12; thread++) {
      const point = (k: number): Point => ({
        x: ink.fraction('u-web-x', thread * 4 + k) * size.width,
        y: ink.fraction('u-web-y', thread * 4 + k) * size.height,
      });
      painter.globalAlpha = 0.07 + ink.fraction('u-web-a', thread) * 0.07;
      ink.line(painter, ink.curve(point(0), point(1), point(2), point(3)));
      painter.stroke();
    }
    const root = { x: size.width / 2, y: size.height / 2 };
    spots.forEach((spot, index) => {
      const bend = (ink.fraction('u-bend', index) - 0.5) * m * 0.3;
      painter.strokeStyle = palette('bc');
      painter.globalAlpha = 0.4;
      painter.lineWidth = 1.5;
      ink.line(
        painter,
        ink.curve(
          root,
          { x: root.x + bend, y: (root.y + spot.y) / 2 },
          { x: (root.x + spot.x) / 2, y: spot.y - bend },
          spot,
        ),
      );
      painter.stroke();
    });
    ink.glow(painter, root, m * 0.12, palette('yl'), 0.35 + 0.1 * Math.sin(seconds * 1.4));
    painter.globalAlpha = 1;
  }
}
