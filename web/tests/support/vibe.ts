import { Culture } from '#engine/model/Culture.ts';
import { Era } from '#engine/model/Era.ts';
import { Trait } from '#engine/model/Trait.ts';
import { Vibe } from '#engine/model/Vibe.ts';

/**
 * A vibe a test names by what it cares about: the culture and era in force and, when given, the country's
 * trait. The second pair is fixed and never the same as a first pair a test would pick.
 */
export function vibe(culture: string, era: string, trait?: string): Vibe {
  const drawn = new Vibe({
    culture: new Culture(culture, 'red'),
    era: new Era(era),
    secondCulture: new Culture('second-culture', 'cyan'),
    secondEra: new Era('second-era'),
  });
  return trait === undefined ? drawn : drawn.mutate(new Trait(trait), 0);
}
