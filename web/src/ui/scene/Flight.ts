import type { Point } from './Point.ts';

/** What the plan's host asks when a relic is taken (U03b, `RelicFlight`): the relic's name shown at this point on the page, then flown to the buffer. */
export interface Flight {
  fly(from: Point, name: string): void;
}
