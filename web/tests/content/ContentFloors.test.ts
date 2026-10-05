import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { doorStateLook } from '#engine/model/DoorStateLook.ts';
import { materialFamily } from '#engine/model/MaterialFamily.ts';
import { INSCRIPTION_STYLES } from '#engine/model/InscriptionStyle.ts';
import { FAMILY, listsOfPart, NAME_KINDS } from '#tests/support/placeNames.ts';
import { must } from '#tests/support/world.ts';

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

  test('every trait has structures and room kinds; so do the two glitch structures', () => {
    expect(TRAITS.length).toBe(6);
    for (const key of [...TRAITS, ...GLITCH_STRUCTURES]) {
      expect(library.list(`themes/atmosphere/structures/${key}`).length, key).toBeGreaterThan(0);
    }
    for (const trait of TRAITS)
      expect(library.pairs(`names/rooms/${trait}`).length, trait).toBeGreaterThan(0);
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

  test('24 adjectives and 24 nouns per culture lexicon — a street holds up to 22 buildings — and no adjective is also a noun of its culture', () => {
    for (const culture of CULTURES) {
      const adjectives = library.list(`names/buildings/adj/${culture}`);
      const nouns = library.list(`names/buildings/noun/${culture}`);
      atLeast(`adj/${culture}`, adjectives, 24);
      atLeast(`noun/${culture}`, nouns, 24);
      expect(
        adjectives.filter((word) => nouns.includes(word)),
        culture,
      ).toEqual([]);
    }
  });

  test('12 building endings per era, none of them a building noun of any culture; 24 concepts; 32 landmark titles, more than a street has buildings', () => {
    const nouns = new Set(CULTURES.flatMap((culture) => library.list(`names/buildings/noun/${culture}`)));
    for (const era of ERAS) {
      const endings = library.list(`names/buildings/compounds/${era}`);
      atLeast(`compounds/${era}`, endings, 12);
      expect(
        endings.filter((ending) => nouns.has(ending)),
        era,
      ).toEqual([]);
    }
    atLeast('concepts', library.list('names/buildings/concepts'), 24);
    atLeast('landmarks', library.list('names/buildings/landmarks'), 32);
  });

  test('16 room kinds per trait — an apartment holds up to 10 rooms — and no kind in two traits', () => {
    const kinds = TRAITS.flatMap((trait) => {
      const names = library.pairs(`names/rooms/${trait}`).map(([name]) => name);
      atLeast(`rooms/${trait}`, names, 16);
      return names;
    });
    expect(kinds.filter((kind, at) => kinds.indexOf(kind) !== at)).toEqual([]);
  });

  test('floor zones per trait: 4 lobby words, 4 peak words, 12 per height band; none named like a room kind or a door word', () => {
    const rooms = TRAITS.flatMap((trait) => library.pairs(`names/rooms/${trait}`).map(([name]) => name));
    const taken = new Set([
      ...rooms.map((name) => name.toUpperCase().replace(/[ -]/g, '_')),
      ...INSCRIPTION_STYLES.flatMap((style) => library.list(`themes/doors/inscriptions/${style.key()}`)),
      'DATA_VAULT',
      'DANGER',
    ]);
    const parts: readonly (readonly [string, number])[] = [
      ['lobby', 4],
      ['peak', 4],
      ...library.index('names/floors/zones').map((band) => [`zones/${band}`, 12] as const),
    ];
    for (const trait of TRAITS) {
      for (const [part, floor] of parts) {
        const zones = library.list(`names/floors/${part}/${trait}`);
        atLeast(`floors/${part}/${trait}`, zones, floor);
        expect(
          zones.filter((zone) => taken.has(zone)),
          `${part}/${trait}`,
        ).toEqual([]);
      }
    }
  });

  test('12 door materials per culture and 12 states per era, each with a narrative; every era keeps its stable door', () => {
    for (const culture of CULTURES) {
      const materials = library.triples(`themes/doors/materials/${culture}`);
      atLeast(
        `doors/materials/${culture}`,
        materials.map(([name]) => name),
        12,
      );
      for (const [name, narrative] of materials) expect(narrative, name).not.toBe('');
    }
    for (const era of ERAS) {
      const states = library.triples(`themes/doors/states/${era}`);
      atLeast(
        `doors/states/${era}`,
        states.map(([name]) => name),
        12,
      );
      for (const [name, narrative] of states) expect(narrative, name).not.toBe('');
      expect(
        states.map(([name]) => name),
        era,
      ).toContain('Stable');
    }
  });

  test('every door state and material carries a look key the pictures know; every era has a frosted, a cold and a motionless door, and its stable one is plain', () => {
    for (const culture of CULTURES) {
      for (const [name, , key] of library.triples(`themes/doors/materials/${culture}`))
        expect(() => materialFamily(key), name).not.toThrow();
    }
    for (const era of ERAS) {
      const states = library.triples(`themes/doors/states/${era}`);
      for (const [name, , key] of states) expect(() => doorStateLook(key), name).not.toThrow();
      expect(new Set(states.map(([, , key]) => key)), era).toEqual(
        new Set(['frost', 'cold', 'static', 'plain']),
      );
      expect(states.find(([name]) => name === 'Stable')?.[2], era).toBe('plain');
    }
  });

  test('16 door words per way of writing; no word in two of them, and none of them one of the two guarantees', () => {
    const words = INSCRIPTION_STYLES.flatMap((style) => {
      const list = library.list(`themes/doors/inscriptions/${style.key()}`);
      atLeast(`doors/inscriptions/${style.key()}`, list, 16);
      return list;
    });
    expect(words.filter((word, at) => words.indexOf(word) !== at)).toEqual([]);
    expect(words).not.toContain('DATA_VAULT');
    expect(words).not.toContain('DANGER');
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
  /** Each part's floor: at least the most siblings its kind can have, so a deal never starts over in one parent. */
  const FLOORS: Readonly<Record<string, Readonly<Record<string, number>>>> = {
    'names/filament': { letter: 20, type: 24 },
    'names/sector': { descriptor: 24, noun: 24 },
    'names/null-reach': { word: 24 },
    'names/solar-system': { prefix: 48, suffix: 32 },
    'names/planet': { head: 12, tail: 30 },
    'names/country': { prefix: 30, core: 12, suffix: 10 },
    'names/city': { head: 14, tail: 14 },
    'names/street': { adjective: 16, noun: 16 },
  };

  test.each(NAME_KINDS)('%s: every list of every part reaches its floor', (kind) => {
    const floors = must(FLOORS[kind], `the floors of ${kind}`);
    for (const [part, axis] of library.pairs(`${kind}/index`)) {
      const floor = must(floors[part], `a floor for ${kind}/${part}`);
      for (const [path, words] of listsOfPart(library, kind, part, axis)) atLeast(path, words, floor);
    }
  });

  test.each(NAME_KINDS)('%s: no word sits in two of its lists, whatever the part or the key', (kind) => {
    // The lists of a family part are never read side by side — one parent reads one of them — so they may share a word.
    const words = library
      .pairs(`${kind}/index`)
      .filter(([, axis]) => axis !== FAMILY)
      .flatMap(([part, axis]) => [...listsOfPart(library, kind, part, axis).values()].flat())
      .map((word) => word.toLowerCase());
    expect(words.filter((word, at) => words.indexOf(word) !== at)).toEqual([]);
  });
});
