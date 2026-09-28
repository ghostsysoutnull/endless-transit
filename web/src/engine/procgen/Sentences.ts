import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { Lines } from './Lines.ts';

const LISTS = 'themes/descriptions';
const DEAL = 'sentence';

/**
 * Owns one fact: how a location is dealt its description sentence — one line of the kind's list in
 * `themes/descriptions`, chosen by the location's own seed at creation (ThemeService.groovy:201-208).
 */
export class Sentences implements Lines {
  readonly #library: ContentLibrary;
  readonly #kind: string;

  constructor(library: ContentLibrary, kind: string) {
    this.#library = library;
    this.#kind = kind;
  }

  dealt(seed: Seed): string {
    return seed.branch(DEAL).pick(this.#library.list(`${LISTS}/${this.#kind}`));
  }

  /**
   * For a kind whose sentences carry a key (`sentence|key`, the corridor's shape, U02): every line, its key read by
   * `read`, in file order — the whole list, so one key `read` refuses refuses it.
   */
  lines<K>(read: (key: string) => K): readonly (readonly [string, K])[] {
    return this.#library
      .pairs(`${LISTS}/${this.#kind}`)
      .map(([sentence, key]) => [sentence, read(key)] as const);
  }

  /** The line of `lines` a location with this seed is dealt: the same branch as `dealt`, so the same line. */
  dealtFrom<T>(seed: Seed, lines: readonly T[]): T {
    return seed.branch(DEAL).pick(lines);
  }
}
