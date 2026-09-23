import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { PromptSummary } from '#engine/rules/PromptSummary.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { RecapVM } from './RecapVM.ts';

/** The prompt this screen claims — the engine's stable key for it. */
const RECAP = 'recap';
const DEFAULT_FRAME = 'default';

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
/** The words of each ending, by the engine's key (Guide:424-428); a new ending is one more entry. */
const ENDINGS: Readonly<
  Record<string, { readonly heading: string; readonly figures: boolean; readonly closing: string }>
> = {
  expedition: {
    heading: '[SESSION_RECAP_INITIALIZED]',
    figures: true,
    closing: 'Expedition successful. Trace synchronized to substrate.',
  },
  severed: {
    heading: '[LINK_TERMINATION_PROTOCOL]',
    figures: false,
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
      frame: snapshot.place?.frame ?? DEFAULT_FRAME,
      heading: ending.heading,
      figures: ending.figures ? this.#figures(prompt) : [],
      steps: ending.figures
        ? []
        : SHUTDOWN.map((process) => ({ label: '[STATUS]', process: `${process}...`, done: '[DONE]' })),
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
