/**
 * One frame of the coherence tear as data (Decision 5): the bands of the picture shifted sideways, the grain,
 * the red cast and whether the frame goes dark. Positions are fractions of the picture (0 to 1); a band's
 * height and shift are CSS pixels.
 */
export interface FxPlan {
  readonly tears: readonly { readonly y: number; readonly height: number; readonly shift: number }[];
  readonly grain: readonly { readonly x: number; readonly y: number; readonly red: boolean }[];
  /** The red cast's opacity, 0 to 1. */
  readonly tint: number;
  readonly dark: boolean;
}
