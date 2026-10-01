import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import type { CardTurn } from '#ui/card/CardTurn.ts';
import { CardTurns } from '#ui/card/CardTurns.ts';

/** A turn that only has a name. */
function turn(key: string): CardTurn {
  return { key: () => key, play: () => Promise.resolve() };
}

const CLEAN = ['flip', 'door', 'peel', 'blinds'];
const BROKEN = ['static', 'torn'];
const turns = new CardTurns({ clean: CLEAN.map(turn), broken: BROKEN.map(turn), still: turn('instant') });
const SEED = new Seed(7, 11);

/** The turns a card makes one after the other in one frame of the game, each told the one before. */
function run(decay: number, count: number, seed = SEED): string[] {
  const keys: string[] = [];
  for (let n = 0; n < count; n++) keys.push(turns.pick(seed, decay, n, keys.at(-1) ?? '').key());
  return keys;
}

describe('which way the room’s card turns (U03e)', () => {
  test('the same frame, coherence and count pick the same turn: no clock, no dice', () => {
    expect(run(0.4, 40)).toEqual(run(0.4, 40));
  });

  test('another frame of the game picks another run', () => {
    expect(run(0.4, 40, new Seed(8, 11))).not.toEqual(run(0.4, 40));
  });

  test('at full coherence no turn is broken, and every clean one comes up', () => {
    const keys = run(0, 200);
    expect(keys.filter((key) => BROKEN.includes(key))).toEqual([]);
    expect([...new Set(keys)].sort()).toEqual([...CLEAN].sort());
  });

  test('with coherence gone most turns are broken', () => {
    const broken = run(1, 200).filter((key) => BROKEN.includes(key)).length;
    expect(broken).toBeGreaterThan(140);
  });

  test('never the same turn twice running', () => {
    for (const decay of [0, 0.5, 1]) {
      const keys = run(decay, 200);
      expect(keys.filter((key, index) => key === keys[index - 1])).toEqual([]);
    }
  });

  test('the still turn is its own, for reduced motion', () => {
    expect(turns.still().key()).toBe('instant');
  });
});
