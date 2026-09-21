import { describe, expect, test } from 'vitest';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { UniverseNamer } from '#engine/procgen/UniverseNamer.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';

const library = new ContentLibrary(
  new MemoryContentSource({
    'names/buildings/adj/index.txt': 'void\nrust\n',
    'names/buildings/adj/void.txt': 'Hollow\nSilent\n',
    'names/buildings/adj/rust.txt': 'Corroded\nScrap\n',
    'names/buildings/noun/void.txt': 'Horizon\nReach\n',
    'names/buildings/noun/rust.txt': 'Foundry\nYard\n',
  }),
);
const namer = new UniverseNamer(library);
const NAMES_BY_CULTURE = [/^(Hollow|Silent) (Horizon|Reach)$/, /^(Corroded|Scrap) (Foundry|Yard)$/];

describe('UniverseNamer', () => {
  test('the same seed always gives the same name', () => {
    expect(namer.nameOf(new Seed(1, 2))).toBe(namer.nameOf(new Seed(1, 2)));
  });

  test('a name is an adjective and a noun of ONE culture — never a mix', () => {
    for (let i = 0; i < 300; i++) {
      const name = namer.nameOf(new Seed(i, 99));
      expect(
        NAMES_BY_CULTURE.some((shape) => shape.test(name)),
        name,
      ).toBe(true);
    }
  });

  test('different seeds reach every combination', () => {
    const names = new Set<string>();
    for (let i = 0; i < 300; i++) names.add(namer.nameOf(new Seed(7, i)));
    expect(names.size).toBe(8);
  });
});
