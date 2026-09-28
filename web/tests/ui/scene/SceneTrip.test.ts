import { describe, expect, test } from 'vitest';
import { EaseInOut } from '#ui/scene/EaseInOut.ts';
import { SceneTrip } from '#ui/scene/SceneTrip.ts';

/** A trip for a test: a second's ride from 0 to 40 with no zoom, unless the test names what it cares about. */
function trip(facts: Partial<ConstructorParameters<typeof SceneTrip>[0]> = {}): SceneTrip {
  return new SceneTrip({
    from: 0,
    to: 40,
    start: 0,
    ride: 1000,
    zoom: null,
    pick: 'enter:7',
    easing: new EaseInOut(),
    anchor: { x: 0, y: 0 },
    ...facts,
  });
}

describe('a trip in: the view rides to the child, then (if the picture zooms) the picture grows, then the child is entered', () => {
  test('a ride then a zoom: the view moves first, the scale only after; over when both are', () => {
    const zoomed = trip({
      from: 2,
      to: 12,
      start: 1000,
      ride: 600,
      zoom: { scale: 6, time: 400 },
      pick: 'enter:3',
    });
    expect(zoomed.view(1000)).toBe(2);
    expect(zoomed.scale(1300)).toBe(1);
    expect(zoomed.view(1300)).toBeGreaterThan(2);
    expect(zoomed.view(1300)).toBeLessThan(12);
    expect(zoomed.view(1600)).toBe(12);
    expect(zoomed.scale(1600)).toBe(1);
    expect(zoomed.scale(1800)).toBeGreaterThan(1);
    expect(zoomed.over(1999)).toBe(false);
    expect(zoomed.scale(2000)).toBe(6);
    expect(zoomed.over(2000)).toBe(true);
    expect(zoomed.pick()).toBe('enter:3');
  });

  test('no zoom (the tower: the next screen is the same picture): over when the ride is, the scale stays 1', () => {
    const ride = trip({ to: 40, ride: 1000, zoom: null });
    expect(ride.scale(500)).toBe(1);
    expect(ride.over(999)).toBe(false);
    expect(ride.over(1000)).toBe(true);
    expect(ride.view(1000)).toBe(40);
  });
});
