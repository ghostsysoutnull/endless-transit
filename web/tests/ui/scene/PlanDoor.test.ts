import { describe, expect, test } from 'vitest';
import { LevelDoor } from '#ui/scene/LevelDoor.ts';
import { PlanBox } from '#ui/scene/PlanBox.ts';
import { PlanPoint } from '#ui/scene/PlanPoint.ts';
import { SideDoor } from '#ui/scene/SideDoor.ts';

describe('a doorway on the plan (U03)', () => {
  test('in the wall two side-by-side rooms share: its middle, its span, and it stands on both rooms and no other', () => {
    const left = new PlanBox(0, 0, 1, 2);
    const right = new PlanBox(1, 0.5, 1, 2);
    const door = left.doorTo(right);
    expect(door.middle().equals(new PlanPoint(1, 1.25))).toBe(true);
    expect(door.span()).toBe(1.5);
    expect([door.on(left), door.on(right), door.on(new PlanBox(3, 0, 1, 2))]).toEqual([true, true, false]);
  });

  test('in the wall two stacked rooms share, even when both reach the same end of their rows', () => {
    const below = new PlanBox(1, 1, 1.5, 1);
    const above = new PlanBox(1.2, 0, 1.3, 1);
    const door = below.doorTo(above);
    expect(door.middle().equals(new PlanPoint(1.85, 1))).toBe(true);
    expect(door.span()).toBeCloseTo(1.3, 9);
    expect([door.on(below), door.on(above)]).toEqual([true, true]);
  });

  test('its gap is as wide as asked, never wider than the wall it shares', () => {
    const [top, bottom] = new SideDoor(1, 0, 2).gap(0.6);
    expect([top.x(), top.y(), bottom.x(), bottom.y()]).toEqual([1, 0.7, 1, 1.3]);
    const [start, end] = new LevelDoor(3, 0, 0.4).gap(0.6);
    expect([start.x(), end.x()]).toEqual([0, 0.4]);
  });

  test('a doorway needs wall to stand in', () => {
    expect(() => new SideDoor(1, 2, 2)).toThrow(RangeError);
    expect(() => new LevelDoor(1, 3, 2)).toThrow(RangeError);
  });
});
