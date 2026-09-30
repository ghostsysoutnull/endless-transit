import type { TowerVM } from '#ui/scene/TowerVM.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { Drawing } from './Drawing.ts';
import type { MovesPlace } from './MovesPlace.ts';
import type { PictureBook } from './PictureBook.ts';

/** A place drawn as the tower. */
export class DrawnTower implements Drawing {
  readonly #vm: TowerVM;
  readonly #moves: MovesPlace;

  constructor(vm: TowerVM, moves: MovesPlace) {
    this.#vm = vm;
    this.#moves = moves;
  }

  frame(): SceneVM<SceneChild> {
    return this.#vm;
  }

  sketchedBy(book: PictureBook): Sketch {
    return book.tower(this.#vm);
  }

  arrange(moves: readonly OptionVM[]): MovesLayout {
    return this.#moves.arrange(moves);
  }
}
