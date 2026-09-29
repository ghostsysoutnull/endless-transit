import { describe, expect, test } from 'vitest';
import { ListedParts } from '#ui/screens/ListedParts.ts';
import { option } from '#tests/support/hudSnapshots.ts';

describe('a listed place finds its part by its address (U02)', () => {
  test('in the list’s order, each told its place on the list; a place with no part is left out', () => {
    const parts = new ListedParts([
      { address: '0.2', floors: 2 },
      { address: '0.0', floors: 7 },
    ]);
    const travel = [
      option({ id: 'enter:0', label: 'First', address: '0.0' }),
      option({ id: 'enter:1', label: 'Second', address: '0.1' }),
      option({ id: 'enter:2', label: 'Third', address: '0.2' }),
    ];
    expect(parts.drawn(travel, (listed, part, index) => [listed.id, part.floors, index])).toEqual([
      ['enter:0', 7, 0],
      ['enter:2', 2, 2],
    ]);
  });
});
