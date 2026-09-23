import type { GameOption } from './GameOption.ts';
import type { PromptSummary } from './PromptSummary.ts';

/**
 * A pending prompt of the engine — a state, never a blocking read (study §2.2): while one is pending its
 * options are the only ones on offer, and one answer settles it. A new prompt is a new class of this shape.
 */
export interface Prompt {
  summary(): PromptSummary;
  options(): readonly GameOption[];
  /** Answers with one of its options and returns the status message; nothing when the id is not one of them. */
  answer(optionId: string): string | undefined;
}
