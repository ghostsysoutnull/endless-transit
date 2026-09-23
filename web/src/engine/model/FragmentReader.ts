import { Address } from './Address.ts';
import type { Fragment } from './Fragment.ts';
import { Hybrid, HYBRID_KIND } from './Hybrid.ts';
import { KEYSTONE_KIND } from './Keystone.ts';
import type { Location } from './Location.ts';
import { RELIC_KIND } from './RelicFragment.ts';

type Reading = (
  data: Record<string, unknown>,
  universe: Location,
  reader: FragmentReader,
) => Fragment | undefined;

/** The place an address in a save names, seen from the universe; nothing for text that is no address. */
function placeAt(universe: Location, text: unknown): Location | undefined {
  if (typeof text !== 'string') return undefined;
  const address = Address.parse(text);
  return address === undefined ? undefined : universe.descendant(address);
}

/** The same JSON whatever order the keys came in: so data can be compared with what a fragment writes. */
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (typeof value === 'object' && value !== null) {
    const fields = value as Record<string, unknown>;
    return `{${Object.keys(fields)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonical(fields[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

/** One entry per kind of fragment: how its data is read back against the world. A new kind is one more row. */
const READINGS: Readonly<Record<string, Reading>> = {
  [RELIC_KIND]: ({ from, key }, universe) =>
    typeof key === 'string' ? placeAt(universe, from)?.findRelic(key) : undefined,
  [HYBRID_KIND]: ({ parts }, universe, reader) => {
    if (!Array.isArray(parts) || parts.length !== 2) return undefined;
    const [first, second] = parts as [unknown, unknown];
    const one = reader.read(first, universe);
    const other = reader.read(second, universe);
    return one === undefined || other === undefined ? undefined : new Hybrid(one, other);
  },
  [KEYSTONE_KIND]: ({ building }, universe) => placeAt(universe, building)?.keystone(),
};

/**
 * Owns one fact: how a fragment's data comes back as a fragment — through the world, never on trust. A
 * relic is asked of the room its data names (that room says what it deals and what it is worth there); a
 * hybrid is its two parts read the same way; a Keystone is asked of the building its data names. Anything
 * else — a kind nobody reads, a place that is not there, a relic that room never dealt, a Keystone named by
 * a room's address, a field nobody writes — is nothing, and a save that holds it is refused: what comes
 * back must write the very data it was read from.
 */
export class FragmentReader {
  read(data: unknown, universe: Location): Fragment | undefined {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return undefined;
    const fields = data as Record<string, unknown>;
    const reading = typeof fields.kind === 'string' ? READINGS[fields.kind] : undefined;
    const fragment = reading?.(fields, universe, this);
    if (fragment === undefined) return undefined;
    return canonical(fragment.data()) === canonical(fields) ? fragment : undefined;
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
