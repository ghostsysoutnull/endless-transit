import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';

const DEFAULT_FRAME = 'default';
/** Below the bedrock every screen is framed in the void's colour, whatever the planet's (HUDHeaderComponent.groovy:27-28). */
const ABYSSAL_FRAME = 'abyssal';

/** The frame colour name a screen draws for a place: the void's below the bedrock, the planet's above it, `default` above planet level. */
export function frameOf(place: PlaceSummary | null): string {
  if (place === null) return DEFAULT_FRAME;
  return place.abyssal ? ABYSSAL_FRAME : (place.frame ?? DEFAULT_FRAME);
}
