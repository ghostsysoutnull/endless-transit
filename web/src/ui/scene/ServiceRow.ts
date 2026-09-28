import type { Painter } from '#ui/canvas/Painter.ts';
import type { RowShape } from './RowShape.ts';

/** A narrow service corridor on the tower: the line stops short at a blank end wall. */
export class ServiceRow implements RowShape {
  bow(): number {
    return 0;
  }

  reach(from: number, full: number): number {
    return full - (full - from) * 0.08;
  }

  wall(painter: Painter, to: number, line: number): void {
    painter.moveTo(to, line - 5);
    painter.lineTo(to, line + 5);
  }

  tail(): void {
    // Nothing past the wall.
  }
}
