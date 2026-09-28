import type { PlayerSummary } from '#engine/rules/PlayerSummary.ts';

/** The traveller a screen is shown, for a test: fresh and stable, unless the test names what it cares about. */
export function playerSummary(facts: Partial<PlayerSummary> = {}): PlayerSummary {
  return { coherence: 100, band: 'stable', steps: 0, decay: 0, ...facts };
}
