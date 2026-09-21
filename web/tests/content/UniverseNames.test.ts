import { expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { UniverseNamer } from '#engine/procgen/UniverseNamer.ts';
import { Seed } from '#engine/rng/Seed.ts';

const namer = new UniverseNamer(new ContentLibrary(new BundledContent()));

test('snapshot pin — real content, real kernel: a diff here is a finding, not a chore', () => {
  expect(namer.nameOf(new Seed(0x7f3a91c2, 0x0b4de6a8))).toBe('Lucid Hub');
  expect(namer.nameOf(new Seed(0, 0))).toBe('Cold Tower');
});

test('every culture of the index can name a universe (each has an adjective and a noun list)', () => {
  const names = new Set<string>();
  for (let i = 0; i < 2_000; i++) names.add(namer.nameOf(new Seed(i, i * 31)));
  expect(names.size).toBeGreaterThan(500);
});
