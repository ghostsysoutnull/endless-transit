import type { CorridorVM } from '#ui/scene/CorridorVM.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { Drawing } from './Drawing.ts';
import type { PictureBook } from './PictureBook.ts';

/** A place drawn as the corridor. */
export class DrawnCorridor implements Drawing {
  readonly #vm: CorridorVM;

  constructor(vm: CorridorVM) {
    this.#vm = vm;
  }

  frame(): SceneVM<SceneChild> {
    return this.#vm;
  }

  sketchedBy(book: PictureBook): Sketch {
    return book.corridor(this.#vm);
  }
}
