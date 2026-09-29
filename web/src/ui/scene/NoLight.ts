import type { RoomLight } from './RoomLight.ts';

/** No light drawn: an era no light is listed for keeps the room plain. */
export class NoLight implements RoomLight {
  paint(): void {
    // Nothing: the room's floor and walls are lit enough to read.
  }
}
