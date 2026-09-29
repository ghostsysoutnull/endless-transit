import type { PlanVM } from '#ui/scene/PlanVM.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { Drawing } from './Drawing.ts';
import type { PictureBook } from './PictureBook.ts';

/** A room drawn as its apartment's plan (U03). */
export class DrawnPlan implements Drawing {
  readonly #vm: PlanVM;

  constructor(vm: PlanVM) {
    this.#vm = vm;
  }

  frame(): SceneVM<SceneChild> {
    return this.#vm;
  }

  sketchedBy(book: PictureBook): Sketch {
    return book.plan(this.#vm);
  }
}
