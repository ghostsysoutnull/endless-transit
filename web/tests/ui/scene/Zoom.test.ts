import { describe, expect, test } from 'vitest';
import { Zoom } from '#ui/scene/Zoom.ts';

const SIZE = { width: 300, height: 200 };
const ANCHOR = { x: 60, y: 150 };

describe('a zoom: the picture grows around a child, which drifts to the middle', () => {
  test('not yet grown, the child stands where it was drawn', () => {
    expect(new Zoom({ scale: 1, anchor: ANCHOR, full: 6 }).anchorAt(SIZE)).toEqual({ x: 60, y: 150 });
  });

  test('a zoom that grows to no more than the picture itself is refused', () => {
    expect(() => new Zoom({ scale: 1, anchor: ANCHOR, full: 1 })).toThrow(RangeError);
  });

  test('fully grown, the child stands in the middle of the picture', () => {
    expect(new Zoom({ scale: 6, anchor: ANCHOR, full: 6 }).anchorAt(SIZE)).toEqual({ x: 150, y: 100 });
  });
});
