import type { Seed } from '#engine/rng/Seed.ts';
import type { FxPlan } from './FxPlan.ts';

/** What the tear asks of `CoherenceFx`: what to draw for a frame of its cycle, from the frame's seed and the decay. */
export interface FxPlans {
  plan(noise: Seed, decay: number, k: number): FxPlan;
}
