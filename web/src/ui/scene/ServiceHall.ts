import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { EndWall } from './EndWall.ts';
import type { HallShape } from './HallShape.ts';
import type { HallView } from './HallView.ts';

/** A narrow service corridor (the mock's straight hall): it runs straight to a blank wall; on the slider, a wall bar. */
export class ServiceHall implements HallShape {
  readonly #wall: EndWall;

  constructor(wall: EndWall) {
    this.#wall = wall;
  }

  bend(): number {
    return 0;
  }

  reach(ahead: number, sight: number): number {
    return Math.min(ahead, sight);
  }

  end(painter: Painter, palette: Palette, hall: HallView): void {
    this.#wall.draw(painter, palette, hall);
  }

  mark(painter: Painter, palette: Palette, point: { readonly x: number; readonly y: number }): void {
    painter.globalAlpha = 0.9;
    painter.fillStyle = palette('cy');
    painter.fillRect(point.x - 1.5, point.y - 9, 3, 18);
  }
}
