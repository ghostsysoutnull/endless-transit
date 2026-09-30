import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { AreaInk } from './AreaInk.ts';
import type { AreaMoment, AreaScene } from './AreaScene.ts';
import type { AreaSpots } from './AreaSpots.ts';
import type { Point } from './Point.ts';

/**
 * A cosmic filament (U04; the mock's `filament`, `:675-683`): a thread of galaxies across the dark, thin strands
 * beside it, and its nodes as knots tethered to the main strand, every other one above it.
 */
export class FilamentScene implements AreaScene {
  readonly #ink: AreaInk;
  readonly #spread: AreaSpots;

  constructor(ink: AreaInk, spread: AreaSpots) {
    this.#ink = ink;
    this.#spread = spread;
  }

  spots(count: number, size: PictureSize): readonly Point[] {
    return this.#spread.zigzag(
      count,
      { x: size.width * 0.12, y: size.height * 0.62 },
      { x: size.width * 0.88, y: size.height * 0.38 },
      Math.min(size.height * 0.17, 52),
    );
  }

  backdrop(moment: AreaMoment): void {
    const { painter, size, palette, seconds, spots } = moment;
    const m = Math.min(size.width, size.height);
    const ink = this.#ink;
    ink.stars(painter, size, palette, seconds, 'f', Math.round((size.width * size.height) / 3000), 0.6);
    for (let strand = 0; strand < 6; strand++) {
      const main = strand === 0;
      const y = (k: number, fallback: number): number =>
        main ? fallback : ink.fraction('f-s', strand * 4 + k) * size.height;
      const points = ink.curve(
        { x: 0, y: y(0, size.height * 0.72) },
        { x: size.width / 3, y: y(1, size.height * 0.6) },
        { x: (size.width * 2) / 3, y: y(2, size.height * 0.4) },
        { x: size.width, y: y(3, size.height * 0.28) },
        40,
      );
      painter.strokeStyle = palette(main ? 'bc' : 'cy');
      painter.globalAlpha = main ? 0.35 : 0.12;
      painter.lineWidth = main ? 2 : 1;
      ink.line(painter, points);
      painter.stroke();
      if (!main) continue;
      points.forEach((point, index) => {
        if (index % 3 !== 0) return;
        const jitter = (k: number): number => (ink.fraction('f-j', index * 2 + k) - 0.5) * m * 0.05;
        ink.glow(
          painter,
          { x: point.x + jitter(0), y: point.y + jitter(1) },
          m * (0.012 + ink.fraction('f-r', index) * 0.018),
          palette(ink.fraction('f-c', index) < 0.3 ? 'mg' : 'bc'),
          0.3 + 0.15 * Math.sin(seconds + index),
        );
      });
    }
    const middle = (x: number): number => size.height * 0.72 - (x / size.width) * size.height * 0.44;
    painter.strokeStyle = palette('cy');
    painter.globalAlpha = 0.35;
    painter.lineWidth = 1;
    painter.setLineDash([2, 3]);
    spots.forEach((spot) => {
      painter.beginPath();
      painter.moveTo(spot.x, middle(spot.x));
      painter.lineTo(spot.x, spot.y);
      painter.stroke();
    });
    painter.setLineDash([]);
    painter.globalAlpha = 1;
  }
}
