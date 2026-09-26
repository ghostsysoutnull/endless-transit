import { describe, expect, test } from 'vitest';
import { CoherenceFx, FX_FRAMES } from '#ui/scene/CoherenceFx.ts';

const NOISE = '7F3A-91C2-0B4D-E6A8';
const OTHER = '0000-1234-0000-4660';

describe('the coherence tear: what a frame tears, as data drawn from the frame’s seed (Decision 5)', () => {
  test('no decay plans nothing', () => {
    expect(new CoherenceFx().plan(NOISE, 0, 3)).toEqual({ tears: [], grain: [], tint: 0, dark: false });
  });

  test('the same noise, decay and frame plan the same frame — in a fresh tear too; another noise another frame', () => {
    const fx = new CoherenceFx();
    const one = fx.plan(NOISE, 0.6, 2);
    expect(fx.plan(NOISE, 0.6, 2)).toBe(one);
    expect(new CoherenceFx().plan(NOISE, 0.6, 2)).toEqual(one);
    expect(new CoherenceFx().plan(NOISE, 0.6, 2 + FX_FRAMES)).toEqual(one);
    expect(new CoherenceFx().plan(OTHER, 0.6, 2)).not.toEqual(one);
    expect(new CoherenceFx().plan(NOISE, 0.6, 3)).not.toEqual(one);
  });

  test('the tear grows with the decay: more bands, taller and further shifted, more grain, a deeper cast', () => {
    const fx = new CoherenceFx();
    const over = (decay: number) => Array.from({ length: FX_FRAMES }, (_, k) => fx.plan(NOISE, decay, k));
    const light = over(0.2);
    const heavy = over(0.9);
    const bands = (plans: ReturnType<typeof over>) => plans.flatMap((plan) => plan.tears);
    expect(bands(heavy).length).toBeGreaterThan(bands(light).length);
    expect(Math.max(...bands(heavy).map((tear) => tear.height))).toBeGreaterThan(
      Math.max(2, ...bands(light).map((tear) => tear.height)),
    );
    expect(heavy[0]?.grain.length).toBeGreaterThan(light[0]?.grain.length ?? 0);
    expect(heavy[0]?.tint).toBeGreaterThan(light[0]?.tint ?? 0);
    // Never more than seven bands a frame: each is a copy of the canvas onto itself.
    expect(Math.max(...heavy.map((plan) => plan.tears.length))).toBeLessThanOrEqual(7);
    expect(over(1).every((plan) => plan.grain.length === 500)).toBe(true);
  });

  test('every position lies inside the picture', () => {
    const plan = new CoherenceFx().plan(NOISE, 1, 5);
    for (const at of [
      ...plan.tears.map((tear) => tear.y),
      ...plan.grain.flatMap((speck) => [speck.x, speck.y]),
    ]) {
      expect(at).toBeGreaterThanOrEqual(0);
      expect(at).toBeLessThan(1);
    }
    expect(plan.grain.some((speck) => speck.red)).toBe(true);
    expect(plan.grain.some((speck) => !speck.red)).toBe(true);
  });
});
