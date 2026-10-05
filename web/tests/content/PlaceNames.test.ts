import { expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Location } from '#engine/model/Location.ts';
import { must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();
const library = new ContentLibrary(new BundledContent());
const SEEDS = 150;

/** One walk per seed from the universe to a street, the branch taken at each level varying with the seed. */
function walks(): Location[][] {
  return Array.from({ length: SEEDS }, (_, n) =>
    toStreet(registry.universe(sampleSeed(n)), (_children, depth) => n * 7 + depth * 3 + (n >> depth)),
  );
}

function placeOf(walk: readonly Location[], kind: string): Location {
  return must(
    walk.find((place) => place.kind().key() === kind),
    `a ${kind} on the walk`,
  );
}

test('from the filaments down to the streets, no two places listed together carry the same name', () => {
  for (const walk of walks()) {
    for (const parent of walk.slice(0, -1)) {
      const names = parent.children().map((child) => child.name());
      expect(new Set(names).size, `${parent.name()}: ${names.join(' | ')}`).toBe(names.length);
    }
  }
});

test('the filaments of a universe are lettered in one alphabet, and two universes need not share it', () => {
  const alphabets = library.index('names/filament/letter');
  const used = new Set<string>();
  for (const [universe] of walks()) {
    const letters = must(universe, 'a universe')
      .children()
      .map((filament) => filament.name().split('-')[0] ?? '');
    const theirs = alphabets.filter((alphabet) => {
      const list = library.list(`names/filament/letter/${alphabet}`);
      return letters.every((letter) => list.includes(letter));
    });
    expect(theirs.length, letters.join(' ')).toBeGreaterThan(0);
    for (const alphabet of theirs) used.add(alphabet);
  }
  expect(used.size).toBeGreaterThan(1);
});

test('a Null Reach is the words Null Reach and a word of its own list', () => {
  const words = library.list('names/null-reach/word');
  const reaches = walks()
    .flatMap((walk) => placeOf(walk, 'filament').children())
    .filter((node) => node.kind().key() === 'null-reach');
  expect(reaches.length).toBeGreaterThan(50);
  for (const reach of reaches) {
    expect(reach.name().startsWith('Null Reach '), reach.name()).toBe(true);
    expect(words, reach.name()).toContain(reach.name().slice('Null Reach '.length));
  }
});

test('a city and its streets are named in the words of the vibe in force — a rebel district in its swapped pair', () => {
  let rebels = 0;
  for (const walk of walks()) {
    for (const city of placeOf(walk, 'country').children()) {
      const vibe = must(city.vibe(), 'a city’s vibe');
      if (city.facts().some((fact) => fact.key === 'alert')) rebels++;
      const heads = library.list(`names/city/head/${vibe.culture().key()}`);
      expect(
        heads.some((head) => city.name().startsWith(head)),
        city.name(),
      ).toBe(true);
    }
    const city = placeOf(walk, 'city');
    const vibe = must(city.vibe(), 'a city’s vibe');
    for (const street of city.children()) {
      const words = street.name().split(' ');
      expect(library.list(`names/street/adjective/${vibe.culture().key()}`), street.name()).toContain(
        words[0],
      );
      expect(library.list(`names/street/noun/${vibe.era().key()}`), street.name()).toContain(words.at(-1));
    }
  }
  expect(rebels).toBeGreaterThan(0);
});
