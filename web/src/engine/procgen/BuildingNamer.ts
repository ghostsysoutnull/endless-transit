import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { BuildingNames } from './BuildingNames.ts';
import type { BuildingSite } from './BuildingSite.ts';
import type { Dealer } from './Dealer.ts';

const WORDS = 'names/buildings';
/** The branch of a street's seed its buildings' words are dealt on. */
const DEALT = 'building-names';
/**
 * The rarity roll is drawn in ten-thousandths, so one draw decides landmark, uncommon or common — and every
 * chance below is a whole number of them: 300 is 3%. No float ever decides an edge.
 */
const ROLL_STEPS = 10_000;
const BASE_LANDMARK_CHANCE = 300;
const DEPTH_WITHOUT_BONUS = 5;
const LANDMARK_CHANCE_PER_LEVEL = 50;
const MAX_LANDMARK_CHANCE = 2_500;
const UNCOMMON_SHARE = 1_500;
const MAX_UNIT_SERIAL = 0xffe;
/**
 * A name's size word comes from the lists `names/buildings/sizes/index` names, smallest first: a building
 * under 10 floors takes the first, under 20 the second, anything taller the last. Which lists exist is the
 * index's fact; this file owns only the floor limits between them.
 */
const SIZE_WORD_LIMITS = [10, 20] as const;

/**
 * Owns one fact: how a building is named. One rarity roll on its own seed: below the landmark chance it
 * takes one of the landmark titles; in the next 15% an uncommon pattern (`Unit 0x… <size word>` or `The
 * <noun> of <concept>`); otherwise a common one (`<adjective> <noun>` or `<noun><compound>`) — the noun and
 * the adjective in the words of the street's culture, the compound in the words of its era. Every word and
 * every landmark title is dealt among the street's buildings on the street's seed, so no two of them share
 * one while its list lasts. The landmark chance is 3%, plus half a point per level below depth 5, times
 * whatever factor the places above ask for, never more than 25%.
 */
export class BuildingNamer implements BuildingNames {
  readonly #library: ContentLibrary;
  readonly #deal: Dealer;

  constructor(library: ContentLibrary, deal: Dealer) {
    this.#library = library;
    this.#deal = deal;
  }

  nameOf(seed: Seed, site: BuildingSite): { name: string; landmark: boolean } {
    const naming = seed.branch('name');
    const roll = naming.branch('rarity').range(0, ROLL_STEPS - 1);
    const landmarkChance = this.landmarkChance(site.depth, site.landmarkFactor);
    if (roll < landmarkChance) {
      return { name: this.#dealt(site, 'landmarks'), landmark: true };
    }
    const pattern = naming.branch('pattern').range(0, 1);
    const name =
      roll < landmarkChance + UNCOMMON_SHARE
        ? this.#uncommon(naming, pattern, site)
        : this.#common(pattern, site);
    return { name, landmark: false };
  }

  /**
   * How many of the 10 000 rarity rolls make a landmark at this depth: 300, plus 50 per level below depth
   * 5, times the factor the places above ask for, never more than 2 500.
   */
  landmarkChance(depth: number, factor: number): number {
    const chance =
      BASE_LANDMARK_CHANCE + Math.max(0, depth - DEPTH_WITHOUT_BONUS) * LANDMARK_CHANCE_PER_LEVEL;
    return Math.min(MAX_LANDMARK_CHANCE, chance * factor);
  }

  #uncommon(naming: Seed, pattern: number, site: BuildingSite): string {
    if (pattern === 0) {
      const serial = naming.branch('serial').range(0, MAX_UNIT_SERIAL).toString(16).toUpperCase();
      return `Unit 0x${serial} ${naming.branch('size-word').pick(this.#sizeWords(site.floors))}`;
    }
    return `The ${this.#noun(site)} of ${this.#dealt(site, 'concepts')}`;
  }

  #sizeWords(floors: number): readonly string[] {
    const lists = this.#library.index(`${WORDS}/sizes`);
    const taller = SIZE_WORD_LIMITS.filter((limit) => floors >= limit).length;
    const list = lists[Math.min(taller, lists.length - 1)];
    if (list === undefined) throw new Error(`${WORDS}/sizes/index names no list`);
    return this.#library.list(`${WORDS}/sizes/${list}`);
  }

  #common(pattern: number, site: BuildingSite): string {
    if (pattern === 0) return `${this.#dealt(site, `adj/${site.culture.key()}`)} ${this.#noun(site)}`;
    return `${this.#noun(site)}${this.#dealt(site, `compounds/${site.era.key()}`)}`;
  }

  #noun(site: BuildingSite): string {
    return this.#dealt(site, `noun/${site.culture.key()}`);
  }

  /** The word of this list that falls to the building on this site: one deal a list, on the street's seed. */
  #dealt(site: BuildingSite, list: string): string {
    return this.#deal.nth(
      site.street.branch(DEALT).branch(list),
      this.#library.list(`${WORDS}/${list}`),
      site.index,
    );
  }
}
