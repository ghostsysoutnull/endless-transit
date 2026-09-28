import { describe, expect, test } from 'vitest';
import type { SceneCamera } from '#ui/scene/SceneCamera.ts';
import { StillCamera } from '#ui/scene/StillCamera.ts';

describe('a camera that stands still (the street): the view never moves, going in zooms', () => {
  test('the view stays at 0 and gets nowhere in no time; nothing drags; there is no slider and no stop', () => {
    const camera: SceneCamera = new StillCamera();
    expect([camera.rest(), camera.clamp(5), camera.landing(3, 10), camera.alongTrack(0.5)]).toEqual([
      0, 0, 0, 0,
    ]);
    expect([camera.pace(10), camera.settle(10)]).toEqual([0, 0]);
    expect(camera.drags()).toBe(false);
    expect(camera.zooms()).toBe(true);
    expect(camera.track()).toBeNull();
    expect(camera.stopCount()).toBe(0);
    expect(camera.stopOf('enter:0')).toBeUndefined();
    expect(camera.nearest(0)).toBeUndefined();
    expect(camera.stepFrom(0, 1)).toBeUndefined();
  });
});
