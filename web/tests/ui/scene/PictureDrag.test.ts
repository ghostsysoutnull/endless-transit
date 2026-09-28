import { describe, expect, test } from 'vitest';
import { PictureDrag } from '#ui/scene/PictureDrag.ts';
import { TravelCamera } from '#ui/scene/TravelCamera.ts';

/** A camera that drags along y at 0.02 view units a pixel; the rest of its tuning does not matter here. */
const CAMERA = new TravelCamera({
  rest: 0,
  min: 0,
  max: 9,
  drag: 0.02,
  axis: 'y',
  coast: 0.22,
  snap: true,
  settle: { base: 380, per: 40 },
  pace: { base: 320, per: 230, most: 2400 },
  zoom: false,
  stops: [],
  track: null,
});

/** A finger gone down at y = 100 with the view at 3. */
function finger(): PictureDrag {
  return new PictureDrag({ pointer: 1, camera: CAMERA, point: { x: 0, y: 100 }, view: 3 });
}

describe('a finger on a picture: a tap until it moves past the slop, then a drag', () => {
  test('it has not moved until it goes more than 6 px from where it went down, either way', () => {
    const drag = finger();
    drag.move({ x: 0, y: 106 });
    expect(drag.moved()).toBe(false);
    drag.move({ x: 0, y: 93 });
    expect(drag.moved()).toBe(true);
  });

  test('once moved it stays moved, even back where it began', () => {
    const drag = finger();
    drag.move({ x: 0, y: 120 });
    drag.move({ x: 0, y: 100 });
    expect(drag.moved()).toBe(true);
  });

  test('the view follows the finger one to one from where it was when the finger went down', () => {
    const drag = finger();
    drag.move({ x: 0, y: 140 });
    expect(drag.view()).toBeCloseTo(3.8, 10);
  });

  test('it is the finger with its own pointer id, no other', () => {
    const drag = finger();
    expect([drag.is(1), drag.is(2)]).toEqual([true, false]);
  });
});
