import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const WORDS = 'names/floors';
/** Floors below this draw from the lowest zone list; floors within this many of the top from the highest. */
const BASEMENT_BELOW = 5;
const EXECUTIVE_WITHIN = 5;

/**
 * Owns one fact: which zone name a floor gets, by height (Guide:356-360; Building.groovy:78-91). The
 * ground floor is always the lobby and the top floor the peak; floors 1 to 4 draw from the lowest list of
 * `names/floors/zones/index`, the three under the top from the highest, everything between from the
 * middle. The words are the lists'; the heights are this file's.
 */
export class FloorZones {
  readonly #library: ContentLibrary;

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  zoneOf(seed: Seed, number: number, floors: number): string {
    if (number === 0) return this.#only(`${WORDS}/lobby`);
    if (number === floors - 1) return this.#only(`${WORDS}/peak`);
    const lists = this.#library.index(`${WORDS}/zones`);
    const tier = number < BASEMENT_BELOW ? 0 : number > floors - EXECUTIVE_WITHIN ? lists.length - 1 : 1;
    const list = lists[tier];
    if (list === undefined) throw new Error(`${WORDS}/zones/index names too few lists`);
    return seed.branch('zone').pick(this.#library.list(`${WORDS}/zones/${list}`));
  }

  #only(path: string): string {
    const [word, ...more] = this.#library.list(path);
    if (word === undefined || more.length > 0) throw new Error(`${path}.txt holds exactly one word`);
    return word;
  }
}
