import type { IndexLabel } from './IndexLabel.ts';
import { Indexed } from './Indexed.ts';
import type { Position } from './Position.ts';
import { Unindexed } from './Unindexed.ts';

/**
 * What sort of place a location is — a value whose identity is its stable key (`planet`), never its
 * title. The title, the path icon and how its places are counted among their siblings ride along, so nobody
 * keeps a table keyed by kind. A kind made without an index label does not count its places (a floor).
 */
export class LocationKind {
  readonly #key: string;
  readonly #title: string;
  readonly #icon: string;
  readonly #scale: string;
  readonly #index: IndexLabel;

  constructor(
    facts:
      | { key: string; title: string; scale: string; icon: string; indexLabel: string }
      | { key: string; title: string; scale: string; icon: string },
  ) {
    this.#key = facts.key;
    this.#title = facts.title;
    this.#icon = facts.icon;
    this.#scale = facts.scale;
    this.#index = 'indexLabel' in facts ? new Indexed(facts.indexLabel) : new Unindexed();
  }

  key(): string {
    return this.#key;
  }

  title(): string {
    return this.#title;
  }

  /** How big a place of this kind is, as the trace's band writes it (`10²⁶ m` … `5 m`, U04). */
  scale(): string {
    return this.#scale;
  }

  icon(): string {
    return this.#icon;
  }

  /** A place of this kind at `index` (one-based) of `total` siblings, as the HUD writes it (`ORBIT 02/05`), or not counted. */
  position(index: number, total: number): Position {
    return this.#index.position(index, total);
  }

  equals(other: LocationKind): boolean {
    return this.#key === other.#key;
  }
}
