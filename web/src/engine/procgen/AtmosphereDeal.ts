import type { Atmosphere } from '#engine/model/Atmosphere.ts';
import type { Culture } from '#engine/model/Culture.ts';
import type { Era } from '#engine/model/Era.ts';
import type { Trait } from '#engine/model/Trait.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/** What a room factory asks of `Atmospheres`: the atmosphere dealt for a room. */
export interface AtmosphereDeal {
  of(seed: Seed, facts: { culture: Culture; era: Era; trait: Trait; anomaly: boolean }): Atmosphere;
}
