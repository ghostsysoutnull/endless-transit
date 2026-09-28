import { DoorLook } from '#engine/model/DoorLook.ts';

/** A door's look for a test: a plain metal bulkhead, unless the test names what it cares about. */
export function doorLook(facts: Partial<ConstructorParameters<typeof DoorLook>[0]> = {}): DoorLook {
  return new DoorLook({
    material: 'Heavy Bulkhead',
    state: 'Stable',
    family: 'metal',
    stateLook: 'plain',
    ...facts,
  });
}
