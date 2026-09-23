import type { Fragment } from '#engine/model/Fragment.ts';
import { Hybrid } from '#engine/model/Hybrid.ts';

/** The old HUD said `n/16` and meant nothing by it (Guide:238, 409); here sixteen is the capacity (Decision 7: a label that lied is made true). */
const CAPACITY = 16;

/**
 * The quantum trace buffer — the traveller's inventory (Guide:236-243, QuantumBufferController.groovy):
 * fragments in the order they came in, at most sixteen. A capture adds one; a drop takes one out; a merge
 * takes two out and puts their hybrid in last, the first pick first in its name (Guide:241-243).
 */
export class Buffer {
  readonly #fragments: Fragment[];

  constructor(fragments: readonly Fragment[] = []) {
    if (fragments.length > CAPACITY) {
      throw new RangeError(`the buffer holds ${String(CAPACITY)} fragments, not ${String(fragments.length)}`);
    }
    this.#fragments = [...fragments];
  }

  fragments(): readonly Fragment[] {
    return this.#fragments;
  }

  size(): number {
    return this.#fragments.length;
  }

  capacity(): number {
    return CAPACITY;
  }

  full(): boolean {
    return this.#fragments.length >= CAPACITY;
  }

  /** False, holding nothing new, when the buffer is full. */
  add(fragment: Fragment): boolean {
    if (this.full()) return false;
    this.#fragments.push(fragment);
    return true;
  }

  /** The fragment at `index`, out of the buffer; nothing at a position nobody holds. */
  take(index: number): Fragment | undefined {
    if (!Number.isInteger(index) || index < 0 || index >= this.#fragments.length) return undefined;
    const [taken] = this.#fragments.splice(index, 1);
    return taken;
  }

  /**
   * The fragments at `first` and `second` merged — into their hybrid, unless `into` says what else the two
   * become (a primed building's Keystone) — now last in the buffer; nothing, touching nothing, unless they
   * are two different fragments (HK-015).
   */
  merge(
    first: number,
    second: number,
    into?: (one: Fragment, other: Fragment) => Fragment,
  ): Fragment | undefined {
    if (first === second) return undefined;
    const one = this.#fragments[first];
    const other = this.#fragments[second];
    if (one === undefined || other === undefined) return undefined;
    const made = into === undefined ? new Hybrid(one, other) : into(one, other);
    this.#fragments.splice(Math.max(first, second), 1);
    this.#fragments.splice(Math.min(first, second), 1);
    this.#fragments.push(made);
    return made;
  }

  /** This very fragment out of the buffer (the Keystone the breach spends); false when it is not held. */
  remove(fragment: Fragment): boolean {
    const at = this.#fragments.indexOf(fragment);
    if (at < 0) return false;
    this.#fragments.splice(at, 1);
    return true;
  }
}
