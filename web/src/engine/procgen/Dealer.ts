import type { Seed } from '#engine/rng/Seed.ts';

/** What a factory asks of `Deal`: one item dealt at a place in a shuffle, or a hand of them. */
export interface Dealer {
  nth<T>(seed: Seed, items: readonly T[], n: number): T;
  take<T>(seed: Seed, items: readonly T[], count: number): T[];
}
