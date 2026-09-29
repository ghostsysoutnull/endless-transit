import type { RowReach } from './RowReach.ts';

/** A corridor that stops short on the tower's row ends this fraction of the way before the row's full width. */
const SHORT = 0.08;

/** Owns one fact: where a corridor that stops short ends on the tower's row (a service corridor's wall, static's edge). */
export class ShortReach implements RowReach {
  of(from: number, full: number): number {
    return full - (full - from) * SHORT;
  }
}
