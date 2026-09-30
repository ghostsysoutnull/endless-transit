import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import { Unsketched } from '#ui/scene/Unsketched.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { Drawing } from './Drawing.ts';
import type { MovesPlace } from './MovesPlace.ts';

/** A place no picture draws: the screen stays as it was. */
export class Undrawn implements Drawing {
  readonly #frame: SceneVM<SceneChild>;
  readonly #moves: MovesPlace;

  constructor(frame: SceneVM<SceneChild>, moves: MovesPlace) {
    this.#frame = frame;
    this.#moves = moves;
  }

  frame(): SceneVM<SceneChild> {
    return this.#frame;
  }

  sketchedBy(): Sketch {
    return new Unsketched(this.#frame);
  }

  arrange(moves: readonly OptionVM[]): MovesLayout {
    return this.#moves.arrange(moves);
  }
}
