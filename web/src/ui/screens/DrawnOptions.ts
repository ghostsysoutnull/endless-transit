import type { GameOption } from '#engine/rules/GameOption.ts';

/** The options a place's picture may draw, split by what they do (`HudPresenter` splits them). */
export interface DrawnOptions {
  /** Into a listed place. */
  readonly travel: readonly GameOption[];
  /** The moves the place offers (forward, back). */
  readonly moves: readonly GameOption[];
  /** Back out (leave). */
  readonly leave: readonly GameOption[];
  /** A take of what lies here. */
  readonly takes: readonly GameOption[];
}
