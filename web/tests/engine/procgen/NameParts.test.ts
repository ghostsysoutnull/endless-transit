import { describe, expect, test } from 'vitest';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Culture } from '#engine/model/Culture.ts';
import { Era } from '#engine/model/Era.ts';
import { Trait } from '#engine/model/Trait.ts';
import { Vibe } from '#engine/model/Vibe.ts';
import { Deal } from '#engine/procgen/Deal.ts';
import { LibraryNames } from '#engine/procgen/LibraryNames.ts';
import { NameAxes } from '#engine/procgen/NameAxes.ts';
import type { NameSlot } from '#engine/procgen/NameSlot.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';

function names(): LibraryNames {
  const library = new ContentLibrary(
    new MemoryContentSource({
      'names/sector/index.txt': 'descriptor|shared\nnoun|shared',
      'names/sector/descriptor.txt': 'Outer\nInner\nCore\nRim',
      'names/sector/noun.txt': 'Grid\nZone\nReach\nMatrix',
      'names/street/index.txt': 'adjective|culture\nnoun|era',
      'names/street/adjective/rust.txt': 'Cinder\nSlag',
      'names/street/adjective/neon.txt': 'Flicker\nChrome',
      'names/street/noun/ancient.txt': 'Causeway\nGate',
      'names/street/noun/digital.txt': 'Loop\nRelay',
      'names/country/index.txt': 'suffix|trait',
      'names/country/suffix/Military.txt': 'Garrison\nMarch',
      'names/odd/index.txt': 'word|colour',
      'names/filament/index.txt': 'letter|family',
      'names/filament/letter/index.txt': 'greek\nrunic\nradio',
      'names/filament/letter/greek.txt': 'Alpha\nBeta\nGamma',
      'names/filament/letter/runic.txt': 'Fehu\nUruz\nAnsuz',
      'names/filament/letter/radio.txt': 'Alfa\nBravo\nCharlie',
    }),
  );
  return new LibraryNames(library, new Deal(), new NameAxes(library));
}

/** Child `index` of one parent: every slot here shares the parent's seed. */
function child(index: number): NameSlot {
  return { parent: { seed: () => new Seed(7, 11) }, index };
}

/** A rust world of the ancient era whose second pair is neon and digital. */
function rustAncient(): Vibe {
  return new Vibe({
    culture: new Culture('rust', 'red'),
    era: new Era('ancient'),
    secondCulture: new Culture('neon', 'cyan'),
    secondEra: new Era('digital'),
  });
}

describe('NameParts — a name is dealt among siblings', () => {
  test('the children of one parent share no word in a part while its list lasts', () => {
    const sectors = names().at('names/sector');
    const dealt = [0, 1, 2, 3].map((index) => sectors.words(child(index), undefined));
    expect(new Set(dealt.map(([descriptor]) => descriptor)).size).toBe(4);
    expect(new Set(dealt.map(([, noun]) => noun)).size).toBe(4);
  });

  test('a child’s words are its parent’s seed and its index: the same whatever was asked before', () => {
    const asked = names().at('names/sector');
    for (const index of [3, 0, 1]) asked.words(child(index), undefined);
    expect(asked.words(child(2), undefined)).toEqual(names().at('names/sector').words(child(2), undefined));
  });

  test('a name with no parent to deal it is refused', () => {
    expect(() => names().at('names/sector').words({ parent: undefined, index: 0 }, undefined)).toThrow(
      /parent/,
    );
  });
});

describe('NameParts — a keyed part reads the list of the vibe in force', () => {
  test('the culture names one list and the era another; a rebel district’s swapped pair names the others', () => {
    const streets = names().at('names/street');
    const [adjective, noun] = streets.words(child(0), rustAncient());
    expect(['Cinder', 'Slag']).toContain(adjective);
    expect(['Causeway', 'Gate']).toContain(noun);
    const [rebelAdjective, rebelNoun] = streets.words(child(0), rustAncient().rebel());
    expect(['Flicker', 'Chrome']).toContain(rebelAdjective);
    expect(['Loop', 'Relay']).toContain(rebelNoun);
  });

  test('a country’s trait names its list', () => {
    const vibe = rustAncient().mutate(new Trait('Military'), 0);
    expect(['Garrison', 'March']).toContain(names().at('names/country').words(child(0), vibe)[0]);
  });

  test('refused: a keyed part with no vibe, a trait part above the country, an axis nobody knows', () => {
    expect(() => names().at('names/street').words(child(0), undefined)).toThrow(/vibe/);
    expect(() => names().at('names/country').words(child(0), rustAncient())).toThrow(/trait/);
    expect(() => names().at('names/odd').words(child(0), rustAncient())).toThrow(/colour/);
  });
});

describe('NameParts — a family part: one list of its own index for all the children of a parent', () => {
  const LISTS = [
    ['Alpha', 'Beta', 'Gamma'],
    ['Fehu', 'Uruz', 'Ansuz'],
    ['Alfa', 'Bravo', 'Charlie'],
  ];
  /** The three children of the parent born from this seed, each by its one word. */
  function family(parent: Seed): string[] {
    const filaments = names().at('names/filament');
    return [0, 1, 2].map((index) =>
      String(filaments.words({ parent: { seed: () => parent }, index }, undefined)[0]),
    );
  }

  test('the children of one parent read one list, and share no word of it', () => {
    for (let n = 0; n < 20; n++) {
      const words = family(new Seed(n, 5));
      expect(
        LISTS.some((list) => words.every((word) => list.includes(word))),
        words.join(' '),
      ).toBe(true);
      expect(new Set(words).size).toBe(3);
    }
  });

  test('the list is the parent’s: over twenty parents every list of the index is read', () => {
    const read = new Set<number>();
    for (let n = 0; n < 20; n++) {
      const [first] = family(new Seed(n, 5));
      read.add(LISTS.findIndex((list) => list.includes(first ?? '')));
    }
    expect([...read].sort()).toEqual([0, 1, 2]);
  });
});
