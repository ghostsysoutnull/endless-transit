import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const CULTURES = 'themes/cultures';
const ADJECTIVES = 'names/buildings/adj';
const NOUNS = 'names/buildings/noun';

/**
 * Owns one fact: how a universe gets its name from its seed — one culture, then an adjective and a noun
 * from that culture's lists, each on its own branch. Which cultures exist is not this class's fact: it is
 * `themes/cultures/index`, the one owner; the word-list directories are keyed by it and carry no index.
 * (I01 borrows the building word lists; the real universe arrives in I02.)
 */
export class UniverseNamer {
  readonly #library: ContentLibrary;

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  nameOf(seed: Seed): string {
    return this.nameIn(this.cultureOf(seed), seed);
  }

  /** The culture this seed's universe is named in. */
  cultureOf(seed: Seed): string {
    return this.#naming(seed).branch('culture').pick(this.#library.index(CULTURES));
  }

  /** The name this seed gives in one culture; a culture without both word lists is an error. */
  nameIn(culture: string, seed: Seed): string {
    const naming = this.#naming(seed);
    const adjective = naming.branch('adjective').pick(this.#library.list(`${ADJECTIVES}/${culture}`));
    const noun = naming.branch('noun').pick(this.#library.list(`${NOUNS}/${culture}`));
    return `${adjective} ${noun}`;
  }

  #naming(seed: Seed): Seed {
    return seed.branch('universe-name');
  }
}
