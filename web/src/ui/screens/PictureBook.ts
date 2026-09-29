import type { CorridorVM } from '#ui/scene/CorridorVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { StreetVM } from '#ui/scene/StreetVM.ts';
import type { TowerVM } from '#ui/scene/TowerVM.ts';

/** What a drawing asks of `SceneRegistry`: its view model bound to the picture of its kind. */
export interface PictureBook {
  street(vm: StreetVM): Sketch;
  tower(vm: TowerVM): Sketch;
  corridor(vm: CorridorVM): Sketch;
}
