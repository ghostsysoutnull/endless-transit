import { describe, expect, test } from 'vitest';
import { EaseInOut } from '#ui/scene/EaseInOut.ts';

describe('ease in and out: how the elevator speeds up, cruises and brakes', () => {
  test('from nothing to all of the way; slow at both ends, fast in the middle', () => {
    const easing = new EaseInOut();
    expect([easing.ease(0), easing.ease(1)]).toEqual([0, 1]);
    const early = easing.ease(0.1) - easing.ease(0);
    const middle = easing.ease(0.55) - easing.ease(0.45);
    const late = easing.ease(1) - easing.ease(0.9);
    expect(middle).toBeGreaterThan(early * 3);
    expect(middle).toBeGreaterThan(late * 3);
  });
});
