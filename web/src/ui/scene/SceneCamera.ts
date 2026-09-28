import type { CameraStop } from './CameraStop.ts';
import type { CameraTrack } from './CameraTrack.ts';

/**
 * How a picture's one view position moves (U02) — the tower's car, the corridor's walk — the picture's answer for a
 * view-model at a size. The view is a number in the picture's own units (a floor, a stretch of hall); `SceneView`
 * owns where it stands and asks the camera every rule of how it moves. A picture that stands still answers with
 * a camera that never moves.
 */
export interface SceneCamera {
  /** Where the view stands when the place is first shown. */
  rest(): number;
  /** The view kept inside the camera's range. */
  clamp(value: number): number;
  /** How long a trip of this distance takes, in milliseconds. */
  pace(distance: number): number;
  /** How long coming to rest over this distance takes, in milliseconds. */
  settle(distance: number): number;
  /** Where a view let go here, moving at this speed (view units a second), comes to rest. */
  landing(view: number, speed: number): number;
  /** Whether a finger on the picture moves the view. */
  drags(): boolean;
  /** View units a finger moves the view by for one CSS pixel along the axis. */
  dragRate(): number;
  /** Where a point on the page lies along the axis a finger drags on, in CSS pixels. */
  along(point: { readonly x: number; readonly y: number }): number;
  /** Whether going into a child zooms into it, or only rides there. */
  zooms(): boolean;
  /** The view at a child's stop, by its option id; nothing for a child without one. */
  stopOf(id: string): number | undefined;
  /** How many stops the slider has. */
  stopCount(): number;
  /** The stop nearest the view and its place in the slider's order; nothing when there are no stops. */
  nearest(view: number): { readonly id: string; readonly index: number } | undefined;
  /** The first stop `step` views on from the one nearest the view (stops at one view are one step), held at the ends. */
  stepFrom(view: number, step: number): CameraStop | undefined;
  /** The slider's box on the picture; nothing when there is no slider. */
  track(): CameraTrack | null;
  /** The view under a point on the slider, whose box on the page this is: its share of the way along the track, held. */
  alongTrack(
    point: { readonly x: number; readonly y: number },
    box: { readonly left: number; readonly top: number; readonly width: number; readonly height: number },
  ): number;
  /** Whether it moves the view by the same rules as another camera. */
  equals(other: SceneCamera): boolean;
}
