import type { AreaVM } from '#ui/scene/AreaVM.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { Drawing } from './Drawing.ts';
import type { MovesPlace } from './MovesPlace.ts';
import type { PictureBook } from './PictureBook.ts';

/** A level above the street drawn as an area of its children (U04). */
export class DrawnArea implements Drawing {
  readonly #vm: AreaVM;
  readonly #moves: MovesPlace;

  constructor(vm: AreaVM, moves: MovesPlace) {
    this.#vm = vm;
    this.#moves = moves;
  }

  frame(): SceneVM<SceneChild> {
    return this.#vm;
  }

  sketchedBy(book: PictureBook): Sketch {
    return book.area(this.#vm);
  }

  arrange(moves: readonly OptionVM[]): MovesLayout {
    return this.#moves.arrange(moves);
  }

  beside<T>(rows: readonly T[]): readonly T[] {
    return rows;
  }
}
