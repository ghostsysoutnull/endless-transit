import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { PromptSummary } from '#engine/rules/PromptSummary.ts';

/** The place a test snapshot stands in, or a failed test when it stands nowhere: what a test builds another place from. */
export function placeOf(snapshot: GameSnapshot): PlaceSummary {
  if (snapshot.place === null) throw new Error('the snapshot stands nowhere');
  return snapshot.place;
}

/** The prompt a test snapshot waits on, or a failed test when there is none. */
export function promptOf(snapshot: GameSnapshot): PromptSummary {
  if (snapshot.prompt === null) throw new Error('the snapshot waits on no prompt');
  return snapshot.prompt;
}
