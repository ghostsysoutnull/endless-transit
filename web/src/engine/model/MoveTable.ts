import type { Location } from './Location.ts';
import type { Move } from './Move.ts';
import type { MoveRule } from './MoveRule.ts';

/**
 * The moves of a kind, in one place: what is offered from a place is derived from the same rules that
 * make the moves, so a move that is offered can always be made and a new move is one more rule — never
 * a second list to keep in step. Stateless; the place is passed in.
 */
export class MoveTable<Self> {
  readonly #rules: ReadonlyMap<string, MoveRule<Self>>;

  constructor(rules: readonly MoveRule<Self>[]) {
    this.#rules = new Map(rules.map((rule) => [rule.move.id, rule]));
  }

  /** The moves that lead somewhere from here, in the table's order. */
  offered(self: Self): readonly Move[] {
    return [...this.#rules.values()].filter((rule) => rule.to(self) !== undefined).map((rule) => rule.move);
  }

  /** Makes the move with this id: where it leads, after what it does; nothing when it is not offered from here. */
  make(self: Self, id: string): Location | undefined {
    const rule = this.#rules.get(id);
    const to = rule?.to(self);
    if (rule !== undefined && to !== undefined) rule.act?.(self);
    return to;
  }
}
