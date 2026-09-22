import { describe, expect, test } from 'vitest';
import { Address } from '#engine/model/Address.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import { Seed } from '#engine/rng/Seed.ts';

const SEED = new Seed(0xabcdef01, 0x23456789);

describe('SavedGame — seed + path, nothing else yet', () => {
  test('round trip: what is written parses back to the same seed and the same place', () => {
    const text = new SavedGame(SEED, new Address([2, 0, 7])).toText();
    const parsed = SavedGame.parse(text);
    expect(parsed?.seed().equals(SEED)).toBe(true);
    expect(parsed?.address()?.toString()).toBe('0.2.0.7');
  });

  test('a world that was drawn but not entered has a seed and no place', () => {
    const parsed = SavedGame.parse(new SavedGame(SEED).toText());
    expect(parsed?.seed().equals(SEED)).toBe(true);
    expect(parsed?.address()).toBeUndefined();
  });

  test('the format is versioned plain JSON', () => {
    expect(JSON.parse(new SavedGame(new Seed(1, 2), new Address([3, 1])).toText())).toEqual({
      version: 2,
      seed: '0000-0001-0000-0002',
      path: '0.3.1',
    });
    expect(JSON.parse(new SavedGame(new Seed(1, 2)).toText())).toEqual({
      version: 2,
      seed: '0000-0001-0000-0002',
      path: null,
    });
  });

  test('nothing, junk, another version, a bad seed or a bad path all parse to "no save"', () => {
    expect(SavedGame.parse(undefined)).toBeUndefined();
    expect(SavedGame.parse('')).toBeUndefined();
    expect(SavedGame.parse('{not json')).toBeUndefined();
    expect(SavedGame.parse('null')).toBeUndefined();
    expect(SavedGame.parse('[1]')).toBeUndefined();
    expect(SavedGame.parse('{"version":1,"seed":"0000-0001-0000-0002"}')).toBeUndefined();
    expect(SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","path":null}')).toBeUndefined();
    expect(SavedGame.parse('{"version":2,"seed":"zzz","path":null}')).toBeUndefined();
    expect(SavedGame.parse('{"version":2,"seed":42,"path":null}')).toBeUndefined();
    expect(SavedGame.parse('{"version":2,"seed":"0000-0001-0000-0002"}')).toBeUndefined();
    expect(SavedGame.parse('{"version":2,"seed":"0000-0001-0000-0002","path":"1.2"}')).toBeUndefined();
    expect(SavedGame.parse('{"version":2,"seed":"0000-0001-0000-0002","path":7}')).toBeUndefined();
  });
});
