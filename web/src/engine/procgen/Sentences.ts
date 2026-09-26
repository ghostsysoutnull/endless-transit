import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const LISTS = 'themes/descriptions';
const DEAL = 'sentence';

/**
 * Owns one fact: how a location is dealt its description sentence — one line of the kind's list in
 * `themes/descriptions`, chosen by the location's own seed at creation (ThemeService.groovy:201-208).
 */
export class Sentences {
  readonly #library: ContentLibrary;
  readonly #kind: string;

  constructor(library: ContentLibrary, kind: string) {
    this.#library = library;
    this.#kind = kind;
  }

  dealt(seed: Seed): string {
    return seed.branch(DEAL).pick(this.#library.list(`${LISTS}/${this.#kind}`));
  }

  /** For a kind whose sentences carry a key (`sentence|key`, the corridor's shape, U02): the pair, on the same branch. */
  dealtPair(seed: Seed): readonly [string, string] {
    return seed.branch(DEAL).pick(this.#library.pairs(`${LISTS}/${this.#kind}`));
  }
}
