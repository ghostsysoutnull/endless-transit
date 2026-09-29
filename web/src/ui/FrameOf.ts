import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';

/** What a presenter asks of `Frame`: the frame colour name a screen draws for a place. */
export interface FrameOf {
  of(place: PlaceSummary | null): string;
}
