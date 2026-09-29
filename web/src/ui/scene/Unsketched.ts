import type { SceneChild } from './SceneChild.ts';
import type { SceneStages } from './SceneStages.ts';
import type { SceneVM } from './SceneVM.ts';
import type { Sketch } from './Sketch.ts';

/** A place no picture draws (U02): its frame, and nothing drawn — the stage shows no scene. */
export class Unsketched implements Sketch {
  readonly #frame: SceneVM<SceneChild>;

  constructor(frame: SceneVM<SceneChild>) {
    this.#frame = frame;
  }

  frame(): SceneVM<SceneChild> {
    return this.#frame;
  }

  drawn(): boolean {
    return false;
  }

  samePicture(): boolean {
    return false;
  }

  drawnBy(): boolean {
    return false;
  }

  stageOn(stage: SceneStages): void {
    stage.bare();
  }
}
