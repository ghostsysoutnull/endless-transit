import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { HallEnd } from './HallEnd.ts';
import type { HallReach } from './HallReach.ts';
import type { HallShape } from './HallShape.ts';
import type { Point } from './Point.ts';
import type { Quad } from './Quad.ts';

/** A curved gallery (the mock's, `transit-reframed.html:833`): it bends away as it goes, to a wall; on the slider, a bend. */
export class CurvedHall implements HallShape {
  readonly #wall: HallEnd;
  readonly #reach: HallReach;

  constructor(wall: HallEnd, reach: HallReach) {
    this.#wall = wall;
    this.#reach = reach;
  }

  bend(depth: number): number {
    return 0.03 * depth * depth;
  }

  reach(ahead: number, sight: number): number {
    return this.#reach.of(ahead, sight);
  }

  end(painter: Painter, palette: Palette, face: Quad, fog: number): void {
    this.#wall.draw(painter, palette, face, fog);
  }

  mark(painter: Painter, palette: Palette, point: Point): void {
    painter.globalAlpha = 0.9;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 2;
    painter.beginPath();
    painter.arc(point.x - 10, point.y + 8, 14, -Math.PI / 2, 0);
    painter.stroke();
  }
}
