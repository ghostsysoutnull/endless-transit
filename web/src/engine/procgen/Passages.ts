import { Passage } from '#engine/model/Passage.ts';
import type { Vibe } from '#engine/model/Vibe.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { PassagePeek } from './PassagePeek.ts';
import type { CorridorDeal } from './CorridorDeal.ts';
import type { DoorDeal } from './DoorDeal.ts';

/**
 * Owns one fact: how a floor peeks at its corridor-to-be (U02, the user's idea) — the corridor's shape from the
 * pair its sentence is dealt with, each door's look from the doors' own deal, on the very seed the corridor
 * will be born from (`Seed.child`) — so the tower can draw every floor without making a
 * corridor or an apartment. The deals stay with their owners (`CorridorWords`, `Doors`); this only walks the seeds.
 */
export class Passages implements PassagePeek {
  readonly #words: CorridorDeal;
  readonly #doors: DoorDeal;

  constructor(words: CorridorDeal, doors: DoorDeal) {
    this.#words = words;
    this.#doors = doors;
  }

  /** The corridor under a floor born from this seed, with this many doors, in the vibe in force there. */
  of(floorSeed: Seed, doors: number, vibe: Vibe): Passage {
    const corridor = floorSeed.child(0);
    return new Passage(
      this.#words.dealt(corridor)[1],
      Array.from({ length: doors }, (_, index) => this.#doors.look({ corridor, index, vibe })),
    );
  }
}
