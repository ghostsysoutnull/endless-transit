import type { Level } from '#engine/model/Level.ts';

/** Where a level falls on a pad by tens (U02, Decision 7): the group it is keyed under, groups shown ascending. */
export interface PadGroup {
  of(level: Level): number;
}
