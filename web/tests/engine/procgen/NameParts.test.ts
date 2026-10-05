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
