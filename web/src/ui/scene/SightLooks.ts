import type { RoomSight } from '#engine/model/RoomSight.ts';
import type { SightLook } from './SightLook.ts';

/** Owns one fact (U03): how a room looks on the plan, and on its minimap, for how far it is seen. A new sight is a row. */
export const SIGHT_LOOKS: Readonly<Record<RoomSight, SightLook>> = {
  visited: {
    floor: 1,
    hatch: 0,
    labelled: true,
    ink: 'text',
    dot: true,
    minimap: { ink: 'yl', alpha: 0.55 },
  },
  known: {
    floor: 0.55,
    hatch: 0,
    labelled: true,
    ink: 'dim',
    dot: false,
    minimap: { ink: 'cy', alpha: 0.3 },
  },
  fog: {
    floor: 0,
    hatch: 0.15,
    labelled: false,
    ink: 'dim',
    dot: false,
    minimap: { ink: 'cy', alpha: 0.08 },
  },
};
