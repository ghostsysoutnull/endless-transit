import { expect, test } from 'vitest';
import { MovesInKeys } from '#ui/screens/MovesInKeys.ts';

const MOVES = [
  { id: 'move:up', key: 'U', label: 'GO UP', opposite: 'move:down' },
  { id: 'move:corridor', key: 'C', label: 'ENTER CORRIDOR', opposite: 'move:elevator' },
];

const BREACH = { id: 'breach', key: 'J', label: 'BREACH THE BEDROCK', opposite: '' };

test('the moves stand among the keys, and none under the picture', () => {
  const layout = new MovesInKeys({ under: [], bar: [], unseen: [] }).arrange(MOVES);
  expect(layout.strip).toEqual([]);
  expect(layout.keys).toEqual({ shown: true, moves: MOVES, bar: [], unseen: [] });
  expect(layout.ways.shown).toBe(false);
});

test('by its id a move keeps its words under the picture, arrives as the bar over the keys, or has no button and only stays on offer', () => {
  const layout = new MovesInKeys({
    under: ['move:corridor'],
    bar: ['breach'],
    unseen: ['move:up'],
  }).arrange([...MOVES, BREACH]);
  expect(layout.strip).toEqual([MOVES[1]]);
  expect(layout.keys).toEqual({ shown: true, moves: [], bar: [BREACH], unseen: [MOVES[0]] });
});
