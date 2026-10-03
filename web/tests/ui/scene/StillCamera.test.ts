import { describe, expect, test } from 'vitest';
import type { SceneCamera } from '#ui/scene/SceneCamera.ts';
import { StillCamera } from '#ui/scene/StillCamera.ts';
import { laid } from '#tests/support/laidTrack.ts';

describe('a camera that stands still (an area, a street that fits): the view never moves, going in zooms', () => {
  test('the view stays at 0; nothing drags; there is no slider and no stop', () => {
    const camera: SceneCamera = new StillCamera();
    expect([camera.rest(), camera.clamp(5)]).toEqual([0, 0]);
    expect(camera.drags()).toBe(false);
    expect(camera.page()).toBe('free');
    expect(camera.zooms()).toBe(true);
    expect(laid(camera.track()).shown).toBe(false);
    expect(camera.stopCount()).toBe(0);
    expect(camera.stopOf('enter:0')).toBeUndefined();
    expect(camera.nearest(0)).toBeUndefined();
  });

  test('every still camera is the same camera', () => {
    expect(new StillCamera().equals(new StillCamera())).toBe(true);
  });
});
