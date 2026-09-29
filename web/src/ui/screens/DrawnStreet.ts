import type { StreetVM } from '#ui/scene/StreetVM.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { Drawing } from './Drawing.ts';
import type { PictureBook } from './PictureBook.ts';

/** A place drawn as the street. */
export class DrawnStreet implements Drawing {
  readonly #vm: StreetVM;

  constructor(vm: StreetVM) {
    this.#vm = vm;
  }

  frame(): SceneVM<SceneChild> {
    return this.#vm;
  }

  sketchedBy(book: PictureBook): Sketch {
    return book.street(this.#vm);
  }
}
