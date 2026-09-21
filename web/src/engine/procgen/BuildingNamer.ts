import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Culture } from '#engine/model/Culture.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const WORDS = 'names/buildings';
/** The rarity roll is drawn in ten-thousandths, so one draw decides landmark, uncommon or common. */
const ROLL_STEPS = 10_000;
const BASE_LANDMARK_CHANCE = 0.03;
const DEPTH_WITHOUT_BONUS = 5;
const LANDMARK_CHANCE_PER_LEVEL = 0.005;
const MAX_LANDMARK_CHANCE = 0.25;
const UNCOMMON_SHARE = 0.15;
const MAX_UNIT_SERIAL = 0xffe;
/** A name's size word: under 10 floors small, under 20 medium, anything taller large. */
const SIZE_WORDS = [
  { under: 10, list: 'small' },
  { under: 20, list: 'medium' },
  { under: Infinity, list: 'large' },
] as const;

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
    const roll = naming.branch('rarity').range(0, ROLL_STEPS - 1) / ROLL_STEPS;
    const landmarkChance = this.#landmarkChance(site.depth, site.landmarkFactor);
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

  #landmarkChance(depth: number, factor: number): number {
    const chance =
      BASE_LANDMARK_CHANCE + Math.max(0, depth - DEPTH_WITHOUT_BONUS) * LANDMARK_CHANCE_PER_LEVEL;
    return Math.min(MAX_LANDMARK_CHANCE, chance * factor);
  }

  #uncommon(naming: Seed, pattern: number, site: { culture: Culture; floors: number }): string {
    if (pattern === 0) {
      const serial = naming.branch('serial').range(0, MAX_UNIT_SERIAL).toString(16).toUpperCase();
      const sizeList = SIZE_WORDS.find((size) => site.floors < size.under)?.list ?? 'large';
      return `Unit 0x${serial} ${naming.branch('size-word').pick(this.#library.list(`${WORDS}/sizes/${sizeList}`))}`;
    }
    const concept = naming.branch('concept').pick(this.#library.list(`${WORDS}/concepts`));
    return `The ${this.#noun(naming, site.culture)} of ${concept}`;
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
