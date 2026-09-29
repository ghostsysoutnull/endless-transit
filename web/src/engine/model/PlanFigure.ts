import type { PlanRoom } from './PlanRoom.ts';
import type { RoomLook } from './RoomLook.ts';

/** A room as its own picture draws it (U03): its apartment's rooms in walking order, the one you stand in, and its look. */
export interface PlanFigure {
  readonly rooms: readonly PlanRoom[];
  /** The address of the room you stand in. */
  readonly here: string;
  readonly look: RoomLook;
}
