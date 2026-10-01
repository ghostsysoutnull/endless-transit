import type { RoomLight } from './RoomLight.ts';

/** No light drawn: an era no light is listed for keeps the room plain. */
export class NoLight implements RoomLight {
  /** The frame's own ink: a doorway into a room with no light listed still shows. */
  ink(): string {
    return 'cy';
  }

  paint(): void {
    // Nothing: the room's floor and walls are lit enough to read.
  }
}
