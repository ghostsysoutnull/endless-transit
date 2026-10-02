import { describe, expect, test } from 'vitest';
import { InRoom } from '#ui/scene/InRoom.ts';
import { OverPlan } from '#ui/scene/OverPlan.ts';

const KEY = {
  toPlan: { text: 'MAP', label: 'Apartment plan' },
  toRoom: { text: 'ROOM', label: 'Back into the room' },
} as const;

describe('the MAP key names what its next tap does (U03e)', () => {
  test('standing in the room it offers the plan', () => {
    expect(new InRoom().keyWords(KEY)).toEqual(KEY.toPlan);
    expect(new InRoom().pressed()).toBe(false);
  });

  test('over the plan it offers the room, pressed', () => {
    expect(new OverPlan().keyWords(KEY)).toEqual(KEY.toRoom);
    expect(new OverPlan().pressed()).toBe(true);
  });
});
