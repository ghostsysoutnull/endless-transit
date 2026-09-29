import type { PlanBox } from './PlanBox.ts';
import type { PlanPoint } from './PlanPoint.ts';

/** A doorway on a plan (U03): cut in a wall two rooms share — or in the footprint's edge, the entrance. */
export interface PlanDoor {
  /** The middle of the doorway. */
  middle(): PlanPoint;
  /** How much wall the two sides share: the most the doorway can be. */
  span(): number;
  /** The two ends of its gap, at most `width` wide and never wider than the wall it shares. */
  gap(width: number): readonly [PlanPoint, PlanPoint];
  /** Whether it is cut in one of this box's walls. */
  on(box: PlanBox): boolean;
}
