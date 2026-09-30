import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { AreaInk } from './AreaInk.ts';
import type { AreaMoment, AreaScene } from './AreaScene.ts';
import type { Point } from './Point.ts';

/**
 * A planet (U04; the mock's `planet`, `:697-712`): a globe turning under its grid, ice at the poles, land drifting
 * across its face; its countries stand round the globe's middle, one in the middle when there is only one.
 */
export class PlanetScene implements AreaScene {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  spots(count: number, size: PictureSize): readonly Point[] {
    const { centre, radius } = this.#globe(size);
    if (count === 1) return [centre];
    const ring = radius * 0.6;
    return Array.from({ length: count }, (_, index) => {
      const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
      return { x: centre.x + Math.cos(angle) * ring, y: centre.y + Math.sin(angle) * ring };
    });
  }

  backdrop(moment: AreaMoment): void {
    const { painter, size, palette, seconds } = moment;
    const ink = this.#ink;
    ink.stars(painter, size, palette, seconds, 'p', Math.round((size.width * size.height) / 2400), 0.5);
    const { centre, radius } = this.#globe(size);
    ink.glow(painter, centre, radius * 1.3, palette('cy'), 0.16);
    painter.fillStyle = palette('panel2');
    painter.globalAlpha = 1;
    painter.beginPath();
    painter.arc(centre.x, centre.y, radius, 0, Math.PI * 2);
    painter.fill();
    painter.save();
    painter.beginPath();
    painter.arc(centre.x, centre.y, radius, 0, Math.PI * 2);
    painter.clip();
    painter.fillStyle = palette('bc');
    painter.globalAlpha = 0.18;
    painter.fillRect(centre.x - radius, centre.y + radius * 0.66, radius * 2, radius);
    painter.fillRect(centre.x - radius, centre.y - radius, radius * 2, radius * 0.24);
    for (let land = 0; land < 7; land++) {
      const lon = ink.fraction('p-lon', land) * Math.PI * 2 + seconds * 0.12;
      const depth = Math.cos(lon);
      if (depth < 0) continue;
      const lat = (ink.fraction('p-lat', land) - 0.5) * 2.2;
      const at = {
        x: centre.x + Math.sin(lon) * radius * Math.cos(lat * 0.7),
        y: centre.y + Math.sin(lat * 0.7) * radius,
      };
      painter.fillStyle = palette('gn');
      painter.globalAlpha = 0.14 * depth + 0.05;
      ink.line(
        painter,
        ink.ellipse(at, radius * 0.22 * depth * (0.5 + ink.fraction('p-w', land)), radius * 0.12, 0, 24),
      );
      painter.fill();
    }
    painter.strokeStyle = palette('cy');
    painter.globalAlpha = 0.2;
    painter.lineWidth = 1;
    for (let meridian = 0; meridian < 12; meridian++) {
      const lon = (meridian * Math.PI) / 6 + seconds * 0.12;
      if (Math.cos(lon) < 0) continue;
      ink.line(painter, ink.ellipse(centre, Math.abs(Math.sin(lon)) * radius, radius, 0, 36));
      painter.stroke();
    }
    for (let parallel = -3; parallel <= 3; parallel++) {
      const y = centre.y + Math.sin(parallel * 0.38) * radius;
      const across = Math.cos(parallel * 0.38) * radius;
      ink.line(painter, ink.ellipse({ x: centre.x, y }, across, across * 0.12, 0, 36));
      painter.stroke();
    }
    painter.restore();
    painter.strokeStyle = palette('bc');
    painter.globalAlpha = 0.5;
    painter.lineWidth = 1.5;
    painter.beginPath();
    painter.arc(centre.x, centre.y, radius, 0, Math.PI * 2);
    painter.stroke();
    painter.globalAlpha = 1;
  }

  #globe(size: PictureSize): { readonly centre: Point; readonly radius: number } {
    return {
      centre: { x: size.width / 2, y: size.height / 2 },
      radius: Math.min(size.width, size.height) * 0.45,
    };
  }
}
