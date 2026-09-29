import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import { Unsketched } from '#ui/scene/Unsketched.ts';
import type { Drawing } from './Drawing.ts';

/** A place no picture draws: the screen stays as it was. */
export class Undrawn implements Drawing {
  readonly #frame: SceneVM<SceneChild>;

  constructor(frame: SceneVM<SceneChild>) {
    this.#frame = frame;
  }

  frame(): SceneVM<SceneChild> {
    return this.#frame;
  }

  sketchedBy(): Sketch {
    return new Unsketched(this.#frame);
  }
}
