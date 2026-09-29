import { describe, expect, test } from 'vitest';
import { Framing } from '#ui/scene/Framing.ts';
import { Pinch } from '#ui/scene/Pinch.ts';

const SIZE = { width: 360, height: 280 };

describe('two fingers zooming the plan (U03)', () => {
  test('fingers spread twice as far: twice the scale, the plan point between them kept between them', () => {
    const framing = new Framing(2, 1, 100);
    const pinch = new Pinch(
      framing,
      [
        { x: 150, y: 100 },
        { x: 210, y: 100 },
      ],
      SIZE,
    );
    const held = framing.toPlan({ x: 180, y: 100 }, SIZE);
    const spread = pinch.at([
      { x: 120, y: 100 },
      { x: 240, y: 100 },
    ]);
    expect(spread.scale()).toBeCloseTo(200, 9);
    const drawn = spread.toPicture(held, SIZE);
    expect(drawn.x).toBeCloseTo(180, 9);
    expect(drawn.y).toBeCloseTo(100, 9);
  });

  test('fingers that move together without spreading pan the plan', () => {
    const framing = new Framing(2, 1, 100);
    const pinch = new Pinch(
      framing,
      [
        { x: 150, y: 100 },
        { x: 210, y: 100 },
      ],
      SIZE,
    );
    const held = framing.toPlan({ x: 180, y: 100 }, SIZE);
    const moved = pinch.at([
      { x: 170, y: 140 },
      { x: 230, y: 140 },
    ]);
    expect(moved.scale()).toBeCloseTo(100, 9);
    expect(moved.toPicture(held, SIZE).x).toBeCloseTo(200, 9);
    expect(moved.toPicture(held, SIZE).y).toBeCloseTo(140, 9);
  });
});
