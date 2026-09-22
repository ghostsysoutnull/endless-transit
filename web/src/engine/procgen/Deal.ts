import type { Seed } from '#engine/rng/Seed.ts';

/**
 * Owns one fact: how items are dealt without replacement — the `n`-th item of a deal is the `n`-th pick
 * from what the earlier picks left, each pick on its own branch, so any position can be asked alone and
 * the answer never depends on who asked first. Past the list's end the deal starts over.
 */
export class Deal {
  nth<T>(seed: Seed, items: readonly T[], n: number): T {
    const dealt = this.take(seed, items, n + 1).at(-1);
    if (dealt === undefined) throw new RangeError('a deal always deals');
    return dealt;
  }

  /** The first `count` items of the deal, in the order they are dealt: `take(n)[i]` is `nth(i)`. */
  take<T>(seed: Seed, items: readonly T[], count: number): T[] {
    if (items.length === 0) throw new RangeError('a deal needs at least one item');
    const dealt: T[] = [];
    for (let round = 0; dealt.length < count; round++) {
      let left = [...items];
      for (let pick = 0; pick < items.length && dealt.length < count; pick++) {
        const at = seed
          .branch(round)
          .branch(pick)
          .range(0, left.length - 1);
        const item = left[at];
        if (item === undefined) throw new RangeError('a deal always deals');
        dealt.push(item);
        left = left.filter((_item, index) => index !== at);
      }
    }
    return dealt;
  }
}
