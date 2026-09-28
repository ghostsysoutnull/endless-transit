import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { Clock } from './Clock.ts';
import type { Easing } from './Easing.ts';
import type { ScenePick } from './ScenePick.ts';
import type { Tear } from './Tear.ts';

/**
 * What every scene view works with, built in `main.ts` and handed in whole (U02): the page's clock, the
 * reduced-motion wish, its canvas, the tear, how it asks for a pick, and how a ride between floors and a zoom back
 * out ease (`ride`) and how a released view coasts to rest (`coast`).
 */
export interface SceneViewParts {
  readonly clock: Clock;
  readonly motion: ReducedMotion;
  readonly canvases: Canvases;
  readonly tear: Tear;
  readonly picks: ScenePick;
  readonly ride: Easing;
  readonly coast: Easing;
}
