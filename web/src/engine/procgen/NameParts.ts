import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Vibe } from '#engine/model/Vibe.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { Dealer } from './Dealer.ts';
import type { NameAxes } from './NameAxes.ts';
import type { NamePart } from './NamePart.ts';
import type { Names } from './Names.ts';
import type { NameSlot } from './NameSlot.ts';

const NAMING = 'name';
/** The branch of a parent's seed its children's names are dealt on. */
const DEALT = 'child-names';

/**
 * Owns one fact: how a name is drawn from a directory of word lists — one word per part, the parts in the
 * directory's index order (`part|axis` a line), each dealt among the siblings: child `i` takes the `i`-th
 * word of the part's deal on its parent's seed, so the children of one parent share no word while the
 * list lasts, and a name never depends on a sibling. How the words are joined is the business of the
 * factory that asks.
 */
export class NameParts implements Names {
  readonly #library: ContentLibrary;
  readonly #directory: string;
  readonly #deal: Dealer;
  readonly #axes: NameAxes;
  #parts: readonly NamePart[] | undefined;

  constructor(library: ContentLibrary, directory: string, parts: { deal: Dealer; axes: NameAxes }) {
    this.#library = library;
    this.#directory = directory;
    this.#deal = parts.deal;
    this.#axes = parts.axes;
  }

  words(slot: NameSlot, vibe: Vibe | undefined): readonly string[] {
    if (slot.parent === undefined) {
      throw new Error(`${this.#directory}: a name is dealt among siblings — it needs a parent`);
    }
    const dealt = slot.parent.seed().branch(DEALT).branch(this.#directory);
    this.#parts ??= this.#library
      .pairs(`${this.#directory}/index`)
      .map(([name, axis]) => this.#axes.part(this.#directory, name, axis));
    return this.#parts.map((part) =>
      this.#deal.nth(dealt.branch(part.name()), this.#library.list(part.list(slot, vibe)), slot.index),
    );
  }

  /** The branch all of a location's own naming draws hang from — for the numbers some names carry. */
  naming(seed: Seed): Seed {
    return seed.branch(NAMING);
  }
}
