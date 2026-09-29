/**
 * One finger on a scene (U02): on the picture or on its slider — where it puts the view as it moves, and how fast it
 * was moving the view when it let go, for the coast.
 */
export interface Drag {
  /** Whether this is the finger with this pointer id. */
  is(pointer: number): boolean;
  /** The finger is at this point on the page now. */
  move(point: { readonly x: number; readonly y: number }): void;
  /** Whether it has become a drag. */
  moved(): boolean;
  /** The view it puts the picture at now; nothing while it puts it nowhere (not yet a drag, or off the track). */
  view(): number | undefined;
  /** Whether letting go of it ends a drag of the picture itself, so the click that follows is no tap. */
  hidesClick(): boolean;
  /** The view it has moved to, at this moment: what its speed is worked out from. */
  sample(time: number, view: number): void;
  /** How fast it was moving the view when it let go, in view units a second. */
  speed(now: number): number;
}
