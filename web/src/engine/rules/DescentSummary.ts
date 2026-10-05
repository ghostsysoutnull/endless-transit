import type { Seed } from '#engine/rng/Seed.ts';
import type { TraceSummary } from './TraceSummary.ts';

/**
 * The way down entering the world takes, as the title draws it: a step a level from the universe to where the
 * traveller lands, and the seed of what the title draws as noise.
 */
export interface DescentSummary {
  readonly trace: TraceSummary;
  readonly noise: Seed;
}
