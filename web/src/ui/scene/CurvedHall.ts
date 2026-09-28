import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { EndWall } from './EndWall.ts';
import type { HallShape } from './HallShape.ts';
import type { HallView } from './HallView.ts';

/** A curved gallery (the mock's, `transit-reframed.html:833`): it bends away as it goes, to a wall; on the slider, a bend. */
export class CurvedHall implements HallShape {
  readonly #wall: EndWall;

  constructor(wall: EndWall) {
    this.#wall = wall;
  }

  bend(depth: number): number {
    return 0.03 * depth * depth;
  }

  reach(ahead: number, sight: number): number {
    return Math.min(ahead, sight);
  }

  end(painter: Painter, palette: Palette, hall: HallView): void {
    this.#wall.draw(painter, palette, hall);
  }

  mark(painter: Painter, palette: Palette, point: { readonly x: number; readonly y: number }): void {
    painter.globalAlpha = 0.9;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 2;
    painter.beginPath();
    painter.arc(point.x - 10, point.y + 8, 14, -Math.PI / 2, 0);
    painter.stroke();
  }
}
