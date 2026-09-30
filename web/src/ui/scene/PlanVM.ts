import type { PlanRoom } from '#engine/model/PlanRoom.ts';
import type { RoomLook } from '#engine/model/RoomLook.ts';
import type { MapKey } from './MapKey.ts';
import type { SceneChild } from './SceneChild.ts';
import type { SceneVM } from './SceneVM.ts';

/**
 * What the plan draws (U03): the apartment's rooms as far as they are seen, the room you stand in and its look, and
 * the options it draws — each doorway's move (by the address of the room it leads to), the way out through the
 * entrance while it is offered (room 1), and the relics lying here (by their take). `children` is all three.
 */
export interface PlanVM extends SceneVM<SceneChild> {
  readonly rooms: readonly PlanRoom[];
  /** The address of the room you stand in. */
  readonly here: string;
  readonly look: RoomLook;
  readonly doors: readonly SceneChild[];
  /** The way out, while it is offered: one or none. */
  readonly exits: readonly SceneChild[];
  readonly relics: readonly SceneChild[];
  /** The key over the picture that flips between the room and the plan (U03d): what it shows and what a reader hears. */
  readonly mapKey: MapKey;
}
