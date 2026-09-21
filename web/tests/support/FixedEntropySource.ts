import type { EntropySource } from '#engine/rng/EntropySource.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/** Test double: hands out the given seeds in order, then starts again. */
export class FixedEntropySource implements EntropySource {
  readonly #seeds: readonly Seed[];
  #next = 0;

  constructor(seeds: readonly Seed[]) {
    this.#seeds = seeds;
  }

  draw(): Seed {
    const seed = this.#seeds[this.#next % this.#seeds.length];
    if (seed === undefined) throw new Error('FixedEntropySource needs at least one seed');
    this.#next++;
    return seed;
  }
}
