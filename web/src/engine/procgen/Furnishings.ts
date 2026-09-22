import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Culture } from '#engine/model/Culture.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import { Deal } from './Deal.ts';

const CONDITIONS = 'themes/conditions';
const CULTURE_LISTS = 'themes/cultures';
const PIECES = 'pieces';
const CONDITION = 'condition';

/**
 * Owns one fact: what furniture is — a culture item in a condition (`overturned tatami mat`), never a
 * hybrid, so it never reads as a second objects line (ThemeService.groovy:173-194, HK-016 step 2). The
 * pieces are dealt without replacement; a condition that would double the item's first word is passed
 * over for the next one (`flickering flickering light tube`, HK-016 F2).
 */
export class Furnishings {
  readonly #library: ContentLibrary;
  readonly #deal = new Deal();

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  of(seed: Seed, culture: Culture, count: number): readonly string[] {
    const conditions = this.#library.list(CONDITIONS);
    const items = this.#library.list(`${CULTURE_LISTS}/${culture.key()}`);
    return this.#deal.take(seed.branch(PIECES), items, Math.min(count, items.length)).map((item, i) => {
      let at = seed
        .branch(CONDITION)
        .branch(i)
        .range(0, conditions.length - 1);
      if (item.startsWith(`${conditions[at] ?? ''} `)) at = (at + 1) % conditions.length;
      return `${conditions[at] ?? ''} ${item}`;
    });
  }
}
