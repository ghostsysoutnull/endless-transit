import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const ADJECTIVES = 'names/buildings/adj';
const NOUNS = 'names/buildings/noun';

/**
 * Owns one fact: how a universe gets its name from its seed — one culture of the index, then an adjective
 * and a noun from that culture's lists, each on its own branch.
 * (I01 borrows the building word lists; the real universe arrives in I02.)
 */
export class UniverseNamer {
  readonly #library: ContentLibrary;

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  nameOf(seed: Seed): string {
    const naming = seed.branch('universe-name');
    const culture = naming.branch('culture').pick(this.#library.index(ADJECTIVES));
    const adjective = naming.branch('adjective').pick(this.#library.list(`${ADJECTIVES}/${culture}`));
    const noun = naming.branch('noun').pick(this.#library.list(`${NOUNS}/${culture}`));
    return `${adjective} ${noun}`;
  }
}
