import type { Location } from '#engine/model/Location.ts';
import type { SaveStore } from '#engine/persistence/SaveStore.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import type { LocationRegistry } from '#engine/procgen/LocationRegistry.ts';
import type { EntropySource } from '#engine/rng/EntropySource.ts';
import { BUFFER, BufferPrompt } from './BufferPrompt.ts';
import type { BufferSummary } from './BufferSummary.ts';
import { Coherence } from './Coherence.ts';
import { Corruption } from './Corruption.ts';
import { Drain } from './Drain.ts';
import { FrameEntropy } from './FrameEntropy.ts';
import type { GameCommand } from './GameCommand.ts';
import { type GameOption, VISITED_KEY } from './GameOption.ts';
import type { GameSnapshot } from './GameSnapshot.ts';
import { Journey } from './Journey.ts';
import type { PlaceSummary } from './PlaceSummary.ts';
import type { Player } from './Player.ts';
import type { Prompt } from './Prompt.ts';
import { RebootPrompt } from './RebootPrompt.ts';
import { RECAP, RecapPrompt } from './RecapPrompt.ts';
import { systemOption } from './SystemOption.ts';
import { Telemetry } from './Telemetry.ts';
import { FREE, GLOBAL, STEP } from './Turn.ts';

const TRAVEL = 'enter:';
const MOVE = 'move:';
const CAPTURE = 'capture:';
const DEBUG_INTEGRITY = 'debug:integrity:';
/** The keyboard extra of each move a place may offer (Guide:112-115); a move with no entry here gets none. */
const MOVE_KEYS: Readonly<Record<string, string>> = {
  up: 'u',
  down: 'd',
  corridor: 'c',
  elevator: 'b',
  back: 'b',
  forward: 'f',
};
/** Keyboard extras for the children, in order: the digits, then every letter no command claims for itself and the visited mark does not use. */
const DIGITS = Array.from({ length: 9 }, (_, n) => String(n + 1));
const LETTERS = Array.from({ length: 26 }, (_, n) => String.fromCharCode('a'.charCodeAt(0) + n));

/**
 * The game, seen from outside: `step(optionId)` in, a plain-data snapshot out. Synchronous, instant, no
 * output device, nothing blocks on input. Owns the registry of commands — a new thing the player can do
 * is a new registry entry, not a new branch in `step` — and the turn: every prompt in the world costs
 * coherence before the command runs (Guide:133-135), a step counts, and zero coherence is a pending prompt
 * (the reboot), never a blocking read. Saves the journey after every step and after every answer to a
 * prompt. In a room, one take per object (a step); BUFFER opens the buffer screen (a global command) whose
 * answers — pick, merge, drop, close — cost nothing. In debug mode (Decision 8) the INTEGRITY tool is on
 * offer — one option per value of `Coherence.edges()` (Guide:441); nowhere else.
 */
export class GameEngine {
  readonly #journey: Journey;
  readonly #entropy: EntropySource;
  readonly #saves: SaveStore;
  readonly #debug: boolean;
  readonly #commands: readonly GameCommand[];
  readonly #childKeys: readonly string[];
  readonly #drain = new Drain();
  readonly #frames = new FrameEntropy();
  readonly #telemetry = new Telemetry();
  readonly #corruption = new Corruption();
  #prompt: Prompt | undefined;
  #message = '';

