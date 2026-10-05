import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Dealer } from './Dealer.ts';
import type { Tower } from './Tower.ts';
import type { Zones } from './Zones.ts';

const WORDS = 'names/floors';
/** The branch of a building's seed its floors' zones are dealt on. */
const DEALT = 'zones';
/** Floors below this draw from the lowest zone list; floors within this many of the top from the highest. */
const BASEMENT_BELOW = 5;
const EXECUTIVE_WITHIN = 5;

/**
 * Owns one fact: which zone name a floor gets — by its height, in the words of its country's trait (the
 * trait that picks the kinds of room behind its doors). The ground floor takes a lobby word and the top
 * floor a peak word; floors 1 to 4 draw from the lowest list of `names/floors/zones/index`, the three
 * under the top from the highest, everything between from the middle — each a directory keyed by trait.
 * A list is dealt once on the building's seed and read round and round up the tower, so no word comes
 * twice within as many floors as its list is long. The words are the lists'; the heights are this file's.
 */
export class FloorZones implements Zones {
  readonly #library: ContentLibrary;
  readonly #deal: Dealer;

  constructor(library: ContentLibrary, deal: Dealer) {
    this.#library = library;
    this.#deal = deal;
  }

  zoneOf(tower: Tower, number: number): string {
    if (number === 0) return this.#dealt(tower, 'lobby', number);
    if (number === tower.floors - 1) return this.#dealt(tower, 'peak', number);
    const lists = this.#library.index(`${WORDS}/zones`);
    const tier =
      number < BASEMENT_BELOW ? 0 : number > tower.floors - EXECUTIVE_WITHIN ? lists.length - 1 : 1;
    const list = lists[tier];
    if (list === undefined) throw new Error(`${WORDS}/zones/index names too few lists`);
    return this.#dealt(tower, `zones/${list}`, number);
  }

  /** The word of this part that falls to floor `number`: the part's one deal for the building, read in a round. */
  #dealt(tower: Tower, part: string, number: number): string {
    const words = this.#library.list(`${WORDS}/${part}/${tower.trait.key()}`);
    return this.#deal.nth(tower.seed.branch(DEALT).branch(part), words, number % words.length);
  }
}
