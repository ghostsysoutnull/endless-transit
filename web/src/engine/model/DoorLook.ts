/** How a door looks, as its lists name it: its material and its state (their key column, `Heavy Bulkhead`, `Frozen`). Plain data. */
export interface DoorLook {
  readonly material: string;
  readonly state: string;
}
