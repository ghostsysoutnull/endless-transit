import { describe, expect, test } from 'vitest';
import { Framing } from '#ui/scene/Framing.ts';
import { PlanCamera } from '#ui/scene/PlanCamera.ts';
import { PlanLayout } from '#ui/scene/PlanLayout.ts';
import { SceneHash } from '#ui/scene/SceneHash.ts';

const PHONE = { width: 360, height: 277 };
const layout = new PlanLayout(new SceneHash());

describe('the plan’s camera on a picture of one size (U03)', () => {
  test('the whole plan fits inside the picture', () => {
    for (const count of [1, 4, 10, 48]) {
      const plan = layout.of(count, '0.1.2');
      const whole = new PlanCamera(plan, PHONE).whole();
      const corner = whole.toPicture({ x: plan.width(), y: plan.height() }, PHONE);
      const origin = whole.toPicture({ x: 0, y: 0 }, PHONE);
      expect(origin.x).toBeGreaterThanOrEqual(0);
      expect(origin.y).toBeGreaterThanOrEqual(0);
      expect(corner.x).toBeLessThanOrEqual(PHONE.width);
      expect(corner.y).toBeLessThanOrEqual(PHONE.height);
    }
  });

  test('a room glided to is wholly in the picture, doorways and all, and larger than in the whole plan', () => {
    for (const count of [2, 10, 48]) {
      const plan = layout.of(count, '0.4.1');
      const camera = new PlanCamera(plan, PHONE);
      plan.rooms().forEach((room, index) => {
        const framing = camera.room(index);
        const topLeft = framing.toPicture({ x: room.left(), y: room.top() }, PHONE);
        const bottomRight = framing.toPicture({ x: room.right(), y: room.bottom() }, PHONE);
        const where = `${String(count)} rooms, room ${String(index)}`;
        expect(topLeft.x, where).toBeGreaterThanOrEqual(0);
        expect(topLeft.y, where).toBeGreaterThanOrEqual(0);
        expect(bottomRight.x, where).toBeLessThanOrEqual(PHONE.width);
        expect(bottomRight.y, where).toBeLessThanOrEqual(PHONE.height);
        expect(framing.scale(), where).toBeGreaterThanOrEqual(camera.whole().scale());
      });
    }
  });

  test('a finger cannot zoom far past the whole plan nor push the plan out of the frame', () => {
    const plan = layout.of(10, '0.1.2');
    const camera = new PlanCamera(plan, PHONE);
    const out = camera.clamp(new Framing(plan.width() / 2, plan.height() / 2, 1));
    expect(out.scale()).toBeCloseTo(camera.whole().scale() * 0.85, 9);
    const pushed = camera.clamp(new Framing(1000, -1000, 200));
    const left = pushed.toPicture({ x: plan.width(), y: 0 }, PHONE);
    expect(left.x).toBeGreaterThanOrEqual(PHONE.width - 24);
    expect(left.y).toBeLessThanOrEqual(24);
  });

  test('a view let go coasts the way it was moving, and stops inside the frame', () => {
    const plan = layout.of(48, '0.1.2');
    const camera = new PlanCamera(plan, PHONE);
    const from = camera.room(20);
    const landed = camera.landing(from, { x: 2, y: 0 });
    expect(landed.x()).toBeGreaterThan(from.x());
    expect(landed.y()).toBe(from.y());
    expect(landed.equals(camera.clamp(landed))).toBe(true);
  });

  test('the minimap shows only when the plan runs past the frame', () => {
    const plan = layout.of(48, '0.1.2');
    const camera = new PlanCamera(plan, PHONE);
    expect(camera.overflows(camera.whole())).toBe(false);
    expect(camera.overflows(camera.room(0))).toBe(true);
  });
});
