/** How a motion eases: the eased share of the way for a share of the time, both 0 to 1. */
export interface Easing {
  ease(progress: number): number;
}
