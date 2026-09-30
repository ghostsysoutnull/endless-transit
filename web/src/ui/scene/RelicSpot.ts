import type { Point } from './Point.ts';

/** Where a relic lies in the room you stand in, and how wide its label may run there without meeting the next. */
export interface RelicSpot {
  readonly at: Point;
  readonly reach: number;
}
