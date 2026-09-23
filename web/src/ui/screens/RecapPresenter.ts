import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { PromptSummary } from '#engine/rules/PromptSummary.ts';
import { frameOf } from '#ui/Frame.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { RecapVM } from './RecapVM.ts';

/** The prompt this screen claims — the engine's stable key for it. */
const RECAP = 'recap';

/** The figures of the full recap, in the old order (SessionRecap.groovy:38-46), each with its words. */
const FIGURES: readonly { readonly key: string; readonly label: string; readonly unit: string }[] = [
  { key: 'locus', label: 'FINAL_LOCUS', unit: '' },
  { key: 'steps', label: 'PULSE_TRAVERSAL', unit: ' steps' },
  { key: 'places', label: 'CELLS_MAPPED', unit: ' footprints' },
  { key: 'buffer', label: 'BUFFER_DENSITY', unit: ' spectral fragments' },
  // The old line said "stabilized" (HK-023); the tally counts resonant traces, and says so.
  { key: 'resonant', label: 'RESONANT_TRACES', unit: ' resonant' },
];
/** The shutdown steps of the short ending (SessionRecap.groovy:54-59). */
const SHUTDOWN = [
  'UNMOUNTING_LATTICE_TRACE',
  'DEALLOCATING_TRACE_BUFFER',
  'RELEASING_NEURAL_CARRIER',
  'STABILIZING_SUBSTRATE_WAVEFORM',
];
/** The void's typewritten lines (SessionRecap.groovy:22-27); the last one closes. */
const VOID_LINES = [
  'Your echoes are sinking into the strata.',
  'The web is folding back upon itself.',
  'The v-v-void... it remembers... [OK]',
] as const;
/** The words of each ending, by the engine's key (Guide:424-428); a new ending is one more entry. */
const ENDINGS: Readonly<
  Record<
    string,
    {
      readonly heading: string;
      readonly figures: boolean;
      readonly shutdown: boolean;
      readonly lines: readonly string[];
      readonly closing: string;
    }
  >
> = {
  void: {
    heading: '[VOID_RESONANCE_TERMINATION]',
    figures: false,
    shutdown: false,
    lines: VOID_LINES,
    closing: 'Sleep among the static, Operator.',
  },
  expedition: {
    heading: '[SESSION_RECAP_INITIALIZED]',
    figures: true,
    shutdown: false,
    lines: [],
    closing: 'Expedition successful. Trace synchronized to substrate.',
  },
  severed: {
    heading: '[LINK_TERMINATION_PROTOCOL]',
    figures: false,
    shutdown: true,
    lines: [],
    closing: 'Neural link severed. Waveform stabilized.',
  },
};

/**
 * Owns the words of the session recap (Guide:422-430, SessionRecap.groovy:14-69): the heading, figures and
 * closing line of the ending the engine reached, and the two answers. No DOM.
 */
export class RecapPresenter implements Presenter<RecapVM> {
  readonly #masthead: Masthead;

  constructor(masthead: Masthead) {
    this.#masthead = masthead;
  }

  accepts(snapshot: GameSnapshot): boolean {
    return snapshot.prompt?.id === RECAP;
  }

  toViewModel(snapshot: GameSnapshot): RecapVM {
    const prompt = snapshot.prompt;
    if (prompt?.id !== RECAP) throw new Error('RecapPresenter needs the recap prompt');
    const ending = ENDINGS[prompt.outcome];
    if (ending === undefined) throw new Error(`no words for the ending '${prompt.outcome}'`);
    return {
      scene: RECAP,
      title: this.#masthead.name(),
      frame: frameOf(snapshot.place),
      heading: ending.heading,
      figures: ending.figures ? this.#figures(prompt) : [],
      steps: ending.shutdown
        ? SHUTDOWN.map((process) => ({ label: '[STATUS]', process: `${process}...`, done: '[DONE]' }))
        : [],
      lines: ending.lines,
      closing: ending.closing,
      options: snapshot.options.map((option) => ({
        id: option.id,
        key: option.key.toUpperCase(),
        label: option.label.toUpperCase(),
        opposite: option.opposite,
      })),
      note: snapshot.message,
      // The engine says nothing when the recap opens; the live region is told the ending's heading, once.
      status: snapshot.message === '' ? ending.heading : snapshot.message,
      build: this.#masthead.buildLine(),
      regions: { recap: 'Session recap', actions: 'Actions' },
    };
  }

  #figures(prompt: PromptSummary): RecapVM['figures'] {
    return FIGURES.map((figure) => ({
      label: figure.label,
      value: `${prompt.figures[figure.key] ?? ''}${figure.unit}`,
    }));
  }
}
