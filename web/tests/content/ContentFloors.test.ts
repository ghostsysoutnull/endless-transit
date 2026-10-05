import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { doorStateLook } from '#engine/model/DoorStateLook.ts';
import { materialFamily } from '#engine/model/MaterialFamily.ts';

const library = new ContentLibrary(new BundledContent());
const CULTURES = library.index('themes/cultures');
const ERAS = library.index('themes/timelines');
const TRAITS = library.list('themes/traits');
/** The two structure keys the atmosphere glitch can pick besides a trait (ThemeService.groovy:108). */
const GLITCH_STRUCTURES = ['abyssal', 'Singularity'];
/** The abyssal lists are the largest by design, but were grown to eight, not ten (HK-016 step 3). */
const ABYSSAL = 'abyssal';

/**
 * The variety floors of HK-016 step 3 (`ThemeResourceCoverageTest.groovy`): a grown list is the ceiling on
 * variety now, so a shrunken or duplicated list is a regression. Every key of every index has its own
 * file, so no `[THEME_WARN]` fallback can fire on the bundled content.
 */
function atLeast(what: string, lines: readonly string[], floor: number): void {
  expect(
    lines.length,
    `${what}: ${String(lines.length)} lines, floor is ${String(floor)}`,
  ).toBeGreaterThanOrEqual(floor);
  expect(new Set(lines).size, `${what}: duplicate lines`).toBe(lines.length);
}

describe('every key of every index has its own file (HK-016 step 1)', () => {
  test('every culture has walls, relics, and an adjective and a noun lexicon', () => {
    expect(CULTURES.length).toBe(10);
    for (const culture of CULTURES) {
      expect(library.list(`themes/atmosphere/walls/${culture}`).length, culture).toBeGreaterThan(0);
      expect(library.list(`themes/cultures/${culture}`).length, culture).toBeGreaterThan(0);
      expect(library.list(`names/buildings/adj/${culture}`).length, culture).toBeGreaterThan(0);
      expect(library.list(`names/buildings/noun/${culture}`).length, culture).toBeGreaterThan(0);
    }
  });

  test('every era has lighting and relics; the abyssal lighting exists for the glitch', () => {
    expect(ERAS.length).toBe(8);
    for (const era of ERAS) {
      expect(library.list(`themes/atmosphere/lighting/${era}`).length, era).toBeGreaterThan(0);
      expect(library.list(`themes/timelines/${era}`).length, era).toBeGreaterThan(0);
    }
    expect(new Set(library.index('themes/atmosphere/lighting'))).toEqual(new Set([ABYSSAL, ...ERAS]));
  });

  test('every trait has structures and four room kinds; so do the two glitch structures', () => {
    expect(TRAITS.length).toBe(6);
    for (const key of [...TRAITS, ...GLITCH_STRUCTURES]) {
      expect(library.list(`themes/atmosphere/structures/${key}`).length, key).toBeGreaterThan(0);
    }
    for (const trait of TRAITS) expect(library.pairs(`names/rooms/${trait}`), trait).toHaveLength(4);
    expect(new Set(library.index('themes/atmosphere/structures'))).toEqual(
      new Set([ABYSSAL, ...TRAITS, 'Singularity']),
    );
  });
});

