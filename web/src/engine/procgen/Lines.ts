import type { LineDeal } from './LineDeal.ts';
import type { SentenceDeal } from './SentenceDeal.ts';

/** A kind of place's sentences as `LineDecks` hands them out: each user asks for its own part. */
export interface Lines extends SentenceDeal, LineDeal {}
