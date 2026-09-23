import { Endings } from './Endings.ts';
import type { GameOption } from './GameOption.ts';
import type { Journey } from './Journey.ts';
import type { Prompt } from './Prompt.ts';
import type { PromptSummary } from './PromptSummary.ts';
import { systemOption } from './SystemOption.ts';

export const RECAP = 'recap';
const RESUME = 'resume';
const END = 'end-session';

/**
 * The session recap (Guide:422-430, QuitCommand.groovy:16-27, SessionRecap.groovy:14-69): opened by END
 * SESSION, it shows the ending this run has reached and its figures — where the traveller stands, the
 * steps, the places visited — and asks the old `Are you sure?` as two answers: resume, or end the session,
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
      },
    };
  }

  options(): readonly GameOption[] {
    return [systemOption(RESUME, 'b', 'Resume'), systemOption(END, 'q', 'End session')];
  }

  answer(optionId: string): string | undefined {
    if (optionId === RESUME) return '';
    if (optionId === END) {
      this.#journey.toTitle();
      return '';
    }
    return undefined;
  }
}