describe('list floors (HK-016 step 3; a list may only grow)', () => {
  test('16 relics per culture and per era', () => {
    for (const culture of CULTURES)
      atLeast(`cultures/${culture}`, library.list(`themes/cultures/${culture}`), 16);
    for (const era of ERAS) atLeast(`timelines/${era}`, library.list(`themes/timelines/${era}`), 16);
  });

  test('16 furniture conditions, each one word so a furnishing never doubles its first word by accident', () => {
    const conditions = library.list('themes/conditions');
    atLeast('conditions', conditions, 16);
    for (const condition of conditions) expect(condition, condition).toMatch(/^[a-z-]+$/);
  });

  test('10 lines of walls, lighting and structures per key (8 for the abyssal ones)', () => {
    for (const culture of CULTURES) {
      atLeast(
        `walls/${culture}`,
        library.list(`themes/atmosphere/walls/${culture}`),
        culture === ABYSSAL ? 8 : 10,
      );
    }
    for (const key of library.index('themes/atmosphere/lighting')) {
      atLeast(`lighting/${key}`, library.list(`themes/atmosphere/lighting/${key}`), key === ABYSSAL ? 8 : 10);
    }
    for (const key of library.index('themes/atmosphere/structures')) {
      atLeast(
        `structures/${key}`,
        library.list(`themes/atmosphere/structures/${key}`),
        key === ABYSSAL ? 8 : 10,
      );
    }
  });

  test('12 adjectives and 12 nouns per culture lexicon', () => {
    for (const culture of CULTURES) {
      atLeast(`adj/${culture}`, library.list(`names/buildings/adj/${culture}`), 12);
      atLeast(`noun/${culture}`, library.list(`names/buildings/noun/${culture}`), 12);
    }
  });

  test('12 door materials and 12 states, each with a narrative; 12 inscription words', () => {
    const materials = library.triples('themes/doors/materials');
    const states = library.triples('themes/doors/states');
    atLeast(
      'doors/materials',
      materials.map(([name]) => name),
      12,
    );
    atLeast(
      'doors/states',
      states.map(([name]) => name),
      12,
    );
    atLeast('doors/inscriptions', library.list('themes/doors/inscriptions'), 12);
    for (const [name, narrative] of [...materials, ...states]) expect(narrative, name).not.toBe('');
    expect(states.map(([name]) => name)).toContain('Stable');
  });

  test('every door state and material carries a look key the pictures know; frozen, cold and static doors look so', () => {
    const states = library.triples('themes/doors/states');
    for (const [name, , key] of states) expect(() => doorStateLook(key), name).not.toThrow();
    for (const [name, , key] of library.triples('themes/doors/materials'))
      expect(() => materialFamily(key), name).not.toThrow();
    const looks = new Map(states.map(([name, , key]) => [name, key]));
    expect([looks.get('Frozen'), looks.get('Cold'), looks.get('Static'), looks.get('Stable')]).toEqual([
      'frost',
      'cold',
      'static',
      'plain',
    ]);
  });

  test('4 sentence variants per described kind, 8 colours', () => {
    for (const kind of library.index('themes/descriptions')) {
      atLeast(`descriptions/${kind}`, library.list(`themes/descriptions/${kind}`), 4);
    }
    for (const line of library.list('themes/descriptions/floor')) expect(line).toContain('{culture}');
    atLeast('colours', library.list('themes/colours'), 8);
  });
});

describe('place names: every list outlasts the siblings it is dealt among, and no word could be said twice', () => {
  const AXIS_KEYS: ReadonlyMap<string, readonly string[]> = new Map([
    ['culture', library.pairs('themes/planet-frames').map(([culture]) => culture)],
    ['era', ERAS],
    ['trait', TRAITS],
  ]);
  /** Each part's floor: at least the most siblings its kind can have, so a deal never starts over in one parent. */
  const FLOORS: ReadonlyMap<string, ReadonlyMap<string, number>> = new Map([
    [
      'names/filament',
      new Map([
        ['greek', 12],
        ['type', 8],
      ]),
    ],
    [
      'names/sector',
      new Map([
        ['descriptor', 24],
        ['noun', 24],
      ]),
    ],
    [
      'names/solar-system',
      new Map([
        ['prefix', 48],
        ['suffix', 32],
      ]),
    ],
    [
      'names/planet',
      new Map([
        ['head', 12],
        ['tail', 30],
      ]),
    ],
    [
      'names/country',
      new Map([
        ['prefix', 30],
        ['core', 12],
        ['suffix', 10],
      ]),
    ],
    [
      'names/city',
      new Map([
        ['head', 14],
        ['tail', 14],
      ]),
    ],
    [
      'names/street',
      new Map([
        ['adjective', 16],
        ['noun', 16],
      ]),
    ],
  ]);

  /** The lists of one part, by path: its one list, or one per key of its axis. */
  function listsOf(kind: string, part: string, axis: string): Map<string, readonly string[]> {
    const paths = AXIS_KEYS.get(axis)?.map((key) => `${kind}/${part}/${key}`) ?? [`${kind}/${part}`];
    return new Map(paths.map((path) => [path, library.list(path)]));
  }

  test.each([...FLOORS])('%s: every list of every part reaches its floor', (kind, floors) => {
    const parts = library.pairs(`${kind}/index`);
    expect(parts.map(([part]) => part)).toEqual([...floors.keys()]);
    for (const [part, axis] of parts) {
      for (const [path, words] of listsOf(kind, part, axis))
        atLeast(path, words, floors.get(part) ?? Infinity);
    }
  });

  test.each([...FLOORS.keys()])(
    '%s: no word sits in two of its lists, whatever the part or the key',
    (kind) => {
      const words = library
        .pairs(`${kind}/index`)
        .flatMap(([part, axis]) => [...listsOf(kind, part, axis).values()].flat())
        .map((word) => word.toLowerCase());
      expect(words.filter((word, at) => words.indexOf(word) !== at)).toEqual([]);
    },
  );
});
