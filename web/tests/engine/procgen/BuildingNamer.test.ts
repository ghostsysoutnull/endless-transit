import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Culture } from '#engine/model/Culture.ts';
import { BuildingNamer } from '#engine/procgen/BuildingNamer.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';
import { sampleSeed } from '#tests/support/world.ts';

const namer = new BuildingNamer(new ContentLibrary(new BundledContent()));

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
      'names/buildings/compounds.txt': 'Spire',
      'names/buildings/noun/neon.txt': 'Hall',
      'names/buildings/adj/neon.txt': 'Bright',
      // Not the words the game ships: the index alone says which lists exist, smallest first.
      'names/buildings/sizes/index.txt': 'tiny\nmiddling\nhuge',
      'names/buildings/sizes/tiny.txt': 'Nook',
      'names/buildings/sizes/middling.txt': 'Yard',
      'names/buildings/sizes/huge.txt': 'Mountain',
    }),
  );
  const renamed = new BuildingNamer(words);
  const neon = new Culture('neon', 'bright-cyan');
  const unitWord = (floors: number): string => {
    for (let n = 0; n < 5_000; n++) {
      const name = renamed.nameOf(sampleSeed(n), { culture: neon, floors, depth: 7, landmarkFactor: 1 }).name;
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
