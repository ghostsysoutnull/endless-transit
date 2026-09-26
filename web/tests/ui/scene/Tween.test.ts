import { describe, expect, test } from 'vitest';
import { Tween } from '#ui/scene/Tween.ts';

describe('a tween: a value from one number to another over a span of time, eased', () => {
  test('starts at its start, ends at its end, and holds there', () => {
    const tween = new Tween(1, 6, 1000, 450);
    expect(tween.at(1000)).toBe(1);
    expect(tween.at(900)).toBe(1);
    expect(tween.at(1450)).toBe(6);
    expect(tween.at(5000)).toBe(6);
    expect(tween.done(1449)).toBe(false);
    expect(tween.done(1450)).toBe(true);
  });

  test('moves one way only, both ways round', () => {
    for (const [from, to] of [
      [1, 6],
      [6, 1],
    ] as const) {
      const tween = new Tween(from, to, 0, 450);
      let last = tween.at(0);
      for (let time = 15; time <= 450; time += 15) {
        const value = tween.at(time);
        expect(Math.sign(value - last) === Math.sign(to - from) || value === last).toBe(true);
        last = value;
      }
    }
  });

  test('a tween of no duration is done at once, at its end', () => {
    const tween = new Tween(0, 1, 500, 0);
    expect(tween.done(500)).toBe(true);
    expect(tween.at(500)).toBe(1);
    expect(tween.progress(500)).toBe(1);
  });

  test('its progress runs 0 to 1, uneased', () => {
    const tween = new Tween(10, 20, 0, 400);
    expect(tween.progress(0)).toBe(0);
    expect(tween.progress(100)).toBe(0.25);
    expect(tween.progress(800)).toBe(1);
  });
});
