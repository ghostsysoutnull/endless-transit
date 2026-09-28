import type { RowShape } from './RowShape.ts';

/** A curved gallery on the tower: the line bows up across the row. */
export class CurvedRow implements RowShape {
  bow(row: number): number {
    return row * 0.16;
  }

  reach(_from: number, full: number): number {
    return full;
  }

  wall(): void {
    // A gallery curves away: no end wall.
  }

  tail(): void {
    // Nothing past its end.
  }
}
