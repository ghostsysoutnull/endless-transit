import { Address } from './Address.ts';
import type { Fragment } from './Fragment.ts';
import { Hybrid, HYBRID_KIND } from './Hybrid.ts';
import type { Location } from './Location.ts';
import { RELIC_KIND } from './RelicFragment.ts';

type Reading = (
  data: Record<string, unknown>,
  universe: Location,
  reader: FragmentReader,
) => Fragment | undefined;

/** One entry per kind of fragment: how its data is read back against the world. A Keystone (I07) is one more row. */
const READINGS: Readonly<Record<string, Reading>> = {
  [RELIC_KIND]: ({ from, key }, universe) => {
    if (typeof from !== 'string' || typeof key !== 'string') return undefined;
    const address = Address.parse(from);
    return address === undefined ? undefined : universe.descendant(address)?.findRelic(key);
  },
  [HYBRID_KIND]: ({ parts }, universe, reader) => {
    if (!Array.isArray(parts) || parts.length !== 2) return undefined;
    const [first, second] = parts as [unknown, unknown];
    const one = reader.read(first, universe);
    const other = reader.read(second, universe);
    return one === undefined || other === undefined ? undefined : new Hybrid(one, other);
  },
};

/**
 * Owns one fact: how a fragment's data comes back as a fragment — through the world, never on trust. A
 * relic is asked of the room its data names (that room says what it deals and what it is worth there); a
 * hybrid is its two parts read the same way. Anything else — a kind nobody reads, a room that is not
 * there, a relic that room never dealt — is nothing, and a save that holds it is refused.
 */
export class FragmentReader {
  read(data: unknown, universe: Location): Fragment | undefined {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return undefined;
    const fields = data as Record<string, unknown>;
    const reading = typeof fields.kind === 'string' ? READINGS[fields.kind] : undefined;
    return reading?.(fields, universe, this);
  }

  /** A list of fragments, every one read; nothing when the list is not a list or any entry is refused. */
  readAll(data: unknown, universe: Location): Fragment[] | undefined {
    if (!Array.isArray(data)) return undefined;
    const fragments: Fragment[] = [];
    for (const each of data as unknown[]) {
      const fragment = this.read(each, universe);
      if (fragment === undefined) return undefined;
      fragments.push(fragment);
    }
    return fragments;
  }
}
