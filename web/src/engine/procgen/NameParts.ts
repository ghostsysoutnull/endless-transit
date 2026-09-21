import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const NAMING = 'name';

/**
 * Owns one fact: how a name is drawn from a directory of word lists — one word per list, the lists in the
 * directory's index order, each word on its own branch of the location's naming seed. How the words are
 * joined is the business of the factory that asks.
 */
export class NameParts {
  readonly #library: ContentLibrary;
  readonly #directory: string;

  constructor(library: ContentLibrary, directory: string) {
    this.#library = library;
    this.#directory = directory;
  }

  words(seed: Seed): readonly string[] {
    return this.#library.index(this.#directory).map((part) =>
      this.naming(seed)
        .branch(part)
        .pick(this.#library.list(`${this.#directory}/${part}`)),
    );
  }

  /** The branch all of a location's naming draws hang from — for the numbers some names carry. */
  naming(seed: Seed): Seed {
    return seed.branch(NAMING);
  }
}
