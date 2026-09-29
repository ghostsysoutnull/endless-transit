import type { Seed } from '#engine/rng/Seed.ts';

/** What a floor factory asks of its sentences (`Sentences`): one dealt on a seed. */
export interface SentenceDeal {
  dealt(seed: Seed): string;
}
