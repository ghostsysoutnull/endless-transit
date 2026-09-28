import type { HallReach } from './HallReach.ts';

/** Owns one fact: a hall that ends is drawn to its end, or as far as the fog lets anything show, whichever is nearer. */
export class EndingReach implements HallReach {
  of(ahead: number, sight: number): number {
    return Math.min(ahead, sight);
  }
}
