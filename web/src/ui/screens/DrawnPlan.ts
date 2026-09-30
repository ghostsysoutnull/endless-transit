import type { PlanVM } from '#ui/scene/PlanVM.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { Drawing } from './Drawing.ts';
import type { MovesPlace } from './MovesPlace.ts';
import type { PictureBook } from './PictureBook.ts';

/** A room drawn as its apartment's plan (U03). */
export class DrawnPlan implements Drawing {
  readonly #vm: PlanVM;
  readonly #moves: MovesPlace;

  constructor(vm: PlanVM, moves: MovesPlace) {
    this.#vm = vm;
    this.#moves = moves;
  }

  frame(): SceneVM<SceneChild> {
    return this.#vm;
  }

  sketchedBy(book: PictureBook): Sketch {
    return book.plan(this.#vm);
  }

  arrange(moves: readonly OptionVM[]): MovesLayout {
    return this.#moves.arrange(moves);
  }
}
