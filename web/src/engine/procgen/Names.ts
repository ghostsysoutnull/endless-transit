import type { Vibe } from '#engine/model/Vibe.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { NameSlot } from './NameSlot.ts';

/**
 * What a factory asks of its name list (`NameParts`): the words of a child's name, dealt among its
 * siblings under the vibe in force (none above the planet), and the seed its numbers are named from.
 */
export interface Names {
  words(slot: NameSlot, vibe: Vibe | undefined): readonly string[];
  naming(seed: Seed): Seed;
}
