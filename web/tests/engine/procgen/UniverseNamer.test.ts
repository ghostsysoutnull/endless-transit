import { describe, expect, test } from 'vitest';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { UniverseNamer } from '#engine/procgen/UniverseNamer.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';

const library = new ContentLibrary(
  new MemoryContentSource({
    'themes/cultures/index.txt': 'void\nrust\n',
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

  test('which cultures exist has ONE owner — themes/cultures/index — and no list directory carries a copy', () => {
    const owner = new MemoryContentSource({
      'themes/cultures/index.txt': 'rust\n',
      'names/buildings/adj/index.txt': 'void\n',
      'names/buildings/noun/index.txt': 'void\n',
      'names/buildings/adj/void.txt': 'Hollow\n',
      'names/buildings/noun/void.txt': 'Reach\n',
      'names/buildings/adj/rust.txt': 'Scrap\n',
      'names/buildings/noun/rust.txt': 'Yard\n',
    });
    expect(new UniverseNamer(new ContentLibrary(owner)).nameOf(new Seed(3, 4))).toBe('Scrap Yard');
  });

  test('a culture of the index without its word lists is an error, never a silent default', () => {
    const broken = new MemoryContentSource({
      'themes/cultures/index.txt': 'void\n',
      'names/buildings/adj/void.txt': 'Hollow\n',
    });
    expect(() => new UniverseNamer(new ContentLibrary(broken)).nameOf(new Seed(3, 4))).toThrow(
      /names\/buildings\/noun\/void\.txt/,
    );
  });

  test('nameOf is nameIn(cultureOf): the culture is drawn once, then both words come from it', () => {
    for (let i = 0; i < 50; i++) {
      const seed = new Seed(i, 5);
      expect(namer.nameOf(seed)).toBe(namer.nameIn(namer.cultureOf(seed), seed));
    }
    expect(namer.nameIn('rust', new Seed(1, 1))).toMatch(/^(Corroded|Scrap) (Foundry|Yard)$/);
    expect(namer.nameIn('void', new Seed(1, 1))).toMatch(/^(Hollow|Silent) (Horizon|Reach)$/);
  });

  test('different seeds reach every combination', () => {
    const names = new Set<string>();
    for (let i = 0; i < 300; i++) names.add(namer.nameOf(new Seed(7, i)));
    expect(names.size).toBe(8);
  });
});
