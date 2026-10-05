import type { Passage } from '#engine/model/Passage.ts';
import type { Vibe } from '#engine/model/Vibe.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/** What a floor factory asks of `Passages`: a peek at the corridor under a floor born from this seed, in this vibe. */
export interface PassagePeek {
  of(floorSeed: Seed, doors: number, vibe: Vibe): Passage;
}
