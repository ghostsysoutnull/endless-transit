import type { GameOption } from './GameOption.ts';
import type { Turn } from './Turn.ts';

/**
 * One registry entry of the engine: the options it puts on offer right now (none, one, or one per child)
 * and what running one of them does.
 */
export interface GameCommand {
  /** The keyboard extras this command claims for its options, so no child is offered the same letter; empty when it claims none. */
  readonly keys: readonly string[];
  /** What running one of its options costs the traveller: a prompt's drain, a step's count, or nothing. */
  readonly turn: Turn;
  options(): readonly GameOption[];
  /** Runs the option with this id — one of those `options()` just offered — and returns the status message. */
  run(optionId: string): string;
}
