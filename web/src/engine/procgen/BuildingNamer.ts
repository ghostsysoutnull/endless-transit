import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Culture } from '#engine/model/Culture.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const WORDS = 'names/buildings';
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
 * Owns one fact: how a building is named. One rarity roll: below the landmark chance it takes one of the
 * landmark titles; in the next 15% an uncommon pattern (`Unit 0x… <size word>` or `The <noun> of
 * <concept>`); otherwise a common one (`<adjective> <noun>` or `<noun><compound>`), in the words of the
 * street's culture. The landmark chance is 3%, plus half a point per level below depth 5, times whatever
 * factor the places above ask for, never more than 25%.
 */
export class BuildingNamer {
  readonly #library: ContentLibrary;

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  nameOf(
    seed: Seed,
    site: { culture: Culture; floors: number; depth: number; landmarkFactor: number },
  ): { name: string; landmark: boolean } {
    const naming = seed.branch('name');
    const roll = naming.branch('rarity').range(0, ROLL_STEPS - 1);
    const landmarkChance = this.landmarkChance(site.depth, site.landmarkFactor);
    if (roll < landmarkChance) {
      return {
        name: naming.branch('landmark').pick(this.#library.list(`${WORDS}/landmarks`)),
        landmark: true,
      };
    }
    const pattern = naming.branch('pattern').range(0, 1);
    const name =
      roll < landmarkChance + UNCOMMON_SHARE
        ? this.#uncommon(naming, pattern, site)
        : this.#common(naming, pattern, site.culture);
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

  #uncommon(naming: Seed, pattern: number, site: { culture: Culture; floors: number }): string {
    if (pattern === 0) {
      const serial = naming.branch('serial').range(0, MAX_UNIT_SERIAL).toString(16).toUpperCase();
      return `Unit 0x${serial} ${naming.branch('size-word').pick(this.#sizeWords(site.floors))}`;
    }
    const concept = naming.branch('concept').pick(this.#library.list(`${WORDS}/concepts`));
    return `The ${this.#noun(naming, site.culture)} of ${concept}`;
  }

  #sizeWords(floors: number): readonly string[] {
    const lists = this.#library.index(`${WORDS}/sizes`);
    const taller = SIZE_WORD_LIMITS.filter((limit) => floors >= limit).length;
    const list = lists[Math.min(taller, lists.length - 1)];
    if (list === undefined) throw new Error(`${WORDS}/sizes/index names no list`);
    return this.#library.list(`${WORDS}/sizes/${list}`);
  }

  #common(naming: Seed, pattern: number, culture: Culture): string {
    if (pattern === 0) {
      const adjective = naming.branch('adjective').pick(this.#library.list(`${WORDS}/adj/${culture.key()}`));
      return `${adjective} ${this.#noun(naming, culture)}`;
    }
    const compound = naming.branch('compound').pick(this.#library.list(`${WORDS}/compounds`));
    return `${this.#noun(naming, culture)}${compound}`;
  }

  #noun(naming: Seed, culture: Culture): string {
    return naming.branch('noun').pick(this.#library.list(`${WORDS}/noun/${culture.key()}`));
  }
}
