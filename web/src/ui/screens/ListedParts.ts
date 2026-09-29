import type { GameOption } from '#engine/rules/GameOption.ts';

/**
 * Owns one fact: how a listed place finds its part on the portrait (U02) — by its address, a stable key; a listed
 * place the portrait has no part for is left out. Value object: the parts, by address.
 */
export class ListedParts<P extends { readonly address: string }> {
  readonly #byAddress: ReadonlyMap<string, P>;

  constructor(parts: readonly P[]) {
    this.#byAddress = new Map(parts.map((part) => [part.address, part]));
  }

  /** Each listed place with a part, in the list's order, as `draw` makes it — told its option, its part and its place on the list. */
  drawn<C>(
    travel: readonly GameOption[],
    draw: (option: GameOption, part: P, index: number) => C,
  ): readonly C[] {
    return travel.flatMap((option, index) => {
      const part = this.#byAddress.get(option.address);
      return part === undefined ? [] : [draw(option, part, index)];
    });
  }
}
