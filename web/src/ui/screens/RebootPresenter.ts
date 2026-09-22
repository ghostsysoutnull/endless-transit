import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { RebootVM } from './RebootVM.ts';

/** The prompt this screen claims — the engine's stable key for it. */
const REBOOT = 'reboot';
const DEAD_FRAME = 'dead';

/**
 * Owns the words of the link-failure screen (Guide:144-147, TurnProcessor.groovy:96): what zero coherence
 * shows, what the reboot keeps and undoes, and the one button. No DOM.
 */
export class RebootPresenter implements Presenter<RebootVM> {
  readonly #masthead: Masthead;

  constructor(masthead: Masthead) {
    this.#masthead = masthead;
  }

  accepts(snapshot: GameSnapshot): boolean {
    return snapshot.prompt?.id === REBOOT;
  }

  toViewModel(snapshot: GameSnapshot): RebootVM {
    const headline = '!!! CRITICAL_COHERENCE_FAILURE !!!';
    return {
      scene: REBOOT,
      title: this.#masthead.name(),
      frame: DEAD_FRAME,
      stageLine: 'NEURAL LINK LOST',
      eyebrow: `COHERENCE ${String(snapshot.player?.coherence ?? 0)}%`,
      headline,
      line: 'REBOOTING...',
      explanation:
        'The world is rebuilt from the same seed. You wake on the starting street with 100 Coherence; ' +
        'your step count and the places you have visited are kept. Everything that lived inside the world ' +
        'is undone.',
      options: snapshot.options.map((option) => ({
        id: option.id,
        key: option.key.toUpperCase(),
        label: option.label.toUpperCase(),
        opposite: option.opposite,
      })),
      note: snapshot.message,
      // The engine says nothing at death; the live region is told the headline, once (the shell repeats no text).
      status: snapshot.message === '' ? headline : snapshot.message,
      build: this.#masthead.buildLine(),
      regions: { stage: 'Uplink', notice: 'Link failure', actions: 'Actions' },
    };
  }
}
