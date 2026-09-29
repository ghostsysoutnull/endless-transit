import type { Framing } from './Framing.ts';
import type { PlanGlide } from './PlanGlide.ts';
import type { PlanMotion } from './PlanMotion.ts';
import type { PlanPick } from './PlanPick.ts';

/**
 * The plan's view gliding somewhere, then picking an option (U03): through a doorway into the next room, or back to
 * the whole plan before leaving. A new frame of the game drops it with its pick (ids are positional). Immutable.
 */
export class PlanTrip implements PlanMotion {
  readonly #glide: PlanGlide;
  readonly #pick: string;

  constructor(glide: PlanGlide, pick: string) {
    this.#glide = glide;
    this.#pick = pick;
  }

  at(time: number): Framing {
    return this.#glide.at(time);
  }

  over(time: number): boolean {
    return this.#glide.over(time);
  }

  finish(picks: PlanPick): void {
    picks.pick(this.#pick);
  }
}
