import { describe, expect, test } from 'vitest';
import type { CameraTrack } from '#ui/scene/CameraTrack.ts';
import { NoTrack } from '#ui/scene/NoTrack.ts';
import { SliderTrack } from '#ui/scene/SliderTrack.ts';
import { laid } from '#tests/support/laidTrack.ts';

/** The tower's gauge of ten floors: the top floor (9) at the top of the track. */
function gauge(facts: Partial<ConstructorParameters<typeof SliderTrack>[0]> = {}): CameraTrack {
  return new SliderTrack({ x: 270, y: 30, width: 58, height: 200, axis: 'y', from: 9, to: 0, ...facts });
}

describe('a camera’s slider on the picture, or none (U02)', () => {
  test('it lays the slider over its box along its axis; none hides it', () => {
    expect(laid(gauge())).toEqual({ shown: true, box: { x: 270, y: 30, width: 58, height: 200 }, axis: 'y' });
    expect(laid(new NoTrack())).toEqual({ shown: false });
  });

  test('a finger on the track: its share of the way from the track’s start to its end, held at the ends; none reads nothing', () => {
    const box = { left: 270, top: 30, width: 58, height: 200 };
    expect(gauge().along({ x: 290, y: 80 }, box)).toBeCloseTo(6.75, 10);
    expect(gauge().along({ x: 290, y: 0 }, box)).toBe(9);
    expect(gauge().along({ x: 290, y: 400 }, box)).toBe(0);
    expect(gauge({ axis: 'x', from: 0, to: 10 }).along({ x: 299, y: 400 }, box)).toBeCloseTo(5, 10);
    const none: CameraTrack = new NoTrack();
    expect(none.along({ x: 290, y: 80 }, box)).toBeUndefined();
  });

  test('equal by every fact; every missing track is the same', () => {
    expect(gauge().equals(gauge())).toBe(true);
    expect(gauge().equals(gauge({ to: 1 }))).toBe(false);
    expect(gauge().equals(new NoTrack())).toBe(false);
    expect(new NoTrack().equals(new NoTrack())).toBe(true);
  });
});
