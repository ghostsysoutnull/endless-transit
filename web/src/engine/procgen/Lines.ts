import type { Seed } from '#engine/rng/Seed.ts';

/** What a factory asks of a list of sentences (`Sentences`): one dealt, the lines read by their key, one of them dealt. */
export interface Lines {
  dealt(seed: Seed): string;
  lines<K>(read: (key: string) => K): readonly (readonly [string, K])[];
  dealtFrom<T>(seed: Seed, lines: readonly T[]): T;
}
