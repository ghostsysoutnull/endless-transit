import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Apartment } from '#engine/model/Apartment.ts';
import { Building } from '#engine/model/Building.ts';
import { Culture } from '#engine/model/Culture.ts';
import { Era } from '#engine/model/Era.ts';
import { Floor } from '#engine/model/Floor.ts';
import { Relic } from '#engine/model/Relic.ts';
import { Room } from '#engine/model/Room.ts';
import { Deal } from '#engine/procgen/Deal.ts';
import { ObjectDeck } from '#engine/procgen/ObjectDeck.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';
import { must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();
const library = new ContentLibrary(new BundledContent());

function as<T>(value: unknown, type: new (...args: never[]) => T): T {
  if (!(value instanceof type)) throw new Error(`expected a ${type.name}`);
  return value;
}

/** The apartments of one corridor of the first building of a street under `n`. */
function apartmentsOf(n: number): Apartment[] {
  const street = must(toStreet(registry.universe(sampleSeed(n)), () => n).at(-1));
  const building = as(street.children()[n % street.children().length], Building);
  const floor = as(building.children()[n % building.floors()], Floor);
  return floor
    .corridor()
    .children()
    .map((each) => as(each, Apartment));
}

const apartments = Array.from({ length: 150 }, (_, n) => apartmentsOf(n)).flat();
const rooms = apartments.flatMap((apartment) => apartment.children().map((room) => as(room, Room)));

describe('a relic is a value with identity by key (I06 captures it by that key, never by its words)', () => {
  test('two relics with the same key are the same value; the name is what the player reads', () => {
    const one = new Relic('with|tatami mat|floppy disk', 'floppy disk with tatami mat');
    expect(one.equals(new Relic('with|tatami mat|floppy disk', 'anything'))).toBe(true);
    expect(one.equals(new Relic('fused|tatami mat|floppy disk', 'floppy disk with tatami mat'))).toBe(false);
    expect(one.key()).toBe('with|tatami mat|floppy disk');
    expect(one.name()).toBe('floppy disk with tatami mat');
  });
});

describe('the object deck (ThemeService.groovy:140-171; Guide, "Finding things worth taking")', () => {
  const deck = new ObjectDeck(
    new ContentLibrary(
      new MemoryContentSource({
        'themes/cultures/shogun.txt': 'tatami mat\nkatana rack\n',
        'themes/timelines/analog.txt': 'floppy disk\ncrt monitor\n',
      }),
    ),
  );
  const shogun = new Culture('shogun', 'magenta');
  const analog = new Era('analog');

  test('every culture item × every era item in four two-word forms, then every item alone — in file order', () => {
    expect(deck.of(shogun, analog).map((relic) => relic.name())).toEqual([
      'floppy disk with tatami mat',
      'tatami mat infused with floppy disk',
      'tatami mat fused to floppy disk',
      'floppy disk grafted onto tatami mat',
      'crt monitor with tatami mat',
      'tatami mat infused with crt monitor',
      'tatami mat fused to crt monitor',
      'crt monitor grafted onto tatami mat',
      'floppy disk with katana rack',
      'katana rack infused with floppy disk',
      'katana rack fused to floppy disk',
      'floppy disk grafted onto katana rack',
      'crt monitor with katana rack',
      'katana rack infused with crt monitor',
      'katana rack fused to crt monitor',
      'crt monitor grafted onto katana rack',
      'tatami mat',
      'katana rack',
      'floppy disk',
      'crt monitor',
    ]);
  });

  test('every key of a deck is distinct and names its form and parts; the deck is built once per pair', () => {
    const keys = deck.of(shogun, analog).map((relic) => relic.key());
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys[0]).toBe('with|tatami mat|floppy disk');
    expect(keys[16]).toBe('culture|tatami mat');
    expect(keys[18]).toBe('era|floppy disk');
    expect(deck.of(shogun, analog)).toBe(deck.of(shogun, analog));
  });

  test('on the real lists a deck holds 16 × 16 × 4 + 32 = 1056 relics per pair (the abyssal 28 relics make 1836, Guide:473)', () => {
    const real = new ObjectDeck(library);
    for (const culture of library.index('themes/cultures')) {
      for (const era of library.index('themes/timelines')) {
        const c = library.list(`themes/cultures/${culture}`).length;
        const t = library.list(`themes/timelines/${era}`).length;
        expect(real.of(new Culture(culture, ''), new Era(era)).length, `${culture}/${era}`).toBe(
          c * t * 4 + c + t,
        );
        expect(real.of(new Culture(culture, ''), new Era(era)).length).toBe(
          culture === 'abyssal' ? 1836 : 1056,
        );
      }
    }
  });
});

