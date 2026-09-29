import type { SceneCamera } from './SceneCamera.ts';
import type { SceneChild } from './SceneChild.ts';
import type { SceneHit } from './SceneHit.ts';
import type { SceneVM } from './SceneVM.ts';
import type { Sketch } from './Sketch.ts';
import { StillCamera } from './StillCamera.ts';

/** A place no picture draws (U02): its frame, and nothing drawn — no picture, no child placed, a camera that never moves. */
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

  layout(): readonly SceneHit[] {
    return [];
  }

  /** Nothing to paint. */
  paint(): void {
    // No picture draws it.
  }

  camera(): SceneCamera {
    return new StillCamera();
  }

  samePicture(): boolean {
    return false;
  }

  drawnBy(): boolean {
    return false;
  }
}
