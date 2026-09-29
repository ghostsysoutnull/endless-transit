import type { SliderFace } from './SliderFace.ts';

/** A camera's slider on the picture (U02), or none: it lays the slider over itself or hides it, and reads a point on it. */
export interface CameraTrack {
  /** The slider laid over the track, or hidden where there is none. */
  lay(face: SliderFace): void;
  /**
   * The view under a point on the slider, whose box on the page this is: its share of the way from the track's start
   * to its end, held at the ends; nothing where there is no track.
   */
  along(
    point: { readonly x: number; readonly y: number },
    box: { readonly left: number; readonly top: number; readonly width: number; readonly height: number },
  ): number | undefined;
  equals(other: CameraTrack): boolean;
}
