import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';

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
    const materials = library.pairs('themes/doors/materials');
    const states = library.pairs('themes/doors/states');
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

  test('4 sentence variants per described kind, 8 colours', () => {
    for (const kind of library.index('themes/descriptions')) {
      atLeast(`descriptions/${kind}`, library.list(`themes/descriptions/${kind}`), 4);
    }
    for (const line of library.list('themes/descriptions/floor')) expect(line).toContain('{culture}');
    atLeast('colours', library.list('themes/colours'), 8);
  });
});
