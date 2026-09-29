import type { PictureBook } from '#ui/screens/PictureBook.ts';
import type { CorridorVM } from './CorridorVM.ts';
import type { ScenePicture } from './ScenePicture.ts';
import { Sketched } from './Sketched.ts';
import type { Sketch } from './Sketch.ts';
import type { StreetVM } from './StreetVM.ts';
import type { TowerVM } from './TowerVM.ts';

/**
 * Owns one fact: which picture draws each drawn kind (Decision 1) — one per kind, each built by `ScenePictures` and
 * handed in by `main.ts`. A new drawn kind is a method here and on `PictureBook`, the compiler naming both.
 */
export class SceneRegistry implements PictureBook {
  readonly #street: ScenePicture<StreetVM>;
  readonly #tower: ScenePicture<TowerVM>;
  readonly #corridor: ScenePicture<CorridorVM>;

  constructor(pictures: {
    readonly street: ScenePicture<StreetVM>;
    readonly tower: ScenePicture<TowerVM>;
    readonly corridor: ScenePicture<CorridorVM>;
  }) {
    this.#street = pictures.street;
    this.#tower = pictures.tower;
    this.#corridor = pictures.corridor;
  }

  street(vm: StreetVM): Sketch {
    return new Sketched(this.#street, vm);
  }

  tower(vm: TowerVM): Sketch {
    return new Sketched(this.#tower, vm);
  }

  corridor(vm: CorridorVM): Sketch {
    return new Sketched(this.#corridor, vm);
  }
}
