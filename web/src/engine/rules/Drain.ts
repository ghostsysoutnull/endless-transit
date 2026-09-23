import type { Location } from '#engine/model/Location.ts';

/** Every prompt costs this much before anything else happens (Guide:133-135, TurnProcessor.groovy:52-53). */
const BASE = 1;
/**
 * The eras whose places cost more per prompt (Guide:137, 304-305; TurnProcessor.groovy:52), keyed by the
 * era the place says the drain reads (`Location.drainEra()`: the street header's, never an apartment's
 * own, Guide:313). A new era that costs more is one more entry here; none costs less than one (Guide:139).
 */
const ERA_FACTORS: ReadonlyMap<string, number> = new Map([['entropic', 2]]);

/**
 * Owns one fact: what one prompt costs where the traveller stands — the base, times the factor of the era
 * the place answers for the drain, times the place's own depth multiplier (`Location.drainFactor()`: 1
 * everywhere until the bedrock of I07 doubles it, Guide:137-139). Pure: the place is asked, nothing is
 * read from the player.
 */
export class Drain {
  cost(place: Location): number {
    const era = place.drainEra()?.key() ?? '';
    return BASE * (ERA_FACTORS.get(era) ?? 1) * place.drainFactor();
  }
}
