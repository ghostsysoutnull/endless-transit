import { describe, expect, test } from 'vitest';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import { Seed } from '#engine/rng/Seed.ts';

describe('SavedGame', () => {
  test('round trip: what is written parses back to the same seed', () => {
    const text = new SavedGame(new Seed(0xabcdef01, 0x23456789)).toText();
    expect(SavedGame.parse(text)?.seed().equals(new Seed(0xabcdef01, 0x23456789))).toBe(true);
  });

  test('the format is versioned plain JSON', () => {
    expect(JSON.parse(new SavedGame(new Seed(1, 2)).toText())).toEqual({
      version: 1,
      seed: '0000-0001-0000-0002',
    });
  });

  test('nothing, junk, another version or a bad seed all parse to "no save"', () => {
    expect(SavedGame.parse(undefined)).toBeUndefined();
    expect(SavedGame.parse('')).toBeUndefined();
    expect(SavedGame.parse('{not json')).toBeUndefined();
    expect(SavedGame.parse('null')).toBeUndefined();
    expect(SavedGame.parse('[1]')).toBeUndefined();
    expect(SavedGame.parse('{"version":2,"seed":"0000-0001-0000-0002"}')).toBeUndefined();
    expect(SavedGame.parse('{"version":1,"seed":"zzz"}')).toBeUndefined();
    expect(SavedGame.parse('{"version":1,"seed":42}')).toBeUndefined();
  });
});
