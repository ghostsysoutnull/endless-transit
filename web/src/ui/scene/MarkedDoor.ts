import type { Quad } from './Quad.ts';

/** A door as its state's mark is drawn on it: its outline, the ink its state is drawn in, the fog on it, its key. */
export interface MarkedDoor {
  readonly quad: Quad;
  /** The stylesheet token its state is drawn in (`DoorLooks` owns it). */
  readonly ink: string;
  readonly fog: number;
  /** What its marks are placed by, so the same door always looks the same: its address. */
  readonly key: string;
}
