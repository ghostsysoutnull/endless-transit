import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Passage } from '#engine/model/Passage.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import { Doors } from './Doors.ts';
import type { Progeny } from './Progeny.ts';
import { Sentences } from './Sentences.ts';

/**
 * Owns one fact: how a floor peeks at its corridor-to-be (U02, the user's idea) — the corridor's shape from the
 * pair its sentence is dealt with, each door's look from the door's own deal, on the very seeds the corridor and
 * its apartments will be born from (`Progeny.childSeed`) — so the tower can draw every floor without making a
 * corridor or an apartment. The deals stay with their owners (`Sentences`, `Doors`); this only walks the seeds.
 */
export class Passages {
  readonly #sentences: Sentences;
  readonly #doors: Doors;
  readonly #corridors: Progeny;
  readonly #apartments: Progeny;

  constructor(library: ContentLibrary, corridors: Progeny, apartments: Progeny) {
    this.#sentences = new Sentences(library, 'corridor');
    this.#doors = new Doors(library);
    this.#corridors = corridors;
    this.#apartments = apartments;
  }

  /** The corridor under a floor born from this seed, with this many doors. */
  of(floorSeed: Seed, doors: number): Passage {
    const corridor = this.#corridors.childSeed(floorSeed, 0);
    return {
      shape: this.#sentences.dealtPair(corridor)[1],
      looks: Array.from({ length: doors }, (_, index) =>
        this.#doors.look(this.#apartments.childSeed(corridor, index)),
      ),
    };
  }
}
