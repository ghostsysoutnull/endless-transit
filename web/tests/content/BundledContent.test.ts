import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';

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
  test('the fork is complete: 78 files, keys are plain relative paths', () => {
    expect(bundle.paths()).toHaveLength(78);
    expect(bundle.paths()).toContain('names/buildings/adj/void.txt');
    expect(bundle.paths().every((path) => /^[\w/-]+\.txt$/.test(path))).toBe(true);
  });

  test('every directory with lists has an index.txt equal to its loader keys — or is keyed by culture', () => {
    const directories = listsByDirectory();
    expect(directories.size).toBe(10);
    const keyedByCulture: string[] = [];
    for (const [directory, stems] of directories) {
      if (bundle.read(`${directory}/index.txt`) === undefined) {
        // No index of its own: its members ARE the cultures. One owner — `themes/cultures/index`.
        expect([...stems].sort(), directory).toEqual([...library.index(CULTURES)].sort());
        keyedByCulture.push(directory);
        continue;
      }
      const index = library.index(directory);
      expect(new Set(index).size, `${directory}: duplicate index entry`).toBe(index.length);
      expect([...index].sort(), directory).toEqual([...stems].sort());
    }
    expect(keyedByCulture.sort()).toEqual([
      'names/buildings/adj',
      'names/buildings/noun',
      'themes/atmosphere/walls',
    ]);
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

  test('every list parses to at least one line', () => {
    for (const [directory, stems] of listsByDirectory()) {
      for (const entry of stems) {
        expect(library.list(`${directory}/${entry}`).length, `${directory}/${entry}`).toBeGreaterThan(0);
      }
    }
  });
});
