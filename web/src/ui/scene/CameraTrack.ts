/** A camera's slider on the picture, in CSS pixels, and the view at its start (top or left) and at its end. */
export interface CameraTrack {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly axis: 'x' | 'y';
  readonly from: number;
  readonly to: number;
}
