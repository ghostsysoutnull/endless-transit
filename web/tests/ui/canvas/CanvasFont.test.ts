import { describe, expect, test } from 'vitest';
import { CanvasFont } from '#ui/canvas/CanvasFont.ts';

describe('the pictures’ font: one family, never under the 12 px a phone can read', () => {
  test('a size under the floor is refused; the floor is the default', () => {
    const font = new CanvasFont();
    expect(() => font.of('regular', 11)).toThrow(RangeError);
    expect(font.of('bold')).toMatch(/^700 12px /);
    expect(font.of('regular', 20)).toMatch(/^400 20px /);
  });

  test('a size worked out from the picture is raised to the floor, never lowered', () => {
    const font = new CanvasFont();
    expect([font.atLeast(8), font.atLeast(12), font.atLeast(20)]).toEqual([12, 12, 20]);
  });
});
