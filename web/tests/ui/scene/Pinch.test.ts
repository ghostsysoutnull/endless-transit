import { describe, expect, test } from 'vitest';
import { EaseInOut } from '#ui/scene/EaseInOut.ts';
import { EaseOut } from '#ui/scene/EaseOut.ts';
import { Framing } from '#ui/scene/Framing.ts';
import { Pinch } from '#ui/scene/Pinch.ts';
import { PlanCamera } from '#ui/scene/PlanCamera.ts';
import { PlanLayout } from '#ui/scene/PlanLayout.ts';
import { SceneHash } from '#ui/scene/SceneHash.ts';

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

  test('two fingers brought onto one spot still frame the plan: the zoom goes out, never to nothing', () => {
    const framing = new Framing(2, 1, 100);
    const pinch = new Pinch(
      framing,
      [
        { x: 150, y: 100 },
        { x: 210, y: 100 },
      ],
      SIZE,
    );
    const closed = pinch.at([
      { x: 180, y: 100 },
      { x: 180, y: 100 },
    ]);
    expect(closed.scale()).toBeGreaterThan(0);
    expect(closed.scale()).toBeLessThan(framing.scale());
  });

  test('let go, it settles on the room at rest or on the whole plan, whichever it is nearer (U03c)', () => {
    const camera = new PlanCamera(new PlanLayout(new SceneHash()).of(10, '0.1.2'), SIZE);
    const rest = camera.room(3);
    const whole = camera.whole();
    const fingers = [
      { x: 150, y: 100 },
      { x: 210, y: 100 },
    ] as const;
    const letGo = (framing: Framing) =>
      new Pinch(framing, fingers, SIZE)
        .release({ camera, framing, rest, now: 0, still: false, ride: new EaseInOut(), coast: new EaseOut() })
        .at(60_000);
    expect(letGo(new Framing(rest.x(), rest.y(), rest.scale() * 0.8)).equals(rest)).toBe(true);
    expect(letGo(new Framing(rest.x(), rest.y(), whole.scale() * 1.1)).equals(whole)).toBe(true);
  });
});
