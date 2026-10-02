import type { GameOption } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { FrameOf } from '#ui/FrameOf.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { BufferVM } from './BufferVM.ts';

/** The prompt this screen claims — the engine's stable key for it. */
const BUFFER = 'buffer';
/** The old overlay's signal bar: ten cells, hertz mod 100 over ten plus one of them lit (InventoryOverlayComponent.groovy:35-37). */
const CELLS = 10;
const PHASES = { stable: 'STABLE', shifting: 'SHIFTING' } as const;
const RESONANT = 'Resonant';

/**
 * Owns the words of the buffer screen (InventoryOverlayComponent.groovy:20-52, Guide:124-126): the heading,
 * the count made true, the tally, each fragment's tile with its pick and its drop, the hint and the way back. No
 * DOM. A tile's pick and drop are found by role — `pick` and `drop` — and by their ordinal, data the engine put
 * there for that purpose.
 */
export class BufferPresenter implements Presenter<BufferVM> {
  readonly #frame: FrameOf;
  readonly #masthead: Masthead;

  constructor(masthead: Masthead, frame: FrameOf) {
    this.#masthead = masthead;
    this.#frame = frame;
  }

  accepts(snapshot: GameSnapshot): boolean {
    return snapshot.prompt?.id === BUFFER;
  }

  toViewModel(snapshot: GameSnapshot): BufferVM {
    const prompt = snapshot.prompt;
    const buffer = snapshot.buffer;
    if (prompt?.id !== BUFFER || buffer === null) throw new Error('BufferPresenter needs the buffer prompt');
    const selected = prompt.figures.selected ?? '';
    const heading = 'BUFFER';
    const rows = buffer.fragments.map((fragment, index) => {
      const ordinal = String(index + 1);
      const isSelected = selected === String(index);
      const even = fragment.hertz % 2 === 0;
      const pick = snapshot.options.find((option) => option.role === 'pick' && option.ordinal === ordinal);
      const drop = snapshot.options.find((option) => option.role === 'drop' && option.ordinal === ordinal);
      if (pick === undefined) throw new Error(`fragment ${ordinal} has no pick`);
      return {
        key: fragment.key,
        ordinal,
        hertz: `${String(fragment.hertz)} Hz`,
        signal: { lit: Math.floor((fragment.hertz % 100) / 10) + 1, cells: CELLS },
        phase: even ? PHASES.stable : PHASES.shifting,
        phaseKey: even ? 'stable' : 'shifting',
        name: fragment.name,
        resonant: fragment.resonant,
        resonantLabel: fragment.resonant ? RESONANT : '',
        selected: isSelected,
        selectedLabel: isSelected ? 'Selected' : '',
        pick: this.#named(pick, fragment.name),
        drop: drop === undefined ? null : this.#named(drop, fragment.name),
      };
    });
    const dock = snapshot.options
      .filter((option) => option.role === 'return')
      .map((option) => this.#docked(option));
    return {
      scene: BUFFER,
      title: this.#masthead.name(),
      frame: this.#frame.of(snapshot.place),
      heading,
      count: { label: 'Fragments', value: String(buffer.size) },
      tally: { label: 'Resonant', value: String(buffer.resonant) },
      empty: rows.length === 0 ? 'Nothing carried yet.' : '',
      rows,
      hint: 'Tap one fragment, then another: they merge into a hybrid and give 15 Coherence back.',
      dock,
      options: [...rows.flatMap((row) => (row.drop === null ? [row.pick] : [row.pick, row.drop])), ...dock],
      note: snapshot.message,
      // The engine says nothing when the screen opens; the live region is told the heading, once.
      status: snapshot.message === '' ? heading : snapshot.message,
      build: this.#masthead.buildLine(),
      regions: { buffer: 'Quantum trace buffer', actions: 'Back' },
    };
  }

  /** A tile's tap, named for a reader with the fragment it acts on: "Select: plasma coil". */
  #named(option: GameOption, name: string): OptionVM {
    return { id: option.id, key: option.key.toUpperCase(), label: `${option.label}: ${name}`, opposite: '' };
  }

  /** The way back, as the card's keys name it. */
  #docked(option: GameOption): OptionVM {
    return { id: option.id, key: option.key.toUpperCase(), label: 'BACK', opposite: '' };
  }
}
