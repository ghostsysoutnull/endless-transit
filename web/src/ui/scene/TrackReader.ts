import type { SceneCamera } from './SceneCamera.ts';

/** What a drag on the slider asks of it (`SceneSlider`): the view under a point on the page along its track. */
export interface TrackReader {
  valueAt(point: { readonly x: number; readonly y: number }, camera: SceneCamera): number | undefined;
}
