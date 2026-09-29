/** A doorway on a plan, in plan units: the middle of its gap, the way the wall it is cut in runs, and how wide the wall it shares is. */
export interface PlanDoor {
  readonly x: number;
  readonly y: number;
  /** `x`: cut in a wall that runs across (a floor or ceiling line); `y`: in a wall that runs up and down. */
  readonly wall: 'x' | 'y';
  /** How much wall the two rooms share, the door's gap at most. */
  readonly span: number;
}
