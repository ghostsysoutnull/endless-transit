import { describe, expect, test } from 'vitest';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';

describe('ContentLibrary', () => {
  test('a list is its lines, trimmed, blank lines dropped, file order kept (LF or CRLF)', () => {
    const source = new MemoryContentSource({
      'themes/conditions.txt': '  cracked \r\n\r\nhumming\n\n pristine\n',
    });
    expect(new ContentLibrary(source).list('themes/conditions')).toEqual(['cracked', 'humming', 'pristine']);
  });

  test('a directory index is read from its index.txt, in the order written there — never sorted', () => {
    const source = new MemoryContentSource({
      'themes/structures/index.txt': 'abyssal\nAgricultural\nzenith\nCeremonial\n',
    });
    expect(new ContentLibrary(source).index('themes/structures')).toEqual([
      'abyssal',
      'Agricultural',
      'zenith',
      'Ceremonial',
    ]);
  });

  test('pairs: a "key|value" list keeps file order, trims both sides; a line without "|" is an error', () => {
    const library = new ContentLibrary(
      new MemoryContentSource({ 'frames.txt': 'rust | red\nvoid|grey\n', 'bad.txt': 'rust|red\nlonely\n' }),
    );
    expect(library.pairs('frames')).toEqual([
      ['rust', 'red'],
      ['void', 'grey'],
    ]);
    expect(() => library.pairs('bad')).toThrow(/bad\.txt.*lonely/);
  });

  test('a missing or empty list is an error, never a silent empty default', () => {
    const library = new ContentLibrary(new MemoryContentSource({ 'blank.txt': '\n  \n' }));
    expect(() => library.list('themes/nowhere')).toThrow(/themes\/nowhere\.txt/);
    expect(() => library.index('themes/nowhere')).toThrow(/themes\/nowhere\/index\.txt/);
    expect(() => library.list('blank')).toThrow(/blank\.txt/);
  });

  test('each list is read and parsed once', () => {
    const source = new MemoryContentSource({ 'a.txt': 'one\ntwo\n' });
    const library = new ContentLibrary(source);
    expect(library.list('a')).toBe(library.list('a'));
    expect(source.reads()).toBe(1);
  });
});
