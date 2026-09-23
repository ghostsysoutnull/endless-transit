import type { GameOption } from './GameOption.ts';
import type { PromptSummary } from './PromptSummary.ts';
import type { Reply } from './Reply.ts';

/**
 * A pending prompt of the engine — a state, never a blocking read (study §2.2): while one is pending its
 * options are the only ones on offer, and an answer either settles it or keeps it open (the buffer screen
 * takes several). A new prompt is a new class of this shape.
 */
export interface Prompt {
  summary(): PromptSummary;
  options(): readonly GameOption[];
  /** Answers with one of its options: the status message and whether the prompt is settled; nothing when the id is not one of them. */
  answer(optionId: string): Reply | undefined;
}
