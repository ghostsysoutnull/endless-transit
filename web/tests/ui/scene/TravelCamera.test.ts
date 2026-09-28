import { describe, expect, test } from 'vitest';
import { TravelCamera } from '#ui/scene/TravelCamera.ts';

/** A tower of ten floors for a test: the car at 3, a stop a floor, the gauge from the top (9) down, unless the test says otherwise. */
function camera(facts: Partial<ConstructorParameters<typeof TravelCamera>[0]> = {}): TravelCamera {
  return new TravelCamera({
    rest: 3,
    min: 0,
    max: 9,
    drag: 0.02,
    axis: 'y',
    coast: 0.22,
    snap: true,
    settle: { base: 380, per: 40 },
    pace: { base: 320, per: 230, most: 2400 },
    zoom: false,
    stops: Array.from({ length: 10 }, (_, n) => ({ id: `enter:${String(9 - n)}`, at: n })),
    track: { x: 270, y: 30, width: 58, height: 200, axis: 'y', from: 9, to: 0 },
    ...facts,
  });
}

describe('a camera that travels: where the view may stand, how long it takes to get there', () => {
  test('the view is kept between the lowest level and the top', () => {
    expect([camera().clamp(-4), camera().clamp(4.5), camera().clamp(12)]).toEqual([0, 4.5, 9]);
  });

  test('a trip takes base + per · √distance, never more than the most', () => {
    expect(camera().pace(1)).toBe(550);
    expect(camera().pace(4)).toBe(780);
    expect(camera().pace(400)).toBe(2400);
  });

  test('coming to rest takes base + per · √distance', () => {
    expect(camera().settle(4)).toBe(460);
  });

  test('a release coasts on its speed for the coast time, then settles on a whole floor inside the range', () => {
    expect(camera().landing(3.2, 5)).toBe(4);
    expect(camera().landing(3.2, 0)).toBe(3);
    expect(camera().landing(8.6, 50)).toBe(9);
    expect(camera({ snap: false }).landing(3.2, 5)).toBeCloseTo(4.3, 10);
  });

  test('the stop nearest the view, by its place in the slider’s order; the stop a step from it, held at the ends', () => {
    expect(camera().nearest(3.4)).toEqual({ id: 'enter:6', index: 3 });
    expect(camera().stepFrom(3.4, 1)).toEqual({ id: 'enter:5', at: 4 });
    expect(camera().stepFrom(0.2, -1)).toEqual({ id: 'enter:9', at: 0 });
    expect(camera({ stops: [] }).nearest(3)).toBeUndefined();
  });

  test('a child’s stop by its option id; none for a child it has no stop for', () => {
    expect(camera().stopOf('enter:2')).toBe(7);
    expect(camera().stopOf('enter:40')).toBeUndefined();
    expect(camera().stopCount()).toBe(10);
  });

  test('a finger on the track: its share of the way from the track’s start to its end', () => {
    expect(camera().alongTrack(0.25)).toBeCloseTo(6.75, 10);
    expect(camera().alongTrack(-1)).toBe(9);
    expect(camera().alongTrack(2)).toBe(0);
  });

  test('it drags only when a pixel moves it; it rides without zooming unless told to', () => {
    expect(camera().drags()).toBe(true);
    expect(camera({ drag: 0 }).drags()).toBe(false);
    expect(camera().zooms()).toBe(false);
    expect(camera({ zoom: true }).zooms()).toBe(true);
  });
});
