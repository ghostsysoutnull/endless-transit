import type { GameOption } from './GameOption.ts';

/** One registry entry of the engine: the option shown to the player, when it is on offer, what it does. */
export interface GameCommand {
  readonly option: GameOption;
  available(): boolean;
  /** Runs the command and returns the message for the status line. */
  run(): string;
}
