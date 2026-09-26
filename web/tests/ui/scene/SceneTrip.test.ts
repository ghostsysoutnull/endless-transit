import { describe, expect, test } from 'vitest';
import { SceneTrip } from '#ui/scene/SceneTrip.ts';

describe('a trip in: the view rides to the child, then (if the picture zooms) the picture grows, then the child is entered', () => {
  test('a ride then a zoom: the view moves first, the scale only after; over when both are', () => {
    const trip = new SceneTrip({
      from: 2,
      to: 12,
      start: 1000,
      ride: 600,
      zoom: { scale: 6, time: 400 },
      pick: 'enter:3',
    });
    expect(trip.view(1000)).toBe(2);
    expect(trip.scale(1300)).toBe(1);
    expect(trip.view(1300)).toBeGreaterThan(2);
    expect(trip.view(1300)).toBeLessThan(12);
    expect(trip.view(1600)).toBe(12);
    expect(trip.scale(1600)).toBe(1);
    expect(trip.scale(1800)).toBeGreaterThan(1);
    expect(trip.over(1999)).toBe(false);
    expect(trip.scale(2000)).toBe(6);
    expect(trip.over(2000)).toBe(true);
    expect(trip.pick()).toBe('enter:3');
  });

  test('no zoom (the tower: the next screen is the same picture): over when the ride is, the scale stays 1', () => {
    const trip = new SceneTrip({ from: 0, to: 40, start: 0, ride: 1000, zoom: null, pick: 'enter:7' });
    expect(trip.scale(500)).toBe(1);
    expect(trip.over(999)).toBe(false);
    expect(trip.over(1000)).toBe(true);
    expect(trip.view(1000)).toBe(40);
  });

  test('the elevator speeds up, cruises and brakes: slow at both ends, fast in the middle', () => {
    const trip = new SceneTrip({ from: 0, to: 100, start: 0, ride: 1000, zoom: null, pick: '' });
    const early = trip.view(100) - trip.view(0);
    const middle = trip.view(550) - trip.view(450);
    const late = trip.view(1000) - trip.view(900);
    expect(middle).toBeGreaterThan(early * 3);
    expect(middle).toBeGreaterThan(late * 3);
  });
});
