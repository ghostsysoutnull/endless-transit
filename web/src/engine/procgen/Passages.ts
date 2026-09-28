import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Passage } from '#engine/model/Passage.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import { Doors } from './Doors.ts';
import { CorridorWords } from './CorridorWords.ts';

/**
 * Owns one fact: how a floor peeks at its corridor-to-be (U02, the user's idea) — the corridor's shape from the
 * pair its sentence is dealt with, each door's look from the door's own deal, on the very seeds the corridor and
 * its apartments will be born from (`Seed.child`) — so the tower can draw every floor without making a
 * corridor or an apartment. The deals stay with their owners (`CorridorWords`, `Doors`); this only walks the seeds.
 */
export class Passages {
  readonly #words: CorridorWords;
  readonly #doors: Doors;

  constructor(library: ContentLibrary) {
    this.#words = new CorridorWords(library);
    this.#doors = new Doors(library);
  }

  /** The corridor under a floor born from this seed, with this many doors. */
  of(floorSeed: Seed, doors: number): Passage {
    const corridor = floorSeed.child(0);
    return new Passage(
      this.#words.dealt(corridor)[1],
      Array.from({ length: doors }, (_, index) => this.#doors.look(corridor.child(index))),
    );
  }
}
