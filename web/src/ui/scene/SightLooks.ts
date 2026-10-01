import type { RoomSight } from '#engine/model/RoomSight.ts';
import { FoggedDoorway } from './FoggedDoorway.ts';
import { FogLook } from './FogLook.ts';
import { LitDoorway } from './LitDoorway.ts';
import { SeenLook } from './SeenLook.ts';
import type { SightLook } from './SightLook.ts';
import { Tint } from './Tint.ts';

/** Owns one fact (U03): how a room looks on the plan, and on its minimap, for how far it is seen — and the doorway into it: lit once it is entered, in fog before (U03e). A new sight is a row. */
export const SIGHT_LOOKS: Readonly<Record<RoomSight, SightLook>> = {
  visited: new SeenLook({
    floor: new Tint('panel', 1),
    ink: 'text',
    dot: true,
    small: new Tint('yl', 0.55),
    doorway: new LitDoorway(),
  }),
  known: new SeenLook({
    floor: new Tint('panel', 0.55),
    ink: 'dim',
    dot: false,
    small: new Tint('cy', 0.3),
    doorway: new FoggedDoorway(),
  }),
  fog: new FogLook(new FoggedDoorway()),
};
