import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { AreaInk } from './AreaInk.ts';
import type { AreaMoment, AreaScene } from './AreaScene.ts';
import type { Point } from './Point.ts';

/**
 * A null reach (U04; no mock): a pocket of silence — a few faint stars, its one or two systems dim — and the ring
 * of the signal it hides, still and dashed before a scan, pulsing brighter as the signal grows.
 */
export class ReachScene implements AreaScene {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  spots(count: number, size: PictureSize): readonly Point[] {
    if (count === 1) return [{ x: size.width * 0.5, y: size.height * 0.46 }];
    return Array.from({ length: count }, (_, index) => ({
      x: size.width * (0.3 + (0.4 * index) / Math.max(1, count - 1)),
      y: size.height * (index % 2 === 0 ? 0.52 : 0.38),
    }));
  }

  backdrop(moment: AreaMoment): void {
    const { painter, size, palette, seconds, signal } = moment;
    const m = Math.min(size.width, size.height);
    const ink = this.#ink;
    ink.stars(painter, size, palette, seconds, 'n', Math.round((size.width * size.height) / 9000), 0.35);
    const centre = { x: size.width / 2, y: size.height / 2 };
    const strength = Math.min(Math.max(signal, 0), 100) / 100;
    painter.strokeStyle = palette(strength > 0 ? 'mg' : 'dim');
    painter.lineWidth = 1.2;
    if (strength === 0) {
      painter.globalAlpha = 0.5;
      painter.setLineDash([4, 6]);
      painter.beginPath();
      painter.arc(centre.x, centre.y, m * 0.4, 0, Math.PI * 2);
      painter.stroke();
      painter.setLineDash([]);
    } else {
      for (let wave = 0; wave < 3; wave++) {
        const grow = (seconds * (0.3 + strength * 0.5) + wave / 3) % 1;
        painter.globalAlpha = (0.2 + 0.6 * strength) * (1 - grow);
        painter.beginPath();
        painter.arc(centre.x, centre.y, m * (0.12 + 0.34 * grow), 0, Math.PI * 2);
        painter.stroke();
      }
      ink.glow(painter, centre, m * 0.08, palette('mg'), 0.25 * strength);
    }
    painter.globalAlpha = 1;
  }
}
