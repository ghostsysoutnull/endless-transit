import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { Clock } from './Clock.ts';
import type { Easing } from './Easing.ts';
import type { Flight } from './Flight.ts';
import type { SceneCanvases } from './SceneCanvases.ts';
import type { ScenePick } from './ScenePick.ts';

/** What the plan's host works with (U03), built in `main.ts`: the clock, the reduced-motion wish, its canvas, how it picks, how a glide and a coast ease, how a taken relic flies. */
export interface PlanSceneParts {
  readonly clock: Clock;
  readonly motion: ReducedMotion;
  readonly canvases: SceneCanvases;
  readonly picks: ScenePick;
  readonly ride: Easing;
  readonly coast: Easing;
  readonly flight: Flight;
}
