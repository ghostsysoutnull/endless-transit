import type { Seed } from '#engine/rng/Seed.ts';

/** What a factory asks of its name list (`NameParts`): the words of a name, and the seed it was named from. */
export interface Names {
  words(seed: Seed): readonly string[];
  naming(seed: Seed): Seed;
}
