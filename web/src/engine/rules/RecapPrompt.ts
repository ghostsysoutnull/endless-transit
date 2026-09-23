import { Endings } from './Endings.ts';
import type { GameOption } from './GameOption.ts';
import type { Journey } from './Journey.ts';
import type { Prompt } from './Prompt.ts';
import type { PromptSummary } from './PromptSummary.ts';
import type { Reply } from './Reply.ts';
import { systemOption } from './SystemOption.ts';

export const RECAP = 'recap';
const RESUME = 'resume';
const END = 'end-session';

/**
 * The session recap (Guide:422-430, QuitCommand.groovy:16-27, SessionRecap.groovy:14-69): opened by END
 * SESSION, it shows the ending this run has reached and its figures — where the traveller stands, the
 * steps, the places visited, the buffer's size, the resonance tally (SessionRecap.groovy:38-46) — and asks
 * the old `Are you sure?` as two answers: resume, or end the session,
 * which goes to the title with the place kept. Nothing is saved of the prompt itself: a reload lands in
 * the world.
 */
export class RecapPrompt implements Prompt {
  readonly #journey: Journey;
  readonly #endings = new Endings();

  constructor(journey: Journey) {
    this.#journey = journey;
  }

  summary(): PromptSummary {
    const here = this.#journey.here();
    const player = this.#journey.player();
    return {
      id: RECAP,
      outcome: here === undefined ? '' : this.#endings.of({ here, places: player.placesVisited() }),
      figures: {
        locus: here?.address().toString() ?? '',
        steps: String(player.steps()),
        places: String(player.placesVisited()),
        buffer: String(player.buffer().size()),
        resonant: String(player.resonantTraces()),
      },
    };
  }

  options(): readonly GameOption[] {
    return [systemOption(RESUME, 'b', 'Resume'), systemOption(END, 'q', 'End session')];
  }

  answer(optionId: string): Reply | undefined {
    if (optionId === RESUME) return { message: '', done: true };
    if (optionId === END) {
      this.#journey.toTitle();
      return { message: '', done: true };
    }
    return undefined;
  }
}
