import type { Framing } from './Framing.ts';
import type { PlanPick } from './PlanPick.ts';

/** The plan's view on its way somewhere, measured by elapsed time (U03): a glide, or a trip that picks when it ends. */
export interface PlanMotion {
  at(time: number): Framing;
  over(time: number): boolean;
  /** What happens once it is over: a trip picks its option; a glide does nothing. */
  finish(picks: PlanPick): void;
}
