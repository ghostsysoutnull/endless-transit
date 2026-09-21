import type { GameOption } from './GameOption.ts';

/**
 * One registry entry of the engine: the options it puts on offer right now (none, one, or one per child)
 * and what running one of them does.
 */
export interface GameCommand {
  options(): readonly GameOption[];
  /** Runs the option with this id — one of those `options()` just offered — and returns the status message. */
  run(optionId: string): string;
}
