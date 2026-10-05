import type { Vibe } from '#engine/model/Vibe.ts';
import type { NameSlot } from './NameSlot.ts';

/**
 * What `NameParts` asks of one part of a name: its name in the index, and the list it reads for a child
 * in a slot under a vibe.
 */
export interface NamePart {
  name(): string;
  list(slot: NameSlot, vibe: Vibe | undefined): string;
}
