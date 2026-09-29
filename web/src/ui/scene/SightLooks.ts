import type { RoomSight } from '#engine/model/RoomSight.ts';
import { FogLook } from './FogLook.ts';
import { SeenLook } from './SeenLook.ts';
import type { SightLook } from './SightLook.ts';
import { SmallSquare } from './SmallSquare.ts';

/** Owns one fact (U03): how a room looks on the plan, and on its minimap, for how far it is seen. A new sight is a row. */
export const SIGHT_LOOKS: Readonly<Record<RoomSight, SightLook>> = {
  visited: new SeenLook({ floor: 1, ink: 'text', dot: true, small: new SmallSquare('yl', 0.55) }),
  known: new SeenLook({ floor: 0.55, ink: 'dim', dot: false, small: new SmallSquare('cy', 0.3) }),
  fog: new FogLook(),
};
