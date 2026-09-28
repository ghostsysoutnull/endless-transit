import { describe, expect, test } from 'vitest';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { CorridorWords } from '#engine/procgen/CorridorWords.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';

function words(list: string): CorridorWords {
  return new CorridorWords(
    new ContentLibrary(new MemoryContentSource({ 'themes/descriptions/corridor.txt': list })),
  );
}

describe('a corridor’s words: its sentence and the shape it carries, dealt together', () => {
  test('the shape comes with its sentence, from the same line', () => {
    expect(words('A curved gallery|curved\n').dealt(new Seed(3, 4))).toEqual(['A curved gallery', 'curved']);
  });

  test('a list with a shape the pictures do not know is refused whole, before anything is dealt', () => {
    expect(() => words('A long corridor|long\nA spiral stair|spiral\n')).toThrow(/spiral/);
    expect(() => words('A long corridor|long\nA corridor of nothing|none\n')).toThrow(/none/);
  });
});
