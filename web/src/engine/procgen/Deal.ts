import type { Seed } from '#engine/rng/Seed.ts';

/**
 * Owns one fact: how items are dealt without replacement — the `n`-th item of a deal is the `n`-th pick
 * from what the earlier picks left, each pick on its own branch, so any position can be asked alone and
 * the answer never depends on who asked first. Past the list's end the deal starts over.
 */
export class Deal {
  nth<T>(seed: Seed, items: readonly T[], n: number): T {
    if (items.length === 0) throw new RangeError('a deal needs at least one item');
    const round = Math.floor(n / items.length);
    let left = [...items];
    let dealt: T | undefined;
    for (let pick = 0; pick <= n % items.length; pick++) {
      const at = seed
        .branch(round)
        .branch(pick)
        .range(0, left.length - 1);
      dealt = left[at];
      left = left.filter((_item, index) => index !== at);
    }
    if (dealt === undefined) throw new RangeError('a deal always deals');
    return dealt;
  }
}
