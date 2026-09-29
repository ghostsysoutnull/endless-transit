import type { LineSketch } from './LineSketch.ts';
import type { PlanSketch } from './PlanSketch.ts';

/** What a sketch asks of the stage (`SceneStage`): to be shown by a host of its kind, or — drawn by none — nothing. */
export interface SceneStages {
  line(sketch: LineSketch): void;
  plan(sketch: PlanSketch): void;
  bare(): void;
}
