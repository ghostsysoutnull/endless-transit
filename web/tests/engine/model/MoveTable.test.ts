import { describe, expect, test } from 'vitest';
import type { Location } from '#engine/model/Location.ts';
import { MoveTable } from '#engine/model/MoveTable.ts';
import { Universe } from '#engine/model/Universe.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { CountingChildSource } from '#tests/support/CountingChildSource.ts';

/** A place to point moves at; the table never looks inside it. */
const THERE: Location = new Universe({
  parent: undefined,
  seed: new Seed(1, 2),
  index: 0,
  children: new CountingChildSource(() => []),
});

/** The one under test carries a counter, so a rule can tell whether its act ran. */
interface Self {
  acted: string[];
  open: boolean;
}

const table = new MoveTable<Self>([
  { move: { id: 'on', label: 'Go on' }, to: () => THERE },
  { move: { id: 'gate', label: 'Open the gate' }, to: (self) => (self.open ? THERE : undefined) },
  {
    move: { id: 'ring', label: 'Ring' },
    to: () => THERE,
    act: (self) => {
      self.acted.push('rang');
    },
  },
]);

describe('MoveTable — one owner for what a kind offers and what making it does', () => {
  test('offered: the moves that lead somewhere from here, in the table’s order; a move that leads nowhere is not offered', () => {
    expect(table.offered({ acted: [], open: true }).map((move) => move.id)).toEqual(['on', 'gate', 'ring']);
    expect(table.offered({ acted: [], open: false }).map((move) => move.id)).toEqual(['on', 'ring']);
  });

  test('make: where the move leads, after what it does; nothing (and no act) when it is not offered or unknown', () => {
    const self: Self = { acted: [], open: false };
    expect(table.make(self, 'on')).toBe(THERE);
    expect(table.make(self, 'ring')).toBe(THERE);
    expect(self.acted).toEqual(['rang']);
    expect(table.make(self, 'gate')).toBeUndefined();
    expect(table.make(self, 'fly')).toBeUndefined();
    expect(self.acted).toEqual(['rang']);
  });

  test('by construction: whatever is offered can be made', () => {
    for (const open of [true, false]) {
      const self: Self = { acted: [], open };
      for (const move of table.offered(self)) expect(table.make(self, move.id)).toBe(THERE);
    }
  });
});
