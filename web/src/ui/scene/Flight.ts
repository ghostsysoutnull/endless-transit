import type { Point } from './Point.ts';

/** What the plan's host asks when a relic is taken (U03b, `RelicFlight`): a mark flown from this point on the page to the buffer. */
export interface Flight {
  fly(from: Point): void;
}
