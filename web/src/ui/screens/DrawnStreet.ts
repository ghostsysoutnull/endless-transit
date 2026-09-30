import type { StreetVM } from '#ui/scene/StreetVM.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { Drawing } from './Drawing.ts';
import type { MovesPlace } from './MovesPlace.ts';
import type { PictureBook } from './PictureBook.ts';

/** A place drawn as the street. */
export class DrawnStreet implements Drawing {
  readonly #vm: StreetVM;
  readonly #moves: MovesPlace;

  constructor(vm: StreetVM, moves: MovesPlace) {
    this.#vm = vm;
    this.#moves = moves;
  }

  frame(): SceneVM<SceneChild> {
    return this.#vm;
  }

  sketchedBy(book: PictureBook): Sketch {
    return book.street(this.#vm);
  }

  arrange(moves: readonly OptionVM[]): MovesLayout {
    return this.#moves.arrange(moves);
  }
}
