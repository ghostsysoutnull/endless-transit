import type { Seed } from '#engine/rng/Seed.ts';
import type { TraceStep } from '#engine/rules/TraceStep.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { Drawing } from './Drawing.ts';
import type { DrawnOptions } from './DrawnOptions.ts';

/** What the world screen's presenter asks of `SceneDrawing`: what the place's picture draws. */
export interface Drawings {
  of(place: PlaceSummary, options: DrawnOptions, decay: number): Drawing;
  /** What a level's band in the trace draws (U04): its picture, its places marked by address, nothing to pick. */
  band(step: TraceStep, noise: Seed, decay: number): Drawing;
}
