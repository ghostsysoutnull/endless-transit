import type { Relic } from './Relic.ts';

/** What a place that holds things holds: its relics and its furniture. A kind that holds nothing answers no Contents at all. */
export interface Contents {
  readonly objects: readonly Relic[];
  readonly furniture: readonly string[];
}
