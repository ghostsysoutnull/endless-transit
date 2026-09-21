/**
 * What sort of place a location is — a value whose identity is its stable key (`planet`), never its
 * title. The title, the path icon and the label of its position among its siblings ride along, so nobody
 * keeps a table keyed by kind.
 */
export class LocationKind {
  readonly #key: string;
  readonly #title: string;
  readonly #icon: string;
  readonly #indexLabel: string;

  constructor(facts: { key: string; title: string; icon: string; indexLabel: string }) {
    this.#key = facts.key;
    this.#title = facts.title;
    this.#icon = facts.icon;
    this.#indexLabel = facts.indexLabel;
  }

  key(): string {
    return this.#key;
  }

  title(): string {
    return this.#title;
  }

  icon(): string {
    return this.#icon;
  }

  /** What the HUD calls a position among siblings of this kind (`ORBIT 02/05`). */
  indexLabel(): string {
    return this.#indexLabel;
  }

  equals(other: LocationKind): boolean {
    return this.#key === other.#key;
  }
}
