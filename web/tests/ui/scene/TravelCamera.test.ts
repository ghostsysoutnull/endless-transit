import { describe, expect, test } from 'vitest';
import { travelCamera as camera } from '#tests/support/travelCamera.ts';

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

  test('doors in pairs share a stop: the slider counts a pair once, and a step goes on to the first door of the next pair, or of the pair before, held at the ends', () => {
    const corridor = camera({
      stops: [
        { id: 'enter:0', at: 0 },
        { id: 'enter:1', at: 0 },
        { id: 'enter:2', at: 2 },
        { id: 'enter:3', at: 2 },
        { id: 'enter:4', at: 4 },
      ],
    });
    expect(corridor.stepFrom(0, 1)).toEqual({ id: 'enter:2', at: 2 });
    expect(corridor.stepFrom(2, 1)).toEqual({ id: 'enter:4', at: 4 });
    expect(corridor.stepFrom(4, 1)).toEqual({ id: 'enter:4', at: 4 });
    expect(corridor.stepFrom(4, -1)).toEqual({ id: 'enter:2', at: 2 });
    expect(corridor.stepFrom(2, -1)).toEqual({ id: 'enter:0', at: 0 });
    expect(corridor.stepFrom(0, -1)).toEqual({ id: 'enter:0', at: 0 });
    expect(corridor.stopCount()).toBe(3);
    expect(corridor.nearest(2.3)).toEqual({ id: 'enter:2', index: 1 });
    expect(corridor.stopOf('enter:3')).toBe(2);
  });

  test('a child’s stop by its option id; none for a child it has no stop for', () => {
    expect(camera().stopOf('enter:2')).toBe(7);
    expect(camera().stopOf('enter:40')).toBeUndefined();
    expect(camera().stopCount()).toBe(10);
  });

  test('a finger on the track: its share of the way from the track’s start to its end, held at the ends', () => {
    const box = { left: 270, top: 30, width: 58, height: 200 };
    expect(camera().alongTrack({ x: 290, y: 80 }, box)).toBeCloseTo(6.75, 10);
    expect(camera().alongTrack({ x: 290, y: 0 }, box)).toBe(9);
    expect(camera().alongTrack({ x: 290, y: 400 }, box)).toBe(0);
  });

  test('a finger is measured along the axis it drags on', () => {
    expect(camera().along({ x: 12, y: 40 })).toBe(40);
    expect(camera({ axis: 'x' }).along({ x: 12, y: 40 })).toBe(12);
  });

  test('its range runs up; its stops are kept in their order along the view, however they were given', () => {
    expect(() => camera({ min: 5, max: 2 })).toThrow(RangeError);
    const shuffled = camera({
      stops: [
        { id: 'b', at: 2 },
        { id: 'a', at: 0 },
        { id: 'c', at: 5 },
      ],
    });
    expect(shuffled.stepFrom(0, 1)).toEqual({ id: 'b', at: 2 });
  });

  test('two cameras with the same facts move alike; another fact, another camera', () => {
    expect(camera().equals(camera())).toBe(true);
    expect(camera().equals(camera({ rest: 4 }))).toBe(false);
  });

  test('it drags only when a pixel moves it; it rides without zooming unless told to', () => {
    expect(camera().drags()).toBe(true);
    expect(camera({ drag: 0 }).drags()).toBe(false);
    expect(camera().zooms()).toBe(false);
    expect(camera({ zoom: true }).zooms()).toBe(true);
  });
});
