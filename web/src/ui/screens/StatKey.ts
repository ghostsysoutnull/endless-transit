/** The HUD's stats, by stable key (U03b): the Buffer count is where a taken relic's flight lands. */
export type StatKey = 'steps' | 'buffer';

/**
 * The test id a stat's value carries on the page: how a test and the relic's flight find it. A module function: the
 * one owner of the id's shape, asked by `HudView` that writes it and `RelicFlight` that looks for it.
 */
export function statTestId(key: StatKey): string {
  return `stat-${key}`;
}
