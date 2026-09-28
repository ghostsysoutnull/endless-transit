import { describe, expect, test } from 'vitest';
import { Gesture } from '#ui/scene/Gesture.ts';

describe('a finger on a picture: a tap until it moves past the slop, then a drag', () => {
  test('on the picture it has not moved until it goes more than 6 px from where it went down, either way', () => {
    const gesture = new Gesture({ pointer: 1, start: 100, view: 3, slider: false });
    gesture.move(106);
    expect(gesture.moved()).toBe(false);
    gesture.move(93);
    expect(gesture.moved()).toBe(true);
  });

  test('once moved it stays moved, even back where it began', () => {
    const gesture = new Gesture({ pointer: 1, start: 100, view: 3, slider: false });
    gesture.move(120);
    gesture.move(100);
    expect(gesture.moved()).toBe(true);
  });

  test('on the slider it is a drag from the start', () => {
    expect(new Gesture({ pointer: 1, start: 100, view: 3, slider: true }).moved()).toBe(true);
  });

  test('the view follows the finger one to one from where it was when the finger went down', () => {
    const gesture = new Gesture({ pointer: 1, start: 100, view: 3, slider: false });
    expect(gesture.viewAt(140, 0.02)).toBeCloseTo(3.8, 10);
    expect(gesture.is(1)).toBe(true);
    expect(gesture.is(2)).toBe(false);
  });
});
