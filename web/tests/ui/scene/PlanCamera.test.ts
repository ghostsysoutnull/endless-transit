import { describe, expect, test } from 'vitest';
import { Framing } from '#ui/scene/Framing.ts';
import { PlanCamera } from '#ui/scene/PlanCamera.ts';
import { PlanLayout } from '#ui/scene/PlanLayout.ts';
import { PlanPoint } from '#ui/scene/PlanPoint.ts';
import { SceneHash } from '#ui/scene/SceneHash.ts';

const PHONE = { width: 360, height: 277 };
/** The room's picture on the smallest phone and on a tall one (U03c). */
const ROOM_PICTURES = [
  { width: 358, height: 243 },
  { width: 410, height: 348 },
] as const;
/** The room's picture standing in it (U03d), measured on the smallest phone and on a Pixel 7. */
const STANDING_PICTURES = [
  { width: 326, height: 374 },
  { width: 378, height: 573 },
] as const;
const layout = new PlanLayout(new SceneHash());

describe('the plan’s camera on a picture of one size (U03)', () => {
  test('the whole plan fits inside the picture', () => {
    for (const count of [1, 4, 10, 48]) {
      const plan = layout.of(count, '0.1.2');
      const whole = new PlanCamera(plan, PHONE).whole();
      const corner = whole.toPicture(new PlanPoint(plan.width(), plan.height()), PHONE);
      const origin = whole.toPicture(new PlanPoint(0, 0), PHONE);
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
        const topLeft = framing.toPicture(room.topLeft(), PHONE);
        const bottomRight = framing.toPicture(room.bottomRight(), PHONE);
        const where = `${String(count)} rooms, room ${String(index)}`;
        expect(topLeft.x, where).toBeGreaterThanOrEqual(0);
        expect(topLeft.y, where).toBeGreaterThanOrEqual(0);
        expect(bottomRight.x, where).toBeLessThanOrEqual(PHONE.width);
        expect(bottomRight.y, where).toBeLessThanOrEqual(PHONE.height);
        expect(framing.scale(), where).toBeGreaterThanOrEqual(camera.whole().scale());
      });
    }
  });

  test('at rest a room fills the picture (U03c): nearly edge to edge on one side, within it on both', () => {
    for (const size of ROOM_PICTURES) {
      for (const count of [1, 2, 10, 48]) {
        const plan = layout.of(count, '0.4.1');
        const camera = new PlanCamera(plan, size);
        plan.rooms().forEach((room, index) => {
          const framing = camera.room(index);
          const topLeft = framing.toPicture(room.topLeft(), size);
          const bottomRight = framing.toPicture(room.bottomRight(), size);
          const where = `${String(size.width)} × ${String(size.height)}, ${String(count)} rooms, room ${String(index)}`;
          expect(topLeft.x, where).toBeGreaterThanOrEqual(0);
          expect(topLeft.y, where).toBeGreaterThanOrEqual(0);
          expect(bottomRight.x, where).toBeLessThanOrEqual(size.width);
          expect(bottomRight.y, where).toBeLessThanOrEqual(size.height);
          const filled = Math.max(
            (bottomRight.x - topLeft.x) / size.width,
            (bottomRight.y - topLeft.y) / size.height,
          );
          expect(filled, where).toBeGreaterThanOrEqual(0.85);
        });
      }
    }
  });

  test('standing in a room (U03d): every room fills the picture edge to edge but for the margin, whatever its shape', () => {
    for (const size of STANDING_PICTURES) {
      for (const count of [1, 2, 10, 48]) {
        const plan = layout.of(count, '0.4.1');
        const camera = new PlanCamera(plan, size);
        plan.rooms().forEach((room, index) => {
          const framing = camera.inside(index);
          const topLeft = framing.toPicture(room.topLeft(), size);
          const bottomRight = framing.toPicture(room.bottomRight(), size);
          const where = `${String(size.width)} × ${String(size.height)}, ${String(count)} rooms, room ${String(index)}`;
          expect(topLeft.x, where).toBeCloseTo(12, 6);
          expect(topLeft.y, where).toBeCloseTo(12, 6);
          expect(bottomRight.x, where).toBeCloseTo(size.width - 12, 6);
          expect(bottomRight.y, where).toBeCloseTo(size.height - 12, 6);
        });
      }
    }
  });

  test('a pinch let go settles on the room or on the whole plan, whichever it is nearer', () => {
    const plan = layout.of(10, '0.1.2');
    const camera = new PlanCamera(plan, PHONE);
    const rest = camera.room(3);
    const whole = camera.whole();
    const nearRoom = new Framing(rest.x(), rest.y(), rest.scale() * 0.8);
    const nearWhole = new Framing(rest.x(), rest.y(), whole.scale() * 1.1);
    expect(camera.settle(nearRoom, rest).equals(rest)).toBe(true);
    expect(camera.settle(nearWhole, rest).equals(whole)).toBe(true);
  });

  test('a finger cannot zoom far past the whole plan nor push the plan out of the frame', () => {
    const plan = layout.of(10, '0.1.2');
    const camera = new PlanCamera(plan, PHONE);
    const middle = { x: plan.width() / 2, y: plan.height() / 2 };
    const out = camera.clamp(new Framing(middle.x, middle.y, 1));
    // Out past the whole plan the zoom stops, a little below it, however hard it is pushed.
    expect(out.scale()).toBeLessThan(camera.whole().scale());
    expect(out.equals(camera.clamp(new Framing(middle.x, middle.y, 0.001)))).toBe(true);
    // Pushed far up and to the right, the plan's top-right corner stays near the frame's own.
    const pushed = camera.clamp(new Framing(1000, -1000, 200));
    const corner = pushed.toPicture(new PlanPoint(plan.width(), 0), PHONE);
    expect(corner.x).toBeGreaterThan(PHONE.width / 2);
    expect(corner.y).toBeLessThan(PHONE.height / 2);
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
