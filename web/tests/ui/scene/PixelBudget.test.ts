import { describe, expect, test } from 'vitest';
import { PixelBudget } from '#ui/scene/PixelBudget.ts';

describe('the pixel budget: sharp enough, cheap enough to hold the frame (Decision 4)', () => {
  const budget = new PixelBudget();

  test('never more than two device pixels per CSS pixel', () => {
    expect(budget.ratio(1, 300, 200)).toBe(1);
    expect(budget.ratio(2, 300, 200)).toBe(2);
    expect(budget.ratio(3.5, 300, 200)).toBe(2);
  });

  test('never more than 1.3 million pixels on a canvas', () => {
    for (const [width, height] of [
      [360, 290],
      [412, 380],
      [680, 510],
      [1280, 960],
      [2560, 1440],
    ] as const) {
      const ratio = budget.ratio(3, width, height);
      expect(width * height * ratio * ratio, `${String(width)}x${String(height)}`).toBeLessThanOrEqual(
        1.3e6 + 1,
      );
      expect(ratio).toBeGreaterThan(0);
    }
  });

  test('an empty canvas costs nothing and still has a ratio', () => {
    expect(budget.ratio(2, 0, 0)).toBe(2);
  });
});
