/**
 * How a picture's one view position moves (U02) — the tower's car, the corridor's walk — as plain data, the
 * picture's answer for a view-model at a size. The view is a number in the picture's own units (a floor, a
 * stretch of hall); `SceneView` owns where it stands, the picture only draws it.
 */
export interface SceneCamera {
  /** Where the view stands when the place is first shown. */
  readonly rest: number;
  readonly min: number;
  readonly max: number;
  /** View units a finger moves it by for one CSS pixel along `axis`; 0: the picture does not drag. */
  readonly drag: number;
  readonly axis: 'x' | 'y';
  /** Seconds of a release's speed the view coasts on. */
  readonly coast: number;
  /** A view that comes to rest settles on a whole number (the tower's floors). */
  readonly snap: boolean;
  /** How long coming to rest takes, in milliseconds: `base + per · √distance`. */
  readonly settle: { readonly base: number; readonly per: number };
  /** How long a trip takes, in milliseconds: `min(most, base + per · √distance)` — the car speeds up, cruises and brakes. */
  readonly pace: { readonly base: number; readonly per: number; readonly most: number };
  /** Whether going into a child zooms into it (the corridor), or only rides there (the tower: the next screen is the same picture). */
  readonly zoom: boolean;
  /** Where the view goes before each child is entered, by option id, in the slider's order. */
  readonly stops: readonly { readonly id: string; readonly at: number }[];
  /** The slider's box on the picture and the view at its start (top or left) and its end; nothing when there is none. */
  readonly track: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly axis: 'x' | 'y';
    readonly from: number;
    readonly to: number;
  } | null;
}
