import type { GameOption } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { frameOf } from '#ui/Frame.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { BufferVM } from './BufferVM.ts';

/** The prompt this screen claims — the engine's stable key for it. */
const BUFFER = 'buffer';
const RETURN_MARK = '▲ ';
/** The old overlay's signal bar: ten cells, hertz mod 100 over ten plus one of them lit (InventoryOverlayComponent.groovy:35-37). */
const CELLS = 10;
const LIT = '█';
const DARK = '░';
const PHASES = { stable: 'STABLE', shifting: 'SHIFTING' } as const;
const BADGE = { text: '[RESONANT]', label: 'Resonant' } as const;

/**
 * Owns the words of the buffer screen (InventoryOverlayComponent.groovy:20-52, Guide:124-126): the heading,
 * the count made true, the tally, each fragment's line and its buttons, the hint and the way back. No DOM.
 * Row actions are sorted by role — `pick` and `drop` — and placed by their ordinal, data the engine put
 * there for that purpose.
 */
export class BufferPresenter implements Presenter<BufferVM> {
  readonly #masthead: Masthead;

  constructor(masthead: Masthead) {
    this.#masthead = masthead;
  }

  accepts(snapshot: GameSnapshot): boolean {
    return snapshot.prompt?.id === BUFFER;
  }

  toViewModel(snapshot: GameSnapshot): BufferVM {
    const prompt = snapshot.prompt;
    const buffer = snapshot.buffer;
    if (prompt?.id !== BUFFER || buffer === null) throw new Error('BufferPresenter needs the buffer prompt');
    const pad = (value: number): string => String(value).padStart(2, '0');
    const selected = prompt.figures.selected ?? '';
    const heading = '[QUANTUM_TRACE_BUFFER_SYNC...]';
    const rows = buffer.fragments.map((fragment, index) => {
      const ordinal = String(index + 1);
      const isSelected = selected === String(index);
      const even = fragment.hertz % 2 === 0;
      const lit = Math.floor((fragment.hertz % 100) / 10) + 1;
      return {
        key: fragment.key,
        ordinal: pad(index + 1),
        hertz: `${String(fragment.hertz)}Hz`,
        bar: LIT.repeat(lit) + DARK.repeat(CELLS - lit),
        phase: even ? PHASES.stable : PHASES.shifting,
        phaseKey: even ? 'stable' : 'shifting',
        name: fragment.name,
        badge: fragment.resonant ? BADGE : null,
        selected: isSelected,
        selectedLabel: isSelected ? 'Selected' : '',
        actions: snapshot.options
          .filter(
            (option) => (option.role === 'pick' || option.role === 'drop') && option.ordinal === ordinal,
          )
          .map((option) => this.#button(option)),
      };
    });
    const dock = snapshot.options
      .filter((option) => option.role === 'return')
      .map((option) => this.#docked(option));
    return {
      scene: BUFFER,
      title: this.#masthead.name(),
      frame: frameOf(snapshot.place),
      heading,
      count: { label: 'TRACE_BUFFER', value: `${pad(buffer.size)}/${pad(buffer.capacity)} FRAGMENTS` },
      tally: { label: 'RESONANT_TRACES', value: String(buffer.resonant) },
      empty: rows.length === 0 ? '(No spectral traces detected in local buffer)' : '',
      rows,
      hint: 'Select one fragment, then another: they merge into a hybrid and give 15 Coherence back.',
      sync: 'SYNC_STATUS: NOMINAL',
      dock,
      options: [...rows.flatMap((row) => row.actions), ...dock],
      note: snapshot.message,
      // The engine says nothing when the screen opens; the live region is told the heading, once.
      status: snapshot.message === '' ? heading : snapshot.message,
      build: this.#masthead.buildLine(),
      regions: { buffer: 'Quantum trace buffer', actions: 'Back' },
    };
  }

  #button(option: GameOption): OptionVM {
    return { id: option.id, key: option.key.toUpperCase(), label: option.label.toUpperCase(), opposite: '' };
  }

  #docked(option: GameOption): OptionVM {
    return { ...this.#button(option), label: `${RETURN_MARK}${option.label.toUpperCase()}` };
  }
}
