import type { SaveStore } from '#engine/persistence/SaveStore.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import type { UniverseNamer } from '#engine/procgen/UniverseNamer.ts';
import type { EntropySource } from '#engine/rng/EntropySource.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { GameCommand } from './GameCommand.ts';
import type { GameSnapshot } from './GameSnapshot.ts';

/**
 * The game, seen from outside: `step(optionId)` in, a plain-data snapshot out. Synchronous, instant, no
 * output device, nothing blocks on input. Owns the current world's seed and the registry of commands —
 * a new thing the player can do is a new registry entry, not a new branch in `step`.
 */
export class GameEngine {
  readonly #namer: UniverseNamer;
  readonly #entropy: EntropySource;
  readonly #saves: SaveStore;
  readonly #commands: readonly GameCommand[];
  #world: Seed | undefined;
  #message = '';

  constructor(deps: { namer: UniverseNamer; entropy: EntropySource; saves: SaveStore }) {
    this.#namer = deps.namer;
    this.#entropy = deps.entropy;
    this.#saves = deps.saves;
    this.#commands = [
      {
        option: { id: 'new-world', key: 'n', label: 'New world' },
        available: () => this.#world === undefined,
        run: () => this.#drawWorld(),
      },
      {
        option: { id: 'reroll', key: 'r', label: 'Re-roll' },
        available: () => this.#world !== undefined,
        run: () => this.#drawWorld(),
      },
    ];
    this.#world = SavedGame.parse(this.#saves.load())?.seed();
    if (this.#world !== undefined) this.#message = `Restored world ${this.#world.toString()}.`;
  }

  /** Runs the option if it is on offer; an id that is not (a stale tap) changes nothing. */
  step(optionId: string): GameSnapshot {
    const command = this.#commands.find((entry) => entry.option.id === optionId && entry.available());
    if (command !== undefined) this.#message = command.run();
    return this.snapshot();
  }

  snapshot(): GameSnapshot {
    const world = this.#world;
    return {
      world: world === undefined ? null : { seed: world.toString(), name: this.#namer.nameOf(world) },
      options: this.#commands.filter((entry) => entry.available()).map((entry) => entry.option),
      message: this.#message,
    };
  }

  #drawWorld(): string {
    const seed = this.#entropy.draw();
    this.#world = seed;
    this.#saves.save(new SavedGame(seed).toText());
    return `World ${seed.toString()} drawn.`;
  }
}
