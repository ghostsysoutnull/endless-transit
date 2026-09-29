import type { Painter } from '#ui/canvas/Painter.ts';
import type { RowShape } from './RowShape.ts';
import type { RowReach } from './RowReach.ts';

/** A narrow service corridor on the tower: the line stops short at a blank end wall. */
export class ServiceRow implements RowShape {
  readonly #end: RowReach;

  constructor(end: RowReach) {
    this.#end = end;
  }

  bow(): number {
    return 0;
  }

  reach(from: number, full: number): number {
    return this.#end.of(from, full);
  }

  wall(painter: Painter, to: number, line: number): void {
    painter.moveTo(to, line - 5);
    painter.lineTo(to, line + 5);
  }

  tail(): void {
    // Nothing past the wall.
  }
}
