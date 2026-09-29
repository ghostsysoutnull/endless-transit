import type { Seed } from '#engine/rng/Seed.ts';

/** What `CorridorWords` asks of its sentences (`Sentences`): the lines read by their key, and one of them dealt. */
export interface LineDeal {
  lines<K>(read: (key: string) => K): readonly (readonly [string, K])[];
  dealtFrom<T>(seed: Seed, lines: readonly T[]): T;
}
