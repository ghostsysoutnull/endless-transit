import { describe, expect, test } from 'vitest';
import { Fling } from '#ui/scene/Fling.ts';

describe('a fling: how fast a finger was moving the view when it let go (the mock’s sample/vel)', () => {
  test('the speed over the last samples, in view units a second', () => {
    const fling = new Fling();
    fling.sample(0, 0);
    fling.sample(50, 1);
    fling.sample(100, 2);
    expect(fling.speed(100)).toBeCloseTo(20);
  });

  test('only the last 110 ms count: an old slow start does not dilute a fast end', () => {
    const fling = new Fling();
    fling.sample(0, 0);
    fling.sample(500, 0);
    fling.sample(550, 5);
    fling.sample(600, 10);
    expect(fling.speed(600)).toBeCloseTo(100);
  });

  test('a finger that stopped before letting go throws nothing; one sample is no speed', () => {
    const fling = new Fling();
    fling.sample(0, 0);
    fling.sample(50, 5);
    expect(fling.speed(200)).toBe(0);
    const once = new Fling();
    once.sample(0, 3);
    expect(once.speed(10)).toBe(0);
  });
});
