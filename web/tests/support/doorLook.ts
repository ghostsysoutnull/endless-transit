import type { DoorLook } from '#engine/model/DoorLook.ts';

/** A door's look for a test: a plain metal bulkhead, unless the test names what it cares about. */
export function doorLook(facts: Partial<DoorLook> = {}): DoorLook {
  return { material: 'Heavy Bulkhead', state: 'Stable', family: 'metal', stateLook: 'plain', ...facts };
}
