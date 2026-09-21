import { expect, test } from 'vitest';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { ThemeCatalog } from '#engine/procgen/ThemeCatalog.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';

const catalog = new ThemeCatalog(
  new ContentLibrary(
    new MemoryContentSource({
      'themes/planet-frames.txt': 'rust|red\nneon|bright-cyan\n',
      'themes/timelines/index.txt': 'entropic\nanalog\n',
      'themes/traits.txt': 'Military\nCeremonial\n',
    }),
  ),
);

test('the cultures a planet can have are the planet-frames list, in file order, each with its frame colour', () => {
  expect(catalog.surfaceCultures().map((culture) => [culture.key(), culture.frame()])).toEqual([
    ['rust', 'red'],
    ['neon', 'bright-cyan'],
  ]);
});

test('eras are the timelines index and traits the traits list — in the order written, never sorted', () => {
  expect(catalog.eras().map((era) => era.key())).toEqual(['entropic', 'analog']);
  expect(catalog.traits().map((trait) => trait.key())).toEqual(['Military', 'Ceremonial']);
});

test('the values are built once: the same object answers every time', () => {
  expect(catalog.surfaceCultures()).toBe(catalog.surfaceCultures());
  expect(catalog.eras()).toBe(catalog.eras());
  expect(catalog.traits()).toBe(catalog.traits());
});
