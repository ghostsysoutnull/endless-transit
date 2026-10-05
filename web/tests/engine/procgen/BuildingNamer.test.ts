import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Culture } from '#engine/model/Culture.ts';
import { Era } from '#engine/model/Era.ts';
import { BuildingNamer } from '#engine/procgen/BuildingNamer.ts';
import type { BuildingSite } from '#engine/procgen/BuildingSite.ts';
import { Deal } from '#engine/procgen/Deal.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';
import { sampleSeed } from '#tests/support/world.ts';

const namer = new BuildingNamer(new ContentLibrary(new BundledContent()), new Deal());

/** Building `index` of one street: a neon street of the digital era, at a street's depth, unless the test says otherwise. */
function site(index: number, facts: Partial<BuildingSite> = {}): BuildingSite {
  return {
    street: new Seed(3, 5),
    index,
    culture: new Culture('neon', 'bright-cyan'),
    era: new Era('digital'),
    floors: 12,
    depth: 7,
    landmarkFactor: 1,
    ...facts,
  };
}

describe('BuildingNamer — the landmark chance, in ten-thousandths (Guide, "Landmarks", "Null Reaches"; NameGenerator.groovy:152-157)', () => {
  test.each([
    // depth, factor, chance
    [0, 1, 300],
    [5, 1, 300], // a country: still no bonus — the bonus starts BELOW depth 5
    [6, 1, 350],
    [7, 1, 400], // a street: the Guide's 4%
    [5, 2, 600],
    [6, 2, 700],
    [7, 2, 800], // a street under a Null Reach: the Guide's 8%
  ])('depth %i, factor %i → %i / 10 000', (depth, factor, chance) => {
    expect(namer.landmarkChance(depth, factor)).toBe(chance);
  });

  test('never more than 25%, however deep and whatever the factor', () => {
    expect(namer.landmarkChance(48, 1)).toBe(2450);
    expect(namer.landmarkChance(49, 1)).toBe(2500);
    expect(namer.landmarkChance(50, 1)).toBe(2500);
    expect(namer.landmarkChance(7, 6)).toBe(2400);
    expect(namer.landmarkChance(7, 7)).toBe(2500);
    expect(namer.landmarkChance(500, 3)).toBe(2500);
  });
});

describe('BuildingNamer — the size words of a "Unit 0x…" name', () => {
  const words = new ContentLibrary(
    new MemoryContentSource({
      'names/buildings/landmarks.txt': 'The Landmark',
      'names/buildings/concepts.txt': 'Time',
      'names/buildings/compounds/digital.txt': 'Spire',
      'names/buildings/noun/neon.txt': 'Hall',
      'names/buildings/adj/neon.txt': 'Bright',
      // Not the words the game ships: the index alone says which lists exist, smallest first.
      'names/buildings/sizes/index.txt': 'tiny\nmiddling\nhuge',
      'names/buildings/sizes/tiny.txt': 'Nook',
      'names/buildings/sizes/middling.txt': 'Yard',
      'names/buildings/sizes/huge.txt': 'Mountain',
    }),
  );
  const renamed = new BuildingNamer(words, new Deal());
  const unitWord = (floors: number): string => {
    for (let n = 0; n < 5_000; n++) {
      const name = renamed.nameOf(sampleSeed(n), site(0, { floors })).name;
      if (name.startsWith('Unit 0x')) return name.split(' ')[2] ?? '';
    }
    throw new Error('no "Unit 0x…" name in 5 000 seeds');
  };

  test('the lists are the ones the index names, smallest first: under 10 floors, under 20, anything taller', () => {
    expect(unitWord(3)).toBe('Nook');
    expect(unitWord(9)).toBe('Nook');
    expect(unitWord(10)).toBe('Yard');
    expect(unitWord(19)).toBe('Yard');
    expect(unitWord(20)).toBe('Mountain');
    expect(unitWord(100)).toBe('Mountain');
  });
});

describe('BuildingNamer — the words are dealt along the street', () => {
  /** The buildings of one street, as many as the longest holds; each rolls its pattern on its own seed. */
  function street(seed: Seed, facts: Partial<BuildingSite> = {}): { name: string; landmark: boolean }[] {
    return Array.from({ length: 22 }, (_, index) =>
      namer.nameOf(seed.child(index), site(index, { street: seed, ...facts })),
    );
  }

  test('no two buildings of a street carry the same name', () => {
    for (let n = 0; n < 60; n++) {
      const names = street(sampleSeed(n)).map((building) => building.name);
      expect(new Set(names).size, names.join(' | ')).toBe(names.length);
    }
  });

  test('no landmark title comes twice on a street, however many landmarks it holds', () => {
    for (let n = 0; n < 60; n++) {
      const titles = street(sampleSeed(n), { landmarkFactor: 6 })
        .filter((building) => building.landmark)
        .map((building) => building.name);
      expect(titles.length, 'a street with several landmarks').toBeGreaterThan(1);
      expect(new Set(titles).size, titles.join(' | ')).toBe(titles.length);
    }
  });

  test('a glued name ends in a word of the street’s era', () => {
    const library = new ContentLibrary(new BundledContent());
    const endings = library.list('names/buildings/compounds/digital');
    const elsewhere = library.list('names/buildings/compounds/ancient');
    const glued = street(sampleSeed(1))
      .map((building) => building.name)
      .filter((name) => !name.includes(' '));
    expect(glued.length).toBeGreaterThan(0);
    for (const name of glued) {
      expect(
        endings.some((ending) => name.endsWith(ending)),
        name,
      ).toBe(true);
      expect(
        elsewhere.some((ending) => name.endsWith(ending)),
        name,
      ).toBe(false);
    }
  });
});
