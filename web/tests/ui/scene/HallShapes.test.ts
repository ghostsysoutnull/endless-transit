import { describe, expect, test } from 'vitest';
import { CurvedHall } from '#ui/scene/CurvedHall.ts';
import { EndingReach } from '#ui/scene/EndingReach.ts';
import type { HallShape } from '#ui/scene/HallShape.ts';
import { HallView } from '#ui/scene/HallView.ts';
import { LongHall } from '#ui/scene/LongHall.ts';
import { ServiceHall } from '#ui/scene/ServiceHall.ts';
import { RecordingHallEnd } from '#tests/support/RecordingHallEnd.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';

const PHONE = { width: 328, height: 277 };
const palette = (token: string): string => `<${token}>`;

/** A hall of nine doors seen from this far along it, in this shape. */
function hall(view: number, shape: HallShape = new LongHall()): HallView {
  return new HallView({ size: PHONE, view, doors: 9, shape });
}

describe('how a corridor ends, by its shape', () => {
  test('a service corridor and a curved gallery end in their wall; a long corridor draws nothing at its end', () => {
    const face = hall(0).endFace();
    for (const shape of [
      (end: RecordingHallEnd) => new ServiceHall(end, new EndingReach()),
      (end: RecordingHallEnd) => new CurvedHall(end, new EndingReach()),
    ]) {
      const end = new RecordingHallEnd();
      shape(end).end(new RecordingPainter(), palette, face, 1);
      expect(end.drawn).toBe(1);
    }
    const painter = new RecordingPainter();
    const long: HallShape = new LongHall();
    long.end(painter, palette, face, 1, 0);
    expect(painter.calls).toEqual([]);
  });

  test('a hall that ends is drawn to its end; a long one as deep as the fog lets anything show', () => {
    expect(hall(0, new ServiceHall(new RecordingHallEnd(), new EndingReach())).far()).toBeCloseTo(13.2, 10);
    expect(hall(0).far()).toBe(16);
  });
});

describe('the hall seen from where you stand', () => {
  test('its end comes into sight within 16 units, wall to wall across the picture’s middle', () => {
    expect(new HallView({ size: PHONE, view: 0, doors: 40, shape: new LongHall() }).endInSight()).toBe(false);
    expect(hall(0).endInSight()).toBe(true);
    const face = hall(0).endFace();
    expect(face.left()).toBeLessThan(PHONE.width / 2);
    expect(face.left() + face.width()).toBeGreaterThan(PHONE.width / 2);
  });
});
