import type { GameOption } from './GameOption.ts';
import type { Journey } from './Journey.ts';
import type { Prompt } from './Prompt.ts';
import type { PromptSummary } from './PromptSummary.ts';
import { systemOption } from './SystemOption.ts';

export const REBOOT = 'reboot';

/**
 * What zero coherence puts on screen (Guide:144, TurnProcessor.groovy:94-100): the link has failed, and
 * the one answer rebuilds the world — the same seed, the starting street, full coherence, steps and
 * visited places kept. Nothing else is heard while it is pending.
 */
export class RebootPrompt implements Prompt {
  readonly #journey: Journey;

  constructor(journey: Journey) {
    this.#journey = journey;
  }

  summary(): PromptSummary {
    return { id: REBOOT, outcome: 'rebooting', figures: {} };
  }

  options(): readonly GameOption[] {
    return [systemOption(REBOOT, '', 'Rebuild')];
  }

  answer(optionId: string): string | undefined {
    if (optionId !== REBOOT) return undefined;
    this.#journey.reboot();
    return `Substrate rebuilt. Coherence ${String(this.#journey.player().coherence().value())}.`;
  }
}
