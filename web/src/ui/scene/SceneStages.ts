import type { LineSketch } from './LineSketch.ts';

/** What a sketch asks of the stage (`SceneStage`): to be shown by a host of its kind, or — drawn by none — nothing. */
export interface SceneStages {
  line(sketch: LineSketch): void;
  bare(): void;
}
