import { describe, expect, test } from 'vitest';
import { Address } from '#engine/model/Address.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { Journey } from '#engine/rules/Journey.ts';
import { realRegistry } from '#tests/support/world.ts';

const SEED = new Seed(0x7f3a91c2, 0x0b4de6a8);

function journey(): Journey {
  return new Journey(realRegistry());
}

describe('Journey — where the traveller stands', () => {
  test('before a world is drawn there is no world, no place and nothing to save', () => {
    const fresh = journey();
    expect(fresh.world()).toBeUndefined();
    expect(fresh.here()).toBeUndefined();
    expect(fresh.saved()).toBeUndefined();
  });

  test('a drawn world is not entered yet; entering it starts at the universe', () => {
    const trip = journey();
    trip.begin(SEED);
    expect(trip.world()?.equals(SEED)).toBe(true);
    expect(trip.here()).toBeUndefined();
    expect(trip.saved()?.address()).toBeUndefined();
    trip.enter();
    expect(trip.here()?.kind().key()).toBe('universe');
    expect(trip.saved()?.address()?.toString()).toBe('0');
  });

  test('descend goes into the child at an index, ascend comes back; the save follows', () => {
    const trip = journey();
    trip.begin(SEED);
    trip.enter();
    expect(trip.descend(0)).toBe(true);
    expect(trip.descend(1)).toBe(true);
    expect(trip.here()?.address().toString()).toBe('0.0.1');
    expect(trip.saved()?.address()?.toString()).toBe('0.0.1');
    expect(trip.ascend()).toBe(true);
    expect(trip.here()?.address().toString()).toBe('0.0');
  });

  test('moves that cannot be made change nothing: no such child, a sealed building, above the universe, not in a world', () => {
    const trip = journey();
    expect(trip.descend(0)).toBe(false);
    trip.begin(SEED);
    expect(trip.descend(0)).toBe(false);
    trip.enter();
    expect(trip.ascend()).toBe(false);
    expect(trip.descend(99)).toBe(false);
    expect(trip.descend(-1)).toBe(false);
    expect(trip.here()?.address().toString()).toBe('0');
    for (let level = 0; level < 7; level++) expect(trip.descend(0)).toBe(true);
    expect(trip.here()?.kind().key()).toBe('street');
    expect(trip.here()?.children()[0]?.sealed()).toBe(true);
    expect(trip.descend(0)).toBe(false);
    expect(trip.here()?.kind().key()).toBe('street');
  });

  test('going to the title keeps the place: entering again resumes there, and the save never lost it', () => {
    const trip = journey();
    trip.begin(SEED);
    trip.enter();
    trip.descend(2);
    trip.toTitle();
    expect(trip.here()).toBeUndefined();
    expect(trip.resumes()).toBe(true);
    expect(trip.saved()?.address()?.toString()).toBe('0.2');
    trip.enter();
    expect(trip.here()?.address().toString()).toBe('0.2');
  });

  test('a new world forgets the old place', () => {
    const trip = journey();
    trip.begin(SEED);
    trip.enter();
    trip.descend(0);
    trip.toTitle();
    trip.begin(new Seed(5, 6));
    expect(trip.resumes()).toBe(false);
    trip.enter();
    expect(trip.here()?.address().toString()).toBe('0');
  });

  test('restore: seed + path put the traveller back in the same place', () => {
    const trip = journey();
    trip.begin(SEED);
    trip.enter();
    for (let level = 0; level < 5; level++) trip.descend(1);
    const name = trip.here()?.name();
    const again = journey();
    expect(again.restore(SavedGame.parse(trip.saved()?.toText()) ?? new SavedGame(new Seed(0, 0)))).toBe(
      true,
    );
    expect(again.here()?.name()).toBe(name);
    expect(again.here()?.address().toString()).toBe(trip.here()?.address().toString());
  });

  test('restore refuses a path nobody answers or one that ends inside a sealed place — and stays fresh', () => {
    for (const path of [[99], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]) {
      const trip = journey();
      expect(trip.restore(new SavedGame(SEED, new Address(path))), path.join('.')).toBe(false);
      expect(trip.world()).toBeUndefined();
      expect(trip.here()).toBeUndefined();
    }
  });

  test('restore of a world that was drawn but never entered waits at the title', () => {
    const trip = journey();
    expect(trip.restore(new SavedGame(SEED))).toBe(true);
    expect(trip.world()?.equals(SEED)).toBe(true);
    expect(trip.here()).toBeUndefined();
    expect(trip.resumes()).toBe(false);
  });
});
