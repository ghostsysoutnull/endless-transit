import type { RowShape } from './RowShape.ts';

/** A long corridor on the tower: a straight line across the row, nothing at its end. Also a row without a corridor shape. */
export class LongRow implements RowShape {
  bow(): number {
    return 0;
  }

  reach(_from: number, full: number): number {
    return full;
  }

  wall(): void {
    // A long corridor runs to the edge: no end wall.
  }

  tail(): void {
    // Nothing past its end.
  }
}
