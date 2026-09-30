import { Apartment } from './Apartment.ts';
import type { Fact } from './Fact.ts';
import { LocationKind } from './LocationKind.ts';

export const CRYPT_KIND = new LocationKind({
  key: 'crypt',
  glyph: 'apartment',
  title: 'Crypt',
  scale: '15 m',
  icon: '🚪',
  indexLabel: 'UNIT',
});

/**
 * An apartment below the bedrock (Guide:279; Apartment.groovy:26-43): dealt from the abyssal list in the
 * atomic era, its rooms Shards. It differs in its words only — the resonance warning beside an apartment's
 * chips — and answers for them itself.
 */
export class Crypt extends Apartment {
  override kind(): LocationKind {
    return CRYPT_KIND;
  }

  /** An apartment's chips and the resonance warning (Apartment.groovy:41-42; plain words, U05). */
  override facts(): readonly Fact[] {
    return [...super.facts(), { key: 'alert', label: 'Abyssal resonance', value: '' }];
  }

  override status(): string {
    return 'ATMOS: [PRESSURE_HIGH]';
  }
}
