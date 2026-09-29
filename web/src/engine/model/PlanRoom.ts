import type { RoomSight } from './RoomSight.ts';

/** One room on its apartment's plan (U03): its address and name, how much of it is seen, and the relic marks shown in it. */
export interface PlanRoom {
  readonly address: string;
  readonly name: string;
  readonly sight: RoomSight;
  /** How many relics the plan marks there: what lies there once it is visited or the plan surveyed, else none. */
  readonly relics: number;
}
