import { describe, expect, test } from 'vitest';
import { Framing } from '#ui/scene/Framing.ts';
import { PlanPoint } from '#ui/scene/PlanPoint.ts';

const SIZE = { width: 360, height: 280 };

describe('where the plan’s view stands (U03)', () => {
  test('its centre is drawn at the picture’s middle; a plan point and its picture point map back and forth', () => {
    const framing = new Framing(2, 1, 100);
    expect(framing.toPicture(new PlanPoint(2, 1), SIZE)).toEqual({ x: 180, y: 140 });
    expect(framing.toPicture(new PlanPoint(3, 0.5), SIZE)).toEqual({ x: 280, y: 90 });
    expect(framing.toPlan({ x: 280, y: 90 }, SIZE).equals(new PlanPoint(3, 0.5))).toBe(true);
  });

  test('a finger’s move pans the plan with it, pixel for pixel', () => {
    const moved = new Framing(2, 1, 100).panned(50, -20);
    expect(moved.toPicture(new PlanPoint(3, 0.5), SIZE)).toEqual({ x: 330, y: 70 });
  });

  test('zoomed about a point, the plan under that point stays under it', () => {
    const framing = new Framing(2, 1, 100);
    const zoomed = framing.zoomedAbout({ x: 300, y: 60 }, 250, SIZE);
    const drawn = zoomed.toPicture(framing.toPlan({ x: 300, y: 60 }, SIZE), SIZE);
    expect(drawn.x).toBeCloseTo(300, 9);
    expect(drawn.y).toBeCloseTo(60, 9);
    expect(zoomed.scale()).toBe(250);
  });

  test('stretched (U03d): a unit is drawn that much taller than wide; points map back and forth, and a finger still pans pixel for pixel', () => {
    const framing = new Framing(2, 1, 100, 1.5);
    expect(framing.toPicture(new PlanPoint(3, 2), SIZE)).toEqual({ x: 280, y: 290 });
    expect(framing.toPlan({ x: 280, y: 290 }, SIZE).equals(new PlanPoint(3, 2))).toBe(true);
    const moved = framing.panned(50, -30);
    expect(moved.toPicture(new PlanPoint(3, 2), SIZE)).toEqual({ x: 330, y: 260 });
  });

  test('on the way to another framing: its ends are the two framings, the scale and the stretch grow evenly by ratio', () => {
    const tall = new Framing(0, 0, 50, 4);
    const drawnTrue = new Framing(0, 0, 50);
    expect(tall.between(drawnTrue, 0.5).stretch()).toBe(2);
  });

  test('on the way to another framing: its ends are the two framings, the scale grows evenly by ratio', () => {
    const near = new Framing(0, 0, 50);
    const far = new Framing(4, 2, 200);
    expect(near.between(far, 0).equals(near)).toBe(true);
    expect(near.between(far, 1).equals(far)).toBe(true);
    const half = near.between(far, 0.5);
    expect([half.x(), half.y(), half.scale()]).toEqual([2, 1, 100]);
  });
});
