import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { INSCRIPTION_STYLES } from '#engine/model/InscriptionStyle.ts';
import { axisKeys, NAME_KINDS } from '#tests/support/placeNames.ts';

const bundle = new BundledContent();
const library = new ContentLibrary(bundle);
const CULTURES = 'themes/cultures';

/** directory → stems of its list files (index.txt left out), from the loader's own keys. */
function listsByDirectory(): Map<string, string[]> {
  const byDirectory = new Map<string, string[]>();
  for (const path of bundle.paths()) {
    const cut = path.lastIndexOf('/');
    const directory = path.slice(0, cut);
    const stem = path.slice(cut + 1).replace(/\.txt$/, '');
    const stems = byDirectory.get(directory) ?? [];
    if (stem !== 'index') stems.push(stem);
    byDirectory.set(directory, stems);
  }
  return byDirectory;
}

describe('BundledContent — the one glob', () => {
  test('the bundle holds the lists of every folder, under keys that are plain relative paths', () => {
    expect(bundle.paths()).toContain('names/buildings/adj/void.txt');
    expect(bundle.paths().every((path) => /^[\w/-]+\.txt$/.test(path))).toBe(true);
  });

  test('a directory with an index holds the lists its index names, each a list or a directory of lists; one without is keyed by an axis: its members are that axis’s keys', () => {
    const directories = listsByDirectory();
    const sorted = (words: readonly string[]): string[] => [...words].sort();
    const same = (one: readonly string[], other: readonly string[]): boolean =>
      sorted(one).join('\n') === sorted(other).join('\n');
    /** Every axis a directory of lists can be keyed by, each read from its one owner. */
    const axes: readonly (readonly string[])[] = [
      library.index(CULTURES),
      ...axisKeys(library).values(),
      INSCRIPTION_STYLES.map((style) => style.key()),
    ];
    // A name part keyed by an axis of the vibe is a directory of lists: one per key of the axis its index line names.
    const nameParts = new Map<string, readonly string[]>();
    for (const kind of NAME_KINDS) {
      for (const [part, axis] of library.pairs(`${kind}/index`)) {
        const keys = axisKeys(library).get(axis);
        if (keys !== undefined) nameParts.set(`${kind}/${part}`, keys);
      }
    }
    for (const [directory, stems] of directories) {
      const keys = nameParts.get(directory);
      if (keys !== undefined) {
        expect(sorted(stems), directory).toEqual(sorted(keys));
        continue;
      }
      if (bundle.read(`${directory}/index.txt`) === undefined) {
        expect(
          axes.some((axis) => same(axis, stems)),
          `${directory} has no index, and its members are the keys of no axis: ${stems.join(', ')}`,
        ).toBe(true);
        continue;
      }
      // A name kind's index lines are `part|axis`; any other index is a plain list of names.
      const entries = NAME_KINDS.includes(directory)
        ? library.pairs(`${directory}/index`).map(([part]) => part)
        : library.index(directory);
      expect(new Set(entries).size, `${directory}: duplicate index entry`).toBe(entries.length);
      const lists = entries.filter((entry) => !directories.has(`${directory}/${entry}`));
      expect(sorted(lists), directory).toEqual(sorted(stems));
    }
  });

  test('no second index repeats the culture list', () => {
    const cultures = library.index(CULTURES).join('\n');
    const copies = bundle
      .paths()
      .filter((path) => path.endsWith('/index.txt') && path !== `${CULTURES}/index.txt`)
      .filter((path) => library.list(path.replace(/\.txt$/, '')).join('\n') === cultures);
    expect(copies).toEqual([]);
  });

  test('order comes from the index file, not from the glob: the bundler sorts uppercase first, the index does not', () => {
    const structures = library.index('themes/atmosphere/structures');
    expect(structures).toEqual([
      'abyssal',
      'Agricultural',
      'Ceremonial',
      'Commercial',
      'Industrial',
      'Military',
      'Research',
      'Singularity',
    ]);
    const globOrder = bundle
      .paths()
      .filter((path) => path.startsWith('themes/atmosphere/structures/') && !path.endsWith('/index.txt'))
      .map((path) => path.slice('themes/atmosphere/structures/'.length, -'.txt'.length));
    expect(globOrder).not.toEqual(structures);
  });

  test('the place-name lists of the big world: one directory per kind, its parts in index order, each with its axis', () => {
    expect(library.index('names/filament')).toEqual(['letter|family', 'type|shared']);
    expect(library.index('names/null-reach')).toEqual(['word|shared']);
    expect(library.index('names/sector')).toEqual(['descriptor|shared', 'noun|shared']);
    expect(library.index('names/solar-system')).toEqual(['prefix|shared', 'suffix|shared']);
    expect(library.index('names/planet')).toEqual(['head|culture', 'tail|shared']);
    expect(library.index('names/country')).toEqual(['prefix|shared', 'core|culture', 'suffix|trait']);
    expect(library.index('names/city')).toEqual(['head|culture', 'tail|era']);
    expect(library.index('names/street')).toEqual(['adjective|culture', 'noun|era']);
    expect(library.index('names/buildings/sizes')).toEqual(['small', 'medium', 'large']);
    expect(library.list('themes/traits')).toHaveLength(6);
  });

  test('every culture that can colour a planet is a culture of the index', () => {
    const cultures = library.index(CULTURES);
    const frames = library.pairs('themes/planet-frames');
    expect(frames).toHaveLength(9);
    for (const [culture, colour] of frames) {
      expect(cultures, culture).toContain(culture);
      expect(colour, culture).toMatch(/^[a-z-]+$/);
    }
  });

  test('every list parses to at least one line', () => {
    for (const [directory, stems] of listsByDirectory()) {
      for (const entry of stems) {
        expect(library.list(`${directory}/${entry}`).length, `${directory}/${entry}`).toBeGreaterThan(0);
      }
    }
  });
});
