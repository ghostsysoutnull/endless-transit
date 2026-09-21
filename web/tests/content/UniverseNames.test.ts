import { expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { UniverseNamer } from '#engine/procgen/UniverseNamer.ts';
import { Seed } from '#engine/rng/Seed.ts';

const CULTURES = 'themes/cultures';
const library = new ContentLibrary(new BundledContent());
const namer = new UniverseNamer(library);

test('snapshot pin — real content, real kernel: a diff here is a finding, not a chore', () => {
  expect(namer.nameOf(new Seed(0x7f3a91c2, 0x0b4de6a8))).toBe('Lucid Hub');
  expect(namer.nameOf(new Seed(0, 0))).toBe('Cold Tower');
});

test('every culture of the index can name a universe (each has an adjective and a noun list)', () => {
  const cultures = library.index(CULTURES);
  expect(cultures).toHaveLength(10);
  for (const culture of cultures) {
    const [adjective, noun, ...rest] = namer.nameIn(culture, new Seed(11, 13)).split(' ');
    expect(rest, culture).toEqual([]);
    expect(library.list(`names/buildings/adj/${culture}`), culture).toContain(adjective);
    expect(library.list(`names/buildings/noun/${culture}`), culture).toContain(noun);
  }
});

test('seeds reach every culture of the index, and names vary', () => {
  const reached = new Set<string>();
  const names = new Set<string>();
  for (let i = 0; i < 2_000; i++) {
    reached.add(namer.cultureOf(new Seed(i, i * 31)));
    names.add(namer.nameOf(new Seed(i, i * 31)));
  }
  expect([...reached].sort()).toEqual([...library.index(CULTURES)].sort());
  expect(names.size).toBeGreaterThan(500);
});
