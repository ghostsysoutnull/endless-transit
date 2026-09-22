import { describe, expect, test } from 'vitest';
import { Address } from '#engine/model/Address.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import { Seed } from '#engine/rng/Seed.ts';

const SEED = new Seed(0xabcdef01, 0x23456789);
const STATES = new Map([['0.2.0', 'corridor']]);

describe('SavedGame — seed + path + what the places on the path remember', () => {
  test('round trip: what is written parses back to the same seed, the same place and the same states', () => {
    const text = new SavedGame(SEED, new Address([2, 0, 7]), STATES).toText();
    const parsed = SavedGame.parse(text);
    expect(parsed?.seed().equals(SEED)).toBe(true);
    expect(parsed?.address()?.toString()).toBe('0.2.0.7');
    expect(parsed?.states()).toEqual(STATES);
  });

  test('a world that was drawn but not entered has a seed, no place and no states', () => {
    const parsed = SavedGame.parse(new SavedGame(SEED).toText());
    expect(parsed?.seed().equals(SEED)).toBe(true);
    expect(parsed?.address()).toBeUndefined();
    expect(parsed?.states()).toEqual(new Map());
  });

  test('the format is versioned plain JSON: version 3 carries the states by address', () => {
    expect(JSON.parse(new SavedGame(new Seed(1, 2), new Address([3, 1]), STATES).toText())).toEqual({
      version: 3,
      seed: '0000-0001-0000-0002',
      path: '0.3.1',
      states: { '0.2.0': 'corridor' },
    });
    expect(JSON.parse(new SavedGame(new Seed(1, 2)).toText())).toEqual({
      version: 3,
      seed: '0000-0001-0000-0002',
      path: null,
      states: {},
    });
  });

  test('nothing, junk, another version (2 included), a bad seed, a bad path or bad states all parse to "no save"', () => {
    expect(SavedGame.parse(undefined)).toBeUndefined();
    expect(SavedGame.parse('')).toBeUndefined();
    expect(SavedGame.parse('{not json')).toBeUndefined();
    expect(SavedGame.parse('null')).toBeUndefined();
    expect(SavedGame.parse('[1]')).toBeUndefined();
    expect(SavedGame.parse('{"version":1,"seed":"0000-0001-0000-0002"}')).toBeUndefined();
    expect(SavedGame.parse('{"version":2,"seed":"0000-0001-0000-0002","path":null}')).toBeUndefined();
    expect(
      SavedGame.parse('{"version":4,"seed":"0000-0001-0000-0002","path":null,"states":{}}'),
    ).toBeUndefined();
    expect(SavedGame.parse('{"version":3,"seed":"zzz","path":null,"states":{}}')).toBeUndefined();
    expect(SavedGame.parse('{"version":3,"seed":42,"path":null,"states":{}}')).toBeUndefined();
    expect(SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","states":{}}')).toBeUndefined();
    expect(
      SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","path":"1.2","states":{}}'),
    ).toBeUndefined();
    expect(
      SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","path":7,"states":{}}'),
    ).toBeUndefined();
    expect(SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","path":"0.1"}')).toBeUndefined();
    expect(
      SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","path":"0.1","states":null}'),
    ).toBeUndefined();
    expect(
      SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","path":"0.1","states":[]}'),
    ).toBeUndefined();
    expect(
      SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","path":"0.1","states":"x"}'),
    ).toBeUndefined();
    expect(
      SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","path":"0.1","states":{"0.1":7}}'),
    ).toBeUndefined();
    expect(
      SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","path":"0.1","states":{"x":"corridor"}}'),
    ).toBeUndefined();
  });
});