describe('a deal', () => {
  const deal = new Deal();
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  test('the first n of a deal are the n-th picks in order: take(n)[i] is nth(i), no item twice', () => {
    for (let n = 0; n < 40; n++) {
      const seed = new Seed(n, 7 * n);
      const taken = deal.take(seed, items, 5);
      expect(taken).toHaveLength(5);
      expect(new Set(taken).size).toBe(5);
      for (let i = 0; i < 5; i++) expect(taken[i]).toBe(deal.nth(seed, items, i));
    }
  });

  test('a deal never takes more than there is, and past the end it starts over', () => {
    const seed = new Seed(3, 4);
    expect(deal.take(seed, items, 7).slice().sort()).toEqual(items);
    expect(deal.take(seed, items, 9)).toHaveLength(9);
    expect(deal.take(seed, items, 9)[7]).toBe(deal.nth(seed, items, 7));
  });
});

describe('objects live in apartments, not rooms (Guide:167-170; ApartmentFactory.groovy:40-45, 63-68)', () => {
  test('each apartment holds 5 to 19 relics, both ends reached, no relic twice, every one a card of its own deck', () => {
    expect(apartments.length).toBeGreaterThan(1_000);
    const deck = new ObjectDeck(library);
    const counts = apartments.map((apartment) => apartment.relics().length);
    expect(Math.min(...counts)).toBe(5);
    expect(Math.max(...counts)).toBe(19);
    for (const apartment of apartments) {
      const keys = apartment.relics().map((relic) => relic.key());
      expect(new Set(keys).size, keys.join(', ')).toBe(keys.length);
      const own = deck.of(apartment.culture(), apartment.era());
      for (const relic of apartment.relics())
        expect(
          own.some((card) => card.equals(relic)),
          relic.name(),
        ).toBe(true);
    }
  });

  test('the relics are scattered across the rooms: every relic in exactly one room, some rooms empty, some a pile', () => {
    for (const apartment of apartments) {
      const dealt = apartment.children().flatMap((room) => as(room, Room).objects());
      expect(dealt.map((relic) => relic.key()).sort()).toEqual(
        apartment
          .relics()
          .map((relic) => relic.key())
          .sort(),
      );
    }
    expect(rooms.some((room) => room.objects().length === 0)).toBe(true);
    expect(rooms.some((room) => room.objects().length >= 8)).toBe(true);
    const single = must(apartments.find((apartment) => apartment.children().length === 1));
    expect(as(single.children()[0], Room).objects()).toEqual(single.relics());
  });

  test('a room holds what its apartment dealt it, by index — the same answer from a fresh world', () => {
    const [seed, index] = [sampleSeed(11), 11];
    const twice = [0, 1].map(() => {
      const street = must(toStreet(realRegistry().universe(seed), () => index).at(-1));
      const building = as(street.children()[index % street.children().length], Building);
      const floor = as(building.children()[index % building.floors()], Floor);
      return floor
        .corridor()
        .children()
        .flatMap((apartment) =>
          apartment.children().map((room) =>
            as(room, Room)
              .objects()
              .map((r) => r.key()),
          ),
        );
    });
    expect(twice[0]).toEqual(twice[1]);
    expect(twice[0]?.flat().length).toBeGreaterThan(5);
  });

  test('variety: the relics of a corridor sample are mostly distinct — measured 1371 / 1420 = 0.965 over 31 culture-era pairs (HK-016 step 3 measured 381/406 … 545/719 per six-floor probe); a one-form deck reads 0.870', () => {
    const names = apartments
      .slice(0, 120)
      .flatMap((apartment) => apartment.relics().map((relic) => relic.name()));
    expect(names.length).toBeGreaterThan(1_000);
    expect(new Set(names).size / names.length).toBeGreaterThan(0.9);
  });
});
