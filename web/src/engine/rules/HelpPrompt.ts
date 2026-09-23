import type { GameOption } from './GameOption.ts';
import type { Prompt } from './Prompt.ts';
import type { PromptSummary } from './PromptSummary.ts';
import type { Reply } from './Reply.ts';
import { systemOption } from './SystemOption.ts';

export const HELP = 'help';
const CLOSE = 'close';

/**
 * The help screen (Guide:96, the old `help`) as a pending prompt: opened by HELP, it costs the one prompt
 * every command costs (Guide:133) and offers one answer, the way back, which costs nothing. Its words are
 * the screen's (`HelpPresenter`); the engine only knows that it is open. Nothing is saved of it: a reload
 * lands in the world.
 */
export class HelpPrompt implements Prompt {
  summary(): PromptSummary {
    return { id: HELP, outcome: '', figures: {} };
  }

  options(): readonly GameOption[] {
    return [{ ...systemOption(CLOSE, 'b', 'Back to the world'), role: 'return' }];
  }

  answer(optionId: string): Reply | undefined {
    return optionId === CLOSE ? { message: '', done: true } : undefined;
  }
}
