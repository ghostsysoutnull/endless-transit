import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';

const ROOT = new Seed(0x7f3a91c2, 0x0b4de6a8);

describe('Seed — identity', () => {
  test('two seeds built from the same halves are equal and print the same text', () => {
    const twin = new Seed(0x7f3a91c2, 0x0b4de6a8);
    expect(ROOT.equals(twin)).toBe(true);
    expect(ROOT.toString()).toBe('7F3A-91C2-0B4D-E6A8');
    expect(twin.toString()).toBe(ROOT.toString());
  });

  test('the text form parses back to an equal seed; junk parses to nothing', () => {
    expect(Seed.parse(ROOT.toString())?.equals(ROOT)).toBe(true);
    expect(Seed.parse('7f3a91c20b4de6a8')?.equals(ROOT)).toBe(true);
    expect(Seed.parse('not a seed')).toBeUndefined();
    expect(Seed.parse('7F3A-91C2-0B4D')).toBeUndefined();
  });

  test('halves are normalized to unsigned 32-bit integers', () => {
    expect(new Seed(-1, 2 ** 32 + 5).toString()).toBe('FFFF-FFFF-0000-0005');
  });
});

describe('Seed — determinism', () => {
  test('a branch is a pure function of (parent seed, key)', () => {
    expect(ROOT.branch('planet').equals(ROOT.branch('planet'))).toBe(true);
    expect(ROOT.branch(7).equals(new Seed(0x7f3a91c2, 0x0b4de6a8).branch(7))).toBe(true);
  });

  test('branching never changes the parent: draws before and after a branch agree', () => {
    const before = ROOT.range(0, 1_000_000);
    ROOT.branch('a').branch('b').range(0, 9);
    expect(ROOT.range(0, 1_000_000)).toBe(before);
    expect(ROOT.toString()).toBe('7F3A-91C2-0B4D-E6A8');
  });

  test('the algorithm is pinned: these literals move only when the generator is changed on purpose', () => {
    expect(ROOT.branch('universe').toString()).toBe('495A-E1EA-D5DE-34BB');
    expect(ROOT.branch('universe').range(1, 1000)).toBe(32);
    expect(ROOT.branch('universe').pick(['a', 'b', 'c', 'd', 'e'])).toBe('d');
  });
});

describe('Seed — branch independence', () => {
  test('different keys, different parents and key order give different seeds', () => {
    expect(ROOT.branch('a').equals(ROOT.branch('b'))).toBe(false);
    expect(ROOT.branch('a').equals(new Seed(0x7f3a91c2, 0x0b4de6a9).branch('a'))).toBe(false);
    expect(new Seed(1, 0).branch('a').equals(new Seed(0, 1).branch('a'))).toBe(false);
    expect(ROOT.branch('a').branch('b').equals(ROOT.branch('b').branch('a'))).toBe(false);
    expect(ROOT.branch('ab').equals(ROOT.branch('a').branch('b'))).toBe(false);
    expect(ROOT.branch(1).equals(ROOT.branch(2))).toBe(false);
  });

  test('10,000 sibling branches are all distinct', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 10_000; i++) seen.add(ROOT.branch(i).toString());
    expect(seen.size).toBe(10_000);
  });

  test('sibling branches are uncorrelated: neighbours agree on a coin about half the time', () => {
    let agree = 0;
    const pairs = 4_000;
    for (let i = 0; i < pairs; i++) {
      if (ROOT.branch(i).probability(0.5) === ROOT.branch(i + 1).probability(0.5)) agree++;
    }
    expect(agree / pairs).toBeGreaterThan(0.45);
    expect(agree / pairs).toBeLessThan(0.55);
  });

  test('the helpers of one seed draw from different branches', () => {
    let same = 0;
    for (let i = 0; i < 2_000; i++) {
      const seed = ROOT.branch(i);
      if (seed.range(0, 1) === (seed.probability(0.5) ? 1 : 0)) same++;
    }
    expect(same).toBeGreaterThan(800);
    expect(same).toBeLessThan(1200);
  });
});

describe('Seed — range', () => {
  test('stays inside [min, max], both ends included and both reached', () => {
    const hits = new Set<number>();
    for (let i = 0; i < 2_000; i++) {
      const n = ROOT.branch(i).range(-3, 4);
      expect(Number.isInteger(n)).toBe(true);
      expect(n).toBeGreaterThanOrEqual(-3);
      expect(n).toBeLessThanOrEqual(4);
      hits.add(n);
    }
    expect([...hits].sort((a, b) => a - b)).toEqual([-3, -2, -1, 0, 1, 2, 3, 4]);
  });

  test('a one-value range returns that value; a reversed or fractional range is refused', () => {
    expect(ROOT.range(5, 5)).toBe(5);
    expect(() => ROOT.range(6, 5)).toThrow(RangeError);
    expect(() => ROOT.range(0.5, 3)).toThrow(RangeError);
  });
});

describe('Seed — pick and probability', () => {
  test('pick returns a member and refuses an empty list', () => {
    const items = ['x', 'y', 'z'] as const;
    for (let i = 0; i < 200; i++) expect(items).toContain(ROOT.branch(i).pick(items));
    expect(() => ROOT.pick([])).toThrow(RangeError);
  });

  test('probability 0 never fires, 1 always fires, anything outside [0, 1] is refused', () => {
    for (let i = 0; i < 500; i++) {
      expect(ROOT.branch(i).probability(0)).toBe(false);
      expect(ROOT.branch(i).probability(1)).toBe(true);
    }
    expect(() => ROOT.probability(1.5)).toThrow(RangeError);
    expect(() => ROOT.probability(-0.1)).toThrow(RangeError);
  });
});

describe('Seed — rough uniformity', () => {
  test('20,000 draws over 10 buckets: every bucket within 10% of its share', () => {
    const buckets = new Array<number>(10).fill(0);
    for (let i = 0; i < 20_000; i++) {
      const n = ROOT.branch('cell').branch(i).range(0, 9);
      buckets[n] = (buckets[n] ?? 0) + 1;
    }
    for (const count of buckets) {
      expect(count).toBeGreaterThan(1_800);
      expect(count).toBeLessThan(2_200);
    }
  });

  test('uniform for text keys too, and from a degenerate all-zero root', () => {
    const zero = new Seed(0, 0);
    const buckets = new Array<number>(4).fill(0);
    for (let i = 0; i < 8_000; i++) {
      const n = zero.branch(`room-${String(i)}`).range(0, 3);
      buckets[n] = (buckets[n] ?? 0) + 1;
    }
    for (const count of buckets) {
      expect(count).toBeGreaterThan(1_800);
      expect(count).toBeLessThan(2_200);
    }
  });

  test('probability(0.25) fires about a quarter of the time', () => {
    let fired = 0;
    for (let i = 0; i < 8_000; i++) if (ROOT.branch(i).probability(0.25)) fired++;
    expect(fired / 8_000).toBeGreaterThan(0.22);
    expect(fired / 8_000).toBeLessThan(0.28);
  });
});
