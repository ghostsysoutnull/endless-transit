import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { PromptSummary } from '#engine/rules/PromptSummary.ts';
import { END_SESSION, RECAP } from '#engine/rules/RecapPrompt.ts';
import type { FrameOf } from '#ui/FrameOf.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { PassageLevels } from './PassageLevels.ts';
import type { RecapVM } from './RecapVM.ts';

/** The figures of the full recap, each with its word. */
const FIGURES: readonly { readonly key: string; readonly label: string }[] = [
  { key: 'steps', label: 'Steps' },
  { key: 'places', label: 'Places' },
  { key: 'buffer', label: 'Relics' },
  // The tally counts resonant traces (HK-023), and says so.
  { key: 'resonant', label: 'Resonant' },
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
      readonly lines: readonly string[];
      readonly closing: string;
    }
  >
> = {
  void: {
    heading: 'The void takes the session',
    figures: false,
    lines: VOID_LINES,
    closing: 'Sleep among the static, Operator.',
  },
  expedition: {
    heading: 'Expedition complete',
    figures: true,
    lines: [],
    closing: 'A long way down. End the session and the world keeps your place.',
  },
  severed: {
    heading: 'End of session',
    figures: false,
    lines: [],
    closing: 'A short visit. End the session and the world keeps your place.',
  },
};

/**
 * Owns the words of the session recap (Guide:422-430): the heading, figures and closing line of the ending the
 * engine reached, where the traveller stands, and the two answers. The trace the recap opened with becomes the
 * screen's levels, torn as coherence has fallen. No DOM.
 */
export class RecapPresenter implements Presenter<RecapVM> {
  readonly #frame: FrameOf;
  readonly #masthead: Masthead;
  readonly #levels: PassageLevels;

  constructor(masthead: Masthead, frame: FrameOf, levels: PassageLevels) {
    this.#masthead = masthead;
    this.#frame = frame;
    this.#levels = levels;
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
      frame: this.#frame.of(snapshot.place),
      heading: ending.heading,
      place: { label: 'You stand in', name: snapshot.place?.name ?? '', kind: snapshot.place?.kind ?? '' },
      figures: ending.figures ? this.#figures(prompt) : [],
      lines: ending.lines,
      closing: ending.closing,
      levels: this.#levelsOf(snapshot),
      options: snapshot.options.map((option) => ({
        id: option.id,
        key: option.key.toUpperCase(),
        label: option.label,
        opposite: option.opposite,
        lead: option.id === END_SESSION,
      })),
      ends: snapshot.options.some((option) => option.id === END_SESSION) ? END_SESSION : '',
      note: snapshot.message,
      // The engine says nothing when the recap opens; the live region is told the ending's heading, once.
      status: snapshot.message === '' ? ending.heading : snapshot.message,
      build: this.#masthead.buildLine(),
    };
  }

  #figures(prompt: PromptSummary): RecapVM['figures'] {
    return FIGURES.map((figure) => ({ label: figure.label, value: prompt.figures[figure.key] ?? '' }));
  }

  /** The trace the recap opened with, as levels; none when the engine handed none. */
  #levelsOf(snapshot: GameSnapshot): RecapVM['levels'] {
    const place = snapshot.place;
    const trace = snapshot.trace;
    if (place === null || trace === null) return [];
    return this.#levels.of(trace, place.noise, snapshot.player?.decay ?? 0);
  }
}
