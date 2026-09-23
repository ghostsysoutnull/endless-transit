import { describe, expect, test } from 'vitest';
import { Address } from '#engine/model/Address.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import { Seed } from '#engine/rng/Seed.ts';

const SEED = new Seed(0xabcdef01, 0x23456789);
const STATES = new Map([['0.2.0', 'corridor']]);
const VISITED = ['0', '0.2', '0.2.0', '0.2.0.7'];
/** Two fragments as a save carries them: a relic from a room, and a hybrid of two. */
const BUFFER = [
  { kind: 'relic', from: '0.2.0.7', key: 'culture|tatami mat' },
  {
    kind: 'hybrid',
    parts: [
      { kind: 'relic', from: '0.2.0.7', key: 'culture|katana rack' },
      { kind: 'relic', from: '0.2.0.7', key: 'era|floppy disk' },
    ],
  },
];
const SAVE = {
  version: 6,
  seed: '0000-0001-0000-0002',
  path: '0.1',
  states: {},
  coherence: 100,
  steps: 0,
  visited: ['0', '0.1'],
  buffer: [],
  resonant: 0,
};
const text = (changes: Record<string, unknown>): string => JSON.stringify({ ...SAVE, ...changes });

describe('SavedGame — seed + path + what the visited places remember + the traveller (Guide:364-366)', () => {
  test('round trip: what is written parses back to the same seed, place, states, coherence, steps, visited path, buffer and tally', () => {
    const written = new SavedGame({
      seed: SEED,
      address: new Address([2, 0, 7]),
      states: STATES,
      coherence: 57,
      steps: 12,
      visited: VISITED,
      buffer: BUFFER,
      resonant: 3,
    }).toText();
    const parsed = SavedGame.parse(written);
    expect(parsed?.seed().equals(SEED)).toBe(true);
    expect(parsed?.address()?.toString()).toBe('0.2.0.7');
    expect(parsed?.states()).toEqual(STATES);
    expect(parsed?.coherence()).toBe(57);
    expect(parsed?.steps()).toBe(12);
    expect(parsed?.visited()).toEqual(VISITED);
    expect(parsed?.buffer()).toEqual(BUFFER);
    expect(parsed?.resonant()).toBe(3);
    expect(parsed?.toText()).toBe(written);
  });

  test('a world that was drawn but not entered has a seed, no place, no states and a fresh traveller', () => {
    const parsed = SavedGame.parse(new SavedGame({ seed: SEED }).toText());
    expect(parsed?.seed().equals(SEED)).toBe(true);
    expect(parsed?.address()).toBeUndefined();
    expect(parsed?.states()).toEqual(new Map());
    expect(parsed?.coherence()).toBe(100);
    expect(parsed?.steps()).toBe(0);
    expect(parsed?.visited()).toEqual([]);
    expect(parsed?.buffer()).toEqual([]);
    expect(parsed?.resonant()).toBe(0);
  });

  test('the format is versioned plain JSON: version 6 carries the states by address and the traveller with the buffer and the tally', () => {
    expect(
      JSON.parse(
        new SavedGame({
          seed: new Seed(1, 2),
          address: new Address([3, 1]),
          states: STATES,
          coherence: 3,
          steps: 9,
          visited: ['0', '0.3', '0.3.1'],
          buffer: BUFFER,
          resonant: 1,
        }).toText(),
      ),
    ).toEqual({
      version: 6,
      seed: '0000-0001-0000-0002',
      path: '0.3.1',
      states: { '0.2.0': 'corridor' },
      coherence: 3,
      steps: 9,
      visited: ['0', '0.3', '0.3.1'],
      buffer: BUFFER,
      resonant: 1,
    });
    expect(JSON.parse(new SavedGame({ seed: new Seed(1, 2) }).toText())).toEqual({
      version: 6,
      seed: '0000-0001-0000-0002',
      path: null,
      states: {},
      coherence: 100,
      steps: 0,
      visited: [],
      buffer: [],
      resonant: 0,
    });
  });

  test('a good save of version 6 parses', () => {
    expect(SavedGame.parse(text({}))).toBeDefined();
    expect(SavedGame.parse(text({ coherence: 0, steps: 400 }))).toBeDefined();
  });

  test('nothing, junk, another version (5 included), a bad seed, a bad path or bad states all parse to "no save"', () => {
    expect(SavedGame.parse(undefined)).toBeUndefined();
    expect(SavedGame.parse('')).toBeUndefined();
    expect(SavedGame.parse('{not json')).toBeUndefined();
    expect(SavedGame.parse('null')).toBeUndefined();
    expect(SavedGame.parse('[1]')).toBeUndefined();
    expect(SavedGame.parse('{"version":1,"seed":"0000-0001-0000-0002"}')).toBeUndefined();
    expect(SavedGame.parse('{"version":2,"seed":"0000-0001-0000-0002","path":null}')).toBeUndefined();
    expect(
      SavedGame.parse('{"version":3,"seed":"0000-0001-0000-0002","path":"0.1","states":{}}'),
    ).toBeUndefined();
    expect(
      SavedGame.parse(
        '{"version":4,"seed":"0000-0001-0000-0002","path":"0.1","states":{},"coherence":100,"steps":0,"visited":["0","0.1"]}',
      ),
    ).toBeUndefined();
    expect(SavedGame.parse(text({ version: 5 }))).toBeUndefined();
    expect(SavedGame.parse(text({ version: 7 }))).toBeUndefined();
    expect(SavedGame.parse(text({ seed: 'zzz' }))).toBeUndefined();
    expect(SavedGame.parse(text({ seed: 42 }))).toBeUndefined();
    expect(SavedGame.parse(text({ path: undefined }))).toBeUndefined();
    expect(SavedGame.parse(text({ path: '1.2' }))).toBeUndefined();
    expect(SavedGame.parse(text({ path: 7 }))).toBeUndefined();
    expect(SavedGame.parse(text({ states: undefined }))).toBeUndefined();
    expect(SavedGame.parse(text({ states: null }))).toBeUndefined();
    expect(SavedGame.parse(text({ states: [] }))).toBeUndefined();
    expect(SavedGame.parse(text({ states: 'x' }))).toBeUndefined();
    expect(SavedGame.parse(text({ states: { '0.1': 7 } }))).toBeUndefined();
    expect(SavedGame.parse(text({ states: { x: 'corridor' } }))).toBeUndefined();
  });

  test('a traveller the game could not have written is no save: coherence outside 0–100 or not whole, steps negative or not whole, a visited path that is not a list of distinct addresses', () => {
    for (const coherence of [-1, 101, 0.5, '50', null, undefined]) {
      expect(SavedGame.parse(text({ coherence })), String(coherence)).toBeUndefined();
    }
    for (const steps of [-1, 1.5, '3', null, undefined]) {
      expect(SavedGame.parse(text({ steps })), String(steps)).toBeUndefined();
    }
    for (const visited of [undefined, null, 'x', {}, ['x'], [1], ['0', '0'], ['0', 'Universe']]) {
      expect(SavedGame.parse(text({ visited })), JSON.stringify(visited)).toBeUndefined();
    }
  });

  test('a buffer that is not a list of fragment data, or a tally that is not a count, is no save — what the world says of each fragment is the journey’s question', () => {
    for (const buffer of [undefined, null, 'x', {}, [null], ['x'], [1], [[]], [{}], [{ kind: 7 }]]) {
      expect(SavedGame.parse(text({ buffer })), JSON.stringify(buffer)).toBeUndefined();
    }
    expect(SavedGame.parse(text({ buffer: BUFFER }))).toBeDefined();
    expect(SavedGame.parse(text({ buffer: [{ kind: 'anything', x: 1 }] }))).toBeDefined();
    for (const resonant of [-1, 1.5, '3', null, undefined]) {
      expect(SavedGame.parse(text({ resonant })), String(resonant)).toBeUndefined();
    }
  });

  test('a world drawn but not entered was written with a fresh traveller and no states — anything else is no save', () => {
    const drawn = { path: null, visited: [] };
    expect(SavedGame.parse(text(drawn))).toBeDefined();
    expect(SavedGame.parse(text({ ...drawn, coherence: 99 }))).toBeUndefined();
    expect(SavedGame.parse(text({ ...drawn, steps: 1 }))).toBeUndefined();
    expect(SavedGame.parse(text({ ...drawn, visited: ['0'] }))).toBeUndefined();
    expect(SavedGame.parse(text({ ...drawn, states: { '0.2.0': 'corridor' } }))).toBeUndefined();
    expect(SavedGame.parse(text({ ...drawn, buffer: BUFFER }))).toBeUndefined();
    expect(SavedGame.parse(text({ ...drawn, resonant: 1 }))).toBeUndefined();
  });
});