  constructor(deps: { world: LocationRegistry; entropy: EntropySource; saves: SaveStore; debug?: boolean }) {
    this.#journey = new Journey(deps.world);
    this.#entropy = deps.entropy;
    this.#saves = deps.saves;
    this.#debug = deps.debug ?? false;
    this.#commands = [
      {
        keys: ['n'],
        turn: FREE,
        options: () =>
          this.#atTitle() && !this.#hasWorld() ? [systemOption('new-world', 'n', 'New world')] : [],
        run: () => this.#drawWorld(),
      },
      {
        keys: ['e'],
        turn: FREE,
        options: () =>
          this.#atTitle() && this.#hasWorld()
            ? [systemOption('enter-world', 'e', this.#journey.resumes() ? 'Continue' : 'Enter world')]
            : [],
        run: () => this.#moved(this.#journey.enter(), `Entered ${this.#journey.here()?.name() ?? ''}.`),
      },
      {
        keys: ['r'],
        turn: FREE,
        options: () => (this.#atTitle() && this.#hasWorld() ? [systemOption('reroll', 'r', 'Re-roll')] : []),
        run: () => this.#drawWorld(),
      },
      {
        keys: [],
        turn: STEP,
        options: () => this.#takeOptions(),
        run: (optionId) => {
          const player = this.#journey.player();
          const counted = player.resonantTraces();
          const fragment = this.#journey.capture(Number(optionId.slice(CAPTURE.length)));
          if (fragment === undefined) return this.#message;
          const resonance = player.resonantTraces() > counted ? ' Harmonic resonance: +10%.' : '';
          return `Captured ${fragment.name()}. Frequency: ${String(fragment.frequency().hertz())} Hz.${resonance}`;
        },
      },
      {
        keys: [],
        turn: STEP,
        options: () => this.#travelOptions(),
        run: (optionId) => {
          const moved = this.#journey.descend(Number(optionId.slice(TRAVEL.length)));
          return this.#moved(moved, `Entered ${this.#journey.here()?.name() ?? ''}.`);
        },
      },
      {
        keys: [...new Set(Object.values(MOVE_KEYS))],
        turn: STEP,
        options: () => this.#moveOptions(),
        run: (optionId) => {
          const id = optionId.slice(MOVE.length);
          const before = this.#journey.here();
          const label = before?.moves().find((move) => move.id === id)?.label ?? '';
          const moved = this.#journey.move(id);
          const here = this.#journey.here();
          return this.#moved(moved, here === before ? `${label}.` : `Entered ${here?.name() ?? ''}.`);
        },
      },
      {
        keys: ['l'],
        turn: STEP,
        options: () => {
          const here = this.#journey.here();
          if (here?.exit() === undefined) return [];
          return [{ ...systemOption('leave', 'l', here.leaveLabel()), role: 'return' }];
        },
        run: () => this.#moved(this.#journey.leave(), `Returned to ${this.#journey.here()?.name() ?? ''}.`),
      },
      {
        keys: ['i'],
        turn: GLOBAL,
        options: () => (this.#atTitle() ? [] : [systemOption(BUFFER, 'i', 'Buffer')]),
        run: () => {
          this.#prompt = new BufferPrompt(this.#journey);
          return '';
        },
      },
      {
        keys: ['t'],
        turn: GLOBAL,
        options: () => (this.#atTitle() ? [] : [systemOption('to-title', 't', 'Title screen')]),
        run: () => this.#moved(this.#journey.toTitle(), ''),
      },
      {
        keys: ['q'],
        turn: GLOBAL,
        options: () => (this.#atTitle() ? [] : [systemOption(RECAP, 'q', 'End session')]),
        run: () => {
          this.#prompt = new RecapPrompt(this.#journey);
          return '';
        },
      },
      {
        keys: [],
        turn: FREE,
        options: () =>
          this.#debug && !this.#atTitle()
            ? Coherence.edges().map((value) => ({
                ...systemOption(`${DEBUG_INTEGRITY}${String(value)}`, '', `Integrity ${String(value)}`),
                role: 'debug',
              }))
            : [],
        run: (optionId) => {
          const value = Number(optionId.slice(DEBUG_INTEGRITY.length));
          this.#journey.player().setCoherence(value);
          return `Integrity set to ${String(value)}%.`;
        },
      },
    ];
    const claimed = new Set([...this.#commands.flatMap((entry) => entry.keys), VISITED_KEY]);
    this.#childKeys = [...DIGITS, ...LETTERS.filter((letter) => !claimed.has(letter))];
    this.#restore();
  }

  /**
   * One turn. While a prompt is pending, only its answers are heard. Otherwise the option is run if it is
   * on offer and open — any other id (a stale tap, a sealed place) changes nothing and costs nothing —
   * and, in the world, the prompt's drain comes first: the tap that takes the last point never runs its
   * command; the link fails and the reboot is the only thing on offer.
   */
  step(optionId: string): GameSnapshot {
    const prompt = this.#prompt;
    if (prompt !== undefined) {
      const reply = prompt.answer(optionId);
      if (reply !== undefined) {
        if (reply.done) this.#prompt = undefined;
        this.#message = reply.message;
        this.#save();
      }
      return this.snapshot();
    }
    const command = this.#commands.find((entry) =>
      entry.options().some((option) => option.id === optionId && !option.sealed),
    );
    if (command === undefined) return this.snapshot();
    const here = this.#journey.here();
    const player = this.#journey.player();
    if (here !== undefined && command.turn.drains()) {
      player.drain(this.#drain.cost(here));
      if (player.coherence().exhausted()) {
        this.#prompt = new RebootPrompt(this.#journey);
        this.#message = '';
        this.#save();
        return this.snapshot();
      }
    }
    this.#message = command.run(optionId);
    if (command.turn.counts()) player.count();
    this.#save();
    return this.snapshot();
  }

  snapshot(): GameSnapshot {
    const world = this.#journey.world();
    const here = this.#journey.here();
    const player = this.#journey.player();
    return {
      world:
        world === undefined ? null : { seed: world.toString(), name: this.#journey.universe()?.name() ?? '' },
      place: here === undefined ? null : this.#summaryOf(here, player),
      player:
        here === undefined
          ? null
          : { coherence: player.coherence().value(), band: player.coherence().band(), steps: player.steps() },
      buffer: here === undefined ? null : this.#bufferOf(player),
      prompt: this.#prompt?.summary() ?? null,
      options: this.#prompt?.options() ?? this.#commands.flatMap((entry) => entry.options()),
      message: this.#message,
    };
  }

  #restore(): void {
    const saved = SavedGame.parse(this.#saves.load());
    if (saved === undefined || !this.#journey.restore(saved)) return;
    const here = this.#journey.here();
    const where = here === undefined ? '' : ` at ${here.name()}`;
    this.#message = `Restored world ${saved.seed().toString()}${where}.`;
    if (this.#journey.player().coherence().exhausted()) this.#prompt = new RebootPrompt(this.#journey);
  }

  #save(): void {
    const saved = this.#journey.saved();
    if (saved !== undefined) this.#saves.save(saved.toText());
  }

  #atTitle(): boolean {
    return this.#journey.here() === undefined;
  }

  #hasWorld(): boolean {
    return this.#journey.world() !== undefined;
  }

  #moved(happened: boolean, message: string): string {
    return happened ? message : this.#message;
  }

  #drawWorld(): string {
    const seed = this.#entropy.draw();
    this.#journey.begin(seed);
    return `World ${seed.toString()} drawn.`;
  }

  /**
   * One option per place listed here, in the list's order. Only the open ones get a key: a place that goes
   * by its own number is keyed by that number when it is one character (Guide:111: `0` is the lobby) and
   * not at all otherwise — a key never differs from the ordinal; the rest are handed out in order.
   */
  #travelOptions(): readonly GameOption[] {
    const here = this.#journey.here();
    if (here === undefined) return [];
    const player = this.#journey.player();
    let open = 0;
    const keyOf = (child: Location): string => {
      if (child.sealed()) return '';
      if (!child.goesByNumber()) return this.#childKeys[open++] ?? '';
      const number = String(child.ordinal());
      return number.length === 1 ? number : '';
    };
    return here.listing().map((child, index) => ({
      id: `${TRAVEL}${String(index)}`,
      key: keyOf(child),
      label: `${here.approachVerb()} ${child.callSign()}`,
      place: child.name(),
      role: 'travel',
      sealed: child.sealed(),
      landmark: child.landmark(),
      ordinal: String(child.ordinal()),
      readings: child.readings(),
      opposite: '',
      current: child.current(),
      visited: player.visited(child),
    }));
  }

  /**
   * One take per object lying here, in the room's order, keyed by the digits (the old `t` menu's numbers,
   * Guide:120); listed sealed while the buffer is full — shown, not tappable — so the room still reads whole.
   */
  #takeOptions(): readonly GameOption[] {
    const here = this.#journey.here();
    const contents = here?.contents();
    if (contents === undefined || contents === null) return [];
    const full = this.#journey.player().buffer().full();
    return contents.objects.map((fragment, index) => ({
      ...systemOption(
        `${CAPTURE}${String(index)}`,
        full ? '' : (DIGITS[index] ?? ''),
        `Take ${fragment.name()}`,
      ),
      place: fragment.name(),
      role: 'take',
      sealed: full,
      ordinal: String(index + 1),
    }));
  }

  /** One option per move the place offers, with the key the Guide gives it and the option that undoes it. */
  #moveOptions(): readonly GameOption[] {
    const here = this.#journey.here();
    if (here === undefined) return [];
    return here.moves().map((move) => ({
      ...systemOption(`${MOVE}${move.id}`, MOVE_KEYS[move.id] ?? '', move.label),
      role: 'move',
      opposite: `${MOVE}${move.opposite}`,
    }));
  }

  #summaryOf(here: Location, player: Player): PlaceSummary {
    const siblings = here.parent()?.children();
    const frame = this.#frames.of(here, player.steps());
    return {
      kind: here.kind().title(),
      icon: here.kind().icon(),
      name: here.name(),
      address: here.address().toString(),
      hash: here.hash(),
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
      description: this.#corruption.read(here.description(), player.coherence(), frame),
      facts: here.facts(),
      frame: here.vibe()?.frame() ?? null,
      childrenHeading: here.childrenHeading(),
      contents: this.#contentsOf(here),
      telemetry: this.#telemetry.of(here, frame),
    };
  }

  #bufferOf(player: Player): BufferSummary {
    const buffer = player.buffer();
    return {
      size: buffer.size(),
      capacity: buffer.capacity(),
      resonant: player.resonantTraces(),
      fragments: buffer.fragments().map((fragment) => ({
        key: fragment.key(),
        name: fragment.name(),
        hertz: fragment.frequency().hertz(),
        resonant: fragment.resonant(),
      })),
    };
  }

  /** What the place holds, as plain data; null when it is not a kind that holds things. */
  #contentsOf(here: Location): PlaceSummary['contents'] {
    const contents = here.contents();
    if (contents === null) return null;
    return {
      objects: contents.objects.map((relic) => ({ key: relic.key(), name: relic.name() })),
      furniture: contents.furniture,
    };
  }
}
