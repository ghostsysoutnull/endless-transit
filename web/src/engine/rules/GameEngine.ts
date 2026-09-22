import type { Location } from '#engine/model/Location.ts';
import type { SaveStore } from '#engine/persistence/SaveStore.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import type { LocationRegistry } from '#engine/procgen/LocationRegistry.ts';
import type { EntropySource } from '#engine/rng/EntropySource.ts';
import type { GameCommand } from './GameCommand.ts';
import type { GameOption } from './GameOption.ts';
import type { GameSnapshot } from './GameSnapshot.ts';
import { Journey } from './Journey.ts';
import type { PlaceSummary } from './PlaceSummary.ts';

const TRAVEL = 'enter:';
/** Keyboard extras for the children, in order: the digits, then every letter no command claims for itself. */
const DIGITS = Array.from({ length: 9 }, (_, n) => String(n + 1));
const LETTERS = Array.from({ length: 26 }, (_, n) => String.fromCharCode('a'.charCodeAt(0) + n));

/**
 * The game, seen from outside: `step(optionId)` in, a plain-data snapshot out. Synchronous, instant, no
 * output device, nothing blocks on input. Owns the registry of commands — a new thing the player can do
 * is a new registry entry, not a new branch in `step` — and saves the journey after every move.
 */
export class GameEngine {
  readonly #journey: Journey;
  readonly #entropy: EntropySource;
  readonly #saves: SaveStore;
  readonly #commands: readonly GameCommand[];
  readonly #childKeys: readonly string[];
  #message = '';

  constructor(deps: { world: LocationRegistry; entropy: EntropySource; saves: SaveStore }) {
    this.#journey = new Journey(deps.world);
    this.#entropy = deps.entropy;
    this.#saves = deps.saves;
    this.#commands = [
      {
        key: 'n',
        options: () =>
          this.#atTitle() && !this.#hasWorld() ? [this.#system('new-world', 'n', 'New world')] : [],
        run: () => this.#drawWorld(),
      },
      {
        key: 'e',
        options: () =>
          this.#atTitle() && this.#hasWorld()
            ? [this.#system('enter-world', 'e', this.#journey.resumes() ? 'Continue' : 'Enter world')]
            : [],
        run: () => this.#moved(this.#journey.enter(), 'Uplink established.'),
      },
      {
        key: 'r',
        options: () => (this.#atTitle() && this.#hasWorld() ? [this.#system('reroll', 'r', 'Re-roll')] : []),
        run: () => this.#drawWorld(),
      },
      {
        key: '',
        options: () => this.#travelOptions(),
        run: (optionId) => {
          const moved = this.#journey.descend(Number(optionId.slice(TRAVEL.length)));
          return this.#moved(moved, `Entered ${this.#journey.here()?.name() ?? ''}.`);
        },
      },
      {
        key: 'l',
        options: () => {
          const here = this.#journey.here();
          if (here?.parent() === undefined) return [];
          return [{ ...this.#system('leave', 'l', `Leave ${here.kind().title()}`), role: 'return' }];
        },
        run: () => this.#moved(this.#journey.ascend(), `Returned to ${this.#journey.here()?.name() ?? ''}.`),
      },
      {
        key: 't',
        options: () => (this.#atTitle() ? [] : [this.#system('to-title', 't', 'Title screen')]),
        run: () => this.#moved(this.#journey.toTitle(), ''),
      },
    ];
    const claimed = new Set(this.#commands.map((entry) => entry.key));
    this.#childKeys = [...DIGITS, ...LETTERS.filter((letter) => !claimed.has(letter))];
    this.#restore();
  }

  /** Runs the option if it is on offer and open; any other id (a stale tap, a sealed place) changes nothing. */
  step(optionId: string): GameSnapshot {
    const command = this.#commands.find((entry) =>
      entry.options().some((option) => option.id === optionId && !option.sealed),
    );
    if (command !== undefined) {
      this.#message = command.run(optionId);
      const saved = this.#journey.saved();
      if (saved !== undefined) this.#saves.save(saved.toText());
    }
    return this.snapshot();
  }

  snapshot(): GameSnapshot {
    const world = this.#journey.world();
    const here = this.#journey.here();
    return {
      world:
        world === undefined ? null : { seed: world.toString(), name: this.#journey.universe()?.name() ?? '' },
      place: here === undefined ? null : this.#summaryOf(here),
      options: this.#commands.flatMap((entry) => entry.options()),
      message: this.#message,
    };
  }

  #restore(): void {
    const saved = SavedGame.parse(this.#saves.load());
    if (saved === undefined || !this.#journey.restore(saved)) return;
    const here = this.#journey.here();
    const where = here === undefined ? '' : ` at ${here.name()}`;
    this.#message = `Restored world ${saved.seed().toString()}${where}.`;
  }

  #atTitle(): boolean {
    return this.#journey.here() === undefined;
  }

  #hasWorld(): boolean {
    return this.#journey.world() !== undefined;
  }

  #system(id: string, key: string, label: string): GameOption {
    return { id, key, label, place: '', role: 'system', sealed: false, landmark: false };
  }

  #moved(happened: boolean, message: string): string {
    return happened ? message : this.#message;
  }

  #drawWorld(): string {
    const seed = this.#entropy.draw();
    this.#journey.begin(seed);
    return `World ${seed.toString()} drawn.`;
  }

  /** One option per child of the place; only the open ones get a key, handed out in order. */
  #travelOptions(): readonly GameOption[] {
    const here = this.#journey.here();
    if (here === undefined) return [];
    let open = 0;
    return here.children().map((child, index) => ({
      id: `${TRAVEL}${String(index)}`,
      key: child.sealed() ? '' : (this.#childKeys[open++] ?? ''),
      label: `${here.approachVerb()} ${child.callSign()}`,
      place: child.name(),
      role: 'travel',
      sealed: child.sealed(),
      landmark: child.landmark(),
    }));
  }

  #summaryOf(here: Location): PlaceSummary {
    const siblings = here.parent()?.children();
    return {
      kind: here.kind().title(),
      icon: here.kind().icon(),
      name: here.name(),
      address: here.address().toString(),
      depth: here.depth(),
      position:
        siblings === undefined
          ? null
          : { label: here.kind().indexLabel(), index: here.index() + 1, total: siblings.length },
      trail: here.trail().map((step) => ({
        icon: step.kind().icon(),
        kind: step.kind().title(),
        name: step.name(),
      })),
      status: here.status(),
      description: here.description(),
      facts: here.facts(),
      frame: here.vibe()?.frame() ?? null,
      childrenHeading: here.childrenHeading(),
    };
  }
}
