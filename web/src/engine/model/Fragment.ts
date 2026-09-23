import type { Frequency } from './Frequency.ts';

/** A fragment's text form in a save: its kind — the `FragmentReader`'s table is keyed by it — and what that kind needs. */
export interface FragmentData {
  readonly kind: string;
  readonly [field: string]: unknown;
}

/**
 * What the buffer holds and a room can hold after a drop (the old `InventoryItem`): a relic found somewhere,
 * or the hybrid of two fragments. Each kind answers for itself — its words, its frequency, whether it
 * resonates, and the data a save keeps of it, which is read back through the world (a relic by the room
 * it came from, a hybrid by its parts), so a save can hold nothing a room could not have produced. A
 * Keystone (I07) is one more kind: one more class, one more reader entry.
 */
export interface Fragment {
  /** Identity: a relic's key; a hybrid's is made of its parts'. */
  key(): string;
  name(): string;
  frequency(): Frequency;
  /** Whether this fragment resonates: a relic taken in a room whose culture matches the header's, a hybrid at a multiple of 11 (Guide:245-247). */
  resonant(): boolean;
  data(): FragmentData;
}
