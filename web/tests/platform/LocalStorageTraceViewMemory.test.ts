import { describe, expect, test } from 'vitest';
import { LocalStorageTraceViewMemory } from '#platform/LocalStorageTraceViewMemory.ts';

/** A browser's storage in memory: only what the memory uses answers. */
function storage(held: Map<string, string>): () => Storage {
  const fake: Pick<Storage, 'getItem' | 'setItem'> = {
    getItem: (key) => held.get(key) ?? null,
    setItem: (key, value) => {
      held.set(key, value);
    },
  };
  return () => Object.assign(Object.create(null) as Storage, fake);
}

describe('LocalStorageTraceViewMemory — the trace’s view picked last, kept in the browser (U05)', () => {
  test('the pole picked is the pole recalled; nothing picked is the column', () => {
    const held = new Map<string, string>();
    const memory = new LocalStorageTraceViewMemory(storage(held));
    expect(memory.recall()).toBe('column');
    memory.remember('pole');
    expect(new LocalStorageTraceViewMemory(storage(held)).recall()).toBe('pole');
  });

  test('whatever else the slot holds is the column', () => {
    const held = new Map([['endless-transit.trace-view', 'garbage']]);
    expect(new LocalStorageTraceViewMemory(storage(held)).recall()).toBe('column');
  });

  test('blocked storage recalls the column and forgets without throwing', () => {
    const blocked = new LocalStorageTraceViewMemory(() => {
      throw new Error('SecurityError');
    });
    expect(blocked.recall()).toBe('column');
    expect(() => {
      blocked.remember('pole');
    }).not.toThrow();
  });
});
