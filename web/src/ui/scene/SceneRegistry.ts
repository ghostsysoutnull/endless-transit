import type { PictureBook } from '#ui/screens/PictureBook.ts';
import type { AreaVM } from './AreaVM.ts';
import type { CorridorVM } from './CorridorVM.ts';
import type { PlanDrawing } from './PlanDrawing.ts';
import { Planned } from './Planned.ts';
import type { PlanVM } from './PlanVM.ts';
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
  readonly #plan: PlanDrawing<PlanVM>;
  readonly #area: ScenePicture<AreaVM>;

  constructor(pictures: {
    readonly street: ScenePicture<StreetVM>;
    readonly tower: ScenePicture<TowerVM>;
    readonly corridor: ScenePicture<CorridorVM>;
    readonly plan: PlanDrawing<PlanVM>;
    readonly area: ScenePicture<AreaVM>;
  }) {
    this.#street = pictures.street;
    this.#tower = pictures.tower;
    this.#corridor = pictures.corridor;
    this.#plan = pictures.plan;
    this.#area = pictures.area;
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

  plan(vm: PlanVM): Sketch {
    return new Planned(this.#plan, vm);
  }

  area(vm: AreaVM): Sketch {
    return new Sketched(this.#area, vm);
  }
}
