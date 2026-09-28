import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { HallEnd } from './HallEnd.ts';
import type { HallReach } from './HallReach.ts';
import type { HallShape } from './HallShape.ts';
import type { Point } from './Point.ts';
import type { Quad } from './Quad.ts';

/** A narrow service corridor (the mock's straight hall): it runs straight to a blank wall; on the slider, a wall bar. */
export class ServiceHall implements HallShape {
  readonly #wall: HallEnd;
  readonly #reach: HallReach;

  constructor(wall: HallEnd, reach: HallReach) {
    this.#wall = wall;
    this.#reach = reach;
  }

  bend(): number {
    return 0;
  }

  reach(ahead: number, sight: number): number {
    return this.#reach.of(ahead, sight);
  }

  end(painter: Painter, palette: Palette, face: Quad, fog: number): void {
    this.#wall.draw(painter, palette, face, fog);
  }

  mark(painter: Painter, palette: Palette, point: Point): void {
    painter.globalAlpha = 0.9;
    painter.fillStyle = palette('cy');
    painter.fillRect(point.x - 1.5, point.y - 9, 3, 18);
  }
}
