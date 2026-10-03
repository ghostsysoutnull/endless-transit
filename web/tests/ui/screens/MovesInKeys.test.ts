import { expect, test } from 'vitest';
import { MovesInKeys } from '#ui/screens/MovesInKeys.ts';

const MOVES = [
  { id: 'move:up', key: 'U', label: 'GO UP', opposite: 'move:down' },
  { id: 'move:corridor', key: 'C', label: 'ENTER CORRIDOR', opposite: 'move:elevator' },
];

test('the moves stand among the keys, and none under the picture', () => {
  const layout = new MovesInKeys().arrange(MOVES);
  expect(layout.strip).toEqual([]);
  expect(layout.keys).toEqual({ shown: true, moves: MOVES });
  expect(layout.ways.shown).toBe(false);
});

test('a move named as the place’s own way in keeps its place under the picture, out of the keys', () => {
  const layout = new MovesInKeys(['move:corridor']).arrange(MOVES);
  expect(layout.strip.map((move) => move.id)).toEqual(['move:corridor']);
  expect(layout.keys).toEqual({ shown: true, moves: [MOVES[0]] });
});
