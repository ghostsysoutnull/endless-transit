import type { SceneChild } from './SceneChild.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { SceneStages } from './SceneStages.ts';
import type { SceneVM } from './SceneVM.ts';

/**
 * A view model bound to the picture that draws it (U02, U03): what the screen holds. It tells the stage which kind
 * of host shows it; the host draws it by its own kind's calls (`LineSketch`).
 */
export interface Sketch {
  /** What every picture's view model shares. */
  frame(): SceneVM<SceneChild>;
  /** Whether there is a picture at all: a place no picture draws keeps the screen as it was. */
  drawn(): boolean;
  /** Whether another sketch is drawn by the same picture: the screen keeps its scene while it is. */
  samePicture(other: Sketch): boolean;
  /** Whether this picture draws it. */
  drawnBy(picture: ScenePicture<never>): boolean;
  /** Shown by the stage's host of its kind. */
  stageOn(stage: SceneStages): void;
}
